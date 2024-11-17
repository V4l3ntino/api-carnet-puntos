import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Grupo')
export class Grupo {
    @PrimaryGeneratedColumn()
    id: string
    @Column()
    nombre: string
    @Column()
    created_at: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}
