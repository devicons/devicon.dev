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

  function handleTagsChange() {
    const selected = Array.from(selectElement.selectedOptions).map(
      (option) => option.value
    );
    setSelectedTags(selected);
  }
</script>

<div
  class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex gap-4 justify-between"
>
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
    <select
      id="tags"
      bind:this={selectElement}
      multiple
      size="1"
      on:change={handleTagsChange}
      class="w-full p-2.5 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      {#each $availableTags as tag}
        <option value={tag} selected={$selectedTags.includes(tag)}>
          {tag}
        </option>
      {/each}
    </select>
    {#if $selectedTags.length > 0}
      <button
        class="mt-4 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md dark:text-white"
        on:click={clearFilters}
      >
        Clear filters
      </button>
    {/if}
  </div>
</div>
