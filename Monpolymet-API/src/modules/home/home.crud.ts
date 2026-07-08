import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { BaseSingletonService } from '../../common/crud/base-singleton.service';
import { BaseSingletonController } from '../../common/crud/base-singleton.controller';
import { HeroSlide, HeroSlideDocument } from './schemas/hero-slide.schema';
import { StatCard, StatCardDocument } from './schemas/stat-card.schema';
import {
  HomePageContent,
  HomePageContentDocument,
} from './schemas/home-page-content.schema';

@Injectable()
export class HeroSlidesService extends BaseCrudService<HeroSlideDocument> {
  constructor(@InjectModel(HeroSlide.name) model: Model<HeroSlideDocument>) {
    super(model);
  }
}
@Controller('hero-slides')
export class HeroSlidesController extends BaseCrudController<HeroSlideDocument> {
  constructor(service: HeroSlidesService) {
    super(service);
  }
}

@Injectable()
export class StatCardsService extends BaseCrudService<StatCardDocument> {
  constructor(@InjectModel(StatCard.name) model: Model<StatCardDocument>) {
    super(model);
  }
}
@Controller('stat-cards')
export class StatCardsController extends BaseCrudController<StatCardDocument> {
  constructor(service: StatCardsService) {
    super(service);
  }
}

@Injectable()
export class HomeContentService extends BaseSingletonService<HomePageContentDocument> {
  constructor(
    @InjectModel(HomePageContent.name) model: Model<HomePageContentDocument>,
  ) {
    super(model, 'home');
  }
}
@Controller('home-content')
export class HomeContentController extends BaseSingletonController<HomePageContentDocument> {
  constructor(service: HomeContentService) {
    super(service);
  }
}

export const HOME_PROVIDERS = [HeroSlidesService, StatCardsService, HomeContentService];
export const HOME_CONTROLLERS = [
  HeroSlidesController,
  StatCardsController,
  HomeContentController,
];
