import { forwardRef, Inject } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import { AlumnoProfileService } from "src/alumno_profile/alumno_profile.service";
import { CreateIncidenciaDto } from "src/incidencia/dto/create-incidencia.dto";
import { Incidencia } from "src/incidencia/entities/incidencia.entity";
import { IncidenciaService } from "src/incidencia/incidencia.service";
import { ProfesorProfileService } from "src/profesor_profile/profesor_profile.service";
import { TipoIncidencia } from "src/tipo_incidencia/entities/tipo_incidencia.entity";
import { TipoIncidenciaService } from "src/tipo_incidencia/tipo_incidencia.service";

@WebSocketGateway({
    cors: {
      origin: '*', // URL del frontend
      methods: ['GET', 'POST'], // Métodos permitidos
      credentials: true, // Si necesitas cookies o autenticación
    },
  })
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer()
    server: Server;

    constructor(
        @Inject(forwardRef(() => IncidenciaService))
        private readonly incidenciaService: IncidenciaService,
        private readonly profesorService: ProfesorProfileService,
        private readonly alumnoService: AlumnoProfileService,
        @Inject(forwardRef(() => TipoIncidenciaService))
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
    async newIncidencia(@ConnectedSocket() client: Socket, @MessageBody() data: CreateIncidenciaDto){
        // console.log(data)
        await this.incidenciaService.create(data)
        // const INCIDENCIAS: Incidencia[] = await this.incidenciaService.findAll()
        const INCIDENCIA: Incidencia = await this.incidenciaService.findOne(data.id)
        // console.log(INCIDENCIAS)
        client.broadcast.emit('incidencia', INCIDENCIA)
    }

    @SubscribeMessage('deleteIncidencia')
    async deleteIncidencia(@ConnectedSocket() client: Socket, @MessageBody() id: string){
        await this.incidenciaService.remove(id)
        client.broadcast.emit('idIncidencia', id)
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

    @SubscribeMessage('aplicarRoles')
    async aplicarRoles(@ConnectedSocket() client: Socket){
        console.log("recibido")
        // console.log(INCIDENCIAS)
        client.broadcast.emit('updateToken')
    }



    incidenciasEmit(data: Incidencia){
        this.server.emit("incidencia", data)
    }
    
    incidenciasDelete(id: string){
        this.server.emit("incidenciaDelete", id)
    }
    
    tipoincidenciasEmit(data: TipoIncidencia){
        this.server.emit("tipoincidencia", data)
    }
    
    tipoincidenciasDelete(id: string){
        this.server.emit("tipoincidenciaDelete", id)
    }

}