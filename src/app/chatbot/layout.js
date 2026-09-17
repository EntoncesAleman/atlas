// `chatbot/page.js` es un componente cliente ('use client') y Next.js no permite exportar
// `metadata` desde un archivo así — este layout server-side es el mecanismo estándar de App
// Router para darle metadata propia a una ruta cliente sin tocar la página (cierre de P1-1,
// auditoría MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md).
//
// Cierre de P3-1 (2026-09-17): el nombre visible pasó de "Chatbot del Atlas" a "Buscador del
// Atlas" — hoy es retrieval puro (busca y muestra entradas relacionadas), no arma una respuesta
// conversacional, y el nombre anterior generaba una expectativa que el producto real no cumple
// todavía. La ruta (`/chatbot`) y el código interno no se tocaron — es un cambio de nombre
// visible, no de arquitectura.
export const metadata = {
  title: 'Buscador del Atlas — Atlas del Cultivo Argentino',
  description: 'Buscá contenido del Atlas y consultá información relacionada con tu cultivo — función autenticada.'
};

export default function ChatbotLayout({ children }) {
  return children;
}
