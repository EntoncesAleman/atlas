import Link from 'next/link';
import { getSessionProfile } from '../lib/supabase/server';

export default async function ClubPage() {
  const { profile } = await getSessionProfile();

  return (
    <>
      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">Cuenta de club</span>
          <h1>{profile?.club_name ?? 'Panel de club'}</h1>
          <p className="atlas-lede">
            Tu cuenta tiene el rol de club, aprobado por el equipo del Atlas. Las funciones
            propias del panel de club (gestión de la ficha del club en el directorio de
            Comunidad, eventos, cursos) todavía se administran editorialmente — igual que el
            resto de /comunidad hoy — y se van a habilitar acá a medida que existan.
          </p>
        </div>
      </section>

      <section className="atlas-section">
        <div className="atlas-entry-section">
          <h2>Qué podés hacer hoy</h2>
          <p>
            Por ahora, tu cuenta de club te da acceso a esta sección reservada. Para publicar o
            actualizar la información de tu club en el directorio público de{' '}
            <Link href="/comunidad/clubes">Comunidad → Clubes</Link>, contactá al equipo del
            Atlas — la autogestión completa desde acá es la próxima etapa de este panel.
          </p>
        </div>
      </section>
    </>
  );
}
