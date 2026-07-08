import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AboutModule } from './modules/about/about.module';
import { CareersModule } from './modules/careers/careers.module';
import { CsrModule } from './modules/csr/csr.module';
import { HomeModule } from './modules/home/home.module';
import { HseModule } from './modules/hse/hse.module';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    HseModule,
    CareersModule,
    TourModule,
    DashboardModule,
    PublicModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
