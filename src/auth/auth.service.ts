import { ForbiddenException, Injectable, Req } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(private prisma:PrismaService,private jwt:JwtService,private config:ConfigService){}

    async signin(dto:AuthDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email:dto.email
            } 
        })

        if(!user){
            throw new ForbiddenException('Invalid Credentials')
        }

        const pwdMatch = await argon.verify(user.hash,dto.password)
        if(!pwdMatch){
            throw new ForbiddenException('Password Incorrect!')
        }
         
        return this.signToken(user.id,user.email)
    }

    async signup(dto:AuthDto){
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
        }catch(err){
            if(err instanceof PrismaClientKnownRequestError){
                if(err.code === 'P2002'){
                    throw new Error('Credentials taken!')

                }
                throw new Error('Something Went Wrong!')
            }
        }
        
    }

    async signToken(userId:number,email:string):Promise<string>
    {
        const payLoad = {sub:userId,email}
        const token = this.jwt.signAsync(payLoad,{ 
            expiresIn:"15m", 
            secret:this.config.get('JWT_SECRET')
        })
        return token
    }
} 
