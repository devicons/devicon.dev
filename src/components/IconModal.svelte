<script lang="ts">
  import { onMount } from "svelte";
  import {
    selectedIcon,
    closeIconModal,
  } from "$lib/stores/iconStore";
  import type { IconType } from "$lib/types/icon";
  import Modal from "./Modal.svelte";
  import IconModalHeader from "./IconModalHeader.svelte";
  import IconVersions from "../components/IconVersions.svelte";

  let selectedVersion = "" as string;
  let versions = [] as string[];

  interface Icon {
    name: string;
    versions: {
      svg: string[];
      font: string[];
    };
  }

  $: if (
    $selectedIcon &&
    $selectedIcon.versions &&
    $selectedIcon.versions.svg
  ) {
    versions = $selectedIcon.versions.svg;
    selectedVersion = versions.includes("original") ? "original" : versions[0];
  }

  function getIconUrl(icon: IconType, version: string) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.name}/${icon.name}-${version}.svg`;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      closeIconModal();
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<Modal isOpen={!!$selectedIcon} onClose={closeIconModal} title={$selectedIcon?.name}>
  <IconModalHeader title={$selectedIcon?.name} onClose={closeIconModal} />
  
  {#if $selectedIcon}
    <IconVersions
      title="Font versions"
      versions={$selectedIcon?.versions?.font || []}
      type="font"
      selectedIcon={$selectedIcon}
    />
    
    <IconVersions
      title="SVG versions"
      versions={versions}
      type="svg"
      selectedIcon={$selectedIcon}
      getIconUrl={getIconUrl}
    />
  {/if}
</Modal>