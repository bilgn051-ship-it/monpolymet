import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type PageDocument = HydratedDocument<Page>;

/** Public-website page identifiers (the `currentPage` keys in the frontend). */
export enum PageKey {
  HOME = 'home',
  ABOUT = 'about',
  COMPANIES = 'companies',
  SECTORS = 'sectors',
  CSR = 'csr',
  HSE = 'hse',
  NEWS = 'news',
  CAREERS = 'careers',
  TOUR = 'tour',
  MEDIA = 'media',
  PROCUREMENT = 'procurement',
  CONTACT = 'contact',
}

@Schema({ _id: false })
export class PageHeader {
  /** Small tag above the title (e.g. "Бидний тухай"). */
  @Prop({ type: LocalizedStringSchema })
  tag?: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  @Prop({ type: LocalizedStringSchema })
  subtitle?: LocalizedString;
}
const PageHeaderSchema = SchemaFactory.createForClass(PageHeader);

@Schema({ _id: false })
export class PageSeo {
  @Prop({ type: LocalizedStringSchema })
  title?: LocalizedString;

  @Prop({ type: LocalizedStringSchema })
  description?: LocalizedString;
}
const PageSeoSchema = SchemaFactory.createForClass(PageSeo);

/**
 * One document per public page. Holds the header block rendered by
 * SectionHeader (tag / title / subtitle) plus optional SEO metadata,
 * and lets a page be hidden from navigation entirely.
 */
@Schema({ timestamps: true })
export class Page {
  @Prop({ type: String, enum: PageKey, required: true, unique: true })
  key!: PageKey;

  /** Label used in the header/footer navigation. */
  @Prop({ type: LocalizedStringSchema, required: true })
  navLabel!: LocalizedString;

  @Prop({ type: PageHeaderSchema })
  header?: PageHeader;

  @Prop({ type: PageSeoSchema })
  seo?: PageSeo;

  @Prop({ default: true })
  isActive!: boolean;
}

export const PageSchema = SchemaFactory.createForClass(Page);
