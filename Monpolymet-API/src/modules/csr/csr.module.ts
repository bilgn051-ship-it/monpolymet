import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CsrInitiative,
  CsrInitiativeSchema,
} from './schemas/csr-initiative.schema';
import { CsrStat, CsrStatSchema } from './schemas/csr-stat.schema';
import {
  CsrHighlight,
  CsrHighlightSchema,
} from './schemas/csr-highlight.schema';
import { CSR_CONTROLLERS, CSR_PROVIDERS } from './csr.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CsrInitiative.name, schema: CsrInitiativeSchema },
      { name: CsrStat.name, schema: CsrStatSchema },
      { name: CsrHighlight.name, schema: CsrHighlightSchema },
    ]),
  ],
  providers: CSR_PROVIDERS,
  controllers: CSR_CONTROLLERS,
  exports: [MongooseModule, ...CSR_PROVIDERS],
})
export class CsrModule { }
