import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type GuideDocument = HydratedDocument<Guide>;

@Schema()
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
    required: true,
  })
 
  notify: boolean;
 
}

export const GuidSchema = SchemaFactory.createForClass(Guide);

