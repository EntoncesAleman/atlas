'use client';
import { useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '../lib/supabase/client';

export default function AccountControls({ hasAccount, localData }) {
  const [busy, setBusy] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [confirmation, setConfirmation] = useState('');
  const [notice, setNotice] = useState('');
  async function download() {
    setBusy('export'); setNotice('');
    try {
      let blob;
      if (hasAccount) {
        const response = await fetch('/api/cuenta/exportar', { cache: 'no-store' });
        if (!response.ok) throw new Error((await response.json()).error);
        blob = await response.blob();
      } else blob = new Blob([JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), cultivo: localData }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const link = document.createElement('a');
      link.href = url; link.download = 'atlas-mi-cultivo.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice('La descarga está lista. Guardá el archivo en un lugar privado.');
    } catch (error) { setNotice(error.message || 'No se pudo descargar tu información.'); }
    finally { setBusy(''); }
  }
  async function remove() {
    setBusy('delete'); setNotice('');
    try {
      const response = await fetch('/api/cuenta/eliminar', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ confirmation }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      await getSupabaseClient()?.auth.signOut();
      try { localStorage.removeItem('atlas:miCultivo'); } catch {} 
      window.location.assign('/?cuenta=eliminada');
    } catch (error) { setNotice(error.message || 'No se pudo eliminar la cuenta.'); setBusy(''); }
  }
  return <div className="atlas-entry-section account-controls"><h2>Tus datos</h2>
    <p>{hasAccount ? 'Descargá tus temporadas, plantas, notas, alertas y fotos privadas en un archivo JSON.' : 'Descargá una copia de la bitácora guardada en este navegador.'}</p>
    <div className="mi-cultivo-form-actions"><button type="button" className="secondary-button" onClick={download} disabled={Boolean(busy)}>{busy === 'export' ? 'Preparando descarga…' : 'Descargar mis datos'}</button><Link href="/privacidad">Cómo cuidamos tus datos</Link></div>
    {hasAccount && <details open={confirming} onToggle={event => setConfirming(event.currentTarget.open)}><summary>Eliminar mi cuenta</summary><p>Se borrarán tu cuenta, tus temporadas, tus registros y tus fotos. Esta acción es permanente. Descargá tus datos antes de continuar.</p><label className="mi-cultivo-field"><span>Escribí ELIMINAR para confirmar</span><input value={confirmation} onChange={event => setConfirmation(event.target.value)} autoComplete="off" /></label><button type="button" className="secondary-button danger-button" onClick={remove} disabled={confirmation !== 'ELIMINAR' || Boolean(busy)}>{busy === 'delete' ? 'Eliminando…' : 'Eliminar cuenta y datos'}</button></details>}
    <p role="status">{notice}</p>
  </div>;
}
