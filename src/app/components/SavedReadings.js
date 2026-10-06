'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readReading, writeReading } from '../lib/reading/storage';
export default function SavedReadings({ entries, compact = false }) {
  const [reading, setReading] = useState(null);
  useEffect(() => {
    const sync = () => setReading(readReading()); sync();
    window.addEventListener('storage', sync); window.addEventListener('atlas:reading', sync);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('atlas:reading', sync); };
  }, []);
  if (!reading) return compact ? null : <p role="status">Cargando tus lecturas…</p>;
  const last = entries.find(entry => entry.id === reading.last?.id);
  const saved = entries.filter(entry => reading.saved.includes(entry.id));
  if (compact) return last ? <div className="reading-resume"><span>Seguir leyendo</span><Link href={`${last.url}${reading.last.section ? '#' + encodeURIComponent(reading.last.section) : ''}`}>{last.title} →</Link></div> : null;
  return <>
    {last && <div className="reading-resume"><span>Retomá donde quedaste</span><Link href={`${last.url}${reading.last.section ? '#' + encodeURIComponent(reading.last.section) : ''}`}>{last.title} →</Link></div>}
    {saved.length ? <ul className="saved-reading-list">{saved.map(entry => <li key={entry.id}><div><Link href={entry.url}>{entry.title}</Link><p>{entry.summary}</p></div><button type="button" className="secondary-button" aria-label={`Quitar ${entry.title} de guardadas`} onClick={() => writeReading({ ...reading, saved: reading.saved.filter(id => id !== entry.id) })}>Quitar</button></li>)}</ul> : <p>Todavía no guardaste lecturas. Cada artículo tiene un botón para guardarlo.</p>}
    <p className="atlas-section-note">Tus lecturas y tu posición se guardan en este navegador, sin crear una cuenta.</p>
    <Link href="/atlas">Explorar el Atlas →</Link>
  </>;
}
