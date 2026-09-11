import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="atlas-page not-found-page">
      <section className="atlas-not-found">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <h1>Entrada no encontrada</h1>
        <p>La categoría o ficha que buscás todavía no forma parte del atlas navegable.</p>
        <Link className="primary-button" href="/">Volver al atlas</Link>
      </section>
    </main>
  );
}
