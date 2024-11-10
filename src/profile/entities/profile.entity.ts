import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Profile')
export class Profile {
    @PrimaryColumn()
    ida: string;

    @Column({length: 30})
    fullName: string;
    
    @Column()
    avatar: string;

    @Column({unique: true})
    email: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

}
