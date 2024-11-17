import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('Grupo')
export class Grupo {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @Column()
    created_at: string

    @ManyToOne(() => User, (user) => user.grupo)
    user: User
}
