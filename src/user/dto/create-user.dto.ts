import { IsDateString, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    uuid: string

    @IsString()
    username: string

    @IsStrongPassword()
    password: string;

}
