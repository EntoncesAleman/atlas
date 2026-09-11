// Loader mínimo, solo para poder ejecutar `province-profile-model-check.mjs` con Node puro.
//
// Los archivos de `src/app/lib/**` usan imports relativos sin extensión (`from '../weather/locations'`),
// la convención estándar de Next.js — su bundler (webpack/Turbopack) los resuelve solo. Node en
// modo ESM puro no lo hace. Este loader NO cambia ningún archivo de la aplicación: solo le indica
// a Node, exclusivamente durante esta corrida de verificación, que reintente el import agregando
// `.js` cuando la resolución exacta falla. No se agregó ninguna dependencia nueva — usa únicamente
// la API de módulos nativa de Node.
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if (err?.code === 'ERR_MODULE_NOT_FOUND' && (specifier.startsWith('.') || specifier.startsWith('/'))) {
      return nextResolve(`${specifier}.js`, context);
    }
    throw err;
  }
}
