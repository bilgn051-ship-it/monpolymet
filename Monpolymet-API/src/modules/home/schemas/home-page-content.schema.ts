import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type HomePageContentDocument = HydratedDocument<HomePageContent>;

/** The "Message from Leadership" block on the home page. */
@Schema({ _id: false })
export class CeoSection {
  @Prop({ type: LocalizedStringSchema, required: true })
  sectionTitle!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  quote!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  name!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  role!: LocalizedString;

  @Prop({ required: true })
  imageUrl!: string;
}
const CeoSectionSchema = SchemaFactory.createForClass(CeoSection);

/**
 * Singleton (key = 'home'): structured home-page content that isn't a
 * repeating list — currently the CEO greeting section. Hero slides and
 * stat cards live in their own collections.
 */
@Schema({ timestamps: true })
export class HomePageContent {
  @Prop({ required: true, unique: true, default: 'home' })
  key!: string;

  @Prop({ type: CeoSectionSchema, required: true })
  ceoSection!: CeoSection;
}

export const HomePageContentSchema = SchemaFactory.createForClass(HomePageContent);
