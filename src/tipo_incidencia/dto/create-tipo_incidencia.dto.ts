import { IsNumberString, IsString } from "class-validator"

export class CreateTipoIncidenciaDto {
    @IsString()
    user_id: string
    
    @IsString()
    id: string
    @IsNumberString()
    grado: string
    @IsString()
    descripcion: string

}
