<script>
  import { onMount } from 'svelte';
  import { selectedIcon, isModalOpen, closeIconModal } from '$lib/stores/iconStore';
  
  let selectedVersion = '';
  let versions = [];
  
  $: if ($selectedIcon && $selectedIcon.versions && $selectedIcon.versions.svg) {
    versions = $selectedIcon.versions.svg;
    selectedVersion = versions.includes('original') ? 'original' : versions[0];
  }
  
  function getIconUrl(icon, version) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.name}-${version}.svg`;
  }
  
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      closeIconModal();
    }
  }
  
  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" on:click|self={closeIconModal}>
  <div 
    class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    {#if $selectedIcon}
      <div class="flex justify-between items-start mb-4">
        <h2 id="modal-title" class="text-xl font-bold dark:text-white">{$selectedIcon.name}</h2>
        <button 
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          on:click={closeIconModal}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="flex flex-col items-center mb-6">
        {#if versions.length > 0}
          <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg mb-4 w-full flex justify-center">
            <img 
              src={getIconUrl($selectedIcon, selectedVersion)} 
              alt={`${$selectedIcon.name} (${selectedVersion})`} 
              class="h-24"
            />
          </div>
          
          <div class="w-full">
            <label for="version-select" class="block text-sm font-medium mb-2 dark:text-gray-200">Select version:</label>
            <select 
              id="version-select"
              bind:value={selectedVersion}
              class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {#each versions as version}
                <option value={version}>{version}</option>
              {/each}
            </select>
          </div>
        {:else}
          <p class="text-gray-500 dark:text-gray-400">No SVG versions available</p>
        {/if}
      </div>
      
      {#if $selectedIcon.tags && $selectedIcon.tags.length > 0}
        <div class="mb-4">
          <h3 class="font-medium mb-2 dark:text-white">Tags:</h3>
          <div class="flex flex-wrap gap-1">
            {#each $selectedIcon.tags as tag}
              <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-sm">{tag}</span>
            {/each}
          </div>
        </div>
      {/if}
      
      <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          on:click={closeIconModal}
        >
          Close
        </button>
      </div>
    {/if}
  </div>
</div>