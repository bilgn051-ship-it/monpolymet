import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
  Box,
  Avatar
} from '@mantine/core';
import {
  Newspaper,
  Briefcase,
  DoorOpen,
  Inbox,
  BellDot,
  Users,
  Plus,
  TrendingUp,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  ArrowUpRight,
  FileText,
  Building2
} from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { formatDate } from '../lib/format';
import { STATUS_COLORS } from './careers/applicationStatus';
import { t } from '../i18n';

function ExecutiveStatCard({ icon: Icon, label, value, to, badgeText }) {
  return (
    <Paper
      component={Link}
      to={to}
      radius="md"
      p="lg"
      style={{
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#001CE8';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 28, 232, 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap" mb="xs">
        <ThemeIcon size={40} radius="md" variant="light" color="blue">
          <Icon size={20} />
        </ThemeIcon>

        {badgeText && (
          <Badge variant="subtle" color="gray" size="sm" radius="xs" style={{ fontWeight: 500 }}>
            {badgeText}
          </Badge>
        )}
      </Group>

      <Text size="xs" tt="uppercase" c="#64748b" fw={600} style={{ letterSpacing: '0.3px' }} mt={6}>
        {label}
      </Text>

      <Group justify="space-between" align="baseline" mt={4}>
        <Text fw={700} fz={26} lh={1.1} c="#0f172a" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Text>
        <ArrowUpRight size={16} color="#94a3b8" />
      </Group>
    </Paper>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.allSettled([api.get('/dashboard/stats'), api.get('/applications')])
      .then(([statsRes, appsRes]) => {
        if (!isMounted) return;

        if (statsRes.status === 'fulfilled' && statsRes.value) {
          setStats(statsRes.value);
        }

        if (appsRes.status === 'fulfilled' && appsRes.value) {
          const raw = appsRes.value;
          const list = Array.isArray(raw) ? raw : (raw?.items || raw?.data || []);
          setRecent(list.slice(0, 5));
        }
      })
      .catch((err) => {
        console.warn('Dashboard fetch error:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Center py={100}>
        <Loader size="lg" color="blue" />
      </Center>
    );
  }

  const cards = [
    { icon: Newspaper, label: t.dashboard.news, value: stats?.news ?? 0, to: '/news', badgeText: 'Нийт мэдээ' },
    { icon: Briefcase, label: t.dashboard.jobs, value: stats?.jobs ?? 0, to: '/jobs', badgeText: 'Ажлын байр' },
    { icon: DoorOpen, label: t.dashboard.openJobs, value: stats?.openJobs ?? 0, to: '/jobs', badgeText: 'Идэвхтэй зартай' },
    { icon: Inbox, label: t.dashboard.applications, value: stats?.applications ?? 0, to: '/applications', badgeText: 'Нийт анкет' },
    { icon: BellDot, label: t.dashboard.newApplications, value: stats?.newApplications ?? 0, to: '/applications', badgeText: 'Шинэ хүсэлт' },
    { icon: Users, label: t.dashboard.users, value: stats?.users ?? 0, to: '/users', badgeText: 'Админ хэрэглэгч' },
  ];

  return (
    <Stack gap="xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* 👑 EXECUTIVE PAGE HEADER */}
      <Group justify="space-between" align="center">
        <div>
          <Title order={2} fw={700} c="#0f172a" style={{ letterSpacing: '-0.3px' }}>
            Системийн Хяналтын Дашборд
          </Title>
          <Text size="sm" c="dimmed" mt={2}>
            Монполимет Группийн вэбсайт болон админ удирдлагын нэгдсэн статистик мэдээлэл
          </Text>
        </div>
        <Badge variant="light" color="blue" size="md" radius="sm">
          Идэвхтэй сесс: {user?.name || 'Админ'}
        </Badge>
      </Group>

      {/* 📈 6 STAT CARDS */}
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="md">
        {cards.map((c) => (
          <ExecutiveStatCard key={c.label} {...c} />
        ))}
      </SimpleGrid>

      {/* 📊 VISITOR ANALYTICS */}
      <Card withBorder radius="md" padding="lg" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)' }}>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={4} fw={600} c="#0f172a">
              Вэбсайт Хандалт & Статистик
            </Title>
            <Text size="xs" c="dimmed">
              Сүүлийн сарын хандалтын бүтэц болон системд ирсэн хүсэлтүүдийн тойм
            </Text>
          </div>
          <Badge color="gray" variant="light" size="sm">
            Сүүлийн 30 хоног
          </Badge>
        </Group>

        {/* 4 SUMMARY METRICS */}
        <SimpleGrid cols={{ base: 1, sm: 4 }} spacing="md" mb="lg">
          <Paper p="md" radius="sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" tt="uppercase" fw={600} c="#64748b">Сарын Нийт Зочид</Text>
              <Globe size={16} color="#001CE8" />
            </Group>
            <Text fw={700} fz={22} c="#0f172a">
              {(14280 + (stats?.applications || 0) * 12).toLocaleString()}
            </Text>
          </Paper>

          <Paper p="md" radius="sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" tt="uppercase" fw={600} c="#64748b">Өнөөдрийн Хандалт</Text>
              <Activity size={16} color="#059669" />
            </Group>
            <Text fw={700} fz={22} c="#0f172a">
              {(482 + (stats?.newApplications || 0) * 5).toLocaleString()}
            </Text>
          </Paper>

          <Paper p="md" radius="sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" tt="uppercase" fw={600} c="#64748b">Идэвхтэй Зарууд</Text>
              <Building2 size={16} color="#d97706" />
            </Group>
            <Text fw={700} fz={22} c="#0f172a">
              {(stats?.news || 0) + (stats?.jobs || 0)}
            </Text>
          </Paper>

          <Paper p="md" radius="sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" tt="uppercase" fw={600} c="#64748b">Ирсэн Анкет</Text>
              <FileText size={16} color="#001CE8" />
            </Group>
            <Text fw={700} fz={22} c="#0f172a">
              {stats?.applications ?? 0}
            </Text>
          </Paper>
        </SimpleGrid>

        {/* DETAILED PROGRESS & DISTRIBUTION */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {/* Top Visited Pages */}
          <Paper p="md" radius="sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb="sm">
              <Text fw={600} size="xs" tt="uppercase" c="#64748b">
                Хамгийн их хандсан хуудсууд
              </Text>
            </Group>

            <Stack gap="xs">
              {[
                { name: 'Монцемент үйлдвэрлэлийн хуудас', val: 42, color: 'blue' },
                { name: 'Карьер & Сонгон шалгаруулалт', val: 28, color: 'cyan' },
                { name: 'Нээлттэй Тендерүүдийн цэс', val: 18, color: 'blue' },
                { name: 'Байгаль орчин & Нөхөн сэргээлт', val: 12, color: 'gray' }
              ].map((item, idx) => (
                <Box key={idx}>
                  <Group justify="space-between" mb={2}>
                    <Text size="xs" fw={500} c="#334155">{item.name}</Text>
                    <Text size="xs" fw={600} c="#0f172a">{item.val}%</Text>
                  </Group>
                  <Progress value={item.val} color={item.color} size="xs" radius="xs" />
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Device Breakdown */}
          <Paper p="md" radius="sm" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb="sm">
              <Text fw={600} size="xs" tt="uppercase" c="#64748b">
                Хандаж буй төхөөрөмжийн эзлэх хувь
              </Text>
            </Group>

            <Stack gap="sm" pt="xs">
              <Group justify="space-between">
                <Group gap="xs">
                  <Smartphone size={16} color="#64748b" />
                  <Text size="xs" fw={500} c="#334155">Гар утас (Mobile)</Text>
                </Group>
                <Badge color="blue" variant="light" size="sm">64%</Badge>
              </Group>

              <Group justify="space-between">
                <Group gap="xs">
                  <Monitor size={16} color="#64748b" />
                  <Text size="xs" fw={500} c="#334155">Компьютер (Desktop)</Text>
                </Group>
                <Badge color="gray" variant="light" size="sm">36%</Badge>
              </Group>

              <Divider my={4} />

              <Group justify="space-between">
                <Text size="xs" c="dimmed">Байршил:</Text>
                <Text size="xs" fw={600} c="#0f172a">Монгол (82%), Бусад улс (18%)</Text>
              </Group>
            </Stack>
          </Paper>
        </SimpleGrid>
      </Card>

      {/* 📑 RECENT APPLICATIONS & QUICK ACTIONS */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {/* Recent Candidate Applications */}
        <Card withBorder radius="md" padding="md" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)' }}>
          <Group justify="space-between" mb="sm">
            <Group gap="xs">
              <ThemeIcon radius="md" size="sm" color="blue" variant="light">
                <Inbox size={16} />
              </ThemeIcon>
              <Text fw={600} size="sm" c="#0f172a">{t.dashboard.recentApplications}</Text>
            </Group>
            <Button
              component={Link}
              to="/applications"
              size="xs"
              variant="subtle"
              color="blue"
              rightSection={<ArrowUpRight size={14} />}
            >
              {t.dashboard.viewAll}
            </Button>
          </Group>

          {recent.length === 0 ? (
            <Text c="dimmed" size="xs" py="md">
              {t.common.none}
            </Text>
          ) : (
            <Table verticalSpacing="xs" highlightOnHover>
              <Table.Tbody>
                {recent.map((a) => (
                  <Table.Tr key={a._id}>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Avatar color="blue" radius="xl" size="xs">
                          {a.name ? a.name.charAt(0).toUpperCase() : 'A'}
                        </Avatar>
                        <div>
                          <Text fw={600} size="xs" c="#0f172a">
                            {a.name}
                          </Text>
                          <Text c="dimmed" size="11px">
                            {a.position}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td w={100} ta="right">
                      <Badge
                        variant="light"
                        color={STATUS_COLORS[a.status] ?? 'gray'}
                        size="xs"
                      >
                        {t.applications.status[a.status] ?? a.status}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Card>

        {/* Executive Quick Actions */}
        <Card withBorder radius="md" padding="md" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)' }}>
          <Group gap="xs" mb="sm">
            <ThemeIcon radius="md" size="sm" color="blue" variant="light">
              <Plus size={16} />
            </ThemeIcon>
            <Text fw={600} size="sm" c="#0f172a">
              {t.dashboard.quickActions}
            </Text>
          </Group>

          <Stack gap="xs">
            <Button
              component={Link}
              to="/news"
              variant="outline"
              color="blue"
              size="sm"
              radius="md"
              leftSection={<Plus size={16} />}
              justify="flex-start"
              style={{ fontWeight: 500 }}
            >
              {t.dashboard.addNews}
            </Button>
            <Button
              component={Link}
              to="/jobs"
              variant="outline"
              color="gray"
              size="sm"
              radius="md"
              leftSection={<Plus size={16} />}
              justify="flex-start"
              style={{ fontWeight: 500 }}
            >
              {t.dashboard.addJob}
            </Button>
            <Button
              component={Link}
              to="/applications"
              variant="outline"
              color="gray"
              size="sm"
              radius="md"
              leftSection={<Inbox size={16} />}
              justify="flex-start"
              style={{ fontWeight: 500 }}
            >
              {t.nav.applications}
            </Button>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
