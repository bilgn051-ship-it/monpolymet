import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';

/** Image upload endpoint (POST /api/uploads) used by the admin CMS. */
@Module({
  controllers: [UploadsController],
})
export class UploadsModule {}
