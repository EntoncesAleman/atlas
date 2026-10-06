'use client';
import { useEffect, useState } from 'react';
export default function ContributionForm() {
  const [type, setType] = useState('correccion'); const [reference, setReference] = useState(''); const [busy, setBusy] = useState(false); const [notice, setNotice] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (['correccion', 'actividad', 'fuente', 'otro'].includes(params.get('tipo'))) setType(params.get('tipo'));
    setReference(params.get('referencia') || '');
  }, []);
  async function submit(event) {
    event.preventDefault(); const form = event.currentTarget; const fields = new FormData(form); setBusy(true); setNotice('');
    try {
      const response = await fetch('/api/aportes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type, reference, message: fields.get('message'), email: fields.get('email'), website: fields.get('website'), consent: fields.get('consent') === 'on' }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error);
      form.reset(); setReference(''); setNotice('Recibimos tu aporte. El equipo lo revisará antes de publicar cualquier cambio.');
    } catch (error) { setNotice(error.message || 'No se pudo enviar el aporte. Probá de nuevo.'); }
    finally { setBusy(false); }
  }
  return <form className="contribution-form" onSubmit={submit}>
    <label className="mi-cultivo-field"><span>Qué querés aportar</span><select value={type} onChange={event => setType(event.target.value)}><option value="correccion">Corregir una entrada</option><option value="actividad">Proponer una actividad</option><option value="fuente">Compartir una fuente</option><option value="otro">Otro aporte</option></select></label>
    <label className="mi-cultivo-field"><span>Entrada o fuente de referencia (opcional)</span><input value={reference} onChange={event => setReference(event.target.value)} maxLength={1000} placeholder="Enlace HTTPS o ruta de una entrada del Atlas" /></label>
    <label className="mi-cultivo-field"><span>Tu aporte</span><textarea name="message" required minLength={20} maxLength={4000} rows={6} placeholder="Contanos qué habría que revisar. Si proponés una actividad, incluí organizador, fecha, provincia y fuente." /></label>
    <label className="mi-cultivo-field"><span>Email para responderte (opcional)</span><input name="email" type="email" autoComplete="email" maxLength={254} /></label>
    <label className="contribution-honeypot" aria-hidden="true">Sitio web<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className="contribution-consent"><input type="checkbox" name="consent" required /><span>Acepto que el equipo guarde este mensaje y mi email, si lo incluyo, para revisar el aporte y responderme.</span></label>
    <button type="submit" className="primary-button" disabled={busy}>{busy ? 'Enviando…' : 'Enviar aporte'}</button>
    <p role="status">{notice}</p>
  </form>;
}
