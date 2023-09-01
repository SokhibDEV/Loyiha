import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from 'src/shared/enums';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
  })
  last_name: string;

  @Prop({
    type: Number,
    required: true,
  })
  age: number;
  @Prop({
    type: String,
    enum: ['admin', 'employee'],
    required: true,
  })
  role: UserRole;
  @Prop({
    type: String,
    required: true,
   
  })
  username: string;
  @Prop({
    type: String,
    required: true,
    unique:true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
