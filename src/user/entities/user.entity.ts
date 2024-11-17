import { AdminProfile } from "src/admin_profile/entities/admin_profile.entity";
import { AlumnoProfile } from "src/alumno_profile/entities/alumno_profile.entity";
import { Grado } from "src/grado/entities/grado.entity";
import { Grupo } from "src/grupo/entities/grupo.entity";
import { ProfesorProfile } from "src/profesor_profile/entities/profesor_profile.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { TipoIncidencia } from "src/tipo_incidencia/entities/tipo_incidencia.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class User {
    
    @PrimaryColumn()
    id: string;

    @Column({length: 15, unique: true})
    username: string;
    @Column()
    password: string;
    @Column()
    created_at: string

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile

    @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user)
    adminProfile: AdminProfile

    @OneToOne(() => ProfesorProfile, (profesorProfile) => profesorProfile.user)
    profesorProfile: ProfesorProfile

    @OneToOne(() => AlumnoProfile, (alumnoProfile) => alumnoProfile.user)
    alumnoProfile: AlumnoProfile

    @OneToMany(() => Grupo, (grupo) => grupo.user)
    grupo: Grupo

    @OneToMany(() => Grado, (grado) => grado.user)
    grado: Grado

    @OneToMany(() => TipoIncidencia, (tipoIncidencia) => tipoIncidencia.user)
    tipoIncidencia: TipoIncidencia

}
