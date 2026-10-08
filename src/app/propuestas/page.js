import './propuestas.css';

export const metadata = {
  title: 'Variantes de dashboards · Atlas',
  description: 'Propuestas visuales para usuarios, cultivo y clubes del Atlas.',
  robots: { index: false, follow: false },
};

const variants = [
  { id: 'user-field', group: 'Usuarios', title: 'Cuaderno editorial', text: 'Papel cálido, plantas y bitácora. Mi recomendación como pantalla de entrada.' },
  { id: 'user-panel', group: 'Usuarios', title: 'Panel verde de seguimiento', text: 'Una vista más compacta, con verde profundo y el historial a mano.' },
  { id: 'grow-season', group: 'Cultivo', title: 'Por temporada', text: 'El conjunto primero: plantas y observaciones de una misma temporada.' },
  { id: 'grow-plant', group: 'Cultivo', title: 'Por planta', text: 'Una ficha individual con fotografías e historia cronológica.' },
  { id: 'club-editorial', group: 'Clubes', title: 'Comunidad y actividades', text: 'Ficha pública y borradores de actividades con revisión editorial.' },
  { id: 'club-team', group: 'Clubes', title: 'Equipo y permisos', text: 'Una organización con responsabilidades y trabajo compartido.' },
];

export default function PropuestasPage() {
  return <main className="dashboard-gallery">
    <header className="dashboard-gallery-header"><p>ATLAS / PROPUESTAS DE DISEÑO</p><h1>Usuarios, cultivo y clubes.</h1><div>Seis variantes para mirar y comparar. Las capturas se ven directamente; cada propuesta también tiene una demostración navegable.</div><small>Datos de ejemplo. Estas propuestas no modifican tu cuenta ni publican contenido.</small></header>
    <nav className="dashboard-gallery-index" aria-label="Ir a una variante">{variants.map(v => <a key={v.id} href={`#${v.id}`}>{v.title}</a>)}</nav>
    <div className="dashboard-gallery-grid">{variants.map(v => <article key={v.id} id={v.id} className="dashboard-gallery-card"><div className="dashboard-gallery-card-heading"><span>{v.group}</span><h2>{v.title}</h2><p>{v.text}</p><a href={`/propuestas/dashboards.html?variante=${v.id}`}>Probar esta variante →</a></div><a href={`/propuestas/vistas/${v.id}-1440.webp`} aria-label={`Ampliar captura de ${v.title}`}><img src={`/propuestas/vistas/${v.id}-1440.webp`} alt={`Vista completa del dashboard: ${v.title}`} width="1440" height={v.id === 'user-field' || v.id === 'user-panel' ? 1741 : undefined} loading="lazy" /></a></article>)}</div>
    <section className="dashboard-gallery-recommendation"><h2>La combinación que elegiría</h2><p>Cuaderno como inicio, temporada para organizar y ficha por planta para profundizar. Conservaría el diario privado, las fotos, el uso sin cuenta y la sincronización opcional. Compactaría ingreso y ajustes; evitaría medidores sin datos reales.</p><p>Para clubes, empezaría por ficha y actividades con revisión editorial. Después incorporaría miembros y permisos. La autogestión y las organizaciones son funciones propuestas: hoy el panel de club todavía depende de la gestión editorial del Atlas.</p></section>
  </main>;
}
