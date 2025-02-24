import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('Profile')
export class Profile {
    @Field()
    @PrimaryColumn()
    ida: string;

    @Field()
    @Column({length: 30, nullable: true, default: null})
    fullName?: string;
    
    @Field({nullable: true})
    @Column({nullable: true, default: null})
    avatar?: string;

    @Field(() => User)
    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User

}
