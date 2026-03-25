import { create } from 'zustand';

export type PageId = 'home' | 'work' | 'about' | 'services' | 'archive' | 'awards' | 'contact';

interface PortfolioStore {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  mousePosition: { x: number; y: number };
  setMousePosition: (pos: { x: number; y: number }) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activePage: 'home',
  setActivePage: (page) => set({ activePage: page }),
  mousePosition: { 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  },
  setMousePosition: (pos) => set({ mousePosition: pos }),
}));
