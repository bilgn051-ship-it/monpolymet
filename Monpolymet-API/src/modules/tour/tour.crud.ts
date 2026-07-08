import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseCrudService } from '../../common/crud/base-crud.service';
import { BaseCrudController } from '../../common/crud/base-crud.controller';
import { TourScene, TourSceneDocument } from './schemas/tour-scene.schema';

@Injectable()
export class TourService extends BaseCrudService<TourSceneDocument> {
  constructor(@InjectModel(TourScene.name) model: Model<TourSceneDocument>) {
    super(model);
  }
}
@Controller('tour-scenes')
export class TourController extends BaseCrudController<TourSceneDocument> {
  constructor(service: TourService) {
    super(service);
  }
}
