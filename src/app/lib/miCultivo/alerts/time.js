// Utilidad de tiempo compartida por el motor de avisos: una "semana ISO" (año-semana) sirve como
// ventana de cooldown/deduplicación simple — ver `engine.js`. No depende de ninguna librería de
// fechas nueva: son ~10 líneas de cálculo de calendario estándar (ISO-8601).
export function isoYearWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}
