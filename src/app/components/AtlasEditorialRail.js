import Link from 'next/link';
import { getCategories, getEntriesForCategory } from '../lib/editorial/registry';

export default function AtlasEditorialRail() {
  return <aside className="atlas-editorial-rail" aria-labelledby="atlas-library-title">
    <header className="atlas-editorial-rail-heading"><span>ENCICLOPEDIA DEL CULTIVO</span><h2 id="atlas-library-title">Recorrer el Atlas</h2><p>Categorías y lecturas del cuaderno.</p></header>
    <form action="/chatbot" className="atlas-public-search"><label htmlFor="atlas-query">Buscar en el Atlas</label><div><input id="atlas-query" name="q" type="search" placeholder="Tema, palabra o pregunta" required /><button type="submit" className="club-button">Buscar</button></div></form>
    <div className="atlas-editorial-rail-scroll" role="region" aria-label="Categorías y lecturas del Atlas" tabIndex={0}>
      {getCategories().map((category, index) => <section className="atlas-editorial-rail-category" key={category.id}>
        <div className="atlas-editorial-rail-category-heading"><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3><Link href={`/atlas/${category.slug}`}>{category.title} <span aria-hidden="true">↗</span></Link></h3></div>
        <ul>{getEntriesForCategory(category).map(entry => <li key={entry.id}><Link href={`/atlas/${category.slug}/${entry.slug}`}>{entry.title}</Link></li>)}</ul>
      </section>)}
    </div>
    <footer><Link href="/mi-cultivo">Mi Cultivo · entrar a mi cuaderno ↗</Link></footer>
  </aside>;
}
