import { Module } from '@nestjs/common';
import { UserGuideService } from './user-guide.service';
import { UserGuideController } from './user-guide.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGuide, UserGuideSchema } from './Schemas/user-guide.schema';
import { User, UserSchema } from 'src/users/Schemas/User';
import { Guide, GuideSchema } from 'src/guide/schemas/guide.chemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserGuide.name, schema: UserGuideSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Guide.name, schema: GuideSchema }]),
  ],
  controllers: [UserGuideController],
  providers: [UserGuideService],
  exports: [UserGuideService],
})
export class UserGuideModule {}
