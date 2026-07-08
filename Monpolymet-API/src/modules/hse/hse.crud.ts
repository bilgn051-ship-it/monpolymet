import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { BaseSingletonService } from '../../common/crud/base-singleton.service';
import { BaseSingletonController } from '../../common/crud/base-singleton.controller';
import { HseDocument, HseDocumentDocument } from './schemas/hse-document.schema';
import {
  HsePageContent,
  HsePageContentDocument,
} from './schemas/hse-page-content.schema';

@Injectable()
export class HseDocumentsService extends BaseCrudService<HseDocumentDocument> {
  constructor(@InjectModel(HseDocument.name) model: Model<HseDocumentDocument>) {
    super(model);
  }
}
@Controller('hse-documents')
export class HseDocumentsController extends BaseCrudController<HseDocumentDocument> {
  constructor(service: HseDocumentsService) {
    super(service);
  }
}

@Injectable()
export class HseContentService extends BaseSingletonService<HsePageContentDocument> {
  constructor(
    @InjectModel(HsePageContent.name) model: Model<HsePageContentDocument>,
  ) {
    super(model, 'hse');
  }
}
@Controller('hse-content')
export class HseContentController extends BaseSingletonController<HsePageContentDocument> {
  constructor(service: HseContentService) {
    super(service);
  }
}

export const HSE_PROVIDERS = [HseDocumentsService, HseContentService];
export const HSE_CONTROLLERS = [HseDocumentsController, HseContentController];
