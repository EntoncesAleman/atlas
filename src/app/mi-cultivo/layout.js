// `mi-cultivo/page.js` es un componente cliente ('use client') y Next.js no permite exportar
// `metadata` desde un archivo así — este layout server-side es el mecanismo estándar de App
// Router para darle metadata propia a una ruta cliente sin tocar la página (cierre de P1-1,
// auditoría MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md).
//
// `robots: { index: false }` porque 11_SEO.md ya documenta que `/mi-cultivo/*` es una ruta
// privada que debe marcarse noindex explícitamente — es historial personal, no contenido
// editorial para indexar.
export const metadata = {
  title: 'Mi Cultivo — Atlas del Cultivo Argentino',
  description: 'Un historial visual del recorrido de tu planta, etapa por etapa — con o sin cuenta.',
  robots: {
    index: false,
    follow: true
  }
};

export default function MiCultivoLayout({ children }) {
  return children;
}
