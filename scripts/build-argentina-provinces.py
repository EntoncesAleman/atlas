#!/usr/bin/env python3
"""
Genera src/app/lib/geo/argentinaProvinces.js a partir de la geometria oficial
de provincias de Argentina (fuente: IGN, servida via georef-ar-api).

Fuente: https://apis.datos.gob.ar/georef/api/provincias.geojson?campos=geometria
  (API oficial del Estado argentino — apis.datos.gob.ar/georef —, cuyos datos de
  "geometria" declaran fuente=IGN en cada feature del GeoJSON de respuesta)

Metodo:
  1. Descarga el GeoJSON completo (23 provincias + CABA, poligonos reales).
  2. Filtra el MultiPolygon de "Tierra del Fuego, Antartida e Islas del Atlantico
     Sur" para quedarse solo con Isla Grande de Tierra del Fuego + Isla de los
     Estados (bbox continental), excluyendo Antartida y los archipielagos del
     Atlantico Sur (Malvinas, Georgias, Sandwich) — geometrias reales pero muy
     alejadas/fuera de escala para un selector de zona de cultivo continental.
  3. Proyecta lon/lat a un plano con una conica equivalente de Albers ajustada
     a Argentina (paralelos estandar -28/-52, meridiano central -65) — Argentina
     es un pais largo en direccion norte-sur, y una proyeccion equirrectangular
     simple distorsiona visiblemente las provincias del norte contra las del sur.
  4. Simplifica cada anillo con Douglas-Peucker (tolerancia ~2.5km en el plano
     proyectado) para reducir el numero de puntos sin deformar los limites de
     forma perceptible.
  5. Reescala a un viewBox SVG y emite un modulo JS con, por provincia:
     id interno, nombre oficial, atributo `d` de <path>, centroide y bbox
     (en coordenadas SVG).

Re-ejecutar: `python3 scripts/build-argentina-provinces.py`
Requiere solo la libreria estandar de Python 3 (sin dependencias externas).
"""
import json
import math
import subprocess
import sys

SOURCE_URL = 'https://apis.datos.gob.ar/georef/api/provincias.geojson?campos=geometria'
OUTPUT_PATH = 'src/app/lib/geo/argentinaProvinces.js'

NAME_TO_ID = {
    'Ciudad Autónoma de Buenos Aires': 'caba',
    'Buenos Aires': 'buenos-aires',
    'Catamarca': 'catamarca',
    'Chaco': 'chaco',
    'Chubut': 'chubut',
    'Córdoba': 'cordoba',
    'Corrientes': 'corrientes',
    'Entre Ríos': 'entrerios',
    'Formosa': 'formosa',
    'Jujuy': 'jujuy',
    'La Pampa': 'lapampa',
    'La Rioja': 'larioja',
    'Mendoza': 'mendoza',
    'Misiones': 'misiones',
    'Neuquén': 'neuquen',
    'Río Negro': 'rionegro',
    'Salta': 'salta',
    'San Juan': 'sanjuan',
    'San Luis': 'sanluis',
    'Santa Cruz': 'santacruz',
    'Santa Fe': 'santafe',
    'Santiago del Estero': 'santiagodelestero',
    'Tucumán': 'tucuman',
    'Tierra del Fuego, Antártida e Islas del Atlántico Sur': 'tierradelfuego',
}

DISPLAY_ORDER = [
    'jujuy', 'salta', 'formosa', 'chaco', 'misiones', 'corrientes', 'tucuman',
    'catamarca', 'santiagodelestero', 'larioja', 'cordoba', 'santafe',
    'entrerios', 'sanjuan', 'mendoza', 'sanluis', 'buenos-aires', 'caba',
    'lapampa', 'neuquen', 'rionegro', 'chubut', 'santacruz', 'tierradelfuego',
]

TDF_BBOX = (-69.2, -55.6, -63.3, -52.2)  # lon_min, lat_min, lon_max, lat_max

