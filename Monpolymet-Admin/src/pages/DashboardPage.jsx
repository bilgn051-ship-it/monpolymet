import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  Newspaper,
  Briefcase,
  DoorOpen,
  Inbox,
  BellDot,
  Users,
  Plus,
} from 'lucide-react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { formatDate } from '../lib/format';
import { STATUS_COLORS } from './careers/applicationStatus';
import { t } from '../i18n';

function StatCard({ icon: Icon, label, value, color, to }) {
  return (
    <Paper
      component={Link}
      to={to}
      withBorder
      radius="md"
      p="lg"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <div>
          <Text size="xs" tt="uppercase" c="dimmed" fw={700}>
            {label}
          </Text>
          <Text fw={800} fz={30} lh={1.1} mt={4}>
            {value}
          </Text>
        </div>
        <ThemeIcon size={44} radius="md" variant="light" color={color}>
          <Icon size={22} />
        </ThemeIcon>
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
    Promise.all([api.get('/dashboard/stats'), api.get('/applications')])
      .then(([s, apps]) => {
        setStats(s);
        setRecent(apps.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Center py={80}>
        <Loader />
      </Center>
    );
  }

  const cards = [
    { icon: Newspaper, label: t.dashboard.news, value: stats?.news ?? 0, color: 'blue', to: '/news' },
    { icon: Briefcase, label: t.dashboard.jobs, value: stats?.jobs ?? 0, color: 'grape', to: '/jobs' },
    { icon: DoorOpen, label: t.dashboard.openJobs, value: stats?.openJobs ?? 0, color: 'teal', to: '/jobs' },
    { icon: Inbox, label: t.dashboard.applications, value: stats?.applications ?? 0, color: 'indigo', to: '/applications' },
    { icon: BellDot, label: t.dashboard.newApplications, value: stats?.newApplications ?? 0, color: 'red', to: '/applications' },
    { icon: Users, label: t.dashboard.users, value: stats?.users ?? 0, color: 'orange', to: '/users' },
  ];

  return (
    <Stack gap="lg">
      <div>
        <Title order={2} fw={700}>
          {t.dashboard.welcome}, {user?.name} 👋
        </Title>
        <Text c="dimmed" size="sm" mt={4}>
          {t.dashboard.subtitle}
        </Text>
      </div>

      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} spacing="md">
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Card withBorder radius="md" padding="lg">
          <Group justify="space-between" mb="sm">
            <Text fw={700}>{t.dashboard.recentApplications}</Text>
            <Button
              component={Link}
              to="/applications"
              size="xs"
              variant="subtle"
            >
              {t.dashboard.viewAll}
            </Button>
          </Group>
          {recent.length === 0 ? (
            <Text c="dimmed" size="sm" py="md">
              {t.common.none}
            </Text>
          ) : (
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Tbody>
                {recent.map((a) => (
                  <Table.Tr key={a._id}>
                    <Table.Td>
                      <Text fw={600} size="sm">
                        {a.name}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {a.position}
                      </Text>
                    </Table.Td>
                    <Table.Td w={110} ta="right">
                      <Badge
                        variant="light"
                        color={STATUS_COLORS[a.status] ?? 'gray'}
                        size="sm"
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

        <Card withBorder radius="md" padding="lg">
          <Text fw={700} mb="sm">
            {t.dashboard.quickActions}
          </Text>
          <Stack gap="sm">
            <Button
              component={Link}
              to="/news"
              variant="light"
              leftSection={<Plus size={16} />}
              justify="flex-start"
            >
              {t.dashboard.addNews}
            </Button>
            <Button
              component={Link}
              to="/jobs"
              variant="light"
              color="grape"
              leftSection={<Plus size={16} />}
              justify="flex-start"
            >
              {t.dashboard.addJob}
            </Button>
            <Button
              component={Link}
              to="/applications"
              variant="light"
              color="indigo"
              leftSection={<Inbox size={16} />}
              justify="flex-start"
            >
              {t.nav.applications}
            </Button>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
