import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Save, Building2, Check } from 'lucide-react';
import { api } from '../../api/client';

export default function CompaniesBuilder() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [companies, setCompanies] = useState([
    { id: 'monpolymet', titleMn: 'Монполимет ХХК', titleEn: 'Monpolymet LLC', descMn: 'Уул уурхай болон байгаль орчны нөхөн сэргээлт', logoUrl: '/assets/logo.png', bgUrl: '/assets/1.jpg' },
    { id: 'narurt', titleMn: 'Нар-Урт ХХК', titleEn: 'Nar-Urt LLC', descMn: 'Барилга угсралт болон дэд бүтэц', logoUrl: '/assets/nar.png', bgUrl: '/assets/2.jpg' },
    { id: 'moncement', titleMn: 'Монцемент Билдинг Материалс ХХК', titleEn: 'Moncement LLC', descMn: 'Цементийн бүрэн автомат үйлдвэрлэл', logoUrl: '/assets/3.png', bgUrl: '/assets/3.png' },
    { id: 'ann', titleMn: 'АНН ХХК', titleEn: 'ANN LLC', descMn: 'Гадаад худалдаа ба ложистик', logoUrl: '/assets/ann.png', bgUrl: '/assets/4.png' },
    { id: 'decater', titleMn: 'Ди Кэйтерс ХХК', titleEn: 'De Caterers LLC', descMn: 'Нийтийн хоол ба үйлчилгээ', descUrl: '/assets/4.png', bgUrl: '/assets/4.png' },
  ]);

  useEffect(() => {
    api.get('/public/companies')
      .then((res) => {
        if (res) setCompanies(res);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post('/public/companies', { companies });
      notifications.show({ title: 'Амжилттай', message: 'Компаниудын мэдээлэл шинэчлэгдлээ.', color: 'teal', icon: <Check size={16} /> });
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
        <Text mt="md" c="dimmed">Компаниудын мэдээллийг ачаалж байна...</Text>
      </Paper>
    );
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} fw={700}>
            Компаниуд Builder (Subsidiaries Manager)
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Охин компаниудын лого, дэвсгэр зураг болон дэлгэрэнгүй мэдээллийг засах
          </Text>
        </div>
        <Button leftSection={<Save size={16} />} loading={saving} onClick={handleSave} color="indigo">
          Бүгдийг Хадгалах
        </Button>
      </Group>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {companies.map((comp, index) => (
          <Card key={comp.id || index} withBorder radius="lg" padding="lg">
            <Stack gap="md">
              <Group justify="space-between">
                <Badge size="lg" color="indigo">
                  {comp.titleMn}
                </Badge>
                {comp.logoUrl && <Image src={comp.logoUrl} w={32} h={32} fit="contain" fallbackSrc="https://via.placeholder.com/32" />}
              </Group>

              <SimpleGrid cols={2}>
                <TextInput
                  label="Нэр (Монгол)"
                  value={comp.titleMn}
                  onChange={(e) => {
                    const next = [...companies];
                    next[index].titleMn = e.target.value;
                    setCompanies(next);
                  }}
                />
                <TextInput
                  label="Нэр (Англи)"
                  value={comp.titleEn}
                  onChange={(e) => {
                    const next = [...companies];
                    next[index].titleEn = e.target.value;
                    setCompanies(next);
                  }}
                />
              </SimpleGrid>

              <Textarea
                label="Танилцуулга (Монгол)"
                rows={3}
                value={comp.descMn}
                onChange={(e) => {
                  const next = [...companies];
                  next[index].descMn = e.target.value;
                  setCompanies(next);
                }}
              />

              <SimpleGrid cols={2}>
                <TextInput
                  label="Лого зургийн URL / Зам"
                  value={comp.logoUrl || ''}
                  onChange={(e) => {
                    const next = [...companies];
                    next[index].logoUrl = e.target.value;
                    setCompanies(next);
                  }}
                />
                <TextInput
                  label="Дэвсгэр зургийн URL / Зам"
                  value={comp.bgUrl || ''}
                  onChange={(e) => {
                    const next = [...companies];
                    next[index].bgUrl = e.target.value;
                    setCompanies(next);
                  }}
                />
              </SimpleGrid>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
