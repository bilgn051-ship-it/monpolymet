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
  ActionIcon,
  Modal,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  Save,
  Quote,
  Landmark,
  ListOrdered,
  History,
  Users,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import { api } from '../../api/client';

export default function AboutBuilder() {
  const [activeTab, setActiveTab] = useState('ceo');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // States
  const [ceoData, setCeoData] = useState({
    titleMn: 'Үүсгэн байгуулагчийн мэндчилгээ',
    titleEn: "Message from Founder",
    quoteMn: 'Мэргэжлийн хүний хувьд газрын хэвлийгээр хэн дуртайнь оролдох нь мэргэжилгүй хүн мэс засал хийж байгаатайадил гэж үздэг...',
    quoteEn: 'Dear clients and partners, welcome to Monpolymet Group...',
    nameMn: 'Ц.Гарамжав',
    nameEn: 'Garamjav Ts.',
    roleMn: 'Үүсгэн байгуулагч, ТУЗ-ийн Дарга, Монгол Улсын Хөдөлмөрийн Баатар',
    roleEn: 'Founder, Chairwoman of the Board, Hero of Labor of Mongolia',
    imageUrl: '/garamjav.png',
  });

  const [groupIntro, setGroupIntro] = useState({
    titleMn: 'Группийн танилцуулга',
    titleEn: 'Group Introduction',
    textMn: 'Монполимет Групп нь 1992 онд байгуулагдсан. Уул уурхай, байгаль орчны нөхөн сэргээлт, барилгын материал үйлдвэрлэл, барилга байгууламж, гадаад худалдааны чиглэлээр үйл ажиллагаа явуулж буй үндэсний үйлдвэрлэгч – хөрөнгө оруулагч компани юм.',
    textEn: 'Monpolymet Group was established in 1992...',
  });

  const [timelineItems, setTimelineItems] = useState([
    { year: '1992', titleMn: 'Компани үүсгэн байгуулагдсан', titleEn: 'Company Founded', descMn: 'Уул уурхайн чиглэлээр үйл ажиллагаагаа эхлүүлсэн.', descEn: 'Started operations in mining sector.' },
    { year: '2005', titleMn: 'Нөхөн сэргээлтээр тэргүүлэгч', titleEn: 'Leader in Restoration', descMn: 'Тосон үйлдвэрт эко нөхөн сэргээлтийг нэвтрүүлсэн.', descEn: 'Introduced eco-restoration at Toson plant.' },
    { year: '2016', titleMn: 'Монцемент үйлдвэр ашиглалтад орсон', titleEn: 'Moncement Plant Commissioned', descMn: 'Европын стандартын бүрэн автомат үйлдвэр.', descEn: 'Fully automated European standard plant.' },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { nameMn: 'Ц.Гарамжав', nameEn: 'Garamjav Ts.', roleMn: 'Үүсгэн байгуулагч, ТУЗ-ийн Дарга', roleEn: 'Founder, Chairwoman', imageUrl: '/garamjav.png' },
    { nameMn: 'Н.Мөнхнасан', nameEn: 'Munkhnasan N.', roleMn: 'СЕО, Гүйцэтгэх захирал', roleEn: 'CEO', imageUrl: '/monhnasan.png' },
    { nameMn: 'Б.Дельгэр', nameEn: 'Delger B.', roleMn: 'Тэргүүн дэд захирал', roleEn: 'First Deputy Director', imageUrl: '/dosh.png' },
    { nameMn: 'Ц.Халиун', nameEn: 'Haliun Ts.', roleMn: 'Дэд захирал', roleEn: 'Deputy Director', imageUrl: '/haliun.png' },
  ]);

  useEffect(() => {
    Promise.all([
      api.get('/about-content').catch(() => null),
      api.get('/timeline').catch(() => []),
      api.get('/team').catch(() => []),
    ]).then(([aboutRes, timelineRes, teamRes]) => {
      if (aboutRes) {
        setCeoData({
          titleMn: aboutRes.ceoTitle?.mn || 'Үүсгэн байгуулагчийн мэндчилгээ',
          titleEn: aboutRes.ceoTitle?.en || 'Message from Founder',
          quoteMn: aboutRes.ceoQuote?.mn || '',
          quoteEn: aboutRes.ceoQuote?.en || '',
          nameMn: aboutRes.ceoName?.mn || 'Ц.Гарамжав',
          nameEn: aboutRes.ceoName?.en || 'Garamjav Ts.',
          roleMn: aboutRes.ceoRole?.mn || '',
          roleEn: aboutRes.ceoRole?.en || '',
          imageUrl: aboutRes.ceoImage || '/garamjav.png',
        });
        setGroupIntro({
          titleMn: aboutRes.introTitle?.mn || 'Группийн танилцуулга',
          titleEn: aboutRes.introTitle?.en || 'Group Introduction',
          textMn: aboutRes.introText?.mn || '',
          textEn: aboutRes.introText?.en || '',
        });
      }
      if (Array.isArray(timelineRes) && timelineRes.length > 0) {
        setTimelineItems(
          timelineRes.map((t) => ({
            id: t._id,
            year: t.year,
            titleMn: t.title?.mn || '',
            titleEn: t.title?.en || '',
            descMn: t.description?.mn || '',
            descEn: t.description?.en || '',
          }))
        );
      }
      if (Array.isArray(teamRes) && teamRes.length > 0) {
        setTeamMembers(
          teamRes.map((m) => ({
            id: m._id,
            nameMn: m.name?.mn || '',
            nameEn: m.name?.en || '',
            roleMn: m.role?.mn || '',
            roleEn: m.role?.en || '',
            imageUrl: m.image || '/garamjav.png',
          }))
        );
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleSaveCeo = async () => {
    setSaving(true);
    try {
      await api.patch('/about-content', {
        ceoTitle: { mn: ceoData.titleMn, en: ceoData.titleEn },
        ceoQuote: { mn: ceoData.quoteMn, en: ceoData.quoteEn },
        ceoName: { mn: ceoData.nameMn, en: ceoData.nameEn },
        ceoRole: { mn: ceoData.roleMn, en: ceoData.roleEn },
        ceoImage: ceoData.imageUrl,
      });
      notifications.show({ title: 'Амжилттай', message: 'Үүсгэн байгуулагчийн мэндчилгээ бааз руу хадгалагдлаа.', color: 'teal', icon: <Check size={16} /> });
    } catch (e) {
      notifications.show({ title: 'Алдаа', message: e.message, color: 'red' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveIntro = async () => {
    setSaving(true);
    try {
      await api.patch('/about-content', {
        introTitle: { mn: groupIntro.titleMn, en: groupIntro.titleEn },
        introText: { mn: groupIntro.textMn, en: groupIntro.textEn },
      });
      notifications.show({ title: 'Амжилттай', message: 'Группийн танилцуулга бааз руу хадгалагдлаа.', color: 'teal' });
    } catch (e) {
      notifications.show({ title: 'Алдаа', message: e.message, color: 'red' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTimeline = async () => {
    setSaving(true);
    try {
      await api.post('/public/about/timeline', { timeline: timelineItems });
      notifications.show({ title: 'Амжилттай', message: 'Түүхэн замнал шинэчлэгдлээ.', color: 'teal' });
    } catch (e) {
      notifications.show({ title: 'Алдаа', message: e.message, color: 'red' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTeam = async () => {
    setSaving(true);
    try {
      await api.post('/public/about/team', { team: teamMembers });
      notifications.show({ title: 'Амжилттай', message: 'Удирдлагын баг шинэчлэгдлээ.', color: 'teal' });
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
        <Text mt="md" c="dimmed">Бидний тухай тохиргоог ачаалж байна...</Text>
      </Paper>
    );
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} fw={700}>
            Бидний тухай Builder (About Page Manager)
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Үүсгэн байгуулагчийн мэндчилгээ, Группийн танилцуулга, Түүхэн замнал болон Удирдлагуудыг засах
          </Text>
        </div>
        <Badge size="lg" variant="light" color="teal">
          About Editor Active
        </Badge>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab} variant="outline" radius="md">
        <Tabs.List mb="md">
          <Tabs.Tab value="ceo" leftSection={<Quote size={16} />}>
            Үүсгэн байгуулагчийн мэндчилгээ
          </Tabs.Tab>
          <Tabs.Tab value="intro" leftSection={<Landmark size={16} />}>
            Группийн танилцуулга
          </Tabs.Tab>
          <Tabs.Tab value="timeline" leftSection={<History size={16} />}>
            Түүхэн замнал (Timeline)
          </Tabs.Tab>
          <Tabs.Tab value="team" leftSection={<Users size={16} />}>
            Удирдлагын баг (Leadership)
          </Tabs.Tab>
        </Tabs.List>

        {/* Tab 1: CEO Greeting */}
        <Tabs.Panel value="ceo">
          <Card withBorder radius="lg" padding="xl">
            <Stack gap="md">
              <Title order={4}>Үүсгэн байгуулагчийн мэндчилгээ Засах</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                <TextInput
                  label="Нэр (Монгол)"
                  value={ceoData.nameMn}
                  onChange={(e) => setCeoData({ ...ceoData, nameMn: e.target.value })}
                />
                <TextInput
                  label="Нэр (Англи)"
                  value={ceoData.nameEn}
                  onChange={(e) => setCeoData({ ...ceoData, nameEn: e.target.value })}
                />
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, md: 2 }}>
                <TextInput
                  label="Албан тушаал / Алдар цол (Монгол)"
                  value={ceoData.roleMn}
                  onChange={(e) => setCeoData({ ...ceoData, roleMn: e.target.value })}
                />
                <TextInput
                  label="Албан тушаал / Алдар цол (Англи)"
                  value={ceoData.roleEn}
                  onChange={(e) => setCeoData({ ...ceoData, roleEn: e.target.value })}
                />
              </SimpleGrid>

              <Textarea
                label="Мэндчилгээний текст (Монгол)"
                rows={5}
                value={ceoData.quoteMn}
                onChange={(e) => setCeoData({ ...ceoData, quoteMn: e.target.value })}
              />

              <Textarea
                label="Мэндчилгээний текст (Англи)"
                rows={5}
                value={ceoData.quoteEn}
                onChange={(e) => setCeoData({ ...ceoData, quoteEn: e.target.value })}
              />

              <TextInput
                label="Зургийн зам / URL"
                value={ceoData.imageUrl}
                onChange={(e) => setCeoData({ ...ceoData, imageUrl: e.target.value })}
              />

              <Group justify="flex-end" mt="md">
                <Button leftSection={<Save size={16} />} loading={saving} onClick={handleSaveCeo} color="teal">
                  Мэндчилгээ хадгалах
                </Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* Tab 2: Group Intro */}
        <Tabs.Panel value="intro">
          <Card withBorder radius="lg" padding="xl">
            <Stack gap="md">
              <Title order={4}>Группийн танилцуулга засах</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                <TextInput
                  label="Гарчиг (Монгол)"
                  value={groupIntro.titleMn}
                  onChange={(e) => setGroupIntro({ ...groupIntro, titleMn: e.target.value })}
                />
                <TextInput
                  label="Гарчиг (Англи)"
                  value={groupIntro.titleEn}
                  onChange={(e) => setGroupIntro({ ...groupIntro, titleEn: e.target.value })}
                />
              </SimpleGrid>

              <Textarea
                label="Танилцуулга эх сурвалж (Монгол)"
                rows={4}
                value={groupIntro.textMn}
                onChange={(e) => setGroupIntro({ ...groupIntro, textMn: e.target.value })}
              />
              <Textarea
                label="Танилцуулга эх сурвалж (Англи)"
                rows={4}
                value={groupIntro.textEn}
                onChange={(e) => setGroupIntro({ ...groupIntro, textEn: e.target.value })}
              />

              <Group justify="flex-end" mt="md">
                <Button leftSection={<Save size={16} />} loading={saving} onClick={handleSaveIntro} color="teal">
                  Танилцуулга хадгалах
                </Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* Tab 3: Timeline */}
        <Tabs.Panel value="timeline">
          <Card withBorder radius="lg" padding="xl">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={4}>Түүхэн замнал (Timeline)</Title>
                <Button
                  size="xs"
                  variant="light"
                  leftSection={<Plus size={14} />}
                  onClick={() =>
                    setTimelineItems([
                      ...timelineItems,
                      { year: '2026', titleMn: 'Шинэ амжилт', titleEn: 'New Milestone', descMn: 'Мэдээлэл бичих...', descEn: 'Details...' },
                    ])
                  }
                >
                  Жил / Түүх нэмэх
                </Button>
              </Group>

              {timelineItems.map((item, index) => (
                <Paper key={index} withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                  <Stack gap="xs">
                    <Group align="center">
                      <TextInput
                        label="Он / Жил"
                        value={item.year}
                        style={{ width: '120px' }}
                        onChange={(e) => {
                          const next = [...timelineItems];
                          next[index].year = e.target.value;
                          setTimelineItems(next);
                        }}
                      />
                      <TextInput
                        label="Гарчиг (Монгол)"
                        style={{ flex: 1 }}
                        value={item.titleMn}
                        onChange={(e) => {
                          const next = [...timelineItems];
                          next[index].titleMn = e.target.value;
                          setTimelineItems(next);
                        }}
                      />
                      <ActionIcon
                        color="red"
                        variant="light"
                        size="lg"
                        onClick={() => setTimelineItems(timelineItems.filter((_, i) => i !== index))}
                      >
                        <Trash2 size={16} />
                      </ActionIcon>
                    </Group>
                    <Textarea
                      label="Дэлгэрэнгүй тайлбар (Монгол)"
                      rows={2}
                      value={item.descMn}
                      onChange={(e) => {
                        const next = [...timelineItems];
                        next[index].descMn = e.target.value;
                        setTimelineItems(next);
                      }}
                    />
                  </Stack>
                </Paper>
              ))}

              <Group justify="flex-end" mt="md">
                <Button leftSection={<Save size={16} />} loading={saving} onClick={handleSaveTimeline} color="teal">
                  Түүхэн замнал хадгалах
                </Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        {/* Tab 4: Team */}
        <Tabs.Panel value="team">
          <Card withBorder radius="lg" padding="xl">
            <Stack gap="md">
              <Group justify="space-between">
                <Title order={4}>Удирдлагын баг (Executive Leadership)</Title>
                <Button
                  size="xs"
                  variant="light"
                  leftSection={<Plus size={14} />}
                  onClick={() =>
                    setTeamMembers([
                      ...teamMembers,
                      { nameMn: 'Шинэ гишүүн', nameEn: 'New Member', roleMn: 'Албан тушаал', roleEn: 'Position', imageUrl: '/dosh.png' },
                    ])
                  }
                >
                  Удирдлага нэмэх
                </Button>
              </Group>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                {teamMembers.map((member, index) => (
                  <Paper key={index} withBorder p="md" radius="md">
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Group>
                          <Image src={member.imageUrl} w={40} h={40} radius="xl" fallbackSrc="https://via.placeholder.com/40" />
                          <Text fw={700} size="sm">{member.nameMn}</Text>
                        </Group>
                        <ActionIcon
                          color="red"
                          variant="light"
                          onClick={() => setTeamMembers(teamMembers.filter((_, i) => i !== index))}
                        >
                          <Trash2 size={16} />
                        </ActionIcon>
                      </Group>
                      <TextInput
                        label="Нэр (Монгол)"
                        value={member.nameMn}
                        onChange={(e) => {
                          const next = [...teamMembers];
                          next[index].nameMn = e.target.value;
                          setTeamMembers(next);
                        }}
                      />
                      <TextInput
                        label="Албан тушаал (Монгол)"
                        value={member.roleMn}
                        onChange={(e) => {
                          const next = [...teamMembers];
                          next[index].roleMn = e.target.value;
                          setTeamMembers(next);
                        }}
                      />
                      <TextInput
                        label="Зургийн файл / URL"
                        value={member.imageUrl}
                        onChange={(e) => {
                          const next = [...teamMembers];
                          next[index].imageUrl = e.target.value;
                          setTeamMembers(next);
                        }}
                      />
                    </Stack>
                  </Paper>
                ))}
              </SimpleGrid>

              <Group justify="flex-end" mt="md">
                <Button leftSection={<Save size={16} />} loading={saving} onClick={handleSaveTeam} color="teal">
                  Удирдлагуудыг хадгалах
                </Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
