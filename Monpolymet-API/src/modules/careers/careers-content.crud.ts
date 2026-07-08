import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { BaseSingletonService } from '../../common/crud/base-singleton.service';
import { BaseSingletonController } from '../../common/crud/base-singleton.controller';
import { Faq, FaqDocument } from './schemas/faq.schema';
import {
  CareersPageContent,
  CareersPageContentDocument,
} from './schemas/careers-page-content.schema';

@Injectable()
export class FaqsService extends BaseCrudService<FaqDocument> {
  constructor(@InjectModel(Faq.name) model: Model<FaqDocument>) {
    super(model);
  }
}
@Controller('faqs')
export class FaqsController extends BaseCrudController<FaqDocument> {
  constructor(service: FaqsService) {
    super(service);
  }
}

@Injectable()
export class CareersContentService extends BaseSingletonService<CareersPageContentDocument> {
  constructor(
    @InjectModel(CareersPageContent.name)
    model: Model<CareersPageContentDocument>,
  ) {
    super(model, 'careers');
  }
}
@Controller('careers-content')
export class CareersContentController extends BaseSingletonController<CareersPageContentDocument> {
  constructor(service: CareersContentService) {
    super(service);
  }
}

export const CAREERS_EXTRA_PROVIDERS = [FaqsService, CareersContentService];
export const CAREERS_EXTRA_CONTROLLERS = [FaqsController, CareersContentController];
