import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable({})
 export class jwtstrategy extends PassportStrategy(Strategy)
{
  constructor(private prisma:PrismaService,private jwt:JwtService,config:ConfigService){
    super({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:config.get("JWT_SECRET")
    })
  }

  async validate(payload:{sub:number,email:string}){
    const user = await this.prisma.user.findUnique({where:{
        id:payload.sub 
    }})
    delete user.hash
    return user 
  }
}