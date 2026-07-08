import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type AboutPageContentDocument = HydratedDocument<AboutPageContent>;

@Schema({ _id: false })
export class TitledText {
  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  text!: LocalizedString;
}
const TitledTextSchema = SchemaFactory.createForClass(TitledText);

@Schema({ _id: false })
export class AboutIntro {
  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  text!: LocalizedString;

  @Prop({ required: true })
  imageUrl!: string;
}
const AboutIntroSchema = SchemaFactory.createForClass(AboutIntro);

/**
 * Singleton (key = 'about'): the structured one-off content of the About
 * page. Repeating lists (values, history, team) are separate collections.
 */
@Schema({ timestamps: true })
export class AboutPageContent {
  @Prop({ required: true, unique: true, default: 'about' })
  key!: string;

  @Prop({ type: AboutIntroSchema, required: true })
  intro!: AboutIntro;

  @Prop({ type: TitledTextSchema, required: true })
  vision!: TitledText;

  @Prop({ type: TitledTextSchema, required: true })
  mission!: TitledText;

  /** Section headings on the page. */
  @Prop({ type: LocalizedStringSchema, required: true })
  valuesTitle!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  historyTitle!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  leadershipTitle!: LocalizedString;

  /** Greeting text block inside the leadership section (spoken by team[isFounder]). */
  @Prop({ type: TitledTextSchema, required: true })
  leadershipGreeting!: TitledText;
}

export const AboutPageContentSchema = SchemaFactory.createForClass(AboutPageContent);
