import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) {
    }
  
    async all(): Promise<Array<Todo> | undefined> {
        return this.prisma.todo.findMany({});
    }


    async createTodo(name: string, user_id: number): Promise<Todo> {

        let data : Prisma.TodoCreateInput = {
            title: name,
            user_id: user_id,
            project_id: null,
            order: 1,
            priority: null,
            completed_at: null,
            due_at: null,
            updated_at: new Date(),
            created_at: new Date()
        };
    
        return this.prisma.todo.create({
          data
        });
    
      }

}
