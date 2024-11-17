import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlumnoProfileService } from './alumno_profile.service';
import { CreateAlumnoProfileDto } from './dto/create-alumno_profile.dto';
import { UpdateAlumnoProfileDto } from './dto/update-alumno_profile.dto';

@Controller('alumno-profile')
export class AlumnoProfileController {
  constructor(private readonly alumnoProfileService: AlumnoProfileService) {}

  @Post()
  create(@Body() createAlumnoProfileDto: CreateAlumnoProfileDto) {
    return this.alumnoProfileService.create(createAlumnoProfileDto);
  }

  @Get()
  findAll() {
    return this.alumnoProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnoProfileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlumnoProfileDto: UpdateAlumnoProfileDto) {
    return this.alumnoProfileService.update(id, updateAlumnoProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnoProfileService.remove(id);
  }
}
