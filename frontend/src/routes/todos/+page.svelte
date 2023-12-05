
<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { http } from "$lib/ClientHttp";
    import Dropdown from "$lib/components/Dropdown.svelte";
    import Badge from "$lib/components/Badge.svelte";
    

    let todos: Array<any> = [];
    let projects: Array<any> = [];
    let lastTabIndex = 0;
    let current: any;

    onMount(() => {

      loadTodos();
      loadProjects();

    });

    const loadTodos = async () => {
      const response : Response = await http.getData(PUBLIC_BACKEND_URL + '/api/todos');
      if(response.status == 200) {
        todos = await response.json();
      }
      if(response.status == 401) {
        document.location.href = "/login";
      }
      if (todos.length > 0) {
        lastTabIndex = todos[todos.length-1].order + 1;
      }

    }

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
      let node : HTMLElement | null = document.getElementById('list_' + id);
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
        document.getElementById('list_0')?.focus();
      }
    }

    const focus = async (event: Event, todo: any) => {
      
      current = todo;

    }

    const keypress = async (event: KeyboardEvent, todo: any) => {

      if (event.key == 'Enter') {
        event.stopImmediatePropagation();
        event.preventDefault();
        if(! await isDeleted(todo))
          focusNext(todo.id);
        return false;
      }
      if (event.key == 'ArrowDown') {
        event.stopImmediatePropagation();
        event.preventDefault();
        if(!await isDeleted(todo))
          focusNext(todo.id);
        return false;
      }
      if (event.key == 'ArrowUp') {
        event.stopImmediatePropagation();
        event.preventDefault();
        //if(!await isDeleted(todo))
        focusNext(todo.id, true);
        return false;
      }
      if (event.key == 'Tab') {
        if(await isDeleted(todo)) {
          event.stopImmediatePropagation();
          event.preventDefault();
        }
      }
      current = todo;

    };

    let newTodo = {
      title: ""
    };

    const add = async (event: KeyboardEvent) => {

      if (event.key == 'Enter' && newTodo.title != '') {
        event.stopImmediatePropagation();
        event.preventDefault();

        const response : Response = await http.postData(PUBLIC_BACKEND_URL + '/api/todos/create', newTodo);
        if(response.status == 201) {
          newTodo.title = '';
          let todo = await response.json();
          todos.push(todo);
          todos = todos;
          lastTabIndex = todos[todos.length-1].order + 1;
        }
        return false;
      }

      if (event.key == 'ArrowUp') {
        event.stopImmediatePropagation();
        event.preventDefault();
        focusNext(0, true);
      }

    }

    const isDeleted = async (todo: any) : Promise<boolean> => {

      if (todo.title == '') {
        const response : Response = await http.deleteData(PUBLIC_BACKEND_URL + '/api/todos/' + todo.id);

        if(response.status == 200) {
          for(let i: number = 0; i < todos.length; i++) {
            if (todos[i].id == todo.id) {
              todos.splice(i, 1);
              todos = todos;
              if (i == todos.length) {
                document.getElementById('list_0')?.focus();
              }
              return true;
            }
          }
        }
      }
      return false;

    }    

    const blur = async (event: Event, todo: any) => {

      isDeleted(todo);

    }

</script>


<div class="max-w-7xl mx-auto h-screen">

  <div class="flex flex-col z-50 fixed w-64 border-r border-gray-700 h-screen p-3">
    <div class="flex flex-row my-5">
      <div class="mx-auto text-zinc-600 uppercase text-lg font-bold">Papier</div>
    </div>
    <nav class="overflow-auto">
      <ul role="list" class="flex flex-col text-gray-200">
        <li class="px-3 py-1 rounded-md leading-7 mb-2 border-gray-800 bg-gray-800">Root</li>
        {#each projects as project}
          <li class="px-3 py-1 rounded-md leading-7 mb-2 border-gray-800 bg-gray-800">{project.name}</li>
        {/each}
      </ul>
    </nav>
  </div>

  <div class=" ml-64 h-screen">
    <div class="flex flex-col h-screen">
      <div class=" border-b border-gray-700 min-[50] text-gray-700 p-5 font-bold flex flex-row justify-end">
          <Dropdown></Dropdown>
      </div>

      <div class="flex">
        <div class="m-5 p-2 border border-dashed border-gray-700 rounded-xl text-gray-200 h-screen flex-grow">
          <ul class="flex flex-col">
          {#each todos as todo}
            <li id="list_{todo.id}" class="flex flex-col relative">
              <input class="text-gray-100 m-2 p-2 rounded-sm bg-gray-700 break-words" 
                tabindex={todo.order} 
                on:keydown={event => keypress(event, todo)} 
                on:blur={event => blur(event, todo)} 
                on:focus={event => focus(event, todo)} 
                type="text" bind:value={todo.title}/>
            </li>
            <!--li id="list_{todo.id}" class="flex flex-col"><div role="textbox" tabindex={todo.order} on:keydown={event => keypress(event, todo)} contenteditable="true" class="text-gray-100 m-2 p-2 rounded-sm bg-gray-700">{todo.title}</div></li-->
          {/each}
            <li id="list_0" class="flex flex-col">
              <input class="text-gray-100 m-2 p-2 rounded-sm bg-gray-800 break-words border-dashed border" 
                tabindex={lastTabIndex} 
                on:keydown={event => add(event)} 
                bind:value={newTodo.title}
                on:focus={() => {current = null}}
                type="text" 
              />
            </li>
          </ul>
        </div>

        {#if current}
          <div  class="m-5 p-2 border border-dashed border-gray-700 rounded-xl text-gray-200 h-screen w-60">
            {#if current}
              
            {/if}
            {current.title}
            <Badge title="Badge"></Badge>
          </div>
        {/if}
      </div>

    </div>
  </div>

</div>


  


