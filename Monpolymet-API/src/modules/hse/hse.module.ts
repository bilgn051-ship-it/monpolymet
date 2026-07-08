import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HseDocument, HseDocumentSchema } from './schemas/hse-document.schema';
import { HsePageContent, HsePageContentSchema } from './schemas/hse-page-content.schema';
import { HSE_CONTROLLERS, HSE_PROVIDERS } from './hse.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HsePageContent.name, schema: HsePageContentSchema },
      { name: HseDocument.name, schema: HseDocumentSchema },
    ]),
  ],
  controllers: [...HSE_CONTROLLERS],
  providers: [...HSE_PROVIDERS],
  exports: [MongooseModule, ...HSE_PROVIDERS],
})
export class HseModule {}
