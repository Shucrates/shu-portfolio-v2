'use client';

import { useState } from 'react';
import { usePortfolioStore, PageId } from '@/store/usePortfolioStore';
import { motion } from 'framer-motion';

export default function DiamondNav({ item, index, side }: { item: any, index: number, side: string }) {
  const activePage = usePortfolioStore((state) => state.activePage);
  const setActivePage = usePortfolioStore((state) => state.setActivePage);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = activePage === item.page;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isActive) {
      setActivePage('home'); // Toggle back home
    } else {
      setActivePage(item.page as PageId);
    }
  };

  // Distribution mathematically mirroring old layout
  const topPos = `${25 + index * 25}%`;

  return (
    <a
      data-cursor="expand"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={`#${item.label.toLowerCase()}`}
      className={`absolute ${side === 'left' ? 'left-8' : 'right-8'} w-24 flex flex-col items-center gap-4 group -translate-y-1/2 cursor-pointer z-40 transition-transform duration-300 p-2`}
      style={{ top: topPos }}
    >
      <motion.div
        animate={{ 
          scale: isActive ? 1.15 : 1, 
          backgroundColor: (isActive || isHovered) ? '#fff' : 'rgba(255,255,255,0)',
          borderColor: (isActive || isHovered) ? '#fff' : 'rgba(255,255,255,0.5)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative flex items-center justify-center w-7 h-7 border rotate-45"
      >
        <motion.span 
          animate={{ color: (isActive || isHovered) ? '#000' : '#fff' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`absolute -rotate-[45deg] font-mono text-[10px] leading-none mb-[1px] ml-[1px] ${isActive ? 'font-bold' : ''}`}
        >
          {item.id}
        </motion.span>
      </motion.div>
      <span className={`font-mono text-[10px] tracking-widest transition-opacity duration-300 ${isActive ? 'opacity-100 font-bold text-white' : 'opacity-50 group-hover:opacity-100'}`}>
        {item.label}
      </span>
    </a>
  );
}
