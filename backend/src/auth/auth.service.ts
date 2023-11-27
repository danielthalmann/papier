
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<any> {

    if (email == undefined) {
      throw new UnauthorizedException();
    }    
    const user = await this.usersService.findOne(email);

    if (!user) {
        throw new UnauthorizedException();
    }
    
    if (! await this.usersService.passwordCheck(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

  }
}
