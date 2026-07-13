import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProcurementContentDocument = ProcurementContent & Document;

@Schema({ timestamps: true })
export class ProcurementContent {
  @Prop({ type: String, default: 'procurementContent', unique: true })
  key: string;
  @Prop({ type: Object, default: {} })
  header: any;

  @Prop({ type: Object, default: {} })
  intro: any;

  @Prop({ type: Array, default: [] })
  steps: any[];

  @Prop({ type: Object, default: {} })
  contactInfo: any;
}

export const ProcurementContentSchema = SchemaFactory.createForClass(ProcurementContent);
