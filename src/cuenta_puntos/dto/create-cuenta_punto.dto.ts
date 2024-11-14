import { IsNumberString, IsString } from "class-validator"

export class CreateCuentaPuntoDto {
    @IsString()
    id: string
    @IsNumberString()
    cantidad: number
}
