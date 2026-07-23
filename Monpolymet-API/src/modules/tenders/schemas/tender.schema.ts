import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type TenderDocument = HydratedDocument<Tender>;

/**
 * Tender / RFQ procurement listing.
 * Managed from Admin dashboard, displayed live on Procurement page.
 */
@Schema({ timestamps: true })
export class Tender {
  @Prop({ required: true })
  code!: string; // e.g. "ТШ-2026/08"

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  category!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  description!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  location!: LocalizedString;

  /** Start date and time of the tender invitation. */
  @Prop({ required: true, default: () => new Date() })
  startDate!: Date;

  /** Closing date and time of the tender. */
  @Prop({ required: true })
  deadlineDate!: Date;

  /** Attached PDF document URL for download. */
  @Prop()
  pdfUrl?: string;

  /** Toggle whether the tender is visible on the public site. */
  @Prop({ default: true })
  isPublished!: boolean;
}

export const TenderSchema = SchemaFactory.createForClass(Tender);
TenderSchema.index({ deadlineDate: 1 });
TenderSchema.index({ startDate: 1 });
