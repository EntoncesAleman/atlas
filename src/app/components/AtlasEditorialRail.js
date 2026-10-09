import Link from 'next/link';
import { getCategories, getCategoryAsset } from '../lib/editorial/registry';
import { visualPresentation } from '../lib/editorial/visualPresentation';

// Índice visual del Atlas: una tarjeta por categoría, con su imagen y su nombre. Las lecturas de
// cada una se ven al entrar a la categoría.
export default function AtlasEditorialRail() {
  return <aside className="atlas-editorial-rail" aria-labelledby="atlas-library-title">
    <header className="atlas-editorial-rail-heading"><span>ENCICLOPEDIA DEL CULTIVO</span><h2 id="atlas-library-title">Recorrer el Atlas</h2></header>
    <div className="atlas-editorial-rail-scroll" role="region" aria-label="Categorías del Atlas" tabIndex={0}>
      <ul className="atlas-editorial-rail-categories">
        {getCategories().map((category, index) => {
          const asset = getCategoryAsset(category);
          return <li key={category.id}><Link href={`/atlas/${category.slug}`}>
            {asset && <img src={asset.file} alt="" loading="lazy" decoding="async" style={visualPresentation(asset, { card: true })} />}
            <span className="atlas-editorial-rail-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="atlas-editorial-rail-title">{category.title}</span>
          </Link></li>;
        })}
      </ul>
    </div>
    <footer><Link href="/mi-cultivo">Mi Cultivo · entrar a mi cuaderno ↗</Link></footer>
  </aside>;
}
