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
  Button,
  Badge,
  Box
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown, LogOut, ExternalLink, ShieldCheck } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../../auth/AuthContext';
import { t } from '../../i18n';

function initials(name) {
  if (!name) return 'A';
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}

function roleLabel(role) {
  return role === 'admin' ? 'Администратор' : 'Редактор';
}

export default function AdminLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleOpenMainWeb = () => {
    window.open('http://localhost:5173', '_blank');
  };

  return (
    <AppShell
      header={{ height: 68 }}
      navbar={{ width: 270, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="xl"
      bg="#f8fafc"
    >
      <AppShell.Header style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)' }}>
        <Group h="100%" px="lg" justify="space-between" wrap="nowrap">
          
          {/* LEFT BRAND HEADER */}
          <Group gap="md" wrap="nowrap">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <ThemeIcon size={42} radius="lg" style={{ background: 'linear-gradient(135deg, #010B40 0%, #001CE8 100%)', color: '#fff' }}>
              <Text fw={900} size="xl" color="white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                M
              </Text>
            </ThemeIcon>
            <div>
              <Group gap="xs" wrap="nowrap">
                <Text fw={800} fz={17} lh={1.1} style={{ fontFamily: "'Montserrat', sans-serif", color: '#0f172a' }}>
                  {t.appName}
                </Text>
                <Badge color="blue" variant="light" size="xs">
                  Admin
                </Badge>
              </Group>
              <Text size="xs" c="dimmed" visibleFrom="xs">
                Удирдлагын хяналтын нэгдсэн панель
              </Text>
            </div>
          </Group>

          {/* RIGHT ACTIONS & PROFILE MENU */}
          <Group gap="md" wrap="nowrap">
            
            {/* VIEW LIVE WEBSITE BUTTON */}
            <Button
              variant="light"
              color="blue"
              radius="md"
              size="xs"
              leftSection={<ExternalLink size={14} />}
              onClick={handleOpenMainWeb}
              visibleFrom="xs"
              style={{ fontWeight: 700 }}
            >
              🌐 Вэбсайт руу орох
            </Button>

            {/* USER PROFILE MENU */}
            <Menu width={220} position="bottom-end" withArrow shadow="lg">
              <Menu.Target>
                <UnstyledButton style={{ padding: '6px 12px', borderRadius: '12px', backgroundColor: '#f1f5f9', transition: 'background 0.2s' }}>
                  <Group gap="xs" wrap="nowrap">
                    <Avatar color="blue" radius="xl" size={32} style={{ backgroundColor: '#001CE8', fontWeight: 700 }}>
                      {initials(user?.name)}
                    </Avatar>
                    <div style={{ lineHeight: 1.15 }}>
                      <Text size="xs" fw={700} c="#0f172a" visibleFrom="xs">
                        {user?.name || 'Админ'}
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
                  style={{ fontWeight: 600 }}
                >
                  {t.topbar.logout}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar style={{ borderRight: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
        <Sidebar onNavigate={close} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
