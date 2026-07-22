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

/**
 * Unauthenticated read API consumed by the public website. Only returns
 * visitor-safe content.
 */
@Controller('public')
export class PublicController {
  constructor(
    private readonly news: NewsService,
    private readonly jobs: JobsService,
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
  teamList() {
    return this.team.findAll();
  }

  @Public()
  @Get('about-content')
  aboutContentGet() {
    return this.aboutContent.get();
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
}
