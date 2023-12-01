import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TodosModule } from './todos/todos.module';
import { ProjectsModule } from './projects/projects.module';
import { TagsModule } from './tags/tags.module';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env'}),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule, 
    UsersModule, 
    TodosModule,
    ProjectsModule,
    TagsModule, 
  ],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
