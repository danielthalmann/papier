
<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Credentials } from "../../types/Credentials";
    import { http } from "$lib/ClientHttp";

    let todos: Array<any> = [];

    onMount(async () => {

      const response : Response = await http.getData(PUBLIC_BACKEND_URL + '/api/todos');

      if(response.status == 200) {
        todos = await response.json();
        console.log(todos);
      }

    });

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
        <ul>
        {#each todos as todo}
          <li>{todo.title}</li>
        {/each}
        </ul>
        test

      </div>
    </div>
  </div>

</div>


  


