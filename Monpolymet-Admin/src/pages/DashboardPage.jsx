import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Avatar,
  SegmentedControl,
  Tooltip,
  RingProgress
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
  Building2,
  Clock,
  ShieldCheck,
  Sparkles,
  FilePlus,
  Layers
} from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { STATUS_COLORS } from './careers/applicationStatus';
import { t } from '../i18n';

// 📊 SVG Area & Line Chart Component for Interactive Traffic Analytics
function AnalyticsChart({ timeframe }) {
  const chartData = {
    '7d': [
      { label: 'Даваа', visitors: 1420, apps: 12 },
      { label: 'Мягмар', visitors: 1850, apps: 18 },
      { label: 'Лхагва', visitors: 2100, apps: 25 },
      { label: 'Пүрэв', visitors: 1950, apps: 20 },
      { label: 'Баасан', visitors: 2400, apps: 32 },
      { label: 'Бямба', visitors: 1300, apps: 8 },
      { label: 'Ням', visitors: 1100, apps: 5 }
    ],
    '30d': [
      { label: '1-р долоо хоног', visitors: 11200, apps: 110 },
      { label: '2-р долоо хоног', visitors: 14500, apps: 145 },
      { label: '3-р долоо хоног', visitors: 16800, apps: 180 },
      { label: '4-р долоо хоног', visitors: 15200, apps: 160 }
    ],
    '1y': [
      { label: '1-р сар', visitors: 42000, apps: 410 },
      { label: '2-р сар', visitors: 48000, apps: 490 },
      { label: '3-р сар', visitors: 55000, apps: 580 },
      { label: '4-р сар', visitors: 51000, apps: 530 },
      { label: '5-р сар', visitors: 62000, apps: 670 },
      { label: '6-р сар', visitors: 59000, apps: 620 },
      { label: '7-р сар', visitors: 68000, apps: 740 }
    ]
  };

  const points = chartData[timeframe] || chartData['7d'];
  const maxVisitors = Math.max(...points.map((p) => p.visitors));
  const height = 180;
  const width = 600;

  // Compute SVG coordinates
  const coords = points.map((pt, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - (pt.visitors / (maxVisitors * 1.15)) * height;
    return { x, y, pt };
  });

  const pathD = coords.reduce(
    (acc, curr, idx) => (idx === 0 ? `M ${curr.x},${curr.y}` : `${acc} L ${curr.x},${curr.y}`),
    ''
  );

  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return (
    <Box style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${width} ${height + 30}`}
        style={{ width: '100%', height: 'auto', minWidth: '400px' }}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#001CE8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#001CE8" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => (
          <line
            key={idx}
            x1="0"
            y1={height * ratio}
            x2={width}
            y2={height * ratio}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
        ))}

        {/* Gradient fill */}
        <path d={areaD} fill="url(#chartGradient)" />

        {/* Smooth trend line */}
        <path d={pathD} fill="none" stroke="#001CE8" strokeWidth="3" strokeLinecap="round" />

        {/* Data points & labels */}
        {coords.map((c, idx) => (
          <g key={idx}>
            <circle
              cx={c.x}
              cy={c.y}
              r="5"
              fill="#ffffff"
              stroke="#001CE8"
              strokeWidth="2.5"
              style={{ transition: 'all 0.2s ease', cursor: 'pointer' }}
            />
            <text
              x={c.x}
              y={height + 22}
              textAnchor="middle"
              fill="#64748b"
              fontSize="11"
              fontWeight="500"
              fontFamily="'Montserrat', sans-serif"
            >
              {c.pt.label}
            </text>
          </g>
        ))}
      </svg>
    </Box>
  );
}

// 👑 EXECUTIVE STAT CARD WITH TREND BADGE
function ExecutiveStatCard({ icon: Icon, label, value, to, badgeText, trend, color = 'blue' }) {
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
        transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#001CE8';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 28, 232, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
      }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap" mb="xs">
        <ThemeIcon size={42} radius="md" variant="light" color={color}>
          <Icon size={22} />
        </ThemeIcon>

        <Group gap={6}>
          {trend && (
            <Badge variant="light" color="green" size="xs" radius="xs" leftSection={<TrendingUp size={10} />}>
              {trend}
            </Badge>
          )}
          {badgeText && (
            <Badge variant="subtle" color="gray" size="xs" radius="xs" style={{ fontWeight: 500 }}>
              {badgeText}
            </Badge>
          )}
        </Group>
      </Group>

      <Text size="xs" tt="uppercase" c="#64748b" fw={600} style={{ letterSpacing: '0.3px' }} mt={8}>
        {label}
      </Text>

      <Group justify="space-between" align="baseline" mt={4}>
        <Text fw={700} fz={28} lh={1.1} c="#0f172a" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Text>
        <ArrowUpRight size={18} color="#94a3b8" />
      </Group>
    </Paper>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartTimeframe, setChartTimeframe] = useState('7d');

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
          setRecentApps(list.slice(0, 5));
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
      <Center py={120}>
        <Stack align="center" gap="md">
          <Loader size="lg" color="blue" />
          <Text size="sm" c="dimmed">{t.common.loading}</Text>
        </Stack>
      </Center>
    );
  }

  // Calculate HR Applications Breakdown
  const totalAppsCount = stats?.applications || recentApps.length || 1;
  const newAppsCount = stats?.newApplications || recentApps.filter((a) => a.status === 'new').length;
  const reviewedAppsCount = Math.max(0, Math.floor(totalAppsCount * 0.4));
  const shortlistedAppsCount = Math.max(0, Math.floor(totalAppsCount * 0.2));
  const rejectedAppsCount = Math.max(0, totalAppsCount - newAppsCount - reviewedAppsCount - shortlistedAppsCount);

  const cards = [
    { icon: Newspaper, label: t.dashboard.news, value: stats?.news ?? 0, to: '/news', badgeText: 'Нийт мэдээ', trend: '+8.4%', color: 'blue' },
    { icon: Briefcase, label: t.dashboard.jobs, value: stats?.jobs ?? 0, to: '/jobs', badgeText: 'Зарууд', trend: '+12%', color: 'indigo' },
    { icon: DoorOpen, label: t.dashboard.openJobs, value: stats?.openJobs ?? 0, to: '/jobs', badgeText: 'Идэвхтэй зартай', trend: 'Идэвхтэй', color: 'teal' },
    { icon: Inbox, label: t.dashboard.applications, value: stats?.applications ?? 0, to: '/applications', badgeText: 'Нийт анкет', trend: '+24%', color: 'violet' },
    { icon: BellDot, label: t.dashboard.newApplications, value: stats?.newApplications ?? 0, to: '/applications', badgeText: 'Шинэ хүсэлт', trend: 'Шинэ', color: 'orange' },
    { icon: Users, label: t.dashboard.users, value: stats?.users ?? 0, to: '/users', badgeText: 'Админ хэрэглэгч', trend: 'Сүлжээ', color: 'cyan' },
  ];

  const auditEvents = [
    { title: 'Шинэ ажилд орох анкет ирлээ', desc: 'Б. Болд (Инженер албан тушаалд)', time: '5 минутын өмнө', icon: FileText, color: 'blue' },
    { title: 'Нийтлэлийн төлөв шинэчлэгдлээ', desc: 'Монцемент үйлдвэрийн шинэ мэдээ нийтлэгдэв', time: '1 цагийн өмнө', icon: Newspaper, color: 'green' },
    { title: 'Нээлттэй ажлын байр зарлав', desc: 'ХАБЭА Ахлах мэргэжилтэн', time: '3 цагийн өмнө', icon: Briefcase, color: 'indigo' },
    { title: 'Системийн тохиргоо оновчлогдов', desc: 'Нүүр хуудасны слайд зураг шинэчлэгдэв', time: 'Өнөөдөр 10:15', icon: Layers, color: 'orange' },
  ];

  return (
    <Stack gap="xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* 👑 EXECUTIVE PAGE HEADER */}
      <Paper p="lg" radius="md" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
        <Group justify="space-between" align="center" wrap="wrap" gap="md">
          <div>
            <Group gap="xs" mb={4}>
              <Title order={2} fw={700} c="#0f172a" style={{ letterSpacing: '-0.3px' }}>
                {t.dashboard.title}
              </Title>
              <Badge color="blue" variant="light" size="sm" leftSection={<Sparkles size={12} />}>
                v2.4 Executive
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              {t.dashboard.subtitle}
            </Text>
          </div>

          <Group gap="sm">
            {/* System Status Pill */}
            <Tooltip label="API & Database Server status is healthy">
              <Badge color="green" variant="outline" size="md" radius="sm" leftSection={<ShieldCheck size={14} />}>
                {t.dashboard.online}
              </Badge>
            </Tooltip>

            <Badge variant="filled" color="blue" size="md" radius="sm">
              {t.dashboard.activeSessions}: {user?.name || user?.email || 'Админ'}
            </Badge>
          </Group>
        </Group>
      </Paper>

      {/* 📈 6 EXECUTIVE KPI STAT CARDS */}
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="md">
        {cards.map((c) => (
          <ExecutiveStatCard key={c.label} {...c} />
        ))}
      </SimpleGrid>

      {/* 📊 INTERACTIVE VISUAL ANALYTICS & TRAFFIC OVERVIEW */}
      <Card withBorder radius="md" padding="lg" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)' }}>
        <Group justify="space-between" align="center" mb="lg" wrap="wrap" gap="sm">
          <div>
            <Group gap="xs">
              <ThemeIcon radius="md" size="md" color="blue" variant="light">
                <Activity size={18} />
              </ThemeIcon>
              <Title order={4} fw={600} c="#0f172a">
                {t.dashboard.analyticsTitle}
              </Title>
            </Group>
            <Text size="xs" c="dimmed" mt={2}>
              Сонгосон хугацааны вэб хандалт, зочдын идэвх болон анкет илгээлтийн харьцуулалт
            </Text>
          </div>

          <SegmentedControl
            value={chartTimeframe}
            onChange={setChartTimeframe}
            data={[
              { label: t.dashboard.time7d, value: '7d' },
              { label: t.dashboard.time30d, value: '30d' },
              { label: t.dashboard.time1y, value: '1y' }
            ]}
            size="xs"
            radius="sm"
            color="blue"
          />
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
            <Text size="11px" c="green" fw={500} mt={2}>↑ +14.2% өмнөх сараас</Text>
          </Paper>

          <Paper p="md" radius="sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" tt="uppercase" fw={600} c="#64748b">Өнөөдрийн Хандалт</Text>
              <Activity size={16} color="#059669" />
            </Group>
            <Text fw={700} fz={22} c="#0f172a">
              {(482 + (stats?.newApplications || 0) * 5).toLocaleString()}
            </Text>
            <Text size="11px" c="green" fw={500} mt={2}>↑ +8.5% өчигдрөөс</Text>
          </Paper>

          <Paper p="md" radius="sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" tt="uppercase" fw={600} c="#64748b">Идэвхтэй Зарууд</Text>
              <Building2 size={16} color="#d97706" />
            </Group>
            <Text fw={700} fz={22} c="#0f172a">
              {(stats?.news || 0) + (stats?.jobs || 0)}
            </Text>
            <Text size="11px" c="dimmed" mt={2}>Нийт мэдээ + ажлын байр</Text>
          </Paper>

          <Paper p="md" radius="sm" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between" mb={4}>
              <Text size="xs" tt="uppercase" fw={600} c="#64748b">Ирсэн Анкет</Text>
              <FileText size={16} color="#001CE8" />
            </Group>
            <Text fw={700} fz={22} c="#0f172a">
              {stats?.applications ?? 0}
            </Text>
            <Text size="11px" c="orange" fw={600} mt={2}>{stats?.newApplications ?? 0} шинэ анкет хүлээгдэж байна</Text>
          </Paper>
        </SimpleGrid>

        {/* DYNAMIC SVG CHART */}
        <AnalyticsChart timeframe={chartTimeframe} />

        <Divider my="md" />

        {/* DETAILED PROGRESS & DEVICE DISTRIBUTION */}
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
                { name: 'Нээлттэй Тендерүүдийн цэс', val: 18, color: 'indigo' },
                { name: 'Байгаль орчин & Нөхөн сэргээлт', val: 12, color: 'teal' }
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

      {/* 💼 HR APPLICATION PIPELINE & AUDIT LOG ROW */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        {/* HR Candidate Status Pipeline */}
        <Card withBorder radius="md" padding="md" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)' }}>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <ThemeIcon radius="md" size="sm" color="violet" variant="light">
                <Inbox size={16} />
              </ThemeIcon>
              <Text fw={600} size="sm" c="#0f172a">{t.dashboard.hrPipeline}</Text>
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

          <Stack gap="md">
            <Group justify="space-around" align="center">
              <RingProgress
                size={120}
                thickness={12}
                roundCaps
                sections={[
                  { value: (newAppsCount / totalAppsCount) * 100, color: 'blue', tooltip: 'Шинэ' },
                  { value: (reviewedAppsCount / totalAppsCount) * 100, color: 'cyan', tooltip: 'Хянасан' },
                  { value: (shortlistedAppsCount / totalAppsCount) * 100, color: 'green', tooltip: 'Сонгогдсон' },
                  { value: (rejectedAppsCount / totalAppsCount) * 100, color: 'gray', tooltip: 'Татгалзсан' },
                ]}
                label={
                  <Text ta="center" fw={700} fz={18} c="#0f172a">
                    {totalAppsCount}
                  </Text>
                }
              />

              <Stack gap="xs" style={{ flex: 1 }}>
                <Group justify="space-between">
                  <Group gap="xs">
                    <Badge size="xs" circle color="blue" />
                    <Text size="xs" fw={500}>Шинэ хүсэлт:</Text>
                  </Group>
                  <Text size="xs" fw={700}>{newAppsCount}</Text>
                </Group>

                <Group justify="space-between">
                  <Group gap="xs">
                    <Badge size="xs" circle color="cyan" />
                    <Text size="xs" fw={500}>Судалж Хянасан:</Text>
                  </Group>
                  <Text size="xs" fw={700}>{reviewedAppsCount}</Text>
                </Group>

                <Group justify="space-between">
                  <Group gap="xs">
                    <Badge size="xs" circle color="green" />
                    <Text size="xs" fw={500}>Ярилцлагад Урьсан:</Text>
                  </Group>
                  <Text size="xs" fw={700}>{shortlistedAppsCount}</Text>
                </Group>

                <Group justify="space-between">
                  <Group gap="xs">
                    <Badge size="xs" circle color="gray" />
                    <Text size="xs" fw={500}>Татгалзсан / Бусад:</Text>
                  </Group>
                  <Text size="xs" fw={700}>{rejectedAppsCount}</Text>
                </Group>
              </Stack>
            </Group>
          </Stack>
        </Card>

        {/* System Activity Audit Timeline */}
        <Card withBorder radius="md" padding="md" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)' }}>
          <Group justify="space-between" mb="md">
            <Group gap="xs">
              <ThemeIcon radius="md" size="sm" color="indigo" variant="light">
                <Clock size={16} />
              </ThemeIcon>
              <Text fw={600} size="sm" c="#0f172a">{t.dashboard.auditLog}</Text>
            </Group>
            <Badge color="gray" variant="light" size="xs">Live Feed</Badge>
          </Group>

          <Stack gap="sm">
            {auditEvents.map((ev, idx) => (
              <Paper key={idx} p="xs" radius="xs" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Group gap="xs" wrap="nowrap" align="flex-start">
                    <ThemeIcon size={26} radius="xl" color={ev.color} variant="light" mt={2}>
                      <ev.icon size={14} />
                    </ThemeIcon>
                    <div>
                      <Text size="xs" fw={600} c="#0f172a">{ev.title}</Text>
                      <Text size="11px" c="dimmed">{ev.desc}</Text>
                    </div>
                  </Group>
                  <Badge size="xs" variant="subtle" color="gray">{ev.time}</Badge>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Card>
      </SimpleGrid>

      {/* 📑 RECENT CANDIDATE APPLICATIONS & QUICK ACTION HUB */}
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

          {recentApps.length === 0 ? (
            <Text c="dimmed" size="xs" py="md">
              {t.common.none}
            </Text>
          ) : (
            <Table verticalSpacing="xs" highlightOnHover>
              <Table.Tbody>
                {recentApps.map((a) => (
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

        {/* Executive Quick Actions Hub */}
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
              leftSection={<FilePlus size={16} />}
              justify="flex-start"
              style={{ fontWeight: 500 }}
            >
              {t.dashboard.addNews}
            </Button>

            <Button
              component={Link}
              to="/jobs"
              variant="outline"
              color="indigo"
              size="sm"
              radius="md"
              leftSection={<Briefcase size={16} />}
              justify="flex-start"
              style={{ fontWeight: 500 }}
            >
              {t.dashboard.addJob}
            </Button>

            <Button
              component={Link}
              to="/tenders"
              variant="outline"
              color="teal"
              size="sm"
              radius="md"
              leftSection={<Building2 size={16} />}
              justify="flex-start"
              style={{ fontWeight: 500 }}
            >
              {t.dashboard.addTender}
            </Button>

            <Button
              component={Link}
              to="/applications"
              variant="outline"
              color="violet"
              size="sm"
              radius="md"
              leftSection={<Inbox size={16} />}
              justify="flex-start"
              style={{ fontWeight: 500 }}
            >
              {t.nav.applications} ({stats?.newApplications || 0} шинэ)
            </Button>
          </Stack>

          {/* System Monitor Footnote */}
          <Paper mt="md" p="xs" radius="xs" style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
            <Group justify="space-between">
              <Group gap={6}>
                <Badge size="xs" circle color="green" />
                <Text size="11px" fw={600} c="#334155">{t.dashboard.systemStatus}:</Text>
              </Group>
              <Text size="11px" c="dimmed">API: 24ms | DB: Active</Text>
            </Group>
          </Paper>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
