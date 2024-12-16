import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ForbiddenException } from '@nestjs/common';
import { GradoService } from './grado.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('grado')
export class GradoController {
  constructor(private readonly gradoService: GradoService) {}

  // @UseGuards(AuthGuard)
  // @Post()
  // create(@Body() createGradoDto: CreateGradoDto, @Request() request) {
  //   const insert = request.user?.permisos.find((item) => item.tipo == "i")

  //   if(insert.grado){
      
  //     return this.gradoService.create(createGradoDto);
  //   }
  //   return new ForbiddenException()
  // }
  @Post()
  create(@Body() createGradoDto: CreateGradoDto) {
    return this.gradoService.create(createGradoDto);
  }

  @Get()
  findAll() {
    return this.gradoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradoDto: UpdateGradoDto) {
    return this.gradoService.update(id, updateGradoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradoService.remove(id);
  }
}
