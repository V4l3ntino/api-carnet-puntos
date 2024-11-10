import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetrasosService } from './retrasos.service';
import { CreateRetrasoDto } from './dto/create-retraso.dto';
import { UpdateRetrasoDto } from './dto/update-retraso.dto';

@Controller('retrasos')
export class RetrasosController {
  constructor(private readonly retrasosService: RetrasosService) {}

  @Post()
  create(@Body() createRetrasoDto: CreateRetrasoDto) {
    return this.retrasosService.create(createRetrasoDto);
  }

  @Get()
  findAll() {
    return this.retrasosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retrasosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetrasoDto: UpdateRetrasoDto) {
    return this.retrasosService.update(+id, updateRetrasoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retrasosService.remove(+id);
  }
}
