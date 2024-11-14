import { AdminProfile } from "src/admin_profile/entities/admin_profile.entity";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";

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

    @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.permiso)
    adminProfile: AdminProfile
}
