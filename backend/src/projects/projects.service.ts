import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {

    constructor(private prisma: PrismaService) { }

  
    async all( user_id: number): Promise<Array<Project> | undefined> {
        return this.prisma.project.findMany({where : {user_id: user_id} });
    }

}
