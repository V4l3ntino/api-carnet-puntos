import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { veryPassword } from 'functions/functions';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ){}


    async authenticate(loginUserDto: LoginUserDto){
        try {
            const user = await this.userService.findOneByUsername(loginUserDto.username)
            if(!user){
                throw new UnauthorizedException()
            }
            if(await veryPassword(loginUserDto.password,user.password)){
                const tokenPayload = {
                    sub: user.id,
                    username: user.username,
                    fullName: user.profile.fullName,
                    email: user.email,
                    avatar: user.profile.avatar,
                    rolname: user.permiso?.nombre,
                    permisos: user.permiso?.tabla
                }
                const accessToken = await this.jwtService.signAsync(tokenPayload);
                return {
                    accessToken: accessToken,
                    // userId: user.id,
                    // username: user.username,
                    // permisos: permisos
                }
            }

        } catch (error) {
            throw error
        }
    }

    async signUp(newUser: CreateUserDto){
        try {
            const response = this.userService.create(newUser)
            return response
        } catch (error) {
            throw error
        }
    }

}
