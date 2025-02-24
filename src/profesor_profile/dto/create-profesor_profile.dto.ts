import { IsNumberString, IsString } from "class-validator"
import { Field, InputType } from "@nestjs/graphql";
@InputType() 
export class CreateProfesorProfileDto {
    @Field()
    
    @IsString()
    id: string
    
    @Field()
    @IsString()
    materia: string
    
    @Field()
    @IsNumberString()
    grupo_id: string

    // @IsString()
    // permiso: string

    // @IsArray()
    // @ValidateNested({each: true}) // Valida que cada elemento del array sea un objeto válido
    // @Type(() => CreateTablaDto) //Transorma cada objeto a una instancia de CreateTablaDto
    // @ArrayMinSize(4)
    // @ArrayMaxSize(4)
    // tablas: CreateTablaDto[]
}
