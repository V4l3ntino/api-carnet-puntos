import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CuentaPuntosModule } from './cuenta_puntos/cuenta_puntos.module';
import { TablasModule } from './tablas/tablas.module';
import { GradoModule } from './grado/grado.module';
import { ProfileModule } from './profile/profile.module';
import { AlumnoProfileModule } from './alumno_profile/alumno_profile.module';
import { ProfesorProfileModule } from './profesor_profile/profesor_profile.module';
import { AdminProfileModule } from './admin_profile/admin_profile.module';
import { GrupoModule } from './grupo/grupo.module';
import { IncidenciaModule } from './incidencia/incidencia.module';
import { TipoIncidenciaModule } from './tipo_incidencia/tipo_incidencia.module';
import { RetrasosModule } from './retrasos/retrasos.module';
import { PermisosModule } from './permisos/permisos.module';
import { AuthModule } from './auth/auth.module';
import { SeedController } from './seed/seed.controller';
import { SeedModule } from './seed/seed.module';
import { GateWayModule } from './websockets/websockets.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserSocketModule } from './user_socket/user_socket.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // Usa ApolloDriver en lugar de @apollo/server
      autoSchemaFile: true, // Genera automáticamente el esquema de GraphQL
    }),
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
    GateWayModule,
    UserModule,
    CuentaPuntosModule,
    TablasModule,
    GradoModule,
    ProfileModule,
    AlumnoProfileModule,
    ProfesorProfileModule,
    AdminProfileModule,
    GrupoModule,
    IncidenciaModule,
    TipoIncidenciaModule,
    RetrasosModule,
    PermisosModule,
    AuthModule,
    SeedModule,
    UserSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
