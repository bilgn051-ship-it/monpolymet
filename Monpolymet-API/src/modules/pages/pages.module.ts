import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';
import {
  ProcurementContent,
  ProcurementContentSchema,
} from './schemas/procurement-content.schema';
import { PAGES_CONTROLLERS, PAGES_PROVIDERS } from './pages.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Page.name, schema: PageSchema },
      { name: ProcurementContent.name, schema: ProcurementContentSchema },
    ]),
  ],
  providers: PAGES_PROVIDERS,
  controllers: PAGES_CONTROLLERS,
  exports: [MongooseModule, ...PAGES_PROVIDERS],
})
export class PagesModule {}
