import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreValue, CoreValueSchema } from './schemas/core-value.schema';
import {
  TimelineEvent,
  TimelineEventSchema,
} from './schemas/timeline-event.schema';
import { TeamMember, TeamMemberSchema } from './schemas/team-member.schema';
import {
  AboutPageContent,
  AboutPageContentSchema,
} from './schemas/about-page-content.schema';
import { ABOUT_CONTROLLERS, ABOUT_PROVIDERS } from './about.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CoreValue.name, schema: CoreValueSchema },
      { name: TimelineEvent.name, schema: TimelineEventSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
      { name: AboutPageContent.name, schema: AboutPageContentSchema },
    ]),
  ],
  providers: ABOUT_PROVIDERS,
  controllers: ABOUT_CONTROLLERS,
  exports: [MongooseModule, ...ABOUT_PROVIDERS],
})
export class AboutModule {}
