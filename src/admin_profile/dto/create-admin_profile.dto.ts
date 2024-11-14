import { IsString } from "class-validator";

export class CreateAdminProfileDto {

    @IsString()
    user_id: string
}
