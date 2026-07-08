import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type CoreValueDocument = HydratedDocument<CoreValue>;

/** One card in the "Core Values" grid on the About page. */
@Schema({ timestamps: true })
export class CoreValue {
  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  description!: LocalizedString;

  /** lucide-react icon name, e.g. 'ShieldAlert', 'Award', 'Target', 'Eye'. */
  @Prop({ required: true, default: 'Eye' })
  icon!: string;

  @Prop({ required: true, default: 0 })
  order!: number;
}

export const CoreValueSchema = SchemaFactory.createForClass(CoreValue);
