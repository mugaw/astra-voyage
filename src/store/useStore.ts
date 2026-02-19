import { create } from 'zustand';

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;
  
  // Loading
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Navigation
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  
  // Easter Egg - Star clicks
  starClickCount: number;
  incrementStarClick: () => void;
  resetStarClick: () => void;
  showEasterEgg: boolean;
  
  // Modal
  activeModal: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
  
  // Lightbox
  lightboxImage: string | null;
  lightboxIndex: number;
  setLightboxImage: (image: string | null, index?: number) => void;
  
  // Form
  formSubmitted: boolean;
  setFormSubmitted: (submitted: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Theme
  isDarkMode: true,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  // Loading
  isLoading: true,
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Navigation
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  
  // Easter Egg
  starClickCount: 0,
  incrementStarClick: () => set((state) => {
    const newCount = state.starClickCount + 1;
    return {
      starClickCount: newCount,
      showEasterEgg: newCount >= 5
    };
  }),
  resetStarClick: () => set({ starClickCount: 0, showEasterEgg: false }),
  showEasterEgg: false,
  
  // Modal
  activeModal: null,
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  
  // Lightbox
  lightboxImage: null,
  lightboxIndex: 0,
  setLightboxImage: (image, index = 0) => set({ lightboxImage: image, lightboxIndex: index }),
  
  // Form
  formSubmitted: false,
  setFormSubmitted: (submitted) => set({ formSubmitted: submitted }),
}));
