// Estado "Próximamente" compartido por los 4 directorios de Comunidad (Clubes, Agenda, Formación,
// Voces del territorio) — todos parten vacíos a propósito (ver `lib/community/communityData.js`).
// Un solo componente evita repetir el mismo bloque 4 veces sin inventar contenido de relleno.
export default function CommunityEmptyState({ title, description }) {
  return (
    <div className="community-empty-state">
      <span className="community-empty-badge">Próximamente</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
