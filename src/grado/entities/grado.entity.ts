import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Grado')
export class Grado {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @Column()
    cantidadPuntos: number

    @ManyToOne(() => User, (user) => user.grado)
    user: User
}
