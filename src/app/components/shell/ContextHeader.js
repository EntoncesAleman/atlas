// Capa 2 del shell nuevo: representa DÓNDE está la persona (a diferencia de GlobalHeader, que
// representa al producto). `children` es la franja de widgets/contexto persistente — pensado
// para Clima/Noticias/Alertas en Mi Cultivo, pero cualquier página puede pasar lo que le
// corresponda. No es 'use client': no necesita estado propio, así que Home/el índice del Atlas
// (Server Components) lo montan sin convertirse en cliente.

export default function ContextHeader({ kicker, title, tabs, children }) {
  return (
    <div className="ch">
      <div className="ch-row">
        <div className="ch-title-block">
          {kicker && <span className="ch-kicker">{kicker}</span>}
          <h1 className="ch-title">{title}</h1>
        </div>
        {children && <div className="ch-widgets">{children}</div>}
      </div>
      {tabs && <div className="ch-tabs-row">{tabs}</div>}
    </div>
  );
}
