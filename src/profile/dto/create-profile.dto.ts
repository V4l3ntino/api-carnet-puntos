import { IsEmail, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {

    @IsString()
    @IsOptional()
    fullName?: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    userId: string;
}
