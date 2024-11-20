import { IsNumber, IsString } from "class-validator"

export class CreateCuentaPuntoDto {
    @IsString()
    id: string
    @IsNumber()
    cantidad: number
}
