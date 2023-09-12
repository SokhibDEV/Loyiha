import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { UserGuideService } from './user-guide.service';
import { CreateUserGuideDto } from './dto/create-user-guide.dto';
import { UpdateUserGuideDto } from './dto/update-user-guide.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FindUserGuideDto } from './dto/find-userguide.dto';
import { Roles } from 'src/guards/roller.decorator';
import { Role } from 'src/shared/enums';
import { RolesGuard } from 'src/guards/roles.guard';


@Controller('user-guides')
export class UserGuideController {
  constructor(private readonly userGuideService: UserGuideService) {}

  @UseGuards(AuthGuard)
  @Get()
  findOne(@Headers('Authorization') authorization: string, @Query() data : FindUserGuideDto) {
    return this.userGuideService.findOne(authorization, data);
  }
  @UseGuards(AuthGuard)
  @Post('/:id/read')
  readGuide(@Headers('Authorization') authorization: string, @Param('id') id :string){
    return this.userGuideService.readGuide(authorization, id)
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post('/bulk')
  bulk(@Body() data : any){
    return  this.userGuideService.bulk(data)
  }

  
}
