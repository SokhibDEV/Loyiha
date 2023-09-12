import {
  Body,
  Controller,
  Get,
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
import { CreateGuideDto } from './dto/create-guide.dto';
import { FindGuideDto } from './dto/find-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';
import { GuideService } from './guide.service';

@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  create(@Body() data: CreateGuideDto) {
    return this.guideService.create(data);
  }
  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Query() findGuideDto: FindGuideDto) {
    return this.guideService.findAll(findGuideDto);
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.guideService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updata(@Param('id') id: string, @Body() data: UpdateGuideDto) {
    return this.guideService.update(id, data);
  }
}
