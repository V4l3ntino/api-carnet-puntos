import { IsBoolean, IsDateString, isDateString, IsNumberString, IsString } from "class-validator"

export class CreateAlumnoProfileDto {

    @IsString()
    id: string
    @IsDateString()
    fechaNacimiento: string
    @IsBoolean()
    repetidor: boolean
    
    @IsNumberString()
    grupo_id: string
}
