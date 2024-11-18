import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import seedUsers from './data/user.json';
import seedAdmins from './data/admin.json';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAdminProfileDto } from 'src/admin_profile/dto/create-admin_profile.dto';
import { AdminProfileService } from 'src/admin_profile/admin_profile.service';

@Injectable()
export class SeedService {
    constructor(
        private readonly userService: UserService,
        private readonly adminService: AdminProfileService
    ){}

    public async loadData(){
        const users =  await this.insertUsers()
        const admins = await this.insertAdmins()
        return {
            users,
            admins
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
}
