import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { Page, PageDocument } from './schemas/page.schema';

import { ProcurementContent, ProcurementContentDocument } from './schemas/procurement-content.schema';
import { BaseSingletonService } from '../../common/crud/base-singleton.service';
import { BaseSingletonController } from '../../common/crud/base-singleton.controller';

@Injectable()
export class PagesService extends BaseCrudService<PageDocument> {
  constructor(@InjectModel(Page.name) model: Model<PageDocument>) {
    super(model, { createdAt: 1 });
  }
}

@Controller('pages')
export class PagesController extends BaseCrudController<PageDocument> {
  constructor(service: PagesService) {
    super(service);
  }
}

@Injectable()
export class ProcurementContentService extends BaseSingletonService<ProcurementContentDocument> {
  constructor(@InjectModel(ProcurementContent.name) model: Model<ProcurementContentDocument>) {
    super(model, 'procurementContent');
  }
}

@Controller('procurement-content')
export class ProcurementContentController extends BaseSingletonController<ProcurementContentDocument> {
  constructor(service: ProcurementContentService) {
    super(service);
  }
}
