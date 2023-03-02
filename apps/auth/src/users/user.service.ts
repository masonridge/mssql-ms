import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(request: CreateUserDto) {
    await this.validateCreateUserRequest(request);
    const user = await this.usersRepository.save({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserDto) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        where: {
          email: request.email,
        },
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid user.');
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne({ where: { ...getUserArgs } });
  }
}
