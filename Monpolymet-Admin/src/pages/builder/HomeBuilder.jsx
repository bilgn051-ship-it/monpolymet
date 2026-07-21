import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Switch,
  Table,
  Tabs,
  Text,
  TextInput,
  Textarea,
  Title,
  FileInput,
  ActionIcon,
  Modal,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  Save,
  Video,
  Grid3x3,
  Building2,
  Trees,
  Plus,
  Trash2,
  Upload,
  Edit,
  Eye,
  Check,
} from 'lucide-react';
import { api } from '../../api/client';

export default function HomeBuilder() {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // States
  const [heroData, setHeroData] = useState({
    videoUrl: '/assets/WEB.mp4',
    titleMn: 'Ирээдүйг хамтдаа бүтээнэ',
    titleEn: 'Building the Future Together',
    subtitleMn: 'Үндэсний хөрөнгө оруулагч – Монполимет Групп',
    subtitleEn: 'National Producer & Investor - Monpolymet Group',
  });

  const [statsData, setStatsData] = useState([
    { id: '1', number: '1992', labelMn: 'Үүсгэн байгуулагдсан он', labelEn: 'Established Year' },
    { id: '2', number: '1500+', labelMn: 'Ажлын байр бий болгосон', labelEn: 'Jobs Created' },
    { id: '3', number: '5', labelMn: 'Охин компани', labelEn: 'Subsidiary Companies' },
    { id: '4', number: '30+', labelMn: 'Жилийн туршлага', labelEn: 'Years of Experience' },
  ]);

  const [carouselCards, setCarouselCards] = useState([
    { id: 1, titleMn: 'Монполимет ХХК', titleEn: 'Monpolymet LLC', descMn: 'Уул уурхай болон байгаль орчны нөхөн сэргээлт', descEn: 'Mining and environmental rehabilitation' },
    { id: 2, titleMn: 'Нар-Урт ХХК', titleEn: 'Nar-Urt LLC', descMn: 'Барилга угсралт болон дэд бүтэц', descEn: 'Construction and infrastructure' },
    { id: 3, titleMn: 'Монцемент Билдинг Материалс ХХК', titleEn: 'Moncement LLC', descMn: 'Цементийн бүрэн автомат үйлдвэрлэл', descEn: 'Fully automated cement production' },
    { id: 4, titleMn: 'АНН ХХК', titleEn: 'ANN LLC', descMn: 'Гадаад худалдаа ба ложистик', descEn: 'Foreign trade and logistics' },
    { id: 5, titleMn: 'Ди Кэйтерс ХХК', titleEn: 'De Caterers LLC', descMn: 'Нийтийн хоол ба үйлчилгээ', descEn: 'Catering and services' },
  ]);

  useEffect(() => {
    // Fetch stats and home content if available
    api.get('/public/home')
      .then((res) => {
        if (res?.hero) setHeroData((prev) => ({ ...prev, ...res.hero }));
        if (res?.stats) setStatsData(res.stats);
        if (res?.companies) setCarouselCards(res.companies);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSaveHero = async () => {
    setSaving(true);
    try {
      await api.post('/public/home/hero', heroData);
      notifications.show({
        title: 'Амжилттай хадгаллаа',
        message: 'Нүүр хуудасны Hero баннерын мэдээлэл шинэчлэгдлээ.',
        color: 'teal',
        icon: <Check size={16} />,
      });
    } catch (err) {
      notifications.show({
        title: 'Хадгалахад алдаа гарлаа',
        message: err.message,
        color: 'red',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveStats = async () => {
    setSaving(true);
    try {
      await api.post('/public/home/stats', { stats: statsData });
      notifications.show({
        title: 'Амжилттай хадгаллаа',
        message: 'Статистик үзүүлэлтүүд шинэчлэгдлээ.',
        color: 'teal',
        icon: <Check size={16} />,
      });
    } catch (err) {
      notifications.show({
        title: 'Алдаа',
        message: err.message,
        color: 'red',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Paper p={50} radius="md" align="center">
        <Loader size="lg" />
        <Text mt="md" c="dimmed">Нүүр хуудасны тохиргоог ачаалж байна...</Text>
      </Paper>
    );
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} fw={700}>
            Нүүр хуудас Builder (Home Page Manager)
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Үндсэн нүүр хуудасны видео, үзүүлэлтүүд болон 5 картын мэдээллийг шууд удирдах
          </Text>
        </div>
        <Badge size="lg" variant="light" color="blue">
          Live Editor Active
        </Badge>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab} variant="outline" radius="md">
        <Tabs.List mb="md">
          <Tabs.Tab value="hero" leftSection={<Video size={16} />}>
            Hero Видео & Гарчиг
          </Tabs.Tab>
          <Tabs.Tab value="stats" leftSection={<Grid3x3 size={16} />}>
            Статистик үзүүлэлтүүд
          </Tabs.Tab>
          <Tabs.Tab value="carousel" leftSection={<Building2 size={16} />}>
            5 Картын Carousel
          </Tabs.Tab>
        </Tabs.List>

        {/* Tab 1: Hero Video */}
        <Tabs.Panel value="hero">
          <Card withBorder radius="lg" padding="xl">
            <Stack gap="md">
              <Title order={4}>Hero Видео ба Гарчиг Тохиргоо</Title>
              <TextInput
                label="Видеоны файлын зам эсвэл URL"
                placeholder="/assets/WEB.mp4"
                value={heroData.videoUrl}
                onChange={(e) => setHeroData({ ...heroData, videoUrl: e.target.value })}
              />

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <TextInput
                  label="Үндсэн гарчиг (Монгол)"
                  value={heroData.titleMn}
                  onChange={(e) => setHeroData({ ...heroData, titleMn: e.target.value })}
                />
                <TextInput
                  label="Үндсэн гарчиг (Англи)"
                  value={heroData.titleEn}
                  onChange={(e) => setHeroData({ ...heroData, titleEn: e.target.value })}
                />
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Textarea
                  label="Дэд гарчиг / Танилцуулга (Монгол)"
                  rows={3}
                  value={heroData.subtitleMn}
                  onChange={(e) => setHeroData({ ...heroData, subtitleMn: e.target.value })}
                />
                <Textarea
                  label="Дэд гарчиг / Танилцуулга (Англи)"
                  rows={3}
                  value={heroData.subtitleEn}
                  onChange={(e) => setHeroData({ ...heroData, subtitleEn: e.target.value })}
                />
              </SimpleGrid>

              <Group justify="flex-end" mt="md">
                <Button
                  leftSection={<Save size={16} />}
                  loading={saving}
                  onClick={handleSaveHero}
                  color="blue"
                >
                  Хадгалах
                </Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* Tab 2: Stats Grid */}
        <Tabs.Panel value="stats">
          <Card withBorder radius="lg" padding="xl">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={4}>Статистик Тоонууд</Title>
                <Button
                  size="xs"
                  variant="light"
                  leftSection={<Plus size={14} />}
                  onClick={() =>
                    setStatsData([
                      ...statsData,
                      { id: Date.now().toString(), number: '100+', labelMn: 'Шинэ үзүүлэлт', labelEn: 'New Metric' },
                    ])
                  }
                >
                  Үзүүлэлт нэмэх
                </Button>
              </Group>

              {statsData.map((stat, index) => (
                <Paper key={stat.id || index} withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                  <Group align="flex-end">
                    <TextInput
                      label="Тоон утга / Үзүүлэлт"
                      value={stat.number}
                      style={{ flex: '0.3' }}
                      onChange={(e) => {
                        const next = [...statsData];
                        next[index].number = e.target.value;
                        setStatsData(next);
                      }}
                    />
                    <TextInput
                      label="Тайлбар (Монгол)"
                      value={stat.labelMn}
                      style={{ flex: 1 }}
                      onChange={(e) => {
                        const next = [...statsData];
                        next[index].labelMn = e.target.value;
                        setStatsData(next);
                      }}
                    />
                    <TextInput
                      label="Тайлбар (Англи)"
                      value={stat.labelEn}
                      style={{ flex: 1 }}
                      onChange={(e) => {
                        const next = [...statsData];
                        next[index].labelEn = e.target.value;
                        setStatsData(next);
                      }}
                    />
                    <ActionIcon
                      color="red"
                      variant="light"
                      size="lg"
                      onClick={() => setStatsData(statsData.filter((_, i) => i !== index))}
                    >
                      <Trash2 size={16} />
                    </ActionIcon>
                  </Group>
                </Paper>
              ))}

              <Group justify="flex-end" mt="md">
                <Button
                  leftSection={<Save size={16} />}
                  loading={saving}
                  onClick={handleSaveStats}
                  color="blue"
                >
                  Статистик хадгалах
                </Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* Tab 3: 5 Company Carousel */}
        <Tabs.Panel value="carousel">
          <Card withBorder radius="lg" padding="xl">
            <Stack gap="md">
              <Title order={4}>5 Охин Компанийн Carousel Картууд</Title>
              <Text size="xs" c="dimmed">
                Нүүр хуудасны 3.5 сек автоматаар болон scroll-оор солигддог 5 картын агуулга
              </Text>

              {carouselCards.map((card, index) => (
                <Paper key={card.id || index} withBorder p="lg" radius="md">
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Badge color="blue" variant="filled">
                        Карт #{index + 1}
                      </Badge>
                    </Group>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                      <TextInput
                        label="Компанийн нэр (Монгол)"
                        value={card.titleMn}
                        onChange={(e) => {
                          const next = [...carouselCards];
                          next[index].titleMn = e.target.value;
                          setCarouselCards(next);
                        }}
                      />
                      <TextInput
                        label="Компанийн нэр (Англи)"
                        value={card.titleEn}
                        onChange={(e) => {
                          const next = [...carouselCards];
                          next[index].titleEn = e.target.value;
                          setCarouselCards(next);
                        }}
                      />
                    </SimpleGrid>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                      <Textarea
                        label="Товч тодорхойлолт (Монгол)"
                        rows={2}
                        value={card.descMn}
                        onChange={(e) => {
                          const next = [...carouselCards];
                          next[index].descMn = e.target.value;
                          setCarouselCards(next);
                        }}
                      />
                      <Textarea
                        label="Товч тодорхойлолт (Англи)"
                        rows={2}
                        value={card.descEn}
                        onChange={(e) => {
                          const next = [...carouselCards];
                          next[index].descEn = e.target.value;
                          setCarouselCards(next);
                        }}
                      />
                    </SimpleGrid>
                  </Stack>
                </Paper>
              ))}

              <Group justify="flex-end" mt="md">
                <Button
                  leftSection={<Save size={16} />}
                  loading={saving}
                  onClick={async () => {
                    setSaving(true);
                    try {
                      await api.post('/public/home/companies', { companies: carouselCards });
                      notifications.show({ title: 'Амжилттай', message: 'Картууд хадгалагдлаа.', color: 'teal' });
                    } catch (e) {
                      notifications.show({ title: 'Алдаа', message: e.message, color: 'red' });
                    } finally {
                      setSaving(false);
                    }
                  }}
                  color="blue"
                >
                  Картуудыг Хадгалах
                </Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
