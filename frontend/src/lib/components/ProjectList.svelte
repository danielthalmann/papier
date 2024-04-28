<script  lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { http } from "$lib/ClientHttp";
    import type { Project } from "$lib/types/Project";

    export let projects: Array<Project> = [];
    export let current: Project | null = null;

    onMount(() => {

        loadProjects();

    });

    const loadProjects = async () => {
        const response : Response = await http.getData(PUBLIC_BACKEND_URL + '/api/projects');
        if(response.status == 200) {
            projects = await response.json();
        }
        if(response.status == 401) {
            document.location.href = "/login";
        }
    }

    const focusNext = (id: number, directionUp: boolean = false) => {
      let node : HTMLElement | null = document.getElementById('Project_list_' + id);
      do {
        if (directionUp) {
          node = <HTMLElement>node?.previousSibling;
        } else {
          node = <HTMLElement>node?.nextSibling;
        }
      } while(node != null && node.nodeName == '#text');


      if(node != null) {
        (<HTMLElement>node.firstChild)?.focus();
      } else {
        document.getElementById('Project_list_0')?.focus();
      }
    }

    const focus = async (event: Event, project: Project) => {
      
      current = project;
      project.origin = {id : project.id, user_id: project.user_id, name : project.name};
  
    }

    const keypress = async (event: KeyboardEvent, project: Project) => {

      if (event.key == 'Enter') {
        event.stopImmediatePropagation();
        event.preventDefault();
        if(! await isDeleted(project))
          focusNext(project.id);
        return false;
      }
      if (event.key == 'ArrowDown') {
        event.stopImmediatePropagation();
        event.preventDefault();
        if(!await isDeleted(project))
          focusNext(project.id);
        return false;
      }
      if (event.key == 'ArrowUp') {
        event.stopImmediatePropagation();
        event.preventDefault();
        //if(!await isDeleted(project))
        focusNext(project.id, true);
        return false;
      }
      if (event.key == 'Tab') {
        if(await isDeleted(project)) {
          event.stopImmediatePropagation();
          event.preventDefault();
        }
      }
      current = project;

    };

    let newProject = {
        name: ""
    };

    const add = async (event: KeyboardEvent) => {

      if (event.key == 'Enter' && newProject.name != '') {
        event.stopImmediatePropagation();
        event.preventDefault();

        const response : Response = await http.postData(PUBLIC_BACKEND_URL + '/api/projects/create', newProject);
        if(response.status == 201) {
          newProject.name = '';
          let project = await response.json();
          projects.push(project);
          projects = projects;
        }
        return false;
      }

      if (event.key == 'ArrowUp') {
        event.stopImmediatePropagation();
        event.preventDefault();
        focusNext(0, true);
      }

    }

    const isDeleted = async (project: Project) : Promise<boolean> => {

        if ((project?.origin?.name == project.name))
            return false;

        if (project.name == '') {
            const response : Response = await http.deleteData(PUBLIC_BACKEND_URL + '/api/projects/' + project.id);

            if(response.status == 200) {
                for(let i: number = 0; i < projects.length; i++) {
                if (projects[i].id == project.id) {
                    projects.splice(i, 1);
                    projects = projects;
                    if (i == projects.length) {
                    document.getElementById('Project_list_0')?.focus();
                    }
                    return true;
                }
                }
            }
        } else {

            const response : Response = await http.putData(PUBLIC_BACKEND_URL + '/api/projects/' + project.id, project);

        }
        return false;

    }    

    const blur = async (event: Event, project: Project) => {

        isDeleted(project);

    }
</script>


<ul class="flex flex-col">
    {#each projects as project}
      <li id="Project_list_{project.id}" class="flex flex-col relative">
        <input class="text-gray-100 m-2 p-2 rounded-sm bg-gray-700 break-words" 
          on:keydown={event => keypress(event, project)} 
          on:blur={event => blur(event, project)} 
          on:focus={event => focus(event, project)} 
          type="text" bind:value={project.name}/>
      </li>
      <!--li id="Project_list_{project.id}" class="flex flex-col"><div role="textbox" tabindex={project.order} on:keydown={event => keypress(event, project)} contenteditable="true" class="text-gray-100 m-2 p-2 rounded-sm bg-gray-700">{project.title}</div></li-->
    {/each}
      <li id="Project_list_0" class="flex flex-col">
        <input class="text-gray-100 m-2 p-2 rounded-sm bg-gray-800 break-words border-dashed border" 
          on:keydown={event => add(event)} 
          bind:value={newProject.name}
          on:focus={() => {current = null}}
          type="text" 
        />
      </li>
</ul>


