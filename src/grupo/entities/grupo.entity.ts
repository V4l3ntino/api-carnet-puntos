import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Grupo')
export class Grupo {
    @PrimaryColumn()
    id: string
    @Column()
    nombre: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}