PHI1 = math.radians(-28.0)
PHI2 = math.radians(-52.0)
PHI0 = math.radians(-41.0)
LAMBDA0 = math.radians(-65.0)
R = 6371000.0
TOL_METERS = 2500
VIEW_W = 620


def fetch_geojson():
    # curl (no problemas de certificados como el urllib de este entorno Python)
    result = subprocess.run(['curl', '-sL', '--max-time', '30', SOURCE_URL], capture_output=True, check=True)
    return json.loads(result.stdout)


def filter_tierra_del_fuego(polys):
    lon_min, lat_min, lon_max, lat_max = TDF_BBOX
    kept = []
    for poly in polys:
        xs = [pt[0] for ring in poly for pt in ring]
        ys = [pt[1] for ring in poly for pt in ring]
        if min(xs) >= lon_min and max(xs) <= lon_max and min(ys) >= lat_min and max(ys) <= lat_max:
            kept.append(poly)
    return kept


n = (math.sin(PHI1) + math.sin(PHI2)) / 2.0
C = math.cos(PHI1) ** 2 + 2 * n * math.sin(PHI1)
rho0 = (R / n) * math.sqrt(C - 2 * n * math.sin(PHI0))


def project(lon, lat):
    phi = math.radians(lat)
    lam = math.radians(lon)
    rho = (R / n) * math.sqrt(C - 2 * n * math.sin(phi))
    theta = n * (lam - LAMBDA0)
    return rho * math.sin(theta), rho0 - rho * math.cos(theta)


def dp_simplify(points, tol):
    if len(points) < 3:
        return points

    def perp_dist(pt, a, b):
        (x, y), (ax, ay), (bx, by) = pt, a, b
        dx, dy = bx - ax, by - ay
        if dx == 0 and dy == 0:
            return math.hypot(x - ax, y - ay)
        t = max(0, min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)))
        return math.hypot(x - (ax + t * dx), y - (ay + t * dy))

    def rdp(pts):
        if len(pts) < 3:
            return pts
        a, b = pts[0], pts[-1]
        max_d, idx = 0, -1
        for i in range(1, len(pts) - 1):
            dist = perp_dist(pts[i], a, b)
            if dist > max_d:
                max_d, idx = dist, i
        if max_d > tol:
            left = rdp(pts[:idx + 1])
            right = rdp(pts[idx:])
            return left[:-1] + right
        return [a, b]

    return rdp(points)


