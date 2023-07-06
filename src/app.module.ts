import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service'; 
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [UserModule,BookmarkModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
