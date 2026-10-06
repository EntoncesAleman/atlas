import SavedReadings from '../components/SavedReadings';
import { getEntries, getCategoryById } from '../lib/editorial/registry';
import { publicMetadata } from '../lib/site';
export const metadata = { ...publicMetadata('/lecturas', 'Lecturas guardadas — Atlas del Cultivo Argentino', 'Guardá artículos del Atlas y retomá tu última lectura en este navegador.'), robots: { index: false, follow: true } };
export default function Page() {
  const entries = getEntries().map(entry => ({ id: entry.id, title: entry.title, summary: entry.summary, url: `/atlas/${getCategoryById(entry.categoryId).slug}/${entry.slug}` }));
  return <main className="atlas-page"><section className="atlas-category-hero"><div><span className="section-label dark-label">Tu biblioteca</span><h1>Lecturas guardadas</h1><p className="atlas-lede">Volvé a los artículos que querés tener a mano.</p></div></section><section className="atlas-section"><SavedReadings entries={entries} /></section></main>;
}
