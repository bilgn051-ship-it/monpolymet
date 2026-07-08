import { useState } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  Popover,
  TextInput,
  Select,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Pencil, Plus, Trash2, Filter, Search, RotateCcw } from 'lucide-react';
import { api } from '../../api/client';
import { useCollection } from '../../lib/useCollection';
import PageHeader from '../PageHeader';
import DataState from '../DataState';
import { FormField } from './ResourceFields';
import {
  blankObject,
  cleanPayload,
  firstMissingRequired,
  valuesFromItem,
} from './resourceUtils';
import { t } from '../../i18n';

/**
 * Generic list CRUD screen driven by a resource config
 * (`{ path, title, subtitle, columns, fields, ... }`). One component powers
 * every straightforward collection so each page is just a config object.
 */
export default function ResourcePage({ config }) {
  const { items, loading, error, reload } = useCollection(config.path);
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm({ initialValues: blankObject(config.fields) });

  const openCreate = () => {
    setEditing(null);
    form.setValues(blankObject(config.fields));
    open();
  };

  const openEdit = (item) => {
    setEditing(item);
    form.setValues(valuesFromItem(config.fields, item));
    open();
  };

  const submit = async (values) => {
    const missing = firstMissingRequired(config.fields, values);
    if (missing) {
      notifications.show({
        color: 'red',
        message: `${missing} — ${t.common.requiredField}`,
      });
      return;
    }
    setSaving(true);
    const payload = cleanPayload(config.fields, values);
    try {
      if (editing) await api.patch(`${config.path}/${editing._id}`, payload);
      else await api.post(config.path, payload);
      notifications.show({
        color: 'green',
        message: editing ? t.toast.updated : t.toast.created,
      });
      close();
      reload();
    } catch (err) {
      notifications.show({ color: 'red', title: t.toast.saveError, message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (item) =>
    modals.openConfirmModal({
      title: t.common.confirmDeleteTitle,
      children: <Text size="sm">{t.common.confirmDeleteBody}</Text>,
      labels: { confirm: t.common.delete, cancel: t.common.cancel },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await api.delete(`${config.path}/${item._id}`);
          notifications.show({ color: 'green', message: t.toast.deleted });
          reload();
        } catch (err) {
          notifications.show({ color: 'red', title: t.toast.saveError, message: err.message });
        }
      },
    });

  const filteredItems = (items || []).filter((item) => {
    if (filterStatus === 'active') {
      const active = item.isActive ?? item.isOpen ?? item.isPublished;
      if (active !== true) return false;
    } else if (filterStatus === 'inactive') {
      const active = item.isActive ?? item.isOpen ?? item.isPublished;
      if (active !== false) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const titleMatch = item.title?.mn?.toLowerCase().includes(q) || item.title?.en?.toLowerCase().includes(q) || item.title?.toLowerCase?.().includes(q);
      const nameMatch = item.name?.mn?.toLowerCase().includes(q) || item.name?.en?.toLowerCase().includes(q) || item.name?.toLowerCase?.().includes(q) || item.name?.toString().toLowerCase().includes(q);
      const subtitleMatch = item.subtitle?.mn?.toLowerCase().includes(q) || item.subtitle?.en?.toLowerCase().includes(q) || item.subtitle?.toLowerCase?.().includes(q);
      const descMatch = item.description?.mn?.toLowerCase().includes(q) || item.description?.en?.toLowerCase().includes(q) || item.description?.toLowerCase?.().includes(q);

      if (!titleMatch && !nameMatch && !subtitleMatch && !descMatch) {
        return false;
      }
    }
    return true;
  });

  const filterArea = (
    <Popover width={300} position="bottom-start" withArrow shadow="md" trapFocus>
      <Popover.Target>
        <Button
          variant="light"
          leftSection={<Filter size={16} />}
          color="brand"
        >
          Шүүлтүүр
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Stack gap="sm">
          <Text size="sm" fw={700}>Хайлт болон шүүлтүүр</Text>

          <TextInput
            label="Хайх утга"
            placeholder="Гарчиг, нэрээр хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<Search size={14} />}
          />

          <Select
            label="Төлөв"
            placeholder="Төлвөөр шүүх"
            value={filterStatus}
            onChange={setFilterStatus}
            data={[
              { value: 'all', label: 'Бүгд' },
              { value: 'active', label: 'Идэвхтэй / Нээлттэй' },
              { value: 'inactive', label: 'Идэвхгүй / Хаалттай' }
            ]}
            allowDeselect={false}
          />

          {(searchQuery || filterStatus !== 'all') && (
            <>
              <Divider />
              <Button
                variant="subtle"
                color="gray"
                size="xs"
                leftSection={<RotateCcw size={14} />}
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                }}
              >
                Шүүлтүүр цэвэрлэх
              </Button>
            </>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );

  return (
    <>
      <PageHeader
        title={config.title}
        subtitle={config.subtitle}
        hideTitle={true}
        filterArea={filterArea}
        action={
          <Button leftSection={<Plus size={16} />} onClick={openCreate}>
            {config.addLabel ?? t.common.add}
          </Button>
        }
      />

      <Card withBorder radius="md" padding={0}>
        <DataState
          loading={loading}
          error={error}
          empty={filteredItems.length === 0}
          onRetry={reload}
        >
          <Table.ScrollContainer minWidth={640}>
            <Table striped highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  {config.columns.map((c) => (
                    <Table.Th key={c.label}>{c.label}</Table.Th>
                  ))}
                  <Table.Th w={100} ta="right">
                    {t.common.actions}
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredItems.map((item) => (
                  <Table.Tr key={item._id}>
                    {config.columns.map((c) => (
                      <Table.Td key={c.label}>{c.render(item)}</Table.Td>
                    ))}
                    <Table.Td>
                      <Group gap={4} justify="flex-end" wrap="nowrap">
                        <ActionIcon
                          variant="subtle"
                          onClick={() => openEdit(item)}
                          aria-label={t.common.edit}
                        >
                          <Pencil size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => confirmDelete(item)}
                          aria-label={t.common.delete}
                        >
                          <Trash2 size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </DataState>
      </Card>

      <Drawer
        opened={opened}
        onClose={close}
        title={editing ? (config.editLabel ?? t.common.edit) : (config.createLabel ?? t.common.create)}
        position="right"
        size="lg"
        styles={{
          content: {
            borderRadius: '12px',
          },
          inner: {
            padding: '10px',
          }
        }}
      >
        <form onSubmit={form.onSubmit(submit)}>
          <Stack gap="md">
            {config.fields.map((field) => (
              <FormField key={field.name} form={form} field={field} path={field.name} />
            ))}
            <Group justify="flex-end" mt="sm">
              <Button variant="default" onClick={close}>
                {t.common.cancel}
              </Button>
              <Button type="submit" loading={saving}>
                {t.common.save}
              </Button>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  );
}
