import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserGuide,
  UserGuideSchema,
} from 'src/user-guide/Schemas/user-guide.schema';
import { User, UserSchema } from 'src/users/Schemas/User';
import { GuideController } from './guide.controller';
import { GuideService } from './guide.service';
import { Guide, GuideSchema } from './schemas/guide.chemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guide.name, schema: GuideSchema }]),
    MongooseModule.forFeature([
      { name: UserGuide.name, schema: UserGuideSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [GuideController],
  providers: [GuideService],
})
export class GuideModule {}
