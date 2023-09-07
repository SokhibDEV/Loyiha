import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Role, SortOrder } from 'src/shared/enums';
import { OffsetPaginationDto } from 'src/shared/offset-pagination.dto';

export class SortUserDto {
  @IsOptional()
  @IsEnum(['id', 'age'])
  by: string = 'id';

  @IsOptional()
  @IsEnum(SortOrder)
  order: SortOrder = SortOrder.ASC;
}

export class FilterUserDto {
  @IsOptional()
  @IsEnum(Role)
  role: Role = Role.ADMIN;
}

export class FindUserDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => OffsetPaginationDto)
  page?: OffsetPaginationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SortUserDto)
  sort?: SortUserDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FilterUserDto)
  filters?: FilterUserDto;
}
