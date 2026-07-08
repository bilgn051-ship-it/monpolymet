import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedString,
  LocalizedStringSchema,
} from '../../../common/schemas/localized-string.schema';

export type TeamMemberDocument = HydratedDocument<TeamMember>;

/** Executive-team profile on the About page. */
@Schema({ timestamps: true })
export class TeamMember {
  @Prop({ type: LocalizedStringSchema, required: true })
  name!: LocalizedString;

  @Prop({ type: LocalizedStringSchema, required: true })
  role!: LocalizedString;

  @Prop({ type: LocalizedStringSchema })
  bio?: LocalizedString;

  @Prop({ type: LocalizedStringSchema })
  education?: LocalizedString;

  @Prop({ required: true })
  imageUrl!: string;

  /**
   * The founder/chairwoman is rendered as the large greeting block at the
   * top of the leadership section instead of a regular profile card.
   */
  @Prop({ default: false })
  isFounder!: boolean;

  @Prop({ required: true, default: 0 })
  order!: number;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
