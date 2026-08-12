import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Save, Check, Globe } from 'lucide-react';
import { api } from '../../api/client';
import ImageUploader from '../../components/ImageUploader';

export default function CsrBuilder() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [csrData, setCsrData] = useState({
    fundTitleMn: 'Мөнх тогтвортой хөгжил сан',
    fundTitleEn: 'Sustainable Development Fund',
    fundDescMn: 'Байгаль орчны нөхөн сэргээлт, орон нутгийн хөгжил, боловсролыг дэмжих төслүүд.',
    fundDescEn: 'Projects supporting environmental restoration, local community development, and education.',
    reportUrl: '/reports/sustainability-2025.pdf',
    factory360Url: 'https://360.monpolymet.mn',
    pano360Url: ''
  });

  useEffect(() => {
    api.get('/public/csr-highlight')
      .then((res) => {
        if (res) {
          setCsrData((prev) => ({
            ...prev,
            ...res,
            pano360Url: res.pano360Url !== undefined ? res.pano360Url : '',
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/csr-highlight', csrData);
      notifications.show({ title: 'Амжилттай', message: 'CSR & 360 Панорама зургийн мэдээлэл шинэчлэгдлээ.', color: 'teal', icon: <Check size={16} /> });
    } catch (e) {
      notifications.show({ title: 'Алдаа', message: e.message, color: 'red' });
    } finally {
      setSaving(false);
    }
  };

  // Instant Auto-Save to MongoDB upon uploading or deleting image
  const handlePanoChange = async (url) => {
    const updatedData = { ...csrData, pano360Url: url };
    setCsrData(updatedData);
    try {
      await api.put('/csr-highlight', updatedData);
      notifications.show({
        title: url ? 'Зураг хадгалагдлаа' : 'Зураг устгагдлаа',
        message: url ? 'Шинэ 360 панорама зураг өгөгдлийн санд амжилттай хадгалагдлаа.' : '360 панорама зураг өгөгдлийн сангаас бүрэн устгагдлаа.',
        color: url ? 'teal' : 'blue',
        icon: <Check size={16} />
      });
    } catch (e) {
      notifications.show({ title: 'Алдаа', message: e.message, color: 'red' });
    }
  };

  if (loading) {
    return (
      <Paper p={50} radius="md" align="center">
        <Loader size="lg" />
        <Text mt="md" c="dimmed">CSR мэдээллийг ачаалж байна...</Text>
      </Paper>
    );
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} fw={700}>
            CSR & Тогтвортой хөгжил Builder
          </Title>
          <Text size="sm" c="dimmed">
            Нөхөн сэргээлтийн үзүүлэлт, 360 Панорама зураг болон ТОП төслүүдийн мэдээллийг удирдах
          </Text>
        </div>
        <Button leftSection={<Save size={16} />} loading={saving} onClick={handleSave} color="teal">
          Хадгалах
        </Button>
      </Group>

      {/* 🖼️ 360° PANORAMA HIGH-RES FILE UPLOADER CARD */}
      <Card withBorder radius="lg" padding="xl" style={{ borderColor: '#bfdbfe', backgroundColor: '#f8fafc' }}>
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <div>
              <Group gap="xs" align="center">
                <Globe size={20} color="#001CE8" />
                <Title order={4} style={{ color: '#0f172a' }}>360° Виртуал Аяллын Эх Зураг (8K/4K High-Res Panorama)</Title>
              </Group>
              <Text size="xs" c="dimmed" mt={4}>
                Вэб сайтын 360° Виртуал аялалд харагдах эх 8K/4K өндөр нарийвчлалтай панорама зургийг чирж хуулах
              </Text>
            </div>
            <Badge color="blue" variant="filled" size="lg">360° VR Active</Badge>
          </Group>

          <ImageUploader
            label="Тосон нуурын 360° Эх Панорама зураг (Эх 8K/4K файл .jpg, .png)"
            value={csrData.pano360Url}
            onChange={handlePanoChange}
          />
        </Stack>
      </Card>

      <Card withBorder radius="lg" padding="xl">
        <Stack gap="md">
          <Title order={4}>Мөнх тогтвортой хөгжил сан</Title>
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <TextInput
              label="Сангийн нэр (Монгол)"
              value={csrData.fundTitleMn || ''}
              onChange={(e) => setCsrData({ ...csrData, fundTitleMn: e.target.value })}
            />
            <TextInput
              label="Сангийн нэр (Англи)"
              value={csrData.fundTitleEn || ''}
              onChange={(e) => setCsrData({ ...csrData, fundTitleEn: e.target.value })}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <Textarea
              label="Сангийн зорилго / Танилцуулга (Монгол)"
              rows={3}
              value={csrData.fundDescMn || ''}
              onChange={(e) => setCsrData({ ...csrData, fundDescMn: e.target.value })}
            />
            <Textarea
              label="Сангийн зорилго / Танилцуулга (Англи)"
              rows={3}
              value={csrData.fundDescEn || ''}
              onChange={(e) => setCsrData({ ...csrData, fundDescEn: e.target.value })}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <TextInput
              label="Тогтвортой хөгжлийн тайлан (PDF URL)"
              value={csrData.reportUrl || ''}
              onChange={(e) => setCsrData({ ...csrData, reportUrl: e.target.value })}
            />
            <TextInput
              label="Тосон үйлдвэрт зочлох 360 Аяллын URL"
              value={csrData.factory360Url || ''}
              onChange={(e) => setCsrData({ ...csrData, factory360Url: e.target.value })}
            />
          </SimpleGrid>
        </Stack>
      </Card>
    </Stack>
  );
}
