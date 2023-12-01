import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TodoNewDto } from './dto/TodoNewDto';
import { RequestWithUser } from 'src/types/RequestWithUser';

@Controller('api/todos')
export class TodosController {

    constructor(private todoService: TodosService) {}


    @UseGuards(AuthGuard)
    @Get()
    async all(@Request() req : RequestWithUser) {
  
      return this.todoService.all(req.user.sub);

    }
    
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @Post('create')
    // @Query() allQueryParams: { title?: string, page?: string }
    async create(@Body() newTodo: TodoNewDto, @Request() req : RequestWithUser ) {

      return this.todoService.createTodo(newTodo.title, req.user.sub);

    }
   
  

}
