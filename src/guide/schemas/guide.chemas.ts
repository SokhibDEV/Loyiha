import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuideDocument = HydratedDocument<Guide>;

@Schema({
  versionKey: false,
})
export class Guide {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;
  @Prop({
    type: Boolean,
  })
  notify: boolean;

  @Prop({
    type: Number,
  })
  revisions: number;
}

export const GuideSchema = SchemaFactory.createForClass(Guide);
