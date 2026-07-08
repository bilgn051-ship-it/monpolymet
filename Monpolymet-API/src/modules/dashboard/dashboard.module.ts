import { Module } from '@nestjs/common';
import { NewsModule } from '../news/news.module';
import { CareersModule } from '../careers/careers.module';
import { UsersModule } from '../users/users.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [NewsModule, CareersModule, UsersModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
