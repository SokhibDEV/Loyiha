import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserGuide,
  UserGuideSchema,
} from 'src/user-guide/Schemas/user-guide.schema';
import { User, UserSchema } from './Schemas/User';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: UserGuide.name, schema: UserGuideSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: 'hey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
