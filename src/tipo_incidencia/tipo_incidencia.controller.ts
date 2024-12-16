import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { TipoIncidenciaService } from './tipo_incidencia.service';
import { CreateTipoIncidenciaDto } from './dto/create-tipo_incidencia.dto';
import { UpdateTipoIncidenciaDto } from './dto/update-tipo_incidencia.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('tipo-incidencia')
export class TipoIncidenciaController {
  constructor(private readonly tipoIncidenciaService: TipoIncidenciaService) {}

  // @Post()
  // @UseGuards(AuthGuard)
  // create(@Body() createTipoIncidenciaDto: CreateTipoIncidenciaDto, @Request() request) {
  //   const insert = request.user?.permisos.find((item) => item.tipo == "i")

  //   if(insert.tipo_incidencia){
  //     return this.tipoIncidenciaService.create(createTipoIncidenciaDto);
  //   }
  //   return new ForbiddenException()
  // }

  @Post()
  create(@Body() createTipoIncidenciaDto: CreateTipoIncidenciaDto) {
    return this.tipoIncidenciaService.create(createTipoIncidenciaDto);
  }

  @Get()
  findAll() {
    return this.tipoIncidenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoIncidenciaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoIncidenciaDto: UpdateTipoIncidenciaDto) {
    return this.tipoIncidenciaService.update(id, updateTipoIncidenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoIncidenciaService.remove(id);
  }
}
