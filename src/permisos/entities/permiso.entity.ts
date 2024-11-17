import { AdminProfile } from "src/admin_profile/entities/admin_profile.entity";
import { Tabla } from "src/tablas/entities/tabla.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Permisos')
export class Permiso {
    @PrimaryColumn()
    id: string;

    @OneToOne(() => AdminProfile, (admin) => admin.permiso)
    admin_profile: AdminProfile

    @OneToMany(() => Tabla, (tabla) => tabla.permiso)
    tabla: Tabla[]
}
