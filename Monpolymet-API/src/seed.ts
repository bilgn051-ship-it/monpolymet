/**
 * Database seeder — `npm run seed`.
 *
 * Creates the initial admin account and migrates the website's original mock
 * content (news, jobs, one application) into MongoDB in the new bilingual
 * `{ mn, en }` shape. Idempotent: each section is skipped if already present,
 * so it is safe to run repeatedly.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { UsersService } from './modules/users/users.service';
import { NewsService } from './modules/news/news.service';
import { JobsService } from './modules/careers/jobs.service';
import { ApplicationsService } from './modules/careers/applications.service';
import { UserRole } from './modules/users/schemas/user.schema';
import { seedContent } from './seed-content';

const NEWS_SEED = [
  {
    title: {
      mn: 'Тосон уурхайн биологийн нөхөн сэргээлт амжилттай үргэлжилж байна',
      en: 'Biological reclamation of Toson mine continues successfully',
    },
    category: { mn: 'Нөхөн сэргээлт', en: 'Reclamation' },
    content: {
      mn: 'Монполимет Групп нь байгуулагдсан цагаасаа эхлэн хариуцлагатай уул уурхайг эрхэмлэж ирсэн. Энэ жилийн нөхөн сэргээлтийн ажлын хүрээнд Тосон уурхайн талбайд 15,000 гаруй мод тарьж, хиймэл нуурын биологийн тэнцвэрт байдлыг хангах олон талт ажлыг гүйцэтгэлээ.',
      en: "Monpolymet Group has prioritized responsible mining since its inception. As part of this year's reclamation work, over 15,000 trees were planted at the Toson mine site, and multi-faceted work was carried out to ensure the biological balance of the artificial lake.",
    },
    imageUrl:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60',
    publishedAt: '2026-06-15',
    isPublished: true,
  },
  {
    title: {
      mn: 'Монцемент үйлдвэр барилгын улиралд бэлэн боллоо',
      en: 'Moncement factory is ready for the construction season',
    },
    category: { mn: 'Үйлдвэрлэл', en: 'Manufacturing' },
    content: {
      mn: 'Эх орныхоо барилгын материалын хэрэгцээг хангах, импортыг орлох Монцемент үйлдвэр төлөвлөгөөт засвар үйлчилгээгээ дуусгаж, шинэ барилгын улирлын хэрэгцээг хангах цемент нийлүүлэлтийг бүрэн эхлүүллээ.',
      en: 'Moncement factory, which meets the construction material needs of the homeland and replaces imports, has completed its planned maintenance and fully started cement supplies to meet the demands of the new construction season.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=60',
    publishedAt: '2026-06-02',
    isPublished: true,
  },
  {
    title: {
      mn: 'Орон нутгийн сургуулийн лабораторийг тохижуулж хүлээлгэн өглөө',
      en: 'Refurbished school laboratory handed over to local community',
    },
    category: { mn: 'Тогтвортой хөгжил', en: 'CSR' },
    content: {
      mn: 'Монполимет Группийн нийгмийн хариуцлагын хүрээнд орон нутгийн хөгжлийг дэмжих зорилгоор Тосон уурхайн ойролцоох сургуулийн хими, физикийн лабораторийг иж бүрэн тоног төхөөрөмжөөр тохижуулж хүлээлгэн өглөө.',
      en: 'As part of Monpolymet Group’s corporate social responsibility, we fully equipped and handed over a chemistry and physics laboratory to the school near the Toson mine site to support local development.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=60',
    publishedAt: '2026-05-20',
    isPublished: true,
  },
  {
    title: {
      mn: 'Монполимет Групп Оны онцлох үндэсний аж ахуйн нэгжээр шалгарлаа',
      en: 'Monpolymet Group selected as National Enterprise of the Year',
    },
    category: { mn: 'Амжилт', en: 'Awards' },
    content: {
      mn: 'Монгол улсын тогтвортой хөгжил, аж үйлдвэрийн салбарт оруулсан хувь нэмрийг үнэлж Монполимет Группийг Оны онцлох үндэсний үйлдвэрлэгч аж ахуйн нэгжээр өргөмжлөн шалгаруулав.',
      en: 'In recognition of its contribution to the sustainable development and industrial sector of Mongolia, Monpolymet Group was awarded the National Enterprise of the Year.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
    publishedAt: '2026-05-01',
    isPublished: true,
  },
  {
    title: {
      mn: 'ХАБЭА-н ээлжит сургалт, дадлага амжилттай зохион байгуулагдлаа',
      en: 'Regular HSE training and drills successfully organized',
    },
    category: { mn: 'ХАБЭА', en: 'HSE' },
    content: {
      mn: 'Нийт ажилтнуудын аюулгүй байдлыг хангах, болзошгүй эрсдэлээс урьдчилан сэргийлэх зорилгоор Монцемент болон Тосон уурхайн талбайд ХАБЭА-н ээлжит сургалт, практик дадлагыг амжилттай зохион байгууллаа.',
      en: 'To ensure the safety of all employees and prevent potential risks, regular HSE training and practical drills were successfully conducted at the Moncement and Toson mine sites.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60',
    publishedAt: '2026-04-18',
    isPublished: true,
  },
  {
    title: {
      mn: 'Тогтвортой хөгжлийн жил тутмын тайлан нийтлэгдлээ',
      en: 'Annual Sustainable Development Report published',
    },
    category: { mn: 'Мэдээлэл', en: 'Report' },
    content: {
      mn: 'Монполимет Групп нь 2025 оны байгаль орчин, нийгмийн хариуцлага болон засаглалын (ESG) үйл ажиллагааны үр дүнг нэгтгэсэн Тогтвортой хөгжлийн жил тутмын тайлангаа олон нийтэд танилцуулж байна.',
      en: 'Monpolymet Group presents its annual Sustainable Development Report summarizing the environmental, social, and governance (ESG) performance results for the year 2025.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    publishedAt: '2026-04-05',
    isPublished: true,
  },
  {
    title: {
      mn: 'Орон нутгийн иргэдийг ажлын байраар дэмжих хөтөлбөр хэрэгжиж байна',
      en: 'Local citizen employment support program is in progress',
    },
    category: { mn: 'Тогтвортой хөгжил', en: 'CSR' },
    content: {
      mn: 'Үйл ажиллагаа явуулж буй сум орон нутгийн иргэдийн амьжиргааг дэмжих, ажлын байраар хангах зорилтот хөтөлбөрийн дагуу орон нутгаас 40 гаруй ажилтныг сургаж, тогтвортой ажлын байранд нэгтгэлээ.',
      en: 'Under the target program to support the livelihood and employment of citizens in local communities, over 40 local workers were trained and provided with stable employment.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1521737711867-e3b9047d7a86?w=800&auto=format&fit=crop&q=60',
    publishedAt: '2026-03-22',
    isPublished: true,
  },
  {
    title: {
      mn: 'Монцемент үйлдвэрт дижитал хяналтын систем нэвтрүүллээ',
      en: 'Digital monitoring system introduced at Moncement factory',
    },
    category: { mn: 'Үйл ажиллагаа', en: 'Operations' },
    content: {
      mn: 'Үйлдвэрлэлийн бүтээмж болон аюулгүй байдлыг шинэ түвшинд гаргах зорилгоор Монцемент цементийн үйлдвэрт ухаалаг хяналтын удирдлагын системийг бүрэн нэвтрүүлж, үйл ажиллагаагаа автоматжууллаа.',
      en: 'To elevate production efficiency and safety to a new level, a smart monitoring control system has been fully implemented at the Moncement factory, automating its operations.',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60',
    publishedAt: '2026-03-10',
    isPublished: true,
  },
];

const JOBS_SEED = [
  {
    title: { mn: 'Уул уурхайн Геологич инженер', en: 'Mining Geological Engineer' },
    category: { mn: 'Уурхай', en: 'Mine' },
    location: { mn: 'Тосон Уурхай', en: 'Toson Mine Site' },
    employmentType: { mn: 'Бүтэн цаг (20/10 ээлж)', en: 'Full-time (20/10 roster)' },
    description: {
      mn: 'Уурхайн олборлолт, хайгуулын ажилд хяналт тавих, геологийн зураглал бэлтгэх, нөөцийн тооцоолол хийх чиглэлээр ажиллана. Мэргэжлээрээ 3-аас дээш жил ажилласан туршлагатай байх шаардлагатай.',
      en: 'Will work on monitoring mining extraction and exploration, preparing geological mapping, and calculating reserves. Requires more than 3 years of professional experience.',
    },
    isOpen: true,
  },
  {
    title: { mn: 'Аюулгүй ажиллагааны инженер (ХАБЭА)', en: 'Safety Officer (HSE)' },
    category: { mn: 'ХАБЭА', en: 'HSE' },
    location: { mn: 'Монцемент Үйлдвэр', en: 'Moncement Factory' },
    employmentType: { mn: 'Бүтэн цаг', en: 'Full-time' },
    description: {
      mn: 'Үйлдвэрийн орчны аюулгүй байдлыг хангах, ХАБЭА-н дүрэм журмын хэрэгжилтийг хянах, ажилтнуудад зааварчилгаа өгөх чиглэлээр ажиллана. ISO 45001 стандартын мэдлэгтэй байх.',
      en: 'Will work on ensuring the safety of the factory environment, monitoring the implementation of HSE rules and regulations, and instructing staff. Knowledge of the ISO 45001 standard is a plus.',
    },
    isOpen: true,
  },
];

const APPLICATION_SEED = [
  {
    name: 'Г.Бат-Эрдэнэ',
    phone: '99112233',
    email: 'bat-erdene@example.com',
    position: 'Уул уурхайн Геологич инженер',
    message:
      'Уурхайн салбарт 4 жил ажилласан туршлагатай. Танай хамт олонтой нэгдэх хүсэлтэй байна.',
  },
];

async function seed() {
  const logger = new Logger('Seed');
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  try {
    const config = app.get(ConfigService);
    const users = app.get(UsersService);
    const news = app.get(NewsService);
    const jobs = app.get(JobsService);
    const applications = app.get(ApplicationsService);

    const email = config.get<string>('SEED_ADMIN_EMAIL', 'E.Bilguun@monpolymet.mn');
    if (!(await users.findByEmail(email))) {
      await users.create({
        email,
        password: config.get<string>('SEED_ADMIN_PASSWORD', 'Enhee0412@'),
        name: config.get<string>('SEED_ADMIN_NAME', 'Билгүүн (Админ)'),
        role: UserRole.ADMIN,
      });
      logger.log(`Created admin user: ${email}`);
    } else {
      logger.log(`Admin user already exists: ${email}`);
    }

    if ((await news.count()) === 0) {
      for (const item of NEWS_SEED) await news.create(item);
      logger.log(`Seeded ${NEWS_SEED.length} news articles`);
    } else {
      logger.log('News already present — skipping');
    }

    if ((await jobs.count()) === 0) {
      for (const item of JOBS_SEED) await jobs.create(item);
      logger.log(`Seeded ${JOBS_SEED.length} jobs`);
    } else {
      logger.log('Jobs already present — skipping');
    }

    if ((await applications.count()) === 0) {
      for (const item of APPLICATION_SEED) await applications.create(item);
      logger.log(`Seeded ${APPLICATION_SEED.length} application(s)`);
    } else {
      logger.log('Applications already present — skipping');
    }

    await seedContent(app, logger);

    logger.log('Seed complete.');
  } finally {
    await app.close();
  }
}

void seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
