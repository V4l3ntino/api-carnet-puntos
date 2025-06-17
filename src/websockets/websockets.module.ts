import { forwardRef, Module } from "@nestjs/common";
import { WebsocketsGateway } from "./websockets.gateway";
import { IncidenciaModule } from "src/incidencia/incidencia.module";
import { ProfesorProfileModule } from "src/profesor_profile/profesor_profile.module";
import { AlumnoProfileModule } from "src/alumno_profile/alumno_profile.module";
import { TipoIncidenciaModule } from "src/tipo_incidencia/tipo_incidencia.module";

@Module({
    imports: [forwardRef(() => IncidenciaModule), ProfesorProfileModule, AlumnoProfileModule, forwardRef(() => TipoIncidenciaModule)],
    providers: [WebsocketsGateway],
    exports: [WebsocketsGateway]
})
export class GateWayModule{}