import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSocketDto } from './create-user_socket.dto';

export class UpdateUserSocketDto extends PartialType(CreateUserSocketDto) {}
