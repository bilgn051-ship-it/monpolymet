import { Injectable } from '@nestjs/common';
import { NewsService } from '../news/news.service';
import { JobsService } from '../careers/jobs.service';
import { ApplicationsService } from '../careers/applications.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly news: NewsService,
    private readonly jobs: JobsService,
    private readonly applications: ApplicationsService,
    private readonly users: UsersService,
  ) {}

  async stats() {
    const [news, jobs, openJobs, applications, newApplications, users] =
      await Promise.all([
        this.news.count(),
        this.jobs.count(),
        this.jobs.countOpen(),
        this.applications.count(),
        this.applications.countNew(),
        this.users.count(),
      ]);

    return { news, jobs, openJobs, applications, newApplications, users };
  }
}
