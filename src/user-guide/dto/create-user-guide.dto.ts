import { IsArray, IsBoolean, IsString} from "class-validator"

export class CreateUserGuideDto {
    @IsString()
    guide_id : string
    @IsString()
    user_id : string
    
    @IsBoolean()
    complated: boolean
}
