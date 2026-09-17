'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { STAGES, createCultivo, createEvent, updateEvent, stageIndex, stageLabel } from '../lib/miCultivo/model';
import { loadCultivo, saveCultivo, resetCultivo } from '../lib/miCultivo/storage';
import { getSupabaseClient } from '../lib/supabase/client';
import {
  ensureCultivo,
  setCurrentStageRemote,
  setProvinceRemote,
  insertEventRemote,
  updateEventRemote,
  deleteEventRemote,
  resetCultivoRemote,
  bulkInsertEventsRemote,
} from '../lib/miCultivo/remoteStorage';
import { uploadEventPhoto, fetchPhotosByEvent, deleteEventPhoto } from '../lib/miCultivo/photos';
import { PhotoValidationError } from '../lib/miCultivo/photoProcessing';
import { PROVINCE_OPTIONS } from '../lib/weather/locations';
import { fetchProvinceWeather } from '../lib/weather/service';

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

// "Inicio de temporada" (Fase 12): un único concepto de inicio, tomado de la
// fecha del primer evento real (la más antigua entre los eventos cargados por
// la persona) — nunca `createdAt` del registro (eso es cuándo se creó la fila
// en la app, no cuándo empezó la temporada real) ni la fecha de hoy. Sin
// eventos, no hay fecha de inicio todavía — se muestra el estado vacío.
function getSeasonStartDate(events) {
  if (!events.length) return null;
  return events.reduce((earliest, item) => (item.date < earliest ? item.date : earliest), events[0].date);
}

