import { requireRole } from '../../../lib/auth/roles';
import { editorialCategories, editorialEntries } from '../../../lib/editorial/editorialData';
import { toCsv, csvResponse } from '../../_lib/csv';

export async function GET() {
  await requireRole('admin');
  const csv = toCsv(editorialEntries, [
    { label: 'id', value: (e) => e.id },
    { label: 'titulo', value: (e) => e.title },
    { label: 'categoria', value: (e) => editorialCategories.find((c) => c.id === e.categoryId)?.title ?? e.categoryId },
    { label: 'estado_editorial', value: (e) => e.editorialStatus },
    { label: 'fuentes', value: (e) => (e.sourceIds ?? []).length },
    { label: 'relacionadas', value: (e) => (e.relatedEntryIds ?? []).length },
    { label: 'ultima_revision', value: (e) => e.lastReviewed ?? '' }
  ]);
  return csvResponse(csv, `contenido-editorial-${new Date().toISOString().slice(0, 10)}.csv`);
}
