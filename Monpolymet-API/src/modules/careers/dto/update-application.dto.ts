import { IsEnum, IsOptional } from 'class-validator';
import { ApplicationStatus } from '../schemas/job-application.schema';

/** Admins only change the review status of a submission. */
export class UpdateApplicationDto {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
