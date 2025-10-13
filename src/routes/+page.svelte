<script>
  import { onMount } from "svelte";
  import IconGrid from "../components/IconGrid.svelte";
  import SearchFilter from "../components/SearchFilter.svelte";
  import IconModal from "../components/IconModal.svelte";
  import {
    initializeStore,
    loadIconsData,
    filteredIcons,
    isModalOpen,
  } from "$lib/stores/iconStore";

  let isLoading = true;
  let error = null;

  onMount(async () => {
    // Initialize store with dark mode preference
    initializeStore();
    
    try {
      // Load icons data from GitHub API
      await loadIconsData();
      isLoading = false;
    } catch (err) {
      error = err.message;
      isLoading = false;
    }
  });
</script>

<main
  class=" w-full  min-h-screen transition-colors duration-200 dark:bg-gray-900 dark:text-white"
>
  <div class="container mx-auto p-4" >

  {#if isLoading}
    <div class="flex justify-center items-center min-h-64">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600 dark:text-gray-400">Loading icons...</p>
      </div>
    </div>
  {:else if error}
    <div class="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
      <p class="text-red-700 dark:text-red-300">Error: {error}</p>
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
