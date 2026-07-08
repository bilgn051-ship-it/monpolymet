import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type FaqDocument = HydratedDocument<Faq>;

/** Question/answer item in the Careers-page FAQ accordion. */
@Schema({ timestamps: true })
export class Faq {
  @Prop({ type: LocalizedStringSchema, required: true })
  question!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  answer!: LocalizedString;

  @Prop({ required: true, default: 0 })
  order!: number;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
