import { IsDateString, IsEmail, IsString, IsStrongPassword } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {

    @Field()
    @IsString()
    uuid: string

    @Field()
    @IsString()
    username: string

    @Field()
    @IsStrongPassword()
    password: string;

    @Field()
    @IsString()
    permiso: string

    @Field()
    @IsString()
    fullName: string

    @Field()
    @IsEmail()
    email: string

}
