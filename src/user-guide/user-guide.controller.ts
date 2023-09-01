import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserGuideService } from './user-guide.service';
import { CreateUserGuideDto } from './dto/create-user-guide.dto';
import { UpdateUserGuideDto } from './dto/update-user-guide.dto';

@Controller('user-guide')
export class UserGuideController {
  constructor(private readonly userGuideService: UserGuideService) {}

  @Post()
  create(@Body() createUserGuideDto: CreateUserGuideDto) {
    return this.userGuideService.create(createUserGuideDto);
  }

  @Get()
  findAll() {
    return this.userGuideService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGuideService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserGuideDto: UpdateUserGuideDto) {
    return this.userGuideService.update(+id, updateUserGuideDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGuideService.remove(+id);
  }
}
