/** ISO datetime → `YYYY-MM-DD` for <input type="date"> and table display. */
export function toDateInput(iso) {
  return iso ? String(iso).slice(0, 10) : '';
}

/** Human-friendly date; falls back to an em dash when missing. */
export function formatDate(iso) {
  return iso ? String(iso).slice(0, 10) : '—';
}
