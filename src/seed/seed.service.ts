import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import seedUsers from './data/user.json';
import seedAdmins from './data/admin.json';
import seedGrupos from './data/grupos.json'
import seedAlumnos from './data/alumnos.json'
import seedProfesors from './data/profesores.json'

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

@Injectable()
export class SeedService {
    constructor(
        private readonly userService: UserService,
        private readonly adminService: AdminProfileService,
        private readonly grupoService: GrupoService,
        private readonly alumnoSercie: AlumnoProfileService,
        private readonly profesorService: ProfesorProfileService
    ){}

    public async loadData(){
        const users =  await this.insertUsers()
        const admins = await this.insertAdmins()
        const grupos = await this.inserGrupos()
        const alumnos = await this.insertAlumnos()
        const profesores = await this.insertProfesors()
        return {
            users,
            admins,
            grupos,
            alumnos,
            profesores
        }
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
}
