
<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { http } from "$lib/ClientHttp";
    

    let todos: Array<any> = [];

    onMount(async () => {

      const response : Response = await http.getData(PUBLIC_BACKEND_URL + '/api/todos');

      if(response.status == 200) {
        todos = await response.json();
        console.log(todos);
      }

    });

    const focusNext = (id: number, directionUp: boolean = false) => {
      let node : HTMLElement | null = document.getElementById('list_' + id);
      do {
        if (directionUp) {
          node = <HTMLElement>node?.previousSibling;
        } else {
          node = <HTMLElement>node?.nextSibling;
        }
      } while(node != null && node.nodeName == '#text');

        console.log(node);
      if(node != null) {
        console.log(node.firstChild);
        (<HTMLElement>node.firstChild)?.focus();
      }
    }

    const change = (event: KeyboardEvent, todo: any) => {

      if (event.key == 'Enter') {
        event.stopImmediatePropagation();
        event.preventDefault();
        focusNext(todo.id);
        return false;
      }
      if (event.key == 'ArrowDown') {
        focusNext(todo.id);
      }
      if (event.key == 'ArrowUp') {
        focusNext(todo.id, true);
      }
    };

    let new_title = '';

    const add = async (event: KeyboardEvent) => {

      if (event.key == 'Enter') {
        event.stopImmediatePropagation();
        event.preventDefault();

        const response : Response = await http.getData(PUBLIC_BACKEND_URL + '/api/todos/create?title=' + new_title);
        if(response.status == 201) {
          new_title = '';
          let todo = await response.json();
          console.log(todo);
          todos.push(todo);
          console.log(todos);
        }
        return false;
      }

      if (event.key == 'ArrowUp') {
        focusNext(0, true);
      }

    }



</script>


<div class="max-w-7xl mx-auto h-screen">

  <div class="flex flex-col z-50 fixed w-64 border-r border-gray-700 h-screen p-3">
    <div class="flex flex-row my-5">
      <div class="mx-auto text-zinc-600 uppercase text-lg font-bold">Papier</div>
    </div>
    <nav class="overflow-auto">
      <ul role="list" class="flex flex-col text-gray-200">
        <li class="px-3 py-1 rounded-md leading-7 mb-2 border-gray-800 bg-gray-800">List 1</li>
        <li class="px-3 py-1 rounded-md leading-7 mb-2 border-gray-800 bg-gray-800">List 2</li>
      </ul>
    </nav>
  </div>

  <div class=" ml-64 h-screen">
    <div class="flex flex-col h-screen">
      <div class=" border-b border-gray-700 min-[50] text-gray-700 p-5 font-bold">
          Menu
      </div>

      <div class=" m-5 p-2 border border-dashed border-gray-700 rounded-xl text-gray-200 h-screen">
        <ul class="flex flex-col">
        {#each todos as todo}
          <li id="list_{todo.id}" class="flex flex-col"><input class="text-gray-100 m-2 p-2 rounded-sm bg-gray-700 break-words" tabindex={todo.order} on:keydown={event => change(event, todo)} type="text" bind:value={todo.title}/></li>
          <!--li id="list_{todo.id}" class="flex flex-col"><div role="textbox" tabindex={todo.order} on:keydown={event => change(event, todo)} contenteditable="true" class="text-gray-100 m-2 p-2 rounded-sm bg-gray-700">{todo.title}</div></li-->
        {/each}
          <li id="list_0" class="flex flex-col"><input class="text-gray-100 m-2 p-2 rounded-sm bg-gray-800 break-words border-dashed border" on:keydown={event => add(event)} type="text" bind:value={new_title}/></li>
        </ul>
        

      </div>
    </div>
  </div>

</div>


  


