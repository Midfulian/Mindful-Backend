import { Therapist, User } from '@prisma/client';

export interface RegisterUserEntity {
  data: User | Therapist;
  role: 'therapist' | 'user';
  password: string;
}
