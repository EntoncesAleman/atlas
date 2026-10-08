import { getSessionProfile } from '../lib/supabase/server';
import ClubWorkspace from './ClubWorkspace';

export default async function ClubPage() {
  const { profile } = await getSessionProfile();

  return <ClubWorkspace clubName={profile?.club_name ?? null} />;
}
