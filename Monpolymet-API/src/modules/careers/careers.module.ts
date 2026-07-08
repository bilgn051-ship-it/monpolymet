import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CareersPageContent, CareersPageContentSchema } from './schemas/careers-page-content.schema';
import { Faq, FaqSchema } from './schemas/faq.schema';
import { Job, JobSchema } from './schemas/job.schema';
import { JobApplication, JobApplicationSchema } from './schemas/job-application.schema';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import {
  CAREERS_EXTRA_CONTROLLERS,
  CAREERS_EXTRA_PROVIDERS,
} from './careers-content.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CareersPageContent.name, schema: CareersPageContentSchema },
      { name: Job.name, schema: JobSchema },
      { name: JobApplication.name, schema: JobApplicationSchema },
      { name: Faq.name, schema: FaqSchema },
    ]),
  ],
  controllers: [JobsController, ApplicationsController, ...CAREERS_EXTRA_CONTROLLERS],
  providers: [JobsService, ApplicationsService, ...CAREERS_EXTRA_PROVIDERS],
  exports: [JobsService, ApplicationsService, MongooseModule, ...CAREERS_EXTRA_PROVIDERS],
})
export class CareersModule {}
