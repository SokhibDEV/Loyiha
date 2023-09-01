import { IsEnum, IsString, IsNumber } from 'class-validator';
import { UserRole } from 'src/shared/enums';


export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsNumber()
  age: number;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  username: string;

  @IsString()
  password: string;
}


