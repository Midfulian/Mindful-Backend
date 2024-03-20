import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @Length(3, 15)
  first_name: string;
  @IsNotEmpty()
  @Length(3, 15)
  last_name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password?: string;
  @IsNotEmpty()
  firebase_uid: string;
}
