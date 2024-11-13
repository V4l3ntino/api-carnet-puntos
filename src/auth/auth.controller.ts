import { Body, Controller, Get, InternalServerErrorException, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { veryPassword } from 'functions/functions';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

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

    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return request.user
    }
}
