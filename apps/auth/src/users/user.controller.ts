import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from './user.service';

@Controller('auth/users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(@Body() request: CreateUserDto) {
    return this.usersService.createUser(request);
  }
}
