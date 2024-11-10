import { Injectable } from '@nestjs/common';
import { CreateRetrasoDto } from './dto/create-retraso.dto';
import { UpdateRetrasoDto } from './dto/update-retraso.dto';

@Injectable()
export class RetrasosService {
  create(createRetrasoDto: CreateRetrasoDto) {
    return 'This action adds a new retraso';
  }

  findAll() {
    return `This action returns all retrasos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} retraso`;
  }

  update(id: number, updateRetrasoDto: UpdateRetrasoDto) {
    return `This action updates a #${id} retraso`;
  }

  remove(id: number) {
    return `This action removes a #${id} retraso`;
  }
}
