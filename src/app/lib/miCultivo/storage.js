// Capa de persistencia de "Mi Cultivo" (Fase 10A).
//
// Mecanismo elegido: localStorage del navegador — mismo patrón ya usado en el
// resto del proyecto para preferencias sin cuenta (selección de provincia/zona
// en GeoSelector/EnvironmentalPanel, ver `atlas:selectedProvince` en
// `EnvironmentalPanel.js` y `02_UX.md`/`22_HOME_EXPERIENCE.md`). Es gratuito, no
// depende de ningún servicio externo, no envía datos a ningún lado, y no
// requiere elegir/levantar una base de datos real todavía (ese paso sigue
// `BLOCKED` en TODO.md por falta de decisión de proveedor de infraestructura).
//
// Alcance explícito: esto es almacenamiento LOCAL a este navegador/dispositivo.
// No hay cuenta, no hay sincronización entre dispositivos, no hay backup del
// lado del servidor — si el usuario cambia de navegador, usa modo privado, o
// borra los datos del sitio, este historial desaparece. La UI de Mi Cultivo
// comunica esto explícitamente (no se presenta como una cuenta real).
//
// La UI (mi-cultivo/page.js) solo llama a las funciones de este archivo — nunca
// a `window.localStorage` directamente — para poder reemplazar este mecanismo
// por un backend autenticado más adelante sin tocar los componentes.

const STORAGE_KEY = 'atlas:miCultivo';

function isStorageAvailable() {
  return typeof window !== 'undefined' && !!window.localStorage;
}

export function loadCultivo() {
  if (!isStorageAvailable()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.events)) return null;
    return parsed;
  } catch {
    // JSON corrupto, cuota excedida al leer (no debería pasar), o localStorage
    // deshabilitado (modo privado en algunos navegadores) — se trata como si
    // no hubiera datos guardados, nunca como un error fatal para la página.
    return null;
  }
}

export function saveCultivo(cultivo) {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cultivo));
    return true;
  } catch {
    // Cuota excedida o almacenamiento deshabilitado — la sesión sigue
    // funcionando en memoria, simplemente no persiste. No se reintenta en loop.
    return false;
  }
}

export function resetCultivo() {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op: si no se pudo borrar, tampoco se pudo guardar antes.
  }
}
