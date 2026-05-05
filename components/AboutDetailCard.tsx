'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function AboutDetailCard() {
  const isAboutDetail = usePortfolioStore((state) => state.isAboutDetail);
  const setIsAboutDetail = usePortfolioStore((state) => state.setIsAboutDetail);
  const activePage = usePortfolioStore((state) => state.activePage);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAboutDetail && activePage === 'about') {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.8, y: 100 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'expo.out' }
      );
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 100,
        duration: 0.8,
        ease: 'expo.inOut'
      });
    }
  }, [isAboutDetail, activePage]);

  if (activePage !== 'about') return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black ${isAboutDetail ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity: 0 }}
    >
      {/* THE CARD CONTAINER */}
      <div className="relative w-full max-w-[650px] max-h-[90vh] overflow-y-auto custom-scrollbar bg-[#0a0a0a] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.05)] flex flex-col">
        
        {/* VHS SCANLINE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] noise-bg z-50" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-50" 
             style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }} />

        {/* HEADER SECTION */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 font-mono text-[9px] tracking-[0.2em] text-white/60">
           <div className="flex items-center gap-4">
              <span>{'>'}SHU_PROFILE_V2.0</span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
           </div>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <span>SIGNAL: OPTIMAL</span>
                 <div className="flex gap-0.5">
                    <div className="w-1 h-2 bg-white" />
                    <div className="w-1 h-2 bg-white" />
                    <div className="w-1 h-2 bg-white" />
                    <div className="w-1 h-2 bg-white/20" />
                 </div>
              </div>
              <div className="flex items-center gap-2 border border-white/20 px-1 py-0.5">
                 <div className="w-3 h-1.5 bg-green-500" />
                 <span>BATTERY: 88%</span>
              </div>
           </div>
        </div>

        {/* LOGO & ACCESS BAR */}
        <div className="flex items-center justify-between px-6 py-8 border-b border-white/5">
           <div className="flex flex-col">
              <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.4em] mb-1">CRAFTING DIGITAL REALITIES</span>
              <h2 className="font-display text-4xl tracking-tighter text-white uppercase italic">SHUISBORED</h2>
           </div>
           <div className="flex flex-col items-end">
              <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.4em] mb-1">SYSTEM_ACCESS</span>
              <span className="font-mono text-xs text-white/80 tracking-widest uppercase">******_GRANTED</span>
           </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="flex flex-col md:flex-row border-b border-white/5">
           
           {/* LEFT: IMAGE & GLITCH STATS */}
           <div className="w-full md:w-[45%] border-r border-white/5 relative aspect-square md:aspect-auto overflow-hidden">
              <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                 {/* This should be replaced with a real profile image */}
                 <div className="w-full h-full grayscale contrast-150 brightness-75 bg-[url('/work/shubham-missing-poster-2.png')] bg-cover bg-center" />
                 
                 {/* GLITCH OVERLAYS */}
                 <div className="absolute inset-0 bg-black/40 mix-blend-overlay pointer-events-none" />
                 <div className="absolute top-4 left-4 font-mono text-[7px] text-white/40 uppercase space-y-1">
                    <div>POS: 19.0752° N</div>
                    <div>LON: 72.8777° E</div>
                    <div className="text-green-500/60">STATUS: ACTIVE</div>
                 </div>
              </div>
              <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
           </div>

           {/* RIGHT: ATTRIBUTES & SKILLS */}
           <div className="w-full md:w-[55%] p-8 flex flex-col justify-center bg-white/[0.01]">
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-[0.5em] mb-8 flex items-center gap-3">
                 <span className="w-8 h-[1px] bg-white/10" />
                 CORE_ATTRIBUTES
              </div>
              
              <div className="space-y-6">
                 <AttributeBar label="DESIGN" value={8} />
                 <AttributeBar label="DEVELOPMENT" value={9} />
                 <AttributeBar label="MOTION_GSAP" value={7} />
                 <AttributeBar label="UI_SYSTEMS" value={8} />
                 <AttributeBar label="COFFEE_LEVEL" value={10} />
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">RANK</span>
                    <div className="font-mono text-[10px] text-white/80 uppercase tracking-widest">SR_ARCHITECT</div>
                 </div>
                 <div className="space-y-1">
                    <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">SECTOR</span>
                    <div className="font-mono text-[10px] text-white/80 uppercase tracking-widest">VISUAL_EXP</div>
                 </div>
              </div>
           </div>
        </div>

        {/* BIO & EXPERIENCE SECTION */}
        <div className="p-8 space-y-10">
           <div className="space-y-4">
              <div className="font-mono text-[10px] text-white/40 uppercase tracking-[0.5em] flex items-center gap-3">
                 <span className="w-8 h-[1px] bg-white/10" />
                 SYSTEM_BIO:
              </div>
              <p className="font-mono text-[11px] text-white/70 leading-relaxed uppercase tracking-wider max-w-[700px]">
                 Multidisciplinary designer and developer with a focus on high-fidelity digital experiences. 
                 Specializing in the intersection of technical architecture and visual storytelling. 
                 Building products that balance raw performance with cyber-brutalist aesthetics.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-4">
                 <div className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">EXPERIENCE_HISTORY:</div>
                 <div className="space-y-3 font-mono text-[10px] uppercase">
                    <div className="flex justify-between text-white/80">
                       <span>FREELANCE @ SHUISBORED</span>
                       <span className="text-white/40">2020-PRESENT</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                       <span>UI/UX @ SEAGUARD</span>
                       <span className="text-white/40">2022-2023</span>
                    </div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">INTERESTS_CORE:</div>
                 <div className="flex flex-wrap gap-2">
                    {['CYBER_BRUTALISM', 'VHS_AESTHETICS', 'GLITCH_ART', 'LO-FI_TECH'].map(tag => (
                       <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 font-mono text-[8px] text-white/60 tracking-widest">
                          {tag}
                       </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="px-6 py-6 border-t border-white/10 flex items-center justify-between">
           <div className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">
              © 2026 // SHU_WORKSPACE // ALL_RIGHTS_RESERVED
           </div>
           <button 
             onClick={() => setIsAboutDetail(false)}
             data-cursor="expand"
             className="group flex items-center gap-3 py-2 px-6 border border-white/20 hover:border-white/60 transition-colors bg-white/5"
           >
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/60 group-hover:text-white uppercase transition-colors">
                 [ CLOSE_TERMINAL ]
              </span>
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]" />
           </button>
        </div>
      </div>
    </div>
  );
}

function AttributeBar({ label, value }: { label: string, value: number }) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between font-mono text-[9px] tracking-widest uppercase">
            <span className="text-white/50">{label}</span>
            <span className="text-white/80">{value * 10}%</span>
         </div>
         <div className="flex gap-1 h-3">
            {[...Array(12)].map((_, i) => (
               <div 
                  key={i} 
                  className={`flex-1 transition-colors duration-500 ${i < value ? 'bg-white/80' : 'bg-white/5'}`} 
               />
            ))}
         </div>
      </div>
   );
}
