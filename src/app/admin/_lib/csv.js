// CSV mínimo, sin dependencias nuevas (XLSX quedaría para una fase futura si hace falta el
// formato .xlsx específicamente — CSV ya se abre directo en Excel/Sheets/Numbers). Escapa comillas
// dobles y envuelve en comillas cualquier valor con coma, comilla o salto de línea, que es lo que
// exige el formato CSV (RFC 4180) para no romper el parseo en la fila siguiente.
function escapeCsvValue(value) {
  const str = value === null || value === undefined ? '' : String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function toCsv(rows, columns) {
  const header = columns.map((col) => escapeCsvValue(col.label)).join(',');
  const lines = rows.map((row) => columns.map((col) => escapeCsvValue(col.value(row))).join(','));
  return [header, ...lines].join('\r\n');
}

export function csvResponse(csv, filename) {
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`
    }
  });
}
