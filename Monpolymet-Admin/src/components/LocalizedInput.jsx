import { useState } from 'react';
import { SimpleGrid, Textarea, TextInput, Button, Group, Text, Box } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { t } from '../i18n';
import { translateMnToEn } from '../lib/aiTranslate';

/**
 * A pair of Mongolian + English inputs bound to a nested form field
 * (e.g. base="title" drives `title.mn` and `title.en`). Set `textarea` for
 * long-form content. Includes AI-powered auto-translation for English.
 */
export default function LocalizedInput({
  form,
  base,
  label,
  textarea = false,
  required = false,
  minRows = 4,
}) {
  const [translating, setTranslating] = useState(false);
  const Field = textarea ? Textarea : TextInput;
  const extra = textarea ? { autosize: true, minRows } : {};

  const handleAiTranslate = async () => {
    const mnProps = form.getInputProps(`${base}.mn`);
    const mnVal = mnProps?.value || form.values?.[base]?.mn || form.values?.[`${base}.mn`];
    if (!mnVal || !mnVal.trim()) return;

    setTranslating(true);
    try {
      const enTranslated = await translateMnToEn(mnVal);
      if (enTranslated) {
        form.setFieldValue(`${base}.en`, enTranslated);
      }
    } catch (err) {
      console.warn('Translation error:', err);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <Box mb="xs">
      <Group justify="space-between" align="center" mb={6}>
        <Text size="xs" fw={700} c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </Text>
        <Button
          size="xs"
          variant="light"
          color="blue"
          leftSection={<Sparkles size={13} />}
          loading={translating}
          onClick={handleAiTranslate}
          style={{ height: '24px', fontSize: '11px', padding: '0 10px' }}
        >
          🤖 AI-р орчуулах
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
        <Field
          label={`${t.common.mn}`}
          withAsterisk={required}
          {...extra}
          {...form.getInputProps(`${base}.mn`)}
        />
        <Field
          label={`${t.common.en}`}
          withAsterisk={required}
          {...extra}
          {...form.getInputProps(`${base}.en`)}
        />
      </SimpleGrid>
    </Box>
  );
}
