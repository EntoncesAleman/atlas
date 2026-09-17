'use client';

// Chatbot del Atlas — acceso autenticado (Fase 13A) + retrieval local sobre
// el Atlas editorial (Fase 13B) + contexto personalizado (Fase 13C).
//
// Regla conceptual central (no se muestra al usuario, guía el diseño de esta
// fase y de las siguientes): el Chatbot del Atlas no es una autoridad
// independiente. Es una interfaz conversacional sobre conocimiento editorial
// curado. Puede explicar, relacionar y contextualizar información
// autorizada, pero no puede inventar hechos, fuentes, diagnósticos, datos
// climáticos históricos ni recomendaciones que no estén respaldadas por el
// Atlas o por datos ambientales reales.
//
// Estado de esta fase (13C): cada búsqueda arma, además de los resultados de
// `searchAtlas` (13B), un paquete de contexto autorizado del propio usuario
// (`loadUserContext`, ver `lib/chatbot/context.js`) — etapa de Mi Cultivo,
// fechas/notas de sus propios eventos, cuántas fotos tiene (nunca las fotos
// en sí), su provincia guardada y el clima actual de esa provincia (Fase
// 11). Ese paquete queda listo para la futura Fase 13D pero **no se le pasa
// a ningún motor de respuesta todavía** — acá solo se prepara, y en la UI se
// muestra únicamente como un par de indicadores discretos ("Contexto de Mi
// Cultivo disponible" / "Contexto ambiental disponible"), nunca como datos
// crudos, IDs ni estructuras técnicas.
//
// Arquitectura futura prevista (NO implementada todavía):
//   Fase 13D: evidencia + contexto → motor de respuesta → respuesta trazable.
// Conectar esa fase es ampliar `handleSearch` y el estado de resultados de
// esta misma página — no hace falta rehacerla.
//
// Autenticación: mismo patrón ya usado en `mi-cultivo/page.js` (Fase 10B) —
// `getSupabaseClient()` + `supabase.auth.getSession()` /
// `onAuthStateChange`, sin una segunda arquitectura de auth. El contexto de
// esta fase siempre se arma a partir de `session.user.id` (la sesión real ya
// validada por Supabase) — nunca de un id recibido de otro lado — y el
// aislamiento real entre cuentas lo sigue haciendo RLS, sin cambios.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '../lib/supabase/client';
import { searchAtlas } from '../lib/chatbot/searchAtlas';
import { loadUserContext } from '../lib/chatbot/context';
import { getCategoryById } from '../lib/editorial/registry';
import { sourceById } from '../lib/editorial/sources';

