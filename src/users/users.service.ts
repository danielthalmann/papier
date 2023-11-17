
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User as UserOrm, Prisma } from '@prisma/client';

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

  async createUser(data: Prisma.UserCreateInput): Promise<UserOrm> {
    return this.prisma.user.create({
      data,
    });
  }

  async findOne(email: string): Promise<UserOrm | undefined> {
    return this.prisma.user.findFirst({ where : {email : email}});
  }

}
