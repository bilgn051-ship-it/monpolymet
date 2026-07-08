import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutPageContent, AboutPageContentSchema } from './schemas/about-page-content.schema';
import { CoreValue, CoreValueSchema } from './schemas/core-value.schema';
import { TeamMember, TeamMemberSchema } from './schemas/team-member.schema';
import { TimelineEvent, TimelineEventSchema } from './schemas/timeline-event.schema';
import { ABOUT_CONTROLLERS, ABOUT_PROVIDERS } from './about.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AboutPageContent.name, schema: AboutPageContentSchema },
      { name: CoreValue.name, schema: CoreValueSchema },
      { name: TimelineEvent.name, schema: TimelineEventSchema },
      { name: TeamMember.name, schema: TeamMemberSchema },
    ]),
  ],
  controllers: [...ABOUT_CONTROLLERS],
  providers: [...ABOUT_PROVIDERS],
  exports: [MongooseModule, ...ABOUT_PROVIDERS],
})
export class AboutModule {}
