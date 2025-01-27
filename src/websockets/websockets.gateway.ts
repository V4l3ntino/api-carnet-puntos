import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import { AlumnoProfileService } from "src/alumno_profile/alumno_profile.service";
import { Incidencia } from "src/incidencia/entities/incidencia.entity";
import { IncidenciaService } from "src/incidencia/incidencia.service";
import { ProfesorProfileService } from "src/profesor_profile/profesor_profile.service";
import { TipoIncidenciaService } from "src/tipo_incidencia/tipo_incidencia.service";

@WebSocketGateway({
    cors: {
      origin: 'http://localhost:3001', // URL del frontend
      methods: ['GET', 'POST'], // Métodos permitidos
      credentials: true, // Si necesitas cookies o autenticación
    },
  })
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    constructor(
        private readonly incidenciaService: IncidenciaService,
        private readonly profesorService: ProfesorProfileService,
        private readonly alumnoService: AlumnoProfileService,
        private readonly tipoIncidenciaService: TipoIncidenciaService
    ) {}

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
    async newIncidencia(@ConnectedSocket() client: Socket, @MessageBody() data: any){
        console.log(data)
        await this.incidenciaService.create(data)
        const INCIDENCIAS: Incidencia[] = await this.incidenciaService.findAll()
        console.log(INCIDENCIAS)
        client.broadcast.emit('incidenciasList', INCIDENCIAS)    
    }

    @SubscribeMessage('getIncidencias')
    async getIncidencias(@ConnectedSocket() client: Socket) {
        const incidencias = await this.incidenciaService.findAll();
        client.emit('incidenciasList', incidencias); 
    }

    @SubscribeMessage('getProfesores')
    async getProfesores(@ConnectedSocket() client: Socket) {
        const profesores = await this.profesorService.findAll();
        client.emit('profesoresList', profesores); 
    }

    @SubscribeMessage('getTipoIncidencias')
    async getTipoIncidencias(@ConnectedSocket() client: Socket) {
        const tipoIncidencias = await this.tipoIncidenciaService.findAll();
        client.emit('tipoInciddenciasList', tipoIncidencias); 
    }

    @SubscribeMessage('getAlumnos')
    async getAlumnos(@ConnectedSocket() client: Socket) {
        const alumnos = await this.alumnoService.findAll();
        client.emit('alumnosList', alumnos); 
    }


}