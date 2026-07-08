import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';
import { PageKey } from '../../pages/schemas/page.schema';

export type HeroSlideDocument = HydratedDocument<HeroSlide>;

export enum HeroMediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Schema({ _id: false })
export class HeroCta {
  @Prop({ type: LocalizedStringSchema, required: true })
  label!: LocalizedString;

  /** Page the button navigates to. */
  @Prop({ type: String, enum: PageKey, required: true })
  targetPage!: PageKey;

  /** 'primary' | 'secondary' — picks the button style. */
  @Prop({ default: 'primary' })
  style!: string;
}
const HeroCtaSchema = SchemaFactory.createForClass(HeroCta);

/** One slide of the full-screen hero slideshow on the home page. */
@Schema({ timestamps: true })
export class HeroSlide {
  @Prop({ type: String, enum: HeroMediaType, required: true })
  mediaType!: HeroMediaType;

  /** Image URL or video URL depending on mediaType. */
  @Prop({ required: true })
  mediaUrl!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  subtitle!: LocalizedString;

  @Prop({ type: [HeroCtaSchema], default: [] })
  ctas!: HeroCta[];

  @Prop({ required: true, default: 0 })
  order!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const HeroSlideSchema = SchemaFactory.createForClass(HeroSlide);
