import { useState } from 'react';
import {
  SimpleGrid,
  Textarea,
  TextInput,
  Button,
  Group,
  Text,
  Box,
  SegmentedControl,
  Tabs,
  Badge,
  Paper
} from '@mantine/core';
import { Sparkles, Globe, Columns, Layers } from 'lucide-react';
import { t } from '../i18n';
import { translateMnToEn } from '../lib/aiTranslate';

/**
 * Enhanced Dual-Language Input component for MN + EN localization.
 * Features:
 * - Side-by-side (Side) OR Tabbed (MN | EN) view modes
 * - AI-powered Mongolian to English translation
 * - Character count badges
 */
export default function LocalizedInput({
  form,
  base,
  label,
  textarea = false,
  required = false,
  minRows = 4,
}) {
  const [viewMode, setViewMode] = useState('side'); // 'side' | 'tab'
  const [activeTab, setActiveTab] = useState('mn');
  const [translating, setTranslating] = useState(false);

  const Field = textarea ? Textarea : TextInput;
  const extra = textarea ? { autosize: true, minRows } : {};

  const mnVal = form.getInputProps(`${base}.mn`)?.value || '';
  const enVal = form.getInputProps(`${base}.en`)?.value || '';

  const handleAiTranslate = async () => {
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
    <Box mb="sm">
      {/* HEADER WITH CONTROLS */}
      <Group justify="space-between" align="center" mb={6}>
        <Group gap="xs">
          <Text size="xs" fw={700} c="#475569" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
          </Text>
        </Group>

        <Group gap="xs">
          <SegmentedControl
            value={viewMode}
            onChange={setViewMode}
            data={[
              { label: 'Зэрэгцээ', value: 'side' },
              { label: 'Табаар', value: 'tab' }
            ]}
            size="xs"
            radius="sm"
            color="blue"
          />

          <Button
            size="xs"
            variant="light"
            color="blue"
            leftSection={<Sparkles size={13} />}
            loading={translating}
            onClick={handleAiTranslate}
            style={{ height: '26px', fontSize: '11px', padding: '0 10px' }}
          >
            🤖 AI-р орчуулах
          </Button>
        </Group>
      </Group>

      {/* 🟢 MODE 1: SIDE-BY-SIDE VIEW */}
      {viewMode === 'side' ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
          <Box>
            <Group justify="space-between" mb={2}>
              <Text size="11px" fw={600} c="#64748b">
                {t.common.mn} (Монгол)
              </Text>
              <Text size="10px" c="dimmed">{mnVal.length} тэмдэгт</Text>
            </Group>
            <Field
              withAsterisk={required}
              placeholder="Монгол агуулга оруулна уу..."
              {...extra}
              {...form.getInputProps(`${base}.mn`)}
            />
          </Box>

          <Box>
            <Group justify="space-between" mb={2}>
              <Text size="11px" fw={600} c="#64748b">
                {t.common.en} (English)
              </Text>
              <Text size="10px" c="dimmed">{enVal.length} тэмдэгт</Text>
            </Group>
            <Field
              withAsterisk={required}
              placeholder="English content..."
              {...extra}
              {...form.getInputProps(`${base}.en`)}
            />
          </Box>
        </SimpleGrid>
      ) : (
        /* 🔵 MODE 2: TABBED VIEW */
        <Tabs value={activeTab} onChange={setActiveTab} variant="outline" radius="sm">
          <Tabs.List mb="xs">
            <Tabs.Tab value="mn" leftSection={<Globe size={14} />}>
              <Group gap={6}>
                <Text size="xs" fw={600}>Монгол (MN)</Text>
                <Badge size="xs" variant="light" color="blue">{mnVal.length}</Badge>
              </Group>
            </Tabs.Tab>

            <Tabs.Tab value="en" leftSection={<Globe size={14} />}>
              <Group gap={6}>
                <Text size="xs" fw={600}>English (EN)</Text>
                <Badge size="xs" variant="light" color="indigo">{enVal.length}</Badge>
              </Group>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="mn">
            <Field
              withAsterisk={required}
              placeholder="Монгол агуулга оруулах..."
              {...extra}
              {...form.getInputProps(`${base}.mn`)}
            />
          </Tabs.Panel>

          <Tabs.Panel value="en">
            <Field
              withAsterisk={required}
              placeholder="English content..."
              {...extra}
              {...form.getInputProps(`${base}.en`)}
            />
          </Tabs.Panel>
        </Tabs>
      )}
    </Box>
  );
}
