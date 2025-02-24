import { IsBoolean, IsString } from "class-validator"

export class CreateTablaDto {
    @IsString()
    id: string

    @IsString()
    tipo: string
    @IsBoolean()
    admin_profile: boolean
    @IsBoolean()    
    profile: boolean
    @IsBoolean()
    user: boolean
    @IsBoolean()
    alumno_profile: boolean
    @IsBoolean()
    profesor_profile: boolean
    @IsBoolean()
    incidencia: boolean
    @IsBoolean()
    grado: boolean
    @IsBoolean()
    tipo_incidencia: boolean
    @IsBoolean()
    permisos: boolean
    @IsBoolean()
    tablas: boolean
    @IsBoolean()
    cuenta_puntos: boolean
    @IsBoolean()
    retrasos: boolean
    @IsBoolean()
    grupo: boolean

    @IsString()
    permiso_id: string

}
