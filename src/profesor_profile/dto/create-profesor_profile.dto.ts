import { Type } from "class-transformer"
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumberString, IsString, ValidateNested } from "class-validator"
import { CreateTablaDto } from "src/tablas/dto/create-tabla.dto"

export class CreateProfesorProfileDto {
    @IsString()
    id: string
    @IsString()
    materia: string

    @IsNumberString()
    grupo_id: string

    @IsArray()
    @ValidateNested({each: true}) // Valida que cada elemento del array sea un objeto válido
    @Type(() => CreateTablaDto) //Transorma cada objeto a una instancia de CreateTablaDto
    @ArrayMinSize(4)
    @ArrayMaxSize(4)
    tablas: CreateTablaDto[]
}
