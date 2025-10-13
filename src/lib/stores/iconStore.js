import { writable, derived } from 'svelte/store';

// Create the main stores
export const icons = writable([]);
export const availableTags = writable([]);
export const searchTerm = writable('');
export const selectedTags = writable([]);
export const isDarkMode = writable(false);
export const selectedIcon = writable(null);
export const isModalOpen = writable(false);

// Load icons data from GitHub API
export async function loadIconsData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/devicons/devicon/master/devicon.json');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch icons: ${response.statusText}`);
    }
    
    const iconsData = await response.json();
    
    // Extract all available tags
    const availableTagsData = new Set();
    iconsData.forEach(icon => {
      if (icon.tags && Array.isArray(icon.tags)) {
        icon.tags.forEach(tag => availableTagsData.add(tag));
      }
    });
    
    // Set the data in stores
    icons.set(iconsData);
    availableTags.set(Array.from(availableTagsData).sort());
    
    return { icons: iconsData, availableTags: Array.from(availableTagsData).sort() };
  } catch (error) {
    console.error('Error fetching icons:', error);
    icons.set([]);
    availableTags.set([]);
    throw error;
  }
}

// Initialize store with dark mode preference
export function initializeStore() {
  // Check local storage for dark mode preference
  if (typeof window !== 'undefined') {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    isDarkMode.set(storedDarkMode);
    
    // Apply theme to document
    if (storedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }
}

// Derived store for filtered icons
export const filteredIcons = derived(
  [icons, searchTerm, selectedTags],
  ([$icons, $searchTerm, $selectedTags]) => {
    return $icons.filter(icon => {
      const matchesSearch = $searchTerm === '' ||
        icon.name.toLowerCase().includes($searchTerm.toLowerCase()) ||
        icon.altnames.some(altname => altname.toLowerCase().includes($searchTerm.toLowerCase()));

      const matchesTags = $selectedTags.length === 0 ||
        (icon.tags && $selectedTags.every(tag => icon.tags.includes(tag)));

      return matchesSearch && matchesTags;
    });
  }
);

export const totalVersions = derived(
  [icons],
  ([$icons]) => $icons.reduce((acc, icon) => acc + icon?.versions?.font?.length + icon?.versions?.svg?.length, 0)
)

// Actions to update the store
export function setSearchTerm(term) {
  searchTerm.set(term);
}

export function setSelectedTags(tags) {
    selectedTags.set(tags);
  }

export function clearFilters() {
  searchTerm.set('');
  selectedTags.set([]);
}

export function toggleDarkMode() {
    isDarkMode.update(current => {
      const newValue = !current;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', newValue.toString());
        
        if (newValue) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      return newValue;
    });
  }
  
  export function openIconModal(icon) {
    selectedIcon.set(icon);
    isModalOpen.set(true);
  }
  
  export function closeIconModal() {
    isModalOpen.set(false);
  }
