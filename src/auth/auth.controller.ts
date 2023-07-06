import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signin')
    signin(){
        return this.authService.signin()
    }

    @Post('signup')
    signup(@Body() dto:AuthDto){
        console.log(dto)
        return this.authService.signup(dto)
    }
}
