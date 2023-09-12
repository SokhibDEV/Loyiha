import { IsBoolean, IsString } from 'class-validator';

export class CreateGuideDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  notify: boolean;
}
