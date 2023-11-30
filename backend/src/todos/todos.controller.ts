import { Controller, Get, Param, Query, Req, Request, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/todos')
export class TodosController {

    constructor(private todoService: TodosService) {}


    @UseGuards(AuthGuard)
    @Get()
    async all() {
  
      return this.todoService.all();

    }

    @UseGuards(AuthGuard)
    @Get('create')
    async create(@Query() allQueryParams: { title?: string, page?: string }, @Request() req : Request & {user :{id: number}} ) {
    console.log(allQueryParams);
    console.log(req.user);
    return;
      return this.todoService.createTodo(allQueryParams.title, req.user.id);

    }
   
  

}
