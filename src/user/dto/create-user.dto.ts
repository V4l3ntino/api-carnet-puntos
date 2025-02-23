import { IsDateString, IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    uuid: string

    @IsString()
    username: string

    @IsStrongPassword()
    password: string;

    @IsString()
    permiso: string

    @IsString()
    fullName: string

    @IsEmail()
    email: string

}
