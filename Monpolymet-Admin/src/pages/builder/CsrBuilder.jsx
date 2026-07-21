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
import { Save, Trees, Check } from 'lucide-react';
import { api } from '../../api/client';

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
  });

  useEffect(() => {
    api.get('/public/csr')
      .then((res) => {
        if (res) setCsrData((prev) => ({ ...prev, ...res }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/public/csr', csrData);
      notifications.show({ title: 'Амжилттай', message: 'CSR & Тогтвортой хөгжлийн мэдээлэл шинэчлэгдлээ.', color: 'teal', icon: <Check size={16} /> });
    } catch (e) {
      notifications.show({ title: 'Алдаа', message: e.message, color: 'red' });
    } finally {
      setSaving(false);
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
          <Text c="dimmed" size="sm" mt={4}>
            Байгаль орчны бодлого, Сангийн мэдээлэл болон 360 аяллын холбоосыг удирдах
          </Text>
        </div>
        <Button leftSection={<Save size={16} />} loading={saving} onClick={handleSave} color="teal">
          Хадгалах
        </Button>
      </Group>

      <Card withBorder radius="lg" padding="xl">
        <Stack gap="md">
          <Title order={4}>Мөнх тогтвортой хөгжил сан</Title>
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <TextInput
              label="Сангийн нэр (Монгол)"
              value={csrData.fundTitleMn}
              onChange={(e) => setCsrData({ ...csrData, fundTitleMn: e.target.value })}
            />
            <TextInput
              label="Сангийн нэр (Англи)"
              value={csrData.fundTitleEn}
              onChange={(e) => setCsrData({ ...csrData, fundTitleEn: e.target.value })}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <Textarea
              label="Сангийн зорилго / Танилцуулга (Монгол)"
              rows={3}
              value={csrData.fundDescMn}
              onChange={(e) => setCsrData({ ...csrData, fundDescMn: e.target.value })}
            />
            <Textarea
              label="Сангийн зорилго / Танилцуулга (Англи)"
              rows={3}
              value={csrData.fundDescEn}
              onChange={(e) => setCsrData({ ...csrData, fundDescEn: e.target.value })}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <TextInput
              label="Тогтвортой хөгжлийн тайлан (PDF URL)"
              value={csrData.reportUrl}
              onChange={(e) => setCsrData({ ...csrData, reportUrl: e.target.value })}
            />
            <TextInput
              label="Тосон үйлдвэрт зочлох 360 Аяллын URL"
              value={csrData.factory360Url}
              onChange={(e) => setCsrData({ ...csrData, factory360Url: e.target.value })}
            />
          </SimpleGrid>
        </Stack>
      </Card>
    </Stack>
  );
}
