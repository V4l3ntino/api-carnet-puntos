import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('Profile')
export class Profile {
    @PrimaryColumn()
    ida: string;

    @Column({length: 30, nullable: true, default: null})
    fullName?: string;
    
    @Column({nullable: true, default: null})
    avatar?: string;

    @Column({unique: true, nullable: true, default: null})
    email?: string;

    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User

}
