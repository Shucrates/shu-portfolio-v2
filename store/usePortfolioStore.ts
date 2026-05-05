import { create } from 'zustand';

export type PageId = 'home' | 'work' | 'about' | 'services' | 'archive' | 'awards' | 'contact';

interface PortfolioStore {
  activePage: PageId;
  lockedPage: PageId | null;
  isWorkDetail: boolean;
  isAboutDetail: boolean;
  isServicesDetail: boolean;
  setActivePage: (page: PageId) => void;
  setLockedPage: (page: PageId | null) => void;
  setIsWorkDetail: (val: boolean) => void;
  setIsAboutDetail: (val: boolean) => void;
  setIsServicesDetail: (val: boolean) => void;
  mousePosition: { x: number; y: number };
  setMousePosition: (pos: { x: number; y: number }) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  activePage: 'home',
  lockedPage: null,
  isWorkDetail: false,
  isAboutDetail: false,
  isServicesDetail: false,
  setActivePage: (page) => set({ activePage: page }),
  setLockedPage: (page) => set({ lockedPage: page }),
  setIsWorkDetail: (val) => set({ isWorkDetail: val }),
  setIsAboutDetail: (val) => set({ isAboutDetail: val }),
  setIsServicesDetail: (val) => set({ isServicesDetail: val }),
  mousePosition: { 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  },
  setMousePosition: (pos) => set({ mousePosition: pos }),
}));
