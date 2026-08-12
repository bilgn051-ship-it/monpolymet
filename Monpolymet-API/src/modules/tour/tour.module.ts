import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TourScene, TourSceneSchema } from './schemas/tour-scene.schema';
import { TourController, TourService } from './tour.crud';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TourScene.name, schema: TourSceneSchema },
    ]),
  ],
  providers: [TourService],
  controllers: [TourController],
  exports: [MongooseModule, TourService],
})
export class TourModule {}
