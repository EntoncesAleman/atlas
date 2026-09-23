// Set mínimo de íconos propios para el dashboard de Mi Cultivo — trazo simple, un solo color
// (`currentColor`, hereda del CSS), sin relleno decorativo. Reemplaza cualquier tentación de usar
// un set de íconos genérico de terceros o emoji/Unicode improvisado: son los únicos símbolos
// pictóricos nuevos que introduce el dashboard, y se mantienen deliberadamente austeros para no
// desentonar con el resto del Atlas (que hoy no usa iconografía decorativa, solo la flecha "↗").

const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

export function IconOverview(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </svg>
  );
}

export function IconPlant(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21V10" />
      <path d="M12 10C12 6 9 4 5 4c0 4 2.5 7 7 6Z" />
      <path d="M12 13C12 9.5 14.5 7.5 18 7.5c0 3.5-2 6-6 5.5Z" />
    </svg>
  );
}

export function IconJournal(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4h11l3 3v13H5Z" />
      <path d="M8 10h8M8 14h8M8 18h5" />
    </svg>
  );
}

export function IconEnvironment(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

export function IconSettings(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13a7.5 7.5 0 0 0 0-2l2-1.4-2-3.4-2.3.7a7.6 7.6 0 0 0-1.8-1l-.4-2.4H9.1l-.4 2.4a7.6 7.6 0 0 0-1.8 1l-2.3-.7-2 3.4L4.6 11a7.5 7.5 0 0 0 0 2l-2 1.4 2 3.4 2.3-.7a7.6 7.6 0 0 0 1.8 1l.4 2.4h5.8l.4-2.4a7.6 7.6 0 0 0 1.8-1l2.3.7 2-3.4Z" />
    </svg>
  );
}

export function IconThermometer(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0Z" />
    </svg>
  );
}

export function IconDroplet(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
    </svg>
  );
}

export function IconWind(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8h11a2.5 2.5 0 1 0-2.2-3.7" />
      <path d="M3 16h14a2.5 2.5 0 1 1-2.2 3.7" />
      <path d="M3 12h9a2 2 0 1 0-1.8-3" />
    </svg>
  );
}

export function IconAlert(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 2 20h20Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}

export function IconBell(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

export function IconLogout(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function IconPlus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconCamera(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4Z" />
      <circle cx="12" cy="13.5" r="3.2" />
    </svg>
  );
}

export function IconBook(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H12v16H5.5A1.5 1.5 0 0 1 4 18.5Z" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H12v16h6.5a1.5 1.5 0 0 0 1.5-1.5Z" />
    </svg>
  );
}

// Íconos de condición de cielo para el mini-calendario (mapean el `weather_code` WMO real que ya
// devuelve Open-Meteo — ver `lib/weather/wmoIcon.js` — nunca un dato inventado, solo una
// traducción visual del mismo código que ya se traduce a texto en `lib/weather/service.js`).

export function IconSun(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}

export function IconCloudSun(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5v1.6M4.6 8.4 5.8 9.4M2.6 12.8H4.2" />
      <circle cx="8" cy="9" r="2.4" />
      <path d="M9 20h7.5a3.5 3.5 0 0 0 .5-6.96A5 5 0 0 0 7.3 15.2 3 3 0 0 0 8 20Z" />
    </svg>
  );
}

export function IconCloud(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 19h10.5a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.5-2A4 4 0 0 0 7 19Z" />
    </svg>
  );
}

export function IconCloudRain(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 16h10a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.5-2A4 4 0 0 0 6.5 16Z" />
      <path d="M8 19v1.5M12 19v1.5M16 19v1.5" />
    </svg>
  );
}

export function IconCloudSnow(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 15h10a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.5-2A4 4 0 0 0 6.5 15Z" />
      <path d="M8 18.5v.01M12 19.5v.01M16 18.5v.01M8 21v.01M16 21v.01" />
    </svg>
  );
}

export function IconCloudLightning(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 14h10a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.5-2A4 4 0 0 0 6.5 14Z" />
      <path d="M13 15.5 10.5 19h2.5l-1.5 3.5" />
    </svg>
  );
}

export function IconFog(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 12h10M5 15h14M7 18h10" />
      <path d="M8 9a4 4 0 0 1 7.5-2" />
    </svg>
  );
}

export function IconChevronRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
