import { Injectable } from '@nestjs/common';
import { CreateUserSocketDto } from './dto/create-user_socket.dto';
import { UpdateUserSocketDto } from './dto/update-user_socket.dto';
import { UserSocket } from './entities/user_socket.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserSocketService {

  constructor(
    @InjectRepository(UserSocket)
    private readonly uSocketRepository: Repository<UserSocket>,
  ){}

  create(createUserSocketDto: CreateUserSocketDto) {
    this.uSocketRepository.save(createUserSocketDto);
  }

  findAll() {
    return this.uSocketRepository.find();
  }

  findAllWhereCompany(company: number) {
    return this.uSocketRepository.find({where: {company}});
  }

  findOne(id: string): Promise<UserSocket | null> {
    return this.uSocketRepository.findOne({where: {id}});
  }

  update(id: string, updateUserSocketDto: UpdateUserSocketDto) {
    this.uSocketRepository.update(id, updateUserSocketDto);
  }

  remove(id: string) {
    this.uSocketRepository.delete(id);
  }
}
