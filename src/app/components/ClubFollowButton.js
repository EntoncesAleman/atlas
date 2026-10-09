'use client';

// Seguir a un club desde su ficha pública. El estado se consulta aparte para que la ficha se pueda
// servir cacheada, igual para todo el mundo.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { setClubFollow } from '../lib/club/userActions';

export default function ClubFollowButton({ clubId, clubName }) {
  const [state, setState] = useState({ ready: false, signedIn: false, following: false });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch(`/api/cuenta/clubes?club=${encodeURIComponent(clubId)}`)
      .then((response) => response.json())
      .then((data) => { if (active) setState({ ready: true, signedIn: Boolean(data.signedIn), following: Boolean(data.following) }); })
      .catch(() => { if (active) setState({ ready: true, signedIn: false, following: false }); });
    return () => { active = false; };
  }, [clubId]);

  async function toggle() {
    setBusy(true);
    setError('');
    try {
      const result = await setClubFollow(clubId, !state.following);
      if (result.ok) setState((current) => ({ ...current, following: result.following }));
      else setError(result.signedIn ? 'No se pudo guardar. Probá de nuevo.' : 'Iniciá sesión para seguir a un club.');
    } catch {
      setError('No se pudo guardar. Probá de nuevo.');
    } finally {
      setBusy(false);
    }
  }

  if (!state.ready) return <p className="club-follow" aria-hidden="true" />;
  if (!state.signedIn) return <p className="club-follow"><Link className="club-button club-button-outline" href="/mi-cultivo">Ingresá para seguir a este club</Link></p>;
  return (
    <p className="club-follow">
      <button type="button" className={`club-button${state.following ? ' club-button-outline' : ''}`} onClick={toggle} disabled={busy} aria-pressed={state.following}>
        {state.following ? 'Siguiendo · dejar de seguir' : `Seguir a ${clubName}`}
      </button>
      {state.following && <span>Sus actividades aparecen en la sección Clubes de tu espacio.</span>}
      {error && <span role="alert">{error}</span>}
    </p>
  );
}
