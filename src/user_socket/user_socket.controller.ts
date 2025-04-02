import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSocketService } from './user_socket.service';
import { CreateUserSocketDto } from './dto/create-user_socket.dto';
import { UpdateUserSocketDto } from './dto/update-user_socket.dto';

@Controller('user-socket')
export class UserSocketController {
  constructor(private readonly userSocketService: UserSocketService) {}

  @Post()
  create(@Body() createUserSocketDto: CreateUserSocketDto) {
    return this.userSocketService.create(createUserSocketDto);
  }

  @Get()
  findAll() {
    return this.userSocketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSocketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSocketDto: UpdateUserSocketDto) {
    return this.userSocketService.update(id, updateUserSocketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSocketService.remove(id);
  }
}
