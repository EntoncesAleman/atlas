// Quién es la persona respecto de un club. Un club es la cuenta con rol `club` (dueña); además
// puede tener integrantes (`club_members`) con permiso de edición o solo de participación.
//
//   owner  — la cuenta del club: todo, incluido gestionar el equipo.
//   editor — propone contenidos y edita la ficha.
//   member — participa del cuaderno colectivo.

import { redirect } from 'next/navigation';
import { getSessionProfile } from '../supabase/server';
import { getSupabaseAdminClient } from '../supabase/admin';

const CAPACITY_RANK = { member: 0, editor: 1, owner: 2 };

export function can(capacity, minCapacity) {
  return CAPACITY_RANK[capacity] >= CAPACITY_RANK[minCapacity];
}

export async function getClubContext() {
  const { user, profile } = await getSessionProfile();
  if (!user) return { user: null, profile: null, club: null, capacity: null };
  if (profile?.role === 'club') return { user, profile, club: { id: user.id, name: profile.club_name ?? null }, capacity: 'owner' };

  const admin = getSupabaseAdminClient();
  if (!admin) return { user, profile, club: null, capacity: null };
  const { data: membership } = await admin.from('club_members').select('club_id, role').eq('user_id', user.id).eq('status', 'active').order('created_at', { ascending: false }).limit(1).maybeSingle();
  if (!membership) return { user, profile, club: null, capacity: null };
  const { data: owner } = await admin.from('profiles').select('club_name, role').eq('id', membership.club_id).maybeSingle();
  if (owner?.role !== 'club') return { user, profile, club: null, capacity: null };
  return { user, profile, club: { id: membership.club_id, name: owner.club_name ?? null }, capacity: membership.role };
}

// Para páginas y acciones del panel de club. Sin sesión va al login; sin club o sin el permiso
// necesario vuelve a Mi Cultivo con el aviso de acceso denegado.
export async function requireClubAccess(minCapacity = 'member') {
  const context = await getClubContext();
  if (!context.user) redirect('/mi-cultivo?auth=requerido');
  if (!context.club || !can(context.capacity, minCapacity)) redirect('/mi-cultivo?acceso=denegado');
  return context;
}
