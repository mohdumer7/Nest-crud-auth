import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { getUser } from '../auth/decorator';
import { jwtGaurd } from '../auth/gaurd';

@Controller('users')
export class UserController {
    @UseGuards(jwtGaurd)
    @Get('me')
    getMe(@getUser() user:User){
        return user

    }
}

// @UseGuards('jwt')
//     @Get('me')
//     getMe(@Req() req:Request){
//         return req.user

//     }