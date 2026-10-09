'use client';

// Espacio del club: mismas secciones que el menú lateral (`CLUB_LINKS`). Todo lo que sale al
// público (ficha, eventos, cursos, novedades) pasa antes por la revisión de un admin; el cuaderno
// colectivo y el equipo son internos del club.

import { useActionState, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ContextHeader from '../components/shell/ContextHeader';
import { CLUB_LINKS, WORKSPACE_EVENT, readWorkspaceSection, navigateWithinWorkspace } from '../lib/workspace/navigation';
import { EVENT_TYPES, EVENT_TYPE_LABELS, EVENT_MODALITIES } from '../lib/community/communityData';
import { CLUB_SPECIALTIES, CONTENT_KIND_LABELS, COURSE_COSTS, COURSE_COST_LABELS, MEMBER_ROLES, MEMBER_ROLE_LABELS, MODALITY_LABELS, SUBMISSION_STATUS_LABELS } from '../lib/club/content';
import { STAGES } from '../lib/miCultivo/model';
import { addClubJournalEntry, deleteClubJournalEntry, inviteClubMember, submitClubContent, updateClubMember, withdrawClubContent } from './actions';

const CLUB_SECTIONS = CLUB_LINKS.filter((item) => item.href.startsWith('/club?'));
const RANK = { member: 0, editor: 1, owner: 2 };

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function FormStatus({ state }) {
  if (!state?.message) return null;
  return <p className={`club-event-form-status${state.ok ? '' : ' is-error'}`} role={state.ok ? 'status' : 'alert'}>{state.message}</p>;
}

function Field({ label, wide, children }) {
  return <label className={`mi-cultivo-field${wide ? ' mi-cultivo-field-wide' : ''}`}><span>{label}</span>{children}</label>;
}

function PlaceFields({ provinces }) {
  return (
    <>
      <Field label="Modalidad">
        <select name="modality" required defaultValue="PRESENCIAL">
          {EVENT_MODALITIES.map((modality) => <option key={modality} value={modality}>{MODALITY_LABELS[modality]}</option>)}
        </select>
      </Field>
      <Field label="Provincia">
        <select name="provinceId" defaultValue="">
          <option value="">Sin provincia (solo virtual)</option>
          {provinces.map((province) => <option key={province.id} value={province.id}>{province.name}</option>)}
        </select>
      </Field>
      <Field label="Localidad o zona (opcional)"><input type="text" name="locality" maxLength={80} placeholder="Sin dirección exacta" /></Field>
    </>
  );
}

// Formulario de un evento, un curso o una novedad. Los tres se envían a revisión por la misma acción.
function ContentForm({ kind, provinces }) {
  const [state, formAction, pending] = useActionState(submitClubContent, null);
  const formRef = useRef(null);
  useEffect(() => { if (state?.ok) formRef.current?.reset(); }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mi-cultivo-event-form club-event-form">
      <input type="hidden" name="kind" value={kind} />
      <Field label="Título" wide><input type="text" name="title" minLength={5} maxLength={120} required /></Field>
      {kind === 'event' && (
        <>
          <Field label="Tipo">
            <select name="type" required defaultValue="">
              <option value="" disabled>Elegir…</option>
              {EVENT_TYPES.map((type) => <option key={type} value={type}>{EVENT_TYPE_LABELS[type]}</option>)}
            </select>
          </Field>
          <Field label="Fecha de inicio"><input type="date" name="date" required /></Field>
          <Field label="Fecha de cierre (opcional)"><input type="date" name="endDate" /></Field>
          <PlaceFields provinces={provinces} />
        </>
      )}
      {kind === 'course' && (
        <>
          <Field label="Fecha de inicio"><input type="date" name="date" required /></Field>
          <Field label="Duración"><input type="text" name="duration" maxLength={60} required placeholder="4 encuentros de 2 horas" /></Field>
          <Field label="Costo">
            <select name="cost" required defaultValue="GRATUITO">
              {COURSE_COSTS.map((cost) => <option key={cost} value={cost}>{COURSE_COST_LABELS[cost]}</option>)}
            </select>
          </Field>
          <Field label="Cupos (opcional)"><input type="number" name="capacity" min={1} max={5000} inputMode="numeric" /></Field>
          <PlaceFields provinces={provinces} />
        </>
      )}
      <Field label={kind === 'news' ? 'Texto' : 'Descripción'} wide>
        <textarea name="description" rows={4} minLength={40} maxLength={1500} required placeholder={kind === 'news' ? 'Qué pasó o qué quieren contar. Sin enlaces.' : 'De qué se trata, a quién está dirigido y cómo participar. Sin enlaces ni precios.'} />
      </Field>
      <div className="mi-cultivo-form-actions">
        <button type="submit" className="primary-button mi-cultivo-submit" disabled={pending}>{pending ? 'Enviando…' : 'Enviar a revisión'}</button>
      </div>
      <FormStatus state={state} />
    </form>
  );
}

function SubmissionList({ submissions, provinces, canEdit }) {
  const place = (payload) => [payload.locality, provinces.find((province) => province.id === payload.provinceId)?.name].filter(Boolean).join(', ') || MODALITY_LABELS[payload.modality];
  return (
    <ul className="club-submission-list">
      {submissions.map((item) => (
        <li key={item.id} className={`club-submission club-submission-${item.status}`}>
          <span className="club-submission-status">{CONTENT_KIND_LABELS[item.kind]} · {SUBMISSION_STATUS_LABELS[item.status]}</span>
          <h3>{item.payload.title}</h3>
          {item.kind === 'event' && <p className="club-submission-meta">{EVENT_TYPE_LABELS[item.payload.type]} · {formatDate(item.payload.date)}{item.payload.endDate && item.payload.endDate !== item.payload.date ? ` al ${formatDate(item.payload.endDate)}` : ''} · {place(item.payload)}</p>}
          {item.kind === 'course' && <p className="club-submission-meta">Desde el {formatDate(item.payload.date)} · {item.payload.duration} · {COURSE_COST_LABELS[item.payload.cost]} · {place(item.payload)}</p>}
          {item.kind === 'news' && <p className="club-submission-meta">{item.payload.description.slice(0, 160)}{item.payload.description.length > 160 ? '…' : ''}</p>}
          {item.reviewNote && <p className="club-submission-note">Nota del equipo del Atlas: {item.reviewNote}</p>}
          {canEdit && (item.status === 'pending' || item.status === 'approved') && (
            <form action={withdrawClubContent}>
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="club-submission-withdraw">{item.status === 'approved' ? 'Dar de baja' : 'Retirar propuesta'}</button>
            </form>
          )}
        </li>
      ))}
    </ul>
  );
}

function EmptyState({ title, children }) {
  return <div className="personal-empty-state"><h3>{title}</h3><p>{children}</p></div>;
}

function FichaSection({ clubName, ficha, provinces, canEdit }) {
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const current = ficha?.draft ?? ficha?.published ?? {};

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const response = await fetch('/api/club/ficha', { method: 'POST', body: new FormData(event.currentTarget) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) setStatus({ ok: false, message: result.error ?? 'No se pudo guardar la ficha.' });
      else { setStatus({ ok: true, message: 'Ficha enviada. El equipo del Atlas la revisa antes de publicarla.' }); router.refresh(); }
    } catch {
      setStatus({ ok: false, message: 'No se pudo guardar la ficha. Revisá tu conexión.' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="atlas-entry-section personal-network-section">
      <span className="personal-privacy-tag">Directorio público</span>
      <h2>Ficha de {clubName ?? 'tu club'}</h2>
      {ficha?.published && <p>La ficha está publicada. <Link href={`/comunidad/clubes/${ficha.slug}`}>Ver cómo se ve ↗</Link></p>}
      {!ficha?.published && <p>La ficha todavía no está publicada en el directorio de clubes.</p>}
      {ficha?.draftStatus === 'pending' && <p className="club-event-form-status" role="status">Hay cambios en revisión. Podés volver a editarlos hasta que se resuelvan.</p>}
      {ficha?.draftStatus === 'rejected' && <p className="club-event-form-status is-error" role="status">Los últimos cambios no se publicaron{ficha.reviewNote ? `: ${ficha.reviewNote}` : '.'} Corregilos y volvé a enviarlos.</p>}
      {!canEdit ? (
        current.description ? <p style={{ whiteSpace: 'pre-wrap' }}>{current.description}</p> : <EmptyState title="Ficha sin completar">La cuenta del club o alguien con permiso de edición puede completarla.</EmptyState>
      ) : (
        <form className="mi-cultivo-event-form club-event-form" onSubmit={handleSubmit} key={`${ficha?.draftStatus}-${current.photoPath ?? ''}`}>
          <Field label="Presentación del club" wide>
            <textarea name="description" rows={6} minLength={80} maxLength={1500} required defaultValue={current.description ?? ''} placeholder="Quiénes son, qué hacen y a quién está abierto el espacio. Sin enlaces." />
          </Field>
          <Field label="Provincia">
            <select name="provinceId" required defaultValue={current.provinceId ?? ''}>
              <option value="" disabled>Elegir…</option>
              {provinces.map((province) => <option key={province.id} value={province.id}>{province.name}</option>)}
            </select>
          </Field>
          <Field label="Localidad o zona (opcional)"><input type="text" name="locality" maxLength={80} defaultValue={current.locality ?? ''} placeholder="Sin dirección exacta" /></Field>
          <Field label="Año de inicio (opcional)"><input type="number" name="foundedYear" min={1950} max={2100} inputMode="numeric" defaultValue={current.foundedYear ?? ''} /></Field>
          <fieldset className="club-specialties mi-cultivo-field-wide">
            <legend>Especialidades (hasta 6)</legend>
            {CLUB_SPECIALTIES.map((specialty) => (
              <label key={specialty}><input type="checkbox" name="specialties" value={specialty} defaultChecked={(current.specialties ?? []).includes(specialty)} /> {specialty}</label>
            ))}
          </fieldset>
          <div className="mi-cultivo-field mi-cultivo-field-wide">
            <span>Foto del club (JPG, PNG o WebP, hasta 2 MB)</span>
            {ficha?.photoUrl && <img className="club-ficha-photo" src={ficha.photoUrl} alt="Foto actual de la ficha" />}
            <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" aria-label="Foto del club" />
            {ficha?.photoUrl && <label className="club-inline-check"><input type="checkbox" name="removePhoto" /> Quitar la foto actual</label>}
          </div>
          <div className="mi-cultivo-form-actions">
            <button type="submit" className="primary-button mi-cultivo-submit" disabled={busy}>{busy ? 'Enviando…' : 'Enviar ficha a revisión'}</button>
          </div>
          <FormStatus state={status} />
        </form>
      )}
    </section>
  );
}

function JournalSection({ journal, userId, capacity }) {
  const [state, formAction, pending] = useActionState(addClubJournalEntry, null);
  const formRef = useRef(null);
  useEffect(() => { if (state?.ok) formRef.current?.reset(); }, [state]);
  const stage = (id) => STAGES.find((item) => item.id === id)?.label;

  return (
    <>
      <section className="atlas-entry-section personal-network-section">
        <span className="personal-privacy-tag">Solo el equipo del club</span>
        <h2>Cuaderno colectivo</h2>
        <p>Un registro compartido del cultivo del club. Lo escribe cualquier integrante y no se publica. Tu bitácora personal sigue siendo solo tuya.</p>
        <form ref={formRef} action={formAction} className="mi-cultivo-event-form club-event-form">
          <Field label="Fecha"><input type="date" name="date" required /></Field>
          <Field label="Etapa (opcional)">
            <select name="stageId" defaultValue="">
              <option value="">Sin etapa</option>
              {STAGES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </Field>
          <Field label="Qué se observó" wide><textarea name="note" rows={3} minLength={3} maxLength={2000} required /></Field>
          <div className="mi-cultivo-form-actions">
            <button type="submit" className="primary-button mi-cultivo-submit" disabled={pending}>{pending ? 'Guardando…' : 'Agregar al cuaderno'}</button>
          </div>
          <FormStatus state={state} />
        </form>
      </section>
      <section className="atlas-entry-section personal-network-section">
        <h2>Registros</h2>
        {journal.length === 0 ? <EmptyState title="El cuaderno está vacío">El primer registro lo puede escribir cualquier integrante del equipo.</EmptyState> : (
          <ul className="club-submission-list">
            {journal.map((entry) => (
              <li key={entry.id} className="club-submission">
                <span className="club-submission-status">{formatDate(entry.date)}{entry.stageId ? ` · ${stage(entry.stageId)}` : ''} · {entry.authorName ?? 'Integrante'}</span>
                <p className="club-journal-note">{entry.note}</p>
                {(capacity === 'owner' || entry.authorId === userId) && (
                  <form action={deleteClubJournalEntry}><input type="hidden" name="id" value={entry.id} /><button type="submit" className="club-submission-withdraw">Borrar registro</button></form>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

function TeamSection({ members, isOwner }) {
  const [state, formAction, pending] = useActionState(inviteClubMember, null);
  const formRef = useRef(null);
  useEffect(() => { if (state?.ok) formRef.current?.reset(); }, [state]);

  return (
    <>
      {isOwner && (
        <section className="atlas-entry-section personal-network-section">
          <span className="personal-privacy-tag">Equipo</span>
          <h2>Sumar a alguien</h2>
          <p>Invitá por email a una persona con cuenta en el Atlas. Quien edita contenidos puede proponer actividades y cambiar la ficha; un integrante participa del cuaderno colectivo.</p>
          <form ref={formRef} action={formAction} className="mi-cultivo-event-form club-event-form">
            <Field label="Email de la persona"><input type="email" name="email" maxLength={254} required autoComplete="off" /></Field>
            <Field label="Permiso">
              <select name="role" defaultValue="member">
                {MEMBER_ROLES.map((role) => <option key={role} value={role}>{MEMBER_ROLE_LABELS[role]}</option>)}
              </select>
            </Field>
            <div className="mi-cultivo-form-actions">
              <button type="submit" className="primary-button mi-cultivo-submit" disabled={pending}>{pending ? 'Guardando…' : 'Invitar'}</button>
            </div>
            <FormStatus state={state} />
          </form>
        </section>
      )}
      <section className="atlas-entry-section personal-network-section">
        <h2>Personas del club</h2>
        {members.length === 0 ? <EmptyState title="Solo la cuenta del club">Todavía no hay integrantes sumados al equipo.</EmptyState> : (
          <ul className="club-submission-list">
            {members.map((member) => (
              <li key={member.id} className={`club-submission ${member.status === 'active' ? 'club-submission-approved' : ''}`}>
                <span className="club-submission-status">{member.status === 'active' ? 'Activo' : 'Invitación pendiente'} · {MEMBER_ROLE_LABELS[member.role]}</span>
                <h3>{member.email}</h3>
                {isOwner && (
                  <form action={updateClubMember} className="club-member-actions">
                    <input type="hidden" name="id" value={member.id} />
                    <select name="role" defaultValue={member.role} aria-label={`Permiso de ${member.email}`}>
                      {MEMBER_ROLES.map((role) => <option key={role} value={role}>{MEMBER_ROLE_LABELS[role]}</option>)}
                    </select>
                    <button type="submit" name="intent" value="role" className="club-submission-withdraw">Cambiar permiso</button>
                    <button type="submit" name="intent" value="remove" className="club-submission-withdraw">Quitar del equipo</button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default function ClubWorkspace({ clubName, capacity, userId, data, provinces }) {
  const [section, setSection] = useState('actividad');
  const { ficha, submissions, members, journal, stats, unavailable } = data;
  const canEdit = RANK[capacity] >= RANK.editor;
  const isOwner = capacity === 'owner';
  const count = (status) => submissions.filter((item) => item.status === status).length;
  const ofKind = (...kinds) => submissions.filter((item) => kinds.includes(item.kind));
  const go = (href) => (event) => navigateWithinWorkspace(event, href);

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
        {unavailable && <p className="club-event-form-status is-error" role="alert">No se pudieron cargar los datos del club. Probá recargar la página.</p>}

        {section === 'actividad' && (
          <>
            <section className="personal-journal-intro">
              <span className="personal-privacy-tag">{isOwner ? 'Cuenta de club aprobada' : `Sos parte del equipo · ${MEMBER_ROLE_LABELS[capacity]}`}</span>
              <h2>{clubName ?? 'Tu club'}</h2>
              <p>Este es el espacio de tu organización dentro del Atlas, separado de tu bitácora personal.</p>
            </section>
            <section className="atlas-entry-section personal-network-section">
              <h2>Cómo viene el club</h2>
              <dl className="personal-facts club-activity-counts">
                <div><dt>Seguidores</dt><dd>{stats.followers}</dd></div>
                <div><dt>Visitas a la ficha (30 días)</dt><dd>{stats.views30}</dd></div>
                <div><dt>Publicados</dt><dd>{count('approved')}</dd></div>
                <div><dt>En revisión</dt><dd>{count('pending')}</dd></div>
              </dl>
              {!ficha?.published && <p className="atlas-section-note">Las visitas y los seguidores empiezan a contar cuando la ficha del club está publicada.</p>}
            </section>
            <section className="atlas-entry-section personal-network-section">
              <h2>Últimos contenidos</h2>
              {submissions.filter((item) => item.status !== 'withdrawn').length === 0 ? (
                <EmptyState title="Todavía no hay contenidos del club">Completá la ficha y proponé un evento, un curso o una novedad. El equipo del Atlas revisa cada cosa antes de publicarla.</EmptyState>
              ) : (
                <SubmissionList submissions={submissions.filter((item) => item.status !== 'withdrawn').slice(0, 4)} provinces={provinces} canEdit={canEdit} />
              )}
              <div className="personal-network-links">
                {canEdit && <Link href="/club?seccion=agenda" className="club-button" onClick={go('/club?seccion=agenda')}>Proponer una actividad</Link>}
                {canEdit && <Link href="/club?seccion=ficha" onClick={go('/club?seccion=ficha')}>Editar la ficha ↗</Link>}
                <Link href="/comunidad/agenda">Ver la Agenda pública ↗</Link>
              </div>
            </section>
          </>
        )}

        {section === 'ficha' && <FichaSection clubName={clubName} ficha={ficha} provinces={provinces} canEdit={canEdit} />}

        {section === 'agenda' && (
          <>
            {canEdit && (
              <section className="atlas-entry-section personal-network-section">
                <span className="personal-privacy-tag">Se publica después de la revisión</span>
                <h2>Proponer un evento</h2>
                <p>Talleres, charlas, jornadas y encuentros. Los aprobados salen en la Agenda y en la ficha del club.</p>
                <ContentForm kind="event" provinces={provinces} />
              </section>
            )}
            {canEdit && (
              <section className="atlas-entry-section personal-network-section">
                <span className="personal-privacy-tag">Se publica después de la revisión</span>
                <h2>Proponer un curso</h2>
                <p>Formación con duración y cupos. Los aprobados salen en Formación y en la ficha del club.</p>
                <ContentForm kind="course" provinces={provinces} />
              </section>
            )}
            <section className="atlas-entry-section personal-network-section">
              <h2>Eventos y cursos del club</h2>
              {ofKind('event', 'course').length === 0 ? <EmptyState title="Tu club no tiene actividades enviadas">Las que se envíen aparecen acá con su estado: en revisión, publicada o no publicada.</EmptyState> : <SubmissionList submissions={ofKind('event', 'course')} provinces={provinces} canEdit={canEdit} />}
              <div className="personal-network-links">
                <Link href="/comunidad/agenda">Ver agenda del territorio ↗</Link>
                <Link href="/comunidad/formacion">Ver formación ↗</Link>
              </div>
            </section>
          </>
        )}

        {section === 'novedades' && (
          <>
            {canEdit && (
              <section className="atlas-entry-section personal-network-section">
                <span className="personal-privacy-tag">Se publica después de la revisión</span>
                <h2>Publicar una novedad</h2>
                <p>Un comunicado corto que aparece en la ficha del club.</p>
                <ContentForm kind="news" provinces={provinces} />
              </section>
            )}
            <section className="atlas-entry-section personal-network-section">
              <h2>Novedades del club</h2>
              {ofKind('news').length === 0 ? <EmptyState title="Todavía no hay novedades">Las novedades aprobadas se muestran en la ficha pública del club.</EmptyState> : <SubmissionList submissions={ofKind('news')} provinces={provinces} canEdit={canEdit} />}
            </section>
          </>
        )}

        {section === 'cuaderno' && <JournalSection journal={journal} userId={userId} capacity={capacity} />}

        {section === 'equipo' && <TeamSection members={members} isOwner={isOwner} />}
      </div>
    </div>
  );
}
