import { requireRole } from '../../../lib/auth/roles';
import { listCombinedUsers } from '../../_lib/users';
import { toCsv, csvResponse } from '../../_lib/csv';

export async function GET() {
  await requireRole('admin');
  const { users } = await listCombinedUsers();
  const clubAccounts = users.filter((u) => u.role === 'club' || u.clubStatus);
  const csv = toCsv(clubAccounts, [
    { label: 'email', value: (u) => u.email },
    { label: 'club_nombre', value: (u) => u.clubName ?? '' },
    { label: 'club_estado', value: (u) => u.clubStatus ?? '' },
    { label: 'rol', value: (u) => u.role },
    { label: 'alta', value: (u) => u.createdAt }
  ]);
  return csvResponse(csv, `clubes-${new Date().toISOString().slice(0, 10)}.csv`);
}
