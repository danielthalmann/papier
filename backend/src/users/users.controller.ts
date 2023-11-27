import { Body, Controller, Post, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Credentials } from '../types/Credentials';


@Controller('api/users')
export class UserController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() credential: Credentials) {

    if (credential.password != credential.confirm)
      throw new HttpException('The password and the confirmation password is not same', HttpStatus.FORBIDDEN);

    if (await this.userService.emailExists(credential.email))
      throw new HttpException('Email exists', HttpStatus.BAD_REQUEST);
     
    return this.userService.createUser(credential.email, credential.password);
        
  }


}