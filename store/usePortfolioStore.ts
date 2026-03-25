import { create } from 'zustand';

export type PageId = 'home' | 'work' | 'about' | 'services' | 'archive' | 'awards' | 'contact';

interface PortfolioStore {
  activePage: PageId;
  lockedPage: PageId | null;
  setActivePage: (page: PageId) => void;
  setLockedPage: (page: PageId | null) => void;
  mousePosition: { x: number; y: number };
  setMousePosition: (pos: { x: number; y: number }) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activePage: 'home',
  lockedPage: null,
  setActivePage: (page) => set({ activePage: page }),
  setLockedPage: (page) => set({ lockedPage: page }),
  mousePosition: { 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  },
  setMousePosition: (pos) => set({ mousePosition: pos }),
}));
