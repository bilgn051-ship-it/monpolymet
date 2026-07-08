import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type TourSceneDocument = HydratedDocument<TourScene>;

/** One 360° panorama scene selectable on the Virtual Tour page. */
@Schema({ timestamps: true })
export class TourScene {
  /** Stable identifier, e.g. 'toson', 'moncement', 'restoration'. */
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug!: string;

  @Prop({ type: LocalizedStringSchema, required: true })
  title!: LocalizedString;

  /** Equirectangular panorama image URL fed to the Pannellum viewer. */
  @Prop({ required: true })
  panoramaUrl!: string;

  @Prop({ required: true, default: 0 })
  order!: number;

  @Prop({ default: true })
  isActive!: boolean;
}

export const TourSceneSchema = SchemaFactory.createForClass(TourScene);
