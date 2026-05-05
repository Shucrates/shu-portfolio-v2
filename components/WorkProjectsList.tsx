'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const PROJECTS = [
  { id: '01', name: 'SU-DESIGN9.IN', type: 'WEBSITE', video: '/work/sudesign-vhs.mp4', image: null, preview: 'CH_01 / ARCH_INT' },
  { id: '02', name: 'II-MSC', type: 'PLATFORM', video: '/work/iiimsc-vhs.mp4', image: null, preview: 'CH_02 / UIUX_SYS' },
  { id: '03', name: 'PREPBOOK', type: 'PRODUCT', video: '/work/prepbook-vhs.mp4', image: null, preview: 'CH_03 / PROD_DSGN' },
  { id: '04', name: 'TRCT', type: 'WEB EXP', video: '/work/trct-vhs.mp4', image: null, preview: 'CH_04 / WEB_EXP' },
  { id: '05', name: 'SEAGUARD', type: 'DASHBOARD', video: '/work/seaguard-vhs.mp4', image: null, preview: 'CH_05 / VHS_FEED' },
  { id: '06', name: 'MISSING POSTER', type: 'GRAPHIC', video: null, image: '/work/shubham missing poster 2.png', preview: 'CH_06 / ART_PSTR' },
  { id: '07', name: 'WHIPLASH BLACK', type: 'GRAPHIC', video: null, image: '/work/whiplash poster black 2.png', preview: 'CH_07 / ART_PSTR' },
  { id: '08', name: 'KANYE X LOTR', type: 'GRAPHIC', video: null, image: '/work/KANYE WEST X LOTR POSTER 2.png', preview: 'CH_08 / ART_PSTR' },
  { id: '09', name: 'BYTECAMP UTOPIA', type: 'GRAPHIC', video: null, image: '/work/bytecamp theme poster utopia 3.png', preview: 'CH_09 / ART_PSTR' },
  { id: '10', name: 'VIVID TO VOID', type: 'GRAPHIC', video: null, image: '/work/vivid to void poster.png', preview: 'CH_10 / ART_PSTR' },
];

const WEBSITE_PROJECTS = PROJECTS.filter(p => p.type !== 'GRAPHIC');
const POSTER_PROJECTS = PROJECTS.filter(p => p.type === 'GRAPHIC');

