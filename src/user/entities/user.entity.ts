import { AdminProfile } from "src/admin_profile/entities/admin_profile.entity";
import { ProfesorProfile } from "src/profesor_profile/entities/profesor_profile.entity";
import { Profile } from "src/profile/entities/profile.entity";
import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class User {
    
    @PrimaryColumn()
    id: string;

    @Column({length: 15, unique: true})
    username: string;
    @Column()
    password: string;
    @Column()
    created_at: string

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile

    @OneToOne(() => AdminProfile, (adminProfile) => adminProfile.user)
    adminProfile: AdminProfile

    @OneToOne(() => ProfesorProfile, (profesorProfile) => profesorProfile.user)
    profesorProfile: ProfesorProfile

}
