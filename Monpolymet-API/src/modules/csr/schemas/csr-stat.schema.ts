import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type CsrStatDocument = HydratedDocument<CsrStat>;

@Schema({ timestamps: true })
export class CsrStat {
  @Prop({ required: true })
  value!: number;

  @Prop()
  prefix?: string;

  @Prop()
  suffix?: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  sub!: LocalizedString;

  @Prop({ required: true, default: 0 })
  order!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const CsrStatSchema = SchemaFactory.createForClass(CsrStat);
