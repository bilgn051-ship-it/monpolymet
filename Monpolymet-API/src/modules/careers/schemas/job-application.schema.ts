import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Job } from './job.schema';

export type JobApplicationDocument = HydratedDocument<JobApplication>;

export enum ApplicationStatus {
  NEW = 'new',
  REVIEWED = 'reviewed',
  SHORTLISTED = 'shortlisted',
  REJECTED = 'rejected',
}

/**
 * CV submission from the public Careers form. Applicant-entered fields are
 * plain strings (not localized) — they arrive in whatever language the
 * applicant wrote.
 */
@Schema({ timestamps: true })
export class JobApplication {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  phone!: string;

  @Prop({ trim: true, lowercase: true })
  email?: string;

  /** Free-text position field (applicants may type a position not listed). */
  @Prop({ required: true, trim: true })
  position!: string;

  @Prop()
  message?: string;

  /** Set when the applicant applied via a listed vacancy. */
  @Prop({ type: Types.ObjectId, ref: Job.name })
  job?: Types.ObjectId;

  @Prop({ type: String, enum: ApplicationStatus, default: ApplicationStatus.NEW })
  status!: ApplicationStatus;
}

export const JobApplicationSchema = SchemaFactory.createForClass(JobApplication);
JobApplicationSchema.index({ createdAt: -1 });
