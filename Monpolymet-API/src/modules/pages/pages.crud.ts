import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { Page, PageDocument } from './schemas/page.schema';

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
