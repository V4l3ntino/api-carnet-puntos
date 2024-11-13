import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginUserDto } from './user/dto/login-user.dto';
import { newMessage } from 'functions/functions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async login(@Body() loginUserdto: LoginUserDto): Promise<messageResponse> {
    try {
      const request = await fetch("http://localhost:3000/api/user/verify",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'  
        },
        body: JSON.stringify(loginUserdto)
      })
      const responseData = await request.json();
      if(responseData.status == 200){
        return newMessage("User logged", 200);
      }
      return newMessage("User or password incorrect", 401)
    } catch (error) {
      console.log(error)
    }
  }
}
