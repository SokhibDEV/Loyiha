import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GuideModule } from './guide/guide.module';
import { UserGuideModule } from './user-guide/user-guide.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/project'),
    UsersModule,
    GuideModule,
    UserGuideModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    
  ],
})
export class AppModule {}
