import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roller.decorator';
import { Role } from 'src/shared/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Post('login')
  signIn(@Body() { username, password }: LoginDto) {
    return this.usersService.signIn(username, password);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findAll(@Query() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  findOne(@Headers('Authorization') authorization: string) {
    return this.usersService.findOne(authorization);
  }
  @Patch('/me')
  @UseGuards(AuthGuard)
  updateUser(
    @Headers('Authorization') authorization: string,
    @Body() data: UpdateUserDto,
  ) {
    return this.usersService.updateUser(authorization, data);
  }
  @Get('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  findUser(@Param('id') id: string) {
    return this.usersService.findUser(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    return this.usersService.remove(id, authorization);
  }
}
