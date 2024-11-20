import { AlumnoProfile } from "src/alumno_profile/entities/alumno_profile.entity"
import { Grupo } from "src/grupo/entities/grupo.entity"
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm"

@Entity('Cuenta_puntos')
export class CuentaPunto {
    @PrimaryColumn()
    id: string

    @Column()
    cantidad: number
    
    @Column()
    created_at: string
    
    @OneToOne(() => AlumnoProfile, (alumno) => alumno.cuentaPuntos)
    alumno: AlumnoProfile

    @OneToOne(() => Grupo, (grupo) => grupo.cuentaPuntos)
    grupo: Grupo
}
