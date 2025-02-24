import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncidenciaService } from './incidencia.service';
import { Incidencia } from './entities/incidencia.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Resolver()
export class IncidenciaResolver {
    constructor(
        private readonly incidenciaService: IncidenciaService,
        private readonly userService: UserService
    ) {}

    @Query(() => [Incidencia])
    getIncidencias() {
        return this.incidenciaService.findAll();
    }
    
    @Query(() => Incidencia, { nullable: true })
    async getIncidenciabyId(@Args('id') id: string){
        const incidencia = await this.incidenciaService.findOne(id)
        return incidencia ? incidencia : null;
    }

    @Query(() => [User])
    getUsers() {
        return this.userService.findAll()
    }

    @Query(() => User, {nullable: true})
    async getUsersbyId(@Args('id') id: string) {
        const user = await this.userService.findOne(id)
        return user ? user : null;
    }
}
