'use client';

import { useEffect, useState } from 'react';

export default function EnvironmentalPanel({ province = '', zone = '' }) {
  const [selectedProvince, setSelectedProvince] = useState(province);
  const [selectedZone, setSelectedZone] = useState(zone);

  useEffect(() => {
    try {
      const storedProvince = window.localStorage.getItem('atlas:selectedProvince') || '';
      const storedZone = window.localStorage.getItem('atlas:selectedZone') || '';
      setSelectedProvince(storedProvince || province);
      setSelectedZone(storedZone || zone);
    } catch {
      setSelectedProvince(province);
      setSelectedZone(zone);
    }
  }, [province, zone]);

  const hasLocation = Boolean(selectedProvince || selectedZone);
  const title = hasLocation ? `${selectedProvince}${selectedZone ? ' · ' + selectedZone : ''}` : 'Argentina';

  return (
    <section className="environmental-panel" aria-label="Panel Ambiental">
      <div className="environmental-panel-head">
        <span className="panel-kicker">Panel Ambiental</span>
        <span className="panel-status environmental-status">Estado editorial</span>
      </div>

      <div className="environmental-panel-content">
        <div className="environmental-context">
          <span className="environmental-label">Contexto</span>
          <span className="environmental-title">{title}</span>
        </div>

        <div className="environmental-meta">
          <span className="environmental-label">Estado</span>
          <span className="environmental-state">Sin datos</span>
        </div>

        <div className="environmental-message">
          {hasLocation ? (
            <>
              <p>El clima de esta zona se incorpora junto con la fuente y el contexto editorial.</p>
              <p className="environmental-note">Mientras llega la fuente meteorológica, el atlas mantiene la mirada geográfica.</p>
            </>
          ) : (
            <>
              <p>Elegí una provincia o una zona para abrir el contexto ambiental del atlas.</p>
              <p className="environmental-note">La observación sigue separada de la cartografía.</p>
            </>
          )}
        </div>

        <div className="environmental-grid">
          <div className="environmental-row">
            <span className="environmental-row-label">Fuente meteorológica</span>
            <span className="environmental-row-state">Pendiente</span>
          </div>
          <div className="environmental-row">
            <span className="environmental-row-label">Condición editorial</span>
            <span className="environmental-row-state">En preparación</span>
          </div>
          <div className="environmental-row">
            <span className="environmental-row-label">Contenido</span>
            <span className="environmental-row-state">Atlas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
