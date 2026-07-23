import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './modules/about/about.module';
import { CareersModule } from './modules/careers/careers.module';
import { CsrModule } from './modules/csr/csr.module';
import { HomeModule } from './modules/home/home.module';
import { NewsModule } from './modules/news/news.module';
import { PagesModule } from './modules/pages/pages.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { SettingsModule } from './modules/settings/settings.module';
import { TourModule } from './modules/tour/tour.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PublicModule } from './modules/public/public.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { TendersModule } from './modules/tenders/tenders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 120, // max 120 requests per minute per IP to prevent rate limit / brute force attacks
      },
    ]),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI', 'mongodb://localhost:27017/monpolymet'),
      }),
    }),
    AuthModule,
    UsersModule,
    PagesModule,
    SettingsModule,
    HomeModule,
    NewsModule,
    AboutModule,
    SectorsModule,
    CsrModule,
    TendersModule,
    CareersModule,
    TourModule,
    DashboardModule,
    PublicModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
