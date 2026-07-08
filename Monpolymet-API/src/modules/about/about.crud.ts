import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { BaseSingletonService } from '../../common/crud/base-singleton.service';
import { BaseSingletonController } from '../../common/crud/base-singleton.controller';
import { CoreValue, CoreValueDocument } from './schemas/core-value.schema';
import {
  TimelineEvent,
  TimelineEventDocument,
} from './schemas/timeline-event.schema';
import { TeamMember, TeamMemberDocument } from './schemas/team-member.schema';
import {
  AboutPageContent,
  AboutPageContentDocument,
} from './schemas/about-page-content.schema';

@Injectable()
export class CoreValuesService extends BaseCrudService<CoreValueDocument> {
  constructor(@InjectModel(CoreValue.name) model: Model<CoreValueDocument>) {
    super(model);
  }
}
@Controller('core-values')
export class CoreValuesController extends BaseCrudController<CoreValueDocument> {
  constructor(service: CoreValuesService) {
    super(service);
  }
}

@Injectable()
export class TimelineService extends BaseCrudService<TimelineEventDocument> {
  constructor(@InjectModel(TimelineEvent.name) model: Model<TimelineEventDocument>) {
    super(model);
  }
}
@Controller('timeline')
export class TimelineController extends BaseCrudController<TimelineEventDocument> {
  constructor(service: TimelineService) {
    super(service);
  }
}

@Injectable()
export class TeamService extends BaseCrudService<TeamMemberDocument> {
  constructor(@InjectModel(TeamMember.name) model: Model<TeamMemberDocument>) {
    super(model);
  }
}
@Controller('team')
export class TeamController extends BaseCrudController<TeamMemberDocument> {
  constructor(service: TeamService) {
    super(service);
  }
}

@Injectable()
export class AboutContentService extends BaseSingletonService<AboutPageContentDocument> {
  constructor(
    @InjectModel(AboutPageContent.name) model: Model<AboutPageContentDocument>,
  ) {
    super(model, 'about');
  }
}
@Controller('about-content')
export class AboutContentController extends BaseSingletonController<AboutPageContentDocument> {
  constructor(service: AboutContentService) {
    super(service);
  }
}

export const ABOUT_PROVIDERS = [
  CoreValuesService,
  TimelineService,
  TeamService,
  AboutContentService,
];
export const ABOUT_CONTROLLERS = [
  CoreValuesController,
  TimelineController,
  TeamController,
  AboutContentController,
];
