import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';
import { PageKey } from '../../pages/schemas/page.schema';

export type StatCardDocument = HydratedDocument<StatCard>;

/**
 * Layout variants of the home stats grid:
 * - tall:     icon + stat + text with an image at the bottom (left column)
 * - standard: icon + optional stat + text
 * - ticker:   stock-ticker style card (tabs, big value + unit, change label)
 */
export enum StatCardVariant {
  TALL = 'tall',
  STANDARD = 'standard',
  TICKER = 'ticker',
}

/** Extra fields used only by the 'ticker' variant. */
@Schema({ _id: false })
export class StatCardTicker {
  /** Tab labels across the top (first one rendered as active). */
  @Prop({ type: [String], default: [] })
  tabs!: string[];

  @Prop({ type: LocalizedStringSchema, required: true })
  unit!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  changeLabel!: LocalizedString;
}
const StatCardTickerSchema = SchemaFactory.createForClass(StatCardTicker);

/** One card of the bento-style stats grid on the home page. */
@Schema({ timestamps: true })
export class StatCard {
  @Prop({ type: String, enum: StatCardVariant, required: true, default: StatCardVariant.STANDARD })
  variant!: StatCardVariant;

  /** lucide-react icon name, e.g. 'Leaf', 'Award', 'HardHat', 'TrendingUp'. */
  @Prop()
  icon?: string;

  /** Headline figure, e.g. "1,000+ га", "30+", "1.0M". */
  @Prop()
  statValue?: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  description!: LocalizedString;

  /** Page opened when the card is clicked (omit for non-clickable cards). */
  @Prop({ type: String, enum: PageKey })
  targetPage?: PageKey;

  /** Visual theme, maps to a CSS class: 'light-blue' | 'orange' | 'beige' | 'white' | 'dark'. */
  @Prop({ required: true, default: 'white' })
  colorTheme!: string;

  /** Bottom image, used by the 'tall' variant. */
  @Prop()
  imageUrl?: string;

  @Prop({ type: StatCardTickerSchema })
  ticker?: StatCardTicker;

  @Prop({ required: true, default: 0 })
  order!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const StatCardSchema = SchemaFactory.createForClass(StatCard);
