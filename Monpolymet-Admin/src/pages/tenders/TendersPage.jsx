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
  FileInput,
  Select,
  SegmentedControl,
  SimpleGrid,
  Box,
  Divider,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { FileText, Upload, Pencil, Plus, Trash2, Filter, Search, LayoutGrid, List, Calendar, MapPin, Tag, Eye } from 'lucide-react';
import { api } from '../../api/client';
import { useCollection } from '../../lib/useCollection';
import PageHeader from '../../components/PageHeader';
import DataState from '../../components/DataState';
import LocalizedInput from '../../components/LocalizedInput';
import { generateTenderPdf } from '../../lib/tenderPdfGenerator';
import { t } from '../../i18n';

const EMPTY = {
  code: '',
  title: { mn: '', en: '' },
  category: { mn: '', en: '' },
  location: { mn: '', en: '' },
  description: { mn: '', en: '' },
  startDate: new Date().toISOString().slice(0, 16),
  deadlineDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  pdfUrl: '',
  isPublished: true,
};

const localizedRule = {
  mn: isNotEmpty(t.common.requiredField),
  en: isNotEmpty(t.common.requiredField),
};

const formatDateForInput = (dateVal) => {
  if (!dateVal) return '';
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return '';
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
};

export default function TendersPage() {
  const { items, loading, error, reload } = useCollection('/tenders');
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  const form = useForm({
    initialValues: EMPTY,
    validate: {
      code: isNotEmpty(t.common.requiredField),
      title: { mn: isNotEmpty(t.common.requiredField) },
      category: { mn: isNotEmpty(t.common.requiredField) },
      location: { mn: isNotEmpty(t.common.requiredField) },
      description: { mn: isNotEmpty(t.common.requiredField) },
    },
  });

  const handlePdfUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadingPdf(true);
      const res = await api.upload('/uploads', formData);
      const uploadedUrl = res?.url || res?.data?.url || '';
      form.setFieldValue('pdfUrl', uploadedUrl);
      notifications.show({ color: 'green', message: 'Тендерийн PDF файл амжилттай хуулагдлаа' });
    } catch (err) {
      notifications.show({ color: 'red', message: err.message || 'Файл хуулахад алдаа гарлаа' });
    } finally {
      setUploadingPdf(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    form.setValues({
      ...EMPTY,
      code: `ТШ-2026/${String((items?.length || 0) + 8).padStart(2, '0')}`,
      startDate: formatDateForInput(new Date()),
      deadlineDate: formatDateForInput(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
      pdfUrl: '',
    });
    open();
  };

  const openEdit = (item) => {
    setEditing(item);
    form.setValues({
      code: item.code ?? '',
      title: { mn: item.title?.mn ?? '', en: item.title?.en ?? '' },
      category: { mn: item.category?.mn ?? '', en: item.category?.en ?? '' },
      location: { mn: item.location?.mn ?? '', en: item.location?.en ?? '' },
      description: { mn: item.description?.mn ?? '', en: item.description?.en ?? '' },
      startDate: formatDateForInput(item.startDate),
      deadlineDate: formatDateForInput(item.deadlineDate),
      pdfUrl: item.pdfUrl ?? '',
      isPublished: item.isPublished ?? true,
    });
    open();
  };

  const submit = async (values) => {
    setSaving(true);
    try {
      const parsedStart = values.startDate ? new Date(values.startDate) : new Date();
      const parsedDeadline = values.deadlineDate ? new Date(values.deadlineDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const payload = {
        code: values.code || `ТШ-2026/${Date.now().toString().slice(-4)}`,
        title: { mn: values.title?.mn || '', en: values.title?.en || values.title?.mn || '' },
        category: { mn: values.category?.mn || '', en: values.category?.en || values.category?.mn || '' },
        location: { mn: values.location?.mn || '', en: values.location?.en || values.location?.mn || '' },
        description: { mn: values.description?.mn || '', en: values.description?.en || values.description?.mn || '' },
        startDate: isNaN(parsedStart.getTime()) ? new Date().toISOString() : parsedStart.toISOString(),
        deadlineDate: isNaN(parsedDeadline.getTime()) ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : parsedDeadline.toISOString(),
        pdfUrl: values.pdfUrl || '',
        isPublished: values.isPublished !== false,
      };

      if (editing && editing._id) {
        await api.patch(`/tenders/${editing._id}`, payload);
      } else {
        await api.post('/tenders', payload);
      }

      notifications.show({
        color: 'green',
        message: editing ? t.toast.updated : t.toast.created,
      });
      close();
      reload();
    } catch (err) {
      console.error('Tender save failed:', err);
      notifications.show({
        color: 'red',
        title: 'Хадгалахад алдаа гарлаа',
        message: Array.isArray(err.message) ? err.message.join(', ') : (err.message || 'Сүлжээний алдаа'),
      });
    } finally {
      setSaving(false);
    }
  };

  const seedInitialTenders = async () => {
    setSaving(true);
    const initialTenders = [
      {
        code: 'ТШ-2026/08',
        category: { mn: 'Уул Уурхай & Сэлбэг', en: 'Mining & Spare Parts' },
        title: { mn: 'Тосон уурхайн хүнд машины шүүр, тос тосолгооны материал нийлүүлэх', en: 'Supply of heavy machinery filters & lubricants for Toson Mine' },
        location: { mn: 'Төв аймаг, Заамар сум', en: 'Zaamar sum, Tuv province' },
        description: { mn: '2026-2027 оны олборлолтын улирлын хэрэгцээнд зориулсан CAT, Komatsu тоног төхөөрөмжийн шүүр, гидравлик тосны нийлүүлэгчийг сонгон шалгаруулна.', en: 'Selecting suppliers for CAT & Komatsu machinery filters and hydraulic fluids for 2026-2027 mining season.' },
        startDate: new Date('2026-07-01T09:00:00.000Z'),
        deadlineDate: new Date('2026-08-25T18:00:00.000Z'),
        isPublished: true
      },
      {
        code: 'ТШ-2026/09',
        category: { mn: 'Үйлдвэрлэлийн Түүхий Эд', en: 'Factory Raw Materials' },
        title: { mn: 'Монцемент үйлдвэрийн 2026 оны гипсэн чулуу (гөлтгөнө) нийлүүлэлт', en: 'Supply of gypsum raw materials for Moncement factory 2026' },
        location: { mn: 'Дорноговь аймаг, Өргөн сум', en: 'Urgun sum, Dornogovi province' },
        description: { mn: 'Жилд 100,000 тонн өндөр чанарын гөлтгөнө (CaSO4·2H2O > 85%) нийлүүлэх туршлагатай байгууллагуудыг сонгон шалгаруулалтад урьж байна.', en: 'Inviting experienced suppliers for annual supply of 100,000 tons high-grade gypsum for cement production.' },
        startDate: new Date('2026-07-15T09:00:00.000Z'),
        deadlineDate: new Date('2026-08-30T18:00:00.000Z'),
        isPublished: true
      },
      {
        code: 'ТШ-2026/10',
        category: { mn: 'Тээвэр & Логистик', en: 'Transport & Logistics' },
        title: { mn: 'Вагон болон авто замын тээврийн бөөний логистикийн үйлчилгээ', en: 'Railway cargo & heavy auto transport logistics service' },
        location: { mn: 'Улаанбаатар - Дорноговь', en: 'Ulaanbaatar - Dornogovi' },
        description: { mn: 'Бүтээгдэхүүн ба түүхий эдийн төмөр замын болон авто замын тээвэрлэлтийг гүйцэтгэх найдвартай логистикийн түнш сонгон шалгаруулна.', en: 'Selecting reliable logistics partners for bulk cargo transport via railway and heavy truck fleet.' },
        startDate: new Date('2026-07-20T09:00:00.000Z'),
        deadlineDate: new Date('2026-09-15T18:00:00.000Z'),
        isPublished: true
      }
    ];

    try {
      for (const t of initialTenders) {
        await api.post('/tenders', t);
      }
      notifications.show({ color: 'green', message: 'Анхны тендерүүд амжилттай үүслээ' });
      reload();
    } catch (err) {
      notifications.show({ color: 'red', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (item, e) => {
    e.stopPropagation();
    try {
      await api.patch(`/tenders/${item._id}`, { isPublished: !item.isPublished });
      notifications.show({ color: 'green', message: 'Нийтлэх төлөв шинэчлэгдлээ' });
      reload();
    } catch (err) {
      notifications.show({ color: 'red', message: err.message });
    }
  };

  const confirmDelete = (item, e) => {
    if (e) e.stopPropagation();
    modals.openConfirmModal({
      title: t.common.confirmDeleteTitle,
      children: <Text size="sm">{t.common.confirmDeleteBody}</Text>,
      labels: { confirm: t.common.delete, cancel: t.common.cancel },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await api.delete(`/tenders/${item._id}`);
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
  };

  const now = new Date();

  const filteredItems = (items || []).filter((item) => {
    const end = item.deadlineDate ? new Date(item.deadlineDate) : null;
    const isClosed = end ? now > end : false;
    const isOpen = !isClosed;

    if (filterStatus === 'open' && !isOpen) return false;
    if (filterStatus === 'closed' && !isClosed) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const codeMatch = item.code?.toLowerCase().includes(q);
      const titleMatch = item.title?.mn?.toLowerCase().includes(q) || item.title?.en?.toLowerCase().includes(q);
      const catMatch = item.category?.mn?.toLowerCase().includes(q) || item.category?.en?.toLowerCase().includes(q);

      if (!codeMatch && !titleMatch && !catMatch) return false;
    }
    return true;
  });

  const filterArea = (
    <Group gap="sm">
      <SegmentedControl
        value={viewMode}
        onChange={setViewMode}
        data={[
          {
            value: 'cards',
            label: (
              <Center label="Карт загвар">
                <LayoutGrid size={15} style={{ marginRight: 6 }} />
                <span>Карт загвар</span>
              </Center>
            ),
          },
          {
            value: 'table',
            label: (
              <Center label="Хүснэгт загвар">
                <List size={15} style={{ marginRight: 6 }} />
                <span>Хүснэгт</span>
              </Center>
            ),
          },
        ]}
      />

      <Popover width={300} position="bottom-start" withArrow shadow="md">
        <Popover.Target>
          <Button variant="light" leftSection={<Filter size={16} />} color="brand">
            Шүүлтүүр
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack gap="sm">
            <Text size="sm" fw={700}>Хайлт болон шүүлтүүр</Text>
            <TextInput
              label="Хайх утга"
              placeholder="Код, гарчгаар хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftSection={<Search size={14} />}
            />
            <Select
              label="Төлөв"
              value={filterStatus}
              onChange={setFilterStatus}
              data={[
                { value: 'all', label: 'Бүгд' },
                { value: 'open', label: 'Нээлттэй' },
                { value: 'closed', label: 'Хаагдсан' },
              ]}
            />
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );

  // Helper component for SegmentedControl icon + label alignment
  function Center({ children }) {
    return <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>;
  }

  // Render Web-Matching Card Component
  const renderTenderCard = (item) => {
    const start = item.startDate ? new Date(item.startDate) : null;
    const end = item.deadlineDate ? new Date(item.deadlineDate) : null;
    const isClosed = end ? now > end : false;

    let statusText = 'Нээлттэй';
    let statusBg = '#dcfce7';
    let statusColor = '#15803d';
    let dotColor = '#16a34a';

    if (isClosed) {
      statusText = 'Хаагдсан';
      statusBg = '#fee2e2';
      statusColor = '#dc2626';
      dotColor = '#ef4444';
    }

    return (
      <Card
        key={item._id || item.code}
        shadow="sm"
        padding="lg"
        radius="lg"
        withBorder
        style={{
          backgroundColor: '#ffffff',
          borderColor: isClosed ? '#fca5a5' : '#e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.25s ease',
          opacity: item.isPublished === false ? 0.6 : 1,
        }}
      >
        <div>
          {/* Card Header Badges */}
          <Group justify="space-between" mb="md">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: statusBg,
                color: statusColor,
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: dotColor,
                }}
              />
              {statusText}
            </span>

            <Badge color={isClosed ? 'red' : 'blue'} variant="light" size="lg" radius="sm">
              {item.code || 'ТШ-2026/XX'}
            </Badge>
          </Group>

          {/* Title */}
          <Text
            fw={700}
            size="lg"
            c="slate.9"
            style={{
              lineHeight: 1.4,
              marginBottom: 8,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {item.title?.mn || 'Тендерийн нэр / Гарчиг бөгөөгүй байна'}
          </Text>

          {/* Category */}
          <Text size="xs" c="blue.6" fw={600} mb="sm">
            {item.category?.mn || 'Ангилал'}
          </Text>

          {/* Description */}
          <Text size="sm" c="gray.6" style={{ lineHeight: 1.6, marginBottom: 18 }}>
            {item.description?.mn || 'Дэлгэрэнгүй тайлбар агуулга...'}
          </Text>

          {/* Meta Details Box */}
          <Box
            style={{
              backgroundColor: isClosed ? '#fff5f5' : '#f8fafc',
              borderRadius: '12px',
              padding: '12px 14px',
              marginBottom: '18px',
            }}
          >
            <Stack gap={6}>
              <Group justify="space-between">
                <Text size="xs" c="dimmed" fw={500}>
                  Эхлэх хугацаа:
                </Text>
                <Text size="xs" fw={700} c="blue.7">
                  {start ? start.toLocaleString('mn-MN', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text size="xs" c="dimmed" fw={500}>
                  Дуусах огноо:
                </Text>
                <Text size="xs" fw={700} c={isClosed ? 'red.6' : 'slate.8'}>
                  {end ? end.toLocaleString('mn-MN', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text size="xs" c="dimmed" fw={500}>
                  Байршил:
                </Text>
                <Text size="xs" fw={600} c="slate.8">
                  {item.location?.mn || '-'}
                </Text>
              </Group>

              {!isClosed && end && (end.getTime() > Date.now()) && (
                <Group justify="space-between" mt={4} pt={4} style={{ borderTop: '1px dashed #cbd5e1' }}>
                  <Text size="11px" c="blue.7" fw={600}>
                    Дуусахад үлдсэн хугацаа:
                  </Text>
                  <Badge size="xs" color="blue" variant="light" radius="xs">
                    {(() => {
                      const diffMs = end.getTime() - Date.now();
                      const d = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                      const h = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                      const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                      return d > 0 ? `${d}ө ${h}ц` : `${h}ц ${m}м`;
                    })()}
                  </Badge>
                </Group>
              )}
            </Stack>
          </Box>
        </div>

        {/* Card Actions (If inside Dashboard Grid) */}
        {item._id && (
          <Group justify="space-between" mt="xs" style={{ paddingTop: 10, borderTop: '1px solid #f1f5f9' }}>
            <Switch
              size="xs"
              label="Вэбд нийтлэх"
              checked={item.isPublished !== false}
              onChange={(e) => togglePublished(item, e)}
            />

            <Group gap={6}>
              <Button
                size="xs"
                variant="light"
                color="teal"
                leftSection={<FileText size={14} />}
                onClick={() => generateTenderPdf(item)}
              >
                PDF Бэлдэх
              </Button>
              <Button
                size="xs"
                variant="light"
                color="blue"
                leftSection={<Pencil size={14} />}
                onClick={() => openEdit(item)}
              >
                Засах
              </Button>
              <ActionIcon
                variant="subtle"
                color="red"
                size="input-sm"
                onClick={(e) => confirmDelete(item, e)}
              >
                <Trash2 size={16} />
              </ActionIcon>
            </Group>
          </Group>
        )}
      </Card>
    );
  };

  return (
    <Stack gap="lg">
      <PageHeader
        title="Худалдан авалт & Тендер"
        subtitle="Админ панелаас тендер зарлах, эхлэх/дуусах хугацаа болон картыг удирдах"
        action={
          <Group gap="sm">
            {filterArea}
            <Button
              leftSection={<Plus size={16} />}
              onClick={openCreate}
              color="brand"
            >
              Шинэ тендер зарлах
            </Button>
          </Group>
        }
      />

      <DataState
        loading={loading}
        error={error}
        empty={!filteredItems.length}
        onRetry={reload}
      >
        {viewMode === 'cards' ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {filteredItems.map((item) => renderTenderCard(item))}
          </SimpleGrid>
        ) : (
          <Card withBorder padding="0" radius="md">
            <Table verticalSpacing="sm" horizontalSpacing="md" striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Код</Table.Th>
                  <Table.Th>Ангилал & Гарчиг</Table.Th>
                  <Table.Th>Эхлэх хугацаа</Table.Th>
                  <Table.Th>Дуусах огноо / цаг</Table.Th>
                  <Table.Th>Төлөв</Table.Th>
                  <Table.Th style={{ width: 120 }}></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredItems.map((item) => {
                  const start = item.startDate ? new Date(item.startDate) : null;
                  const end = item.deadlineDate ? new Date(item.deadlineDate) : null;
                  const isClosed = end ? now > end : false;

                  const statusBadge = isClosed ? <Badge color="red">Хаагдсан</Badge> : <Badge color="green">Нээлттэй</Badge>;

                  return (
                    <Table.Tr key={item._id}>
                      <Table.Td>
                        <Badge variant="light" color="blue" size="lg">
                          {item.code}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={700}>
                          {item.title?.mn}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {item.category?.mn} • {item.location?.mn}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs" fw={600} c="gray.7">
                          {start ? start.toLocaleString('mn-MN', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs" fw={700} c={isClosed ? 'red.6' : 'blue.7'}>
                          {end ? end.toLocaleString('mn-MN', { dateStyle: 'short', timeStyle: 'short' }) : '-'}
                        </Text>
                      </Table.Td>
                      <Table.Td>{statusBadge}</Table.Td>
                      <Table.Td>
                        <Group gap={4} justify="flex-end">
                          <ActionIcon
                            variant="subtle"
                            color="blue"
                            onClick={() => openEdit(item)}
                          >
                            <Pencil size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={(e) => confirmDelete(item, e)}
                          >
                            <Trash2 size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Card>
        )}
      </DataState>

      <Drawer
        opened={opened}
        onClose={close}
        title={editing ? 'Тендер засах' : 'Шинэ тендер зарлах'}
        position="right"
        size="xl"
      >
        <form onSubmit={form.onSubmit(submit)}>
          <Stack gap="md">
            {/* Live Web Card Preview Header */}
            <Box style={{ backgroundColor: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <Group gap={6} mb={8}>
                <Eye size={16} color="#2563eb" />
                <Text size="xs" fw={700} tt="uppercase" c="blue.7">
                  Вэб дээрх картын шууд харагдац (Live Preview)
                </Text>
              </Group>
              {renderTenderCard(form.values)}
            </Box>

            <Divider my="xs" label="Тендерийн дэлгэрэнгүй мэдээлэл бөглөх" labelPosition="center" />

            <TextInput
              label="Тендерийн код"
              placeholder="ТШ-2026/08"
              required
              {...form.getInputProps('code')}
            />

            <LocalizedInput
              form={form}
              base="title"
              label="Тендерийн нэр / Гарчиг"
              required
            />

            <LocalizedInput
              form={form}
              base="category"
              label="Ангилал"
              required
            />

            <LocalizedInput
              form={form}
              base="location"
              label="Байршил"
              required
            />

            <Group grow>
              <TextInput
                label="Эхлэх хугацаа болон цаг"
                type="datetime-local"
                required
                {...form.getInputProps('startDate')}
              />
              <TextInput
                label="Дуусах хугацаа болон цаг"
                type="datetime-local"
                required
                {...form.getInputProps('deadlineDate')}
              />
            </Group>

            <LocalizedInput
              form={form}
              base="description"
              label="Тендерийн дэлгэрэнгүй тайлбар"
              textarea
              required
            />

            <Box style={{ backgroundColor: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
              <Group justify="space-between" mb={6}>
                <Text size="xs" fw={700} c="slate.7">
                  Тендерийн хавсралт баримт бичиг (Заавал биш / Сонголттой)
                </Text>
                <Badge size="xs" color="gray" variant="light">Оруулахгүй байж болно</Badge>
              </Group>
              <FileInput
                placeholder="Файл хуулах бол сонгоно уу (Хоосон үлдээж болно)"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                leftSection={<Upload size={16} />}
                onChange={handlePdfUpload}
                disabled={uploadingPdf}
                mb={8}
              />
              <TextInput
                label="Файлын URL хаяг"
                placeholder="Хоосон эсвэл http://..."
                {...form.getInputProps('pdfUrl')}
              />
              {form.values.pdfUrl && (
                <Group justify="space-between" mt={6}>
                  <Group gap={6}>
                    <FileText size={14} color="#16a34a" />
                    <Text size="xs" c="green.7" fw={600}>
                      Хавсаргасан файл: {form.values.pdfUrl}
                    </Text>
                  </Group>
                  <Button size="xs" variant="subtle" color="red" onClick={() => form.setFieldValue('pdfUrl', '')}>
                    Файлыг хасах
                  </Button>
                </Group>
              )}
            </Box>

            <Switch
              label="Вэбсайт дээр шууд нийтлэх (Идэвхтэй)"
              {...form.getInputProps('isPublished', { type: 'checkbox' })}
            />

            <Button type="submit" loading={saving} fullWidth mt="md" size="md">
              {t.common.save}
            </Button>
          </Stack>
        </form>
      </Drawer>
    </Stack>
  );
}
