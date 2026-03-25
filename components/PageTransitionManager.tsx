'use client';

import { usePortfolioStore } from '@/store/usePortfolioStore';
import WorkBackground from '@/components/pages/WorkBackground';

export default function PageTransitionManager() {
  const activePage = usePortfolioStore((state) => state.activePage);

  return (
    <>
      {/* Home GIF Background */}
      <div 
        className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${activePage === 'home' ? 'block' : 'hidden'}`}
        style={{ 
          backgroundImage: "url('/ascii-eye.gif')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3
        }}
      />

      {/* Pages Backgrounds */}
      <WorkBackground />
    </>
  );
}
