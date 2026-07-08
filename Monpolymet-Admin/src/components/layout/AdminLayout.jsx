import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Avatar,
  Burger,
  Group,
  Menu,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../../auth/AuthContext';
import { t } from '../../i18n';

function initials(name) {
  if (!name) return 'A';
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}

function roleLabel(role) {
  return role === 'admin' ? 'Админ' : 'Редактор';
}

export default function AdminLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppShell
      header={{ height: 62 }}
      navbar={{ width: 230, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="lg"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <ThemeIcon size={36} radius="md" variant="filled" color="brand">
              <Text fw={800} size="lg">
                M
              </Text>
            </ThemeIcon>
            <div>
              <Text fw={700} lh={1.15}>
                {t.appName}
              </Text>
              <Text size="xs" c="dimmed" visibleFrom="xs">
                {t.appSubtitle}
              </Text>
            </div>
          </Group>

          <Menu width={220} position="bottom-end" withArrow shadow="md">
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs" wrap="nowrap">
                  <Avatar color="brand" radius="xl" size={36}>
                    {initials(user?.name)}
                  </Avatar>
                  <div style={{ lineHeight: 1.15 }}>
                    <Text size="sm" fw={600} visibleFrom="xs">
                      {user?.name}
                    </Text>
                    <Text size="xs" c="dimmed" visibleFrom="xs">
                      {roleLabel(user?.role)}
                    </Text>
                  </div>
                  <ChevronDown size={16} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{user?.email}</Menu.Label>
              <Menu.Item
                leftSection={<LogOut size={16} />}
                color="red"
                onClick={handleLogout}
              >
                {t.topbar.logout}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="sm">
        <Sidebar onNavigate={close} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
