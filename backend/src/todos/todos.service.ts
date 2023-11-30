import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) {
    }
  
    async all(): Promise<Array<Todo> | undefined> {
        return this.prisma.todo.findMany({});
    }
    

}
