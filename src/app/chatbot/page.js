'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { searchAtlas } from '../lib/chatbot/searchAtlas';
import { ARGENTINA_PROVINCES } from '../lib/geo/argentinaProvinces';
import { getCategories, getCategoryById } from '../lib/editorial/registry';
import { sourceById } from '../lib/editorial/sources';

export default function ChatbotPage() {
  const [question, setQuestion] = useState('');
  const [searchState, setSearchState] = useState('idle'); // idle | loading | done | error
  const [searchResults, setSearchResults] = useState([]);
  const [lastQuery, setLastQuery] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [provinceId, setProvinceId] = useState('');
  async function runSearch(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSearchState('loading');
    try {
      const { results } = searchAtlas(trimmed, { categoryId, provinceId, limit: 20 });
      setSearchResults(results);
      setLastQuery(trimmed);
      setSearchState('done');
    } catch {
      setSearchResults([]);
      setSearchState('error');
    }
  }

  function handleSearch(domEvent) {
    domEvent.preventDefault();
    runSearch(question);
  }

  const [prefillHandled, setPrefillHandled] = useState(false);
  useEffect(() => {
    if (prefillHandled) return;
    const params = new URLSearchParams(window.location.search);
    const prefilled = params.get('q');
    if (!prefilled) {
      setPrefillHandled(true);
      return;
    }
    setQuestion(prefilled);
    setPrefillHandled(true);
    runSearch(prefilled);
    const url = new URL(window.location.href);
    url.searchParams.delete('q');
    window.history.replaceState({}, '', url.pathname + url.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillHandled]);

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
          <span className="section-label dark-label">Consulta pública</span>
          <h1>Buscador del Atlas</h1>
          <p className="atlas-lede">
            Buscá por tema, provincia mencionada, palabra o pregunta. Todas las entradas se pueden consultar sin cuenta.
          </p>
        </div>
      </section>

        <section className="atlas-section">
          <div className="atlas-entry-section chatbot-conversation-section">
            {searchState === 'idle' && (
              <div className="photo-placeholder chatbot-conversation-area">
                <span className="photo-placeholder-icon" aria-hidden="true">?</span>
                <p>¿Qué querés consultar?</p>
                <p className="atlas-section-note">Por ejemplo: fotoperiodo, sustrato o heladas.</p>
              </div>
            )}

            {searchState === 'loading' && (
              <p className="atlas-section-note">Buscando en el Atlas…</p>
            )}

            {searchState === 'done' && (
              searchResults.length > 0 ? (
                <div className="chatbot-results">
                  <p className="chatbot-results-intro" role="status">
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
                <div className="chatbot-no-results" role="status">
                  <p>No encuentro información suficiente sobre ese tema en el Atlas.</p>
                  <p className="atlas-section-note">Probá con otro término o consultá una categoría del Atlas.</p>
                </div>
              )
            )}

            {searchState === 'error' && (
              <div className="chatbot-no-results" role="status">
                <p>No pude consultar el contenido del Atlas en este momento.</p>
              </div>
            )}

            <form className="chatbot-input-form" onSubmit={handleSearch}>
              <div className="public-search-filters">
                <label className="mi-cultivo-field"><span>Tema</span><select value={categoryId} onChange={event => setCategoryId(event.target.value)}><option value="">Todos los temas</option>{getCategories().map(category => <option value={category.id} key={category.id}>{category.title}</option>)}</select></label>
                <label className="mi-cultivo-field"><span>Provincia mencionada</span><select value={provinceId} onChange={event => setProvinceId(event.target.value)}><option value="">Todas las provincias</option>{ARGENTINA_PROVINCES.map(province => <option value={province.id} key={province.id}>{province.name}</option>)}</select></label>
              </div>
              <p className="atlas-section-note">El filtro provincial muestra entradas que nombran esa provincia en el texto.</p>
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
                Buscar
              </button>
            </form>

            <p className="atlas-section-note chatbot-status-note">
              El Buscador del Atlas está en desarrollo: por ahora te muestra información relacionada
              del Atlas, todavía no arma una respuesta conversacional.
            </p>
          </div>
        </section>

      <section className="atlas-section mi-cultivo-cta-section">
        <p className="atlas-section-note">Mientras tanto, el resto del Atlas ya está disponible para explorar.</p>
        <Link className="primary-button" href="/atlas">Volver al Atlas</Link>
      </section>
    </main>
  );
}
