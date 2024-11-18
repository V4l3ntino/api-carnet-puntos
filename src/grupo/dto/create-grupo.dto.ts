import { IsNumberString, IsString } from "class-validator";

export class CreateGrupoDto {
    @IsString()
    uuid: string

    @IsNumberString()
    id: string
    @IsString()
    nombre: string
}
