import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Box, NavLink, ScrollArea, Text, Badge, Group, Paper } from '@mantine/core';
import {
  LayoutDashboard,
  Landmark,
  ListOrdered,
  Newspaper,
  Building2,
  Trees,
  Compass,
  FileText,
  Briefcase,
  Inbox,
  UserCog,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { t } from '../../i18n';

const GROUPS = [
  {
    label: 'ХЯНАЛТЫН ТӨВ',
    items: [
      { to: '/', label: 'Дашборд хяналт', icon: LayoutDashboard, badge: 'Live' }
    ],
  },
  {
    label: 'АГУУЛГА & ХУУДСЫН BUILDER',
    items: [
      { to: '/about-builder', label: 'Бидний тухай Builder', icon: Landmark },
      { to: '/home-builder', label: 'Нүүр хуудас Builder', icon: Compass },
      { to: '/companies-builder', label: 'Охин компаниуд Builder', icon: Building2 },
      { to: '/csr-builder', label: 'CSR Тогтвортой хөгжил', icon: Trees },
      { to: '/news', label: 'Мэдээ мэдээлэл', icon: Newspaper },
    ],
  },
  {
    label: 'ХҮНИЙ НӨӨЦ (HR)',
    items: [
      { to: '/jobs', label: 'Ажлын байр зарлах', icon: Briefcase },
      { to: '/applications', label: 'Ажилд орох хүсэлтүүд', icon: Inbox, badge: 'Шинэ' },
    ],
  },
  {
    label: 'ХУДАЛДАН АВАЛТ & ТЕНДЕР',
    items: [
      { to: '/tenders', label: 'Тендерийн систем', icon: FileText },
    ],
  },
  {
    label: 'СИСТЕМ & ТОХИРГОО',
    items: [
      { to: '/navigation-settings', label: 'Цэсний тохиргоо', icon: ListOrdered },
      { to: '/users', label: 'Хэрэглэгчийн эрх', icon: UserCog },
    ],
  },
];

export default function Sidebar({ onNavigate }) {
  const { pathname } = useLocation();

  return (
    <Box style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
      
      <ScrollArea type="scroll" style={{ flex: 1 }}>
        <Box p="xs" py="md">
          {GROUPS.map((group, index) => (
            <Box key={group.label ?? index} mb="lg">
              {group.label && (
                <Text
                  size="10px"
                  tt="uppercase"
                  fw={800}
                  c="#94a3b8"
                  px="xs"
                  pt="xs"
                  pb={6}
                  style={{ letterSpacing: '0.1em' }}
                >
                  {group.label}
                </Text>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    component={RouterNavLink}
                    to={item.to}
                    label={
                      <Group justify="space-between" wrap="nowrap" style={{ width: '100%' }}>
                        <Text size="13px" fw={isActive ? 700 : 500} c={isActive ? '#001CE8' : '#334155'}>
                          {item.label}
                        </Text>
                        {item.badge && (
                          <Badge
                            size="xs"
                            variant={isActive ? 'filled' : 'light'}
                            color={item.badge === 'Live' ? 'green' : 'blue'}
                            radius="xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Group>
                    }
                    leftSection={
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        color={isActive ? '#001CE8' : '#64748b'}
                      />
                    }
                    active={isActive}
                    onClick={onNavigate}
                    styles={{
                      root: {
                        borderRadius: 10,
                        backgroundColor: isActive ? '#eff6ff' : 'transparent',
                        borderLeft: isActive ? '3px solid #001CE8' : '3px solid transparent',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        marginBottom: 3,
                        paddingLeft: 12,
                        '&:hover': {
                          backgroundColor: isActive ? '#eff6ff' : '#f8fafc',
                        },
                      },
                    }}
                  />
                );
              })}
            </Box>
          ))}
        </Box>
      </ScrollArea>

      {/* FOOTER SYSTEM BADGE */}
      <Box p="md" style={{ borderTop: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
        <Paper p="xs" radius="md" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
          <Group gap="xs" wrap="nowrap">
            <ShieldCheck size={18} color="#10b981" />
            <div>
              <Text size="11px" fw={700} c="#0f172a">
                Monpolymet System v2.4
              </Text>
              <Text size="10px" c="dimmed">
                Баталгаажсан Удирдлагын Панель
              </Text>
            </div>
          </Group>
        </Paper>
      </Box>

    </Box>
  );
}
