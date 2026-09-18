// Proxy de sesión + protección de rutas privadas por rol (lado servidor).
//
// Se llama `proxy.js` y no `middleware.js` porque a partir de Next.js 16 ese es el nombre de
// convención (mismo archivo, mismo lugar, misma función — ver
// node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md: "Middleware is now called
// Proxy... functionality remains the same").
//
// Dos responsabilidades, ambas estándar del patrón @supabase/ssr + Next.js App Router:
// 1) Refrescar el token de sesión en cada request y reescribir la cookie si cambió — sin esto,
//    la sesión se vence en silencio y Server Components como `/admin` verían al usuario como
//    deslogueado de forma intermitente.
// 2) Cortar el acceso a `/admin/*` y `/club/*` ANTES de que se renderice cualquier byte de esa
//    zona si la sesión no existe o el rol no alcanza — es la comprobación "optimista" que la
//    propia documentación de Proxy recomienda para redirects basados en permisos, NO el único
//    control de autorización: `admin/layout.js` y `club/layout.js` vuelven a comprobar lo mismo
//    con `requireRole()` como segunda capa (defensa en profundidad), y el acceso real a los
//    datos sigue estando controlado por RLS en la base, no por este archivo.

import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

const PROTECTED_PREFIXES = [
  { prefix: '/admin', minRole: 'admin' },
  { prefix: '/club', minRole: 'club' }
];

const ROLE_RANK = { user: 0, club: 1, admin: 2 };

export async function proxy(request) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      }
    }
  });

  // `getUser()`, no `getSession()`: revalida el JWT contra el servidor de Supabase Auth en vez
  // de solo decodificar la cookie — una cookie manipulada a mano no alcanza para pasar esto.
  const { data: { user } } = await supabase.auth.getUser();

  const match = PROTECTED_PREFIXES.find(({ prefix }) => request.nextUrl.pathname.startsWith(prefix));
  if (match) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/mi-cultivo';
      url.search = '?auth=requerido';
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    const role = profile?.role ?? 'user';
    if (ROLE_RANK[role] < ROLE_RANK[match.minRole]) {
      const url = request.nextUrl.clone();
      url.pathname = '/mi-cultivo';
      url.search = '?acceso=denegado';
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Corre en todo excepto assets estáticos y archivos de Next — mismo patrón recomendado por
    // la guía oficial de @supabase/ssr para no gastar tiempo de middleware en cada imagen/chunk.
    '/((?!_next/static|_next/image|favicon.ico|atlas/categories|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
};
