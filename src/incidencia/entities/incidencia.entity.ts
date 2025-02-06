import { Field, ObjectType } from "@nestjs/graphql";
import { AlumnoProfile } from "src/alumno_profile/entities/alumno_profile.entity";
import { TipoIncidencia } from "src/tipo_incidencia/entities/tipo_incidencia.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // Para GraphQl
@Entity('Incidencia')
export class Incidencia {
    @Field()    
    @PrimaryColumn()
    id: string
    @Field()
    @Column()
    descripcion: string
    @Field()
    @Column()
    created_at: string

    @ManyToOne(() => User, (user) => user.incidencia, {onDelete: 'SET NULL'})
    user: User

    @ManyToOne(() => AlumnoProfile, (alumnoProfile) => alumnoProfile.incidencia, {onDelete: 'CASCADE'})
    alumnoProfile: AlumnoProfile

    @ManyToOne(() => TipoIncidencia, (tipoIncidencia) => tipoIncidencia.incidencia, {onDelete: 'SET NULL'})
    tipoIncidencia: TipoIncidencia
}   
