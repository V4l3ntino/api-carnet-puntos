import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('User_socket')
export class UserSocket {
    @PrimaryColumn()
    id: string;

    @Column()
    company: number;

    @Column()
    changesQuantity: number;

    // @OneToMany(() => UHistoryChange, (uHistoryChange) => uHistoryChange.user_socket)
    // uHistoryChange: UHistoryChange[];
}
