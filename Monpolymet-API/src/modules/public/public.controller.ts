import { Controller, Get, Post, Body, Param, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as nodemailer from 'nodemailer';
import { Public } from '../../common/auth/public.decorator';
import { NewsService } from '../news/news.service';
import { JobsService } from '../careers/jobs.service';
import { TimelineService, CoreValuesService, TeamService, AboutContentService } from '../about/about.crud';
import { HeroSlidesService, StatCardsService, HomeContentService } from '../home/home.crud';
import { SectorsService } from '../sectors/sectors.crud';
import { CsrService, CsrStatsService, CsrHighlightService } from '../csr/csr.crud';

import { TourService } from '../tour/tour.crud';
import { FaqsService, CareersContentService } from '../careers/careers-content.crud';
import { SettingsService } from '../settings/settings.crud';
import { PagesService, ProcurementContentService } from '../pages/pages.crud';

import { TendersService } from '../tenders/tenders.service';

import { ApplicationsService } from '../careers/applications.service';
import { ApplicationStatus } from '../careers/schemas/job-application.schema';

/**
 * Unauthenticated read API consumed by the public website. Only returns
 * visitor-safe content.
 */
@Controller('public')
export class PublicController {
  constructor(
    private readonly news: NewsService,
    private readonly jobs: JobsService,
    private readonly applicationsService: ApplicationsService,
    private readonly tendersService: TendersService,
    private readonly timeline: TimelineService,
    private readonly heroSlides: HeroSlidesService,
    private readonly statCards: StatCardsService,
    private readonly homeContent: HomeContentService,
    private readonly coreValues: CoreValuesService,
    private readonly team: TeamService,
    private readonly aboutContent: AboutContentService,
    private readonly sectors: SectorsService,
    private readonly csr: CsrService,
    private readonly csrStats: CsrStatsService,
    private readonly csrHighlight: CsrHighlightService,
    private readonly tour: TourService,
    private readonly faqs: FaqsService,
    private readonly careersContent: CareersContentService,
    private readonly settings: SettingsService,
    private readonly pages: PagesService,
    private readonly procurementContent: ProcurementContentService,
  ) { }

  @Public()
  @Get('tenders')
  tendersList() {
    return this.tendersService.findPublished();
  }

  @Public()
  @Get('news')
  newsList() {
    return this.news.findPublished();
  }

  @Public()
  @Get('news/:id')
  newsOne(@Param('id') id: string) {
    return this.news.findOne(id);
  }

  @Public()
  @Patch('news/:id/view')
  newsView(@Param('id') id: string) {
    return this.news.incrementViews(id);
  }

  @Public()
  @Get('jobs')
  jobsList() {
    return this.jobs.findOpen();
  }

  @Public()
  @Get('timeline')
  timelineList() {
    return this.timeline.findAll();
  }

  @Public()
  @Get('hero-slides')
  async heroSlidesList() {
    const slides = await this.heroSlides.findAll();
    return slides.filter(s => s.isActive);
  }

  @Public()
  @Get('stat-cards')
  async statCardsList() {
    const cards = await this.statCards.findAll();
    return cards.filter(c => c.isActive);
  }

  @Public()
  @Get('home-content')
  homeContentGet() {
    return this.homeContent.get();
  }

  @Public()
  @Get('core-values')
  coreValuesList() {
    return this.coreValues.findAll();
  }

  @Public()
  @Get('team')
  async teamList() {
    let list = await this.team.findAll();
    const defaultTeam = [
      { name: { mn: 'Ц.Гарамжав', en: 'Garamjav Ts.' }, role: { mn: 'Үүсгэн байгуулагч, ТУЗ-ийн Дарга', en: 'Founder & Chairwoman of the Board' }, imageUrl: '/garamjav.png', isHidden: false, order: 0 },
      { name: { mn: 'Н.Мөнхнасан', en: 'Munkhnasan N.' }, role: { mn: 'Ерөнхий Захирал', en: 'Chief Executive Officer' }, imageUrl: '/monhnasan.png', isHidden: false, order: 1 },
      { name: { mn: 'Ц.Халиун', en: 'Haliun Ts.' }, role: { mn: 'Гүйцэтгэх Захирал', en: 'Executive Director' }, imageUrl: '/haliun.png', isHidden: false, order: 2 },
      { name: { mn: 'Б.Дэлгэр', en: 'Delger B.' }, role: { mn: 'Гүйцэтгэх Захирал', en: 'Executive Director' }, imageUrl: '/delger.png', isHidden: false, order: 3 },
      { name: { mn: 'Б.Гандөш', en: 'Gandush B.' }, role: { mn: 'Гүйцэтгэх Захирал', en: 'Executive Director' }, imageUrl: '/dosh.png', isHidden: false, order: 4 },
      { name: { mn: 'Б.Цэцэгсүрэн', en: 'Tsetsegsuren B.' }, role: { mn: 'Санхүүгийн Захирал', en: 'Chief Financial Officer' }, imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80', isHidden: false, order: 5 },
      { name: { mn: 'С.Баярбат', en: 'Bayarbat S.' }, role: { mn: 'Үйлдвэрлэл Хариуцсан Захирал', en: 'VP of Operations' }, imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80', isHidden: false, order: 6 },
      { name: { mn: 'Г.Отгонбаяр', en: 'Otgonbayar G.' }, role: { mn: 'Хүний Нөөцийн Захирал', en: 'Human Resources Director' }, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80', isHidden: false, order: 7 },
    ];

    if (!list || list.length === 0) {
      const createdList = [];
      for (const m of defaultTeam) {
        const created = await this.team.create(m as any);
        createdList.push(created);
      }
      return createdList;
    }

    if (list.length === 5) {
      for (let i = 5; i < defaultTeam.length; i++) {
        const created = await this.team.create(defaultTeam[i] as any);
        list.push(created);
      }
    }

    return list;
  }

  @Public()
  @Post('about/team')
  async saveTeam(@Body() body: { team: any[] }) {
    if (!body?.team || !Array.isArray(body.team)) return { success: false };
    const existing = await this.team.findAll();
    for (const item of existing) {
      await this.team.remove((item as any)._id.toString());
    }
    for (let i = 0; i < body.team.length; i++) {
      const m = body.team[i];
      await this.team.create({
        name: { mn: m.nameMn || m.name?.mn || '', en: m.nameEn || m.name?.en || '' },
        role: { mn: m.roleMn || m.role?.mn || '', en: m.roleEn || m.role?.en || '' },
        imageUrl: m.imageUrl || m.image || '/garamjav.png',
        isHidden: Boolean(m.isHidden),
        order: i
      } as any);
    }
    return { success: true };
  }

  @Public()
  @Post('about/timeline')
  async saveTimeline(@Body() body: { timeline: any[] }) {
    if (!body?.timeline || !Array.isArray(body.timeline)) return { success: false };
    const existing = await this.timeline.findAll();
    for (const item of existing) {
      await this.timeline.remove((item as any)._id.toString());
    }
    for (let i = 0; i < body.timeline.length; i++) {
      const t = body.timeline[i];
      await this.timeline.create({
        year: t.year || '2026',
        title: { mn: t.titleMn || t.title?.mn || '', en: t.titleEn || t.title?.en || '' },
        description: { mn: t.descMn || t.desc?.mn || '', en: t.descEn || t.desc?.en || '' },
        order: i
      } as any);
    }
    return { success: true };
  }

  @Public()
  @Get('about-content')
  aboutContentGet() {
    return this.aboutContent.get();
  }

  @Public()
  @Patch('about-content')
  async patchAboutContent(@Body() body: any) {
    return this.aboutContent.update(body);
  }

  @Public()
  @Post('home/hero')
  async saveHomeHero(@Body() body: any) {
    return this.homeContent.update({ hero: body });
  }

  @Public()
  @Get('sectors')
  async sectorsList() {
    const sectors = await this.sectors.findAll();
    return sectors.filter(s => s.isActive);
  }

  @Public()
  @Get('csr')
  async csrList() {
    const csr = await this.csr.findAll();
    return csr.filter(c => c.isActive);
  }

  @Public()
  @Get('csr-stats')
  async csrStatsList() {
    const stats = await this.csrStats.findAll();
    return stats.filter(s => s.isActive);
  }

  @Public()
  @Get('csr-highlight')
  csrHighlightGet() {
    return this.csrHighlight.get();
  }
  @Public()
  @Get('tour')
  async tourList() {
    const tour = await this.tour.findAll();
    return tour.filter(t => t.isActive);
  }

  @Public()
  @Get('faqs')
  faqsList() {
    return this.faqs.findAll();
  }

  @Public()
  @Get('careers-content')
  careersContentGet() {
    return this.careersContent.get();
  }

  @Public()
  @Get('settings')
  settingsGet() {
    return this.settings.get();
  }

  @Public()
  @Get('pages')
  async pagesList() {
    const pages = await this.pages.findAll();
    return pages.filter(p => p.isActive !== false);
  }

  @Public()
  @Get('procurement-content')
  procurementContentGet() {
    return this.procurementContent.get();
  }

  @Public()
  @Post('supplier-register')
  @UseInterceptors(FileInterceptor('file'))
  async registerSupplier(
    @Body() body: { companyName: string; regNumber: string; category: string; email: string; phone: string; description?: string },
    @UploadedFile() file?: any
  ) {
    const transporterOptions = [
      // 1. Office365 / Microsoft Exchange
      { host: 'smtp.office365.com', port: 587, secure: false },
      // 2. Direct cPanel / Webmail SMTP
      { host: 'mail.monpolymet.mn', port: 465, secure: true },
      // 3. Fallback Webmail SMTP 587
      { host: 'mail.monpolymet.mn', port: 587, secure: false }
    ];

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 20px auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
    <h2 style="color: #0f172a; border-bottom: 3px solid #2563eb; padding-bottom: 12px; margin-top: 0;">🏢 [Тендерийн Материал] Нийлүүлэгчийн Бүртгэл</h2>
    <div style="background-color: #fef2f2; border: 1px solid #fca5a5; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #991b1b; margin-bottom: 16px;">
      🔒 <strong>Тендерийн материал хугацаанаас өмнө хүлээн авагдсан бөгөөд хаагдах хугацаа (21:05) дууссаны дараа и-мэйлээр илгээгдэв.</strong>
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
      <tr><td style="padding: 8px 0; font-weight: bold; color: #475569; width: 160px;">Байгууллагын нэр:</td><td style="padding: 8px 0; color: #0f172a;">${body.companyName || '-'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Регистрийн дугаар:</td><td style="padding: 8px 0; color: #0f172a;">${body.regNumber || '-'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Чиглэл:</td><td style="padding: 8px 0; color: #0f172a;">${body.category || '-'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">И-мэйл хаяг:</td><td style="padding: 8px 0; color: #2563eb;">${body.email || '-'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Утасны дугаар:</td><td style="padding: 8px 0; color: #0f172a;">${body.phone || '-'}</td></tr>
      <tr><td style="padding: 8px 0; font-weight: bold; color: #475569; vertical-align: top;">Товч танилцуулга:</td><td style="padding: 8px 0; color: #0f172a; line-height: 1.5;">${body.description || 'Байхгүй'}</td></tr>
    </table>
    ${file ? `<div style="margin-top: 16px; padding: 12px; background-color: #f1f5f9; border-radius: 8px; font-size: 13px;">📎 <strong>Хавсаргасан файл:</strong> ${file.originalname} (${(file.size / (1024 * 1024)).toFixed(2)} MB)</div>` : ''}
    <hr style="margin-top: 24px; border: none; border-top: 1px solid #e2e8f0;" />
    <p style="font-size: 11px; color: #94a3b8; margin: 8px 0 0 0;">Энэхүү мэйл нь Монполимет Группийн Худалдан Авалтын Портолоос тендер хаагдсаны дараа автоматаар илгээгдсэн болно.</p>
  </div>
</body>
</html>`;

    const dispatchMail = async () => {
      let sent = false;
      let lastError: any = null;

      for (const opt of transporterOptions) {
        try {
          const transporter = nodemailer.createTransport({
            host: opt.host,
            port: opt.port,
            secure: opt.secure,
            auth: {
              user: 'procurement@monpolymet.mn',
              pass: 'Lalar05$',
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          const mailOptions: any = {
            from: `"Монполимет Худалдан Авалт" <procurement@monpolymet.mn>`,
            to: 'procurement@monpolymet.mn',
            replyTo: body.email || 'procurement@monpolymet.mn',
            subject: `[Тендерийн баримт бичиг - Хаагдсан] ${body.companyName} (${body.regNumber})`,
            html: htmlContent,
            textEncoding: 'base64',
            encoding: 'utf-8',
            attachments: file ? [{
              filename: file.originalname,
              content: file.buffer,
              contentType: file.mimetype || 'application/octet-stream'
            }] : []
          };

          await transporter.sendMail(mailOptions);
          sent = true;
          break;
        } catch (err) {
          lastError = err;
        }
      }

      if (!sent) {
        console.error('SMTP Email sending log/notice:', lastError?.message || lastError);
      }
      return sent;
    };

    // Tender Deadline: 2026.07.22 21:10:00
    const deadlineTime = new Date('2026-07-22T21:10:00').getTime();
    const nowTime = Date.now();
    const delay = Math.max(0, deadlineTime - nowTime);

    if (delay > 0) {
      console.log(`[TENDER QUEUE] Registration received before deadline. Scheduling email to procurement@monpolymet.mn in ${Math.round(delay / 1000)} seconds (after 21:10 deadline).`);
      setTimeout(() => {
        dispatchMail().catch(err => console.error('Deferred email dispatch failed:', err));
      }, delay);

      return {
        success: true,
        queued: true,
        message: 'Материал хугацаанаас өмнө амжилттай хүлээн авагдлаа. Тендерийн хугацаа (21:10) дууссаны дараа и-мэйлээр сонгон шалгаруулах комисс руу хүрэх болно.'
      };
    } else {
      const sent = await dispatchMail();
      return { success: true, sentEmail: sent };
    }
  }

  @Public()
  @Post('candidate-apply')
  @UseInterceptors(FileInterceptor('file'))
  async candidateApply(
    @Body() body: {
      name: string;
      phone: string;
      email?: string;
      position: string;
      previousCompany?: string;
      profession?: string;
      expectedSalary?: string;
      availableDate?: string;
      introMessage?: string;
    },
    @UploadedFile() file?: any
  ) {
    const name = body?.name || 'Ажил горилогч';
    const phone = body?.phone || '-';
    const email = body?.email || '';
    const position = body?.position || 'Ерөнхий анкет';
    const previousCompany = body?.previousCompany || '';
    const profession = body?.profession || '';
    const expectedSalary = body?.expectedSalary || '';
    const availableDate = body?.availableDate || '';
    const message = body?.introMessage || (body as any)?.message || '';

    // 1. Save candidate application to MongoDB database so it appears in Admin Dashboard
    try {
      await this.applicationsService.create({
        name,
        phone,
        email,
        position,
        previousCompany,
        profession,
        expectedSalary,
        availableDate,
        message,
        status: ApplicationStatus.NEW
      } as any);
    } catch (dbErr) {
      console.warn('MongoDB save candidate application failed:', dbErr);
    }

    const transporterOptions = [
      // 1. Office365 / Microsoft Exchange
      { host: 'smtp.office365.com', port: 587, secure: false },
      // 2. Direct cPanel / Webmail SMTP
      { host: 'mail.monpolymet.mn', port: 465, secure: true },
      // 3. Fallback Webmail SMTP 587
      { host: 'mail.monpolymet.mn', port: 587, secure: false }
    ];

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 650px; margin: 20px auto; padding: 28px; border: 1px solid #cbd5e1; border-radius: 16px; background-color: #ffffff;">
    <h2 style="color: #0f172a; border-bottom: 3px solid #001CE8; padding-bottom: 12px; margin-top: 0;">👤 [Ажил горилогчийн товч анкет] ${body.name || 'Шинэ анкет'}</h2>
    <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 12px 16px; border-radius: 8px; font-size: 13px; color: #1e40af; margin-bottom: 18px;">
      💼 <strong>Монполимет Группийн веб сайтаас шууд ирсэн ажил горилогчийн анкетын мэдээлэл.</strong>
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569; width: 220px;">Овог, нэр:</td><td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${body.name || '-'}</td></tr>
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569;">Холбоо барих утас:</td><td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${body.phone || '-'}</td></tr>
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569;">Имэйл хаяг:</td><td style="padding: 10px 0; color: #2563eb;">${body.email || '-'}</td></tr>
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569;">Сонирхож буй албан тушаал:</td><td style="padding: 10px 0; color: #001CE8; font-weight: bold;">${body.position || '-'}</td></tr>
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569;">Өмнө нь ажиллаж байсан байгууллага:</td><td style="padding: 10px 0; color: #0f172a;">${body.previousCompany || '-'}</td></tr>
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569;">Мэргэжил:</td><td style="padding: 10px 0; color: #0f172a;">${body.profession || '-'}</td></tr>
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569;">Цалингийн хүлээлт:</td><td style="padding: 10px 0; color: #0f172a;">${body.expectedSalary || '-'}</td></tr>
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569;">Ажилд орох боломжтой хугацаа:</td><td style="padding: 10px 0; color: #0f172a;">${body.availableDate || '-'}</td></tr>
      <tr><td style="padding: 10px 0; font-weight: bold; color: #475569; vertical-align: top;">Өөрийн товч танилцуулга:</td><td style="padding: 10px 0; color: #0f172a; line-height: 1.6;">${body.introMessage || 'Байхгүй'}</td></tr>
    </table>
    ${file ? `<div style="margin-top: 20px; padding: 14px; background-color: #f1f5f9; border-radius: 8px; font-size: 13px; color: #334155;">📎 <strong>Хавсаргасан CV / Анкет файл:</strong> ${file.originalname} (${(file.size / (1024 * 1024)).toFixed(2)} MB)</div>` : ''}
    <hr style="margin-top: 24px; border: none; border-top: 1px solid #e2e8f0;" />
    <p style="font-size: 11px; color: #94a3b8; margin: 8px 0 0 0;">Энэхүү и-мэйл нь Монполимет Группийн карьер цонхноос mpm-hr@monpolymet.mn хаяг руу автоматаар илгээгдсэн болно.</p>
  </div>
</body>
</html>`;

    let sent = false;
    let lastError: any = null;

    for (const opt of transporterOptions) {
      try {
        const transporter = nodemailer.createTransport({
          host: opt.host,
          port: opt.port,
          secure: opt.secure,
          auth: {
            user: 'procurement@monpolymet.mn',
            pass: 'Lalar05$',
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const mailOptions: any = {
          from: `"Монполимет Ажил Горилогчийн Портал" <procurement@monpolymet.mn>`,
          to: 'mpm-hr@monpolymet.mn',
          replyTo: body.email || 'mpm-hr@monpolymet.mn',
          subject: `[Ажил горилогчийн товч анкет] ${body.name} - ${body.position}`,
          html: htmlContent,
          textEncoding: 'base64',
          encoding: 'utf-8',
          attachments: file ? [{
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype || 'application/octet-stream'
          }] : []
        };

        await transporter.sendMail(mailOptions);
        sent = true;
        break;
      } catch (err) {
        lastError = err;
      }
    }

    if (!sent) {
      console.error('Candidate email dispatch error:', lastError?.message || lastError);
    }

    return { success: true, sentEmail: sent };
  }
}
