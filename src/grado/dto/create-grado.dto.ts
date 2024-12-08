import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateGradoDto {
    @IsString()
    user_id: string

    @IsNumberString()
    id: string
    
    @IsString()
    nombre: string

    @IsNumberString()
    cantidadPuntos: string
}
