import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserEntity } from './entites/register.user.entity';
import { LoginUserEntity } from './entites/login.user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Post('/signin')
  // signIn(@Body() body: LoginUserEntity) {
  //   return this.appService.signIn(body);
  // }

  // @Post()
  // signUp(@Body() body: RegisterUserEntity) {
  //   return this.appService.signUp(body);
  // }
}
