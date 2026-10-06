const KEY = 'atlas:reading';
export function readReading() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      saved: Array.isArray(data.saved) ? data.saved.filter(id => typeof id === 'string') : [],
      last: data.last && typeof data.last.id === 'string' ? data.last : null
    };
  } catch { return { saved: [], last: null }; }
}
export function writeReading(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('atlas:reading'));
    return true;
  } catch { return false; }
}
