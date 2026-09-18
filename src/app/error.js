'use client';

// Cierre de P2-6 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): antes no existía `error.js`, así
// que un error de render inesperado caía en la pantalla de error genérica de Next en vez de una
// con la identidad visual del sitio (mismo criterio que ya usa `not-found.js`). No cubre errores
// del propio `layout.js` raíz — eso requeriría `global-error.js`, fuera de este cierre.
//
// Prop `retry` (no `reset`): esta versión de Next.js renombró el callback de reintento — ver
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/error.md.
import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="atlas-page not-found-page">
      <section className="atlas-not-found">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <h1>Algo salió mal</h1>
        <p>Hubo un error inesperado mostrando esta página. Podés reintentar o volver al atlas.</p>
        <div className="atlas-category-actions">
          <button type="button" className="primary-button" onClick={() => retry()}>Reintentar</button>
          <Link className="secondary-button" href="/">Volver al atlas</Link>
        </div>
      </section>
    </main>
  );
}
