import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseAppModule } from '../firebase/firebase-app.module';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [FirebaseAppModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
