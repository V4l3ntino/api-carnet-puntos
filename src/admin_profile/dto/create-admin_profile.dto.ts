import { IsString } from "class-validator";

export class CreateAdminProfileDto {

    @IsString()
    user: string
}
