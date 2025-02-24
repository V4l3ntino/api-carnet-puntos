import { Grupo } from "src/grupo/entities/grupo.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity('Profesor_profile')
export class ProfesorProfile {

    @Field()
    @PrimaryColumn()
    idea: string;
    @Field()
    @Column()
    created_at: string;
    
    @Field()
    @Column()
    materia: string;

    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

    // @OneToOne(() => Permiso)
    // @JoinColumn()
    // permiso: Permiso

    @Field(() => Grupo, { nullable: true })
    @OneToOne(() => Grupo, {onDelete:'SET NULL'})
    @JoinColumn()
    grupo: Grupo
}
