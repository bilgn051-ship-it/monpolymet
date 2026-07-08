import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CsrInitiative, CsrInitiativeSchema } from './schemas/csr-initiative.schema';
import { CsrController, CsrService } from './csr.crud';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CsrInitiative.name, schema: CsrInitiativeSchema }]),
  ],
  controllers: [CsrController],
  providers: [CsrService],
  exports: [MongooseModule, CsrService],
})
export class CsrModule {}
