import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { veryPassword } from 'functions/functions';
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
                let permisos = user.adminProfile?.permiso.tabla
                if(permisos == null){
                    permisos = user.profesorProfile?.permiso.tabla
                }
                const tokenPayload = {
                    sub: user.id,
                    username: user.username,
                    permisos: permisos
                }
                const accessToken = await this.jwtService.signAsync(tokenPayload);

                return {
                    accessToken: accessToken,
                    userId: user.id,
                    username: user.username
                }
            }

        } catch (error) {
            throw error
        }
    }

}
