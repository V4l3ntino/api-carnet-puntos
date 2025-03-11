import { Field, ObjectType } from "@nestjs/graphql";
import { TipoIncidencia } from "src/tipo_incidencia/entities/tipo_incidencia.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@ObjectType()
@Entity('Grado')
export class Grado {
    @Field()
    @PrimaryColumn()
    id: string
    @Field()
    @Column()
    nombre: string
    @Field()
    @Column()
    cantidadPuntos: number

    @ManyToOne(() => User, (user) => user.grado, {onDelete:'SET NULL'})
    user: User
    
    @OneToMany(() => TipoIncidencia, (tipoIncidencia) => tipoIncidencia.grado)
    tipoIncidencia: TipoIncidencia[]
}
