// Cierre de P2-1 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): el proyecto no tenía
// next.config.js — sin headers de seguridad, con `X-Powered-By: Next.js` expuesto por defecto.
//
// El patrón de CSP usado acá es el "Without Nonces" documentado en
// node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md — deliberadamente sin
// nonces: pasar a nonces obliga a renderizado dinámico en todas las páginas (hoy la mayoría son
// estáticas) y es un cambio de arquitectura que excede el alcance de este cierre de P2.
//
// `connect-src`/`img-src` incluyen el host real de Supabase (leído de
// NEXT_PUBLIC_SUPABASE_URL, ya usado por lib/supabase/client.js) porque Mi Cultivo y el Chatbot
// dependen de fetch/websocket de auth contra ese host, y las fotos de Mi Cultivo se sirven desde
// Supabase Storage en el mismo host.
function getSupabaseHost() {
  try {
    return new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host;
  } catch {
    return null;
  }
}

const supabaseHost = getSupabaseHost();
const supabaseConnect = supabaseHost ? `https://${supabaseHost} wss://${supabaseHost}` : '';
const supabaseImg = supabaseHost ? `https://${supabaseHost}` : '';
const isDev = process.env.NODE_ENV === 'development';

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: ${supabaseImg};
  font-src 'self';
  connect-src 'self' ${supabaseConnect};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`.replace(/\s{2,}/g, ' ').trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: cspHeader }
        ]
      }
    ];
  }
};

export default nextConfig;
