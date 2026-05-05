'use client';

import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function AboutBackground() {
  const activePage = usePortfolioStore((state) => state.activePage);

  if (activePage !== 'about') return null;

  return (
    <div 
      className="absolute inset-0 w-full h-full flex flex-row items-center justify-center pointer-events-none z-10 overflow-hidden"
    >
      {[...Array(2)].map((_, i) => (
        <video
          key={i}
          src="/ascii-art-shubham.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-[50vw] h-auto object-contain opacity-40 shrink-0"
        />
      ))}
    </div>
  );
}
