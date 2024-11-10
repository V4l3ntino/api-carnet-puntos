import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TablasService } from './tablas.service';
import { CreateTablaDto } from './dto/create-tabla.dto';
import { UpdateTablaDto } from './dto/update-tabla.dto';

@Controller('tablas')
export class TablasController {
  constructor(private readonly tablasService: TablasService) {}

  @Post()
  create(@Body() createTablaDto: CreateTablaDto) {
    return this.tablasService.create(createTablaDto);
  }

  @Get()
  findAll() {
    return this.tablasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTablaDto: UpdateTablaDto) {
    return this.tablasService.update(+id, updateTablaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablasService.remove(+id);
  }
}
