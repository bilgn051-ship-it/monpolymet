import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroSlide, HeroSlideSchema } from './schemas/hero-slide.schema';
import { StatCard, StatCardSchema } from './schemas/stat-card.schema';
import {
  HomePageContent,
  HomePageContentSchema,
} from './schemas/home-page-content.schema';
import { HOME_CONTROLLERS, HOME_PROVIDERS } from './home.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeroSlide.name, schema: HeroSlideSchema },
      { name: StatCard.name, schema: StatCardSchema },
      { name: HomePageContent.name, schema: HomePageContentSchema },
    ]),
  ],
  providers: HOME_PROVIDERS,
  controllers: HOME_CONTROLLERS,
  exports: [MongooseModule, ...HOME_PROVIDERS],
})
export class HomeModule {}
