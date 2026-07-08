import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Drawer,
  Group,
  Stack,
  Switch,
  Table,
  Text,
  Popover,
  TextInput,
  Select,
  Divider,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Pencil, Plus, Trash2, Filter, Search, RotateCcw } from 'lucide-react';
import { api } from '../../api/client';
import { useCollection } from '../../lib/useCollection';
import PageHeader from '../../components/PageHeader';
import DataState from '../../components/DataState';
import LocalizedInput from '../../components/LocalizedInput';
import { t } from '../../i18n';

const EMPTY = {
  title: { mn: '', en: '' },
  category: { mn: '', en: '' },
  location: { mn: '', en: '' },
  employmentType: { mn: '', en: '' },
  description: { mn: '', en: '' },
  isOpen: true,
};

const localizedRule = {
  mn: isNotEmpty(t.common.requiredField),
  en: isNotEmpty(t.common.requiredField),
};

export default function JobsPage() {
  const { items, loading, error, reload } = useCollection('/jobs');
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const form = useForm({
    initialValues: EMPTY,
    validate: {
      title: localizedRule,
      category: localizedRule,
      location: localizedRule,
      employmentType: localizedRule,
      description: localizedRule,
    },
  });

  const openCreate = () => {
    setEditing(null);
    form.setValues(EMPTY);
    form.resetDirty(EMPTY);
    open();
  };

  const openEdit = (item) => {
    setEditing(item);
    form.setValues({
      title: { mn: item.title?.mn ?? '', en: item.title?.en ?? '' },
      category: { mn: item.category?.mn ?? '', en: item.category?.en ?? '' },
      location: { mn: item.location?.mn ?? '', en: item.location?.en ?? '' },
      employmentType: {
        mn: item.employmentType?.mn ?? '',
        en: item.employmentType?.en ?? '',
      },
      description: {
        mn: item.description?.mn ?? '',
        en: item.description?.en ?? '',
      },
      isOpen: item.isOpen ?? true,
    });
    open();
  };

  const submit = async (values) => {
    setSaving(true);
    try {
      if (editing) await api.patch(`/jobs/${editing._id}`, values);
      else await api.post('/jobs', values);
      notifications.show({
        color: 'green',
        message: editing ? t.toast.updated : t.toast.created,
      });
      close();
      reload();
    } catch (err) {
      notifications.show({
        color: 'red',
        title: t.toast.saveError,
        message: err.message,
      });
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
          await api.delete(`/jobs/${item._id}`);
          notifications.show({ color: 'green', message: t.toast.deleted });
          reload();
        } catch (err) {
          notifications.show({
            color: 'red',
            title: t.toast.saveError,
            message: err.message,
          });
        }
      },
    });

  const filteredItems = (items || []).filter((item) => {
    if (filterStatus === 'active') {
      if (item.isOpen !== true) return false;
    } else if (filterStatus === 'inactive') {
      if (item.isOpen !== false) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const titleMatch = item.title?.mn?.toLowerCase().includes(q) || item.title?.en?.toLowerCase().includes(q);
      const categoryMatch = item.category?.mn?.toLowerCase().includes(q) || item.category?.en?.toLowerCase().includes(q);
      const locationMatch = item.location?.mn?.toLowerCase().includes(q) || item.location?.en?.toLowerCase().includes(q);
      const descMatch = item.description?.mn?.toLowerCase().includes(q) || item.description?.en?.toLowerCase().includes(q);

      if (!titleMatch && !categoryMatch && !locationMatch && !descMatch) {
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
            placeholder="Гарчиг, салбараар хайх..."
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
        title={t.jobs.title}
        subtitle={t.jobs.subtitle}
        hideTitle={true}
        filterArea={filterArea}
        action={
          <Button leftSection={<Plus size={16} />} onClick={openCreate}>
            {t.jobs.add}
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
                  <Table.Th>{t.jobs.colTitle}</Table.Th>
                  <Table.Th>{t.jobs.colCategory}</Table.Th>
                  <Table.Th>{t.jobs.colLocation}</Table.Th>
                  <Table.Th>{t.jobs.colStatus}</Table.Th>
                  <Table.Th w={100} ta="right">
                    {t.common.actions}
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredItems.map((item) => (
                  <Table.Tr key={item._id}>
                    <Table.Td maw={280}>
                      <Text fw={600} size="sm">
                        {item.title?.mn}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {item.title?.en}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light">{item.category?.mn}</Badge>
                    </Table.Td>
                    <Table.Td>{item.location?.mn}</Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={item.isOpen ? 'teal' : 'gray'}>
                        {item.isOpen ? t.common.open : t.common.closed}
                      </Badge>
                    </Table.Td>
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
        title={editing ? t.jobs.editTitle : t.jobs.createTitle}
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
            <LocalizedInput form={form} base="title" label={t.jobs.fTitle} required />
            <LocalizedInput
              form={form}
              base="category"
              label={t.jobs.fCategory}
              required
            />
            <LocalizedInput
              form={form}
              base="location"
              label={t.jobs.fLocation}
              required
            />
            <LocalizedInput
              form={form}
              base="employmentType"
              label={t.jobs.fType}
              required
            />
            <LocalizedInput
              form={form}
              base="description"
              label={t.jobs.fDescription}
              required
              textarea
              minRows={4}
            />
            <Switch
              label={t.jobs.fOpen}
              {...form.getInputProps('isOpen', { type: 'checkbox' })}
            />
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
