import { AdminProfile } from "src/admin_profile/entities/admin_profile.entity";
import { ProfesorProfile } from "src/profesor_profile/entities/profesor_profile.entity";
import { Tabla } from "src/tablas/entities/tabla.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Permisos')
export class Permiso {
    @PrimaryColumn()
    id: string;

    // @OneToOne(() => AdminProfile, (admin) => admin.permiso)
    // admin_profile: AdminProfile
    
    // @OneToOne(() => ProfesorProfile, (profesor) => profesor.permiso)
    // profesor_profile: ProfesorProfile
    @Column()
    nombre: string;
    @Column()
    descripcion: string;

    @OneToMany(() => Tabla, (tabla) => tabla.permiso)
    tabla: Tabla[]

    @OneToMany(() => User, (user) => user.permiso)
    user: User[]
}
