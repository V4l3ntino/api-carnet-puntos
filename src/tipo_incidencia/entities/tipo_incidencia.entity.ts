import { Grado } from "src/grado/entities/grado.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Tipo_incidencia')
export class TipoIncidencia {
    
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    descripcion: string
    @Column()
    created_at: string
    
    @ManyToOne(() => User, (user) => user.tipoIncidencia)
    @JoinColumn()
    user: User

    @ManyToOne(() => Grado, (grado) => grado.tipoIncidencia)
    grado: Grado
}
