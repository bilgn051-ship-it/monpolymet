import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type CareersPageContentDocument = HydratedDocument<CareersPageContent>;

@Schema({ _id: false })
export class WhyUsSection {
  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  text!: LocalizedString;

  @Prop({ required: true })
  imageUrl!: string;
}
const WhyUsSectionSchema = SchemaFactory.createForClass(WhyUsSection);

/** One step of the recruitment process timeline. */
@Schema({ _id: false })
export class RecruitmentStep {
  /** Displayed number/label, e.g. "01". */
  @Prop({ required: true })
  step!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  description!: LocalizedString;
}
const RecruitmentStepSchema = SchemaFactory.createForClass(RecruitmentStep);

/**
 * Singleton (key = 'careers'): structured Careers-page content — the
 * "why join us" block and the recruitment-steps timeline. Vacancies,
 * applications and FAQs are separate collections.
 */
@Schema({ timestamps: true })
export class CareersPageContent {
  @Prop({ required: true, unique: true, default: 'careers' })
  key!: string;

  @Prop({ type: WhyUsSectionSchema, required: true })
  whyUs!: WhyUsSection;

  @Prop({ type: LocalizedStringSchema, required: true })
  stepsTitle!: LocalizedString;

  @Prop({ type: [RecruitmentStepSchema], default: [] })
  steps!: RecruitmentStep[];

  @Prop({ type: LocalizedStringSchema, required: true })
  faqTitle!: LocalizedString;
}

export const CareersPageContentSchema = SchemaFactory.createForClass(CareersPageContent);