export default function ChatbotPage() {
  const [supabase] = useState(() => getSupabaseClient());
  const [authLoading, setAuthLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState('');
  const [searchState, setSearchState] = useState('idle'); // idle | loading | done | error
  const [searchResults, setSearchResults] = useState([]);
  const [lastQuery, setLastQuery] = useState('');
  const [userContext, setUserContext] = useState(null);

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

  // Si la sesión se cierra estando en esta página, no queda ningún contexto
  // ni resultado previo en memoria — vuelve al estado inicial, igual que si
  // nunca se hubiera buscado nada.
  useEffect(() => {
    if (!session) {
      setUserContext(null);
      setSearchResults([]);
      setSearchState('idle');
    }
  }, [session]);

  const isAuthenticated = Boolean(session);

  async function handleSearch(domEvent) {
    domEvent.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || !isAuthenticated) return;
    setSearchState('loading');
    try {
      const { results } = searchAtlas(trimmed);
      // El contexto autorizado se arma siempre con la sesión real de este
      // mismo render — nunca con un id externo — y solo lee, nunca modifica
      // Mi Cultivo (ver `loadUserContext`).
      const context = await loadUserContext(supabase, session, results);
      setSearchResults(results);
      setUserContext(context);
      setLastQuery(trimmed);
      setSearchState('done');
    } catch {
      setSearchResults([]);
      setUserContext(null);
      setSearchState('error');
    }
  }

  return (
    <main className="atlas-page chatbot-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Buscador del Atlas</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Función autenticada</span>
          <h1>Buscador del Atlas</h1>
          <p className="atlas-lede">
            Buscá contenido del Atlas y consultá información relacionada con tu cultivo.
          </p>
        </div>
      </section>

      {authLoading ? (
        <section className="atlas-section">
          <p className="atlas-section-note">Comprobando sesión…</p>
        </section>
      ) : !isAuthenticated ? (
        <section className="atlas-section">
          <div className="atlas-entry-section chatbot-gate">
            <h2>Esta función está disponible para usuarios con cuenta.</h2>
            <p className="atlas-section-note">
              Iniciá sesión o creá una cuenta para usar el Buscador del Atlas — el mismo acceso que
              ya usás en Mi Cultivo, desde ahí.
            </p>
            <div className="mi-cultivo-form-actions">
              <Link className="primary-button" href="/mi-cultivo">Iniciar sesión</Link>
              <Link className="secondary-button" href="/mi-cultivo">Crear cuenta</Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="atlas-section">
          <div className="atlas-entry-section chatbot-conversation-section">
            {searchState === 'idle' && (
              <div className="photo-placeholder chatbot-conversation-area">
                <span className="photo-placeholder-icon" aria-hidden="true">?</span>
                <p>¿Qué querés consultar?</p>
                <p className="atlas-section-note">Escribí tu pregunta abajo.</p>
              </div>
            )}

            {searchState === 'loading' && (
              <p className="atlas-section-note">Buscando en el Atlas…</p>
            )}

            {searchState === 'done' && (userContext?.cultivation?.hasCultivation || userContext?.climate?.available) && (
              <div className="chatbot-context-badges" aria-label="Contexto disponible">
                {userContext.cultivation.hasCultivation && (
                  <span className="chatbot-context-badge">Contexto de Mi Cultivo disponible</span>
                )}
                {userContext.climate.available && (
                  <span className="chatbot-context-badge">Contexto ambiental disponible</span>
                )}
              </div>
            )}

            {searchState === 'done' && (
              searchResults.length > 0 ? (
                <div className="chatbot-results">
                  <p className="chatbot-results-intro">
                    Encontré información relacionada en el Atlas para «{lastQuery}».
                  </p>
                  <ol className="chatbot-results-list">
                    {searchResults.map((result) => {
                      const category = getCategoryById(result.categoryId);
                      const resultSources = (result.sourceIds ?? [])
                        .map((id) => sourceById(id))
                        .filter(Boolean);
                      return (
                        <li className="chatbot-result-card" key={result.entryId}>
                          <div className="chatbot-result-head">
                            {category && <span className="chatbot-result-category">{category.title}</span>}
                            <h3>{result.title}</h3>
                          </div>
                          {result.snippet && <p className="chatbot-result-snippet">{result.snippet}</p>}
                          <div className="chatbot-result-actions">
                            <Link className="chatbot-result-link" href={result.url}>Ver entrada</Link>
                            {resultSources.length > 0 && (
                              <details className="chatbot-result-sources">
                                <summary>Fuentes</summary>
                                <ul>
                                  {resultSources.map((source) => (
                                    <li key={source.id}>
                                      <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>
                                    </li>
                                  ))}
                                </ul>
                              </details>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ) : (
                <div className="chatbot-no-results">
                  <p>No encuentro información suficiente sobre ese tema en el Atlas.</p>
                  <p className="atlas-section-note">Probá con otro término o consultá una categoría del Atlas.</p>
                </div>
              )
            )}

            {searchState === 'error' && (
              <div className="chatbot-no-results">
                <p>No pude consultar el contenido del Atlas en este momento.</p>
              </div>
            )}

            <form className="chatbot-input-form" onSubmit={handleSearch}>
              <label className="mi-cultivo-field mi-cultivo-field-wide">
                <span>Tu pregunta</span>
                <textarea
                  value={question}
                  onChange={(domEvent) => setQuestion(domEvent.target.value)}
                  placeholder="Escribí tu pregunta..."
                  rows={2}
                />
              </label>
              <button type="submit" className="primary-button" disabled={!question.trim() || searchState === 'loading'}>
                Enviar
              </button>
            </form>

            <p className="atlas-section-note chatbot-status-note">
              El Buscador del Atlas está en desarrollo: por ahora te muestra información relacionada
              del Atlas, todavía no arma una respuesta conversacional.
            </p>
          </div>
        </section>
      )}

      <section className="atlas-section mi-cultivo-cta-section">
        <p className="atlas-section-note">Mientras tanto, el resto del Atlas ya está disponible para explorar.</p>
        <Link className="primary-button" href="/atlas">Volver al Atlas</Link>
      </section>
    </main>
  );
}
