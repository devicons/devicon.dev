<script>
  import {
    availableTags,
    searchTerm,
    selectedTags,
    setSearchTerm,
    setSelectedTags,
    clearFilters,
  } from "$lib/stores/iconStore";

  let selectElement;

  let isDropdownOpen = false;

  function toggleTag(tag) {
    setSelectedTags(
      $selectedTags.includes(tag)
        ? $selectedTags.filter((t) => t !== tag)
        : [...$selectedTags, tag]
    );
  }

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }
</script>

<div class=" py-4 rounded-lg flex gap-4 justify-between">
  <div class="mb-4 grow">
    <input
      type="text"
      id="search"
      bind:value={$searchTerm}
      on:input={(e) => setSearchTerm(e.target.value)}
      placeholder="Type to search..."
      class="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
  </div>

  <div class="grow">
    <div class="relative">
      <button
        id="tag-dropdown"
        type="button"
        on:click={toggleDropdown}
        class="flex justify-between items-center w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        {#if $selectedTags.length === 0}
          <span> Select tags </span>
        {:else}
          <div class=" m-0.5 flex flex-wrap gap-1">
            {#each $selectedTags as tag}
              <span
                class="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
                <button
                  class="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                  on:click={() => toggleTag(tag)}
                  aria-label={`Remove ${tag} tag`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            {/each}
          </div>
        {/if}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      {#if isDropdownOpen}
        <!-- Backdrop for closing dropdown when clicking outside -->
        <div class="fixed inset-0 z-10" on:click={closeDropdown}></div>

        <div
          class="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {#if $selectedTags.length > 0}
            <div class="p-2 border-b dark:border-gray-600">
              <button
                class="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                on:click={() => setSelectedTags([])}
              >
                Clear all selections
              </button>
            </div>
          {/if}

          <div class="py-1">
            {#each $availableTags as tag}
              <div
                class="px-3 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                on:click={() => toggleTag(tag)}
              >
                <input
                  type="checkbox"
                  id={`tag-${tag}`}
                  checked={$selectedTags.includes(tag)}
                  class="mr-2"
                  on:change={() => toggleTag(tag)}
                />
                <label
                  for={`tag-${tag}`}
                  class="flex-1 cursor-pointer dark:text-gray-200"
                >
                  {tag}
                </label>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
