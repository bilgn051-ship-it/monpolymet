import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './schemas/page.schema';
import { PagesController, PagesService } from './pages.crud';

@Module({
  imports: [MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }])],
  controllers: [PagesController],
  providers: [PagesService],
  exports: [MongooseModule, PagesService],
})
export class PagesModule {}
