import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type SectorDocument = HydratedDocument<Sector>;

@Schema({ _id: false })
export class SectorMetric {
  @Prop({ type: LocalizedStringSchema, required: true })
  label!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  value!: LocalizedString;
}
const SectorMetricSchema = SchemaFactory.createForClass(SectorMetric);

/**
 * One business sector / subsidiary shown as a tab on the Sectors page
 * (Moncement, Toson mine, transport & logistics, …).
 */
@Schema({ timestamps: true })
export class Sector {
  /** Stable identifier, e.g. 'moncement', 'narurt', 'ann'. */
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  description!: LocalizedString;

  /** "Implemented projects" line under the image. */
  @Prop({ type: LocalizedStringSchema, required: true })
  projects!: LocalizedString;

  /** Subsidiary website the CTA links to. */
  @Prop({ required: true })
  websiteUrl!: string;

  /** lucide-react icon name for the tab button, e.g. 'Home', 'HardHat', 'Truck'. */
  @Prop({ required: true, default: 'HardHat' })
  icon!: string;

  @Prop({ required: true })
  imageUrl!: string;

  /** Optional brand logo (transparent PNG/SVG) shown on the About-page org chart. */
  @Prop()
  logoUrl?: string;

  /** Key-metric grid (capacity, technology, market share, …). */
  @Prop({ type: [SectorMetricSchema], default: [] })
  metrics!: SectorMetric[];

  /** Bullet-point feature list with check icons. */
  @Prop({ type: [LocalizedStringSchema], default: [] })
  highlights!: LocalizedString[];

  @Prop({ required: true, default: 0 })
  order!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const SectorSchema = SchemaFactory.createForClass(Sector);
