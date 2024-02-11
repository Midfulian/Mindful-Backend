import { Injectable } from '@nestjs/common';
import { FirebaseAppRepository } from './firebase/firebase-app.repository';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }
}
