import { getSessionProfile } from '../lib/supabase/server';
import { listClubEventSubmissions } from '../lib/community/clubEvents';
import { ARGENTINA_PROVINCES } from '../lib/geo/argentinaProvinces';
import ClubWorkspace from './ClubWorkspace';

export default async function ClubPage() {
  const { user, profile } = await getSessionProfile();
  const { submissions, error } = await listClubEventSubmissions({ clubId: user?.id });
  // Solo id y nombre: la geometría del mapa no hace falta en el formulario.
  const provinces = ARGENTINA_PROVINCES.map(({ id, name }) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name, 'es'));

  return <ClubWorkspace clubName={profile?.club_name ?? null} submissions={submissions} submissionsUnavailable={Boolean(error)} provinces={provinces} />;
}
