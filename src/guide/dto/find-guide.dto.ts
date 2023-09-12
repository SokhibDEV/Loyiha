import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { SortOrder } from 'src/shared/enums';
import { OffsetPaginationDto } from 'src/shared/offset-pagination.dto';

export class SortGuideDto {
  @IsOptional()
  @IsEnum(['id', 'age'])
  by: string = 'id';

  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.ASC;
}

export class FindGuideDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => OffsetPaginationDto)
  page?: OffsetPaginationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortGuideDto)
  sort?: SortGuideDto;
}
