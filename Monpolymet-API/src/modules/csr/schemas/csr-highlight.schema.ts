import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type CsrHighlightDocument = HydratedDocument<CsrHighlight>;

@Schema({ _id: false })
export class CsrHighlightBullet {
  @Prop()
  icon?: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  text!: LocalizedString;
}
const CsrHighlightBulletSchema = SchemaFactory.createForClass(CsrHighlightBullet);

@Schema({ timestamps: true })
export class CsrHighlight {
  @Prop({ required: true, unique: true, default: 'csrHighlight' })
  key!: string;

  @Prop({ type: LocalizedStringSchema })
  title?: LocalizedString;

  @Prop({ type: LocalizedStringSchema })
  subtitle?: LocalizedString;

  @Prop({ default: '' })
  imageUrl?: string;

  @Prop({ default: '' })
  pano360Url?: string;

  @Prop({ type: [CsrHighlightBulletSchema], default: [] })
  bullets!: CsrHighlightBullet[];

  @Prop({ type: LocalizedStringSchema })
  buttonText?: LocalizedString;
}

export const CsrHighlightSchema = SchemaFactory.createForClass(CsrHighlight);
