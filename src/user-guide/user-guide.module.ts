import { Module } from '@nestjs/common';
import { UserGuideService } from './user-guide.service';
import { UserGuideController } from './user-guide.controller';

@Module({
  controllers: [UserGuideController],
  providers: [UserGuideService],
})
export class UserGuideModule {}
