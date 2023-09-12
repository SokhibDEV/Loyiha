import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/shared/enums';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret._id = ret.id;
      delete ret._id;
    },
  },
})
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
  role: Role;
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string;
  @Prop({
    type: String,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
