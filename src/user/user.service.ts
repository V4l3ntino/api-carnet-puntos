import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { newMessage } from 'functions/functions';
import { v4 as uuidv4 } from 'uuid';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
@Injectable()
export class UserService {

  constructor(
     @InjectRepository(User)
     private readonly uRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {

    try {
      const user = this.uRepository.create(createUserDto)
      user.id = uuidv4()
      await this.uRepository.save(user);
      const profile:CreateProfileDto = {
        avatar: "",
        email: "",
        fullName: "",
        userId: user.id
      }
      const request = await fetch("http://localhost:3000/api/profile/",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify(profile)
      })

      return newMessage('User created', 200);

    } catch (error) {
      console.log(error);
      if(error.code == 23505){
         return newMessage('User already exists', 500)
      }
      throw new InternalServerErrorException("Error creating user")
    }
  }

  async findAll(): Promise<User[]> {
    return await this.uRepository.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.uRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user  
    } catch (error) {
      console.dir(error)
      if( error instanceof NotFoundException){
        throw error
      }

      throw new InternalServerErrorException("Error to find user")      
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.uRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      Object.assign(user, updateUserDto)
      await this.uRepository.save(user);
      return newMessage('User updated', 200);
  
    } catch (error) {
      console.log(error)
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException("Error updating user")      
    }

  }

  async remove(id: string) {
    try {
      const user = await this.uRepository.findOneBy({ id });
      if(!user){
        throw new NotFoundException('User not found');
      }
      await this.uRepository.delete(id);
      return newMessage('User deleted', 200);
    } catch (error) {
      console.log(error)
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException("Error deliting user")
    }
  }
}
