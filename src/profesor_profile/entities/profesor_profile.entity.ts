import { Grupo } from "src/grupo/entities/grupo.entity";
import { Permiso } from "src/permisos/entities/permiso.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Profesor_profile')
export class ProfesorProfile {
    @PrimaryColumn()
    idea: string;
    @Column()
    created_at: string;

    @Column()
    materia: string;

    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    @OneToOne(() => Permiso)
    @JoinColumn()
    permiso: Permiso

    @OneToOne(() => Grupo, {onDelete:'SET NULL'})
    @JoinColumn()
    grupo: Grupo
}
