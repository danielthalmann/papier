<script  lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { http } from "$lib/ClientHttp";
    import type { Todo } from "$lib/types/Todo";
    import type { Project } from "$lib/types/Project";

    export let todos: Array<Todo> = [];
    export let current: Todo | null;
    export let project: Project | null = null;
    let lastTabIndex = 0;

    $: if (project) {

      loadTodos();

    }

    onMount(() => {

        loadTodos();

    });

    const loadTodos = async () => {

      console.log("loadTodos");
      const response : Response = await http.getData(PUBLIC_BACKEND_URL + '/api/todos?project_id=' + (project ? project?.id : '' ));
      if(response.status == 200 || response.status == 304) {
        todos = await response.json();
      }
      if(response.status == 401) {
        document.location.href = "/login";
      }
      if (todos.length > 0) {
        lastTabIndex = todos[todos.length-1].order + 1;
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

    const focus = async (event: Event, todo: Todo) => {
      
      current = todo;
      // save the origin value
      todo.origin = {id : todo.id, title : todo.title, order: todo.order};
  
    }

    const keypress = async (event: KeyboardEvent, todo: Todo) => {

      if (event.key == 'Enter') {
        event.stopImmediatePropagation();
        event.preventDefault();
        if(! await updateTodo(todo))
          focusNext(todo.id);
        return false;
      }
      if (event.key == 'ArrowDown') {
        event.stopImmediatePropagation();
        event.preventDefault();
        if(!await updateTodo(todo))
          focusNext(todo.id);
        return false;
      }
      if (event.key == 'ArrowUp') {
        event.stopImmediatePropagation();
        event.preventDefault();
        //if(!await updateTodo(todo))
        focusNext(todo.id, true);
        return false;
      }
      if (event.key == 'Tab') {
        if(await updateTodo(todo)) {
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

    /**
     * Update todo item and return true if is deleted
     * 
     * @param todo
     * @return bool 
     */
    const updateTodo = async (todo: Todo) : Promise<boolean> => {

        if ((todo?.origin?.title == todo.title))
            return false;

        if (todo.title == '') {
            const response : Response = await http.deleteData(PUBLIC_BACKEND_URL + '/api/todos/' + todo.id);

            if(response.status == 200) {
                for(let i: number = 0; i < todos.length; i++) 
                {
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
        } else {

            const response : Response = await http.putData(PUBLIC_BACKEND_URL + '/api/todos/' + todo.id, todo);

        }
        return false;

    }    

    const blur = async (event: Event, todo: Todo) => {

        updateTodo(todo);

    }
</script>


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


