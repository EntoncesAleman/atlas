'use client';

// Espacio del club: mismas secciones que el menú lateral (`CLUB_LINKS`). El club propone
// actividades para la Agenda, que se publican recién después de la revisión de un admin. La ficha
// y el equipo todavía se administran editorialmente, así que muestran su estado real y no
// formularios que no guardan nada.

import { useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ContextHeader from '../components/shell/ContextHeader';
import { CLUB_LINKS, WORKSPACE_EVENT, readWorkspaceSection, navigateWithinWorkspace } from '../lib/workspace/navigation';
import { EVENT_TYPES, EVENT_TYPE_LABELS, EVENT_MODALITIES } from '../lib/community/communityData';
import { submitClubEvent, withdrawClubEvent } from './actions';

const CLUB_SECTIONS = CLUB_LINKS.filter((item) => item.href.startsWith('/club?'));

const MODALITY_LABELS = { PRESENCIAL: 'Presencial', VIRTUAL: 'Virtual', HIBRIDA: 'Híbrida' };
const STATUS_LABELS = { pending: 'En revisión', approved: 'Publicado', rejected: 'No publicado', withdrawn: 'Retirado' };

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function SubmissionList({ submissions, provinces }) {
  return (
    <ul className="club-submission-list">
      {submissions.map((item) => (
        <li key={item.id} className={`club-submission club-submission-${item.status}`}>
          <span className="club-submission-status">{STATUS_LABELS[item.status]}</span>
          <h3>{item.event.title}</h3>
          <p className="club-submission-meta">
            {EVENT_TYPE_LABELS[item.event.type]} · {formatDate(item.event.date)}{item.event.endDate && item.event.endDate !== item.event.date ? ` al ${formatDate(item.event.endDate)}` : ''} · {[item.event.locality, provinces.find((province) => province.id === item.event.provinceId)?.name].filter(Boolean).join(', ') || MODALITY_LABELS[item.event.modality]}
          </p>
          {item.reviewNote && <p className="club-submission-note">Nota del equipo del Atlas: {item.reviewNote}</p>}
          {item.status === 'approved' && <Link href="/comunidad/agenda">Ver en la Agenda ↗</Link>}
          {item.status === 'pending' && (
            <form action={withdrawClubEvent}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="club-submission-withdraw">Retirar propuesta</button>
            </form>
          )}
        </li>
      ))}
    </ul>
  );
}

function EventForm({ provinces }) {
  const [state, formAction, pending] = useActionState(submitClubEvent, null);
  const formRef = useRef(null);
  useEffect(() => { if (state?.ok) formRef.current?.reset(); }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mi-cultivo-event-form club-event-form">
      <label className="mi-cultivo-field mi-cultivo-field-wide">
        <span>Título de la actividad</span>
        <input type="text" name="title" minLength={5} maxLength={120} required />
      </label>
      <label className="mi-cultivo-field">
        <span>Tipo</span>
        <select name="type" required defaultValue="">
          <option value="" disabled>Elegir…</option>
          {EVENT_TYPES.map((type) => <option key={type} value={type}>{EVENT_TYPE_LABELS[type]}</option>)}
        </select>
      </label>
      <label className="mi-cultivo-field">
        <span>Modalidad</span>
        <select name="modality" required defaultValue="PRESENCIAL">
          {EVENT_MODALITIES.map((modality) => <option key={modality} value={modality}>{MODALITY_LABELS[modality]}</option>)}
        </select>
      </label>
      <label className="mi-cultivo-field">
        <span>Fecha de inicio</span>
        <input type="date" name="date" required />
      </label>
      <label className="mi-cultivo-field">
        <span>Fecha de cierre (opcional)</span>
        <input type="date" name="endDate" />
      </label>
      <label className="mi-cultivo-field">
        <span>Provincia</span>
        <select name="provinceId" defaultValue="">
          <option value="">Sin provincia (solo virtual)</option>
          {provinces.map((province) => <option key={province.id} value={province.id}>{province.name}</option>)}
        </select>
      </label>
      <label className="mi-cultivo-field">
        <span>Localidad o zona (opcional)</span>
        <input type="text" name="locality" maxLength={80} placeholder="Sin dirección exacta" />
      </label>
      <label className="mi-cultivo-field mi-cultivo-field-wide">
        <span>Descripción</span>
        <textarea name="description" rows={4} minLength={40} maxLength={1200} required placeholder="De qué se trata, a quién está dirigida y cómo participar. Sin enlaces ni precios." />
      </label>
      <div className="mi-cultivo-form-actions">
        <button type="submit" className="primary-button mi-cultivo-submit" disabled={pending}>{pending ? 'Enviando…' : 'Enviar a revisión'}</button>
      </div>
      {state?.message && <p className={`club-event-form-status${state.ok ? '' : ' is-error'}`} role={state.ok ? 'status' : 'alert'}>{state.message}</p>}
    </form>
  );
}

export default function ClubWorkspace({ clubName, submissions = [], submissionsUnavailable = false, provinces = [] }) {
  const [section, setSection] = useState('actividad');
  const count = (status) => submissions.filter((item) => item.status === status).length;
  const recent = submissions.filter((item) => item.status !== 'withdrawn').slice(0, 3);

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
              <h2>Tus actividades en la Agenda</h2>
              <dl className="personal-facts club-activity-counts">
                <div><dt>En revisión</dt><dd>{count('pending')}</dd></div>
                <div><dt>Publicadas</dt><dd>{count('approved')}</dd></div>
                <div><dt>No publicadas</dt><dd>{count('rejected')}</dd></div>
              </dl>
              {submissionsUnavailable ? (
                <p className="atlas-section-note" role="status">No se pudieron cargar tus actividades. Probá recargar la página.</p>
              ) : recent.length === 0 ? (
                <div className="personal-empty-state">
                  <h3>Todavía no propusiste ninguna actividad</h3>
                  <p>Cargá un curso, taller, charla o encuentro. El equipo del Atlas lo revisa y, si corresponde, lo publica en la Agenda.</p>
                </div>
              ) : (
                <SubmissionList submissions={recent} provinces={provinces} />
              )}
              <div className="personal-network-links">
                <Link href="/club?seccion=agenda" className="club-button" onClick={(event) => navigateWithinWorkspace(event, '/club?seccion=agenda')}>Proponer una actividad</Link>
                <Link href="/comunidad/agenda">Ver la Agenda pública ↗</Link>
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
          <>
            <section className="atlas-entry-section personal-network-section">
              <span className="personal-privacy-tag">Se publica después de la revisión</span>
              <h2>Proponer una actividad</h2>
              <p>Cursos, talleres, charlas, jornadas y encuentros de tu club. El equipo del Atlas revisa cada propuesta antes de publicarla en la Agenda.</p>
              <EventForm provinces={provinces} />
            </section>
            <section className="atlas-entry-section personal-network-section">
              <h2>Tus propuestas</h2>
              {submissionsUnavailable ? (
                <p className="atlas-section-note" role="status">No se pudieron cargar tus actividades. Probá recargar la página.</p>
              ) : submissions.length === 0 ? (
                <div className="personal-empty-state">
                  <h3>Tu club no tiene actividades enviadas</h3>
                  <p>Las que envíes aparecen acá con su estado: en revisión, publicada o no publicada.</p>
                </div>
              ) : (
                <SubmissionList submissions={submissions} provinces={provinces} />
              )}
              <div className="personal-network-links">
                <Link href="/comunidad/agenda">Ver agenda del territorio ↗</Link>
                <Link href="/comunidad/formacion">Ver formación ↗</Link>
              </div>
            </section>
          </>
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
