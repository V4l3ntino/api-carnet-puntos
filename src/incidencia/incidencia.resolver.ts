import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncidenciaService } from './incidencia.service';
import { Incidencia } from './entities/incidencia.entity';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { newMessage } from 'functions/functions';

@Resolver()
export class IncidenciaResolver {
    constructor(private readonly incidenciaService: IncidenciaService) {}

    @Query(() => [Incidencia])
    getIncidencias() {
        return this.incidenciaService.findAll();
    }
    
    @Query(() => Incidencia, { nullable: true })
    async getIncidenciabyId(@Args('id') id: string){
        const incidencia = await this.incidenciaService.findOne(id)
        return incidencia ? incidencia : null;
    }
}
