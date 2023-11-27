
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User as UserOrm, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';


// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {
  }

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async all(): Promise<Array<UserOrm> | undefined> {
    return this.prisma.user.findMany({});
  }

  async emailExists(email: string): Promise<boolean> {
    let users = await this.prisma.user.findMany({ where: {email : email}});
    if ( users.length == 0 )
      return false;
    return true;
  }

  async createUser(email: string, password: string): Promise<UserOrm> {

    const salt = bcrypt.genSaltSync();
    const hash = await bcrypt.hash(password, salt);

    console.log(hash, salt);

    let data : Prisma.UserCreateInput = {
      name: email,
      email: email,
      password: hash,
      last_login: new Date(),
      updated_at: new Date(),
      created_at: new Date()
    };

    return this.prisma.user.create({
      data
    });

  }

  async findOne(email: string): Promise<UserOrm | undefined> {
    return this.prisma.user.findFirst({ where : {email : email}});
  }

  async passwordCheck(myPlaintextPassword: string, hash:string) : Promise<boolean>
  {
    return bcrypt.compare(myPlaintextPassword, hash);
  }

}
