// Traduce un `weather_code` WMO real (el mismo que ya devuelve Open-Meteo y que
// `lib/weather/service.js` traduce a texto en español) a una categoría de ícono para el
// mini-calendario. No es un dato nuevo ni una interpretación agronómica — solo agrupa los
// mismos códigos que `WEATHER_CODE_LABELS` en una categoría visual.

const ICON_BY_CODE = {
  0: 'clear',
  1: 'clear',
  2: 'partly',
  3: 'cloudy',
  45: 'fog',
  48: 'fog',
  51: 'rain',
  53: 'rain',
  55: 'rain',
  56: 'rain',
  57: 'rain',
  61: 'rain',
  63: 'rain',
  65: 'rain',
  66: 'rain',
  67: 'rain',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'rain',
  81: 'rain',
  82: 'rain',
  85: 'snow',
  86: 'snow',
  95: 'storm',
  96: 'storm',
  99: 'storm',
};

export function weatherIconCategory(code) {
  if (typeof code !== 'number') return null;
  return ICON_BY_CODE[code] ?? null;
}
