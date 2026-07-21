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
      header={{ height: 68 }}
      navbar={{ width: 270, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="xl"
      bg="#f8fafc"
    >
      <AppShell.Header style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)' }}>
        <Group h="100%" px="lg" justify="space-between" wrap="nowrap">
          <Group gap="md" wrap="nowrap">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <ThemeIcon size={40} radius="xl" variant="gradient" gradient={{ from: 'blue', to: 'indigo', angle: 45 }}>
              <Text fw={800} size="lg" color="white">
                M
              </Text>
            </ThemeIcon>
            <div>
              <Text fw={700} fz={16} lh={1.2} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {t.appName}
              </Text>
              <Text size="xs" c="dimmed" visibleFrom="xs">
                Удирдлагын хяналтын панель
              </Text>
            </div>
          </Group>

          <Menu width={220} position="bottom-end" withArrow shadow="lg">
            <Menu.Target>
              <UnstyledButton style={{ padding: '6px 12px', borderRadius: '12px', backgroundColor: '#f1f5f9', transition: 'background 0.2s' }}>
                <Group gap="xs" wrap="nowrap">
                  <Avatar color="blue" radius="xl" size={32}>
                    {initials(user?.name)}
                  </Avatar>
                  <div style={{ lineHeight: 1.15 }}>
                    <Text size="xs" fw={700} visibleFrom="xs">
                      {user?.name}
                    </Text>
                    <Text size="10px" c="dimmed" visibleFrom="xs">
                      {roleLabel(user?.role)}
                    </Text>
                  </div>
                  <ChevronDown size={14} color="#64748b" />
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

      <AppShell.Navbar p="xs" style={{ borderRight: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
        <Sidebar onNavigate={close} />
      </AppShell.Navbar>

      <AppShell.Main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
