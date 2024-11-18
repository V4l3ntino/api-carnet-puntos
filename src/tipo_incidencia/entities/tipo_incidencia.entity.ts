import { Grado } from "src/grado/entities/grado.entity";
import { Incidencia } from "src/incidencia/entities/incidencia.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Tipo_incidencia')
export class TipoIncidencia {
    
    @PrimaryColumn()
    id: number
    @Column()
    descripcion: string
    @Column()
    created_at: string
    
    @ManyToOne(() => User, (user) => user.tipoIncidencia, {onDelete:'SET NULL'})
    @JoinColumn()
    user: User

    @ManyToOne(() => Grado, (grado) => grado.tipoIncidencia)
    grado: Grado

    @OneToMany(() => Incidencia, (incidencia) => incidencia.tipoIncidencia)
    incidencia: Incidencia[]
}
