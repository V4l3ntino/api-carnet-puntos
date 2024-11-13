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

}
