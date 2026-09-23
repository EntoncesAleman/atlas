'use client';

// Mini-calendario de "Diario y bitácora": reemplaza la lectura puramente lineal de eventos por
// una vista de mes, con dos capas de información real, nunca inventada:
// - un punto en los días que ya tienen al menos un evento registrado (`events`, lo mismo que ya
//   lista "Línea temporal" más abajo — este calendario no duplica esa lógica de datos, solo la
//   visualiza distinto);
// - un ícono de cielo en hoy y los próximos días con pronóstico real disponible (`forecast`, el
//   mismo `weather_code` WMO que ya devuelve Open-Meteo — ver `lib/weather/wmoIcon.js`). Un día
//   sin pronóstico (fuera de la ventana de 7 días, o pasado) simplemente no lleva ícono: nunca se
//   inventa una condición de cielo para un día sin dato real.

import { useState } from 'react';
import { weatherIconCategory } from '../lib/weather/wmoIcon';
import { IconSun, IconCloudSun, IconCloud, IconCloudRain, IconCloudSnow, IconCloudLightning, IconFog } from './icons/DashboardIcons';

const WEEKDAY_LABELS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
const MONTH_LABELS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const WEATHER_ICONS = {
  clear: IconSun,
  partly: IconCloudSun,
  cloudy: IconCloud,
  fog: IconFog,
  rain: IconCloudRain,
  snow: IconCloudSnow,
  storm: IconCloudLightning,
};

function toISODate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function MiniCalendar({ events, forecast }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const eventDates = new Set(events.map((event) => event.date));
  const forecastByDate = new Map((forecast ?? []).map((day) => [day.date, day]));
  const todayISO = toISODate(today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Lunes = 0 (el calendario argentino empieza la semana en lunes, no en domingo).
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;

  const cells = [];
  for (let i = 0; i < leadingBlanks; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);

  function goToMonth(offset) {
    setViewDate(new Date(year, month + offset, 1));
  }

  return (
    <div className="mini-calendar">
      <div className="mini-calendar-head">
        <button type="button" className="mini-calendar-nav" onClick={() => goToMonth(-1)} aria-label="Mes anterior">‹</button>
        <span className="mini-calendar-title">{MONTH_LABELS[month]} {year}</span>
        <button type="button" className="mini-calendar-nav" onClick={() => goToMonth(1)} aria-label="Mes siguiente">›</button>
      </div>

      <div className="mini-calendar-weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      <div className="mini-calendar-grid">
        {cells.map((day, index) => {
          if (day === null) return <span key={`blank-${index}`} className="mini-calendar-cell mini-calendar-cell-blank" />;

          const dateISO = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const hasEvent = eventDates.has(dateISO);
          const dayForecast = forecastByDate.get(dateISO);
          const WeatherIcon = dayForecast ? WEATHER_ICONS[weatherIconCategory(dayForecast.weatherCode)] : null;
          const isToday = dateISO === todayISO;

          return (
            <span
              key={dateISO}
              className={`mini-calendar-cell ${isToday ? 'mini-calendar-cell-today' : ''}`}
              title={dayForecast?.weatherLabel ?? undefined}
            >
              <span className="mini-calendar-daynum">{day}</span>
              {WeatherIcon && <WeatherIcon className="mini-calendar-weather-icon" width={13} height={13} />}
              {hasEvent && <span className="mini-calendar-event-dot" aria-label="Evento registrado" />}
            </span>
          );
        })}
      </div>

      <p className="atlas-section-note mini-calendar-legend">
        <span className="mini-calendar-event-dot" aria-hidden="true" /> día con evento registrado
        {forecast?.length > 0 && <> · ícono de clima: pronóstico real de Open-Meteo para hoy y los próximos días</>}
      </p>
    </div>
  );
}
