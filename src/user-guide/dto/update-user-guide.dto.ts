import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGuideDto } from './create-user-guide.dto';

export class UpdateUserGuideDto extends PartialType(CreateUserGuideDto) {}
