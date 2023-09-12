import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuideModule } from './guide/guide.module';
import { UserGuideModule } from './user-guide/user-guide.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/project'),
    UsersModule,
    GuideModule,
    UserGuideModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
