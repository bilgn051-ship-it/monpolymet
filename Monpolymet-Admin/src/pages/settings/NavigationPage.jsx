import { useEffect, useState } from 'react';
import {
  ActionIcon, Badge, Button, Card, Drawer, Group, Stack, Switch, Table, Text, TextInput,
  NumberInput, Center, Loader, Tabs, rem
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { Pencil, Plus, Trash2, GripVertical, Link, PanelBottom } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { api } from '../../api/client';
import PageHeader from '../../components/PageHeader';
import LocalizedInput from '../../components/LocalizedInput';

function SortableTableRow({ item, openEdit, remove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
    backgroundColor: isDragging ? 'var(--mantine-color-gray-1)' : undefined,
  };

  return (
    <Table.Tr ref={setNodeRef} style={style}>
      <Table.Td style={{ width: 40, textAlign: 'center' }}>
        <ActionIcon variant="subtle" color="gray" {...attributes} {...listeners} style={{ cursor: 'grab' }}>
          <GripVertical size={16} />
        </ActionIcon>
      </Table.Td>
      <Table.Td>{item.order}</Table.Td>
      <Table.Td>
        <Text fw={500} size="sm">{item.label?.mn}</Text>
        <Text size="xs" c="dimmed">{item.label?.en}</Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="outline" color="gray" style={{ textTransform: 'none' }}>{item.target}</Badge>
      </Table.Td>
      <Table.Td>
        <Badge variant="light" color={item.isActive !== false ? 'brand' : 'gray'}>
          {item.isActive !== false ? 'Идэвхтэй' : 'Идэвхгүй'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={8} wrap="nowrap">
          <ActionIcon variant="light" color="blue" onClick={() => openEdit(item)}>
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon variant="light" color="red" onClick={() => remove(item.id)}>
            <Trash2 size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}

const EMPTY = {
  id: '',
  label: { mn: '', en: '' },
  target: '',
  order: 0,
  isActive: true,
};

export default function NavigationPage() {
  const [activeTab, setActiveTab] = useState('main');
  const [items, setItems] = useState({ main: [], footer: [] });
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get('/settings');
      setItems({
        main: (res?.navigation || []).sort((a, b) => (a.order || 0) - (b.order || 0)),
        footer: (res?.footerNavigation || []).sort((a, b) => (a.order || 0) - (b.order || 0)),
      });
    } catch (err) {
      notifications.show({ color: 'red', title: 'Алдаа', message: 'Мэдээлэл татахад алдаа гарлаа' });
    } finally {
      setLoading(false);
    }
  };

  const form = useForm({
    initialValues: EMPTY,
    validate: {
      id: isNotEmpty('ID заавал оруулна уу'),
      label: {
        mn: isNotEmpty('Нэр (Монгол) заавал оруулна уу'),
        en: isNotEmpty('Нэр (English) заавал оруулна уу'),
      },
      target: isNotEmpty('Үсрэх хуудас / Линк заавал оруулна уу'),
    },
  });

  const openCreate = () => {
    setEditing(null);
    form.setValues({ ...EMPTY, id: 'nav-' + Date.now().toString().slice(-4), order: items[activeTab].length + 1 });
    open();
  };

  const openEdit = (item) => {
    setEditing(item);
    form.setValues({
      id: item.id || '',
      label: { mn: item.label?.mn || '', en: item.label?.en || '' },
      target: item.target || '',
      order: item.order || 0,
      isActive: item.isActive !== false,
    });
    open();
  };

  const submit = async (values) => {
    setSaving(true);
    try {
      let updatedList = [];
      if (editing) {
        updatedList = items[activeTab].map(item => item.id === editing.id ? values : item);
      } else {
        updatedList = [...items[activeTab], values];
      }
      
      updatedList.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      const payload = activeTab === 'main' 
        ? { navigation: updatedList }
        : { footerNavigation: updatedList };

      await api.put('/settings', payload);
      
      setItems(prev => ({ ...prev, [activeTab]: updatedList }));
      notifications.show({
        color: 'green',
        message: editing ? 'Амжилттай шинэчлэгдлээ' : 'Амжилттай нэмэгдлээ',
      });
      close();
    } catch (err) {
      notifications.show({ color: 'red', title: 'Алдаа', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Энэ цэсийг устгахдаа итгэлтэй байна уу?')) return;
    try {
      const updatedList = items[activeTab].filter(item => item.id !== id);
      const payload = activeTab === 'main' ? { navigation: updatedList } : { footerNavigation: updatedList };
      await api.put('/settings', payload);
      setItems(prev => ({ ...prev, [activeTab]: updatedList }));
      notifications.show({ color: 'green', message: 'Амжилттай устгагдлаа' });
    } catch (err) {
      notifications.show({ color: 'red', title: 'Алдаа', message: err.message });
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items[activeTab].findIndex((i) => i.id === active.id);
      const newIndex = items[activeTab].findIndex((i) => i.id === over.id);
      
      const reordered = arrayMove(items[activeTab], oldIndex, newIndex);
      const updatedList = reordered.map((item, index) => ({ ...item, order: index + 1 }));
      
      setItems(prev => ({ ...prev, [activeTab]: updatedList }));
      
      const payload = activeTab === 'main' ? { navigation: updatedList } : { footerNavigation: updatedList };
      try {
        await api.put('/settings', payload);
        notifications.show({ color: 'green', message: 'Дараалал хадгалагдлаа' });
      } catch (err) {
        notifications.show({ color: 'red', title: 'Алдаа', message: err.message });
        fetchSettings(); // Revert on failure
      }
    }
  };

  if (loading) {
    return (
      <Center py={80}>
        <Loader />
      </Center>
    );
  }

  const currentList = items[activeTab];

  return (
    <>
      <PageHeader title="Цэсний удирдлага" subtitle="Вэбсайтын үндсэн болон хөл цэсүүдийг удирдах, зөөх" />
      
      <Tabs value={activeTab} onChange={setActiveTab} mb="md">
        <Tabs.List>
          <Tabs.Tab value="main" leftSection={<Link size={16} />}>Үндсэн цэс (Header)</Tabs.Tab>
          <Tabs.Tab value="footer" leftSection={<PanelBottom size={16} />}>Хөл цэс (Footer)</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Card withBorder radius="md" padding="md" mb="xl">
        <Group justify="space-between" mb="md">
          <Text fw={500}>Нийт цэс: {currentList.length}</Text>
          <Button leftSection={<Plus size={16} />} onClick={openCreate}>
            {activeTab === 'main' ? 'Үндсэн цэс нэмэх' : 'Хөл цэс нэмэх'}
          </Button>
        </Group>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm" striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: 40 }}></Table.Th>
                  <Table.Th>Дараалал</Table.Th>
                  <Table.Th>Нэр (MN / EN)</Table.Th>
                  <Table.Th>Линк / Үсрэх хуудас</Table.Th>
                  <Table.Th>Төлөв</Table.Th>
                  <Table.Th style={{ width: 100 }}>Үйлдэл</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <SortableContext items={currentList.map(i => i.id)} strategy={verticalListSortingStrategy}>
                  {currentList.map((item) => (
                    <SortableTableRow key={item.id} item={item} openEdit={openEdit} remove={remove} />
                  ))}
                </SortableContext>
                {currentList.length === 0 && (
                  <Table.Tr>
                    <Table.Td colSpan={6} ta="center" py="xl" c="dimmed">
                      Одоогоор цэс байхгүй байна
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </DndContext>
      </Card>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title={<Text fw={600}>{editing ? 'Цэс засах' : 'Цэс нэмэх'}</Text>}
        size="md"
        padding="lg"
      >
        <form onSubmit={form.onSubmit(submit)}>
          <Stack gap="md">
            <TextInput
              label="ID (давхцахгүй утга)"
              placeholder="about, news..."
              withAsterisk
              {...form.getInputProps('id')}
              disabled={!!editing}
            />
            
            <LocalizedInput
              label="Цэсний нэр"
              form={form}
              path="label"
              required
            />
            
            <TextInput
              label="Үсрэх хуудас / Линк"
              placeholder="about, news, эсвэл https://..."
              description="Вэбсайтын дотоод хуудас (about, news) эсвэл гадаад линк оруулна уу"
              withAsterisk
              {...form.getInputProps('target')}
            />
            
            <NumberInput
              label="Дараалал"
              placeholder="1, 2, 3..."
              {...form.getInputProps('order')}
            />
            
            <Switch
              label="Идэвхтэй эсэх"
              description="Идэвхгүй болговол вэбсайт дээр харагдахгүй"
              {...form.getInputProps('isActive', { type: 'checkbox' })}
            />
            
            <Group justify="flex-end" mt="xl">
              <Button variant="default" onClick={close}>Буцах</Button>
              <Button type="submit" loading={saving}>Хадгалах</Button>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  );
}
