'use client';

import { useEffect, useState } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import DiamondNav from '@/components/DiamondNav';
import HeroCenterText from '@/components/HeroCenterText';
import WorkProjectsList from '@/components/WorkProjectsList';
import AboutDetailCard from '@/components/AboutDetailCard';
import ServicesDetailCard from '@/components/ServicesDetailCard';
import PageTransitionManager from '@/components/PageTransitionManager';

export const navItems = [
  { id: 1, label: 'WORK', page: 'work', side: 'left' },
  { id: 2, label: 'ABOUT', page: 'about', side: 'left' },
  { id: 3, label: 'SERVICES', page: 'services', side: 'left' },
  { id: 4, label: 'ARCHIVE', page: 'archive', side: 'right' },
  { id: 5, label: 'AWARDS', page: 'awards', side: 'right' },
  { id: 6, label: 'CONTACT', page: 'contact', side: 'right' },
];

export default function Home() {
  const [time, setTime] = useState<string>('');
  const setMousePosition = usePortfolioStore((state) => state.setMousePosition);
  const setActivePage = usePortfolioStore((state) => state.setActivePage);
  const setLockedPage = usePortfolioStore((state) => state.setLockedPage);
  const isWorkDetail = usePortfolioStore((state) => state.isWorkDetail);
  const isAboutDetail = usePortfolioStore((state) => state.isAboutDetail);
  const isServicesDetail = usePortfolioStore((state) => state.isServicesDetail);
  const setIsWorkDetail = usePortfolioStore((state) => state.setIsWorkDetail);
  
  const isAnyDetailActive = isWorkDetail || isAboutDetail || isServicesDetail;

  // Global Mouse Tracker for Parallax Data (Zustand)
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [setMousePosition]);

  // Live IST Clock Tracker
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { 
        timeZone: 'Asia/Kolkata', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const leftItems = navItems.filter((item) => item.side === 'left');
  const rightItems = navItems.filter((item) => item.side === 'right');

  return (
    <main className="relative w-full h-screen bg-black text-white overflow-hidden">
      
      {/* Orchestrates Background Crossfades */}
      <PageTransitionManager />

      {/* Top Bar Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white opacity-20 z-50"></div>

      {/* Top Bar Content */}
      <div className={`absolute top-6 w-full flex flex-row justify-between items-start px-8 mix-blend-difference z-50 transition-opacity duration-500 ${isAnyDetailActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Top-left Snowflake */}
        <div 
          onClick={() => {
            setLockedPage(null);
            setActivePage('home');
          }}
          data-cursor="expand" 
          className="text-4xl leading-none font-bold mt-[-8px] select-none p-2 cursor-pointer z-50 text-white"
        >
          *
        </div>

        {/* Top Center Text */}
        <div data-cursor="expand" className="flex flex-col items-center justify-center font-mono text-xs tracking-widest text-[#a3a3a3] uppercase p-3">
          <span className="text-white">Location: India</span>
          <span>Age: 21YR</span>
          <span className="mt-1 text-white/50 tabular-nums font-semibold tracking-widest">
            {time ? `${time} IST` : '--:--:-- IST'}
          </span>
        </div>

        {/* Top-right Placeholder (Maintains center alignment for location/time) */}
        <div className="w-10 h-10" aria-hidden="true" />
      </div>

      {/* Side Navigation - Left */}
      {!isAnyDetailActive && leftItems.map((item, index) => (
        <DiamondNav key={item.id} item={item} index={index} side="left" />
      ))}

      {/* Side Navigation - Right */}
      {!isAnyDetailActive && rightItems.map((item, index) => (
        <DiamondNav key={item.id} item={item} index={index} side="right" />
      ))}

      {/* Orchestrates Center Text Scrambling & Crossfades */}
      <HeroCenterText />

      {/* Project List View (Active when 'View All' is clicked in Work) */}
      <WorkProjectsList />

      {/* About Profile Card (Active when 'Learn More' is clicked in About) */}
      <AboutDetailCard />

      {/* Services Detail Card (Active when 'View Services' is clicked in Services) */}
      <ServicesDetailCard />



      {/* Bottom Center */}
      <div data-cursor="expand" className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-center font-mono text-[11px] tracking-widest leading-loose text-white/50 lowercase p-2 z-50 transition-opacity duration-500 ${isAnyDetailActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="capitalize">Available For</span>
        <span className="text-white uppercase tracking-[0.3em] mt-1 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[1px] after:bg-white/20 hover:after:bg-white transition-colors duration-300 cursor-pointer">
          Freelance
        </span>
      </div>
    </main>
  );
}
