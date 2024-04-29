import { BadRequestException, Controller, Get, Post, Put, Delete, Request, UseGuards, HttpCode, HttpStatus, Body, Param } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/types/RequestWithUser';
import { ProjectsService } from './projects.service';
import { ProjectNewDto } from './dto/ProjectNewDto';
import { Project } from '@prisma/client';

@Controller('api/projects')
export class ProjectsController {

    constructor(private projectService: ProjectsService) {}

    @UseGuards(AuthGuard)
    @Get()
    async all(@Request() req : RequestWithUser) {
  
      return this.projectService.all(req.user.sub);

    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async get(@Param('id') id: string, @Request() req : RequestWithUser) {
  
      let project: Project = await this.projectService.find(~~id);
      if (project) {

      }
      return project;

    }    

    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    @Post('create')
    // @Query() allQueryParams: { title?: string, page?: string }
    async create(@Body() ProjectNewDto: ProjectNewDto, @Request() req : RequestWithUser ) {

      return this.projectService.create(ProjectNewDto.name, req.user.sub);

    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Put(':id')
    // @Query() allQueryParams: { title?: string, page?: string }
    async put(@Param('id') id: string, @Body() todo: any ) {
      console.log (todo, id);
      return this.projectService.update(~~id, todo.title);

    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req : RequestWithUser ) {

      const todo = await this.projectService.find(~~id);
      
      if (todo && todo.user_id == req.user.sub) {
       
        return this.projectService.delete(~~id);

      }

      throw new BadRequestException();

    }
   
}
