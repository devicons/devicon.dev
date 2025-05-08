<script>
  export let title;
  export let versions;
  export let type; // 'font' or 'svg'
  export let selectedIcon;
  export let getIconUrl; // Only needed for SVG type

  // Track selected version
  let selectedVersion = versions[0] ?? null;

  // Handle version selection
  function selectVersion(version) {
    selectedVersion = version;
  }
  const copyToClipboard = async (text) => {
      if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      }
  }

  function getIconCode() {
    if (type === "font") {
      return `<i class=devicon-${selectedIcon?.name}-${selectedVersion ??  'plain'}></i>`
    }
    return `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${selectedIcon?.name}/${selectedIcon?.name}-${selectedVersion}.svg"/>`
  }
</script>

<h3 class="mb-2">{title}</h3>
<div class="flex flex-col items-center mb-6">
  {#if versions.length > 0}
    <div
      class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4 w-full flex flex-wrap"
    >
      {#each versions as version}
        {#if type === "font"}
          <button
            class="cursor-pointer transition-all p-4
                     {selectedVersion === version
              ? 'ring-2 ring-green-500 rounded-lg'
              : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'}"
            on:click={() => selectVersion(version)}
            aria-label={`Select ${version} version`}
          >
            <i
              class="text-4xl sm:text-6xl sm:w-16 sm:h-16 devicon-{selectedIcon.name}-{version ??
                'plain'}  hover:text-green-700 transition-colors"
            ></i>
          </button>
        {:else}
          <button
            class="h-24 p-1 cursor-pointer transition-all
                     {selectedVersion === version
              ? 'ring-2 ring-green-500 rounded-lg bg-green-50 dark:bg-green-950/10'
              : 'hover:opacity-80'}"
            on:click={() => selectVersion(version)}
            aria-label={`Select ${version} version`}
          >
            <img
              src={getIconUrl(selectedIcon, version)}
              alt={selectedIcon ? `${selectedIcon.name} (${version})` : ""}
              class="h-full"
            />
          </button>
        {/if}
      {/each}
    </div>
    <div
      class="code-snippet relative rounded-md w-full p-4 pr-10 mt-4 dark:text-gray-400 bg-gray-200 dark:bg-gray-900"
    >
      <div class="tooltip absolute right-2 top-4 w-7">
        <button
          class="material-symbols-outlined copy rounded-full text-xl hover:cursor-pointer hover:hover-text-color"
          on:click={() => copyToClipboard(getIconCode())}
        >
          content_copy
        </button>
      </div>
      <code class="break-all">
        {getIconCode()}
      </code>
    </div>
  {:else}
    <p class="text-gray-500 dark:text-gray-400">
      No {type === "font" ? "font" : "SVG"} versions available
    </p>
  {/if}
</div>
