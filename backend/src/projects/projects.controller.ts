import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestWithUser } from 'src/types/RequestWithUser';
import { ProjectsService } from './projects.service';

@Controller('api/projects')
export class ProjectsController {

    constructor(private projectService: ProjectsService) {}

    @UseGuards(AuthGuard)
    @Get()
    async all(@Request() req : RequestWithUser) {
  
      return this.projectService.all(req.user.sub);

    }

}
