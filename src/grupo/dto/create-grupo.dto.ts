import { IsString } from "class-validator";

export class CreateGrupoDto {
    @IsString()
    id: string

    @IsString()
    nombre: string
}
