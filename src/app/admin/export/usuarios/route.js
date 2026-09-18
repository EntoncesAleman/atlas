import { requireRole } from '../../../lib/auth/roles';
import { listCombinedUsers } from '../../_lib/users';
import { toCsv, csvResponse } from '../../_lib/csv';

export async function GET() {
  await requireRole('admin');
  const { users } = await listCombinedUsers();
  const csv = toCsv(users, [
    { label: 'email', value: (u) => u.email },
    { label: 'rol', value: (u) => u.role },
    { label: 'origen', value: (u) => u.provider },
    { label: 'alta', value: (u) => u.createdAt },
    { label: 'ultimo_ingreso', value: (u) => u.lastSignInAt },
    { label: 'suspendido', value: (u) => (u.isBanned ? 'si' : 'no') },
    { label: 'club_nombre', value: (u) => u.clubName ?? '' },
    { label: 'club_estado', value: (u) => u.clubStatus ?? '' }
  ]);
  return csvResponse(csv, `usuarios-${new Date().toISOString().slice(0, 10)}.csv`);
}
