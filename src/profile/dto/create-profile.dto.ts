import { IsEmail, IsNumberString, IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    fullName: string;
    @IsString()
    avatar?: string;
    @IsEmail()
    email: string;
    @IsNumberString()
    userId: number;
}
