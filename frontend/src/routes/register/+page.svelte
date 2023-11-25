
<script lang="ts">
    import { onMount } from "svelte";
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import type { Credentials } from "../../types/Credentials";
    import { http } from "$lib/ClientHttp";

    
    let credentials : Credentials = {email: '', password: '', confirm: ''};

    const registerForm = () => {

      console.log(credentials);

      const json = http.postData(PUBLIC_BACKEND_URL + '/api/auth/login', credentials);

      console.log(json);
        
    };

    const isPasswordConfirm = (cred : Credentials) : boolean => {
      if (cred.password == '' && cred.confirm == '') {
        return true;
      }
      return cred.password == cred.confirm;
    }

    const isPasswordValid = (cred : Credentials) : boolean => {
      return cred.password != '' && cred.password.length > 5;
    }

    const isFormValid = (cred : Credentials) : boolean  => {
      let is = isPasswordConfirm(cred) && isPasswordValid(cred);
      console.log ("isFormValid" + is);
      return is;
    }

</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">

  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Register your new account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form on:submit|preventDefault={registerForm} class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
        <div class="mt-2">
          <input id="email" name="email" type="email" bind:value={credentials.email} autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
        </div>
        <div class="mt-2">
          <input id="password" name="password" type="password" bind:value={credentials.password} autocomplete="new-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-white">Confirm password</label>
        </div>
        <div class="mt-2">
          <input id="password" name="confirm" type="password" bind:value={credentials.confirm} autocomplete="new-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2">
        </div>
      </div>

      {#if !isPasswordConfirm(credentials)}
        <p class="text-white">The confirmation password is not same to the password</p>
      {/if}
      
      <div>
        <button type="submit" disabled='{isFormValid(credentials)}' class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
      </div>
    </form>

  </div>
</div>

