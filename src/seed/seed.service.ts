import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import seedUsers from './data/user.json';
import seedAdmins from './data/admin.json';
import seedGrupos from './data/grupos.json'
import seedAlumnos from './data/alumnos.json'
import seedProfesors from './data/profesores.json'
import seedGrados from './data/grado.json'
import seedTipoIncidencias from './data/tipoIncidencia.json'
import seedIncidencias from './data/incidencias.json'
import seedProfiles from './data/profile.json'
import seedRoles from './data/roles.json'

import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAdminProfileDto } from 'src/admin_profile/dto/create-admin_profile.dto';
import { AdminProfileService } from 'src/admin_profile/admin_profile.service';
import { GrupoService } from 'src/grupo/grupo.service';
import { AlumnoProfileService } from 'src/alumno_profile/alumno_profile.service';
import { CreateGrupoDto } from 'src/grupo/dto/create-grupo.dto';
import { CreateAlumnoProfileDto } from 'src/alumno_profile/dto/create-alumno_profile.dto';
import { ProfesorProfileService } from 'src/profesor_profile/profesor_profile.service';
import { CreateProfesorProfileDto } from 'src/profesor_profile/dto/create-profesor_profile.dto';
import { GradoService } from 'src/grado/grado.service';
import { CreateGradoDto } from 'src/grado/dto/create-grado.dto';
import { CreateTipoIncidenciaDto } from 'src/tipo_incidencia/dto/create-tipo_incidencia.dto';
import { TipoIncidenciaService } from 'src/tipo_incidencia/tipo_incidencia.service';
import { IncidenciaService } from 'src/incidencia/incidencia.service';
import { CreateIncidenciaDto } from 'src/incidencia/dto/create-incidencia.dto';
import { ProfileService } from 'src/profile/profile.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { Grupo } from 'src/grupo/entities/grupo.entity';
import { newMessage } from 'functions/functions';
import { CreatePermisoDto } from 'src/permisos/dto/create-permiso.dto';
import { PermisosService } from 'src/permisos/permisos.service';
import { Permiso } from 'src/permisos/entities/permiso.entity';

@Injectable()
export class SeedService {
    constructor(
        private readonly userService: UserService,
        private readonly adminService: AdminProfileService,
        private readonly grupoService: GrupoService,
        private readonly alumnoSercie: AlumnoProfileService,
        private readonly profesorService: ProfesorProfileService,
        private readonly gradoService: GradoService,
        private readonly tipoIncidenciaService: TipoIncidenciaService,
        private readonly incidenciasService: IncidenciaService,
        private readonly profileService: ProfileService,
        private readonly permisoService: PermisosService

    ){}

    public async deleteData(){
        try {
            const users = await this.userService.findAll();
            const grupos = await this.grupoService.findAll();
            const permisos = await this.permisoService.findAll();
            const grados = await this.gradoService.findAll()
            const tipoIncidencias = await this.tipoIncidenciaService.findAll()
            const incidencias = await this.incidenciasService.findAll()

    
            const promises = [];
    
            // Eliminación de usuarios
            users.forEach((item) => {
                promises.push(this.userService.remove(item.id));
            });
    
            // Eliminación de grupos
            grupos.forEach((item) => {
                promises.push(this.grupoService.remove(item.id));
            });
    
            // Eliminación de permisos
            permisos.forEach((item) => {
                promises.push(this.permisoService.remove(item.id));
            });

            incidencias.forEach((item) => {
                promises.push(this.incidenciasService.remove(item.id))
            })
            tipoIncidencias.forEach((item) => {
                promises.push(this.tipoIncidenciaService.remove(item.id))
            })
    
            grados.forEach((item) => {
                promises.push(this.gradoService.remove(item.id))
            })
    
            // Esperar a que todas las promesas se resuelvan
            await Promise.all(promises);
    
            return newMessage("success", 200);
        } catch (error) {
            console.error("Error al eliminar datos:", error);
            return newMessage("error", 500);
        }
    }

    public async loadData(){
        const roles = await this.insertRoles()
        const users =  await this.insertUsers()
        const admins = await this.insertAdmins()
        const grupos = await this.inserGrupos()
        const alumnos = await this.insertAlumnos()
        const profesores = await this.insertProfesors()
        const grados = await this.insertGrados()
        const tipoIncidencias = await this.inserTiposIncidencias()
        const incdiencias = await this.insertIncdiencias()
        const profiles = await this.insertProfiles()

        return {
            roles,
            users,
            admins,
            grupos,
            alumnos,
            profesores,
            grados,
            tipoIncidencias,
            incdiencias,
            profiles
        }
    }

    private async insertRoles(){
        const insertRoles = [];
        seedRoles.forEach((rol: CreatePermisoDto) => {
            insertRoles.push(this.permisoService.create(rol))
        })

        await Promise.all(insertRoles)
        return true;
    }

    private async insertUsers(){
        const insertUsers = [];
        seedUsers.forEach((user: CreateUserDto) => {
            insertUsers.push(this.userService.create(user))
        })

        await Promise.all(insertUsers)
        return true;
    }

    private async insertAdmins(){
        const insertAdmins = []
        seedAdmins.forEach((admin: CreateAdminProfileDto) => {
            insertAdmins.push(this.adminService.create(admin))
        })
        await Promise.all(insertAdmins)
        return true;
    }

    private async inserGrupos(){
        const insertGrupos = []
        seedGrupos.forEach((grupo: CreateGrupoDto) => {
            insertGrupos.push(this.grupoService.create(grupo))
        })
        await Promise.all(insertGrupos)
        return true;
    }

    private async insertAlumnos(){
        const insertAlumnos = []
        seedAlumnos.forEach((alumno: CreateAlumnoProfileDto) => {
            insertAlumnos.push(this.alumnoSercie.create(alumno))
        })
        await Promise.all(insertAlumnos)
        return true;
    }

    private async insertProfesors(){
        const insertProfesors = []
        seedProfesors.forEach((profesor: CreateProfesorProfileDto) => {
            insertProfesors.push(this.profesorService.create(profesor))
        })
        await Promise.all(insertProfesors)
        return true;
    }

    private async insertGrados(){
        const insertGrados = []
        seedGrados.forEach((grado: CreateGradoDto) => {
            insertGrados.push(this.gradoService.create(grado))
        })
        await Promise.all(insertGrados)
        return true;
    }

    private async inserTiposIncidencias(){
        const insertTipoIncidencias = []
        seedTipoIncidencias.forEach((tipoIncidencia: CreateTipoIncidenciaDto) => {
            insertTipoIncidencias.push(this.tipoIncidenciaService.create(tipoIncidencia))
        })
        await Promise.all(insertTipoIncidencias)
        return true;
    }

    private async insertIncdiencias(){
        const insertIncidencias = []
        seedIncidencias.forEach((incidencias: CreateIncidenciaDto) => {
            insertIncidencias.push(this.incidenciasService.create(incidencias))
        })
        await Promise.all(insertIncidencias)
        return true;
    }

    private async insertProfiles(){
        const insertProfiles = []
        seedProfiles.forEach((profile: CreateProfileDto) => {
            insertProfiles.push(this.profileService.create(profile))
        })
        await Promise.all(insertProfiles)
        return true;
    }


}
