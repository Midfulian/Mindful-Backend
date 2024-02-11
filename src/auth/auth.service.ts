import { Injectable } from '@nestjs/common';
import { LoginUserEntity } from '../entites/login.user.entity';
import { FirebaseAppRepository } from '../firebase/firebase-app.repository';
import { PrismaService } from '../prisma.service';
import { RegisterUserEntity } from '../entites/register.user.entity';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

@Injectable()
export class AuthService {
  idToken: string;
  constructor(
    private readonly firebaseAppRepository: FirebaseAppRepository,
    private readonly prisma: PrismaService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Logs in a user with the provided login credentials.
   * @param userLoginEntity - The login credentials of the user.
   * @returns The user object if login is successful, otherwise an error object.
   * @throws Error if there is an error during the login process.
   */
  async login(userLoginEntity: LoginUserEntity) {
    console.log('userLoginEntity:', userLoginEntity.idToken);

    try {
      // Verify ID token from Firebase
      const decodedToken = await this.firebaseAppRepository.auth.verifyIdToken(
        userLoginEntity.idToken,
      );
      const uid = decodedToken.uid;

      console.log('decodedToken:', decodedToken);

      // Retrieve user data based on role
      let user;
      if (userLoginEntity.role === 'therapist') {
        user = await this.prisma.therapist.findUnique({
          where: { firebase_uid: uid },
        });
      } else {
        user = await this.prisma.user.findUnique({
          where: { firebase_uid: uid },
        });
      }
      if (!user) {
        return { error: 'User not found' };
      }
      return user;
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Failed to login');
    }
  }

  /**
   * Signs up a user by creating a Firebase user and integrating their data into the database.
   * @param user The user object containing registration data.
   * @returns A promise that resolves to an object with the success status and the created user record.
   * @throws An error if there is a failure during user creation or database integration.
   */
  async signUp(user: RegisterUserEntity) {
    let userRecord: UserRecord;
    // Create user in Firebase
    try {
      userRecord = await this.createFirebaseUser(user);
    } catch (error) {
      console.error('Error during createFirebaseUser:', error);
      throw new Error('Failed to createFirebaseUser');
    }
    // Determine role based on user object
    const uid = userRecord.uid;
    const role = user.role;

    try {
      // Write data to relevant table based on role
      if (role === 'therapist') {
        await this.prisma.therapist.create({
          data: { ...user.data, firebase_uid: uid },
        });
      } else {
        await this.prisma.user.create({
          data: { ...user.data, firebase_uid: uid },
        });
      }
      return { success: true, user: userRecord };
    } catch (error) {
      console.error('Error during database integration:', error);
      throw new Error('Failed to sign up');
    }
  }

  /**
   * Creates a new Firebase user.
   *
   * @param user - The user data for registration.
   * @returns The created user record.
   * @throws Error if there is an error creating the user or signing in.
   */
  private async createFirebaseUser(user: RegisterUserEntity) {
    let userRecord: UserRecord;
    try {
      userRecord = await this.firebaseAppRepository.auth.createUser({
        email: user.data.email,
        displayName:
          user.data.first_name +
          '-' +
          user.data.last_name +
          '-' +
          Math.random(),
        phoneNumber: user.data.phone_number,
        password: user.password,
        photoURL: user.data.photoURL,
      });
    } catch (error) {
      console.error('Error during createFirebaseUser:', error);
      throw new Error('Failed to createFirebaseUser');
    }
    try {
      this.idToken = await this._signInWithPassword(
        user.data.email,
        user.password,
      );
      return userRecord;
    } catch (error) {
      console.error('Error during signInWithPassword:', error);
      throw new Error('Failed to signInWithPassword');
    }
  }

  //just for debugging purposes
  private async _signInWithPassword(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.firebaseAppRepository.authInstance,
      email,
      password,
    );
    const idToken = await userCredential.user.getIdToken();
    console.debug('idToken = ' + idToken);
    return idToken;
  }
  async signOut() {
    return 'signOut';
  }
}
