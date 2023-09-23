import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { UserGuideService } from './user-guide.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { FindUserGuideDto } from './dto/find-userguide.dto';
import { Roles } from 'src/guards/roller.decorator';
import { Role } from 'src/shared/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { Request } from 'supertest';

@Controller('user-guides')
export class UserGuideController {
  constructor(private readonly userGuideService: UserGuideService) {}

  @UseGuards(AuthGuard)
  @Get()
  findOne(@Req() req: Request, @Query() data: FindUserGuideDto) {
    return this.userGuideService.findOne(req['user'].id, data);
  }
  @UseGuards(AuthGuard)
  @Post('/:id/read')
  readGuide(@Req() req: Request, @Param('id') id: string) {
    return this.userGuideService.readGuide(req['user'].id, id);
  }
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/bulk')
  bulk(@Body() data: any) {
    return this.userGuideService.bulk(data);
  }
}
