import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type CsrInitiativeDocument = HydratedDocument<CsrInitiative>;

/** Stat badge inside an initiative card, e.g. "1,000+ га / Reclaimed Area". */
@Schema({ _id: false })
export class CsrStat {
  @Prop({ required: true })
  value!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  label!: LocalizedString;
}
const CsrStatSchema = SchemaFactory.createForClass(CsrStat);

/**
 * One image + text row on the CSR page (ecological restoration,
 * community support, …). Rows alternate sides by order.
 */
@Schema({ timestamps: true })
export class CsrInitiative {
  /** lucide-react icon name, e.g. 'Trees', 'HeartHandshake'. */
  @Prop({ required: true, default: 'Trees' })
  icon!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  description!: LocalizedString;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ type: [CsrStatSchema], default: [] })
  stats!: CsrStat[];

  @Prop({ required: true, default: 0 })
  order!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const CsrInitiativeSchema = SchemaFactory.createForClass(CsrInitiative);
