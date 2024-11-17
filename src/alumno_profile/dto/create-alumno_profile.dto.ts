import { IsBoolean, IsDateString, isDateString, IsString } from "class-validator"

export class CreateAlumnoProfileDto {

    @IsString()
    id: string
    @IsDateString()
    fechaNacimiento: string
    @IsBoolean()
    repetidor: boolean
}
