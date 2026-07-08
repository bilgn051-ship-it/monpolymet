import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { CsrInitiative, CsrInitiativeDocument } from './schemas/csr-initiative.schema';

@Injectable()
export class CsrService extends BaseCrudService<CsrInitiativeDocument> {
  constructor(@InjectModel(CsrInitiative.name) model: Model<CsrInitiativeDocument>) {
    super(model);
  }
}
@Controller('csr-initiatives')
export class CsrController extends BaseCrudController<CsrInitiativeDocument> {
  constructor(service: CsrService) {
    super(service);
  }
}
