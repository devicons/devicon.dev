<script>
    export let isOpen = false;
    export let onClose;
    export let title;
  </script>
  
  {#if isOpen}
    <div
      class="fixed inset-0 bg-black-950 bg-opacity-50 flex items-center justify-center z-50 p-4"
      on:click|self={onClose}
    >
      <div
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <slot {title} {onClose} />
      </div>
    </div>
  {/if}