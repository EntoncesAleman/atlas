import { requireClubAccess } from '../lib/club/context';
import { getClubWorkspaceData } from '../lib/club/data';
import { ARGENTINA_PROVINCES } from '../lib/geo/argentinaProvinces';
import ClubWorkspace from './ClubWorkspace';

export default async function ClubPage() {
  const { user, club, capacity } = await requireClubAccess();
  const data = await getClubWorkspaceData(club.id);
  // Solo id y nombre: la geometría del mapa no hace falta en los formularios.
  const provinces = ARGENTINA_PROVINCES.map(({ id, name }) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name, 'es'));

  return <ClubWorkspace clubName={club.name} capacity={capacity} userId={user.id} data={data} provinces={provinces} />;
}
