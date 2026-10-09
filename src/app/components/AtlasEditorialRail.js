import Link from 'next/link';
import { getCategories, getEntriesForCategory, getAssetsForEntry } from '../lib/editorial/registry';
import { visualPresentation } from '../lib/editorial/visualPresentation';

// Índice visual del Atlas: cada lectura es su imagen y su título, agrupadas por categoría.
export default function AtlasEditorialRail() {
  return <aside className="atlas-editorial-rail" aria-labelledby="atlas-library-title">
    <header className="atlas-editorial-rail-heading"><span>ENCICLOPEDIA DEL CULTIVO</span><h2 id="atlas-library-title">Recorrer el Atlas</h2></header>
    <div className="atlas-editorial-rail-scroll" role="region" aria-label="Categorías y lecturas del Atlas" tabIndex={0}>
      {getCategories().map((category, index) => <section className="atlas-editorial-rail-category" key={category.id}>
        <div className="atlas-editorial-rail-category-heading"><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3><Link href={`/atlas/${category.slug}`}>{category.title} <span aria-hidden="true">↗</span></Link></h3></div>
        <ul>{getEntriesForCategory(category).map(entry => {
          const asset = getAssetsForEntry(entry)[0];
          return <li key={entry.id}><Link href={`/atlas/${category.slug}/${entry.slug}`}>
            {asset && <img src={asset.file} alt="" loading="lazy" decoding="async" style={visualPresentation(asset, { card: true })} />}
            <span>{entry.title}</span>
          </Link></li>;
        })}</ul>
      </section>)}
    </div>
    <footer><Link href="/mi-cultivo">Mi Cultivo · entrar a mi cuaderno ↗</Link></footer>
  </aside>;
}
