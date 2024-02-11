import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TherapistService } from './therapist.service';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [UserService, TherapistService, PrismaService],
  imports: [],
})
export class HumansModule {}
