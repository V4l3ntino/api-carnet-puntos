import { Field, ObjectType } from "@nestjs/graphql";
import { Grado } from "src/grado/entities/grado.entity";
import { Incidencia } from "src/incidencia/entities/incidencia.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('Tipo_incidencia')
export class TipoIncidencia {
    @Field()
    @PrimaryColumn()
    id: string
    @Field()
    @Column()
    descripcion: string
    @Field()
    @Column()
    created_at: string
    
    @ManyToOne(() => User, (user) => user.tipoIncidencia, {onDelete:'SET NULL'})
    @JoinColumn()
    user: User

    @Field(() => Grado)
    @ManyToOne(() => Grado, (grado) => grado.tipoIncidencia, {onDelete: 'SET NULL'})
    grado: Grado

    @OneToMany(() => Incidencia, (incidencia) => incidencia.tipoIncidencia)
    incidencia: Incidencia[]
}
