import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../common/auth/public.decorator';
import { NewsService } from '../news/news.service';
import { JobsService } from '../careers/jobs.service';
import { TimelineService, CoreValuesService, TeamService, AboutContentService } from '../about/about.crud';
import { HeroSlidesService, StatCardsService, HomeContentService } from '../home/home.crud';
import { SectorsService } from '../sectors/sectors.crud';
import { CsrService } from '../csr/csr.crud';
import { HseDocumentsService, HseContentService } from '../hse/hse.crud';
import { TourService } from '../tour/tour.crud';
import { FaqsService, CareersContentService } from '../careers/careers-content.crud';
import { SettingsService } from '../settings/settings.crud';

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
    private readonly hseDocuments: HseDocumentsService,
    private readonly hseContent: HseContentService,
    private readonly tour: TourService,
    private readonly faqs: FaqsService,
    private readonly careersContent: CareersContentService,
    private readonly settings: SettingsService,
  ) {}

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
  @Get('hse-documents')
  hseDocumentsList() {
    return this.hseDocuments.findAll();
  }

  @Public()
  @Get('hse-content')
  hseContentGet() {
    return this.hseContent.get();
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
}
