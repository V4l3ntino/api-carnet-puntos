import { IsDateString, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsString()
    username: string

    @IsStrongPassword()
    password: string;

    @IsDateString()
    created_at: string

}
