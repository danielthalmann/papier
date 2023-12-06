import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodosService {
    constructor(private prisma: PrismaService) { }
  
    async all( user_id: number): Promise<Array<Todo> | undefined> {

        return this.prisma.todo.findMany({where : {user_id: user_id}, orderBy : {order : 'asc'} });

    }

    async find(id: number): Promise<Todo | undefined> {

      return this.prisma.todo.findFirst({where : {id: id} });

    }

    async update(id: number, title: string, project_id?: number | null): Promise<Todo> {

      const todo = await this.prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          title: title,
        },
      })

      return todo;
  
    }
  

    async create(name: string, user_id: number, project_id?: number | null): Promise<Todo> {

      const lastTodo = await this.prisma.todo.findFirst({ orderBy : { id : "desc"} });
      let order = 1;
      if (lastTodo != null) {
        order = lastTodo.id + 1;
      }

      let data : Prisma.TodoCreateInput = {
            title: name,
            user_id: user_id,
            project_id: project_id,
            order: order,
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

    async delete(id : number) {

      return await this.prisma.todo.delete({
        where: {
          id: id
        },
      });

    }

}
