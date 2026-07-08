import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroSlide, HeroSlideSchema } from './schemas/hero-slide.schema';
import { HomePageContent, HomePageContentSchema } from './schemas/home-page-content.schema';
import { StatCard, StatCardSchema } from './schemas/stat-card.schema';
import { HOME_CONTROLLERS, HOME_PROVIDERS } from './home.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeroSlide.name, schema: HeroSlideSchema },
      { name: StatCard.name, schema: StatCardSchema },
      { name: HomePageContent.name, schema: HomePageContentSchema },
    ]),
  ],
  controllers: [...HOME_CONTROLLERS],
  providers: [...HOME_PROVIDERS],
  exports: [MongooseModule, ...HOME_PROVIDERS],
})
export class HomeModule {}
