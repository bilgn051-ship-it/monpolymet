import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type TimelineEventDocument = HydratedDocument<TimelineEvent>;

/** One milestone on the company-history timeline (About page). */
@Schema({ timestamps: true })
export class TimelineEvent {
  /** Display year, e.g. "1993" or "2018–2020". */
  @Prop({ required: true })
  year!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  description!: LocalizedString;

  @Prop({ required: true, default: 0 })
  order!: number;
}

export const TimelineEventSchema = SchemaFactory.createForClass(TimelineEvent);
