import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserEntity } from '../entites/login.user.entity';
import { RegisterUserEntity } from '../entites/register.user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: LoginUserEntity) {
    try {
      const result = await this.authService.login(user);
      console.debug('login result:', result);
      return result;
    } catch (error) {
      console.error('Error during login:', error);
      return { error: 'Failed to login' };
    }
  }

  @Post('/signup')
  signUp(@Body() body: RegisterUserEntity) {
    return this.authService.signUp(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
