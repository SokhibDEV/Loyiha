import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';


@Controller('guides')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}


  @Post()
  create(@Body() data: CreateGuideDto) {
    return this.guideService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guideService.findOne(+id);
  }
  
  
}
