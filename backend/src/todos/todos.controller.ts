import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
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

      return this.todoService.create(newTodo.title, req.user.sub);

    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req : RequestWithUser ) {

      const todo = await this.todoService.find(~~id);
      
      if (todo && todo.user_id == req.user.sub) {
       
        return this.todoService.delete(~~id);

      }

      throw new BadRequestException();

    }
   
  

}
