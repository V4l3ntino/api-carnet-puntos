import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { newMessage } from 'functions/functions';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createGrupoDto: CreateGrupoDto, @Request() request) {
    const insert = request.user?.permisos.find((item) => item.tipo == "i")
    if(insert.grupo){
      return this.grupoService.create(createGrupoDto);
    }
    return new ForbiddenException()
  }

  @Get()
  findAll() {
    return this.grupoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
    return this.grupoService.update(id, updateGrupoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grupoService.remove(id);
  }
}
