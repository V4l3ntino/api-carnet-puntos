import { Permiso } from "src/permisos/entities/permiso.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Admin_profile')
export class AdminProfile {
    @PrimaryColumn()
    idea: string;
    @Column()
    created_at: string;

    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    // @OneToOne(() => Permiso)
    // @JoinColumn()
    // permiso: Permiso

}
