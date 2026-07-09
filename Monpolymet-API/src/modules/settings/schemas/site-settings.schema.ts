import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type SiteSettingsDocument = HydratedDocument<SiteSettings>;

@Schema({ _id: false })
export class SocialLink {
  /** e.g. 'facebook' | 'instagram' | 'youtube' — used to pick the icon. */
  @Prop({ required: true })
  platform!: string;

  @Prop({ required: true })
  url!: string;
}
const SocialLinkSchema = SchemaFactory.createForClass(SocialLink);

/** Downloadable brand material offered in the footer (logo kit, brand book…). */
@Schema({ _id: false })
export class BrandAsset {
  @Prop({ required: true })
  label!: string;

  @Prop({ required: true })
  fileUrl!: string;
}
const BrandAssetSchema = SchemaFactory.createForClass(BrandAsset);

@Schema({ _id: false })
export class NavigationItem {
  @Prop({ required: true })
  id!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  label!: LocalizedString;

  @Prop({ required: true })
  target!: string;

  @Prop({ default: 0 })
  order!: number;

  @Prop({ default: true })
  isActive!: boolean;
}
const NavigationItemSchema = SchemaFactory.createForClass(NavigationItem);

/**
 * Singleton (key = 'site'): global chrome content — logo, footer text,
 * contact details, social links, and brand downloads.
 */
@Schema({ timestamps: true })
export class SiteSettings {
  @Prop({ required: true, unique: true, default: 'site' })
  key!: string;

  @Prop({ required: true })
  logoUrl!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  footerDescription!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  address!: LocalizedString;

  @Prop({ required: true })
  phone!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ type: [SocialLinkSchema], default: [] })
  socialLinks!: SocialLink[];

  @Prop({ type: LocalizedStringSchema })
  brandAssetsDescription?: LocalizedString;

  @Prop({ type: [BrandAssetSchema], default: [] })
  brandAssets!: BrandAsset[];

  /** Name shown in the copyright line, e.g. "MONPOLYMET GROUP". */
  @Prop({ required: true, default: 'MONPOLYMET GROUP' })
  copyrightName!: string;

  @Prop({ type: [NavigationItemSchema], default: [] })
  navigation!: NavigationItem[];

  @Prop({ type: [NavigationItemSchema], default: [] })
  footerNavigation!: NavigationItem[];
}

export const SiteSettingsSchema = SchemaFactory.createForClass(SiteSettings);
