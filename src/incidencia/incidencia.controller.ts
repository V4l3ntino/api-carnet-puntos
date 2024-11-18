import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('incidencia')
export class IncidenciaController {
  constructor(private readonly incidenciaService: IncidenciaService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createIncidenciaDto: CreateIncidenciaDto, @Request() request) {
    const insert = request.user?.permisos.find((item) => item.tipo == "i")

    if(insert.incidencia){
      return this.incidenciaService.create(createIncidenciaDto);
    }
    return new ForbiddenException()
  }

  @Get()
  findAll() {
    return this.incidenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidenciaDto: UpdateIncidenciaDto) {
    return this.incidenciaService.update(+id, updateIncidenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidenciaService.remove(+id);
  }
}
