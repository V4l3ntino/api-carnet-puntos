import { Injectable } from '@nestjs/common';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';

@Injectable()
export class AppService {

  constructor(
    private readonly webSocket: WebsocketsGateway
  ){}

  emitPost(pool: string): void {
    this.webSocket.emitPost(pool)
  }
  emitDelete(body: any): void {
    this.webSocket.emitDelete(body)
  }

}
