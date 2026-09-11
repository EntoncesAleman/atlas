import Link from 'next/link';

export default function TrackerShowcaseCard() {
  return (
    <article className="atlas-card tracker-card">
      <Link className="tracker-card-link" href="/mi-cultivo" aria-label="Ir a De semilla al frasco — seguimiento de cultivo">
        <div className="tracker-card-media">
          <span className="tracker-card-badge">Nuevo</span>
          <svg
            className="tracker-evolution-graphic"
            viewBox="0 0 400 190"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Ilustración de la evolución de una planta, de semilla a frasco"
          >
            <path className="tracker-evolution-path" d="M20 172 Q110 168 150 130 Q190 92 225 96 Q260 100 295 70 Q330 42 360 100" />

            <ellipse className="tracker-evolution-shape" cx="20" cy="174" rx="7" ry="9" />

            <g className="tracker-evolution-shape">
              <line x1="80" y1="172" x2="80" y2="152" />
              <path d="M80 158 Q68 152 65 141" />
              <path d="M80 158 Q92 152 95 141" />
            </g>

            <g className="tracker-evolution-shape">
              <line x1="150" y1="172" x2="150" y2="128" />
              <path d="M150 150 Q133 142 128 126" />
              <path d="M150 150 Q167 142 172 126" />
              <path d="M150 132 Q140 126 136 115" />
              <path d="M150 132 Q160 126 164 115" />
            </g>

            <g className="tracker-evolution-shape">
              <line x1="225" y1="172" x2="225" y2="96" />
              <path d="M225 142 Q204 132 197 112" />
              <path d="M225 142 Q246 132 253 112" />
              <path d="M225 118 Q207 109 201 92" />
              <path d="M225 118 Q243 109 249 92" />
              <path d="M225 100 Q214 92 210 80" />
              <path d="M225 100 Q236 92 240 80" />
            </g>

            <g className="tracker-evolution-shape">
              <line x1="295" y1="172" x2="295" y2="96" />
              <path d="M295 142 Q276 132 269 113" />
              <path d="M295 142 Q314 132 321 113" />
              <path d="M295 118 Q279 108 273 91" />
              <path d="M295 118 Q311 108 317 91" />
              <circle cx="295" cy="70" r="11" />
              <circle cx="279" cy="82" r="6.5" />
              <circle cx="311" cy="82" r="6.5" />
            </g>

            <g className="tracker-evolution-shape tracker-evolution-jar">
              <path d="M348 96 h24 v8 h-3 v56 a5 5 0 0 1 -5 5 h-8 a5 5 0 0 1 -5 -5 v-56 h-3 Z" />
              <line x1="357" y1="88" x2="357" y2="96" />
              <line x1="363" y1="88" x2="363" y2="96" />
            </g>
          </svg>
        </div>
        <div className="tracker-card-body">
          <span className="tracker-card-kicker">Seguimiento de cultivo</span>
          <h3>De semilla al frasco</h3>
          <p>El recorrido completo de una planta, etapa por etapa — con o sin cuenta.</p>
          <span className="tracker-card-cta">
            <span>Explorar</span>
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
