import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncidenciaService } from './incidencia.service';
import { Incidencia } from './entities/incidencia.entity';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';

@Resolver()
export class IncidenciaResolver {
    constructor(private readonly incidenciaService: IncidenciaService) {}

    @Query(() => [Incidencia])
    getIncidencias() {
        return this.incidenciaService.findAll();
    }
    
    @Mutation(() => Incidencia)
    createIncidencia(@Args('input') input: CreateIncidenciaDto){
        return this.incidenciaService.create(input)
    }
}
