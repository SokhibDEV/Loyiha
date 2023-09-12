import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { SortOrder } from 'src/shared/enums';
import { UserGuide } from 'src/user-guide/Schemas/user-guide.schema';
import { User } from './Schemas/User';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(UserGuide.name)
    private userGuiteModel: Model<UserGuide>,
    private jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto): Promise<String | any> {
    const updatedValues: { password?: string } = {};

    updatedValues.password = await hash(data.password, 10);
    const user = await this.userModel.create({ ...data, ...updatedValues });
    return user;
  }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username });

    const isMatch = await compare(password, user.password);

    if (!user) {
      throw new UnauthorizedException('Username yoki parol xato');
    }

    if (!isMatch) {
      throw new UnauthorizedException('Parol xato');
    }
    const token = this.jwtService.sign({
      user: { id: user._id, role: user.role },
    });
    return {
      data: {
        token,
      },
    };
  }

  async findAll({
    q,
    sort = { by: 'id', order: SortOrder.DESC },
    page = { offset: 0, limit: 10 },
    filters = {},
  }: FindUserDto) {
    const { ...directFilters } = filters;

    const filter = { ...directFilters };

    if (q) {
      filter[`$or`] = [
        {
          first_name: {
            $regex: q,
            $options: 'i',
          },
          last_name: {
            $regex: q,
            $options: 'i',
          },
        },
      ];
    }
    const result = await this.userModel
      .find(filter)
      .sort({ [sort.by]: sort.order })
      .skip(page.offset)
      .limit(page.limit);

    const data = await this.userModel.find();
    return {
      data: result,
      pageInfo: {
        total: Math.ceil(data.length / page.limit),
        offset: page.offset,
        limit: page.limit,
      },
    };
  }

  async findOne(authorization: string) {
    const token = authorization.replace('Bearer', '').trim();
    const { user } = this.jwtService.verify(token);

    const findUserGuide = await this.userGuiteModel.find({ user_id: user.id });
    const total_guides = findUserGuide.length;
    let arr = [];

    for (const item of findUserGuide) {
      if (item.complated) {
        arr.push(item);
      }
    }
    const read_guides = arr.length;
    const todo_guides = total_guides - read_guides;

    const aggragetUser = await this.userModel.aggregate([
      {
        $addFields: { total_guides, todo_guides, read_guides },
      },
    ]);

    let arr1 = [];

    for (const item of aggragetUser) {
      if (item._id.toString() === user.id) {
        arr1.push(item);
      }
    }

    return { data: arr1[0] };
  }
  async updateUser(authorization: string, data: UpdateUserDto) {
    const token = authorization.replace('Bearer', '').trim();
    const { user } = this.jwtService.verify(token);

    const findUser = await this.userModel.findById(user.id);

    const { role, password } = findUser;
    const { first_name, last_name, age, username } = data;
    const newData = {
      first_name,
      last_name,
      age,
      role,
      username,
      password,
    };

    return this.userModel.findByIdAndUpdate(user.id, newData);
  }

  async findUser(id: string) {
    const findUser = await this.userModel.findById(id);
    if (!findUser) {
      throw new UnauthorizedException(
        'Bunday user mavjud emas iltimos login qiling!',
      );
    }
    const findUserGuide = await this.userGuiteModel.find({ user_id: id });
    const total_guides = findUserGuide.length;
    let arr = [];

    for (const item of findUserGuide) {
      if (item.complated) {
        arr.push(item);
      }
    }
    const read_guides = arr.length;
    const todo_guides = total_guides - read_guides;

    const aggragetUser = await this.userModel.aggregate([
      {
        $addFields: { total_guides, todo_guides, read_guides },
      },
    ]);
    let arr1 = [];

    for (const item of aggragetUser) {
      if (item._id.toString() === id) {
        arr1.push(item);
      }
    }

    return { data: arr1[0] };
  }

  async update(id: string, data: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User topilmadi.');
    }

    if (data.password) {
      const hashPas = await hash(data.password, 10);
      data.password = hashPas;
    }

    return this.userModel.findByIdAndUpdate(id, data);
  }

  async remove(id: string, authorization: string) {
    const token = authorization.replace('Bearer', '').trim();
    const { user } = this.jwtService.verify(token);

    const findUser = await this.userModel.findById(id);
    if (!findUser) {
      throw new NotFoundException('User topilmadi.');
    }
    if (user.id !== id) {
      const UserDeleted = await this.userModel.findByIdAndRemove(id);

      return {
        massage: 'Deleted User!',
      };
    }

    return {
      massage: "Kechirasiz siz o'zingizni o'chira olmaysiz!",
    };
  }
}
