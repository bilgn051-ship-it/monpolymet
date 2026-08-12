import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tender, TenderSchema } from './schemas/tender.schema';
import { TendersService } from './tenders.service';
import { TendersController } from './tenders.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tender.name, schema: TenderSchema }]),
  ],
  providers: [TendersService],
  controllers: [TendersController],
  exports: [TendersService],
})
export class TendersModule {}
