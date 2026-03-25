import React from 'react';

export default function DiamondIcon({ number }: { number: number }) {
  return (
    <div className="relative flex items-center justify-center w-7 h-7 border border-white/50 rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300">
      <span className="absolute -rotate-[45deg] font-mono text-[10px] leading-none mb-[1px] ml-[1px]">
        {number}
      </span>
    </div>
  );
}
