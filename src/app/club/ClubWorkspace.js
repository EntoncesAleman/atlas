'use client';

// Espacio del club: mismas secciones que el menú lateral (`CLUB_LINKS`). Hoy la ficha, la agenda
// y el equipo se administran editorialmente, así que cada sección muestra su estado real y no
// formularios que todavía no guardan nada.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ContextHeader from '../components/shell/ContextHeader';
import { CLUB_LINKS, WORKSPACE_EVENT, readWorkspaceSection } from '../lib/workspace/navigation';

const CLUB_SECTIONS = CLUB_LINKS.filter((item) => item.href.startsWith('/club?'));

export default function ClubWorkspace({ clubName }) {
  const [section, setSection] = useState('actividad');

  useEffect(() => {
    const update = () => setSection(readWorkspaceSection(CLUB_SECTIONS, 'actividad'));
    update();
    window.addEventListener(WORKSPACE_EVENT, update);
    window.addEventListener('popstate', update);
    return () => { window.removeEventListener(WORKSPACE_EVENT, update); window.removeEventListener('popstate', update); };
  }, []);

  return (
    <div className="club-shell personal-workspace club-workspace">
      <ContextHeader
        kicker={`Espacio del club · ${clubName ?? 'cuenta aprobada'}`}
        title={CLUB_SECTIONS.find((item) => item.section === section)?.label ?? 'Panel de club'}
      />

      <div className="dashboard-main club-mi-cultivo-main">
        {section === 'actividad' && (
          <>
            <section className="personal-journal-intro">
              <span className="personal-privacy-tag">Cuenta de club aprobada</span>
              <h2>{clubName ?? 'Tu club'}</h2>
              <p>Este es el espacio de tu organización dentro del Atlas, separado de tu bitácora personal.</p>
            </section>
            <section className="atlas-entry-section personal-network-section">
              <h2>Actividad</h2>
              <div className="personal-empty-state">
                <h3>Todavía no hay actividad publicada</h3>
                <p>
                  Las novedades, eventos y cursos de los clubes hoy los carga el equipo del Atlas.
                  Para publicar o actualizar algo de tu club, escribinos y lo revisamos.
                </p>
              </div>
              <div className="personal-network-links">
                <Link href="/aportes">Enviar información al equipo ↗</Link>
                <Link href="/comunidad">Ver Comunidad ↗</Link>
              </div>
            </section>
          </>
        )}

        {section === 'ficha' && (
          <section className="atlas-entry-section personal-network-section">
            <span className="personal-privacy-tag">Directorio público</span>
            <h2>Ficha del club</h2>
            <dl className="personal-facts">
              <div><dt>Nombre</dt><dd>{clubName ?? 'Sin nombre cargado'}</dd></div>
              <div><dt>Estado de la cuenta</dt><dd>Aprobada por el equipo del Atlas</dd></div>
            </dl>
            <div className="personal-empty-state">
              <h3>La ficha pública todavía no se edita desde acá</h3>
              <p>
                La información del directorio de Comunidad se administra editorialmente. La
                edición desde este panel es la próxima etapa.
              </p>
            </div>
            <div className="personal-network-links">
              <Link href="/comunidad/clubes">Ver el directorio de clubes ↗</Link>
            </div>
          </section>
        )}

        {section === 'agenda' && (
          <section className="atlas-entry-section personal-network-section">
            <span className="personal-privacy-tag">Agenda y formación</span>
            <h2>Actividades del club</h2>
            <div className="personal-empty-state">
              <h3>Tu club no tiene actividades publicadas</h3>
              <p>Los eventos y cursos se publican en la agenda del territorio después de una revisión editorial.</p>
            </div>
            <div className="personal-network-links">
              <Link href="/comunidad/agenda">Ver agenda del territorio ↗</Link>
              <Link href="/comunidad/formacion">Ver formación ↗</Link>
            </div>
          </section>
        )}

        {section === 'equipo' && (
          <section className="atlas-entry-section personal-network-section">
            <span className="personal-privacy-tag">Equipo</span>
            <h2>Personas del club</h2>
            <div className="personal-empty-state">
              <h3>Una sola cuenta por ahora</h3>
              <p>Sumar integrantes y repartir permisos todavía no está disponible. El club se gestiona desde esta cuenta.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
