import { Module } from '@nestjs/common';
import { NewsModule } from '../news/news.module';
import { CareersModule } from '../careers/careers.module';
import { AboutModule } from '../about/about.module';
import { HomeModule } from '../home/home.module';
import { SectorsModule } from '../sectors/sectors.module';
import { CsrModule } from '../csr/csr.module';

import { TourModule } from '../tour/tour.module';
import { SettingsModule } from '../settings/settings.module';
import { PagesModule } from '../pages/pages.module';
import { PublicController } from './public.controller';

import { TendersModule } from '../tenders/tenders.module';

@Module({
  imports: [
    NewsModule,
    CareersModule,
    AboutModule,
    HomeModule,
    SectorsModule,
    CsrModule,
    TendersModule,

    TourModule,
    SettingsModule,
    PagesModule,
  ],
  controllers: [PublicController],
})
export class PublicModule { }
