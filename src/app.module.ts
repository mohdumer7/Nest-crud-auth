import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service'; 
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtstrategy } from './auth/strategy';
import { UserController } from './user/user.controller';


@Module({
  imports: [UserModule,BookmarkModule, PrismaModule,ConfigModule.forRoot({isGlobal:true}),
     JwtModule.register({})
     ],
  controllers: [AuthController],
  providers: [AuthService,jwtstrategy],
})
export class AppModule {}
