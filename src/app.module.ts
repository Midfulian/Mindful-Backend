import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStartegy } from './auth/strategy/jwt.startegy';
import { FirebaseAppModule } from './firebase/firebase-app.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { HumansModule } from './entites/humans/humans.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    FirebaseAppModule,
    AuthModule,
    HumansModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStartegy, PrismaService],
})
export class AppModule {}
