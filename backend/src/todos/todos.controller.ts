import { Controller, Get, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todos')
export class TodosController {

    constructor(private todoService: TodosService) {}


    @Get()
    @UseGuards(AuthGuard)
    async all() {
  
      return this.todoService.all();

    }
  

}
