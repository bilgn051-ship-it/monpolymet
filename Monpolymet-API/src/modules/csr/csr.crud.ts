import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { BaseSingletonService } from '../../common/crud/base-singleton.service';
import { BaseSingletonController } from '../../common/crud/base-singleton.controller';
import { CsrInitiative, CsrInitiativeDocument } from './schemas/csr-initiative.schema';
import { CsrStat, CsrStatDocument } from './schemas/csr-stat.schema';
import { CsrHighlight, CsrHighlightDocument } from './schemas/csr-highlight.schema';

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

@Injectable()
export class CsrStatsService extends BaseCrudService<CsrStatDocument> {
  constructor(@InjectModel(CsrStat.name) model: Model<CsrStatDocument>) {
    super(model);
  }
}
@Controller('csr-stats')
export class CsrStatsController extends BaseCrudController<CsrStatDocument> {
  constructor(service: CsrStatsService) {
    super(service);
  }
}

@Injectable()
export class CsrHighlightService extends BaseSingletonService<CsrHighlightDocument> {
  constructor(@InjectModel(CsrHighlight.name) model: Model<CsrHighlightDocument>) {
    super(model, 'csrHighlight');
  }
}
@Controller('csr-highlight')
export class CsrHighlightController extends BaseSingletonController<CsrHighlightDocument> {
  constructor(service: CsrHighlightService) {
    super(service);
  }
}
