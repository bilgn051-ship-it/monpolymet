import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Box, NavLink, ScrollArea, Text } from '@mantine/core';
import {
  LayoutDashboard,
  Image,
  Grid3x3,
  Quote,
  Landmark,
  ListOrdered,
  Users,
  History,
  Newspaper,
  Building2,
  Trees,
  ShieldAlert,
  FileDown,
  Compass,
  FileText,
  Briefcase,
  Inbox,
  HelpCircle,
  Settings,
  UserCog,
} from 'lucide-react';
import { t } from '../../i18n';

const GROUPS = [
  {
    label: null,
    items: [{ to: '/', label: 'Дашборд хяналт', icon: LayoutDashboard }],
  },
  {
    label: 'Вэбсайт Builder & Хуудсууд',
    items: [
      { to: '/home-builder', label: 'Нүүр хуудас Builder', icon: Compass },
      { to: '/about-builder', label: 'Бидний тухай Builder', icon: Landmark },
      { to: '/companies-builder', label: 'Компаниуд Builder', icon: Building2 },
      { to: '/csr-builder', label: 'CSR & Тогтвортой хөгжил', icon: Trees },
    ],
  },
  {
    label: 'Мэдээ ба Хэвлэл',
    items: [
      { to: '/news', label: 'Мэдээ нийтлэх', icon: Newspaper },
    ],
  },
  {
    label: 'Хүний нөөц & Ажлын байр',
    items: [
      { to: '/jobs', label: 'Ажлын байр зарлах', icon: Briefcase },
      { to: '/applications', label: 'Ажилд орох хүсэлтүүд', icon: Inbox },
    ],
  },
  {
    label: 'Систем & Тохиргоо',
    items: [
      { to: '/navigation-settings', label: 'Цэсний тохиргоо', icon: ListOrdered },
      { to: '/users', label: 'Хэрэглэгчдийн эрх', icon: UserCog },
    ],
  },
];

export default function Sidebar({ onNavigate }) {
  const { pathname } = useLocation();

  return (
    <ScrollArea type="scroll" style={{ height: '100%' }}>
      <Box p="xs">
        {GROUPS.map((group, index) => (
          <Box key={group.label ?? index} mb="lg">
            {group.label && (
              <Text
                size="11px"
                tt="uppercase"
                fw={700}
                c="#94a3b8"
                px="sm"
                pt="xs"
                pb={6}
                style={{ letterSpacing: '0.08em' }}
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
                  label={item.label}
                  leftSection={
                    <Icon
                      size={18}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      color={isActive ? '#3b82f6' : '#64748b'}
                    />
                  }
                  active={isActive}
                  onClick={onNavigate}
                  styles={{
                    root: {
                      borderRadius: 10,
                      backgroundColor: isActive ? '#eff6ff' : 'transparent',
                      color: isActive ? '#1d4ed8' : '#334155',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: isActive ? '#eff6ff' : '#f1f5f9',
                      },
                    },
                    label: { fontSize: '13px', lineHeight: 1.4 },
                  }}
                  mb={4}
                />
              );
            })}
          </Box>
        ))}
      </Box>
    </ScrollArea>
  );
}
