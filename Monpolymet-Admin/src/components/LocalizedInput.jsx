import { SimpleGrid, Textarea, TextInput } from '@mantine/core';
import { t } from '../i18n';

/**
 * A pair of Mongolian + English inputs bound to a nested form field
 * (e.g. base="title" drives `title.mn` and `title.en`). Set `textarea` for
 * long-form content.
 */
export default function LocalizedInput({
  form,
  base,
  label,
  textarea = false,
  required = false,
  minRows = 4,
}) {
  const Field = textarea ? Textarea : TextInput;
  const extra = textarea ? { autosize: true, minRows } : {};

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
      <Field
        label={`${label} · ${t.common.mn}`}
        withAsterisk={required}
        {...extra}
        {...form.getInputProps(`${base}.mn`)}
      />
      <Field
        label={`${label} · ${t.common.en}`}
        withAsterisk={required}
        {...extra}
        {...form.getInputProps(`${base}.en`)}
      />
    </SimpleGrid>
  );
}
