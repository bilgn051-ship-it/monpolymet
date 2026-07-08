import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type HsePageContentDocument = HydratedDocument<HsePageContent>;

/**
 * Singleton (key = 'hse'): the HSE page's section titles and the ordered
 * policy/commitment list. Downloadable reports are the HseDocument
 * collection since they carry uploaded files.
 */
@Schema({ timestamps: true })
export class HsePageContent {
  @Prop({ required: true, unique: true, default: 'hse' })
  key!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  policiesTitle!: LocalizedString;

  /** Ordered checklist of policy commitments. */
  @Prop({ type: [LocalizedStringSchema], default: [] })
  policies!: LocalizedString[];

  @Prop({ type: LocalizedStringSchema, required: true })
  documentsTitle!: LocalizedString;
}

export const HsePageContentSchema = SchemaFactory.createForClass(HsePageContent);
