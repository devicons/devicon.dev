<script>
  import { openIconModal } from '$lib/stores/iconStore';
  
  export let icons = [];
  
  function getIconUrl(icon, version) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.name}-${version}.svg`;
  }
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
  {#each icons as icon}
    <div 
      class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      on:click={() => openIconModal(icon)}
      on:keydown={(e) => e.key === 'Enter' && openIconModal(icon)}
      tabindex="0"
      role="button"
      aria-label={`View ${icon.name} details`}
    >
      <div class="flex justify-center items-center h-16 mb-2">
        <i class="text-4xl sm:text-6xl sm:w-16 sm:h-16 devicon-{ icon.name }-{ icon.versions.font[0] ?? 'plain' }"></i>
      </div>
      
      <div class="text-center">
        <h3 class="font-medium text-sm truncate dark:text-white">{icon.name}</h3>
      </div>
    </div>
  {/each}
</div>