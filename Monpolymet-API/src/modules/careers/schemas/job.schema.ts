import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type JobDocument = HydratedDocument<Job>;

/** Open vacancy listed on the Careers page. */
@Schema({ timestamps: true })
export class Job {
  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  /** Department/category tag, e.g. "Уурхай" / "Mine". */
  @Prop({ type: LocalizedStringSchema, required: true })
  category!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  location!: LocalizedString;

  /** Employment type tag, e.g. "Бүтэн цаг (20/10 ээлж)" / "Full-time (20/10 roster)". */
  @Prop({ type: LocalizedStringSchema, required: true })
  employmentType!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  description!: LocalizedString;

  /** Closed vacancies disappear from the public site but keep their applications. */
  @Prop({ default: true })
  isOpen!: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
