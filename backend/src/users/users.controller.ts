import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { Credentials } from '../types/Credentials';
import * as bcrypt from 'bcrypt';


@Controller('api/users')
export class UserController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() credential: Credentials) {

    if (credential.password != credential.confirm)
      return ;
    
    let hash = await bcrypt.hash(credential.password, process.env.SECRET);
    const user : Prisma.UserCreateInput = {
      name: credential.email,
      email: credential.email,
      password: hash,
      last_login: new Date(),
      updated_at: new Date(),
      created_at: new Date()
    };
    
    this.userService.createUser(user);
   
    return user;
    
  }


}