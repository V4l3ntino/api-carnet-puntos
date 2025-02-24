import { AdminProfile } from "src/admin_profile/entities/admin_profile.entity";
import { AlumnoProfile } from "src/alumno_profile/entities/alumno_profile.entity";
import { Grado } from "src/grado/entities/grado.entity";
import { Grupo } from "src/grupo/entities/grupo.entity";
import { Incidencia } from "src/incidencia/entities/incidencia.entity";
import { Permiso } from "src/permisos/entities/permiso.entity";
import { ProfesorProfile } from "src/profesor_profile/entities/profesor_profile.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { TipoIncidencia } from "src/tipo_incidencia/entities/tipo_incidencia.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('User')
export class User {

    @Field()
    @PrimaryColumn()
    id: string;

    @Field()
    @Column({length: 15, unique: true})
    username: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column({unique: true, nullable: true, default: null})
    email: string;

    @Field()
    @Column()
    created_at: string

    @Field(() => Profile)
    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile
    
    @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user)
    adminProfile: AdminProfile

    @Field(() => ProfesorProfile, { nullable: true })
    @OneToOne(() => ProfesorProfile, (profesorProfile) => profesorProfile.user)
    profesorProfile: ProfesorProfile

    @Field(() => AlumnoProfile, { nullable: true })
    @OneToOne(() => AlumnoProfile, (alumnoProfile) => alumnoProfile.user)
    alumnoProfile: AlumnoProfile

    @OneToMany(() => Grupo, (grupo) => grupo.user)
    grupo: Grupo[]

    @OneToMany(() => Grado, (grado) => grado.user)
    grado: Grado[]

    @OneToMany(() => TipoIncidencia, (tipoIncidencia) => tipoIncidencia.user)
    tipoIncidencia: TipoIncidencia[]

    @OneToMany(() => Incidencia, (incidencia) => incidencia.user)
    incidencia: Incidencia[]

    @Field(() => Permiso)
    @ManyToOne(() => Permiso, (permiso) => permiso.user, { onDelete: "SET NULL" })
    @JoinColumn()
    permiso: Permiso


}
