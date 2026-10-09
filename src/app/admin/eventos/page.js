import { requireRole } from '../../lib/auth/roles';
import { listReviewQueue } from '../../lib/club/data';
import { CONTENT_KIND_LABELS, COURSE_COST_LABELS, MODALITY_LABELS, SUBMISSION_STATUS_LABELS } from '../../lib/club/content';
import { EVENT_TYPE_LABELS, getProvinceLabel } from '../../lib/community/communityData';
import { reviewClubProfile, reviewClubSubmission } from './actions';
import styles from '../admin.module.css';

export const metadata = { title: 'Contenido de clubes — Panel administrador' };

function formatDate(value) {
  if (!value) return '—';
  return new Date(value.length === 10 ? `${value}T00:00:00` : value).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function place(payload) {
  return [payload.locality, getProvinceLabel(payload.provinceId)].filter(Boolean).join(', ') || 'Sin lugar (virtual)';
}

function Facts({ item }) {
  const { kind, payload } = item;
  if (kind === 'event') return <p>{EVENT_TYPE_LABELS[payload.type]} · {MODALITY_LABELS[payload.modality]} · {formatDate(payload.date)}{payload.endDate ? ` al ${formatDate(payload.endDate)}` : ''} · {place(payload)}</p>;
  if (kind === 'course') return <p>{MODALITY_LABELS[payload.modality]} · desde el {formatDate(payload.date)} · {payload.duration} · {COURSE_COST_LABELS[payload.cost]}{payload.capacity ? ` · ${payload.capacity} cupos` : ''} · {place(payload)}</p>;
  return null;
}

function ReviewForm({ action, hidden, canApprove, rejectLabel }) {
  return (
    <form action={action} className={styles.searchBar}>
      <input type="hidden" name={hidden.name} value={hidden.value} />
      <input type="text" name="note" maxLength={500} placeholder="Nota para el club (opcional)" aria-label="Nota para el club" />
      {canApprove && <button className={styles.smallButton} name="decision" value="approve">Aprobar y publicar</button>}
      <button className={`${styles.smallButton} ${styles.smallButtonDanger}`} name="decision" value="reject">{rejectLabel}</button>
    </form>
  );
}

function Submission({ item }) {
  return (
    <article className={styles.section}>
      <h2>{CONTENT_KIND_LABELS[item.kind]} · {item.payload.title}</h2>
      <p className={styles.sectionNote}>{SUBMISSION_STATUS_LABELS[item.status]} · {item.clubName} · enviado el {formatDate(item.submittedAt)}</p>
      <Facts item={item} />
      <p style={{ whiteSpace: 'pre-wrap' }}>{item.payload.description}</p>
      {item.reviewNote && <p className={styles.sectionNote}>Nota de revisión: {item.reviewNote}</p>}
      {(item.status === 'pending' || item.status === 'approved') && (
        <ReviewForm action={reviewClubSubmission} hidden={{ name: 'id', value: item.id }} canApprove={item.status === 'pending'} rejectLabel={item.status === 'approved' ? 'Dar de baja' : 'Rechazar'} />
      )}
    </article>
  );
}

export default async function AdminEventosPage() {
  await requireRole('admin');
  const { fichas, submissions, error } = await listReviewQueue();
  const pending = submissions.filter((item) => item.status === 'pending');
  const resolved = submissions.filter((item) => item.status !== 'pending');

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Contenido de clubes</h1>
        <p>Fichas, eventos, cursos y novedades que cargan las cuentas de club. Nada se publica sin aprobación.</p>
      </div>
      {error && <p className={styles.emptyState}>No se pudo cargar la bandeja.</p>}

      <div className={styles.section}>
        <h2>Fichas con cambios pendientes ({fichas.length})</h2>
        {fichas.length === 0 && <div className={styles.emptyState}>No hay fichas pendientes.</div>}
      </div>
      {fichas.map((ficha) => (
        <article className={styles.section} key={ficha.clubId}>
          <h2>Ficha · {ficha.clubName}</h2>
          <p className={styles.sectionNote}>{ficha.hasPublished ? 'Reemplaza a la ficha publicada' : 'Primera publicación'} · {place(ficha.draft)}{ficha.draft.foundedYear ? ` · desde ${ficha.draft.foundedYear}` : ''}</p>
          {ficha.photoUrl && <p><img src={ficha.photoUrl} alt={`Foto propuesta para la ficha de ${ficha.clubName}`} style={{ maxWidth: 320, height: 'auto', display: 'block' }} /></p>}
          <p style={{ whiteSpace: 'pre-wrap' }}>{ficha.draft.description}</p>
          {ficha.draft.specialties?.length > 0 && <p className={styles.sectionNote}>Especialidades: {ficha.draft.specialties.join(' · ')}</p>}
          <ReviewForm action={reviewClubProfile} hidden={{ name: 'clubId', value: ficha.clubId }} canApprove rejectLabel="Rechazar" />
        </article>
      ))}

      <div className={styles.section}>
        <h2>Contenidos pendientes de revisión ({pending.length})</h2>
        {pending.length === 0 && <div className={styles.emptyState}>No hay contenidos pendientes.</div>}
      </div>
      {pending.map((item) => <Submission key={item.id} item={item} />)}
      {resolved.length > 0 && <div className={styles.section}><h2>Resueltos</h2></div>}
      {resolved.map((item) => <Submission key={item.id} item={item} />)}
    </>
  );
}
