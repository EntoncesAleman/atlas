'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { STAGES, createCultivo, createEvent, createNote, updateEvent, stageIndex, stageLabel } from '../lib/miCultivo/model';
import { loadCultivo, saveCultivo, resetCultivo } from '../lib/miCultivo/storage';
import { getSupabaseClient } from '../lib/supabase/client';
import {
  ensureCultivo,
  fetchCultivoById,
  listCultivosRemote,
  createCultivoRemote,
  setPlantInfoRemote,
  setCurrentStageRemote,
  setProvinceRemote,
  insertEventRemote,
  updateEventRemote,
  deleteEventRemote,
  resetCultivoRemote,
  bulkInsertEventsRemote,
} from '../lib/miCultivo/remoteStorage';
import {
  fetchPlantasRemote,
  insertPlantaRemote,
  updatePlantaRemote,
  deletePlantaRemote,
} from '../lib/miCultivo/plantasRemote';
import { fetchNotesRemote, insertNoteRemote, deleteNoteRemote, deleteAllNotesRemote, setSeasonNameRemote } from '../lib/miCultivo/notesRemote';
import {
  fetchAlertsRemote,
  syncAlertsRemote,
  markAlertReadRemote,
  markAllAlertsReadRemote,
} from '../lib/miCultivo/alertsRemote';
import {
  fetchNotificationPreferencesRemote,
  setNotificationPreferencesRemote,
} from '../lib/miCultivo/notificationPreferencesRemote';
import { buildAlertCandidates } from '../lib/miCultivo/alerts/engine';
import { STAGE_ATLAS_LINKS } from '../lib/miCultivo/alerts/constants';
import {
  getSeasonStartDate,
  daysSince,
  daysInCurrentStage,
  seasonProgressPercent,
  nextStage as computeNextStage,
  getLastEntry,
  getAllPhotos,
  getSeasonSummary,
} from '../lib/miCultivo/season';
import { uploadEventPhoto, fetchPhotosByEvent, deleteEventPhoto } from '../lib/miCultivo/photos';
import { PhotoValidationError } from '../lib/miCultivo/photoProcessing';
import { PROVINCE_OPTIONS } from '../lib/weather/locations';
import { fetchProvinceWeather } from '../lib/weather/service';
import MiniCalendar from '../components/MiniCalendar';
import GlobalHeader from '../components/shell/GlobalHeader';
import ContextHeader from '../components/shell/ContextHeader';
import NewsChip from '../components/shell/NewsChip';
import {
  IconOverview,
  IconPlant,
  IconJournal,
  IconEnvironment,
  IconSettings,
  IconThermometer,
  IconDroplet,
  IconWind,
  IconAlert,
  IconChevronRight,
  IconLogout,
  IconPlus,
  IconCamera,
  IconBook,
} from '../components/icons/DashboardIcons';

function formatDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function formatShortDate(isoDate) {
  if (!isoDate) return '';
  const [, month, day] = isoDate.split('-');
  if (!month || !day) return isoDate;
  return `${day}/${month}`;
}

function formatGeneratedAt(isoDateTime) {
  if (!isoDateTime) return '';
  try {
    return new Date(isoDateTime).toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

// "Inicio de temporada" (Fase 12) y "días desde" ahora viven en `lib/miCultivo/season.js`
// (importados arriba) — se movieron ahí junto con el resto de los cálculos derivados nuevos
// (días en la etapa actual, progreso visual, resumen) para no mezclar reglas de lectura de datos
// con el componente de página (mismo criterio que el motor de avisos).
function formatElapsed(days) {
  if (days === null) return '';
  if (days <= 0) return 'Empezó hoy';
  if (days === 1) return 'Hace 1 día';
  return `Hace ${days} días`;
}

// Cierre de P1-3 (MASTER_PACKAGE/63_AUDITORIA_GENERAL_ATLAS.md): Mi Cultivo tiene su propia
// `provinceId` (columna `province_id` en cuenta, o dentro del objeto local de
// `lib/miCultivo/storage.js`), separada a propósito de `atlas:selectedProvince` — cada una
// puede referirse a un cultivo/consulta distinta y no deben pisarse. Lo que sí se corrige acá
// es la fricción real detectada: si Mi Cultivo todavía no tiene ninguna provincia propia
// elegida, se sugiere como punto de partida la ya elegida en Inicio, en vez de arrancar vacío
// sin motivo. Nunca sobreescribe una elección que la persona ya hizo dentro de Mi Cultivo.
const ATLAS_SELECTED_PROVINCE_KEY = 'atlas:selectedProvince';

function readAtlasSelectedProvince() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(ATLAS_SELECTED_PROVINCE_KEY) || null;
  } catch {
    return null;
  }
}

// Qué cultivo/temporada eligió ver la persona por última vez (brief §14: "cambiar entre
// cultivos/temporadas sin perder información") — solo tiene sentido en modo cuenta, ver nota en
// el selector de cultivo más abajo. Mismo patrón de persistencia liviana que la provincia
// elegida en Inicio, ninguna tabla nueva para esto.
const SELECTED_CULTIVO_KEY = 'atlas:miCultivo:selectedCultivoId';

function readSelectedCultivoId() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(SELECTED_CULTIVO_KEY) || null;
  } catch {
    return null;
  }
}

function writeSelectedCultivoId(cultivoId) {
  if (typeof window === 'undefined') return;
  try {
    if (cultivoId) window.localStorage.setItem(SELECTED_CULTIVO_KEY, cultivoId);
    else window.localStorage.removeItem(SELECTED_CULTIVO_KEY);
  } catch {
    // no-op: preferencia de UI, no un dato crítico — si no se puede guardar, simplemente la
    // próxima visita vuelve a abrir el cultivo por defecto.
  }
}

// A dónde ir después de iniciar sesión (no de crear cuenta: una cuenta recién creada siempre
// empieza en rol 'user', ver `handleAuthSubmit`) — según el rol real leído de `profiles`, la
// misma tabla que hace cumplir `proxy.js`/`requireRole` del lado servidor. Si la consulta
// falla por lo que sea, el destino por defecto sigue siendo el Atlas (comportamiento previo).
async function destinationForUser(supabase, userId) {
  try {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle();
    if (profile?.role === 'admin') return '/admin';
    if (profile?.role === 'club') return '/club';
  } catch {
    // sigue al valor por defecto de abajo
  }
  return '/atlas';
}

function translateAuthError(error) {
  const message = error?.message ?? '';
  if (/invalid login credentials/i.test(message)) return 'Email o contraseña incorrectos.';
  if (/user already registered/i.test(message)) return 'Ya existe una cuenta con ese email — probá iniciar sesión.';
  if (/password should be at least/i.test(message)) return 'La contraseña necesita al menos 6 caracteres.';
  if (/unable to validate email/i.test(message) || /invalid email/i.test(message)) return 'Ese email no parece válido.';
  return 'No se pudo completar la operación. Probá de nuevo en unos segundos.';
}

