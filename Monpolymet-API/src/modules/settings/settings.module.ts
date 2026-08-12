import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteSettings, SiteSettingsSchema } from './schemas/site-settings.schema';
import { SETTINGS_CONTROLLERS, SETTINGS_PROVIDERS } from './settings.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SiteSettings.name, schema: SiteSettingsSchema },
    ]),
  ],
  providers: SETTINGS_PROVIDERS,
  controllers: SETTINGS_CONTROLLERS,
  exports: [MongooseModule, ...SETTINGS_PROVIDERS],
})
export class SettingsModule {}
