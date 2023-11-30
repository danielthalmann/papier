import { Controller, Get, UseGuards } from '@nestjs/common';
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
  

}
