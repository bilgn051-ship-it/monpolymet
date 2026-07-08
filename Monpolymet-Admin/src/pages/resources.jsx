import { Badge, Text } from '@mantine/core';
import { t } from '../i18n';

/* ── shared option sets ─────────────────────────────────────────── */
const PAGE_OPTIONS = [
  { value: 'home', label: 'Нүүр хуудас' },
  { value: 'about', label: 'Бидний тухай' },
  { value: 'sectors', label: 'Салбар компаниуд' },
  { value: 'csr', label: 'Нийгмийн хариуцлага' },
  { value: 'hse', label: 'ХАБЭА' },
  { value: 'careers', label: 'Ажлын байр' },
  { value: 'tour', label: 'Виртуал аялал' },
  { value: 'media', label: 'Мэдээ мэдээлэл' },
];
const MEDIA_TYPES = [
  { value: 'image', label: 'Зураг' },
  { value: 'video', label: 'Видео' },
];
const VARIANTS = [
  { value: 'standard', label: 'Энгийн' },
  { value: 'tall', label: 'Өндөр' },
  { value: 'ticker', label: 'Тикер' },
];
const COLOR_THEMES = [
  { value: 'white', label: 'Цагаан' },
  { value: 'light-blue', label: 'Цэнхэр' },
  { value: 'orange', label: 'Улбар шар' },
  { value: 'beige', label: 'Бежин' },
  { value: 'dark', label: 'Бараан' },
];
const CTA_STYLES = [
  { value: 'primary', label: 'Үндсэн' },
  { value: 'secondary', label: 'Хоёрдогч' },
];
const SOCIAL_PLATFORMS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
];
const ROLES = [
  { value: 'admin', label: 'Админ' },
  { value: 'editor', label: 'Редактор' },
];

/* ── column render helpers ──────────────────────────────────────── */
const mn = (key) => (item) => (
  <Text size="sm" fw={600} lineClamp={1}>
    {item[key]?.mn}
  </Text>
);
const plain = (key) => (item) => item[key];
const activeBadge = (item) => (
  <Badge variant="light" color={item.isActive ? 'teal' : 'gray'}>
    {item.isActive ? t.common.active : t.common.inactive}
  </Badge>
);

