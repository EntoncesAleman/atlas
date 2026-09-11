# 08 — Arquitectura

## Diagrama lógico
```
                        ┌─────────────────────┐
                        │      FRONTEND        │
                        │ (contenido público    │
                        │  SSR/SSG + app         │
                        │  autenticada)          │
                        └──────────┬───────────┘
                                   │
                        ┌──────────▼───────────┐
                        │     API / BACKEND     │
                        │ (rutas de servidor,    │
                        │  autorización,         │
                        │  orquestación)         │
                        └─┬────┬────┬────┬────┬─┘
                          │    │    │    │    │
              ┌───────────┘    │    │    │    └───────────┐
              │                │    │    │                │
        ┌─────▼─────┐   ┌──────▼──┐ │ ┌──▼─────┐   ┌───────▼──────┐
        │ DATABASE   │   │  AUTH   │ │ │ STORAGE│   │ MAP SERVICE  │
        │ (Postgres) │   │         │ │ │ (fotos)│   │ (MapLibre +  │
        └────────────┘   └─────────┘ │ └────────┘   │  GeoJSON     │
                                      │              │  estático)   │
                                ┌─────▼──────┐       └──────────────┘
                                │  WEATHER   │
                                │  SERVICE   │
                                │ (Open-Meteo│
                                │  proxy)    │
                                └────────────┘

        ┌────────────┐   ┌────────────┐   ┌────────────┐
        │   SEARCH   │   │ CRON/JOBS  │   │   EMAIL    │
        │ (full-text │   │ (alertas,  │   │  SERVICE   │
        │  DB nativo)│   │  revisión  │   │            │
        │            │   │  contenido)│   │            │
        └────────────┘   └────────────┘   └────────────┘

        ┌────────────┐   ┌────────────┐
        │ ANALYTICS  │   │ MONITORING │
        │ (privacy-  │   │            │
        │  first)    │   │            │
        └────────────┘   └────────────┘
```

## Relaciones y responsabilidades

- **Frontend**: dos superficies dentro del mismo proyecto — (a) páginas públicas renderizadas en servidor/estáticas (enciclopedia, zonas, comparador, clima) para indexabilidad ([[11_SEO]]); (b) app autenticada ("Mi Cultivo", perfil) que puede ser más dinámica/client-rendered porque no necesita SEO.
- **API/Backend**: única capa de autorización real. Todo acceso a datos privados pasa por acá, nunca directo del frontend a la base de datos. Aplica las reglas de ownership descriptas en [[09_SECURITY]].
- **Database**: fuente de verdad de todo el contenido público y privado (modelo en [[07_DATABASE]]).
- **Auth**: emite y valida sesión/identidad; el backend confía en su verificación, nunca en un `user_id` enviado directamente por el cliente.
- **Storage**: dos zonas lógicas separadas — pública (biblioteca visual editorial, [[06_VISUAL]]) y privada (fotos de cultivo, con URLs firmadas).
- **Map service**: no es un "servicio" en el sentido de backend propio — es la librería de mapas (MapLibre/Leaflet) en el frontend, alimentada por archivos GeoJSON estáticos (límites de provincia/zona) servidos como assets, sin necesidad de un backend de mapas dedicado.
- **Weather service**: capa fina en el backend que hace de **proxy** hacia Open-Meteo — nunca se llama al proveedor de clima directo desde el navegador, tanto por seguridad de claves (si en el futuro se suma un proveedor con API key) como para poder cachear respuestas por zona (evita repetir la misma consulta de clima por cada visitante de la misma zona).
- **CRON/Jobs**: procesos programados para (a) evaluar reglas de alerta meteorológica contra el pronóstico y disparar emails ([[04_CLIMATE]]), (b) recordatorios de revisión de contenido vencido ([[05_CONTENT]], fecha de última revisión).
- **Search**: búsqueda de texto completo nativa de la base de datos en v1 (ver [[13_STACK]]).
- **Email**: servicio separado del flujo transaccional vs. newsletter (ver [[18_EXTERNAL_SERVICES]]).
- **Analytics/Monitoring**: observabilidad del sitio, sin acoplarse al modelo de datos de usuario (no debe convertirse en una fuente paralela de tracking de identidad, coherente con [[10_PRIVACY]]).

## Principios de arquitectura
1. **El navegador nunca habla directo con un proveedor externo que requiera clave secreta.** Todo pasa por el backend como proxy (clima, email, storage con URLs firmadas emitidas por el backend).
2. **Contenido público y datos privados de usuario viven en el mismo motor de base de datos pero con aislamiento estricto de acceso** (no en instancias separadas por simplicidad operativa, pero con políticas de fila/ownership que hacen el aislamiento equivalente a tener sistemas separados desde el punto de vista de seguridad).
3. **Nada bloquea la lectura pública.** La disponibilidad de auth, storage privado o el motor de alertas no debe poder tumbar la lectura de la enciclopedia o el mapa — degradación aislada por servicio.
4. **El mapa es un dato estático, no un servicio con estado.** Los límites geográficos (GeoJSON) se sirven como archivos, no se consultan en vivo a un proveedor externo en cada carga.