function daysSince(isoDate) {
  if (!isoDate) return null;
  const start = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  return Math.round((today.getTime() - start.getTime()) / 86400000);
}

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
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authNotice, setAuthNotice] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const previousSessionRef = useRef(null);

  // --- Cultivo (local o remoto, según haya sesión) ---
  const [hydrated, setHydrated] = useState(false);
  const [cultivoId, setCultivoId] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const [currentStageId, setCurrentStageId] = useState(STAGES[0].id);
  const [events, setEvents] = useState([]);
  const [remoteBusy, setRemoteBusy] = useState(false);
  const [remoteError, setRemoteError] = useState('');

  // --- Contexto ambiental (Fase 11) ---
  const [provinceId, setProvinceId] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState('idle'); // idle | loading | ready | error
  const [weatherResult, setWeatherResult] = useState(null);

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
  const nextStage = STAGES[currentIndex + 1] ?? null;

  function adoptCultivo(cultivo) {
    setCultivoId(cultivo.id);
    setCreatedAt(cultivo.createdAt);
    setCurrentStageId(cultivo.currentStageId);
    setEvents(cultivo.events);
    setProvinceId(cultivo.provinceId ?? null);
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

  // Persistencia local: solo cuando NO hay sesión (modo sin cuenta). En modo
  // cuenta, cada acción persiste directamente contra Supabase (ver los
  // handlers), así que este efecto no debe pisar esos datos.
  useEffect(() => {
    if (!hydrated || isAccountMode) return;
    saveCultivo({ id: cultivoId, currentStageId, provinceId, events, createdAt, updatedAt: new Date().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, isAccountMode, cultivoId, currentStageId, provinceId, events, createdAt]);

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
        setCurrentStageId(STAGES[0].id);
        setEvents([]);
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
        const { data, error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
        if (error) {
          setAuthError(translateAuthError(error));
          return;
        }
        if (!data.session) {
          setAuthNotice('Te enviamos un email para confirmar tu cuenta. Confirmalo y después iniciá sesión acá.');
          setAuthMode('signin');
        } else {
          // Sesión inmediata (confirmación de email desactivada en este proyecto): el ingreso
          // lleva al Atlas completo, no directo a Mi Cultivo (Loop 4.1) — la sesión ya quedó
          // activa acá mismo (`onAuthStateChange`), así que el Atlas la va a reconocer enseguida.
          router.push('/atlas');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
        if (error) {
          setAuthError(translateAuthError(error));
          return;
        }
        router.push('/atlas');
      }
      setAuthPassword('');
    } finally {
      setAuthSubmitting(false);
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  return (
    <main className="atlas-page mi-cultivo-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Mi Cultivo</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Seguimiento de cultivo</span>
          <h1>Mi Cultivo</h1>
          <p className="atlas-lede">
            Un historial visual del recorrido de tu planta, etapa por etapa. Podés usarlo sin
            cuenta (se guarda en este navegador) o crear una cuenta para tener tu historial
            asociado a vos.
          </p>
        </div>
      </section>

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
        <div className="mi-cultivo-mode-grid">
          <article className={`mi-cultivo-mode-card ${isAccountMode ? 'mi-cultivo-mode-disabled' : 'mi-cultivo-mode-active'}`}>
            <span className="mi-cultivo-mode-tag">{isAccountMode ? 'Inactivo' : 'Modo actual'}</span>
            <h2>Sin cuenta</h2>
            <p>Podés marcar la etapa actual y cargar eventos con fecha y notas sin registrarte.</p>
            <p className="atlas-section-note">Se guarda automáticamente en este navegador: no hay cuenta ni sincronización entre dispositivos — si cambiás de navegador, usás modo privado, o borrás los datos del sitio, el historial no va a estar disponible.</p>
          </article>

          <article className={`mi-cultivo-mode-card ${isAccountMode ? 'mi-cultivo-mode-active' : 'mi-cultivo-mode-disabled'}`}>
            <span className="mi-cultivo-mode-tag">{isAccountMode ? 'Modo actual' : 'Disponible'}</span>
            <h2>Con cuenta</h2>

            {authLoading ? (
              <p className="atlas-section-note">Comprobando sesión…</p>
            ) : isAccountMode ? (
              <>
                <p>Iniciaste sesión como <strong>{session.user.email}</strong>. Tu historial queda asociado a esta cuenta — no depende de este dispositivo.</p>
                <button type="button" className="secondary-button" onClick={handleSignOut}>Cerrar sesión</button>
              </>
            ) : (
              <>
                <p>Creá una cuenta o iniciá sesión para que tu historial deje de depender de este navegador.</p>
                <div className="mi-cultivo-auth-benefits">
                  <span className="mi-cultivo-auth-benefits-title">¿Qué gano al ingresar?</span>
                  <ul>
                    <li>Guardar Mi Cultivo en la nube, no solo en este navegador.</li>
                    <li>Registrar etapas y eventos con fecha y notas, con historial completo.</li>
                    <li>Guardar fotos privadas de tu cultivo, asociadas a tu cuenta.</li>
                    <li>Mantener guardado el contexto de tu provincia entre visitas.</li>
                    <li>Consultar tu historial completo en "Mi Temporada".</li>
                    <li>Usar el Buscador del Atlas con contexto de tu propio cultivo.</li>
                    <li>Conservar tu información si cambiás de dispositivo o de navegador.</li>
                  </ul>
                </div>
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
              </>
            )}
          </article>
        </div>
      </section>

      {remoteError && (
        <section className="atlas-section">
          <p className="mi-cultivo-auth-error">{remoteError}</p>
        </section>
      )}

      <section className="atlas-section">
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
      </section>

      <section className="atlas-section">
        <div className="atlas-entry-section mi-cultivo-season-section">
          <h2>Mi temporada</h2>
          {events.length === 0 ? (
            <div className="photo-placeholder">
              <span className="photo-placeholder-icon" aria-hidden="true">+</span>
              <p>Todavía no registraste tu primer evento.</p>
              <p className="atlas-section-note">Tu temporada va a empezar en cuanto cargues el primero, más abajo.</p>
            </div>
          ) : (
            <div className="mi-cultivo-season-summary">
              <div className="mi-cultivo-season-stat">
                <span className="mi-cultivo-season-stat-label">Inicio</span>
                <span className="mi-cultivo-season-stat-value">{formatDate(seasonStartDate)}</span>
              </div>
              <div className="mi-cultivo-season-stat">
                <span className="mi-cultivo-season-stat-label">Tiempo transcurrido</span>
                <span className="mi-cultivo-season-stat-value">{formatElapsed(elapsedDays)}</span>
              </div>
              <div className="mi-cultivo-season-stat">
                <span className="mi-cultivo-season-stat-label">Etapa actual</span>
                <span className="mi-cultivo-season-stat-value">{STAGES[currentIndex].label}</span>
              </div>
              <div className="mi-cultivo-season-stat">
                <span className="mi-cultivo-season-stat-label">Eventos</span>
                <span className="mi-cultivo-season-stat-value">{events.length}</span>
              </div>
              {isAccountMode && (
                <div className="mi-cultivo-season-stat">
                  <span className="mi-cultivo-season-stat-label">Fotos</span>
                  <span className="mi-cultivo-season-stat-value">{totalPhotos}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="atlas-section">
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
      </section>

      <section className="atlas-section">
        <div className="atlas-entry-section">
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
      </section>

      <section className="atlas-section">
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
      </section>

      <section className="atlas-section">
        <div className="atlas-entry-section mi-cultivo-next-stage-section">
          <h2>Próxima etapa</h2>
          {nextStage ? (
            <p className="mi-cultivo-next-stage">
              Próxima etapa: <strong>{nextStage.label}</strong>. Vos decidís cuándo marcarla como
              etapa actual, arriba en "Estado actual" — no hay fechas automáticas ni calendario
              fijo.
            </p>
          ) : (
            <p className="mi-cultivo-next-stage">
              Ya estás en la última etapa del recorrido (<strong>{STAGES[currentIndex].label}</strong>).
            </p>
          )}
        </div>
      </section>

      <section className="atlas-section mi-cultivo-cta-section">
        <p className="atlas-section-note">Este espacio se sigue construyendo. Mientras tanto, el resto del Atlas ya está disponible para explorar.</p>
        <Link className="primary-button" href="/atlas">Volver al Atlas</Link>
      </section>
    </main>
  );
}
