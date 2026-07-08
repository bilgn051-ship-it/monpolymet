import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseSingletonService } from '../../common/crud/base-singleton.service';
import { BaseSingletonController } from '../../common/crud/base-singleton.controller';
import { SiteSettings, SiteSettingsDocument } from './schemas/site-settings.schema';

@Injectable()
export class SettingsService extends BaseSingletonService<SiteSettingsDocument> {
  constructor(@InjectModel(SiteSettings.name) model: Model<SiteSettingsDocument>) {
    super(model, 'site');
  }
}
@Controller('settings')
export class SettingsController extends BaseSingletonController<SiteSettingsDocument> {
  constructor(service: SettingsService) {
    super(service);
  }
}
