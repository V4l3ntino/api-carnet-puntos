import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { newMessage } from 'functions/functions';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private readonly pRepository: Repository<Profile>,
    private readonly uService: UserService
  ){}

  async create(createProfileDto: CreateProfileDto) {
    try {
      const user = await this.uService.findOne(createProfileDto.userId);
      if(!user){
        throw new NotFoundException('User not found')
      }
      const profile = this.pRepository.create(createProfileDto);
      profile.user = user
      profile.ida = `${user.id}`
      await this.pRepository.save(profile);
      
      return newMessage('Profile createdasdfa',200)
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      if(error.code == 23505){
        throw new HttpException("El email ya existe", 400);
      }
      throw new InternalServerErrorException("Error creating profile")
    }
  }

  async findAll() {
    return await this.pRepository.find();
  }

  async findOne(ida: string) {
    try {
      const profile = await this.pRepository.findOneBy({ida})
      if(!profile){
        throw new NotFoundException('Profile not found')
      }
      return profile
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException("Error to find profile")
    }
  }

  async update(ida: string, updateProfileDto: UpdateProfileDto) {
    try {
      const profile = await this.pRepository.findOne({where: {ida}, relations: {user: true},})
      if(!profile){
        throw new NotFoundException('User not found')
      }
      const newProfile = this.pRepository.create(updateProfileDto)
      newProfile.ida = profile.ida
      newProfile.user = profile.user
      this.pRepository.save(newProfile);
      return newMessage('Profile updated',200)
    } catch (error) {
      console.log(error)
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException("Error updating profile")
    }
  }

  async remove(ida: string) {
    try {
      const profile = await this.pRepository.findBy({ida})
      if(!profile){
        throw new NotFoundException("Profile not found")
      } 
      await this.pRepository.delete(ida)
      return newMessage('User deleted', 200)
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      throw new InternalServerErrorException('Error deleting profile')
    }
  }
}
