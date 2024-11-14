import { Permiso } from "src/permisos/entities/permiso.entity"
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"

@Entity('Tablas')
export class Tabla {
    
    @PrimaryColumn()
    id: string

    @Column()
    admin_profile: boolean
    
    @Column()
    profile: boolean

    @Column()
    user: boolean

    @Column()
    alumno_profile: boolean

    @Column()
    profesor_profile: boolean

    @Column()
    incidencia: boolean

    @Column()
    grado: boolean

    @Column()
    tipo_incidencia: boolean

    @Column()
    permisos: boolean

    @Column()
    tablas: boolean

    @Column()
    cuenta_puntos: boolean

    @Column()
    retrasos: boolean
    
    @Column()
    grupo: boolean

    @OneToOne(() => Permiso, {onDelete: 'CASCADE'})
    @JoinColumn()
    permiso: Permiso

}
