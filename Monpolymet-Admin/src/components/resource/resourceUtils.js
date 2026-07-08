/** Helpers for the config-driven resource engine (list pages + singletons). */

export function getPath(obj, path) {
  return path
    .split('.')
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

/** Default empty value for a field, by type. */
export function blankValue(field) {
  switch (field.type) {
    case 'localized':
    case 'localizedArea':
      return { mn: '', en: '' };
    case 'localizedList':
    case 'objectList':
      return [];
    case 'group':
      return blankObject(field.fields);
    case 'switch':
      return field.default ?? false;
    case 'number':
      return field.default ?? 0;
    case 'select':
      return field.default ?? field.options?.[0]?.value ?? '';
    default:
      return field.default ?? '';
  }
}

/** Fully-blank object for a set of fields (used as create-form defaults). */
export function blankObject(fields) {
  const out = {};
  for (const f of fields) out[f.name] = blankValue(f);
  return out;
}

/** Normalise an existing document into complete form values. */
export function valuesFromItem(fields, item) {
  const out = {};
  for (const f of fields) {
    const v = item?.[f.name];
    if (v === undefined || v === null) {
      out[f.name] = blankValue(f);
    } else if (f.type === 'localized' || f.type === 'localizedArea') {
      out[f.name] = { mn: v.mn ?? '', en: v.en ?? '' };
    } else if (f.type === 'group') {
      out[f.name] = valuesFromItem(f.fields, v);
    } else {
      out[f.name] = v;
    }
  }
  return out;
}

/** Returns the label of the first empty required field, or null if all filled. */
export function firstMissingRequired(fields, values) {
  for (const f of fields) {
    if (!f.required) continue;
    const v = values[f.name];
    if (f.type === 'localized' || f.type === 'localizedArea') {
      if (!v?.mn?.trim() || !v?.en?.trim()) return f.label;
    } else if (typeof v === 'string' && !v.trim()) {
      return f.label;
    }
  }
  return null;
}

/** Drops empty optional enum/select values so they don't fail schema validation. */
export function cleanPayload(fields, values) {
  const out = {};
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === 'select' && !f.required && (v === '' || v == null)) continue;
    out[f.name] = v;
  }
  return out;
}
