import { forwardRef, Inject } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Server, Socket} from 'socket.io'
import { AlumnoProfileService } from "src/alumno_profile/alumno_profile.service";
import { CreateIncidenciaDto } from "src/incidencia/dto/create-incidencia.dto";
import { Incidencia } from "src/incidencia/entities/incidencia.entity";
import { IncidenciaService } from "src/incidencia/incidencia.service";
import { ProfesorProfileService } from "src/profesor_profile/profesor_profile.service";
import { TipoIncidenciaService } from "src/tipo_incidencia/tipo_incidencia.service";
import { CreateUserSocketDto } from "src/user_socket/dto/create-user_socket.dto";
import { UserSocketService } from "src/user_socket/user_socket.service";

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
    
    private roomSet: Set<string> = new Set<string>();
    private app_paths_list: String[] = ['recommendation_new', 'task_planner_new', 'task_new', 'dynamicforms/template', 'plantation/optimization', 'visit', 'access']
    constructor(
        @Inject(forwardRef(() => IncidenciaService))
        private readonly incidenciaService: IncidenciaService,
        private readonly profesorService: ProfesorProfileService,
        private readonly alumnoService: AlumnoProfileService,
        private readonly tipoIncidenciaService: TipoIncidenciaService,
        private readonly userSocketService: UserSocketService,
    ) {}

    async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`)
        if(client.handshake.query.userapp){
            const userapp = typeof client.handshake.query.userapp === 'string' ? JSON.parse(client.handshake.query.userapp) : {};
            const userSocketid = `${userapp.company || client.id}_${userapp.email || `user`}`
            client.join(`userappcompany: ${userapp.company || 0}`)
            const rooms = Array.from(this.server.sockets.adapter.rooms.keys());
            console.log('Listado de rooms:', rooms);
            const userSocket = await this.userSocketService.findOne(userSocketid)
            if(userSocket){
                if(userSocket.changesQuantity > 0){
                    client.emit('changesQuantity', userSocket.changesQuantity)
                    return
                }
            }

            const userSocketNew: CreateUserSocketDto = {
                id: userSocketid,
                company: userapp.company || 0,
                changesQuantity: 0
            }
            console.log('USUARIO NUEVO ', userSocketNew)
            this.userSocketService.create(userSocketNew)
            return
        }
        if(client.handshake.query.pool){
            const pool = client.handshake.query.pool
            if (typeof pool === 'string') {
                client.join(pool.toLowerCase());
                this.roomSet.add(pool.toLowerCase());
            }
            const rooms = Array.from(this.server.sockets.adapter.rooms.keys());
            console.log('Listado de rooms:', this.roomSet);
        }
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnect: ${client.id}`)
    }

    @SubscribeMessage('dataIsReloaded')
    handleJoinCompany(@ConnectedSocket() client: Socket, @MessageBody() userSocketId: string): void {
        const userSocket = this.userSocketService.findOne(userSocketId);
        userSocket.then((userSocket) => {
            userSocket.changesQuantity = 0;
            this.userSocketService.update(userSocketId, userSocket);
    })
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

    async emitPost(poolName: string){
        const company = poolName.split('.')[0]
        const pathRequest = poolName.split('.')[1]
        if(this.app_paths_list.some(path => path.includes(pathRequest))){
            console.log('EMITIENDO CAMBIOS EN APP')
            this.server.to(`userappcompany: ${company}`).emit('changesApp')
            const userSocketList = await this.userSocketService.findAllWhereCompany(+company)
            userSocketList.forEach(user => {
                user.changesQuantity += 1;
                this.userSocketService.update(user.id, user);
            });
        }
        this.roomSet.forEach((_, room) => {
            if(room.startsWith(poolName.toLowerCase())){
                console.log('EMITIENDO A LA ROOM', poolName);
                this.server.to(room).emit('createOrUpdate');
                return
            }
        });
    }
    async emitDelete(body: any){
        const company = body?.poolName.split('.')[0]
        const pathRequest = body?.poolName.split('.')[1]
        if(this.app_paths_list.some(path => path.includes(pathRequest))){
            console.log('EMITIENDO CAMBIOS EN APP')
            this.server.to(`userappcompany: ${company}`).emit('changesApp')
            const userSocketList = await this.userSocketService.findAllWhereCompany(+company)
            userSocketList.forEach(user => {
                user.changesQuantity += 1;
                this.userSocketService.update(user.id, user);
            });
        }
        this.roomSet.forEach((_, room) => {
            if(room.startsWith(body?.poolName?.toLowerCase())){
                console.log('EMITIENDO A LA ROOM', body?.poolName);
                this.server.to(room).emit('delete', body?.user);
                return
            }
        });
    }



}