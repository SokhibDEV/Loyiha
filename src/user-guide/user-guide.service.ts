import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserGuide } from './Schemas/user-guide.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { FindUserGuideDto } from './dto/find-userguide.dto';
import { User } from 'src/users/Schemas/User';
import { CreateUserGuideDto } from './dto/create-user-guide.dto';

@Injectable()
export class UserGuideService {
  constructor(
    @InjectModel(UserGuide.name)
    private userGuideModel: Model<UserGuide>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(
    authorization: string,
    { page = { offset: 0, limit: 10 }, filters = {} }: FindUserGuideDto,
  ) {
    const token = authorization.replace('Bearer', '').trim();
    const { user } = this.jwtService.verify(token);
    const existingUser = await this.userModel.findById(user.id);
    if (!existingUser)
      throw new UnauthorizedException('Bunday User mavjud emas!');

    const res = await this.userGuideModel
      .find({ user_id: user.id })
      .find(filters)
      .populate([{ path: 'guide_id' }])
      .select('complated')
      .skip(page.offset)
      .limit(page.limit);

    const total = await this.userGuideModel.countDocuments({
      user_id: user.id,
    });
    const pageInfo = {
      total,
      offset: page.offset ?? 0,
      limit: page.limit ?? 10,
    };
    return { data: res, pageInfo };
  }

  async readGuide(authorization: string, id: string) {
    const token = authorization.replace('Bearer', '').trim();
    const { user } = await this.jwtService.verify(token);

    const findUser = await this.userGuideModel.find({ user_id: user.id });

    const arr = [];

    for (const item of findUser) {
      if (item.id === id) {
        item.complated = true;
        arr.push(item);
      }
    }

    const updateUserGuide = await this.userGuideModel.findByIdAndUpdate(id, arr[0])

    return { data: arr[0] };
  }

  async bulk({guide_id, user_ids}: any){

    for (const item of user_ids) {
      const createUserGuide = await this.userGuideModel.create({
        user_id: item,
        guide_id,
        complated:false
      })
    }
    
     return {
      "massage": "Create UserGuide!"
     }
  }
}
