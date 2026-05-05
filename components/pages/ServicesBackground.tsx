'use client';

import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function ServicesBackground() {
  const activePage = usePortfolioStore((state) => state.activePage);
  const isServicesDetail = usePortfolioStore((state) => state.isServicesDetail);

  if (activePage !== 'services') return null;

  return (
    <div 
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 grid grid-cols-2 sm:grid-cols-4 overflow-hidden ${!isServicesDetail ? 'opacity-60' : 'opacity-0'}`}
    >
      {[...Array(12)].map((_, i) => (
        <div key={i} className="relative w-full h-full border-[0.5px] border-white/5">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover saturate-150 transition-all duration-500"
          >
            <source src="/services/services-vhs-2.mp4" type="video/mp4" />
          </video>
          {/* SCANLINE OVERLAY PER TILE */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px] pointer-events-none" />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
}
