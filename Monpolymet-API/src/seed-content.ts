/**
 * Seed data for the expanded collections (home, about, sectors, csr, hse,
 * tour, careers content, pages, site settings). Kept separate from seed.ts to
 * keep each file readable. Idempotent: lists seed only when empty, singletons
 * only when absent.
 */
import type { Logger } from '@nestjs/common';
import type { INestApplicationContext } from '@nestjs/common';
import {
  HeroSlidesService,
  StatCardsService,
  HomeContentService,
} from './modules/home/home.crud';
import {
  CoreValuesService,
  TimelineService,
  TeamService,
  AboutContentService,
} from './modules/about/about.crud';
import { SectorsService } from './modules/sectors/sectors.crud';
import { CsrService } from './modules/csr/csr.crud';
import { HseDocumentsService, HseContentService } from './modules/hse/hse.crud';
import { TourService } from './modules/tour/tour.crud';
import {
  FaqsService,
  CareersContentService,
} from './modules/careers/careers-content.crud';
import { PagesService } from './modules/pages/pages.crud';
import { SettingsService } from './modules/settings/settings.crud';

const ls = (mn: string, en: string) => ({ mn, en });

const HERO_SLIDES = [
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop&q=70',
    title: ls('Эх орныхоо бүтээн байгуулалтын түүчээ', 'Pioneer of national development'),
    subtitle: ls(
      'Уул уурхай, барилгын материалын үйлдвэрлэлийн салбарын тэргүүлэгч',
      'A leader in mining and construction-material manufacturing',
    ),
    ctas: [{ label: ls('Бидний тухай', 'About us'), targetPage: 'about', style: 'primary' }],
    order: 0,
    isActive: true,
  },
  {
    mediaType: 'image',
    mediaUrl:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=70',
    title: ls('Тогтвортой хөгжлийг эрхэмлэнэ', 'Committed to sustainability'),
    subtitle: ls('Байгальд ээлтэй, хариуцлагатай уул уурхай', 'Responsible, eco-friendly mining'),
    ctas: [{ label: ls('Дэлгэрэнгүй', 'Learn more'), targetPage: 'csr', style: 'primary' }],
    order: 1,
    isActive: true,
  },
];

const STAT_CARDS = [
  {
    variant: 'standard',
    icon: 'Leaf',
    statValue: '1,000+ га',
    title: ls('Нөхөн сэргээсэн талбай', 'Reclaimed area'),
    description: ls('Байгальд ээлтэй үйл ажиллагаа', 'Environmentally responsible operations'),
    colorTheme: 'light-blue',
    order: 0,
    isActive: true,
  },
  {
    variant: 'standard',
    icon: 'Award',
    statValue: '30+',
    title: ls('Жилийн туршлага', 'Years of experience'),
    description: ls('1993 оноос хойш', 'Since 1993'),
    colorTheme: 'beige',
    order: 1,
    isActive: true,
  },
  {
    variant: 'standard',
    icon: 'Users',
    statValue: '2,000+',
    title: ls('Ажилтан', 'Employees'),
    description: ls('Хамт олон', 'Our team'),
    colorTheme: 'white',
    order: 2,
    isActive: true,
  },
];

const CORE_VALUES = [
  { title: ls('Аюулгүй байдал', 'Safety'), description: ls('Хүний амь нас, эрүүл мэнд хамгийн чухал', 'People’s life and health come first'), icon: 'ShieldAlert', order: 0 },
  { title: ls('Тогтвортой байдал', 'Sustainability'), description: ls('Байгальд ээлтэй, ирээдүйд хариуцлагатай', 'Eco-friendly and future-responsible'), icon: 'Leaf', order: 1 },
  { title: ls('Чанар', 'Quality'), description: ls('Олон улсын стандартад нийцсэн бүтээгдэхүүн', 'Products meeting international standards'), icon: 'Award', order: 2 },
  { title: ls('Хариуцлага', 'Responsibility'), description: ls('Нийгэм, орон нутагтаа хариуцлагатай', 'Accountable to society and community'), icon: 'HeartHandshake', order: 3 },
];

