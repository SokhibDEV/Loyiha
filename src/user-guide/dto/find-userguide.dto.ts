import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Complated, Role, SortOrder } from 'src/shared/enums';
import { OffsetPaginationDto } from 'src/shared/offset-pagination.dto';



export class FilterUserDto {
  @IsOptional()
  @IsEnum(Complated)
  complated?:Complated;
}

export class FindUserGuideDto {

  @IsOptional()
  @ValidateNested()
  @Type(() => OffsetPaginationDto)
  page?: OffsetPaginationDto;

  

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterUserDto)
  filters?: FilterUserDto;

}
