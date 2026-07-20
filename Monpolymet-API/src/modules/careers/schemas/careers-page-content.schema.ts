import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type CareersPageContentDocument = HydratedDocument<CareersPageContent>;

@Schema({ timestamps: true })
export class CareersPageContent {
  @Prop({ required: true, unique: true, default: 'careers' })
  key!: string;

  @Prop({ type: LocalizedStringSchema })
  bannerTitle?: LocalizedString;

  @Prop({ type: LocalizedStringSchema })
  bannerButtonText?: LocalizedString;

  @Prop()
  bannerImage?: string;
}

export const CareersPageContentSchema = SchemaFactory.createForClass(CareersPageContent);
