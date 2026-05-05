'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const SERVICES_DATA = [
  {
    id: '01',
    title: 'Web Development',
    description: 'Bringing designs to life with clean, scalable code. I build performant digital experiences using modern frameworks and cutting-edge web technologies.',
    tags: ['React / Next.js', 'E-Commerce', 'Creative Coding', 'Animations', 'Performance Optimization', 'CMS Integration']
  },
  {
    id: '02',
    title: 'App Development',
    description: 'Crafting intuitive and high-performance mobile applications with scalable architecture. I build seamless user experiences using modern development frameworks and robust backend integrations.',
    tags: ['Android', 'IOS', 'Cross-Platform', 'Scalable Apps', 'Flutter/React Native', 'AI & ML']
  },
  {
    id: '03',
    title: 'AI & ML',
    description: 'Designing intelligent systems that transform data into actionable insights. I develop machine learning models and AI-driven solutions to solve real-world problems with precision and scalability.',
    tags: ['Machine Learning', 'Deep Learning', 'Data Science', 'Predictive Modeling', 'AI Solutions', 'Automation']
  },
  {
    id: '04',
    title: 'Graphic Design',
    description: 'Creating compelling visual identities and digital assets. I specialize in brand design, typography, and visual storytelling that resonates with modern audiences across all digital touchpoints.',
    tags: ['Branding', 'Typography', 'Poster Design', 'UI/UX', 'Social Media', 'Motion Graphics']
  }
];

