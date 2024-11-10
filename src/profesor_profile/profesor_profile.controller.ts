import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesorProfileService } from './profesor_profile.service';
import { CreateProfesorProfileDto } from './dto/create-profesor_profile.dto';
import { UpdateProfesorProfileDto } from './dto/update-profesor_profile.dto';

@Controller('profesor-profile')
export class ProfesorProfileController {
  constructor(private readonly profesorProfileService: ProfesorProfileService) {}

  @Post()
  create(@Body() createProfesorProfileDto: CreateProfesorProfileDto) {
    return this.profesorProfileService.create(createProfesorProfileDto);
  }

  @Get()
  findAll() {
    return this.profesorProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesorProfileDto: UpdateProfesorProfileDto) {
    return this.profesorProfileService.update(+id, updateProfesorProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorProfileService.remove(+id);
  }
}
