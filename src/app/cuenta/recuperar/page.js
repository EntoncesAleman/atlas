'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '../../lib/supabase/client';
export default function Page() {
  const [mode, setMode] = useState('request');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false); const [notice, setNotice] = useState('');
  useEffect(() => {
    const client = getSupabaseClient(); if (!client) return;
    const { data } = client.auth.onAuthStateChange((event) => { if (event === 'PASSWORD_RECOVERY') setMode('update'); });
    if (new URLSearchParams(window.location.search).get('actualizar') === '1') {
      client.auth.getUser().then(({ data }) => { if (data.user) setMode('update'); else setNotice('El enlace venció o no es válido. Pedí uno nuevo.'); });
    }
    return () => data.subscription.unsubscribe();
  }, []);
  async function submit(event) {
    event.preventDefault(); setBusy(true); setNotice('');
    const client = getSupabaseClient();
    try {
      if (!client) throw new Error('El acceso a cuentas no está disponible ahora.');
      if (mode === 'update') {
        if (password !== confirm) throw new Error('Las contraseñas no coinciden.');
        const { error } = await client.auth.updateUser({ password });
        if (error) throw error;
        setMode('done'); setPassword(''); setConfirm(''); setNotice('Guardaste tu nueva contraseña.');
      } else {
        const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent('/cuenta/recuperar?actualizar=1')}`;
        const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
        if (error) throw error;
        setNotice('Si existe una cuenta con ese email, recibirás un enlace para cambiar la contraseña.');
      }
    } catch (error) { setNotice(error.message?.includes('rate') ? 'Esperá unos minutos antes de pedir otro enlace.' : mode === 'update' ? (error.message === 'Las contraseñas no coinciden.' ? error.message : 'No se pudo cambiar la contraseña. Pedí un enlace nuevo y probá otra vez.') : 'No se pudo pedir el enlace. Probá de nuevo en unos minutos.'); }
    finally { setBusy(false); }
  }
  return <main className="atlas-page"><section className="atlas-category-hero"><div><span className="section-label dark-label">Tu cuenta</span><h1>{mode === 'update' ? 'Elegí una nueva contraseña' : 'Recuperar acceso'}</h1><p className="atlas-lede">{mode === 'update' ? 'Guardá una contraseña de al menos ocho caracteres.' : 'Te enviamos un enlace al email de tu cuenta.'}</p></div></section><section className="atlas-section">{mode !== 'done' && <form className="account-recovery-form" onSubmit={submit}>{mode === 'request' ? <label className="mi-cultivo-field"><span>Email</span><input type="email" autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} required /></label> : <><label className="mi-cultivo-field"><span>Nueva contraseña</span><input type="password" autoComplete="new-password" minLength={8} value={password} onChange={event => setPassword(event.target.value)} required /></label><label className="mi-cultivo-field"><span>Repetí la contraseña</span><input type="password" autoComplete="new-password" minLength={8} value={confirm} onChange={event => setConfirm(event.target.value)} required /></label></>}<button className="primary-button" disabled={busy}>{busy ? 'Procesando…' : mode === 'update' ? 'Guardar contraseña' : 'Pedir enlace'}</button></form>}<p role="status">{notice}</p><Link href="/mi-cultivo">Volver al ingreso →</Link></section></main>;
}
