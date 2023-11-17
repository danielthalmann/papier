import { Body, Controller, Get, Post, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';


@Controller('api/users')
export class UserController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('create')
  signInGet() {

    const user : Prisma.UserCreateInput = {
      name: "daniel@thalmann.li",
      email: "daniel@thalmann.li",
      password: "12345",
      last_login: new Date(),
      updated_at: new Date(),
      created_at: new Date()
    };
    
    this.userService.createUser(user);
   
    return 'ok';
    
  }


}