import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schemas/User';
import { Model } from 'mongoose';

import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { FindUserDto } from './dto/find-user.dto';
import { Role, SortOrder } from 'src/shared/enums';
import { filter } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
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
    filters = { role: Role.ADMIN },
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
      .limit(page.limit)
      .populate([]);

      

    return {data: result};
  }

  async findOne(authorization: string) {
    const token = authorization.replace('Bearer', '').trim();

    const { user } = this.jwtService.verify(token);

    const findUser = await this.userModel.findById(user.id);

    return findUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
