import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';
import { ProcurementContent, ProcurementContentSchema } from './schemas/procurement-content.schema';
import { PagesController, PagesService, ProcurementContentController, ProcurementContentService } from './pages.crud';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Page.name, schema: PageSchema },
    { name: ProcurementContent.name, schema: ProcurementContentSchema }
  ])],
  controllers: [PagesController, ProcurementContentController],
  providers: [PagesService, ProcurementContentService],
  exports: [MongooseModule, PagesService, ProcurementContentService],
})
export class PagesModule {}
