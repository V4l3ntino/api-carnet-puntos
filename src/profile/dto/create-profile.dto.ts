import { IsEmail, IsNumberString, IsOptional, IsString } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProfileDto {
    @Field()
    @IsString()
    @IsOptional()
    fullName: string;

    @Field()
    @IsString()
    @IsOptional()
    avatar?: string;
    
    @Field()
    @IsString()
    userId: string;
}
