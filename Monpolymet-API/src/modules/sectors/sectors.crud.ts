import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { Sector, SectorDocument } from './schemas/sector.schema';

@Injectable()
export class SectorsService extends BaseCrudService<SectorDocument> {
  constructor(@InjectModel(Sector.name) model: Model<SectorDocument>) {
    super(model);
  }
}
@Controller('sectors')
export class SectorsController extends BaseCrudController<SectorDocument> {
  constructor(service: SectorsService) {
    super(service);
  }
}
