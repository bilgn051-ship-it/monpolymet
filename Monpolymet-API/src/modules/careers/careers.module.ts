import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job, JobSchema } from './schemas/job.schema';
import {
  JobApplication,
  JobApplicationSchema,
} from './schemas/job-application.schema';
import { Faq, FaqSchema } from './schemas/faq.schema';
import {
  CareersPageContent,
  CareersPageContentSchema,
} from './schemas/careers-page-content.schema';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { CAREERS_CONTROLLERS, CAREERS_PROVIDERS } from './careers-content.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Job.name, schema: JobSchema },
      { name: JobApplication.name, schema: JobApplicationSchema },
      { name: Faq.name, schema: FaqSchema },
      { name: CareersPageContent.name, schema: CareersPageContentSchema },
    ]),
  ],
  providers: [JobsService, ApplicationsService, ...CAREERS_PROVIDERS],
  controllers: [JobsController, ApplicationsController, ...CAREERS_CONTROLLERS],
  exports: [JobsService, ApplicationsService, ...CAREERS_PROVIDERS],
})
export class CareersModule {}
