import { Body, Controller, Get, Post, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './SignInDto';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    console.log(signInDto);
    let r =  await this.authService.signIn(signInDto.email, signInDto.password);
    console.log(r);
    return r;
  }
  
  @HttpCode(HttpStatus.OK)
  @Get('login')
  signInGet() {
   
    return 'please use post instead get';
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}