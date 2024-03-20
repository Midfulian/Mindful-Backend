import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseAppRepository } from 'src/firebase/firebase-app.repository';
import { FirebaseAppModule } from 'src/firebase/firebase-app.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [FirebaseAppModule, AuthModule],
  providers: [UserService, AuthService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
