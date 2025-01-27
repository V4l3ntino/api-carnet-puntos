import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'

@WebSocketGateway()
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnect: ${client.id}`)
    }

    @SubscribeMessage('mensaje')
    handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log(data)
        client.broadcast.emit('mensajeserver', data)
    }

    @SubscribeMessage('newIncidencia')
    newIncidencia(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log(data)
        client.broadcast.emit('mensajeserver', data)
    }

}