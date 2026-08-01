import { useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Drawer,
  Group,
  Stack,
  Table,
  Text,
  TextInput,
  Popover,
  Select,
  Divider,
  SegmentedControl,
  Paper,
  Tooltip
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Pencil, Plus, Trash2, Filter, Search, RotateCcw, FileText, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../../api/client';
import { useCollection } from '../../lib/useCollection';
import { toDateInput, formatDate } from '../../lib/format';
import PageHeader from '../../components/PageHeader';
import DataState from '../../components/DataState';
import LocalizedInput from '../../components/LocalizedInput';
import ImageUploader from '../../components/ImageUploader';
import { t } from '../../i18n';

const EMPTY = {
  title: { mn: '', en: '' },
  category: { mn: '', en: '' },
  content: { mn: '', en: '' },
  imageUrl: '',
  publishedAt: '',
  status: 'published', // 'draft' | 'reviewed' | 'published'
  isPublished: true,
};

export default function NewsPage() {
  const { items, loading, error, reload } = useCollection('/news');
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const form = useForm({
    initialValues: EMPTY,
    validate: {
      title: {
        mn: isNotEmpty(t.common.requiredField),
        en: isNotEmpty(t.common.requiredField),
      },
      category: {
        mn: isNotEmpty(t.common.requiredField),
        en: isNotEmpty(t.common.requiredField),
      },
      content: {
        mn: isNotEmpty(t.common.requiredField),
        en: isNotEmpty(t.common.requiredField),
      },
      imageUrl: isNotEmpty(t.common.requiredField),
    },
  });

  const openCreate = () => {
    setEditing(null);
    form.setValues(EMPTY);
    open();
  };

  const openEdit = (item) => {
    setEditing(item);
    const itemStatus = item.status || (item.isPublished ? 'published' : 'draft');
    form.setValues({
      title: { mn: item.title?.mn ?? '', en: item.title?.en ?? '' },
      category: { mn: item.category?.mn ?? '', en: item.category?.en ?? '' },
      content: { mn: item.content?.mn ?? '', en: item.content?.en ?? '' },
      imageUrl: item.imageUrl ?? '',
      publishedAt: toDateInput(item.publishedAt),
      status: itemStatus,
      isPublished: itemStatus === 'published',
    });
    open();
  };

  const submit = async (values) => {
    setSaving(true);
    try {
      const payload = {
        ...values,
        isPublished: values.status === 'published',
        publishedAt: values.publishedAt ? new Date(values.publishedAt).toISOString() : new Date().toISOString(),
      };
      if (editing) await api.patch(`/news/${editing._id}`, payload);
      else await api.post('/news', payload);
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
          await api.delete(`/news/${item._id}`);
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
    const itemSt = item.status || (item.isPublished ? 'published' : 'draft');
    if (filterStatus !== 'all' && itemSt !== filterStatus) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const titleMatch = item.title?.mn?.toLowerCase().includes(q) || item.title?.en?.toLowerCase().includes(q);
      const categoryMatch = item.category?.mn?.toLowerCase().includes(q) || item.category?.en?.toLowerCase().includes(q);
      const contentMatch = item.content?.mn?.toLowerCase().includes(q) || item.content?.en?.toLowerCase().includes(q);

      if (!titleMatch && !categoryMatch && !contentMatch) {
        return false;
      }
    }
    return true;
  });

  const getStatusBadge = (item) => {
    const st = item.status || (item.isPublished ? 'published' : 'draft');
    if (st === 'published') {
      return <Badge color="green" variant="light" leftSection={<CheckCircle2 size={12} />}>Нийтэлсэн</Badge>;
    }
    if (st === 'reviewed') {
      return <Badge color="cyan" variant="light" leftSection={<Clock size={12} />}>Хянасан (Бэлэн)</Badge>;
    }
    return <Badge color="gray" variant="light" leftSection={<FileText size={12} />}>Ноорог (Draft)</Badge>;
  };

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
          <Text size="sm" fw={700}>Хайлт болон нийтлэлийн төлөв</Text>

          <TextInput
            label="Хайх утга"
            placeholder="Гарчиг, агуулгаар хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<Search size={14} />}
          />

          <Select
            label="Нийтлэх төлөв"
            placeholder="Төлвөөр шүүх"
            value={filterStatus}
            onChange={setFilterStatus}
            data={[
              { value: 'all', label: 'Бүгд' },
              { value: 'published', label: 'Нийтлэгдсэн (Published)' },
              { value: 'reviewed', label: 'Хянасан (Reviewed)' },
              { value: 'draft', label: 'Ноорог (Draft)' }
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
        title={t.news.title}
        subtitle={t.news.subtitle}
        hideTitle={true}
        filterArea={filterArea}
        action={
          <Button leftSection={<Plus size={16} />} onClick={openCreate}>
            {t.news.add}
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
                  <Table.Th>{t.news.colTitle}</Table.Th>
                  <Table.Th>{t.news.colCategory}</Table.Th>
                  <Table.Th>{t.news.colDate}</Table.Th>
                  <Table.Th>{t.news.colStatus}</Table.Th>
                  <Table.Th w={100} ta="right">
                    {t.common.actions}
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredItems.map((item) => (
                  <Table.Tr key={item._id}>
                    <Table.Td maw={340}>
                      <Text fw={600} size="sm" lineClamp={2}>
                        {item.title?.mn}
                      </Text>
                      <Text c="dimmed" size="xs" lineClamp={1}>
                        {item.title?.en}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" color="blue">{item.category?.mn}</Badge>
                    </Table.Td>
                    <Table.Td>{formatDate(item.publishedAt)}</Table.Td>
                    <Table.Td>
                      {getStatusBadge(item)}
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
        title={editing ? t.news.editTitle : t.news.createTitle}
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
            {/* 🌐 BILINGUAL INPUTS (SIDE-BY-SIDE & TABBED VIEW) */}
            <LocalizedInput form={form} base="title" label={t.news.fTitle} required />
            <LocalizedInput
              form={form}
              base="category"
              label={t.news.fCategory}
              required
            />
            <LocalizedInput
              form={form}
              base="content"
              label={t.news.fContent}
              required
              textarea
              minRows={5}
            />

            {/* 🖼️ DRAG AND DROP IMAGE UPLOADER */}
            <ImageUploader
              value={form.values.imageUrl}
              onChange={(url) => form.setFieldValue('imageUrl', url)}
              label={t.news.fImage}
              required
            />

            {/* 🚦 3-STAGE STATUS WORKFLOW SELECTOR */}
            <Paper p="xs" radius="sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <Text size="xs" fw={700} c="#475569" tt="uppercase" mb={6}>
                Нийтлэх төлөв (Status Workflow)
              </Text>
              <SegmentedControl
                value={form.values.status}
                onChange={(val) => form.setFieldValue('status', val)}
                data={[
                  { label: '📝 Ноорог (Draft)', value: 'draft' },
                  { label: '🔍 Хянасан (Reviewed)', value: 'reviewed' },
                  { label: '🚀 Нийтлэх (Published)', value: 'published' }
                ]}
                fullWidth
                size="sm"
                radius="sm"
                color={form.values.status === 'published' ? 'green' : form.values.status === 'reviewed' ? 'cyan' : 'gray'}
              />
            </Paper>

            <TextInput
              type="date"
              label={t.news.fPublishedAt}
              {...form.getInputProps('publishedAt')}
            />

            <Group justify="flex-end" mt="sm">
              <Button variant="default" onClick={close}>
                {t.common.cancel}
              </Button>
              <Button type="submit" loading={saving} color="blue">
                {t.common.save}
              </Button>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  );
}
