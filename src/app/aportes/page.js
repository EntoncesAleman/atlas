import Link from 'next/link';
import ContributionForm from '../components/ContributionForm';
import { publicMetadata } from '../lib/site';
export const metadata = publicMetadata('/aportes', 'Aportes y correcciones — Atlas del Cultivo Argentino', 'Proponé fuentes, actividades y correcciones para el Atlas.');
export default function Page() {
  return <main className="atlas-page"><section className="atlas-category-hero"><div><span className="section-label dark-label">Participar</span><h1>Aportes y correcciones</h1><p className="atlas-lede">El conocimiento del territorio se construye con fuentes y observaciones. Podés señalar un error, compartir una referencia o proponer una actividad documentada.</p></div></section><section className="atlas-section"><p>Incluí la fuente cuando la tengas. Evitá direcciones exactas, datos de salud y detalles privados de tu cultivo.</p><ContributionForm /><Link href="/privacidad">Cómo usamos los datos de tu aporte →</Link></section></main>;
}