export default function WorkProjectsList() {
  const isWorkDetail = usePortfolioStore((state) => state.isWorkDetail);
  const activePage = usePortfolioStore((state) => state.activePage);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);

  const currentProject = PROJECTS[currentIndex];

  useEffect(() => {
    if (isWorkDetail && activePage === 'work') {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, scale: 0.9, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'expo.out', delay: 1.2 }
      );
    } else {
      gsap.to(containerRef.current, { 
        opacity: 0, 
        scale: 0.9,
        y: 50, 
        duration: 0.8, 
        ease: 'expo.inOut' 
      });
      // Close detail view when exiting work page
      setTimeout(() => setIsDetailView(false), 800);
    }
  }, [isWorkDetail, activePage]);

  const changeChannel = (index: number) => {
    if (currentIndex === index) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsChanging(false);
    }, 250);
  };

  const nextProject = () => changeChannel((currentIndex + 1) % PROJECTS.length);
  const prevProject = () => changeChannel((currentIndex - 1 + PROJECTS.length) % PROJECTS.length);

  if (activePage !== 'work') return null;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-40 bg-black/95 backdrop-blur-2xl overflow-hidden ${isWorkDetail ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity: 0 }}
    >
      {/* 
         LIST VIEW 
      */}
      <div className={`absolute inset-0 flex flex-col md:flex-row transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${isDetailView ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        {/* LEFT SIDE: SCROLLABLE PROJECT LIST */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto custom-scrollbar pt-12 pb-64 px-6 sm:px-16 flex flex-col items-start">
          <div className="w-full max-w-[600px]">
            {/* NON-STICKY RETURN BUTTON */}
            <button 
              onClick={() => usePortfolioStore.getState().setIsWorkDetail(false)}
              data-cursor="expand"
              className="group flex items-center gap-3 py-2 px-4 border border-white/10 bg-white/5 hover:border-white/40 transition-colors mb-16 pointer-events-auto"
            >
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase group-hover:text-white transition-colors">
                [ RETURN_TO_ROOT ]
              </span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            </button>

            <div className="font-mono text-[10px] text-white/20 mb-12 flex items-center justify-between border-b border-white/10 pb-2">
               <span>DIRECTORY: \\ROOT\\WORKSPACE\\PROJECTS</span>
               <span className="animate-pulse">_</span>
            </div>
            
            {/* WEBSITES SECTION */}
            <section className="mb-16 w-full">
              <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/30 mb-6 flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-white/10"></span>
                 SECTION_01 // WEBSITES & UI
              </div>
              <div className="flex flex-col gap-1 w-full">
                {WEBSITE_PROJECTS.map((p) => (
                  <TerminalItem key={p.id} project={p} isActive={currentProject.id === p.id} onHover={() => changeChannel(PROJECTS.indexOf(p))} />
                ))}
              </div>
            </section>

            {/* POSTERS SECTION */}
            <section className="mb-16 w-full">
              <div className="font-mono text-[9px] tracking-[0.4em] uppercase text-white/30 mb-6 flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-white/10"></span>
                 SECTION_02 // GRAPHIC DESIGN
              </div>
              <div className="flex flex-col gap-1 w-full">
                {POSTER_PROJECTS.map((p) => (
                  <TerminalItem key={p.id} project={p} isActive={currentProject.id === p.id} onHover={() => changeChannel(PROJECTS.indexOf(p))} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT SIDE: PROJECT INFO */}
        <div className="hidden md:flex w-1/2 h-full relative overflow-hidden">
          <div className="absolute top-32 right-12 left-12 flex flex-col items-end pointer-events-none">
            <div className={`w-full max-w-[450px] text-right transition-all duration-500 pointer-events-auto ${isChanging ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
              <h2 className="font-display text-4xl mb-4 tracking-tighter uppercase leading-none">{currentProject.name}</h2>
              <div className="font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase mb-6 flex items-center justify-end gap-3">
                 <span className="w-4 h-[1px] bg-white/20"></span>
                 {currentProject.type} // MODULE_{currentProject.id}
              </div>
              <p className="font-mono text-xs text-white/60 leading-relaxed mb-8 max-w-[380px] ml-auto">
                 Executing background analysis for {currentProject.name}. Protocol initiated to display high-fidelity project data. 
                 This module explores the intersection of design and functional aesthetics.
              </p>
                <button 
                  onClick={() => setIsDetailView(true)}
                  data-cursor="expand"
                  className="group relative px-6 py-2 overflow-hidden border border-white/10 hover:border-white/40 transition-colors pointer-events-auto inline-block"
                >
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                  <span className="relative font-mono text-[10px] tracking-widest uppercase group-hover:text-black transition-colors pointer-events-none">View_Detailed_Data_Case</span>
                </button>
            </div>
          </div>
          
          {/* THE MONITOR (Shared Component-like structure) */}
          <div 
            onClick={() => setIsDetailView(true)}
            data-cursor="expand"
            className="absolute bottom-4 right-4 w-[350px] h-[350px] flex items-center justify-center select-none cursor-pointer z-50 transition-transform duration-500 hover:scale-105 group/monitor pointer-events-auto"
          >
            <MonitorContent currentProject={currentProject} isChanging={isChanging} />
          </div>
        </div>
      </div>

      {/* 
         DETAIL VIEW (Overlay)
      */}
      <div className={`absolute inset-0 z-50 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-y-auto custom-scrollbar ${isDetailView ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
        <div className="w-full min-h-full flex flex-col items-center pt-20 pb-40 px-6">
           {/* BACK BUTTON */}
           <button 
            onClick={() => setIsDetailView(false)}
            data-cursor="expand"
            className="absolute top-10 left-10 group flex items-center gap-3 py-2 px-4 border border-white/10 bg-white/5 hover:border-white/40 transition-colors"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/40 uppercase group-hover:text-white transition-colors">
              [ RETURN_TO_LIST ]
            </span>
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
          </button>

          {/* MONITOR (Center Piece) */}
          <div data-cursor="expand" className="w-[450px] h-[450px] relative mb-12 flex items-center justify-center scale-110 cursor-pointer">
             <MonitorContent currentProject={currentProject} isChanging={isChanging} />
          </div>

          {/* CONTENT */}
          <div className="w-full max-w-3xl text-center">
             <h1 className="font-display text-5xl md:text-7xl mb-6 tracking-tighter uppercase leading-tight transition-all duration-700">
               {currentProject.name}
             </h1>
             <div className="font-mono text-xs tracking-[0.6em] text-white/40 uppercase mb-12 flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-white/10"></span>
                {currentProject.type} // CHANNEL_{currentProject.id}
                <span className="w-12 h-[1px] bg-white/10"></span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mb-24">
                <div className="space-y-6">
                   <p className="font-mono text-sm text-white/80 leading-loose">
                      This module represents a deep-dive into high-fidelity technical execution. 
                      The objective was to create a seamless digital interface that bridges the gap 
                      between raw data structures and human-centered interaction design.
                   </p>
                   <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
                      // TECHNICAL_SPEC_01: React.js Architecture<br/>
                      // TECHNICAL_SPEC_02: GSAP Dynamic Motion<br/>
                      // TECHNICAL_SPEC_03: VHS_FEED_RESTORATION
                   </p>
                </div>
                <div className="flex flex-col justify-between p-8 border border-white/5 bg-white/[0.02]">
                   <p className="font-mono text-xs text-white/60 leading-relaxed mb-8">
                      {currentProject.name} is a comprehensive module focusing on {currentProject.type === 'WEBSITE' ? 'interactive scalability' : 'visual impact'}. 
                      Explore the full case study to understand the design methodology and deployment protocols.
                   </p>
                   <a 
                    href="#" 
                    data-cursor="expand"
                    className="inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.4em] uppercase text-white hover:text-green-500 transition-colors"
                   >
                      [ DEPLOYMENT_LINK ] <span className="text-lg">→</span>
                   </a>
                </div>
             </div>

             {/* DUMMY CASE STUDY IMAGES */}
             <div className="flex flex-col gap-8 mb-24">
                <div data-cursor="expand" className="aspect-video w-full bg-white/5 border border-white/5 flex items-center justify-center font-mono text-white/10 text-[10px] tracking-widest cursor-pointer hover:bg-white/10 transition-colors">
                   [ HIGH_RES_MODULE_STILL_01 ]
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div data-cursor="expand" className="aspect-square bg-white/5 border border-white/5 flex items-center justify-center font-mono text-white/10 text-[10px] tracking-widest cursor-pointer hover:bg-white/10 transition-colors">
                      [ SPEC_01 ]
                   </div>
                   <div data-cursor="expand" className="aspect-square bg-white/5 border border-white/5 flex items-center justify-center font-mono text-white/10 text-[10px] tracking-widest cursor-pointer hover:bg-white/10 transition-colors">
                      [ SPEC_02 ]
                   </div>
                </div>
             </div>
          </div>

          {/* PROJECT SURFING */}
          <div className="absolute top-[250px] inset-x-0 px-4 md:px-20 flex justify-between pointer-events-none z-[60]">
             <button 
                onClick={prevProject}
                data-cursor="expand"
                className="pointer-events-auto group flex items-center gap-3 py-2 px-4 border border-white/10 bg-black/50 backdrop-blur-md hover:border-white/40 transition-all"
             >
                <span className="text-xl transition-transform group-hover:-translate-x-1">←</span>
                <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase group-hover:text-white transition-colors">[ PREV_MODULE ]</span>
             </button>
             <button 
                onClick={nextProject}
                data-cursor="expand"
                className="pointer-events-auto group flex items-center gap-3 py-2 px-4 border border-white/10 bg-black/50 backdrop-blur-md hover:border-white/40 transition-all"
             >
                <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase group-hover:text-white transition-colors">[ NEXT_MODULE ]</span>
                <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonitorContent({ currentProject, isChanging }: { currentProject: any, isChanging: boolean }) {
  return (
    <>
      {/* THE CONTENT (Behind frame) */}
      <div className="absolute w-[72%] h-[54%] flex items-center justify-center overflow-hidden z-0 translate-y-[-10%] bg-black">
        <div className={`w-full h-full relative transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
            {currentProject.video ? (
              <video key={currentProject.video} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-100">
                <source src={currentProject.video} type="video/mp4" />
              </video>
            ) : currentProject.image ? (
              <img 
                src={currentProject.image} 
                alt={currentProject.name} 
                className="w-full h-full object-cover opacity-100 transition-all duration-700 grayscale contrast-110 group-hover/monitor:grayscale-0 group-hover/monitor:contrast-100" 
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 font-mono text-white/40">
                <div className="text-[60px] font-black opacity-5 blur-sm absolute">{currentProject.id}</div>
                <div className="text-xl tracking-[0.5em] mb-4 animate-pulse text-center px-4">{currentProject.preview}</div>
                <div className="text-[7px] tracking-widest opacity-20 uppercase font-bold">Signal_Stable / 100%</div>
              </div>
            )}
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-[0.1] noise-bg" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.3]" 
               style={{ backgroundImage: 'repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }} />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,1)]" />
          <div className="absolute inset-0 pointer-events-none bg-[#282A2F]/20 mix-blend-screen" />

          <div className="absolute top-8 left-8 font-mono text-white/60 text-[9px] tracking-widest font-bold">
             <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]" />
                <span>PLAY</span>
             </div>
             <div>CH {currentProject.id}</div>
          </div>
        </div>
        <div className={`absolute inset-0 bg-white/10 pointer-events-none transition-opacity duration-150 ${isChanging ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* MONITOR FRAME (Top Layer) */}
      <div 
        className="absolute inset-0 bg-contain bg-no-repeat bg-center z-10" 
        style={{ backgroundImage: 'url("/work/vhs-screen-no-display-new.png")' }} 
      />
    </>
  );
}

function TerminalItem({ project, isActive, onHover }: { project: any, isActive: boolean, onHover: () => void }) {
  return (
    <div 
      onMouseEnter={onHover}
      data-cursor="expand"
      className={`group flex items-center py-2 px-4 cursor-pointer transition-all font-mono text-xs border-l-2 ${isActive ? 'bg-white text-black border-white' : 'text-white/30 hover:text-white/80 hover:bg-white/2 border-transparent'}`}
    >
      <span className="mr-6">{isActive ? '>' : '$'}</span>
      <span className="flex-1 tracking-[0.2em] uppercase font-bold">{project.name}</span>
      <span className={`text-[9px] opacity-60 ml-4 hidden sm:inline ${isActive ? 'text-black/90' : ''}`}>
        [ {project.type} ]
      </span>
      {isActive && <span className="ml-4 animate-pulse text-green-500">■</span>}
    </div>
  );
}

