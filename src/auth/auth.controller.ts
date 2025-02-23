import { Body, Controller, Get, InternalServerErrorException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { veryPassword } from 'functions/functions';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post()
    async authenticate(@Body() loginUserDto: LoginUserDto){
        try {
            const response =  await this.authService.authenticate(loginUserDto)
            if(!response){
                throw new UnauthorizedException()
            }
            return response
        } catch (error) {
            throw error
        }
    }

    @Post("/sign-up")
    async signUp(@Body() userNew: CreateUserDto){
        const response = await this.authService.signUp(userNew)
        return response;
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return request.user
    }
}
