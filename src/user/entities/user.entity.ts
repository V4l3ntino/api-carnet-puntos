import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 15, unique: true})
    username: string;
    @Column({length: 30})
    password: string;
    @Column()
    created_at: string

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile

}
