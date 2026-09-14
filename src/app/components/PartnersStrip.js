import { atlasPartners } from '../lib/community/communityData';

// Franja de aliados/sponsors — EXCLUSIVAMENTE al final de `/atlas` (instrucción explícita del
// usuario, previa a la consigna del Loop 4.4): nunca en Home, nunca como entrada de menú, nunca
// como página protagonista. Con `atlasPartners` vacío (estado real hoy) muestra una nota mínima en
// vez de logos inventados — sigue siendo verificable que la sección "funciona vacía" (§19) sin
// simular aliados que no existen.
export default function PartnersStrip() {
  return (
    <section className="partners-strip" aria-label="Aliados del Atlas">
      <span className="partners-strip-label">Aliados del Atlas</span>
      {atlasPartners.length === 0 ? (
        <p className="partners-strip-empty">Próximamente — sponsors, aliados educativos e institucionales del Atlas.</p>
      ) : (
        <ul className="partners-strip-list">
          {atlasPartners.map((partner) => (
            <li key={partner.id} className="partners-strip-item">
              <a href={partner.url} target="_blank" rel="noopener noreferrer nofollow sponsored" aria-label={partner.name}>
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="partners-strip-logo" />
                ) : (
                  <span className="partners-strip-name">{partner.name}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
