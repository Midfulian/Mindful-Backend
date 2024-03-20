import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/user/dto';

@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  createUser(@Body() user: UserDto) {
    return this.userservice.createUser(user);
  }

  @Get('/all')
  getAll() {
    return this.userservice.getAll();
  }

  @Patch('/edit')
  @UsePipes(ValidationPipe)
  getUser(@Body() data: UserDto) {
    return this.userservice.editInfo(data);
  }

  @Get('/info')
  viewInfo(@Body() firebaseUID: string) {
    return this.userservice.viewInfo(firebaseUID);
  }

  @Delete('/delete')
  deleteUser(@Body() data: { firebase_uid: string }) {
    return this.userservice.deleteUser(data);
  }

  @Post('/journal')
  writeJournal(@Body() data: { firebase_uid: string; journalText: string }) {
    return this.userservice.writeJournal(data);
  }

  @Get('/journals')
  readJournals(@Body() data: { firebase_uid: string }) {
    return this.userservice.readJournals(data);
  }
}
