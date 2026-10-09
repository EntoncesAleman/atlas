'use client';

// Sección "Clubes" del espacio personal: invitaciones a equipos, clubes que la persona integra y
// clubes que sigue, con sus próximas actividades.

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { respondClubInvite, setClubFollow } from '../lib/club/userActions';
import { MEMBER_ROLE_LABELS } from '../lib/club/content';

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long' });
}

export default function MyClubs() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/cuenta/clubes');
      if (!response.ok) throw new Error();
      setData(await response.json());
    } catch {
      setError('No se pudieron cargar tus clubes. Probá recargar la página.');
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function run(action) {
    setBusy(true);
    setError('');
    try {
      const result = await action();
      if (!result.ok) setError('No se pudo guardar. Probá de nuevo.');
      await load();
      // El menú lateral vuelve a consultar si la persona tiene un club.
      window.dispatchEvent(new Event('atlas:club-access-changed'));
    } catch {
      setError('No se pudo guardar. Probá de nuevo.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="atlas-entry-section personal-network-section">
      <span className="personal-privacy-tag">Comunidad</span>
      <h2>Clubes</h2>
      <p>Los clubes que seguís y los equipos de los que sos parte.</p>
      {error && <p className="club-event-form-status is-error" role="alert">{error}</p>}
      {!data && !error && <p className="atlas-section-note" role="status">Cargando tus clubes…</p>}

      {data?.invites.length > 0 && (
        <ul className="club-submission-list">
          {data.invites.map((invite) => (
            <li key={invite.id} className="club-submission">
              <span className="club-submission-status">Invitación · {MEMBER_ROLE_LABELS[invite.role]}</span>
              <h3>{invite.clubName} te invitó a su equipo</h3>
              <div className="club-member-actions">
                <button type="button" className="club-button" disabled={busy} onClick={() => run(() => respondClubInvite(invite.id, true))}>Aceptar</button>
                <button type="button" className="club-submission-withdraw" disabled={busy} onClick={() => run(() => respondClubInvite(invite.id, false))}>Rechazar</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {data?.memberships.length > 0 && (
        <ul className="club-submission-list">
          {data.memberships.map((membership) => (
            <li key={membership.id} className="club-submission club-submission-approved">
              <span className="club-submission-status">Sos parte del equipo · {MEMBER_ROLE_LABELS[membership.role]}</span>
              <h3>{membership.clubName}</h3>
              <Link href="/club">Entrar al espacio del club ↗</Link>
            </li>
          ))}
        </ul>
      )}

      {data && data.following.length === 0 && (
        <div className="personal-empty-state">
          <h3>Todavía no seguís a ningún club</h3>
          <p>Desde la ficha de un club podés seguirlo; sus próximas actividades aparecen acá.</p>
        </div>
      )}
      {data?.following.length > 0 && (
        <ul className="club-submission-list">
          {data.following.map((club) => (
            <li key={club.id} className="club-submission">
              <span className="club-submission-status">Seguís a este club</span>
              <h3><Link href={`/comunidad/clubes/${club.slug}`}>{club.name}</Link></h3>
              {club.upcoming.length === 0 ? <p>Sin actividades próximas publicadas.</p> : (
                <ul className="club-upcoming">{club.upcoming.map((item) => <li key={item.id}><strong>{formatDate(item.date)}</strong> · {item.kind === 'course' ? 'Curso: ' : ''}{item.title}</li>)}</ul>
              )}
              <button type="button" className="club-submission-withdraw" disabled={busy} onClick={() => run(() => setClubFollow(club.id, false))}>Dejar de seguir</button>
            </li>
          ))}
        </ul>
      )}

      <div className="personal-network-links">
        <Link href="/comunidad/clubes">Explorar el directorio ↗</Link>
        <Link href="/comunidad/agenda">Ver agenda del territorio ↗</Link>
      </div>
    </section>
  );
}
