import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * Bilingual text value. Every user-facing string on the public website
 * exists in Mongolian (mn) and English (en); the frontend picks one at
 * render time based on the active language.
 */
@Schema({ _id: false })
export class LocalizedString {
  @Prop({ default: '' })
  mn!: string;

  @Prop({ default: '' })
  en!: string;
}

export const LocalizedStringSchema = SchemaFactory.createForClass(LocalizedString);
