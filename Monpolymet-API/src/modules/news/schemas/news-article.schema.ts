import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type NewsArticleDocument = HydratedDocument<NewsArticle>;

/**
 * News / media article. Shown in full on the media page and as a
 * 4-card carousel preview on the home page (most recent first).
 */
@Schema({ timestamps: true })
export class NewsArticle {
  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  content!: LocalizedString;

  /** Category shown as a badge, e.g. "Нөхөн сэргээлт" / "Reclamation". */
  @Prop({ type: LocalizedStringSchema, required: true })
  category!: LocalizedString;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ required: true, default: () => new Date() })
  publishedAt!: Date;

  /** Drafts stay hidden from the public site until published. */
  @Prop({ default: true })
  isPublished!: boolean;
}

export const NewsArticleSchema = SchemaFactory.createForClass(NewsArticle);
NewsArticleSchema.index({ publishedAt: -1 });
