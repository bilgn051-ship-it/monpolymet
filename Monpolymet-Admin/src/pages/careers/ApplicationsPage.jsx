import { useState } from 'react';
import {
  ActionIcon,
  Anchor,
  Badge,
  Card,
  Divider,
  Drawer,
  Group,
  Select,
  Stack,
  Table,
  Text,
  Popover,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import { Eye, Trash2, Filter, Search, RotateCcw } from 'lucide-react';
import { api } from '../../api/client';
import { useCollection } from '../../lib/useCollection';
import { formatDate } from '../../lib/format';
import PageHeader from '../../components/PageHeader';
import DataState from '../../components/DataState';
import { STATUS_COLORS, STATUS_OPTIONS } from './applicationStatus';
import { t } from '../../i18n';

function DetailRow({ label, children }) {
  return (
    <Group gap="xs" wrap="nowrap" align="flex-start">
      <Text size="sm" c="dimmed" w={130} style={{ flexShrink: 0 }}>
        {label}
      </Text>
      <Text size="sm">{children}</Text>
    </Group>
  );
}

export default function ApplicationsPage() {
  const { items, loading, error, reload } = useCollection('/applications');
  const [opened, { open, close }] = useDisclosure(false);
  const [selected, setSelected] = useState(null);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const openDetail = (item) => {
    setSelected(item);
    open();
  };

  const changeStatus = async (item, status) => {
    if (!status || status === item.status) return;
    try {
      await api.patch(`/applications/${item._id}`, { status });
      notifications.show({ color: 'green', message: t.toast.updated });
      setSelected((prev) => (prev && prev._id === item._id ? { ...prev, status } : prev));
      reload();
    } catch (err) {
      notifications.show({ color: 'red', title: t.toast.saveError, message: err.message });
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
          await api.delete(`/applications/${item._id}`);
          notifications.show({ color: 'green', message: t.toast.deleted });
          if (selected?._id === item._id) close();
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
    if (filterStatus !== 'all') {
      if (item.status !== filterStatus) return false;
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = item.name?.toLowerCase().includes(q);
      const positionMatch = item.position?.toLowerCase().includes(q);
      const phoneMatch = item.phone?.toLowerCase().includes(q);
      const emailMatch = item.email?.toLowerCase().includes(q);
      const messageMatch = item.message?.toLowerCase().includes(q);

      if (!nameMatch && !positionMatch && !phoneMatch && !emailMatch && !messageMatch) {
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
            placeholder="Нэр, албан тушаал, утсаар хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<Search size={14} />}
          />

          <Select
            label="Төлөв"
            placeholder="Анкетын төлвөөр шүүх"
            value={filterStatus}
            onChange={setFilterStatus}
            data={[
              { value: 'all', label: 'Бүгд' },
              ...STATUS_OPTIONS
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
        title={t.applications.title}
        subtitle={t.applications.subtitle}
        hideTitle={true}
        filterArea={filterArea}
      />

      <Card withBorder radius="md" padding={0}>
        <DataState
          loading={loading}
          error={error}
          empty={filteredItems.length === 0}
          onRetry={reload}
        >
          <Table.ScrollContainer minWidth={720}>
            <Table striped highlightOnHover verticalSpacing="sm" horizontalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t.applications.colName}</Table.Th>
                  <Table.Th>{t.applications.colPosition}</Table.Th>
                  <Table.Th>{t.applications.colContact}</Table.Th>
                  <Table.Th>{t.applications.colDate}</Table.Th>
                  <Table.Th w={150}>{t.applications.colStatus}</Table.Th>
                  <Table.Th w={90} ta="right">
                    {t.common.actions}
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredItems.map((item) => (
                  <Table.Tr key={item._id}>
                    <Table.Td>
                      <Text fw={600} size="sm">
                        {item.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>{item.position}</Table.Td>
                    <Table.Td>
                      <Anchor href={`tel:${item.phone}`} size="sm">
                        {item.phone}
                      </Anchor>
                    </Table.Td>
                    <Table.Td>{formatDate(item.createdAt)}</Table.Td>
                    <Table.Td>
                      <Select
                        size="xs"
                        w={140}
                        allowDeselect={false}
                        data={STATUS_OPTIONS}
                        value={item.status}
                        onChange={(value) => changeStatus(item, value)}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4} justify="flex-end" wrap="nowrap">
                        <ActionIcon
                          variant="subtle"
                          onClick={() => openDetail(item)}
                          aria-label={t.applications.viewTitle}
                        >
                          <Eye size={16} />
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
        title={t.applications.viewTitle}
        position="right"
        size="md"
        styles={{
          content: {
            borderRadius: '12px',
          },
          inner: {
            padding: '10px',
          }
        }}
      >
        {selected && (
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={700} fz="lg">
                {selected.name}
              </Text>
              <Badge color={STATUS_COLORS[selected.status] ?? 'gray'} variant="light">
                {t.applications.status[selected.status] ?? selected.status}
              </Badge>
            </Group>
            <Divider />
            <DetailRow label={t.applications.position}>{selected.position}</DetailRow>
            <DetailRow label={t.applications.phone}>
              <Anchor href={`tel:${selected.phone}`}>{selected.phone}</Anchor>
            </DetailRow>
            {selected.email && (
              <DetailRow label={t.applications.email}>
                <Anchor href={`mailto:${selected.email}`}>{selected.email}</Anchor>
              </DetailRow>
            )}
            <DetailRow label={t.applications.colDate}>
              {formatDate(selected.createdAt)}
            </DetailRow>
            {selected.message && (
              <>
                <Divider label={t.applications.message} labelPosition="left" />
                <Text size="sm">{selected.message}</Text>
              </>
            )}
            <Divider />
            <Select
              label={t.applications.changeStatus}
              data={STATUS_OPTIONS}
              value={selected.status}
              allowDeselect={false}
              onChange={(value) => changeStatus(selected, value)}
            />
          </Stack>
        )}
      </Drawer>
    </>
  );
}
