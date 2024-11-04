import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorModule } from './profesor/profesor.module';
import { AlumnoModule } from './alumno/alumno.module';
import { PerfilModule } from './perfil/perfil.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProfesorModule,
    AlumnoModule,
    PerfilModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
