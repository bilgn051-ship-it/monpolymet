import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sector, SectorSchema } from './schemas/sector.schema';
import { SectorsController, SectorsService } from './sectors.crud';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sector.name, schema: SectorSchema }])],
  controllers: [SectorsController],
  providers: [SectorsService],
  exports: [MongooseModule, SectorsService],
})
export class SectorsModule {}
