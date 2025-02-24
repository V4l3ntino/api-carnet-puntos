import { CuentaPunto } from "src/cuenta_puntos/entities/cuenta_punto.entity";
import { Grupo } from "src/grupo/entities/grupo.entity";
import { Incidencia } from "src/incidencia/entities/incidencia.entity";
import { Permiso } from "src/permisos/entities/permiso.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('Alumno-profile')
export class AlumnoProfile {
    @Field()
    @PrimaryColumn()
    idea: string;

    @Field()
    @Column()
    created_at: string;

    @Field()
    @Column()
    edad: number

    @Field()
    @Column()
    repetidor: boolean



    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    // @OneToOne(() => Permiso)
    // @JoinColumn()
    // permiso: Permiso

    @Field(() => Incidencia, { nullable: true })
    @OneToMany(() => Incidencia, (incidencia) => incidencia.alumnoProfile)
    incidencia: Incidencia[]
    
    @Field(() => Grupo, { nullable: true })
    @ManyToOne(() => Grupo, (grupo) => grupo.alumnos, {onDelete: 'SET NULL'})
    grupo: Grupo

    @Field(() => CuentaPunto, { nullable: true })
    @OneToOne(() => CuentaPunto)
    @JoinColumn()
    cuentaPuntos: CuentaPunto
}