/* ── LIST collections ───────────────────────────────────────────── */
export const LIST_RESOURCES = {
  'hero-slides': {
    path: '/hero-slides',
    title: t.nav.heroSlides,
    subtitle: 'Нүүр хуудасны баннер слайдууд',
    addLabel: 'Слайд нэмэх',
    createLabel: 'Шинэ слайд',
    editLabel: 'Слайд засах',
    columns: [
      { label: 'Гарчиг', render: mn('title') },
      { label: 'Дараалал', render: plain('order') },
      { label: t.common.status, render: activeBadge },
    ],
    fields: [
      { name: 'mediaType', type: 'select', label: 'Медиа төрөл', options: MEDIA_TYPES, required: true, default: 'image' },
      { name: 'mediaUrl', type: 'url', label: 'Медиа холбоос (URL)', required: true, placeholder: 'https://...' },
      { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
      { name: 'subtitle', type: 'localizedArea', label: 'Дэд гарчиг', required: true },
      {
        name: 'ctas',
        type: 'objectList',
        label: 'Товчлуурууд (CTA)',
        fields: [
          { name: 'label', type: 'localized', label: 'Товчны нэр', required: true },
          { name: 'targetPage', type: 'select', label: 'Чиглэх хуудас', options: PAGE_OPTIONS, required: true, default: 'about' },
          { name: 'style', type: 'select', label: 'Загвар', options: CTA_STYLES, default: 'primary' },
        ],
      },
      { name: 'order', type: 'number', label: 'Дараалал' },
      { name: 'isActive', type: 'switch', label: 'Идэвхтэй', default: true },
    ],
  },

  'stat-cards': {
    path: '/stat-cards',
    title: t.nav.statCards,
    subtitle: 'Нүүр хуудасны статистик картууд',
    addLabel: 'Карт нэмэх',
    createLabel: 'Шинэ карт',
    editLabel: 'Карт засах',
    columns: [
      { label: 'Гарчиг', render: mn('title') },
      { label: 'Утга', render: plain('statValue') },
      { label: t.common.status, render: activeBadge },
    ],
    fields: [
      { name: 'variant', type: 'select', label: 'Хэлбэр', options: VARIANTS, required: true, default: 'standard' },
      { name: 'icon', type: 'text', label: 'Icon (lucide нэр)', placeholder: 'Leaf, Award, Users…' },
      { name: 'statValue', type: 'text', label: 'Тоон утга', placeholder: '1,000+ га' },
      { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
      { name: 'description', type: 'localizedArea', label: 'Тайлбар', required: true },
      { name: 'colorTheme', type: 'select', label: 'Өнгө', options: COLOR_THEMES, default: 'white' },
      { name: 'targetPage', type: 'select', label: 'Чиглэх хуудас', options: PAGE_OPTIONS },
      { name: 'imageUrl', type: 'url', label: 'Зураг (Өндөр хэлбэрт)', placeholder: 'https://...' },
      { name: 'order', type: 'number', label: 'Дараалал' },
      { name: 'isActive', type: 'switch', label: 'Идэвхтэй', default: true },
    ],
  },

  'core-values': {
    path: '/core-values',
    title: t.nav.coreValues,
    subtitle: 'Бидний тухай хуудасны үнэт зүйлс',
    addLabel: 'Үнэт зүйл нэмэх',
    createLabel: 'Шинэ үнэт зүйл',
    editLabel: 'Үнэт зүйл засах',
    columns: [
      { label: 'Нэр', render: mn('title') },
      { label: 'Icon', render: plain('icon') },
      { label: 'Дараалал', render: plain('order') },
    ],
    fields: [
      { name: 'title', type: 'localized', label: 'Нэр', required: true },
      { name: 'description', type: 'localizedArea', label: 'Тайлбар', required: true },
      { name: 'icon', type: 'text', label: 'Icon (lucide нэр)', placeholder: 'ShieldAlert, Leaf…' },
      { name: 'order', type: 'number', label: 'Дараалал' },
    ],
  },

  timeline: {
    path: '/timeline',
    title: t.nav.timeline,
    subtitle: 'Компанийн түүхэн замналын үйл явдлууд',
    addLabel: 'Үйл явдал нэмэх',
    createLabel: 'Шинэ үйл явдал',
    editLabel: 'Үйл явдал засах',
    columns: [
      { label: 'Он', render: plain('year') },
      { label: 'Гарчиг', render: mn('title') },
      { label: 'Дараалал', render: plain('order') },
    ],
    fields: [
      { name: 'year', type: 'text', label: 'Он (жишээ: 1993)', required: true },
      { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
      { name: 'description', type: 'localizedArea', label: 'Тайлбар', required: true },
      { name: 'order', type: 'number', label: 'Дараалал' },
    ],
  },

  team: {
    path: '/team',
    title: t.nav.team,
    subtitle: 'Удирдлагын багийн гишүүд',
    addLabel: 'Гишүүн нэмэх',
    createLabel: 'Шинэ гишүүн',
    editLabel: 'Гишүүн засах',
    columns: [
      { label: 'Нэр', render: mn('name') },
      { label: 'Албан тушаал', render: mn('role') },
      {
        label: 'Тэргүүн',
        render: (item) =>
          item.isFounder ? <Badge variant="light" color="brand">Тийм</Badge> : '—',
      },
    ],
    fields: [
      { name: 'name', type: 'localized', label: 'Нэр', required: true },
      { name: 'role', type: 'localized', label: 'Албан тушаал', required: true },
      { name: 'bio', type: 'localizedArea', label: 'Намтар' },
      { name: 'education', type: 'localized', label: 'Боловсрол' },
      { name: 'imageUrl', type: 'url', label: 'Зураг (URL)', required: true, placeholder: 'https://...' },
      { name: 'isFounder', type: 'switch', label: 'Үүсгэн байгуулагч / Тэргүүн' },
      { name: 'order', type: 'number', label: 'Дараалал' },
    ],
  },

  sectors: {
    path: '/sectors',
    title: t.nav.sectors,
    subtitle: 'Салбар компаниуд ба чиглэлүүд',
    addLabel: 'Салбар нэмэх',
    createLabel: 'Шинэ салбар',
    editLabel: 'Салбар засах',
    columns: [
      { label: 'Нэр', render: mn('title') },
      { label: 'Slug', render: plain('slug') },
      { label: t.common.status, render: activeBadge },
    ],
    fields: [
      { name: 'slug', type: 'text', label: 'Slug (тогтмол ID)', required: true, placeholder: 'moncement' },
      { name: 'title', type: 'localized', label: 'Нэр', required: true },
      { name: 'description', type: 'localizedArea', label: 'Тайлбар', required: true },
      { name: 'projects', type: 'localized', label: 'Хэрэгжүүлсэн төслүүд', required: true },
      { name: 'websiteUrl', type: 'url', label: 'Вэбсайт (URL)', required: true, placeholder: 'https://...' },
      { name: 'icon', type: 'text', label: 'Icon (lucide нэр)', placeholder: 'Factory, HardHat…' },
      { name: 'imageUrl', type: 'url', label: 'Зураг (URL)', required: true, placeholder: 'https://...' },
      { name: 'logoUrl', type: 'image', label: 'Компанийн лого (PNG/SVG, ил тод дэвсгэртэй)' },
      {
        name: 'metrics',
        type: 'objectList',
        label: 'Гол үзүүлэлтүүд',
        fields: [
          { name: 'label', type: 'localized', label: 'Нэр', required: true },
          { name: 'value', type: 'localized', label: 'Утга', required: true },
        ],
      },
      { name: 'highlights', type: 'localizedList', label: 'Онцлох давуу талууд' },
      { name: 'order', type: 'number', label: 'Дараалал' },
      { name: 'isActive', type: 'switch', label: 'Идэвхтэй', default: true },
    ],
  },

  'csr-initiatives': {
    path: '/csr-initiatives',
    title: t.nav.csr,
    subtitle: 'Нийгмийн хариуцлагын үйл ажиллагаа',
    addLabel: 'Санаачилга нэмэх',
    createLabel: 'Шинэ санаачилга',
    editLabel: 'Санаачилга засах',
    columns: [
      { label: 'Гарчиг', render: mn('title') },
      { label: 'Дараалал', render: plain('order') },
      { label: t.common.status, render: activeBadge },
    ],
    fields: [
      { name: 'icon', type: 'text', label: 'Icon (lucide нэр)', placeholder: 'Trees, HeartHandshake…' },
      { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
      { name: 'description', type: 'localizedArea', label: 'Тайлбар', required: true },
      { name: 'imageUrl', type: 'url', label: 'Зураг (URL)', required: true, placeholder: 'https://...' },
      {
        name: 'stats',
        type: 'objectList',
        label: 'Тоон үзүүлэлтүүд',
        fields: [
          { name: 'value', type: 'text', label: 'Утга', required: true, placeholder: '15,000+' },
          { name: 'label', type: 'localized', label: 'Нэр', required: true },
        ],
      },
      { name: 'order', type: 'number', label: 'Дараалал' },
      { name: 'isActive', type: 'switch', label: 'Идэвхтэй', default: true },
    ],
  },

  'hse-documents': {
    path: '/hse-documents',
    title: t.nav.hseDocuments,
    subtitle: 'Татаж авах ХАБЭА-н баримт бичгүүд',
    addLabel: 'Баримт нэмэх',
    createLabel: 'Шинэ баримт',
    editLabel: 'Баримт засах',
    columns: [
      { label: 'Гарчиг', render: mn('title') },
      { label: 'Төрөл', render: plain('fileType') },
      { label: 'Хэмжээ', render: plain('fileSize') },
    ],
    fields: [
      { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
      { name: 'fileUrl', type: 'url', label: 'Файлын холбоос (URL)', required: true, placeholder: '/docs/...' },
      { name: 'fileSize', type: 'text', label: 'Файлын хэмжээ', required: true, placeholder: '2.4 MB' },
      { name: 'fileType', type: 'text', label: 'Файлын төрөл', placeholder: 'PDF' },
      { name: 'order', type: 'number', label: 'Дараалал' },
    ],
  },

  'tour-scenes': {
    path: '/tour-scenes',
    title: t.nav.tourScenes,
    subtitle: '360° виртуал аялалын дүрс',
    addLabel: 'Дүрс нэмэх',
    createLabel: 'Шинэ дүрс',
    editLabel: 'Дүрс засах',
    columns: [
      { label: 'Нэр', render: mn('title') },
      { label: 'Slug', render: plain('slug') },
      { label: t.common.status, render: activeBadge },
    ],
    fields: [
      { name: 'slug', type: 'text', label: 'Slug (тогтмол ID)', required: true, placeholder: 'toson' },
      { name: 'title', type: 'localized', label: 'Нэр', required: true },
      { name: 'panoramaUrl', type: 'url', label: 'Панорама зураг (URL)', required: true, placeholder: 'https://...' },
      { name: 'order', type: 'number', label: 'Дараалал' },
      { name: 'isActive', type: 'switch', label: 'Идэвхтэй', default: true },
    ],
  },

  faqs: {
    path: '/faqs',
    title: t.nav.faqs,
    subtitle: 'Ажлын байрны түгээмэл асуултууд',
    addLabel: 'Асуулт нэмэх',
    createLabel: 'Шинэ асуулт',
    editLabel: 'Асуулт засах',
    columns: [
      { label: 'Асуулт', render: mn('question') },
      { label: 'Дараалал', render: plain('order') },
    ],
    fields: [
      { name: 'question', type: 'localized', label: 'Асуулт', required: true },
      { name: 'answer', type: 'localizedArea', label: 'Хариулт', required: true },
      { name: 'order', type: 'number', label: 'Дараалал' },
    ],
  },

  pages: {
    path: '/pages',
    title: t.nav.pages,
    subtitle: 'Хуудасны толгой хэсэг ба SEO мета',
    addLabel: 'Хуудас нэмэх',
    createLabel: 'Шинэ хуудас',
    editLabel: 'Хуудас засах',
    columns: [
      { label: 'Түлхүүр', render: plain('key') },
      { label: 'Навигацийн нэр', render: mn('navLabel') },
      { label: t.common.status, render: activeBadge },
    ],
    fields: [
      { name: 'key', type: 'select', label: 'Хуудасны түлхүүр', options: PAGE_OPTIONS, required: true, default: 'about' },
      { name: 'navLabel', type: 'localized', label: 'Навигацийн нэр', required: true },
      {
        name: 'header',
        type: 'group',
        label: 'Толгой хэсэг',
        fields: [
          { name: 'tag', type: 'localized', label: 'Таг' },
          { name: 'title', type: 'localized', label: 'Гарчиг' },
          { name: 'subtitle', type: 'localizedArea', label: 'Дэд гарчиг' },
        ],
      },
      {
        name: 'seo',
        type: 'group',
        label: 'SEO мета',
        fields: [
          { name: 'title', type: 'localized', label: 'SEO гарчиг' },
          { name: 'description', type: 'localizedArea', label: 'SEO тайлбар' },
        ],
      },
      { name: 'isActive', type: 'switch', label: 'Идэвхтэй', default: true },
    ],
  },

  users: {
    path: '/users',
    title: t.nav.users,
    subtitle: 'Админ самбарын хэрэглэгчид',
    addLabel: 'Хэрэглэгч нэмэх',
    createLabel: 'Шинэ хэрэглэгч',
    editLabel: 'Хэрэглэгч засах',
    columns: [
      { label: 'Нэр', render: plain('name') },
      { label: 'И-мэйл', render: plain('email') },
      {
        label: 'Эрх',
        render: (item) => (
          <Badge variant="light" color={item.role === 'admin' ? 'brand' : 'gray'}>
            {item.role === 'admin' ? 'Админ' : 'Редактор'}
          </Badge>
        ),
      },
    ],
    fields: [
      { name: 'name', type: 'text', label: 'Нэр', required: true },
      { name: 'email', type: 'text', label: 'И-мэйл', required: true, placeholder: 'user@monpolymet.mn' },
      { name: 'password', type: 'password', label: 'Нууц үг (шинэ бол заавал)', placeholder: '••••••••' },
      { name: 'role', type: 'select', label: 'Эрх', options: ROLES, default: 'editor' },
      { name: 'isActive', type: 'switch', label: 'Идэвхтэй', default: true },
    ],
  },
};

/* ── SINGLETON pages ────────────────────────────────────────────── */
export const SINGLETON_RESOURCES = {
  'ceo-section': {
    path: '/home-content',
    title: t.nav.ceoSection,
    subtitle: 'Нүүр хуудасны удирдлагын мэндчилгээ',
    fields: [
      {
        name: 'ceoSection',
        type: 'group',
        label: 'Удирдлагын мэндчилгээ',
        fields: [
          { name: 'sectionTitle', type: 'localized', label: 'Хэсгийн гарчиг', required: true },
          { name: 'quote', type: 'localizedArea', label: 'Мэндчилгээ / Ишлэл', required: true },
          { name: 'name', type: 'localized', label: 'Нэр', required: true },
          { name: 'role', type: 'localized', label: 'Албан тушаал', required: true },
          { name: 'imageUrl', type: 'image', label: 'Зураг', required: true },
        ],
      },
    ],
  },

  'about-content': {
    path: '/about-content',
    title: t.nav.aboutContent,
    subtitle: 'Бидний тухай хуудасны бүтэцтэй агуулга',
    fields: [
      {
        name: 'intro',
        type: 'group',
        label: 'Танилцуулга',
        fields: [
          { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
          { name: 'text', type: 'localizedArea', label: 'Текст', required: true },
          { name: 'imageUrl', type: 'url', label: 'Зураг (URL)', required: true, placeholder: 'https://...' },
        ],
      },
      {
        name: 'vision',
        type: 'group',
        label: 'Алсын хараа',
        fields: [
          { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
          { name: 'text', type: 'localizedArea', label: 'Текст', required: true },
        ],
      },
      {
        name: 'mission',
        type: 'group',
        label: 'Эрхэм зорилго',
        fields: [
          { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
          { name: 'text', type: 'localizedArea', label: 'Текст', required: true },
        ],
      },
      { name: 'valuesTitle', type: 'localized', label: 'Үнэт зүйлсийн гарчиг', required: true },
      { name: 'historyTitle', type: 'localized', label: 'Түүхийн гарчиг', required: true },
      { name: 'leadershipTitle', type: 'localized', label: 'Удирдлагын гарчиг', required: true },
      {
        name: 'leadershipGreeting',
        type: 'group',
        label: 'Удирдлагын мэндчилгээ',
        fields: [
          { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
          { name: 'text', type: 'localizedArea', label: 'Текст', required: true },
        ],
      },
    ],
  },

  'hse-content': {
    path: '/hse-content',
    title: t.nav.hseContent,
    subtitle: 'ХАБЭА хуудасны гарчиг ба бодлогын жагсаалт',
    fields: [
      { name: 'policiesTitle', type: 'localized', label: 'Бодлогын гарчиг', required: true },
      { name: 'policies', type: 'localizedList', label: 'Бодлогын жагсаалт' },
      { name: 'documentsTitle', type: 'localized', label: 'Баримт бичгийн гарчиг', required: true },
    ],
  },

  'careers-content': {
    path: '/careers-content',
    title: t.nav.careersContent,
    subtitle: 'Ажлын байр хуудасны бүтэцтэй агуулга',
    fields: [
      {
        name: 'whyUs',
        type: 'group',
        label: 'Яагаад бид гэж?',
        fields: [
          { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
          { name: 'text', type: 'localizedArea', label: 'Текст', required: true },
          { name: 'imageUrl', type: 'url', label: 'Зураг (URL)', required: true, placeholder: 'https://...' },
        ],
      },
      { name: 'stepsTitle', type: 'localized', label: 'Алхмуудын гарчиг', required: true },
      {
        name: 'steps',
        type: 'objectList',
        label: 'Ажилд авах алхмууд',
        fields: [
          { name: 'step', type: 'text', label: 'Дугаар', required: true, placeholder: '01' },
          { name: 'title', type: 'localized', label: 'Гарчиг', required: true },
          { name: 'description', type: 'localizedArea', label: 'Тайлбар', required: true },
        ],
      },
      { name: 'faqTitle', type: 'localized', label: 'Асуулт хариултын гарчиг', required: true },
    ],
  },

  settings: {
    path: '/settings',
    title: t.nav.settings,
    subtitle: 'Сайтын лого, футер, холбоо барих, сошиал',
    fields: [
      { name: 'logoUrl', type: 'text', label: 'Логоны холбоос', required: true, placeholder: '/logo.png' },
      { name: 'footerDescription', type: 'localizedArea', label: 'Футерын тайлбар', required: true },
      { name: 'address', type: 'localizedArea', label: 'Хаяг', required: true },
      { name: 'phone', type: 'text', label: 'Утас', required: true },
      { name: 'email', type: 'text', label: 'И-мэйл', required: true },
      {
        name: 'socialLinks',
        type: 'objectList',
        label: 'Сошиал холбоосууд',
        fields: [
          { name: 'platform', type: 'select', label: 'Платформ', options: SOCIAL_PLATFORMS, default: 'facebook' },
          { name: 'url', type: 'url', label: 'Холбоос', placeholder: 'https://...' },
        ],
      },
      { name: 'brandAssetsDescription', type: 'localizedArea', label: 'Брэнд материалын тайлбар' },
      {
        name: 'brandAssets',
        type: 'objectList',
        label: 'Брэнд материалууд',
        fields: [
          { name: 'label', type: 'text', label: 'Нэр', required: true },
          { name: 'fileUrl', type: 'text', label: 'Файлын холбоос' },
        ],
      },
      { name: 'copyrightName', type: 'text', label: 'Зохиогчийн эрхийн нэр', required: true },
    ],
  },
};
