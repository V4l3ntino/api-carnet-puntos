import { IsEmail, IsNumberString, IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    fullName: string;
    @IsString()
    avatar?: string;
    @IsString()
    email: string;
    @IsString()
    userId: string;
}
