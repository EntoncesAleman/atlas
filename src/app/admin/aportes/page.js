import { getSupabaseAdminClient } from '../../lib/supabase/admin';
import { requireRole } from '../../lib/auth/roles';
import { markReviewed } from './actions';
import styles from '../admin.module.css';
export default async function Page() {
  await requireRole('admin'); const admin = getSupabaseAdminClient();
  const result = admin ? await admin.from('admin_audit_log').select('id, actor_email, target_type, details, created_at').eq('action', 'public_contribution').order('created_at', { ascending: false }).limit(100) : { error: true };
  return <><div className={styles.pageHeader}><h1>Aportes y correcciones</h1><p>Mensajes enviados desde el sitio público. Su recepción no publica cambios en el Atlas.</p></div>{result.error ? <p>No se pudo cargar la bandeja.</p> : result.data.length ? result.data.map(item => <article className={styles.section} key={item.id}><h2>{item.target_type} · {item.details?.reviewed ? 'Revisado' : 'Pendiente'}</h2><p>{new Date(item.created_at).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })} · {item.actor_email || 'Sin email de contacto'}</p><p style={{ whiteSpace: 'pre-wrap' }}>{item.details?.message}</p><p>Referencia: {item.details?.reference || 'Sin referencia'}</p>{!item.details?.reviewed && <form action={markReviewed}><input type="hidden" name="id" value={item.id} /><button className={styles.smallButton}>Marcar revisado</button></form>}</article>) : <p>Todavía no hay aportes.</p>}</>;
}
