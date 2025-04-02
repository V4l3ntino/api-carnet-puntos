import { Body, Controller, Delete, Get, Param, Post,} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(':pool')
  emitPost(@Param('pool') pool: string, @Body() body: any): void {    
    if(process.env.API_AUTH_TOKEN === body?.token){
      console.log('PETICION RECIBIDA')

      this.appService.emitPost(pool.toLocaleLowerCase());
    }
      else
      console.log('Token incorrecto', body?.token);
  }

  @Delete()
  emitDelete(@Body() body: any): void {
    if(process.env.API_AUTH_TOKEN === body?.token){
      this.appService.emitDelete(body);
    }
      else
      console.log('Token incorrecto', body?.token);
  }

}
