import { IsNumberString, IsString } from "class-validator";

export class CreateIncidenciaDto {
    
    @IsString()
    user_id: string

    @IsNumberString()
    id: string
    @IsString()
    alumno_id: string
    @IsString()
    descripcion: string
    @IsNumberString()
    tipoIncidencia: string
}
