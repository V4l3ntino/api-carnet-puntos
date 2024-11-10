import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminProfileDto } from './create-admin_profile.dto';

export class UpdateAdminProfileDto extends PartialType(CreateAdminProfileDto) {}
