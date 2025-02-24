import { IsEmail, IsOptional, IsString } from "class-validator"

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username: string
    
    @IsOptional()
    @IsString()
    fullName: string
    
    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    rolId: string

}