export default function ServicesDetailCard() {
  const isServicesDetail = usePortfolioStore((state) => state.isServicesDetail);
  const setIsServicesDetail = usePortfolioStore((state) => state.setIsServicesDetail);
  const activePage = usePortfolioStore((state) => state.activePage);
  const setActivePage = usePortfolioStore((state) => state.setActivePage);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    if (isServicesDetail && activePage === 'services') {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  }, [isServicesDetail, activePage]);

  if (activePage !== 'services') return null;

  const currentDisplayIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const currentService = SERVICES_DATA[currentDisplayIndex];

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-8 bg-black/85 backdrop-blur-md ${isServicesDetail ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity: 0 }}
    >
      {/* CONDENSED EXPLORER CONTAINER */}
      <div className="relative w-full max-w-[850px] h-full sm:h-[580px] bg-[#0a0a0a] border-x-0 sm:border border-white/20 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-white/90">
        
        {/* TITLE BAR - Minimal */}
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-5 shrink-0 select-none">
           <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 border border-white/20 flex items-center justify-center text-[8px] font-bold">SV</div>
              <span className="text-[10px] tracking-[0.4em] uppercase opacity-40">Services_Explorer.sys</span>
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => setIsServicesDetail(false)}
                className="w-8 h-6 border border-white/10 hover:bg-red-500/80 flex items-center justify-center text-[10px] transition-colors"
              >
                ✕
              </button>
           </div>
        </div>

        {/* ADDRESS BAR */}
        <div className="h-10 border-b border-white/10 flex items-center px-5 gap-5 shrink-0 bg-white/[0.01]">
           <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">Path:</span>
           <div className="flex-1 h-6 bg-black/40 border border-white/5 flex items-center px-4 text-[9px] font-mono tracking-widest text-white/30 truncate">
              C:\SYS\SERVICES\{currentService.title.toUpperCase().replace(/ /g, '_')}
           </div>
        </div>

        {/* MAIN EXPLORER AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
           
           {/* FOLDER ROW - Small icons */}
           <div className="py-4 sm:py-8 px-4 sm:px-12 border-b border-white/5 bg-white/[0.01] overflow-x-auto custom-scrollbar no-scrollbar">
              <div className="flex flex-row justify-start sm:justify-around items-start gap-8 sm:gap-4 min-w-max sm:min-w-0">
                 {SERVICES_DATA.map((service, idx) => (
                   <div 
                     key={service.id}
                     onMouseEnter={() => setHoveredIndex(idx)}
                     onMouseLeave={() => setHoveredIndex(null)}
                     onClick={() => setSelectedIndex(idx)}
                     data-cursor="expand"
                     className={`flex flex-col items-center gap-2 w-20 sm:w-24 cursor-pointer transition-all duration-300 ${selectedIndex === idx ? 'opacity-100 scale-110' : 'opacity-20 hover:opacity-60'}`}
                   >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                         <img 
                           src={hoveredIndex === idx || selectedIndex === idx ? "/services/folder-open-no-bg.png" : "/services/folder-close-no-bg.png"} 
                           alt="Folder"
                           className="w-full h-full object-contain transition-all"
                         />
                      </div>
                      <span className={`text-[7px] sm:text-[8px] uppercase tracking-[0.2em] font-bold text-center leading-tight transition-colors ${selectedIndex === idx ? 'text-white' : 'text-white/30'}`}>
                         {service.title}
                      </span>
                   </div>
                 ))}
              </div>
           </div>

           {/* CONTENT AREA - HUD Terminal Style */}
           <div className="flex-1 px-6 sm:px-12 overflow-y-auto custom-scrollbar flex flex-col items-center">
              <div className="max-w-2xl w-full my-auto space-y-6 sm:space-y-8 fade-in py-8 sm:py-12" key={currentDisplayIndex}>
                 <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4">
                       <div className="h-[0.5px] w-8 bg-white/10" />
                       <span className="text-[9px] tracking-[0.6em] text-white/20 uppercase">TARGET_MODULE_{currentService.id}</span>
                       <div className="h-[0.5px] w-8 bg-white/10" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-tighter italic leading-none text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] text-center">
                       {currentService.title}
                    </h3>
                 </div>

                 <div className="relative group mx-auto max-w-[500px]">
                    {/* FIXED CORNER ACCENTS - OUTSIDE SCROLL */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white/30 pointer-events-none z-10" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-white/30 pointer-events-none z-10" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-white/30 pointer-events-none z-10" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-white/30 pointer-events-none z-10" />

                    <div className="relative border border-white/5 bg-white/[0.01] max-h-[160px] sm:max-h-none overflow-y-auto sm:overflow-visible custom-scrollbar p-5 sm:p-6">
                        <p className="font-mono text-[9px] sm:text-[10px] text-white/70 leading-relaxed uppercase tracking-[0.25em] text-center max-w-[440px] mx-auto drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">
                           {currentService.description}
                        </p>
                    </div>
                 </div>

                 <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {currentService.tags.map((tag) => (
                      <span key={tag} className="px-2 sm:px-3 py-1 border border-white/5 bg-white/[0.01] text-[7px] sm:text-[8px] tracking-[0.4em] uppercase text-white/30 hover:text-green-400 hover:border-green-500/30 transition-all cursor-default">
                         {tag}
                      </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* STATUS BAR */}
        <div className="h-8 bg-white/5 border-t border-white/10 flex items-center justify-between px-5 shrink-0 text-[7px] uppercase tracking-[0.5em] text-white/15">
           <div className="flex items-center gap-4 sm:gap-8">
              <span>{SERVICES_DATA.length} OBJECTS</span>
              <span className="hidden sm:inline w-[1px] h-3 bg-white/10" />
              <span className="hidden sm:inline">{hoveredIndex !== null ? 'TARGET_LOCKED' : 'SYSTEM_IDLE'}</span>
           </div>
           <div className="flex items-center gap-4 sm:gap-6">
              <button 
                onClick={() => {
                  setIsServicesDetail(false);
                  setActivePage('contact');
                }}
                className="hover:text-green-400 transition-colors cursor-pointer tracking-[0.6em] font-bold"
              >
                [ ENQUIRY ]
              </button>
              <span className="w-[1px] h-3 bg-white/10" />
              <div className="w-2 h-2 rounded-full border border-white/20 bg-green-500/20 shadow-[0_0_8px_rgba(34,197,94,0.2)] animate-pulse" />
           </div>
        </div>

      </div>
    </div>
  );
}
