import { requireRole } from '../../lib/auth/roles';
import { listClubEventSubmissions, CLUB_EVENT_STATUS_LABELS } from '../../lib/community/clubEvents';
import { EVENT_TYPE_LABELS, getProvinceLabel } from '../../lib/community/communityData';
import { reviewClubEvent } from './actions';
import styles from '../admin.module.css';

export const metadata = { title: 'Eventos de clubes — Panel administrador' };

function formatDate(value) {
  if (!value) return '—';
  return new Date(value.length === 10 ? `${value}T00:00:00` : value).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function Submission({ item }) {
  const { event } = item;
  const place = [event.locality, getProvinceLabel(event.provinceId)].filter(Boolean).join(', ') || 'Sin lugar (virtual)';
  return (
    <article className={styles.section}>
      <h2>{event.title}</h2>
      <p className={styles.sectionNote}>
        {CLUB_EVENT_STATUS_LABELS[item.status]} · {item.clubName ?? 'Club sin nombre'} ({item.clubEmail}) · enviado el {formatDate(item.submittedAt)}
      </p>
      <p>{EVENT_TYPE_LABELS[event.type]} · {event.modality} · {formatDate(event.date)}{event.endDate ? ` al ${formatDate(event.endDate)}` : ''} · {place}</p>
      <p style={{ whiteSpace: 'pre-wrap' }}>{event.description}</p>
      {item.reviewNote && <p className={styles.sectionNote}>Nota de revisión: {item.reviewNote}</p>}
      {(item.status === 'pending' || item.status === 'approved') && (
        <form action={reviewClubEvent} className={styles.searchBar}>
          <input type="hidden" name="id" value={item.id} />
          <input type="text" name="note" maxLength={500} placeholder="Nota para el club (opcional)" aria-label="Nota para el club" />
          {item.status === 'pending' && <button className={styles.smallButton} name="decision" value="approve">Aprobar y publicar</button>}
          <button className={`${styles.smallButton} ${styles.smallButtonDanger}`} name="decision" value="reject">{item.status === 'approved' ? 'Dar de baja' : 'Rechazar'}</button>
        </form>
      )}
    </article>
  );
}

export default async function AdminEventosPage() {
  await requireRole('admin');
  const { submissions, error } = await listClubEventSubmissions();
  const pending = submissions.filter((item) => item.status === 'pending');
  const resolved = submissions.filter((item) => item.status !== 'pending');

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Eventos de clubes</h1>
        <p>Actividades propuestas por cuentas de club. Ninguna se publica en la Agenda sin aprobación.</p>
      </div>
      {error && <p className={styles.emptyState}>No se pudo cargar la bandeja.</p>}
      <div className={styles.section}>
        <h2>Pendientes de revisión ({pending.length})</h2>
        {pending.length === 0 && <div className={styles.emptyState}>No hay actividades pendientes.</div>}
      </div>
      {pending.map((item) => <Submission key={item.id} item={item} />)}
      {resolved.length > 0 && <div className={styles.section}><h2>Resueltas</h2></div>}
      {resolved.map((item) => <Submission key={item.id} item={item} />)}
    </>
  );
}