const TIMELINE = [
  { year: '1993', title: ls('Компани үүсгэн байгуулагдав', 'Company founded'), description: ls('Монполимет Групп үйл ажиллагаагаа эхэлсэн', 'Monpolymet Group began operations'), order: 0 },
  { year: '2005', title: ls('Монцемент үйлдвэр', 'Moncement factory'), description: ls('Цементийн үйлдвэрээ ашиглалтад оруулав', 'Commissioned the cement factory'), order: 1 },
  { year: '2015', title: ls('Үйл ажиллагааны тэлэлт', 'Expansion'), description: ls('Уул уурхайн салбарт хөрөнгө оруулалт хийв', 'Invested in the mining sector'), order: 2 },
  { year: '2026', title: ls('Оны онцлох аж ахуйн нэгж', 'Enterprise of the Year'), description: ls('Үндэсний шагнал хүртэв', 'Received the national award'), order: 3 },
];

const TEAM = [
  { name: ls('Ж. Одбаяр', 'J. Odbayar'), role: ls('Үүсгэн байгуулагч, Тэргүүн', 'Founder & Chairwoman'), bio: ls('Компанийг үүсгэн байгуулснаас хойш тэргүүлж байна', 'Has led the company since its founding'), education: ls('Эдийн засгийн доктор', 'PhD in Economics'), imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=70', isFounder: true, order: 0 },
  { name: ls('Б. Ганбат', 'B. Ganbat'), role: ls('Гүйцэтгэх захирал', 'Chief Executive Officer'), bio: ls('Үйл ажиллагааны ерөнхий удирдлагыг хариуцдаг', 'Responsible for overall operations'), education: ls('Уул уурхайн инженер', 'Mining Engineer'), imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=70', isFounder: false, order: 1 },
];

const SECTORS = [
  {
    slug: 'moncement',
    title: ls('Монцемент', 'Moncement'),
    description: ls('Дотоодын хэрэгцээг хангах цементийн үйлдвэр', 'A cement factory meeting domestic demand'),
    projects: ls('50+ томоохон төсөл', '50+ major projects'),
    websiteUrl: 'https://moncement.mn',
    icon: 'Factory',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&auto=format&fit=crop&q=70',
    metrics: [
      { label: ls('Хүчин чадал', 'Capacity'), value: ls('1 сая тонн/жил', '1M tonnes/year') },
      { label: ls('Технологи', 'Technology'), value: ls('Хуурай арга', 'Dry process') },
    ],
    highlights: [ls('Импорт орлох бүтээгдэхүүн', 'Import-substituting product'), ls('Олон улсын стандарт', 'International standards')],
    order: 0,
    isActive: true,
  },
  {
    slug: 'toson',
    title: ls('Тосон уурхай', 'Toson Mine'),
    description: ls('Хариуцлагатай уул уурхайн үйл ажиллагаа', 'Responsible mining operations'),
    projects: ls('Нөхөн сэргээлтийн тэргүүлэгч', 'Reclamation leader'),
    websiteUrl: 'https://monpolymet.mn',
    icon: 'HardHat',
    imageUrl: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=1000&auto=format&fit=crop&q=70',
    metrics: [{ label: ls('Нөхөн сэргээлт', 'Reclamation'), value: ls('1,000+ га', '1,000+ ha') }],
    highlights: [ls('Байгальд ээлтэй', 'Eco-friendly'), ls('Орон нутгийн хөгжил', 'Local development')],
    order: 1,
    isActive: true,
  },
];

const CSR = [
  {
    icon: 'Trees',
    title: ls('Экологийн нөхөн сэргээлт', 'Ecological restoration'),
    description: ls('Уурхайн талбайд мод тарьж, хиймэл нуур байгуулав', 'Planted trees and built an artificial lake at the mine site'),
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=70',
    stats: [{ value: '15,000+', label: ls('Тарьсан мод', 'Trees planted') }],
    order: 0,
    isActive: true,
  },
  {
    icon: 'HeartHandshake',
    title: ls('Орон нутгийн дэмжлэг', 'Community support'),
    description: ls('Сургууль, эмнэлгийн тоног төхөөрөмжийг дэмжив', 'Supported schools and hospitals with equipment'),
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1000&auto=format&fit=crop&q=70',
    stats: [{ value: '40+', label: ls('Ажлын байр', 'Jobs created') }],
    order: 1,
    isActive: true,
  },
];

const HSE_DOCS = [
  { title: ls('ХАБЭА бодлогын баримт бичиг', 'HSE Policy Document'), fileUrl: '/docs/hse-policy.pdf', fileSize: '1.2 MB', fileType: 'PDF', order: 0 },
  { title: ls('Жил тутмын тогтвортой хөгжлийн тайлан', 'Annual Sustainability Report'), fileUrl: '/docs/sustainability-2025.pdf', fileSize: '3.4 MB', fileType: 'PDF', order: 1 },
];

const TOUR = [
  { slug: 'toson', title: ls('Тосон уурхай', 'Toson Mine'), panoramaUrl: 'https://pannellum.org/images/alma.jpg', order: 0, isActive: true },
  { slug: 'moncement', title: ls('Монцемент үйлдвэр', 'Moncement Factory'), panoramaUrl: 'https://pannellum.org/images/cerro-toco-0.jpg', order: 1, isActive: true },
];

const FAQS = [
  { question: ls('Хэрхэн ажилд орох вэ?', 'How do I apply for a job?'), answer: ls('Ажлын байр хэсгээс анкетаа илгээнэ үү', 'Submit your application in the Careers section'), order: 0 },
  { question: ls('Дадлага хийх боломжтой юу?', 'Do you offer internships?'), answer: ls('Тийм, оюутнуудад зориулсан хөтөлбөртэй', 'Yes, we have a student program'), order: 1 },
  { question: ls('Ажлын байр хаана байрладаг вэ?', 'Where are the work sites?'), answer: ls('Улаанбаатар болон уурхайн талбайд', 'In Ulaanbaatar and at the mine sites'), order: 2 },
];

const PAGES = [
  { key: 'about', navLabel: ls('Бидний тухай', 'About Us'), header: { tag: ls('Бидний тухай', 'About Us'), title: ls('Монполимет Групп', 'Monpolymet Group'), subtitle: ls('Тогтвортой хөгжлийн түүчээ', 'Pioneer of sustainable development') }, isActive: true },
  { key: 'careers', navLabel: ls('Ажлын байр', 'Careers'), header: { tag: ls('Ажлын байр', 'Careers'), title: ls('Бидэнтэй нэгдээрэй', 'Join our team'), subtitle: ls('Хамтдаа өсөж хөгжье', 'Grow with us') }, isActive: true },
];

const HOME_CONTENT = {
  ceoSection: {
    sectionTitle: ls('Удирдлагын мэндчилгээ', 'Message from Leadership'),
    quote: ls('Бид эх орныхоо тогтвортой хөгжилд хувь нэмрээ оруулсаар ирсэн.', 'We have consistently contributed to our nation’s sustainable development.'),
    name: ls('Ж. Одбаяр', 'J. Odbayar'),
    role: ls('Үүсгэн байгуулагч, Тэргүүн', 'Founder & Chairwoman'),
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=70',
  },
};

const ABOUT_CONTENT = {
  intro: {
    title: ls('Бидний тухай', 'About Us'),
    text: ls('Монполимет Групп нь 1993 оноос хойш уул уурхай, барилгын материалын салбарт тэргүүлэн ажиллаж байна.', 'Since 1993, Monpolymet Group has led the mining and construction-materials sector.'),
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1000&auto=format&fit=crop&q=70',
  },
  vision: { title: ls('Алсын хараа', 'Vision'), text: ls('Тогтвортой хөгжлийн үлгэр жишээ компани байх', 'To be a model company for sustainable development') },
  mission: { title: ls('Эрхэм зорилго', 'Mission'), text: ls('Байгальд ээлтэй, чанартай бүтээгдэхүүнээр эх орноо хөгжүүлэх', 'To develop our nation with eco-friendly, quality products') },
  valuesTitle: ls('Үнэт зүйлс', 'Core Values'),
  historyTitle: ls('Түүхэн замнал', 'Our History'),
  leadershipTitle: ls('Удирдлагын баг', 'Leadership Team'),
  leadershipGreeting: { title: ls('Тэргүүний мэндчилгээ', 'Chairwoman’s Greeting'), text: ls('Танд энэ өдрийн мэнд хүргэе. Бид хамтдаа ирээдүйг бүтээнэ.', 'Warm greetings. Together we build the future.') },
};

const HSE_CONTENT = {
  policiesTitle: ls('ХАБЭА бодлого', 'HSE Policy'),
  policies: [
    ls('Ажилтны аюулгүй байдлыг нэн тэргүүнд тавина', 'Employee safety is our top priority'),
    ls('Байгаль орчинд үзүүлэх нөлөөллийг бууруулна', 'We minimize environmental impact'),
    ls('Олон улсын стандартыг мөрдөнө', 'We follow international standards'),
  ],
  documentsTitle: ls('Баримт бичиг, тайлан', 'Documents & Reports'),
};

const CAREERS_CONTENT = {
  whyUs: {
    title: ls('Яагаад бид гэж?', 'Why join us?'),
    text: ls('Тогтвортой ажлын байр, мэргэжлийн хөгжлийн боломж, найрсаг хамт олон.', 'Stable jobs, professional growth, and a friendly team.'),
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b9047d7a86?w=1000&auto=format&fit=crop&q=70',
  },
  stepsTitle: ls('Ажилд авах үйл явц', 'Recruitment Process'),
  steps: [
    { step: '01', title: ls('Анкет илгээх', 'Apply'), description: ls('Онлайнаар анкетаа илгээнэ', 'Submit your application online') },
    { step: '02', title: ls('Ярилцлага', 'Interview'), description: ls('Мэргэжлийн ярилцлагад оролцоно', 'Attend a professional interview') },
    { step: '03', title: ls('Ажлын санал', 'Offer'), description: ls('Амжилттай бол ажлын санал хүлээн авна', 'Receive an offer if successful') },
  ],
  faqTitle: ls('Түгээмэл асуултууд', 'Frequently Asked Questions'),
};

const SITE_SETTINGS = {
  logoUrl: '/logo.png',
  footerDescription: ls('Тогтвортой хөгжил, эх орныхоо барилга бүтээн байгуулалтын түүчээ.', 'Pioneering sustainable development and national construction.'),
  address: ls('Улаанбаатар хот, Хан-Уул дүүрэг, Монполимет тауэр', 'Monpolymet Tower, Khan-Uul District, Ulaanbaatar'),
  phone: '+976 7011 8012',
  email: 'info@monpolymet.mn',
  socialLinks: [
    { platform: 'facebook', url: 'https://facebook.com/monpolymet' },
    { platform: 'instagram', url: 'https://instagram.com/monpolymet' },
    { platform: 'youtube', url: 'https://youtube.com/monpolymet' },
  ],
  brandAssetsDescription: ls('Манай логоны өндөр чанартай хувилбарууд болон брэндбүүкийг татаж авах.', 'Download high-quality versions of our logo and brand book.'),
  brandAssets: [
    { label: 'Logo Kit (PNG, SVG)', fileUrl: '/logo-monpolymet.zip' },
    { label: 'Brand Guidelines', fileUrl: '/brandbook-monpolymet.pdf' },
  ],
  copyrightName: 'MONPOLYMET GROUP',
};

async function seedList<S extends { count(): Promise<number>; create(dto: any): Promise<unknown> }>(
  service: S,
  items: unknown[],
  label: string,
  logger: Logger,
) {
  if ((await service.count()) > 0) {
    logger.log(`${label} already present — skipping`);
    return;
  }
  for (const item of items) await service.create(item);
  logger.log(`Seeded ${items.length} ${label}`);
}

async function seedSingleton<S extends { get(): Promise<unknown>; update(dto: any): Promise<unknown> }>(
  service: S,
  data: unknown,
  label: string,
  logger: Logger,
) {
  if (await service.get()) {
    logger.log(`${label} already present — skipping`);
    return;
  }
  await service.update(data);
  logger.log(`Seeded ${label}`);
}

export async function seedContent(app: INestApplicationContext, logger: Logger) {
  const opts = { strict: false };
  await seedList(app.get(HeroSlidesService, opts), HERO_SLIDES, 'hero slides', logger);
  await seedList(app.get(StatCardsService, opts), STAT_CARDS, 'stat cards', logger);
  await seedList(app.get(CoreValuesService, opts), CORE_VALUES, 'core values', logger);
  await seedList(app.get(TimelineService, opts), TIMELINE, 'timeline events', logger);
  await seedList(app.get(TeamService, opts), TEAM, 'team members', logger);
  await seedList(app.get(SectorsService, opts), SECTORS, 'sectors', logger);
  await seedList(app.get(CsrService, opts), CSR, 'CSR initiatives', logger);
  await seedList(app.get(HseDocumentsService, opts), HSE_DOCS, 'HSE documents', logger);
  await seedList(app.get(TourService, opts), TOUR, 'tour scenes', logger);
  await seedList(app.get(FaqsService, opts), FAQS, 'FAQs', logger);
  await seedList(app.get(PagesService, opts), PAGES, 'pages', logger);

  await seedSingleton(app.get(HomeContentService, opts), HOME_CONTENT, 'home content', logger);
  await seedSingleton(app.get(AboutContentService, opts), ABOUT_CONTENT, 'about content', logger);
  await seedSingleton(app.get(HseContentService, opts), HSE_CONTENT, 'HSE content', logger);
  await seedSingleton(app.get(CareersContentService, opts), CAREERS_CONTENT, 'careers content', logger);
  await seedSingleton(app.get(SettingsService, opts), SITE_SETTINGS, 'site settings', logger);
}
