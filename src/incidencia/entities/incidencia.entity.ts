import { AlumnoProfile } from "src/alumno_profile/entities/alumno_profile.entity";
import { TipoIncidencia } from "src/tipo_incidencia/entities/tipo_incidencia.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Incidencia')
export class Incidencia {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    descripcion: string

    @Column()
    created_at: string

    @ManyToOne(() => User, (user) => user.incidencia)
    user: User

    @ManyToOne(() => AlumnoProfile, (alumnoProfile) => alumnoProfile.incidencia)
    alumnoProfile: AlumnoProfile

    @ManyToOne(() => TipoIncidencia, (tipoIncidencia) => tipoIncidencia.incidencia)
    tipoIncidencia: TipoIncidencia
}   
