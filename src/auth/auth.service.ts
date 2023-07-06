import { Injectable, Req } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable({})
export class AuthService {
    constructor(private prisma:PrismaService  ){}
    signin(){
        return 'i have signed In'
    }
    async signup(dto:AuthDto ){
        try{
            const hash = await argon.hash(dto.password)
        console.log('creating')
        const user = await this.prisma.user.create({
            data:
            {
             email:dto.email,
             hash
            }
        })

        delete user.hash

        return user
        }catch(err ){
            if(err instanceof PrismaClientKnownRequestError){

                console.log(err)
            }
        }
        
    }

}
