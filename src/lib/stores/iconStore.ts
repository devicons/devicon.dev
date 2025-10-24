import { writable, derived, type Writable, type Readable } from "svelte/store"
import type { IIcon } from "$lib/types/types"

export const icons: Writable<IIcon[]> = writable([])
export const availableTags: Writable<string[]> = writable([])
export const searchTerm: Writable<string> = writable("")
export const selectedTags: Writable<string[]> = writable([])
export const isDarkMode: Writable<boolean> = writable(false)
export const selectedIcon: Writable<IIcon | null> = writable(null)
export const isModalOpen: Writable<boolean> = writable(false)
export const isLoading: Writable<boolean> = writable(false)
export const error: Writable<string | null> = writable(null)

export async function fetchIconsData(): Promise<void> {
  isLoading.set(true)
  error.set(null)

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json",
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch icons: ${response.statusText}`)
    }

    const iconsData: IIcon[] = await response.json()

    // Extract all available tags
    const availableTagsSet = new Set<string>()
    iconsData.forEach((icon) => {
      if (icon.tags && Array.isArray(icon.tags)) {
        icon.tags.forEach((tag) => availableTagsSet.add(tag))
      }
    })

    const sortedTags = Array.from(availableTagsSet).sort()

    // Set the data in stores
    icons.set(iconsData)
    availableTags.set(sortedTags)

    // Initialize dark mode preference
    initializeDarkMode()
  } catch (err: any) {
    console.error("Error fetching icons:", err)
    error.set(err.message)
    icons.set([])
    availableTags.set([])
  } finally {
    isLoading.set(false)
  }
}

function initializeDarkMode(): void {
  if (typeof window !== "undefined") {
    // Check local storage for dark mode preference, default to true if not set
    const storedDarkMode = localStorage.getItem("darkMode")
    const isDark = storedDarkMode === null ? true : storedDarkMode === "true"

    isDarkMode.set(isDark)

    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }
}

export function initializeStore(
  initialIcons: IIcon[],
  initialTags: string[],
): void {
  icons.set(initialIcons)
  availableTags.set(initialTags)
  initializeDarkMode()
}

export const filteredIcons: Readable<IIcon[]> = derived(
  [icons, searchTerm, selectedTags],
  ([$icons, $searchTerm, $selectedTags]) => {
    return $icons.filter((icon) => {
      const matchesSearch =
        $searchTerm === "" ||
        icon.name.toLowerCase().includes($searchTerm.toLowerCase()) ||
        icon.altnames.some((altname) =>
          altname.toLowerCase().includes($searchTerm.toLowerCase()),
        )

      const matchesTags =
        $selectedTags.length === 0 ||
        (icon.tags && $selectedTags.every((tag) => icon.tags!.includes(tag)))

      return matchesSearch && matchesTags
    })
  },
)

export const totalVersions: Readable<number> = derived([icons], ([$icons]) =>
  $icons.reduce(
    (acc, icon) =>
      acc +
      (icon?.versions?.font?.length ?? 0) +
      (icon?.versions?.svg?.length ?? 0),
    0,
  ),
)

export function setSearchTerm(term: string): void {
  searchTerm.set(term)
}

export function setSelectedTags(tags: string[]): void {
  selectedTags.set(tags)
}

export function clearFilters(): void {
  searchTerm.set("")
  selectedTags.set([])
}

export function toggleDarkMode(): void {
  isDarkMode.update((current) => {
    const newValue = !current

    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", newValue.toString())

      if (newValue) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    return newValue
  })
}

export function openIconModal(icon: IIcon): void {
  selectedIcon.set(icon)
  isModalOpen.set(true)
}

export function closeIconModal(): void {
  isModalOpen.set(false)
}
