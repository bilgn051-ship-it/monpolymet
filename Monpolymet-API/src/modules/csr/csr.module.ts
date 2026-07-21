import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CsrInitiative, CsrInitiativeSchema } from './schemas/csr-initiative.schema';
import { CsrStat, CsrStatSchema } from './schemas/csr-stat.schema';
import { CsrHighlight, CsrHighlightSchema } from './schemas/csr-highlight.schema';
import { CsrController, CsrService, CsrStatsController, CsrStatsService, CsrHighlightController, CsrHighlightService } from './csr.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CsrInitiative.name, schema: CsrInitiativeSchema },
      { name: CsrStat.name, schema: CsrStatSchema },
      { name: CsrHighlight.name, schema: CsrHighlightSchema }
    ]),
  ],
  controllers: [CsrController, CsrStatsController, CsrHighlightController],
  providers: [CsrService, CsrStatsService, CsrHighlightService],
  exports: [MongooseModule, CsrService, CsrStatsService, CsrHighlightService],
})
export class CsrModule {}
