import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/shared/enums';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsNumber()
  age: number;

  @IsEnum(Role)
  role: Role;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
