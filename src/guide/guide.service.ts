import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SortOrder } from 'src/shared/enums';
import { UserGuide } from 'src/user-guide/Schemas/user-guide.schema';
import { User } from 'src/users/Schemas/User';
import { CreateGuideDto } from './dto/create-guide.dto';
import { FindGuideDto } from './dto/find-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { Guide } from './schemas/guide.chemas';

@Injectable()
export class GuideService {
  constructor(
    @InjectModel(Guide.name)
    private guideModel: Model<Guide>,
    @InjectModel(UserGuide.name)
    private userGuideModel: Model<UserGuide>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create({ title, content, notify }: CreateGuideDto) {
    const createGuite = await this.guideModel.create({
      title,
      content,
      notifited: notify,
    });
    if (notify) {
      const allUser = await this.userModel.find();
      for (const item of allUser) {
        await this.userGuideModel.create({
          user_id: item.id,
          guide_id: createGuite.id,
          complated: false,
        });
      }
    }
    return createGuite;
  }

  async findAll({
    q,
    sort = { by: 'id', order: SortOrder.DESC },
    page = { offset: 0, limit: 10 },
  }: FindGuideDto) {
    const filter = {};
    if (q) {
      filter[`$or`] = [
        {
          title: {
            $regex: q,
            $options: 'i',
          },
        },
      ];
    }
    const result = await this.guideModel
      .find(filter)
      .sort({ [sort.by]: sort.order })
      .skip(page.offset)
      .limit(page.limit);
   

    return {
      data:result,
      pageInfo: {
        total: result.length,
        offset: page.offset,
        limit: page.limit,
      },
    };
  }

  async findOne(id: string) {
    const findUserGuide = await this.userGuideModel.find();
    let arr = [];

    for (const item of findUserGuide) {
      if (item.guide_id.toString() === id) {
        arr.push(item);
      }
    }

    const revision = arr.length;

    const { title, content } = await this.guideModel.findById(id);
    const obj = {
      data: {
        id,
        title,
        content,
        revision,
      },
    };
    return obj;
  }
  async update(id: string, { title, content, notify }: UpdateGuideDto) {
    const newObj = {
      title,
      content,
    };

    if (notify) {
      const allUser = await this.userModel.find();
      for (const item of allUser) {
        await this.userGuideModel.create({
          user_id: item.id,
          guide_id: id,
          complated: false,
        });
      }
    }

    const updateGuide = await this.guideModel.findByIdAndUpdate(id, newObj);
    return updateGuide;
  }
}