export default function MiCultivoPage() {
  const router = useRouter();
  const [supabase] = useState(() => getSupabaseClient());

  // --- Auth ---
  const [authLoading, setAuthLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [authMode, setAuthMode] = useState('signin');
  const [authRole, setAuthRole] = useState('user'); // 'user' | 'club' — solo aplica al alta por email (ver nota en handleAuthSubmit)
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authClubName, setAuthClubName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authGoogleSubmitting, setAuthGoogleSubmitting] = useState(false);
  const previousSessionRef = useRef(null);

  // --- Cultivo (local o remoto, según haya sesión) ---
  const [hydrated, setHydrated] = useState(false);
  const [cultivoId, setCultivoId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [currentStageId, setCurrentStageId] = useState(STAGES[0].id);
  const [events, setEvents] = useState([]);
  const [remoteBusy, setRemoteBusy] = useState(false);
  const [remoteError, setRemoteError] = useState('');

  // --- Cabecera de temporada ---
  const [seasonName, setSeasonName] = useState(null);
  const [seasonNameDraft, setSeasonNameDraft] = useState('');
  const [editingSeasonName, setEditingSeasonName] = useState(false);

  // --- Notas de temporada ---
  const [notes, setNotes] = useState([]);
  const [noteDraft, setNoteDraft] = useState('');
  const [noteBusy, setNoteBusy] = useState(false);

  // --- Centro de alertas y notificaciones (solo modo con cuenta) ---
  const [alerts, setAlerts] = useState([]);
  const [alertsChecked, setAlertsChecked] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState(null);
  const [preferencesSaving, setPreferencesSaving] = useState(false);
  const [preferencesNotice, setPreferencesNotice] = useState('');

  // --- Varios cultivos/temporadas por cuenta (brief §14, solo modo con cuenta) ---
  const [cultivosList, setCultivosList] = useState([]);
  const [cultivoSwitchBusy, setCultivoSwitchBusy] = useState(false);

  // --- Plantas dentro del cultivo actual (modo simple por cantidad, o detallado) ---
  const [plantCount, setPlantCount] = useState(1);
  const [plantMode, setPlantMode] = useState('simple'); // 'simple' | 'detailed'
  const [variety, setVariety] = useState('');
  const [plantas, setPlantas] = useState([]);
  const [plantFormOpen, setPlantFormOpen] = useState(false);
  const [plantDraft, setPlantDraft] = useState({ label: '', variety: '', stageId: '', notes: '' });
  const [editingPlantaId, setEditingPlantaId] = useState(null);
  const [plantBusy, setPlantBusy] = useState(false);

  // --- Contexto ambiental (Fase 11) ---
  const [provinceId, setProvinceId] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState('idle'); // idle | loading | ready | error
  const [weatherResult, setWeatherResult] = useState(null);

  // --- Panel del dashboard (pestañas de navegación, ver referencia visual en documentacion/) ---
  const [activeTab, setActiveTab] = useState('overview'); // overview | plantas | bitacora | ambiente | ajustes
  const eventFormSectionRef = useRef(null);
  const [quickQuestion, setQuickQuestion] = useState('');

  function handleQuickSearch(domEvent) {
    domEvent.preventDefault();
    const trimmed = quickQuestion.trim();
    if (!trimmed) return;
    router.push(`/chatbot?q=${encodeURIComponent(trimmed)}`);
  }

  // --- Migración local -> cuenta ---
  const [migrationChecked, setMigrationChecked] = useState(false);
  const [pendingMigration, setPendingMigration] = useState(null);

  // --- Formulario de evento ---
  const [formStageId, setFormStageId] = useState(STAGES[0].id);
  const [formDate, setFormDate] = useState('');
  const [formNote, setFormNote] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [confirmingDeleteEventId, setConfirmingDeleteEventId] = useState(null);
  const [deletingEventId, setDeletingEventId] = useState(null);

  // --- Mi Temporada / Línea temporal (Fase 12) ---
  const [timelineOrder, setTimelineOrder] = useState('recent'); // recent | chrono

  // --- Fotos (solo modo con cuenta) ---
  const [photosByEvent, setPhotosByEvent] = useState({});
  const [photoBusyEventId, setPhotoBusyEventId] = useState(null);
  const [photoErrorByEvent, setPhotoErrorByEvent] = useState({});
  const [expandedPhotoId, setExpandedPhotoId] = useState(null);

  const currentIndex = stageIndex(currentStageId);
  const isAccountMode = Boolean(session);
  // En modo cuenta, `cultivoId` todavía puede ser el id local (no un UUID)
  // mientras se resuelve la carga/migración remota — elegir una provincia en
  // esa ventana escribiría contra un id que no existe en la cuenta y la
  // selección se perdería en cuanto termine de cargar el cultivo remoto.
  const locationReady = !isAccountMode || (migrationChecked && !pendingMigration);

  const seasonStartDate = getSeasonStartDate(events);
  const elapsedDays = daysSince(seasonStartDate);
  const totalPhotos = isAccountMode
    ? Object.values(photosByEvent).reduce((sum, list) => sum + list.length, 0)
    : null;
  const sortedEvents = [...events].sort((a, b) => {
    if (a.date === b.date) return 0;
    const chronological = a.date < b.date ? -1 : 1;
    return timelineOrder === 'chrono' ? chronological : -chronological;
  });
  // Bitácora reciente (aside del dashboard): eventos + notas mezclados por fecha, más recientes
  // primero — mismos datos que "Línea temporal"/"Notas de temporada", sin una tabla nueva.
  const recentActivity = [
    ...events.map((item) => ({ kind: 'event', id: `event-${item.id}`, date: item.date, label: stageLabel(item.stageId), detail: item.note || null })),
    ...notes.map((item) => ({ kind: 'note', id: `note-${item.id}`, date: item.createdAt.slice(0, 10), label: 'Nota de temporada', detail: item.body })),
  ]
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, 6);
  const activePlantsCount = isAccountMode && plantMode === 'detailed' ? plantas.length : plantCount;
  const nextStage = computeNextStage(currentStageId);
  const currentStageAtlasLink = STAGE_ATLAS_LINKS[currentStageId] ?? null;
  const nextStageAtlasLink = nextStage ? STAGE_ATLAS_LINKS[nextStage.id] ?? null : null;
  const daysInStage = daysInCurrentStage(events, currentStageId);
  const progressPercent = seasonProgressPercent(currentStageId);
  const lastEntry = getLastEntry(events, photosByEvent);
  const allSeasonPhotos = isAccountMode ? getAllPhotos(events, photosByEvent) : [];
  const seasonSummary = getSeasonSummary(events, isAccountMode ? photosByEvent : {});
  // Recordatorio suave (nunca una alerta): cuántos días pasaron desde el último registro real
  // (evento o nota, lo que sea más reciente — mismo dato que ya arma `getSeasonSummary`).
  const daysSinceLastActivity = seasonSummary.lastActivityDate ? daysSince(seasonSummary.lastActivityDate) : null;
  const unreadAlerts = alerts.filter((alert) => alert.status === 'unread');
  const readAlerts = alerts.filter((alert) => alert.status === 'read');

  // Brief §14: una alerta se asocia al cultivo completo por defecto — solo se etiqueta con una
  // planta puntual cuando la propia alerta trae `plantaId` (hoy el motor de reglas nunca lo
  // pone: evalúa a nivel del cultivo completo, ver `alerts/engine.js`). Queda listo para cuando
  // una regla futura tenga información suficiente de una planta individual.
  function alertTargetLabel(alert) {
    if (!alert.plantaId) return 'Para tu cultivo';
    const planta = plantas.find((item) => item.id === alert.plantaId);
    return planta ? `Para ${planta.label}` : 'Para una planta';
  }

  function adoptCultivo(cultivo) {
    setCultivoId(cultivo.id);
    setCreatedAt(cultivo.createdAt);
    setCurrentStageId(cultivo.currentStageId);
    setEvents(cultivo.events);
    setProvinceId(cultivo.provinceId ?? null);
    setSeasonName(cultivo.seasonName ?? null);
    setPlantCount(cultivo.plantCount ?? 1);
    setPlantMode(cultivo.plantMode ?? 'simple');
    setVariety(cultivo.variety ?? '');
    // En modo cuenta, `cultivo.notes` no viene incluido acá (las notas remotas se cargan aparte,
    // igual que las fotos) — el `?? []` solo cubre el instante entre adoptar el cultivo remoto y
    // que termine esa carga separada. Lo mismo aplica a `plantas` (modo detallado): se cargan en
    // su propio efecto, no acá.
    setNotes(cultivo.notes ?? []);
    setPlantas([]);
  }

  function loadLocalIntoState() {
    const stored = loadCultivo();
    const cultivo = stored ?? createCultivo();
    // Solo sugiere la provincia de Inicio si Mi Cultivo todavía no tiene ninguna propia —
    // nunca reemplaza una que la persona ya haya elegido acá (ver nota en
    // `readAtlasSelectedProvince` más arriba).
    if (!cultivo.provinceId) {
      const suggestedProvinceId = readAtlasSelectedProvince();
      if (suggestedProvinceId) cultivo.provinceId = suggestedProvinceId;
    }
    adoptCultivo(cultivo);
  }

  // Hidratación inicial: siempre carga lo local primero (hace falta para
  // poder detectar, si el usuario ya tiene sesión guardada, si hay algo para
  // migrar).
  useEffect(() => {
    loadLocalIntoState();
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Avisos redirigidos desde el middleware (`/admin` sin sesión o sin rol suficiente) o desde
  // `/auth/callback` (Google). Se lee `window.location.search` directo en vez de
  // `useSearchParams()` para no forzar un boundary de Suspense en una página que ya es 100%
  // cliente — se limpia de la URL enseguida para que no persista al recargar.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const authParam = params.get('auth');
    const accesoParam = params.get('acceso');
    if (authParam === 'requerido') setAuthNotice('Necesitás iniciar sesión para acceder a esa sección.');
    else if (authParam === 'error') setAuthError('No se pudo completar el ingreso con Google. Probá de nuevo.');
    else if (accesoParam === 'denegado') setAuthError('Tu cuenta no tiene permiso para acceder a esa sección.');
    if (authParam || accesoParam) {
      const url = new URL(window.location.href);
      url.searchParams.delete('auth');
      url.searchParams.delete('acceso');
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  }, []);

  // Sesión de Supabase.
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  // Al iniciar sesión: carga (o crea) el cultivo remoto. Si había datos
  // locales con eventos, ofrece migrarlos en vez de reemplazarlos en
  // silencio.
  useEffect(() => {
    if (authLoading || !hydrated || !supabase || !session || migrationChecked) return;
    let cancelled = false;
    (async () => {
      setRemoteBusy(true);
      setRemoteError('');
      try {
        const remote = await ensureCultivo(supabase, session.user.id);
        if (cancelled) return;
        if (events.length > 0) {
          setPendingMigration({ remote, localEvents: events, localCurrentStageId: currentStageId, localProvinceId: provinceId });
        } else {
          adoptCultivo(remote);
        }
      } catch {
        if (!cancelled) setRemoteError('No se pudo cargar tu cultivo de la cuenta. Probá de nuevo en unos segundos.');
      } finally {
        if (!cancelled) {
          setRemoteBusy(false);
          setMigrationChecked(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, authLoading, hydrated, migrationChecked, supabase]);

  // Una vez resuelta la migración (ver el efecto de arriba, que no se toca para no arriesgar esa
  // lógica ya probada): si la persona había elegido un cultivo/temporada distinto del que abre
  // por defecto en una visita anterior, lo retoma acá — brief §14: "cambiar entre cultivos/
  // temporadas sin perder información" también significa recordar cuál se estaba viendo.
  useEffect(() => {
    if (!isAccountMode || !supabase || !session || !migrationChecked || pendingMigration) return;
    const savedId = readSelectedCultivoId();
    if (!savedId || savedId === cultivoId) return;
    let cancelled = false;
    fetchCultivoById(supabase, session.user.id, savedId)
      .then((found) => {
        if (!cancelled && found) adoptCultivo(found);
      })
      .catch(() => {
        // Si el cultivo guardado ya no existe (se borró desde otro dispositivo, por ejemplo), se
        // deja el cultivo por defecto que ya se adoptó — no es un error que deba interrumpir nada.
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccountMode, supabase, session, migrationChecked, pendingMigration]);

  // Al cerrar sesión: vuelve a mostrar el cultivo local.
  useEffect(() => {
    if (authLoading) return;
    const wasLoggedIn = Boolean(previousSessionRef.current);
    if (wasLoggedIn && !session) {
      setMigrationChecked(false);
      setPendingMigration(null);
      resetForm();
      loadLocalIntoState();
      setPhotosByEvent({});
      setPhotoErrorByEvent({});
      setExpandedPhotoId(null);
    }
    previousSessionRef.current = session;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, authLoading]);

  // Fotos: solo existen en modo cuenta (ver Fase 10C, sección "sin cuenta").
  // Se cargan todas las de este cultivo de una vez, pero solo después de que
  // la migración terminó de resolverse (`migrationChecked && !pendingMigration`)
  // — si no, `cultivoId` puede ser todavía el id local (formato de texto, no
  // UUID) en el instante en que `isAccountMode` ya pasó a true pero
  // `adoptCultivo(remote)` todavía no corrió, lo que rompía la consulta.
  useEffect(() => {
    if (!isAccountMode || !cultivoId || !supabase || !migrationChecked || pendingMigration) {
      if (!isAccountMode) setPhotosByEvent({});
      return;
    }
    let cancelled = false;
    fetchPhotosByEvent(supabase, cultivoId)
      .then((grouped) => {
        if (!cancelled) setPhotosByEvent(grouped);
      })
      .catch(() => {
        if (!cancelled) setPhotosByEvent({});
      });
    return () => {
      cancelled = true;
    };
  }, [isAccountMode, cultivoId, supabase, migrationChecked, pendingMigration]);

  // Mismo guard que las fotos: notas remotas solo después de resolver la migración, para no
  // consultar con un `cultivoId` que todavía es el id local.
  useEffect(() => {
    if (!isAccountMode || !cultivoId || !supabase || !migrationChecked || pendingMigration) {
      return;
    }
    let cancelled = false;
    fetchNotesRemote(supabase, cultivoId)
      .then((remoteNotes) => {
        if (!cancelled) setNotes(remoteNotes);
      })
      .catch(() => {
        if (!cancelled) setNotes([]);
      });
    return () => {
      cancelled = true;
    };
  }, [isAccountMode, cultivoId, supabase, migrationChecked, pendingMigration]);

  // Listado de cultivos/temporadas para el selector (brief §14) — liviano (sin eventos), se
  // recarga cada vez que cambia cuál está activo para que el nombre/etapa mostrados en el propio
  // selector no queden desactualizados después de editar la temporada actual.
  useEffect(() => {
    if (!isAccountMode || !supabase || !session) {
      setCultivosList([]);
      return;
    }
    let cancelled = false;
    listCultivosRemote(supabase, session.user.id)
      .then((list) => {
        if (!cancelled) setCultivosList(list);
      })
      .catch(() => {
        if (!cancelled) setCultivosList([]);
      });
    return () => {
      cancelled = true;
    };
  }, [isAccountMode, supabase, session, cultivoId, seasonName, currentStageId]);

  // Plantas individuales (modo detallado) del cultivo activo — mismo guard que fotos/notas.
  useEffect(() => {
    if (!isAccountMode || !cultivoId || !supabase || !migrationChecked || pendingMigration) {
      return;
    }
    let cancelled = false;
    fetchPlantasRemote(supabase, cultivoId)
      .then((list) => {
        if (!cancelled) setPlantas(list);
      })
      .catch(() => {
        if (!cancelled) setPlantas([]);
      });
    return () => {
      cancelled = true;
    };
  }, [isAccountMode, cultivoId, supabase, migrationChecked, pendingMigration]);

  // Centro de alertas + preferencias de notificación: solo modo cuenta (brief §7-9). Las
  // preferencias se cargan una vez; los avisos se recalculan cuando cambian los datos de entrada
  // reales (etapa, eventos, clima) — nunca en un intervalo/polling, solo cuando algo relevante
  // efectivamente cambió.
  useEffect(() => {
    if (!isAccountMode || !supabase || !session) {
      setNotificationPreferences(null);
      return;
    }
    let cancelled = false;
    fetchNotificationPreferencesRemote(supabase, session.user.id)
      .then((prefs) => {
        if (!cancelled) setNotificationPreferences(prefs);
      })
      .catch(() => {
        if (!cancelled) setNotificationPreferences(null);
      });
    return () => {
      cancelled = true;
    };
  }, [isAccountMode, supabase, session]);

  useEffect(() => {
    if (!isAccountMode || !cultivoId || !supabase || !session || !migrationChecked || pendingMigration) return;
    if (weatherStatus !== 'ready' && weatherStatus !== 'error') return; // esperar a que el clima termine de resolverse (ok o no disponible), nunca generar avisos de clima con datos a medio cargar
    let cancelled = false;
    (async () => {
      try {
        const stageDays = daysInCurrentStage(events, currentStageId);
        const candidates = buildAlertCandidates({
          currentStageId,
          daysInStage: stageDays,
          weatherResult: weatherStatus === 'ready' ? weatherResult : null
        });
        await syncAlertsRemote(supabase, session.user.id, cultivoId, candidates);
        if (cancelled) return;
        const list = await fetchAlertsRemote(supabase, cultivoId);
        if (!cancelled) setAlerts(list);
      } catch {
        // Si falla la generación/lectura de avisos, Mi Cultivo sigue funcionando igual — el
        // Centro de Alertas simplemente no se actualiza en este ciclo, no es un error bloqueante.
      } finally {
        if (!cancelled) setAlertsChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccountMode, cultivoId, supabase, session, migrationChecked, pendingMigration, currentStageId, events, weatherStatus]);

  // Persistencia local: solo cuando NO hay sesión (modo sin cuenta). En modo
  // cuenta, cada acción persiste directamente contra Supabase (ver los
  // handlers), así que este efecto no debe pisar esos datos.
  useEffect(() => {
    if (!hydrated || isAccountMode) return;
    saveCultivo({ id: cultivoId, currentStageId, provinceId, seasonName, plantCount, variety, events, notes, createdAt, updatedAt: new Date().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, isAccountMode, cultivoId, currentStageId, provinceId, seasonName, plantCount, variety, events, notes, createdAt]);

  // Contexto ambiental: solo consulta clima real cuando hay una provincia
  // elegida, y (en modo cuenta) recién después de que la migración terminó de
  // resolverse — mismo motivo que el efecto de fotos de arriba: evita
  // consultar con un estado a medio resolver.
  useEffect(() => {
    if (!hydrated || authLoading) return;
    if (isAccountMode && (!migrationChecked || pendingMigration)) return;
    if (!provinceId) {
      setWeatherResult(null);
      setWeatherStatus('idle');
      return;
    }
    let cancelled = false;
    setWeatherStatus('loading');
    fetchProvinceWeather(provinceId).then((result) => {
      if (cancelled) return;
      setWeatherResult(result);
      setWeatherStatus(result.ok ? 'ready' : 'error');
    });
    return () => {
      cancelled = true;
    };
  }, [hydrated, authLoading, isAccountMode, migrationChecked, pendingMigration, provinceId]);

  function resetForm() {
    setFormStageId(STAGES[0].id);
    setFormDate('');
    setFormNote('');
    setEditingEventId(null);
  }

  function handleStartEdit(eventToEdit) {
    setConfirmingDeleteEventId(null);
    setEditingEventId(eventToEdit.id);
    setFormStageId(eventToEdit.stageId);
    setFormDate(eventToEdit.date);
    setFormNote(eventToEdit.note);
  }

  async function handleDeleteEvent(eventToDelete) {
    if (confirmingDeleteEventId !== eventToDelete.id) {
      setConfirmingDeleteEventId(eventToDelete.id);
      return;
    }
    setConfirmingDeleteEventId(null);
    setRemoteError('');

    if (editingEventId === eventToDelete.id) resetForm();

    if (isAccountMode) {
      setDeletingEventId(eventToDelete.id);
      try {
        // Primero las fotos (borra también el archivo real en Storage, no
        // solo la fila) — recién después el evento, para no dejar archivos
        // huérfanos aunque el `ON DELETE CASCADE` de la base ya limpiaría las
        // filas de `cultivo_event_photos` por su cuenta.
        const eventPhotos = photosByEvent[eventToDelete.id] ?? [];
        for (const photo of eventPhotos) {
          await deleteEventPhoto(supabase, photo);
        }
        await deleteEventRemote(supabase, eventToDelete.id);
        setEvents((prev) => prev.filter((item) => item.id !== eventToDelete.id));
        setPhotosByEvent((prev) => {
          const { [eventToDelete.id]: _removed, ...rest } = prev;
          return rest;
        });
      } catch {
        setRemoteError('No se pudo eliminar el evento. Probá de nuevo.');
      } finally {
        setDeletingEventId(null);
      }
      return;
    }

    setEvents((prev) => prev.filter((item) => item.id !== eventToDelete.id));
  }

  async function handleSubmit(domEvent) {
    domEvent.preventDefault();
    if (!formDate) return;
    setRemoteError('');

    if (isAccountMode) {
      setRemoteBusy(true);
      try {
        if (editingEventId) {
          const updated = await updateEventRemote(supabase, editingEventId, {
            stageId: formStageId,
            date: formDate,
            note: formNote,
          });
          setEvents((prev) => prev.map((item) => (item.id === editingEventId ? updated : item)));
        } else {
          const newEvent = await insertEventRemote(supabase, session.user.id, cultivoId, {
            stageId: formStageId,
            date: formDate,
            note: formNote,
          });
          setEvents((prev) => [newEvent, ...prev]);
          if (stageIndex(formStageId) > currentIndex) {
            await setCurrentStageRemote(supabase, cultivoId, formStageId);
            setCurrentStageId(formStageId);
          }
        }
        resetForm();
      } catch {
        setRemoteError('No se pudo guardar el evento en tu cuenta. Probá de nuevo.');
      } finally {
        setRemoteBusy(false);
      }
      return;
    }

    if (editingEventId) {
      setEvents((prev) => prev.map((item) => (
        item.id === editingEventId
          ? updateEvent(item, { stageId: formStageId, date: formDate, note: formNote })
          : item
      )));
    } else {
      const newEvent = createEvent({ stageId: formStageId, date: formDate, note: formNote });
      setEvents((prev) => [newEvent, ...prev]);
      if (stageIndex(formStageId) > currentIndex) {
        setCurrentStageId(formStageId);
      }
    }
    resetForm();
  }

  async function handleTimelineClick(stageId) {
    if (isAccountMode) {
      setRemoteError('');
      setCurrentStageId(stageId);
      try {
        await setCurrentStageRemote(supabase, cultivoId, stageId);
      } catch {
        setRemoteError('No se pudo actualizar la etapa actual en tu cuenta.');
      }
      return;
    }
    setCurrentStageId(stageId);
  }

  async function handleProvinceChange(domEvent) {
    if (!locationReady) return;
    const newProvinceId = domEvent.target.value || null;
    setProvinceId(newProvinceId);
    if (isAccountMode) {
      setRemoteError('');
      try {
        await setProvinceRemote(supabase, cultivoId, newProvinceId);
      } catch {
        setRemoteError('No se pudo guardar tu ubicación en la cuenta.');
      }
    }
  }

  async function handleReset() {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    setConfirmingReset(false);
    setConfirmingDeleteEventId(null);
    resetForm();

    if (isAccountMode) {
      setRemoteBusy(true);
      setRemoteError('');
      try {
        await resetCultivoRemote(supabase, cultivoId);
        // El nombre de temporada y las notas son datos de ESTA temporada, igual que los
        // eventos (a diferencia de la provincia, que `resetCultivoRemote` preserva a propósito
        // por ser un dato del dispositivo/cuenta, no de la temporada puntual).
        await setSeasonNameRemote(supabase, cultivoId, null);
        await deleteAllNotesRemote(supabase, cultivoId);
        setCurrentStageId(STAGES[0].id);
        setEvents([]);
        setSeasonName(null);
        setNotes([]);
      } catch {
        setRemoteError('No se pudo reiniciar tu cultivo en la cuenta.');
      } finally {
        setRemoteBusy(false);
      }
      return;
    }

    resetCultivo();
    const fresh = createCultivo();
    // El reinicio borra el historial de eventos, pero la ubicación aproximada
    // no es parte de ese historial — se preserva, igual que hace
    // `resetCultivoRemote` (que nunca toca `province_id`).
    adoptCultivo({ ...fresh, provinceId });
  }

  async function handleMigrateYes() {
    if (!pendingMigration) return;
    setRemoteBusy(true);
    setRemoteError('');
    const { remote, localEvents, localCurrentStageId, localProvinceId } = pendingMigration;
    try {
      const inserted = await bulkInsertEventsRemote(supabase, session.user.id, remote.id, localEvents);
      const furtherIndex = Math.max(stageIndex(remote.currentStageId), stageIndex(localCurrentStageId));
      const finalStageId = STAGES[furtherIndex]?.id ?? remote.currentStageId;
      await setCurrentStageRemote(supabase, remote.id, finalStageId);
      // La cuenta todavía no tenía ubicación propia: se suma la del dispositivo
      // como parte de este mismo consentimiento explícito de migración (nunca
      // se copia en silencio fuera de este flujo).
      const finalProvinceId = remote.provinceId ?? localProvinceId ?? null;
      if (finalProvinceId && finalProvinceId !== remote.provinceId) {
        await setProvinceRemote(supabase, remote.id, finalProvinceId);
      }
      resetCultivo();
      adoptCultivo({
        ...remote,
        currentStageId: finalStageId,
        provinceId: finalProvinceId,
        events: [...inserted, ...remote.events],
      });
    } catch {
      setRemoteError('No se pudo migrar tu cultivo local a la cuenta. Tus datos siguen guardados en este dispositivo — probá de nuevo.');
    } finally {
      setPendingMigration(null);
      setRemoteBusy(false);
    }
  }

  function handleMigrateNo() {
    if (!pendingMigration) return;
    adoptCultivo(pendingMigration.remote);
    setPendingMigration(null);
  }

  async function handleSaveSeasonName() {
    const trimmed = seasonNameDraft.trim();
    const value = trimmed || null;
    setSeasonName(value);
    setEditingSeasonName(false);
    if (isAccountMode) {
      try {
        await setSeasonNameRemote(supabase, cultivoId, value);
      } catch {
        setRemoteError('No se pudo guardar el nombre de la temporada en tu cuenta.');
      }
    }
  }

  async function handleAddNote(domEvent) {
    domEvent.preventDefault();
    const body = noteDraft.trim();
    if (!body) return;
    setNoteBusy(true);
    setRemoteError('');
    try {
      if (isAccountMode) {
        const inserted = await insertNoteRemote(supabase, session.user.id, cultivoId, body);
        setNotes((prev) => [inserted, ...prev]);
      } else {
        setNotes((prev) => [createNote(body), ...prev]);
      }
      setNoteDraft('');
    } catch {
      setRemoteError('No se pudo guardar la nota. Probá de nuevo.');
    } finally {
      setNoteBusy(false);
    }
  }

  async function handleDeleteNote(note) {
    setNotes((prev) => prev.filter((item) => item.id !== note.id));
    if (isAccountMode) {
      try {
        await deleteNoteRemote(supabase, note.id);
      } catch {
        setRemoteError('No se pudo eliminar la nota. Probá de nuevo.');
      }
    }
  }

  // --- Varios cultivos/temporadas (brief §14, solo modo cuenta) ---

  async function handleSwitchCultivo(newCultivoId) {
    if (!newCultivoId || newCultivoId === cultivoId) return;
    setCultivoSwitchBusy(true);
    setRemoteError('');
    try {
      const found = await fetchCultivoById(supabase, session.user.id, newCultivoId);
      if (found) {
        adoptCultivo(found);
        writeSelectedCultivoId(found.id);
        // Estado transitorio de UI del cultivo anterior — no tiene sentido arrastrarlo al nuevo.
        resetForm();
        setExpandedPhotoId(null);
        setConfirmingReset(false);
        setConfirmingDeleteEventId(null);
        setPlantFormOpen(false);
        setEditingPlantaId(null);
      }
    } catch {
      setRemoteError('No se pudo cambiar de cultivo. Probá de nuevo.');
    } finally {
      setCultivoSwitchBusy(false);
    }
  }

  async function handleCreateCultivo() {
    setCultivoSwitchBusy(true);
    setRemoteError('');
    try {
      const created = await createCultivoRemote(supabase, session.user.id, {});
      adoptCultivo(created);
      writeSelectedCultivoId(created.id);
      resetForm();
      setExpandedPhotoId(null);
    } catch {
      setRemoteError('No se pudo crear un nuevo cultivo. Probá de nuevo.');
    } finally {
      setCultivoSwitchBusy(false);
    }
  }

  // --- Plantas: modo simple (cantidad) o detallado (brief §14) ---

  async function handleSavePlantBasics(nextPlantCount, nextVariety) {
    setPlantCount(nextPlantCount);
    setVariety(nextVariety);
    if (isAccountMode) {
      try {
        await setPlantInfoRemote(supabase, cultivoId, { plantCount: nextPlantCount, plantMode, variety: nextVariety });
      } catch {
        setRemoteError('No se pudo guardar la información de plantas.');
      }
    }
  }

  async function handleSetPlantMode(mode) {
    setPlantMode(mode);
    if (isAccountMode) {
      try {
        await setPlantInfoRemote(supabase, cultivoId, { plantCount, plantMode: mode, variety });
      } catch {
        setRemoteError('No se pudo guardar el modo de gestión de plantas.');
      }
    }
  }

  async function handleAddPlanta(domEvent) {
    domEvent.preventDefault();
    if (!plantDraft.label.trim()) return;
    setPlantBusy(true);
    setRemoteError('');
    try {
      const created = await insertPlantaRemote(supabase, session.user.id, cultivoId, plantDraft);
      setPlantas((prev) => [...prev, created]);
      setPlantDraft({ label: '', variety: '', stageId: '', notes: '' });
      setPlantFormOpen(false);
    } catch {
      setRemoteError('No se pudo agregar la planta. Probá de nuevo.');
    } finally {
      setPlantBusy(false);
    }
  }

  async function handleUpdatePlanta(planta, changes) {
    setPlantBusy(true);
    setRemoteError('');
    try {
      const updated = await updatePlantaRemote(supabase, planta.id, { ...planta, ...changes });
      setPlantas((prev) => prev.map((item) => (item.id === planta.id ? updated : item)));
      setEditingPlantaId(null);
    } catch {
      setRemoteError('No se pudo actualizar la planta. Probá de nuevo.');
    } finally {
      setPlantBusy(false);
    }
  }

  async function handleDeletePlanta(planta) {
    setPlantas((prev) => prev.filter((item) => item.id !== planta.id));
    try {
      await deletePlantaRemote(supabase, planta.id);
    } catch {
      setRemoteError('No se pudo eliminar la planta. Probá de nuevo.');
    }
  }

  async function handleMarkAlertRead(alertId) {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: 'read' } : alert)));
    try {
      await markAlertReadRemote(supabase, alertId);
    } catch {
      // La lectura ya se refleja en la UI; si falla el guardado remoto, el próximo refresco de
      // avisos vuelve a traer el estado real — no vale la pena bloquear al usuario por esto.
    }
  }

  async function handleMarkAllAlertsRead() {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, status: 'read' })));
    try {
      await markAllAlertsReadRemote(supabase, cultivoId);
    } catch {
      // ver nota en handleMarkAlertRead
    }
  }

  async function handleSavePreferences(domEvent) {
    domEvent.preventDefault();
    if (!notificationPreferences) return;
    setPreferencesSaving(true);
    setPreferencesNotice('');
    try {
      await setNotificationPreferencesRemote(supabase, session.user.id, notificationPreferences);
      setPreferencesNotice('Preferencias guardadas.');
    } catch {
      setPreferencesNotice('No se pudieron guardar las preferencias. Probá de nuevo.');
    } finally {
      setPreferencesSaving(false);
    }
  }

  async function handlePhotoUpload(eventId, file) {
    if (!file || !isAccountMode) return;
    setPhotoErrorByEvent((prev) => ({ ...prev, [eventId]: '' }));
    setPhotoBusyEventId(eventId);
    try {
      await uploadEventPhoto(supabase, { userId: session.user.id, cultivoId, eventId, file });
      const refreshed = await fetchPhotosByEvent(supabase, cultivoId);
      setPhotosByEvent(refreshed);
    } catch (error) {
      const message = error instanceof PhotoValidationError
        ? error.message
        : 'No se pudo subir la foto. Probá de nuevo.';
      setPhotoErrorByEvent((prev) => ({ ...prev, [eventId]: message }));
    } finally {
      setPhotoBusyEventId(null);
    }
  }

  async function handlePhotoDelete(photo) {
    setPhotoErrorByEvent((prev) => ({ ...prev, [photo.eventId]: '' }));
    setPhotoBusyEventId(photo.eventId);
    try {
      await deleteEventPhoto(supabase, photo);
      setPhotosByEvent((prev) => ({
        ...prev,
        [photo.eventId]: (prev[photo.eventId] ?? []).filter((item) => item.id !== photo.id),
      }));
      setExpandedPhotoId((current) => (current === photo.id ? null : current));
    } catch {
      setPhotoErrorByEvent((prev) => ({ ...prev, [photo.eventId]: 'No se pudo eliminar la foto. Probá de nuevo.' }));
    } finally {
      setPhotoBusyEventId(null);
    }
  }

  async function handleAuthSubmit(domEvent) {
    domEvent.preventDefault();
    setAuthError('');
    setAuthNotice('');
    if (!supabase) {
      setAuthError('La conexión con la cuenta no está disponible ahora mismo.');
      return;
    }
    setAuthSubmitting(true);
    try {
      if (authMode === 'signup') {
        // `requested_role`/`club_name` viajan en `options.data` (user_metadata) y los lee el
        // trigger `handle_new_user` en la base: el rol real que queda asignado sigue siendo
        // 'user' hasta que un admin aprueba la solicitud de club (`club_status: 'pending'`) — acá
        // nunca se autoconcede el rol 'club' ni mucho menos 'admin'. Ver
        // MASTER_PACKAGE / migración `roles_profiles_newsletter_audit`.
        const { data, error } = await supabase.auth.signUp({
          email: authEmail,
          password: authPassword,
          options: {
            data: {
              requested_role: authRole,
              club_name: authRole === 'club' ? authClubName : null
            }
          }
        });
        if (error) {
          setAuthError(translateAuthError(error));
          return;
        }
        const clubNotice = authRole === 'club'
          ? ' Pediste una cuenta de club: queda pendiente de aprobación — mientras tanto podés usar la cuenta como usuario normal.'
          : '';
        if (!data.session) {
          setAuthNotice(`Te enviamos un email para confirmar tu cuenta. Confirmalo y después iniciá sesión acá.${clubNotice}`);
          setAuthMode('signin');
        } else if (clubNotice) {
          // Con solicitud de club, nos quedamos en Mi Cultivo (no al Atlas) para que el aviso de
          // "pendiente de aprobación" quede visible en vez de perderse en la navegación.
          setAuthNotice(clubNotice.trim());
        } else {
          // Sesión inmediata (confirmación de email desactivada en este proyecto): el ingreso
          // lleva al Atlas completo, no directo a Mi Cultivo (Loop 4.1) — la sesión ya quedó
          // activa acá mismo (`onAuthStateChange`), así que el Atlas la va a reconocer enseguida.
          router.push('/atlas');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
        if (error) {
          setAuthError(translateAuthError(error));
          return;
        }
        router.push(await destinationForUser(supabase, data.user.id));
      }
      setAuthPassword('');
    } finally {
      setAuthSubmitting(false);
    }
  }

  // "Continuar con Google": usa el proveedor OAuth de Supabase Auth (misma cuenta, mismo
  // `auth.users` — no es un sistema de login paralelo). Siempre crea/ingresa como rol 'user': a
  // diferencia del alta por email, acá no hay forma de adjuntar `requested_role` (el perfil lo
  // completa Google, no este formulario) — una cuenta creada así que necesite ser de club se
  // promueve pidiéndolo aparte, igual que cualquier otra solicitud de club. Ver
  // `docs/GOOGLE_OAUTH_SETUP.md` para la configuración pendiente en Google Cloud Console.
  async function handleGoogleSignIn() {
    if (!supabase) {
      setAuthError('La conexión con la cuenta no está disponible ahora mismo.');
      return;
    }
    setAuthError('');
    setAuthNotice('');
    setAuthGoogleSubmitting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/atlas` }
    });
    // En éxito, `signInWithOAuth` redirige el navegador a Google de inmediato — este código
    // después de la llamada solo se alcanza a ejecutar en caso de error (ej. proveedor Google
    // sin habilitar todavía del lado de Supabase).
    if (error) {
      setAuthError('No se pudo iniciar el ingreso con Google. Probá de nuevo en unos segundos.');
      setAuthGoogleSubmitting(false);
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  const tabDefs = [
    { id: 'overview', label: 'Vista general', Icon: IconOverview },
    { id: 'plantas', label: 'Mis plantas', Icon: IconPlant },
    { id: 'bitacora', label: 'Diario y bitácora', Icon: IconJournal },
    { id: 'lecturas', label: 'Contenido y lecturas', Icon: IconBook },
    { id: 'ambiente', label: 'Ambiente', Icon: IconEnvironment },
    { id: 'ajustes', label: 'Ajustes', Icon: IconSettings },
  ];

  return (
    <div className="club-shell">
      <GlobalHeader
        accountLabel={isAccountMode ? session.user.email.split('@')[0] : undefined}
        onSignOut={isAccountMode ? handleSignOut : undefined}
      />

      <ContextHeader
        kicker="Tu espacio dentro del Atlas"
        title="Mi Cultivo"
        tabs={(
          <ul className="club-tabs">
            {tabDefs.map(({ id, label, Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`club-tab ${activeTab === id ? 'club-tab-active' : ''}`}
                  onClick={() => setActiveTab(id)}
                  aria-current={activeTab === id ? 'page' : undefined}
                >
                  <Icon width={15} height={15} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      >
        <button type="button" className="club-widget-chip-button" onClick={() => setActiveTab('ambiente')}>
          <span className="club-widget-chip">
            <IconThermometer className="club-widget-chip-icon" />
            <span className="club-widget-chip-body">
              <span className="club-widget-chip-label">Clima</span>
              <span className="club-widget-chip-value">
                {provinceId && weatherStatus === 'ready' && weatherResult?.ok && weatherResult.current.temperature !== null
                  ? `${Math.round(weatherResult.current.temperature)}°C · ${weatherResult.locationName}`
                  : 'Elegí tu zona'}
              </span>
            </span>
          </span>
        </button>

        <NewsChip />

        <button type="button" className="club-widget-chip-button" onClick={() => setActiveTab('ajustes')}>
          <span className="club-widget-chip">
            <IconAlert className="club-widget-chip-icon" />
            <span className="club-widget-chip-body">
              <span className="club-widget-chip-label">Alertas</span>
              <span className="club-widget-chip-value">{isAccountMode ? `${unreadAlerts.length} sin leer` : 'Con cuenta'}</span>
            </span>
          </span>
        </button>
      </ContextHeader>

      <main className="club-mi-cultivo club-enter">
      {pendingMigration && (
        <section className="atlas-section mi-cultivo-migration">
          <div className="mi-cultivo-migration-card">
            <h2>{pendingMigration.remote.events.length > 0 ? 'Tenés datos en dos lugares' : 'Tenés un cultivo guardado en este dispositivo'}</h2>
            {pendingMigration.remote.events.length > 0 ? (
              <p>
                Tu cuenta ya tiene un historial guardado, y este dispositivo también tiene datos
                que todavía no están en tu cuenta. Podés sumar los de este dispositivo a tu
                cuenta, o quedarte solo con los de tu cuenta — no se borra nada automáticamente.
              </p>
            ) : (
              <p>¿Querés conservarlo en tu cuenta? Si aceptás, los eventos de este dispositivo se copian a tu cuenta y dejan de depender de este navegador.</p>
            )}
            <div className="mi-cultivo-migration-actions">
              <button type="button" className="primary-button" onClick={handleMigrateYes} disabled={remoteBusy}>
                {pendingMigration.remote.events.length > 0 ? 'Sumar los de este dispositivo a mi cuenta' : 'Sí, conservarlo en mi cuenta'}
              </button>
              <button type="button" className="secondary-button" onClick={handleMigrateNo} disabled={remoteBusy}>
                {pendingMigration.remote.events.length > 0 ? 'Usar solo los de mi cuenta' : 'No, empezar de cero en la cuenta'}
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="atlas-section mi-cultivo-mode-section">
        {authLoading ? (
          <p className="atlas-section-note">Comprobando sesión…</p>
        ) : isAccountMode ? (
          <div className="mi-cultivo-account-bar">
            <div>
              <span className="mi-cultivo-mode-tag">Con cuenta</span>
              <p>Iniciaste sesión como <strong>{session.user.email}</strong>. Tu historial queda asociado a esta cuenta — no depende de este dispositivo.</p>
            </div>
            <button type="button" className="secondary-button" onClick={handleSignOut}>Cerrar sesión</button>
          </div>
        ) : (
          <div className="mi-cultivo-login-card">
            <span className="mi-cultivo-mode-tag">Ingresar</span>
            <h2>{authMode === 'signup' ? 'Creá tu cuenta' : 'Iniciá sesión'}</h2>
            <p>Con cuenta, tu historial deja de depender de este navegador: se guarda en la nube, con fotos y sincronización entre dispositivos.</p>

            {authMode === 'signup' && (
              <div className="mi-cultivo-role-tabs" role="group" aria-label="Tipo de cuenta">
                <button
                  type="button"
                  className={`mi-cultivo-role-tab ${authRole === 'user' ? 'mi-cultivo-role-tab-active' : ''}`}
                  aria-pressed={authRole === 'user'}
                  onClick={() => setAuthRole('user')}
                >
                  Usuario
                </button>
                <button
                  type="button"
                  className={`mi-cultivo-role-tab ${authRole === 'club' ? 'mi-cultivo-role-tab-active' : ''}`}
                  aria-pressed={authRole === 'club'}
                  onClick={() => setAuthRole('club')}
                >
                  Club
                </button>
              </div>
            )}

            <button
              type="button"
              className="mi-cultivo-google-button"
              onClick={handleGoogleSignIn}
              disabled={authGoogleSubmitting}
            >
              <svg aria-hidden="true" viewBox="0 0 18 18" width="18" height="18">
                <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z" />
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18Z" />
                <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33Z" />
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58Z" />
              </svg>
              {authGoogleSubmitting ? 'Redirigiendo a Google…' : 'Continuar con Google'}
            </button>

            <div className="mi-cultivo-auth-divider" role="separator"><span>o con email</span></div>

            <form className="mi-cultivo-auth-form" onSubmit={handleAuthSubmit}>
              <label className="mi-cultivo-field">
                <span>Email</span>
                <input
                  type="email"
                  value={authEmail}
                  onChange={(event) => setAuthEmail(event.target.value)}
                  required
                />
              </label>
              <label className="mi-cultivo-field">
                <span>Contraseña</span>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(event) => setAuthPassword(event.target.value)}
                  minLength={6}
                  required
                />
              </label>
              {authMode === 'signup' && authRole === 'club' && (
                <label className="mi-cultivo-field">
                  <span>Nombre del club</span>
                  <input
                    type="text"
                    value={authClubName}
                    onChange={(event) => setAuthClubName(event.target.value)}
                    required
                  />
                </label>
              )}
              {authMode === 'signup' && authRole === 'club' && (
                <p className="atlas-section-note">Las cuentas de club quedan pendientes de aprobación por el equipo del Atlas antes de tener el panel de club habilitado.</p>
              )}
              {authError && <p className="mi-cultivo-auth-error">{authError}</p>}
              {authNotice && <p className="atlas-section-note">{authNotice}</p>}
              <div className="mi-cultivo-form-actions">
                <button type="submit" className="primary-button" disabled={authSubmitting}>
                  {authMode === 'signup' ? 'Crear cuenta' : 'Iniciar sesión'}
                </button>
                <button
                  type="button"
                  className="mi-cultivo-reset-link"
                  onClick={() => {
                    setAuthMode((mode) => (mode === 'signup' ? 'signin' : 'signup'));
                    setAuthError('');
                    setAuthNotice('');
                  }}
                >
                  {authMode === 'signup' ? 'Ya tengo cuenta' : 'Crear una cuenta nueva'}
                </button>
              </div>
            </form>

            <details className="mi-cultivo-auth-benefits">
              <summary className="mi-cultivo-auth-benefits-title">¿Qué gano al ingresar?</summary>
              <ul>
                <li>Guardar Mi Cultivo en la nube, no solo en este navegador.</li>
                <li>Registrar etapas y eventos con fecha y notas, con historial completo.</li>
                <li>Guardar fotos privadas de tu cultivo, asociadas a tu cuenta.</li>
                <li>Mantener guardado el contexto de tu provincia entre visitas.</li>
                <li>Consultar tu historial completo en "Mi Temporada".</li>
                <li>Usar el Buscador del Atlas con contexto de tu propio cultivo.</li>
                <li>Conservar tu información si cambiás de dispositivo o de navegador.</li>
              </ul>
            </details>

            <p className="mi-cultivo-guest-note">
              ¿Preferís no crear una cuenta todavía? Podés seguir usando Mi Cultivo igual: se
              guarda automáticamente en este navegador (sin sincronización entre dispositivos).
            </p>
          </div>
        )}
      </section>

      {isAccountMode && cultivoId && (
        <section className="atlas-section mi-cultivo-switcher-section">
          <label className="mi-cultivo-switcher">
            <span>Cultivo / temporada</span>
            <select
              value={cultivoId}
              onChange={(event) => handleSwitchCultivo(event.target.value)}
              disabled={cultivoSwitchBusy}
            >
              {cultivosList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.seasonName || `Temporada sin nombre (${formatDate(item.createdAt.slice(0, 10))})`}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="mi-cultivo-reset-link" onClick={handleCreateCultivo} disabled={cultivoSwitchBusy}>
            + Nuevo cultivo
          </button>
        </section>
      )}

      {remoteError && (
        <section className="atlas-section">
          <p className="mi-cultivo-auth-error">{remoteError}</p>
        </section>
      )}

      <div className="dashboard-main club-mi-cultivo-main">

            {activeTab === 'overview' && (
              <>
                <div className="club-panel mi-cultivo-season-header">
                    {lastEntry?.photo?.url && (
                      <div className="mi-cultivo-season-cover">
                        <img src={lastEntry.photo.url} alt="" />
                      </div>
                    )}
                    <div className="mi-cultivo-season-header-top">
                      {editingSeasonName ? (
                        <form
                          className="mi-cultivo-season-name-form"
                          onSubmit={(domEvent) => { domEvent.preventDefault(); handleSaveSeasonName(); }}
                        >
                          <input
                            type="text"
                            value={seasonNameDraft}
                            onChange={(event) => setSeasonNameDraft(event.target.value)}
                            placeholder="Nombrá esta temporada"
                            maxLength={80}
                            autoFocus
                          />
                          <button type="submit" className="mi-cultivo-reset-link">Guardar</button>
                          <button type="button" className="mi-cultivo-reset-link" onClick={() => setEditingSeasonName(false)}>Cancelar</button>
                        </form>
                      ) : (
                        <button
                          type="button"
                          className="mi-cultivo-season-name-button"
                          onClick={() => { setSeasonNameDraft(seasonName ?? ''); setEditingSeasonName(true); }}
                        >
                          <h2>{seasonName || 'Temporada sin nombre'}</h2>
                          <span className="mi-cultivo-edit-hint">Editar</span>
                        </button>
                      )}
                      <span className="mi-cultivo-stage-badge">{STAGES[currentIndex].label}</span>
                    </div>

                    <div className="mi-cultivo-season-progress">
                      <div className="mi-cultivo-season-progress-track">
                        <div className="mi-cultivo-season-progress-fill" style={{ width: `${progressPercent}%` }} />
                      </div>
                      <span className="atlas-section-note">Etapa {currentIndex + 1} de {STAGES.length}</span>
                    </div>

                    {events.length === 0 ? (
                      <div className="photo-placeholder">
                        <span className="photo-placeholder-icon" aria-hidden="true">+</span>
                        <p>Todavía no registraste tu primer evento.</p>
                        <p className="atlas-section-note">Tu temporada va a empezar en cuanto cargues el primero, en &quot;Diario y bitácora&quot;.</p>
                      </div>
                    ) : (
                      <div className="mi-cultivo-season-summary">
                        <div className="mi-cultivo-season-stat">
                          <span className="mi-cultivo-season-stat-label">Inicio</span>
                          <span className="mi-cultivo-season-stat-value">{formatDate(seasonStartDate)}</span>
                        </div>
                        <div className="mi-cultivo-season-stat">
                          <span className="mi-cultivo-season-stat-label">Días desde el inicio</span>
                          <span className="mi-cultivo-season-stat-value">{formatElapsed(elapsedDays)}</span>
                        </div>
                        <div className="mi-cultivo-season-stat">
                          <span className="mi-cultivo-season-stat-label">En esta etapa</span>
                          <span className="mi-cultivo-season-stat-value">{daysInStage !== null ? formatElapsed(daysInStage) : 'Sin registros en esta etapa'}</span>
                        </div>
                      </div>
                    )}
                </div>

                <div className="dashboard-stat-grid">
                  <div className="dashboard-stat-card">
                    <IconAlert className="dashboard-stat-icon" />
                    <div>
                      <span className="dashboard-stat-value">{isAccountMode ? unreadAlerts.length : '—'}</span>
                      <span className="dashboard-stat-label">Alertas sin leer</span>
                    </div>
                  </div>
                  <div className="dashboard-stat-card">
                    <IconPlant className="dashboard-stat-icon" />
                    <div>
                      <span className="dashboard-stat-value">{activePlantsCount}</span>
                      <span className="dashboard-stat-label">Plantas activas</span>
                    </div>
                  </div>
                  <div className="dashboard-stat-card">
                    <IconChevronRight className="dashboard-stat-icon" />
                    <div>
                      <span className="dashboard-stat-value">{nextStage ? nextStage.label : '—'}</span>
                      <span className="dashboard-stat-label">Próxima etapa</span>
                    </div>
                  </div>
                </div>

                {daysSinceLastActivity !== null && daysSinceLastActivity >= 3 && (
                  <p className="mi-cultivo-inactivity-note">
                    Hace {formatElapsed(daysSinceLastActivity).toLowerCase()} que no registrás nada en esta temporada — sin apuro, es solo un recordatorio.
                  </p>
                )}

                <div className="atlas-entry-section mi-cultivo-last-entry">
                  <h2>Último registro</h2>
                  {lastEntry ? (
                    <div className="mi-cultivo-last-entry-card">
                      {lastEntry.photo?.url && (
                        <div className="mi-cultivo-last-entry-photo">
                          <img src={lastEntry.photo.url} alt="Foto del último registro" />
                        </div>
                      )}
                      <div className="mi-cultivo-last-entry-body">
                        <div className="mi-cultivo-event-head">
                          <span className="mi-cultivo-event-stage">{stageLabel(lastEntry.event.stageId)}</span>
                          <span className="mi-cultivo-event-date">{formatDate(lastEntry.event.date)}</span>
                        </div>
                        {lastEntry.event.note ? (
                          <p className="mi-cultivo-event-note">{lastEntry.event.note}</p>
                        ) : (
                          <p className="atlas-section-note">Sin nota en este registro.</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="photo-placeholder">
                      <span className="photo-placeholder-icon" aria-hidden="true">+</span>
                      <p>Todavía no registraste ningún evento.</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'lecturas' && (
              <>
                <div className="atlas-entry-section">
                  <h2>Preguntale al Atlas</h2>
                  <form className="dashboard-quick-search" onSubmit={handleQuickSearch}>
                    <input
                      type="search"
                      value={quickQuestion}
                      onChange={(event) => setQuickQuestion(event.target.value)}
                      placeholder="Ej. cómo germinar en interior…"
                      aria-label="Buscar en el Atlas"
                    />
                    <button type="submit" className="club-button club-button-outline">Buscar</button>
                  </form>
                </div>

                <div className="atlas-entry-section mi-cultivo-interest-section">
                  <h2>Contenido de interés</h2>
                  <span className="section-label mi-cultivo-weather-subtitle">Según tu etapa actual</span>
                  {(currentStageAtlasLink || nextStageAtlasLink) ? (
                    <ul className="mi-cultivo-interest-list">
                      {currentStageAtlasLink && (
                        <li>
                          <Link className="mi-cultivo-atlas-link" href={`/atlas/${currentStageAtlasLink.categorySlug}/${currentStageAtlasLink.entrySlug}`}>
                            Sobre tu etapa actual: {currentStageAtlasLink.label} ↗
                          </Link>
                        </li>
                      )}
                      {nextStageAtlasLink && (
                        <li>
                          <Link className="mi-cultivo-atlas-link" href={`/atlas/${nextStageAtlasLink.categorySlug}/${nextStageAtlasLink.entrySlug}`}>
                            Para lo que sigue: {nextStageAtlasLink.label} ↗
                          </Link>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <p className="atlas-section-note">Sin contenido asociado a tu etapa actual por ahora.</p>
                  )}
                </div>

                <div className="atlas-entry-section mi-cultivo-saved-readings-section">
                  <h2>Lecturas guardadas</h2>
                  <p className="atlas-section-note">
                    Todavía no existe una forma de guardar artículos del Atlas para leer después —
                    este espacio queda reservado para cuando esa función esté disponible.
                  </p>
                </div>

                <div className="atlas-entry-section">
                  <h2>Material de lectura del Atlas</h2>
                  <p className="atlas-section-note">
                    Reseñas y recomendaciones de lectura curadas por el Atlas — libros, informes y
                    artículos históricos sobre cultivo, con contexto de por qué vale la pena cada uno.
                  </p>
                  <Link className="secondary-button" href="/atlas/material-de-lectura">Ver material de lectura ↗</Link>
                </div>
              </>
            )}

            {activeTab === 'plantas' && (
              <div className="atlas-entry-section mi-cultivo-plants">
                <div className="mi-cultivo-events-head">
                  <h2>Plantas</h2>
                  {isAccountMode && (
                    <button
                      type="button"
                      className="mi-cultivo-reset-link"
                      onClick={() => handleSetPlantMode(plantMode === 'simple' ? 'detailed' : 'simple')}
                    >
                      {plantMode === 'simple' ? 'Gestionar plantas individualmente' : 'Volver a modo simple (cantidad)'}
                    </button>
                  )}
                </div>

                {(!isAccountMode || plantMode === 'simple') ? (
                  <form
                    className="mi-cultivo-plant-basics-form"
                    onSubmit={(domEvent) => {
                      domEvent.preventDefault();
                      handleSavePlantBasics(plantCount, variety);
                    }}
                  >
                    <label className="mi-cultivo-field">
                      <span>Cantidad de plantas</span>
                      <input
                        type="number"
                        min={1}
                        value={plantCount}
                        onChange={(event) => setPlantCount(Math.max(1, Number(event.target.value) || 1))}
                      />
                    </label>
                    <label className="mi-cultivo-field">
                      <span>Variedad (opcional)</span>
                      <input
                        type="text"
                        value={variety}
                        onChange={(event) => setVariety(event.target.value)}
                        placeholder="Ej. autofloreciente, White Widow..."
                      />
                    </label>
                    <button type="submit" className="secondary-button">Guardar</button>
                  </form>
                ) : (
                  <div className="mi-cultivo-plantas-detail">
                    {plantas.length === 0 ? (
                      <p className="atlas-section-note">Todavía no agregaste ninguna planta individual.</p>
                    ) : (
                      <ul className="dashboard-plant-grid">
                        {plantas.map((planta) => (
                          <li className="dashboard-plant-card" key={planta.id}>
                            {editingPlantaId === planta.id ? (
                              <form
                                className="mi-cultivo-plant-edit-form"
                                onSubmit={(domEvent) => {
                                  domEvent.preventDefault();
                                  handleUpdatePlanta(planta, plantDraft);
                                }}
                              >
                                <input
                                  type="text"
                                  value={plantDraft.label}
                                  onChange={(event) => setPlantDraft((prev) => ({ ...prev, label: event.target.value }))}
                                  placeholder="Nombre/identificador"
                                  required
                                />
                                <input
                                  type="text"
                                  value={plantDraft.variety}
                                  onChange={(event) => setPlantDraft((prev) => ({ ...prev, variety: event.target.value }))}
                                  placeholder="Variedad"
                                />
                                <select
                                  value={plantDraft.stageId}
                                  onChange={(event) => setPlantDraft((prev) => ({ ...prev, stageId: event.target.value }))}
                                >
                                  <option value="">Sigue la etapa del cultivo</option>
                                  {STAGES.map((stage) => (
                                    <option key={stage.id} value={stage.id}>{stage.label}</option>
                                  ))}
                                </select>
                                <button type="submit" className="mi-cultivo-reset-link" disabled={plantBusy}>Guardar</button>
                                <button type="button" className="mi-cultivo-reset-link" onClick={() => setEditingPlantaId(null)}>Cancelar</button>
                              </form>
                            ) : (
                              <>
                                <div className="dashboard-plant-card-head">
                                  <IconPlant className="dashboard-plant-card-icon" />
                                  <span className={`mi-cultivo-stage-badge dashboard-plant-card-badge`}>{stageLabel(planta.stageId) || STAGES[currentIndex].label}</span>
                                </div>
                                <span className="dashboard-plant-card-name">{planta.label}</span>
                                {planta.variety && <span className="dashboard-plant-card-variety">{planta.variety}</span>}
                                <div className="dashboard-plant-card-actions">
                                  <button
                                    type="button"
                                    className="mi-cultivo-reset-link"
                                    onClick={() => {
                                      setEditingPlantaId(planta.id);
                                      setPlantDraft({ label: planta.label, variety: planta.variety ?? '', stageId: planta.stageId ?? '', notes: planta.notes ?? '' });
                                    }}
                                  >
                                    Editar
                                  </button>
                                  <button type="button" className="mi-cultivo-reset-link" onClick={() => handleDeletePlanta(planta)}>Eliminar</button>
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {plantFormOpen ? (
                      <form className="mi-cultivo-plant-edit-form" onSubmit={handleAddPlanta}>
                        <input
                          type="text"
                          value={plantDraft.label}
                          onChange={(event) => setPlantDraft((prev) => ({ ...prev, label: event.target.value }))}
                          placeholder={`Planta ${String(plantas.length + 1).padStart(2, '0')}`}
                          required
                        />
                        <input
                          type="text"
                          value={plantDraft.variety}
                          onChange={(event) => setPlantDraft((prev) => ({ ...prev, variety: event.target.value }))}
                          placeholder="Variedad (opcional)"
                        />
                        <button type="submit" className="secondary-button" disabled={plantBusy}>Agregar</button>
                        <button type="button" className="mi-cultivo-reset-link" onClick={() => setPlantFormOpen(false)}>Cancelar</button>
                      </form>
                    ) : (
                      <button type="button" className="secondary-button" onClick={() => setPlantFormOpen(true)}>
                        + Agregar planta
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bitacora' && (
              <>
                <div className="atlas-entry-section">
                  <h2>Estado actual</h2>
                  <p className="mi-cultivo-current-stage">Etapa actual: <strong>{STAGES[currentIndex].label}</strong></p>
                  <ol className="mi-cultivo-timeline">
                    {STAGES.map((stage, index) => {
                      const state = index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'upcoming';
                      return (
                        <li className={`mi-cultivo-timeline-item mi-cultivo-timeline-${state}`} key={stage.id}>
                          <button
                            type="button"
                            className="mi-cultivo-timeline-dot"
                            onClick={() => handleTimelineClick(stage.id)}
                            aria-pressed={state === 'current'}
                            aria-label={`Marcar "${stage.label}" como etapa actual`}
                          >
                            <span aria-hidden="true">{index + 1}</span>
                          </button>
                          <span className="mi-cultivo-timeline-label">{stage.label}</span>
                        </li>
                      );
                    })}
                  </ol>
                  <p className="atlas-section-note">Tocá una etapa para marcarla como la etapa actual de tu planta. Las etapas siguientes quedan como próximas.</p>
                </div>

                <div className="atlas-entry-section mi-cultivo-gallery">
                  <h2>Registro visual</h2>
                  {!isAccountMode ? (
                    <p className="atlas-section-note">La galería de fotos de temporada está disponible con cuenta — ingresá arriba para empezar a guardar fotos junto a tus registros.</p>
                  ) : allSeasonPhotos.length === 0 ? (
                    <div className="photo-placeholder">
                      <span className="photo-placeholder-icon" aria-hidden="true">+</span>
                      <p>Todavía no hay fotos en esta temporada.</p>
                      <p className="atlas-section-note">Agregá una foto desde cualquier registro de la línea temporal, más abajo.</p>
                    </div>
                  ) : (
                    <div className="mi-cultivo-gallery-strip">
                      {allSeasonPhotos.map((photo) => (
                        <button
                          type="button"
                          key={photo.id}
                          className="mi-cultivo-gallery-thumb"
                          onClick={() => setExpandedPhotoId((current) => (current === photo.id ? null : photo.id))}
                          disabled={!photo.url}
                          aria-label="Ver foto más grande"
                        >
                          {photo.url ? <img src={photo.url} alt="Foto de la temporada" /> : <span className="mi-cultivo-photo-loading">…</span>}
                          {photo.event?.date && <span className="mi-cultivo-gallery-thumb-date">{formatShortDate(photo.event.date)}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                  {isAccountMode && allSeasonPhotos.some((photo) => photo.id === expandedPhotoId) && (
                    <div className="mi-cultivo-photo-expanded">
                      <img
                        src={allSeasonPhotos.find((photo) => photo.id === expandedPhotoId)?.url}
                        alt="Foto de la temporada, tamaño ampliado"
                      />
                    </div>
                  )}
                </div>

                <div className="atlas-entry-section mi-cultivo-notes">
                  <h2>Notas de temporada</h2>
                  <form className="mi-cultivo-note-form" onSubmit={handleAddNote}>
                    <textarea
                      value={noteDraft}
                      onChange={(event) => setNoteDraft(event.target.value)}
                      placeholder="Anotá algo sobre esta temporada — una observación, una decisión, lo que quieras recordar más adelante."
                      rows={2}
                    />
                    <button type="submit" className="secondary-button" disabled={noteBusy || !noteDraft.trim()}>Agregar nota</button>
                  </form>
                  {notes.length === 0 ? (
                    <p className="atlas-section-note">Todavía no agregaste ninguna nota.</p>
                  ) : (
                    <ul className="mi-cultivo-notes-list">
                      {notes.map((note) => (
                        <li className="mi-cultivo-note-item" key={note.id}>
                          <div>
                            <span className="mi-cultivo-note-date">{formatGeneratedAt(note.createdAt)}</span>
                            <p>{note.body}</p>
                          </div>
                          <button type="button" className="mi-cultivo-reset-link" onClick={() => handleDeleteNote(note)}>Eliminar</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="atlas-entry-section" ref={eventFormSectionRef}>
                  <h2>{editingEventId ? 'Editar evento' : 'Registrar un evento'}</h2>
                  <form className="mi-cultivo-event-form" onSubmit={handleSubmit}>
                    <label className="mi-cultivo-field">
                      <span>Etapa</span>
                      <select value={formStageId} onChange={(event) => setFormStageId(event.target.value)}>
                        {STAGES.map((stage) => (
                          <option key={stage.id} value={stage.id}>{stage.label}</option>
                        ))}
                      </select>
                    </label>

                    <label className="mi-cultivo-field">
                      <span>Fecha</span>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(event) => setFormDate(event.target.value)}
                        required
                      />
                    </label>

                    <label className="mi-cultivo-field mi-cultivo-field-wide">
                      <span>Nota</span>
                      <textarea
                        value={formNote}
                        onChange={(event) => setFormNote(event.target.value)}
                        placeholder="Qué observaste en esta etapa..."
                        rows={2}
                      />
                    </label>

                    <div className="mi-cultivo-field mi-cultivo-field-wide">
                      <span>Foto</span>
                      {isAccountMode ? (
                        <p className="atlas-section-note">Podés agregar una foto después de guardar el evento, desde la lista de eventos de abajo.</p>
                      ) : (
                        <button type="button" className="photo-placeholder-button" disabled aria-disabled="true">
                          <span aria-hidden="true">+</span>
                          Agregar foto (próximamente)
                        </button>
                      )}
                    </div>

                    <div className="mi-cultivo-form-actions">
                      <button type="submit" className="primary-button mi-cultivo-submit" disabled={remoteBusy}>
                        {editingEventId ? 'Guardar cambios' : 'Registrar evento'}
                      </button>
                      {editingEventId && (
                        <button type="button" className="secondary-button" onClick={resetForm}>
                          Cancelar edición
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {events.length > 0 && (
                  <div className="atlas-entry-section">
                    <h2>Calendario</h2>
                    <MiniCalendar events={events} forecast={weatherResult?.ok ? weatherResult.forecast : []} />
                  </div>
                )}

                <div className="atlas-entry-section">
                  <h2>Bitácora reciente</h2>
                  {recentActivity.length === 0 ? (
                    <p className="atlas-section-note">Todavía no hay actividad registrada.</p>
                  ) : (
                    <ul className="dashboard-activity-list dashboard-activity-list-inline">
                      {recentActivity.map((item) => (
                        <li key={item.id} className="dashboard-activity-item">
                          {item.kind === 'event' ? <IconJournal className="dashboard-activity-icon" /> : <IconCamera className="dashboard-activity-icon" />}
                          <div>
                            <span className="dashboard-activity-label">{item.label}</span>
                            <span className="dashboard-activity-date">{formatDate(item.date)}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="atlas-entry-section">
                  <div className="mi-cultivo-events-head">
                    <h2>Línea temporal</h2>
                    {events.length > 0 && (
                      <button type="button" className="mi-cultivo-reset-link" onClick={handleReset} disabled={remoteBusy}>
                        {confirmingReset ? '¿Confirmar borrado? Tocá de nuevo' : 'Reiniciar Mi Cultivo'}
                      </button>
                    )}
                  </div>
                  {events.length === 0 ? (
                    <div className="photo-placeholder">
                      <span className="photo-placeholder-icon" aria-hidden="true">+</span>
                      <p>Todavía no registraste ningún evento.</p>
                      <p className="atlas-section-note">Los eventos que cargues arriba van a aparecer acá, en orden, con su etapa, fecha y nota.</p>
                    </div>
                  ) : (
                    <>
                      <div className="mi-cultivo-timeline-order" role="group" aria-label="Orden de la línea temporal">
                        <button
                          type="button"
                          className={`mi-cultivo-order-button ${timelineOrder === 'recent' ? 'mi-cultivo-order-active' : ''}`}
                          onClick={() => setTimelineOrder('recent')}
                          aria-pressed={timelineOrder === 'recent'}
                        >
                          Más reciente primero
                        </button>
                        <button
                          type="button"
                          className={`mi-cultivo-order-button ${timelineOrder === 'chrono' ? 'mi-cultivo-order-active' : ''}`}
                          onClick={() => setTimelineOrder('chrono')}
                          aria-pressed={timelineOrder === 'chrono'}
                        >
                          Cronológico (temporada completa)
                        </button>
                      </div>
                      <ol className="mi-cultivo-events-list">
                        {sortedEvents.map((cultivoEvent) => (
                          <li className="mi-cultivo-event-card" key={cultivoEvent.id}>
                            <div className="mi-cultivo-event-head">
                              <span className="mi-cultivo-event-stage">{stageLabel(cultivoEvent.stageId)}</span>
                              <span className="mi-cultivo-event-date">{formatDate(cultivoEvent.date)}</span>
                            </div>
                            {cultivoEvent.note && <p className="mi-cultivo-event-note">{cultivoEvent.note}</p>}

                            {isAccountMode ? (
                              <div className="mi-cultivo-event-photos">
                                <div className="mi-cultivo-photo-thumbs">
                                  {(photosByEvent[cultivoEvent.id] ?? []).map((photo) => (
                                    <div className="mi-cultivo-photo-item" key={photo.id}>
                                      <button
                                        type="button"
                                        className="mi-cultivo-photo-thumb"
                                        onClick={() => setExpandedPhotoId((current) => (current === photo.id ? null : photo.id))}
                                        disabled={!photo.url}
                                        aria-label="Ver foto más grande"
                                      >
                                        {photo.url ? (
                                          <img src={photo.url} alt="Foto de este evento" />
                                        ) : (
                                          <span className="mi-cultivo-photo-loading">…</span>
                                        )}
                                      </button>
                                      <button
                                        type="button"
                                        className="mi-cultivo-photo-remove"
                                        onClick={() => handlePhotoDelete(photo)}
                                        disabled={photoBusyEventId === cultivoEvent.id}
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  ))}

                                  <label className={`mi-cultivo-photo-add ${photoBusyEventId === cultivoEvent.id ? 'mi-cultivo-photo-add-busy' : ''}`}>
                                    <span aria-hidden="true">+</span>
                                    <span>{photoBusyEventId === cultivoEvent.id ? 'Subiendo…' : 'Agregar foto'}</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="mi-cultivo-photo-input"
                                      disabled={photoBusyEventId === cultivoEvent.id}
                                      onChange={(fileEvent) => {
                                        const file = fileEvent.target.files?.[0];
                                        fileEvent.target.value = '';
                                        handlePhotoUpload(cultivoEvent.id, file);
                                      }}
                                    />
                                  </label>
                                </div>

                                {(photosByEvent[cultivoEvent.id] ?? [])
                                  .filter((photo) => photo.id === expandedPhotoId && photo.url)
                                  .map((photo) => (
                                    <div className="mi-cultivo-photo-expanded" key={photo.id}>
                                      <img src={photo.url} alt="Foto de este evento, tamaño ampliado" />
                                    </div>
                                  ))}

                                {photoErrorByEvent[cultivoEvent.id] && (
                                  <p className="mi-cultivo-auth-error">{photoErrorByEvent[cultivoEvent.id]}</p>
                                )}
                              </div>
                            ) : (
                              <div className="mi-cultivo-event-photo-slot">
                                <span aria-hidden="true">+</span>
                                <span>Espacio reservado para foto de esta etapa</span>
                              </div>
                            )}

                            <div className="mi-cultivo-event-actions">
                              <button
                                type="button"
                                className="mi-cultivo-event-edit"
                                onClick={() => handleStartEdit(cultivoEvent)}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                className="mi-cultivo-event-delete"
                                onClick={() => handleDeleteEvent(cultivoEvent)}
                                disabled={deletingEventId === cultivoEvent.id}
                              >
                                {confirmingDeleteEventId === cultivoEvent.id
                                  ? '¿Confirmar? Tocá de nuevo'
                                  : deletingEventId === cultivoEvent.id
                                    ? 'Eliminando…'
                                    : 'Eliminar evento'}
                              </button>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>
              </>
            )}

            {activeTab === 'ambiente' && (
              <div className="atlas-entry-section mi-cultivo-weather-section">
                <h2>Hoy</h2>
                <span className="section-label mi-cultivo-weather-subtitle">Contexto ambiental</span>

                <label className="mi-cultivo-field mi-cultivo-weather-location">
                  <span>Ubicación aproximada (provincia)</span>
                  <select value={provinceId ?? ''} onChange={handleProvinceChange} disabled={!locationReady}>
                    <option value="">Sin ubicación elegida</option>
                    {PROVINCE_OPTIONS.map((province) => (
                      <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                  </select>
                </label>
                <p className="atlas-section-note">
                  Solo a nivel provincia — nunca tu ubicación exacta ni GPS. Sirve para mostrar
                  condiciones ambientales de referencia junto a tu cultivo, no para calcular nada
                  sobre él. Es independiente de la provincia elegida en Inicio para explorar el Atlas —
                  la usamos como punto de partida acá si todavía no elegiste una para tu cultivo, pero
                  podés cambiarla en cualquier momento sin afectar tu navegación del Atlas.
                </p>

                {!locationReady && (
                  <p className="atlas-section-note">Cargando tu cultivo…</p>
                )}

                {locationReady && !provinceId && (
                  <p className="atlas-section-note">Elegí una provincia para ver el contexto ambiental de tu zona.</p>
                )}

                {provinceId && weatherStatus === 'loading' && (
                  <p className="atlas-section-note">Cargando datos ambientales…</p>
                )}

                {provinceId && weatherStatus === 'error' && (
                  <p className="mi-cultivo-weather-unavailable">Datos ambientales no disponibles en este momento.</p>
                )}

                {provinceId && weatherStatus === 'ready' && weatherResult?.ok && (
                  <div className="mi-cultivo-weather-body">
                    <p className="mi-cultivo-weather-context">
                      Tu cultivo está registrado en <strong>{weatherResult.locationName}</strong>, actualmente
                      en la etapa <strong>{STAGES[currentIndex].label}</strong>.
                    </p>

                    <div className="mi-cultivo-weather-current">
                      {weatherResult.current.temperature !== null && (
                        <div className="mi-cultivo-weather-stat">
                          <span className="mi-cultivo-weather-stat-label">Temperatura</span>
                          <span className="mi-cultivo-weather-stat-value">{Math.round(weatherResult.current.temperature)}°C</span>
                        </div>
                      )}
                      {weatherResult.current.humidity !== null && (
                        <div className="mi-cultivo-weather-stat">
                          <span className="mi-cultivo-weather-stat-label">Humedad</span>
                          <span className="mi-cultivo-weather-stat-value">{Math.round(weatherResult.current.humidity)}%</span>
                        </div>
                      )}
                      {weatherResult.current.precipitation !== null && (
                        <div className="mi-cultivo-weather-stat">
                          <span className="mi-cultivo-weather-stat-label">Lluvia</span>
                          <span className="mi-cultivo-weather-stat-value">{weatherResult.current.precipitation} mm</span>
                        </div>
                      )}
                      {weatherResult.current.windSpeed !== null && (
                        <div className="mi-cultivo-weather-stat">
                          <span className="mi-cultivo-weather-stat-label">Viento</span>
                          <span className="mi-cultivo-weather-stat-value">{Math.round(weatherResult.current.windSpeed)} km/h</span>
                        </div>
                      )}
                    </div>

                    {weatherResult.todayReadings.length > 0 && (
                      <div className="mi-cultivo-weather-readings">
                        <h3>Qué está pasando hoy</h3>
                        <ul>
                          {weatherResult.todayReadings.map((reading) => (
                            <li key={reading.id}><strong>{reading.label}.</strong> {reading.detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {weatherResult.forecast.length > 0 && (
                      <div className="mi-cultivo-weather-forecast">
                        <h3>Pronóstico corto</h3>
                        <ol>
                          {weatherResult.forecast.slice(0, 5).map((day) => (
                            <li key={day.date}>
                              <span>{formatShortDate(day.date)}</span>
                              <span>
                                {day.tempMin !== null ? Math.round(day.tempMin) : '—'}° / {day.tempMax !== null ? Math.round(day.tempMax) : '—'}°
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {weatherResult.alerts.length > 0 && (
                      <div className="mi-cultivo-weather-alerts">
                        <h3>Alertas por umbral (cálculo propio, no oficiales)</h3>
                        <ul>
                          {weatherResult.alerts.map((alert) => (
                            <li key={alert.id}><strong>{alert.label}.</strong> {alert.detail}</li>
                          ))}
                        </ul>
                        <p className="atlas-section-note">
                          Lecturas calculadas localmente a partir del pronóstico — no reemplazan los
                          avisos oficiales. Para alertas oficiales, consultá el{' '}
                          <a href="https://www.smn.gob.ar/avisos_a_muy_corto_plazo" target="_blank" rel="noreferrer">
                            Servicio Meteorológico Nacional
                          </a>.
                        </p>
                      </div>
                    )}

                    <p className="atlas-section-note mi-cultivo-weather-source">
                      Fuente: Open-Meteo{weatherResult.generatedAt ? ` — datos generados el ${formatGeneratedAt(weatherResult.generatedAt)}` : ''}.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ajustes' && (
              <>
                {isAccountMode && cultivoId && (
                  <div className="atlas-entry-section">
                    <h2>Cultivo / temporada</h2>
                    <div className="mi-cultivo-switcher">
                      <select
                        value={cultivoId}
                        onChange={(event) => handleSwitchCultivo(event.target.value)}
                        disabled={cultivoSwitchBusy}
                      >
                        {cultivosList.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.seasonName || `Temporada sin nombre (${formatDate(item.createdAt.slice(0, 10))})`}
                          </option>
                        ))}
                      </select>
                      <button type="button" className="mi-cultivo-reset-link" onClick={handleCreateCultivo} disabled={cultivoSwitchBusy}>
                        + Nuevo cultivo
                      </button>
                    </div>
                  </div>
                )}

                <div className="atlas-entry-section mi-cultivo-summary-widget mi-cultivo-printable">
                  <div className="mi-cultivo-events-head">
                    <h2>{seasonName || 'Temporada sin nombre'} — Resumen</h2>
                    <button type="button" className="mi-cultivo-reset-link mi-cultivo-print-button" onClick={() => window.print()}>
                      Imprimir / guardar como PDF
                    </button>
                  </div>
                  <ul className="mi-cultivo-summary-list">
                    <li><span>Etapa actual</span><strong>{STAGES[currentIndex].label}</strong></li>
                    <li><span>Registros</span><strong>{seasonSummary.totalEvents}</strong></li>
                    <li><span>Fotos</span><strong>{isAccountMode ? seasonSummary.totalPhotos : '—'}</strong></li>
                    <li><span>Días con registro</span><strong>{seasonSummary.distinctDaysRegistered}</strong></li>
                    <li><span>Última actividad</span><strong>{seasonSummary.lastActivityDate ? formatDate(seasonSummary.lastActivityDate) : 'Sin actividad'}</strong></li>
                  </ul>
                  <p className="atlas-section-note mi-cultivo-print-only-note">Usá el diálogo de impresión del navegador para guardar esta página como PDF o compartirla.</p>
                </div>

                <div className="atlas-entry-section mi-cultivo-alerts-widget">
                  <div className="mi-cultivo-events-head">
                    <h2>Alertas</h2>
                    {unreadAlerts.length > 0 && (
                      <button type="button" className="mi-cultivo-reset-link" onClick={handleMarkAllAlertsRead}>Marcar todas leídas</button>
                    )}
                  </div>
                  {!isAccountMode ? (
                    <p className="atlas-section-note">El acompañamiento activo (clima, etapa, sanidad) está disponible con cuenta.</p>
                  ) : !alertsChecked ? (
                    <p className="atlas-section-note">Evaluando avisos…</p>
                  ) : alerts.length === 0 ? (
                    <p className="atlas-section-note">Sin avisos por ahora.</p>
                  ) : (
                    <>
                      {unreadAlerts.length > 0 ? (
                        <ul className="mi-cultivo-alerts-list">
                          {unreadAlerts.map((alert) => (
                            <li className={`mi-cultivo-alert-item mi-cultivo-alert-${alert.category}`} key={alert.id}>
                              <div className="mi-cultivo-alert-head">
                                <span className={`mi-cultivo-alert-category mi-cultivo-alert-category-${alert.category}`}>
                                  {alert.category === 'clima' ? 'Clima' : alert.category === 'etapa' ? 'Etapa' : 'Sanidad'}
                                </span>
                                <span className="mi-cultivo-alert-date">{formatGeneratedAt(alert.createdAt)}</span>
                              </div>
                              <span className="mi-cultivo-alert-target">{alertTargetLabel(alert)}</span>
                              <p className="mi-cultivo-alert-title">{alert.title}</p>
                              <p className="mi-cultivo-alert-body">{alert.body}</p>
                              <div className="mi-cultivo-alert-actions">
                                {alert.relatedHref && <Link href={alert.relatedHref}>Ver en el Atlas ↗</Link>}
                                <button type="button" className="mi-cultivo-reset-link" onClick={() => handleMarkAlertRead(alert.id)}>Marcar leída</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="atlas-section-note">Sin avisos nuevos.</p>
                      )}
                      {readAlerts.length > 0 && (
                        <details className="mi-cultivo-alerts-history">
                          <summary>Anteriores ({readAlerts.length})</summary>
                          <ul className="mi-cultivo-alerts-list">
                            {readAlerts.map((alert) => (
                              <li className={`mi-cultivo-alert-item mi-cultivo-alert-read mi-cultivo-alert-${alert.category}`} key={alert.id}>
                                <div className="mi-cultivo-alert-head">
                                  <span className={`mi-cultivo-alert-category mi-cultivo-alert-category-${alert.category}`}>
                                    {alert.category === 'clima' ? 'Clima' : alert.category === 'etapa' ? 'Etapa' : 'Sanidad'}
                                  </span>
                                  <span className="mi-cultivo-alert-date">{formatGeneratedAt(alert.createdAt)}</span>
                                </div>
                                <span className="mi-cultivo-alert-target">{alertTargetLabel(alert)}</span>
                                <p className="mi-cultivo-alert-title">{alert.title}</p>
                                <p className="mi-cultivo-alert-body">{alert.body}</p>
                                {alert.relatedHref && <Link href={alert.relatedHref}>Ver en el Atlas ↗</Link>}
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </>
                  )}
                </div>

                {isAccountMode && (
                  <div className="atlas-entry-section mi-cultivo-preferences-widget">
                    <h2>Notificaciones</h2>
                    {!notificationPreferences ? (
                      <p className="atlas-section-note">Cargando preferencias…</p>
                    ) : (
                      <form className="mi-cultivo-preferences-form" onSubmit={handleSavePreferences}>
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationPreferences.emailClima}
                            onChange={(event) => setNotificationPreferences((prev) => ({ ...prev, emailClima: event.target.checked }))}
                          />
                          Alertas de clima por email
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationPreferences.emailEtapa}
                            onChange={(event) => setNotificationPreferences((prev) => ({ ...prev, emailEtapa: event.target.checked }))}
                          />
                          Avisos de etapa por email
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={notificationPreferences.emailSanidad}
                            onChange={(event) => setNotificationPreferences((prev) => ({ ...prev, emailSanidad: event.target.checked }))}
                          />
                          Avisos de sanidad/plagas por email
                        </label>
                        <label className="mi-cultivo-preference-disabled">
                          <input type="checkbox" checked={false} disabled readOnly />
                          Notificaciones web (próximamente)
                        </label>
                        <p className="atlas-section-note">El envío de emails todavía no está activo — tu preferencia queda guardada para cuando se habilite.</p>
                        {preferencesNotice && <p className="atlas-section-note">{preferencesNotice}</p>}
                        <button type="submit" className="secondary-button" disabled={preferencesSaving}>Guardar preferencias</button>
                      </form>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
      </main>

      <button
        type="button"
        className="dashboard-fab"
        aria-label="Registrar un evento"
        onClick={() => {
          setActiveTab('bitacora');
          requestAnimationFrame(() => eventFormSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        }}
      >
        <IconPlus width={22} height={22} />
      </button>

      <section className="club-mi-cultivo-cta">
        <p>¿Buscás algo puntual? El resto del Atlas está organizado por categoría de cultivo.</p>
        <Link className="club-button" href="/atlas">Explorar el Atlas</Link>
      </section>
    </div>
  );
}
