import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { deleteUserAccount, getDateNow, hashPassword, newMessage, veryPassword } from 'functions/functions';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PermisosService } from 'src/permisos/permisos.service';
@Injectable()
export class UserService {

  constructor(
     @InjectRepository(User)
     private readonly uRepository: Repository<User>,
     private readonly permisoService: PermisosService
  ){}

  async create(createUserDto: CreateUserDto) {
    try {
      const {password, username, uuid, permiso, email, fullName} = createUserDto
      const user = new User()
      const rol = await this.permisoService.findOne(permiso)
      if(!rol){
        throw new Error("Rol of user not found")
      }
      user.created_at = getDateNow()
      user.id = uuid
      user.permiso = rol
      user.username = username
      user.email = email
      user.password = await hashPassword(password);
      await this.uRepository.save(user);
      const profile:CreateProfileDto = {
        userId: uuid,
        fullName: fullName,
      }
      const request = await fetch("http://localhost:3000/api/profile/",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify(profile)
      })
      const requestData = await request.json()
      // if(!requestData.ok){
      //   throw new HttpException(`${requestData.message}`, 400)
      // }
      console.log(requestData)

      return newMessage('User created', 200);

    } catch (error) {
      console.log(error);
      if(error.code == 23505){
         throw new HttpException("El nombre de usuario o email ya existe", 400);
      }
      if(error.status == 400){
        throw new HttpException(error.message,400)
      }
      throw new InternalServerErrorException("Error creating user")
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.uRepository.find({relations: [
        'profile', 
        'adminProfile',
        'profesorProfile',
        'alumnoProfile',
        'permiso'
      ]})
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException("Erro to find all users")
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.uRepository.findOne({where:{ id }, relations: ['profile', 'adminProfile', 'profesorProfile', 'alumnoProfile', 'permiso']});
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

  async findOneByUsername(username: string): Promise<User>{
    try {
      const user = await this.uRepository.findOne({where: {username}, relations: [
        'profile', 
        'adminProfile', 
        'profesorProfile',
        'alumnoProfile',
        'permiso',
        'permiso.tabla'
      ]} )
      return user
    } catch (error) {
      throw new InternalServerErrorException("Error to find user by username")
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
      const user = await this.uRepository.findOne({where: { id }, relations: ['adminProfile', 'profesorProfile', 'alumnoProfile']});
      if(!user){
        throw new NotFoundException('User not found');
      }
      let requestData: any
      if (user.adminProfile != null && user.profesorProfile != null){
        requestData = await deleteUserAccount("profesor-profile", id)
        requestData = await deleteUserAccount("admin-profile", id)
      } else {
        
        if (user.adminProfile != null) {
          requestData = await deleteUserAccount("admin-profile", id)
        } else if (user.profesorProfile != null) {
          requestData = await deleteUserAccount("profesor-profile", id)
        }
        
      }
      if (user.alumnoProfile != null){
        requestData = await deleteUserAccount("alumno-profile", id)
      } 
      
      if (user.adminProfile == null && user.profesorProfile == null && user.alumnoProfile == null){
        requestData = {
          status: 200
        }
      }

      console.log(requestData)
      if(requestData.status !== 200){
        throw new Error("Admin profile could not be deleted so we cant delete user account")
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

  async login(username: string, loginUserDto:LoginUserDto){
    
  }
}
