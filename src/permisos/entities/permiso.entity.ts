import { AdminProfile } from "src/admin_profile/entities/admin_profile.entity";
import { Tabla } from "src/tablas/entities/tabla.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Permisos')
export class Permiso {
    @PrimaryColumn()
    id: string;
    @Column()
    read: boolean;
    @Column()
    write: boolean;
    @Column()
    insert: boolean;
    @Column()
    delete: boolean;

    @OneToOne(() => AdminProfile, (admin) => admin.permiso)
    admin_profile: AdminProfile

    @OneToOne(() => Tabla, (tabla) => tabla.permiso)
    tabla: Tabla
}
