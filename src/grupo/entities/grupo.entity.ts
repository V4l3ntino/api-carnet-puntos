import { AlumnoProfile } from "src/alumno_profile/entities/alumno_profile.entity";
import { ProfesorProfile } from "src/profesor_profile/entities/profesor_profile.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Grupo')
export class Grupo {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @Column()
    created_at: string

    @ManyToOne(() => User, (user) => user.grupo, {onDelete: 'SET NULL'})
    user: User

    @OneToMany(() => AlumnoProfile, (alumno) => alumno.grupo)
    alumnos: AlumnoProfile[]

    @OneToOne(() => ProfesorProfile, (profesor) => profesor.grupo)
    profesor: ProfesorProfile
}
