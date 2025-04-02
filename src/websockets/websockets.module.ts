import { forwardRef, Module } from "@nestjs/common";
import { WebsocketsGateway } from "./websockets.gateway";
import { IncidenciaModule } from "src/incidencia/incidencia.module";
import { ProfesorProfileModule } from "src/profesor_profile/profesor_profile.module";
import { AlumnoProfileModule } from "src/alumno_profile/alumno_profile.module";
import { TipoIncidenciaModule } from "src/tipo_incidencia/tipo_incidencia.module";
import { UserSocketModule } from "src/user_socket/user_socket.module";

@Module({
    imports: [forwardRef(() => IncidenciaModule), ProfesorProfileModule, AlumnoProfileModule, TipoIncidenciaModule, UserSocketModule],
    providers: [WebsocketsGateway],
    exports: [WebsocketsGateway]
})
export class GateWayModule{}