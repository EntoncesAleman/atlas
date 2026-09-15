import { atlasPartners, PARTNER_TYPE_LABELS } from '../lib/community/communityData';

// Franja de aliados/sponsors — EXCLUSIVAMENTE al final de `/atlas` (instrucción explícita del
// usuario, previa a la consigna del Loop 4.4): nunca en Home, nunca como entrada de menú, nunca
// como página protagonista.
//
// Loop 4.4.1 (PARTE 10): se agregaron `type` label y `description` opcional al renderizado —
// cada aliado muestra su tipo conceptual (sponsor / aliado institucional / colaborador científico
// / aliado educativo) y una descripción de una frase si está disponible. El estado vacío (sin
// aliados reales todavía) sigue mostrando una nota mínima discreta, nunca placeholders ficticios.
export default function PartnersStrip() {
  return (
    <section className="partners-strip" aria-label="Aliados del Atlas">
      <div className="partners-strip-header">
        <span className="partners-strip-label">Aliados del Atlas</span>
        <p className="partners-strip-subtitle">
          Organizaciones que ayudan a sostener y ampliar este proyecto de conocimiento.
        </p>
      </div>
      {atlasPartners.length === 0 ? (
        <p className="partners-strip-empty">
          Próximamente — sponsors, aliados educativos e institucionales del Atlas.
        </p>
      ) : (
        <ul className="partners-strip-list">
          {atlasPartners.map((partner) => (
            <li key={partner.id} className="partners-strip-item">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                aria-label={partner.name}
                className="partners-strip-link"
              >
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="partners-strip-logo" />
                ) : (
                  <span className="partners-strip-name">{partner.name}</span>
                )}
              </a>
              {partner.type && (
                <span className="partners-strip-type">
                  {PARTNER_TYPE_LABELS[partner.type] ?? partner.type}
                </span>
              )}
              {partner.description && (
                <p className="partners-strip-description">{partner.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
