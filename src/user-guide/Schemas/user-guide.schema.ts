import { Prop, Schema , SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type UserGuideDocument = HydratedDocument<UserGuide>;

@Schema({
  versionKey :false
})
export class UserGuide {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required:true,
    ref: "Guide"
  })
  guide_id : string 
  @Prop({
    type: String,
    required:true,
  })
  user_id : string
  
  @Prop({
    type: Boolean,
  })
  complated: boolean;
}

export const UserGuideSchema = SchemaFactory.createForClass(UserGuide);
