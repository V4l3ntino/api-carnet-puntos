import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsString()
    fullName?: string;
    @IsString()
    avatar?: string;
    @IsEmail()
    email?: string;
}
