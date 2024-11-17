import { TipoIncidencia } from "src/tipo_incidencia/entities/tipo_incidencia.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Grado')
export class Grado {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @Column()
    cantidadPuntos: number

    @ManyToOne(() => User, (user) => user.grado)
    user: User

    @OneToMany(() => TipoIncidencia, (tipoIncidencia) => tipoIncidencia.grado)
    tipoIncidencia: TipoIncidencia
}
