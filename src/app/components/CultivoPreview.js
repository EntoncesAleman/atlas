import Link from 'next/link';
export default function CultivoPreview() {
  return <section className="home-preview" aria-labelledby="cultivo-preview-title">
    <div><span className="club-eyebrow">Mi Cultivo</span><h2 id="cultivo-preview-title">Un lugar para llevar tu bitácora</h2><p>Registrá plantas, observaciones y fechas. Con tu cuenta, sumá fotos privadas y consultá tu historial desde otros dispositivos.</p><Link className="club-button club-button-outline" href="/mi-cultivo">Conocer Mi Cultivo</Link></div>
    <div className="preview-journal"><span className="section-label dark-label">Ejemplo de bitácora · datos de demostración</span><h3>Mi primera temporada</h3><ul><li><span>Planta 01</span><strong>Crecimiento</strong></li><li><span>Última observación</span><p>Apareció un nuevo par de hojas. Agregué una foto para comparar el cambio.</p></li><li><span>Historial</span><strong>Fechas, notas y fotos en un mismo lugar</strong></li></ul></div>
  </section>;
}
