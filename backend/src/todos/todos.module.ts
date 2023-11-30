import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [TodosController],
  providers: [TodosService, AuthGuard]
})
export class TodosModule {}
