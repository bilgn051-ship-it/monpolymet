import { useRef, useState } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Image,
  NumberInput,
  PasswordInput,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import LocalizedInput from '../LocalizedInput';
import { getPath, blankObject } from './resourceUtils';
import { api } from '../../api/client';
import { t } from '../../i18n';

/** Renders a single form field from its config at the given dot-path. */
export function FormField({ form, field, path }) {
  switch (field.type) {
    case 'localized':
      return (
        <LocalizedInput form={form} base={path} label={field.label} required={field.required} />
      );
    case 'localizedArea':
      return (
        <LocalizedInput
          form={form}
          base={path}
          label={field.label}
          textarea
          minRows={field.minRows ?? 3}
          required={field.required}
        />
      );
    case 'select':
      return (
        <Select
          label={field.label}
          data={field.options}
          withAsterisk={field.required}
          allowDeselect={!field.required}
          {...form.getInputProps(path)}
        />
      );
    case 'switch':
      return (
        <Switch
          label={field.label}
          mt="xs"
          {...form.getInputProps(path, { type: 'checkbox' })}
        />
      );
    case 'number':
      return (
        <NumberInput label={field.label} {...form.getInputProps(path)} />
      );
    case 'password':
      return (
        <PasswordInput
          label={field.label}
          placeholder={field.placeholder}
          withAsterisk={field.required}
          {...form.getInputProps(path)}
        />
      );
    case 'image':
      return <ImageField form={form} field={field} path={path} />;
    case 'localizedList':
      return <LocalizedListField form={form} field={field} path={path} />;
    case 'objectList':
      return <ObjectListField form={form} field={field} path={path} />;
    case 'group':
      return (
        <Card withBorder padding="sm" radius="md">
          <Text fw={600} size="sm" mb="xs">
            {field.label}
          </Text>
          <Stack gap="sm">
            {field.fields.map((sub) => (
              <FormField
                key={sub.name}
                form={form}
                field={sub}
                path={`${path}.${sub.name}`}
              />
            ))}
          </Stack>
        </Card>
      );
    default:
      return (
        <TextInput
          label={field.label}
          placeholder={field.placeholder}
          withAsterisk={field.required}
          {...form.getInputProps(path)}
        />
      );
  }
}

/** Image field: upload a file (stored on the API) or paste a URL. */
function ImageField({ form, field, path }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const value = getPath(form.values, path) ?? '';

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await api.upload('/uploads', data);
      form.setFieldValue(path, res.url);
    } catch (err) {
      setError(err.message || t.toast.saveError);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <Stack gap={6}>
      <Text component="label" size="sm" fw={500}>
        {field.label}
        {field.required && (
          <Text span c="red">
            {' '}
            *
          </Text>
        )}
      </Text>

      {value && (
        <Card withBorder padding="xs" radius="md">
          <Group justify="space-between" wrap="nowrap">
            <Image
              src={value}
              alt={field.label}
              h={72}
              w={72}
              fit="cover"
              radius="sm"
              fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            />
            <ActionIcon
              color="red"
              variant="subtle"
              aria-label={t.common.delete}
              onClick={() => form.setFieldValue(path, '')}
            >
              <X size={16} />
            </ActionIcon>
          </Group>
        </Card>
      )}

      <Group gap="xs">
        <Button
          variant="light"
          size="xs"
          leftSection={<Upload size={14} />}
          loading={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {value ? 'Зураг солих' : 'Зураг оруулах'}
        </Button>
      </Group>

      <TextInput
        size="xs"
        placeholder="эсвэл https://... холбоос оруулах"
        {...form.getInputProps(path)}
      />

      {error && (
        <Text size="xs" c="red">
          {error}
        </Text>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />
    </Stack>
  );
}

/** Repeatable list of bilingual strings (e.g. HSE policies, sector highlights). */
function LocalizedListField({ form, field, path }) {
  const items = getPath(form.values, path) ?? [];
  return (
    <Card withBorder padding="sm" radius="md">
      <Group justify="space-between" mb="xs">
        <Text fw={600} size="sm">
          {field.label}
        </Text>
        <Button
          size="compact-xs"
          variant="light"
          leftSection={<Plus size={14} />}
          onClick={() => form.insertListItem(path, { mn: '', en: '' })}
        >
          {t.common.add}
        </Button>
      </Group>
      <Stack gap="xs">
        {items.length === 0 && (
          <Text size="xs" c="dimmed">
            {t.common.none}
          </Text>
        )}
        {items.map((_, i) => (
          <Group key={i} align="flex-end" wrap="nowrap" gap="xs">
            <TextInput
              size="xs"
              placeholder={t.common.mn}
              style={{ flex: 1 }}
              {...form.getInputProps(`${path}.${i}.mn`)}
            />
            <TextInput
              size="xs"
              placeholder={t.common.en}
              style={{ flex: 1 }}
              {...form.getInputProps(`${path}.${i}.en`)}
            />
            <ActionIcon
              color="red"
              variant="subtle"
              onClick={() => form.removeListItem(path, i)}
            >
              <Trash2 size={15} />
            </ActionIcon>
          </Group>
        ))}
      </Stack>
    </Card>
  );
}

/** Repeatable list of structured objects (e.g. sector metrics, CTAs, steps). */
function ObjectListField({ form, field, path }) {
  const items = getPath(form.values, path) ?? [];
  return (
    <Card withBorder padding="sm" radius="md">
      <Group justify="space-between" mb="xs">
        <Text fw={600} size="sm">
          {field.label}
        </Text>
        <Button
          size="compact-xs"
          variant="light"
          leftSection={<Plus size={14} />}
          onClick={() => form.insertListItem(path, blankObject(field.fields))}
        >
          {t.common.add}
        </Button>
      </Group>
      <Stack gap="sm">
        {items.length === 0 && (
          <Text size="xs" c="dimmed">
            {t.common.none}
          </Text>
        )}
        {items.map((_, i) => (
          <Card key={i} withBorder padding="xs" radius="sm" bg="var(--mantine-color-gray-0)">
            <Group justify="flex-end" mb={4}>
              <ActionIcon
                color="red"
                variant="subtle"
                size="sm"
                onClick={() => form.removeListItem(path, i)}
              >
                <Trash2 size={14} />
              </ActionIcon>
            </Group>
            <Stack gap="xs">
              {field.fields.map((sub) => (
                <FormField
                  key={sub.name}
                  form={form}
                  field={sub}
                  path={`${path}.${i}.${sub.name}`}
                />
              ))}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Card>
  );
}
