
<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { http } from "$lib/ClientHttp";
    import Dropdown from "$lib/components/Dropdown.svelte";
    import Badge from "$lib/components/Badge.svelte";
    import type { Todo } from "$lib/types/Todo";
    import type { Project } from "$lib/types/Project";
    import TodoList from "$lib/components/TodoList.svelte";
    import ProjectList from "$lib/components/ProjectList.svelte";
    

    // let todos: Array<Todo> = [];
    let projects: Array<Project> = [];
    let project: Project | null;
    let current: Todo | null;

    onMount(() => {

    });

</script>


<div class="max-w-7xl mx-auto h-screen">

  <div class="flex flex-col z-50 fixed w-64 border-r border-gray-700 h-screen p-3">
    <div class="flex flex-row my-5">
      <div class="mx-auto text-zinc-600 uppercase text-lg font-bold">Papier {project?.name}</div>
    </div>
    <nav class="overflow-auto">

      <ProjectList bind:current={project} ></ProjectList>


<!--
      <ul role="list" class="flex flex-col text-gray-200">
        <li class="px-3 py-1 rounded-md leading-7 mb-2 border-gray-800 bg-gray-800">Root</li>
        {#each projects as project}
          <li class="px-3 py-1 rounded-md leading-7 mb-2 border-gray-800 bg-gray-800">{project.name}</li>
        {/each}
        <li class="flex flex-col">
          <input class="text-gray-100 m-2 p-2 rounded-sm bg-gray-800 break-words border-dashed border" 
            
            on:keydown={event => addProject(event)} 
            type="text" 
          />
        </li>        
      </ul>
-->

    </nav>
  </div>

  <div class=" ml-64 h-screen">
    <div class="flex flex-col h-screen">
      <div class=" border-b border-gray-700 min-[50] text-gray-700 p-5 font-bold flex flex-row justify-end">
          <Dropdown></Dropdown>
      </div>

      <div class="flex">
        <div class="m-5 p-2 border border-dashed border-gray-700 rounded-xl text-gray-200 h-screen flex-grow">
          <TodoList bind:current={current} bind:project={project}></TodoList>
        </div>

        {#if current}
          <div  class="m-5 p-2 border border-dashed border-gray-700 rounded-xl text-gray-200 h-screen w-60">
            {#if current}
              {current.project_id}
            {/if}
            {current.title}
            <Badge title="Badge"></Badge>
          </div>
        {/if}
      </div>

    </div>
  </div>

</div>


  


