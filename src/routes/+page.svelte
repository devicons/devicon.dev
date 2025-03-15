<script>
  import { onMount } from "svelte";
  import IconGrid from "../components/IconGrid.svelte";
  import SearchFilter from "../components/SearchFilter.svelte";
  import IconModal from "../components/IconModal.svelte";
  import {
    initializeStore,
    filteredIcons,
    isModalOpen,
  } from "$lib/stores/iconStore";

  export let data;

  onMount(() => {
    // Initialize store with server-fetched data
    initializeStore(data.icons, data.availableTags);
  });
</script>

<main
  class=" w-full  min-h-screen transition-colors duration-200 dark:bg-gray-900 dark:text-white"
>
  <div class="container mx-auto p-4" >

  {#if data.error}
    <div class="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
      <p class="text-red-700 dark:text-red-300">Error: {data.error}</p>
    </div>
  {:else}
    <SearchFilter />

    <div class="mt-6">
      <p class="mb-2">Found {$filteredIcons.length} icons</p>
      <IconGrid icons={$filteredIcons} />
    </div>
  {/if}

  {#if $isModalOpen}
    <IconModal />
  {/if}
  </div>
</main>
