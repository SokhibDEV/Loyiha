import { Injectable } from '@nestjs/common';
import { CreateUserGuideDto } from './dto/create-user-guide.dto';
import { UpdateUserGuideDto } from './dto/update-user-guide.dto';

@Injectable()
export class UserGuideService {
  create(createUserGuideDto: CreateUserGuideDto) {
    return 'This action adds a new userGuide';
  }

  findAll() {
    return `This action returns all userGuide`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userGuide`;
  }

  update(id: number, updateUserGuideDto: UpdateUserGuideDto) {
    return `This action updates a #${id} userGuide`;
  }

  remove(id: number) {
    return `This action removes a #${id} userGuide`;
  }
}
