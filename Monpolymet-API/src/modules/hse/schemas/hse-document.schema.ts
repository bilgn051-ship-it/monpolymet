import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type HseDocumentDocument = HydratedDocument<HseDocument>;

/** Downloadable report/policy file listed on the HSE page. */
@Schema({ timestamps: true })
export class HseDocument {
  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ required: true })
  fileUrl!: string;

  /** Human-readable size shown in the list, e.g. "2.4 MB". */
  @Prop({ required: true })
  fileSize!: string;

  /** e.g. 'PDF'. */
  @Prop({ required: true, default: 'PDF' })
  fileType!: string;

  @Prop({ required: true, default: 0 })
  order!: number;
}

export const HseDocumentSchema = SchemaFactory.createForClass(HseDocument);
