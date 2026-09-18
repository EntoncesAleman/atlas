# Configurar "Continuar con Google" (Supabase Auth + Google OAuth)

Esta app usa **Supabase Auth** como único sistema de autenticación (no hay NextAuth ni ningún
otro sistema paralelo). "Continuar con Google" es un proveedor OAuth de Supabase Auth, no una
integración aparte — el código ya está listo (`supabase.auth.signInWithOAuth({ provider: 'google' })`
en `src/app/mi-cultivo/page.js`, más el intercambio de sesión en
`src/app/auth/callback/route.js`). Lo único que falta son credenciales de Google que **solo el
dueño del proyecto puede crear** (requieren una cuenta de Google Cloud propia).

## Cómo funciona el flujo (por qué las URIs son las que son)

1. El botón llama a `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo:
   '<tu-sitio>/auth/callback' } })`.
2. Supabase redirige el navegador a Google.
3. Google pide login/consentimiento y redirige de vuelta — **no a tu app, sino a Supabase**, a la
   URI que hay que cargar en Google Cloud Console.
4. Supabase procesa el resultado y redirige el navegador a tu app, a la URI que pasaste como
   `redirectTo` en el paso 1 (`/auth/callback`), con un `code` en la URL.
5. `src/app/auth/callback/route.js` intercambia ese `code` por una sesión real (cookies) y
   redirige a destino.

Por eso hay **dos URIs distintas** y no hay que confundirlas.

## Paso 1 — Crear las credenciales en Google Cloud Console

1. Ir a [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
   (crear un proyecto de Google Cloud si no existe uno todavía para este sitio).
2. Si es la primera vez, configurar la **pantalla de consentimiento OAuth** (OAuth consent
   screen): tipo "External", nombre de la app, email de soporte, dominio autorizado.
3. **Crear credencial → OAuth client ID.**
4. **Tipo de aplicación: "Web application"** (no "Desktop", no "Android/iOS" — es un flujo web
   estándar, gestionado enteramente por Supabase del lado servidor).
5. **Authorized redirect URIs** — agregar exactamente esta (proyecto Supabase real de este sitio,
   verificado leyendo `NEXT_PUBLIC_SUPABASE_URL`):

   ```
   https://rksepodyvutrzqlniofe.supabase.co/auth/v1/callback
   ```

   Esta es la única URI que Google necesita conocer. **No** registrar acá la URL de tu sitio
   (`/auth/callback`) — esa la maneja Supabase, no Google.
6. Guardar. Google va a mostrar un **Client ID** y un **Client Secret**.

## Paso 2 — Cargar esas credenciales en Supabase (no en este repo)

1. [Supabase Dashboard](https://supabase.com/dashboard) → proyecto **Atlas**
   (`rksepodyvutrzqlniofe`) → **Authentication → Providers → Google**.
2. Activar el proveedor y pegar ahí el **Client ID** y el **Client Secret** del paso 1.
3. En **Authentication → URL Configuration**:
   - **Site URL**: la URL de producción del sitio (ej. `https://tu-dominio.com`).
   - **Redirect URLs** (allow-list): agregar `https://tu-dominio.com/auth/callback` y, para poder
     probar en desarrollo, `http://localhost:3000/auth/callback`.

El Client Secret de Google **vive en Supabase, no en `.env.local` ni en Vercel** — Supabase hace
el intercambio OAuth completo en su propia infraestructura. Este proyecto no necesita ninguna
variable `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.

## Paso 3 — Variables de entorno de este repo

Ninguna es específica de Google. Las que hacen falta para que el panel admin y la sesión
funcionen en general (ver `.env.example`):

| Variable | Dónde conseguirla | Dónde pegarla |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Ya está en `.env.local` (sin cambios) | `.env.local` y Vercel |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ya está en `.env.local` (sin cambios) | `.env.local` y Vercel |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API → sección "Project API keys" → `service_role` | `.env.local` (para probar el panel admin en local) y Vercel → Project Settings → Environment Variables (marcar solo Production/Preview si se prefiere no tenerla en local) |

`SUPABASE_SERVICE_ROLE_KEY` es secreta: da acceso completo a la base salteando RLS. Nunca debe
llevar el prefijo `NEXT_PUBLIC_` (eso la mandaría al navegador) ni commitearse — `.env.local` ya
está en `.gitignore` del proyecto.

## Verificación

- `/admin/sistema` (una vez logueado como admin) muestra si `SUPABASE_SERVICE_ROLE_KEY` está
  configurada.
- Con el proveedor Google habilitado en Supabase y las Redirect URLs cargadas, el botón
  "Continuar con Google" en `/mi-cultivo` debería redirigir a la pantalla de cuenta de Google y,
  al volver, dejar la sesión iniciada.
- Si Google todavía no está habilitado del lado de Supabase, el botón muestra el error "No se
  pudo iniciar el ingreso con Google" en vez de fallar en silencio.
