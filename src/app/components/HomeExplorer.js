"use client";

import { useEffect, useRef, useState } from "react";

// Server-rendered content stays mounted: switching views preserves map selection and filters.
export default function HomeExplorer({ territory, context, atlas }) {
  const [view, setView] = useState("territorio");
  const [compact, setCompact] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const tabs = useRef([]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1099px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  function onKeyDown(event, index) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - index;
    setView(next ? "atlas" : "territorio");
    tabs.current[next]?.focus();
  }
  return (
    <div
      className="home-layout home-explorer"
      data-home-view={view}
      data-context-open={contextOpen}
    >
      <h1 className="home-mobile-title">Explorá el Atlas</h1>
      <div
        className="home-view-tabs"
        role="tablist"
        aria-label="Explorar el Atlas"
      >
        {["territorio", "atlas"].map((id, index) => (
          <button
            key={id}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`home-tab-${id}`}
            aria-controls={`home-panel-${id}`}
            aria-selected={view === id}
            tabIndex={view === id ? 0 : -1}
            onClick={() => setView(id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {id === "atlas" ? "Atlas" : "Territorio"}
          </button>
        ))}
      </div>
      <div
        className="home-main home-territory-panel"
        id="home-panel-territorio"
        role={compact ? "tabpanel" : "region"}
        aria-label={compact ? undefined : "Territorio"}
        aria-labelledby={compact ? "home-tab-territorio" : undefined}
        tabIndex={compact ? 0 : undefined}
      >
        {territory}
        <button
          className="home-context-toggle"
          type="button"
          aria-expanded={contextOpen}
          aria-controls="home-territory-context"
          onClick={() => setContextOpen((open) => !open)}
        >
          {contextOpen
            ? "Cerrar contexto y lecturas"
            : "Ver contexto, paisajes y lecturas"}
          <span aria-hidden="true">{contextOpen ? "−" : "+"}</span>
        </button>
        <div id="home-territory-context" className="home-territory-context">
          {context}
        </div>
      </div>
      <div
        className="home-atlas-panel"
        id="home-panel-atlas"
        role={compact ? "tabpanel" : "region"}
        aria-label={compact ? undefined : "Índice del Atlas"}
        aria-labelledby={compact ? "home-tab-atlas" : undefined}
        tabIndex={compact ? 0 : undefined}
      >
        <form className="home-atlas-search" action="/chatbot" method="get">
          <label htmlFor="home-atlas-query">Buscar en el Atlas</label>
          <div>
            <input
              id="home-atlas-query"
              name="q"
              type="search"
              placeholder="Tema, palabra o pregunta"
              required
            />
            <button type="submit">Buscar</button>
          </div>
        </form>
        {atlas}
      </div>
    </div>
  );
}
