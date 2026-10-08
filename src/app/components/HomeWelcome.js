'use client';

// Franja de la portada que solo aparece con sesión: deja la bitácora y el perfil a un clic, sin
// tener que bajar hasta la presentación de Mi Cultivo.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '../lib/supabase/client';

export default function HomeWelcome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    let active = true;
    supabase.auth.getSession().then(({ data }) => { if (active) setUser(data.session?.user ?? null); }).catch(() => {});
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { if (active) setUser(session?.user ?? null); });
    return () => { active = false; data.subscription.unsubscribe(); };
  }, []);

  if (!user) return null;
  const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || '';

  return (
    <section className="home-welcome" aria-labelledby="home-welcome-title">
      <div>
        <span className="personal-privacy-tag">Sesión iniciada</span>
        <h2 id="home-welcome-title">Hola{name ? `, ${name}` : ''}. ¿Qué observaste hoy?</h2>
      </div>
      <nav aria-label="Accesos a tu espacio">
        <Link className="club-button" href="/mi-cultivo?seccion=bitacora">Abrir mi bitácora</Link>
        <Link href="/mi-cultivo?seccion=plantas">Mis plantas ↗</Link>
        <Link href="/mi-cultivo?seccion=ajustes">Perfil y ajustes ↗</Link>
      </nav>
    </section>
  );
}
