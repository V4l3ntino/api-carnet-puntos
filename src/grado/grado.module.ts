import { Module } from '@nestjs/common';
import { GradoService } from './grado.service';
import { GradoController } from './grado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grado } from './entities/grado.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grado]),
    UserModule
  ],
  controllers: [GradoController],
  providers: [GradoService],
})
export class GradoModule {}
