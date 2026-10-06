'use client';
import { useEffect, useState } from 'react';
import { readReading, writeReading } from '../lib/reading/storage';

export default function ReadingTools({ entryId }) {
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const data = readReading();
    setSaved(data.saved.includes(entryId));
    const previous = data.last?.id === entryId ? data.last : null;
    writeReading({ ...data, last: { id: entryId, section: previous?.section || '', at: new Date().toISOString() } });
    const headings = [...document.querySelectorAll('.atlas-entry-content h2[id]')];
    const observer = new IntersectionObserver(entries => {
      const heading = entries.find(item => item.isIntersecting);
      if (heading) {
        const latest = readReading();
        writeReading({ ...latest, last: { id: entryId, section: heading.target.id, at: new Date().toISOString() } });
      }
    }, { rootMargin: '-10% 0px -60% 0px' });
    headings.forEach(heading => observer.observe(heading));
    const sync = () => setSaved(readReading().saved.includes(entryId));
    window.addEventListener('storage', sync);
    return () => { observer.disconnect(); window.removeEventListener('storage', sync); };
  }, [entryId]);
  function toggle() {
    const data = readReading();
    const next = !data.saved.includes(entryId);
    const savedIds = next ? [...data.saved, entryId] : data.saved.filter(id => id !== entryId);
    if (writeReading({ ...data, saved: savedIds })) { setSaved(next); setNotice(next ? 'Lectura guardada en este navegador.' : 'Lectura quitada de tus guardadas.'); }
    else setNotice('Este navegador no permite guardar lecturas.');
  }
  return <div className="reading-tools">
    <button type="button" className="secondary-button" aria-pressed={saved} onClick={toggle}>{saved ? 'Quitar de guardadas' : 'Guardar lectura'}</button>
    <span role="status">{notice}</span>
  </div>;
}