def main():
    print(f'Descargando geometria oficial desde {SOURCE_URL} ...', file=sys.stderr)
    data = fetch_geojson()
    feats = data['features']
    print(f'{len(feats)} features recibidas.', file=sys.stderr)

    for f in feats:
        if f['properties']['id'] == '94':
            before = len(f['geometry']['coordinates'])
            f['geometry']['coordinates'] = filter_tierra_del_fuego(f['geometry']['coordinates'])
            after = len(f['geometry']['coordinates'])
            print(f'Tierra del Fuego: {before} poligonos -> {after} '
                  f'(se excluyen Antartida/Malvinas/Georgias/Sandwich, fuera de escala continental)',
                  file=sys.stderr)

    processed = []
    for f in feats:
        props = f['properties']
        name = props['nombre']
        internal_id = NAME_TO_ID.get(name)
        if not internal_id:
            print(f'ADVERTENCIA: provincia sin mapear a ID interno: {name}', file=sys.stderr)
            continue
        geom = f['geometry']
        polys = geom['coordinates'] if geom['type'] == 'MultiPolygon' else [geom['coordinates']]
        proj_polys = []
        for poly in polys:
            proj_rings = []
            for ring in poly:
                proj_ring = [project(lon, lat) for lon, lat in ring]
                simplified = dp_simplify(proj_ring, TOL_METERS)
                if len(simplified) >= 4:
                    proj_rings.append(simplified)
            if proj_rings:
                proj_polys.append(proj_rings)
        processed.append({'id': internal_id, 'name': name, 'polys': proj_polys})

    all_x = [x for p in processed for poly in p['polys'] for ring in poly for (x, y) in ring]
    all_y = [y for p in processed for poly in p['polys'] for ring in poly for (x, y) in ring]
    min_x, max_x = min(all_x), max(all_x)
    min_y, max_y = min(all_y), max(all_y)
    pad_x, pad_y = (max_x - min_x) * 0.03, (max_y - min_y) * 0.03
    min_x, max_x = min_x - pad_x, max_x + pad_x
    min_y, max_y = min_y - pad_y, max_y + pad_y
    view_h = VIEW_W * (max_y - min_y) / (max_x - min_x)

    def to_svg(x, y):
        sx = (x - min_x) / (max_x - min_x) * VIEW_W
        sy = view_h - (y - min_y) / (max_y - min_y) * view_h
        return round(sx, 2), round(sy, 2)

    out_provinces = []
    total_pts = 0
    for p in processed:
        subpaths, xs_all, ys_all = [], [], []
        for poly in p['polys']:
            for ring in poly:
                svg_pts = [to_svg(x, y) for (x, y) in ring]
                total_pts += len(svg_pts)
                xs_all += [pt[0] for pt in svg_pts]
                ys_all += [pt[1] for pt in svg_pts]
                subpaths.append('M' + ' L'.join(f'{x},{y}' for x, y in svg_pts) + ' Z')
        out_provinces.append({
            'id': p['id'],
            'name': p['name'],
            'd': ' '.join(subpaths),
            'centroid': [round(sum(xs_all) / len(xs_all), 1), round(sum(ys_all) / len(ys_all), 1)],
            'bbox': [round(min(xs_all), 1), round(min(ys_all), 1), round(max(xs_all), 1), round(max(ys_all), 1)],
        })

    out_provinces.sort(key=lambda p: DISPLAY_ORDER.index(p['id']) if p['id'] in DISPLAY_ORDER else 99)

    print(f'Total de puntos SVG tras simplificar: {total_pts}', file=sys.stderr)
    print(f'viewBox: 0 0 {VIEW_W} {round(view_h, 1)}', file=sys.stderr)

    js_lines = [
        '// Geometria real de las 23 provincias argentinas + CABA.',
        '// GENERADO por scripts/build-argentina-provinces.py — no editar a mano.',
        f'// Fuente: {SOURCE_URL}',
        '// (georef-ar-api, apis.datos.gob.ar — cada feature declara fuente=IGN)',
        '// Proyeccion: conica equivalente de Albers ajustada a Argentina',
        '// (paralelos estandar -28/-52, meridiano central -65).',
        '// Tierra del Fuego se filtra a Isla Grande + Isla de los Estados',
        '// (se excluyen Antartida y los archipielagos del Atlantico Sur).',
        '',
        f'export const ARGENTINA_MAP_VIEWBOX = "0 0 {VIEW_W} {round(view_h, 1)}";',
        f'export const ARGENTINA_MAP_WIDTH = {VIEW_W};',
        f'export const ARGENTINA_MAP_HEIGHT = {round(view_h, 1)};',
        '',
        'export const ARGENTINA_PROVINCES = [',
    ]
    for p in out_provinces:
        js_lines.append('  {')
        js_lines.append(f'    id: {json.dumps(p["id"], ensure_ascii=False)},')
        js_lines.append(f'    name: {json.dumps(p["name"], ensure_ascii=False)},')
        js_lines.append(f'    d: {json.dumps(p["d"], ensure_ascii=False)},')
        js_lines.append(f'    centroid: {json.dumps(p["centroid"], ensure_ascii=False)},')
        js_lines.append(f'    bbox: {json.dumps(p["bbox"], ensure_ascii=False)},')
        js_lines.append('  },')
    js_lines.append('];')
    js_lines.append('')

    with open(OUTPUT_PATH, 'w') as fh:
        fh.write('\n'.join(js_lines))

    print(f'Escrito {OUTPUT_PATH} con {len(out_provinces)} provincias.', file=sys.stderr)


if __name__ == '__main__':
    main()
