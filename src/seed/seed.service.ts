import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as seedUsers from './data/user.json'
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SeedService {
    constructor(
        private readonly userService: UserService
    ){}

    public async loadData(){
        this.insertUsers
    }

    private async insertUsers(){
        const insertUsers = [];
        seedUsers.forEach((user: User) => {
            insertUsers.push(this.userService.create(user))
        })

        await Promise.all(insertUsers)
        return true;
    }
}
