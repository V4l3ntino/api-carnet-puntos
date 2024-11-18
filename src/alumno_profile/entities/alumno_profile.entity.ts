import { Incidencia } from "src/incidencia/entities/incidencia.entity";
import { Permiso } from "src/permisos/entities/permiso.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Alumno-profile')
export class AlumnoProfile {
    @PrimaryColumn()
    idea: string;
    @Column()
    created_at: string;

    @Column()
    edad: number
    @Column()
    repetidor: boolean



    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    @OneToOne(() => Permiso)
    @JoinColumn()
    permiso: Permiso

    @OneToMany(() => Incidencia, (incidencia) => incidencia.alumnoProfile)
    incidencia: Incidencia[]
}
