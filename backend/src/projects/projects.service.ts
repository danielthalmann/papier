import { Injectable } from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {

    constructor(private prisma: PrismaService) { }

  
    async all( user_id: number): Promise<Array<Project> | undefined> {
    
        return this.prisma.project.findMany({where : {user_id: user_id} });
    
    }

    async find(id: number): Promise<Project | undefined> {

        return this.prisma.project.findFirst({where : {id: id} });
  
    }
  
    async update(id: number, name: string, project_id?: number | null): Promise<Project> {
  
        const project = await this.prisma.project.update({
          where: {
            id: id,
          },
          data: {
            name: name,
          },
        })
  
        return project;
    }
    
  
    async create(name: string, user_id: number): Promise<Project> {
  
        const lastProject = await this.prisma.project.findFirst({ orderBy : { id : "desc"} });
        let order = 1;
        if (lastProject != null) {
          order = lastProject.id + 1;
        }
  
        let data : Prisma.ProjectCreateInput = {
              name: name,
              user_id: user_id,
              order: order,
              updated_at: new Date(),
              created_at: new Date()
          };
     
        return this.prisma.project.create({
          data
        });
    
    }
  
    async delete(id : number) {
  
        return await this.prisma.project.delete({
          where: {
            id: id
          },
        });
  
    }
}
