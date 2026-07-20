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
    items: [{ to: '/', label: t.nav.dashboard, icon: LayoutDashboard }],
  },
  {
    label: t.nav.groupHome,
    items: [
      { to: '/hero-slides', label: t.nav.heroSlides, icon: Image },
      { to: '/stat-cards', label: t.nav.statCards, icon: Grid3x3 },
      { to: '/ceo-section', label: t.nav.ceoSection, icon: Quote },
    ],
  },
  {
    label: t.nav.groupAbout,
    items: [
      { to: '/about-content', label: t.nav.aboutContent, icon: Landmark },
      { to: '/core-values', label: t.nav.coreValues, icon: ListOrdered },
      { to: '/timeline', label: t.nav.timeline, icon: History },
      { to: '/team', label: t.nav.team, icon: Users },
    ],
  },
  {
    label: t.nav.groupContent,
    items: [
      { to: '/news', label: t.nav.news, icon: Newspaper },
      { to: '/sectors', label: t.nav.sectors, icon: Building2 },
      { to: '/csr-initiatives', label: t.nav.csr, icon: Trees },
      { to: '/hse-content', label: t.nav.hseContent, icon: ShieldAlert },
      { to: '/hse-documents', label: t.nav.hseDocuments, icon: FileDown },
      { to: '/tour-scenes', label: t.nav.tourScenes, icon: Compass },
    ],
  },

  {
    label: t.nav.groupSystem,
    items: [
      { to: '/pages', label: t.nav.pages, icon: FileText },
      { to: '/careers-content', label: 'Ажлын байр баннер', icon: FileText },
      { to: '/navigation-settings', label: 'Цэсний тохиргоо', icon: ListOrdered },
      { to: '/settings', label: t.nav.settings, icon: Settings },
      { to: '/users', label: t.nav.users, icon: UserCog },
    ],
  },
];

export default function Sidebar({ onNavigate }) {
  const { pathname } = useLocation();

  return (
    <ScrollArea type="scroll" style={{ height: '100%' }}>
      {GROUPS.map((group, index) => (
        <Box key={group.label ?? index} mb={4}>
          {group.label && (
            <Text
              size="10px"
              tt="uppercase"
              fw={700}
              c="dimmed"
              px="sm"
              pt="xs"
              pb={2}
              style={{ letterSpacing: '0.05em' }}
            >
              {group.label}
            </Text>
          )}
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                component={RouterNavLink}
                to={item.to}
                label={item.label}
                leftSection={<Icon size={16} strokeWidth={1.8} />}
                active={pathname === item.to}
                onClick={onNavigate}
                variant="filled"
                styles={{
                  label: { fontSize: '12.5px', fontWeight: 500 }
                }}
                style={{ borderRadius: 6 }}
                mb={1}
              />
            );
          })}
        </Box>
      ))}
    </ScrollArea>
  );
}
