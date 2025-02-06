import { Field, InputType } from "@nestjs/graphql";
import { IsNumberString, IsString } from "class-validator";

@InputType() // Input de entrada al mutation createIncidencia() --> resolver
export class CreateIncidenciaDto {
    @Field()
    @IsString()
    user_id: string
    
    @Field()
    @IsString()
    id: string

    @Field()
    @IsString()
    alumno_id: string

    @Field()
    @IsString()
    descripcion: string

    @Field()
    @IsString()
    tipoIncidencia: string

}
