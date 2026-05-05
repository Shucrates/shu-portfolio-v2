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
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.4,
        ease: 'power2.inOut'
      });
    }
  }, [isAboutDetail, activePage]);

  if (activePage !== 'about') return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md ${isAboutDetail ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity: 0 }}
    >
      {/* Y2K EXPLORER CONTAINER */}
      <div className="relative w-full max-w-[850px] h-full sm:h-[650px] bg-[#0a0a0a] border border-white/20 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden font-mono text-white/90">
        
        {/* TITLE BAR */}
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-5 shrink-0 select-none">
           <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 border border-white/20 flex items-center justify-center text-[8px] font-bold">PR</div>
              <span className="text-[10px] tracking-[0.4em] uppercase opacity-40">Profile_Dossier.sys</span>
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => setIsAboutDetail(false)}
                className="w-8 h-6 border border-white/10 hover:bg-red-500/80 flex items-center justify-center text-[10px] transition-colors"
              >
                ✕
              </button>
           </div>
        </div>

        {/* ADDRESS BAR */}
        <div className="h-10 border-b border-white/10 flex items-center px-5 gap-5 shrink-0 bg-white/[0.01]">
           <span className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">Location:</span>
           <div className="flex-1 h-6 bg-black/40 border border-white/5 flex items-center px-4 text-[9px] font-mono tracking-widest text-white/30 truncate">
              C:\SYS\USER\SHUBHAM_PATIL
           </div>
        </div>

        {/* MAIN CONTENT SCROLL AREA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           
           {/* PROFILE IDENTIFICATION SECTION */}
           <div className="p-4 sm:p-8 border-b border-white/5 flex flex-col md:flex-row gap-6 md:gap-12">
              
              {/* PORTRAIT - Video version */}
              <div className="w-full md:w-[260px] aspect-[3/4] border border-white/10 relative overflow-hidden group bg-black shrink-0">
                 <video 
                   autoPlay 
                   loop 
                   muted 
                   playsInline 
                   className="absolute inset-0 w-full h-full object-cover contrast-125 opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                 >
                   <source src="/about/shubham-photo-vhs.mp4" type="video/mp4" />
                 </video>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                 <div className="absolute inset-0 border-[10px] border-black/20 pointer-events-none" />
                 <div className="absolute bottom-3 left-3 text-[8px] text-white/40 tracking-[0.3em] font-bold">SUB_ID: 24-10-2162</div>
              </div>

              {/* CORE STATS */}
              <div className="flex-1 space-y-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-8">
                    <StatItem label="1.2 / NAME" value="SHUBHAM NILESH PATIL" highlight />
                    <StatItem label="ARCHIVE#" value="LPR-ECC-D-HFXD0162" />
                    <StatItem label="3 DOB /" value="24-10-2004" />
                    <StatItem label="4 IN.SPEC /" value="HUMAN_ARCHITECT [WEB • UI/UX • AI SYSTEMS]" />
                    <StatItem label="5 BIO GEN /" value="MALE" />
                    <StatItem label="7 STATUS /" value="ACTIVE [BUILDING]" highlightColor="text-green-500" />
                    <StatItem label="6 EYES /" value="BLACK" />
                    <StatItem label="8 TITLE /" value="WEB & APP DEVELOPER • UI/UX DESIGNER • AI CREATOR" />
                 </div>

                 {/* CORE_ATTRIBUTES // SKILLS */}
                 <div className="pt-8 border-t border-white/5 space-y-4">
                    <div className="text-[9px] text-white/30 tracking-[0.5em] text-center mb-6">CORE_ATTRIBUTES // SKILLS</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                       <AttributeBar label="WEB_DEV" value={90} />
                       <AttributeBar label="APP_DEV" value={85} />
                       <AttributeBar label="UI_UX" value={85} />
                       <AttributeBar label="GRAPHIC_DESIGN" value={80} />
                       <AttributeBar label="AI/ML" value={75} />
                    </div>
                 </div>
              </div>
           </div>

           {/* BIOGRAPHY MODULE */}
           <div className="p-4 sm:p-8 border-b border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                 <h3 className="text-[10px] tracking-[0.5em] text-white uppercase font-bold">BIOGRAPHY /</h3>
                 <div className="flex-1 h-[1px] bg-white/10" />
              </div>
              <div className="space-y-6">
                 <p className="text-[11px] text-white/60 leading-relaxed uppercase tracking-widest max-w-[750px] text-justify">
                    Shubham Nilesh Patil operates at the convergence of web development, application design, and intelligent systems. With a strong foundation in building responsive web platforms and modern application interfaces, his work emphasizes both performance and user-centric design.
                 </p>
                 <p className="text-[11px] text-white/60 leading-relaxed uppercase tracking-widest max-w-[750px] text-justify">
                    He specializes in crafting intuitive UI/UX systems, translating ideas into clean, scalable digital products while maintaining a sharp eye for visual design and branding. From designing interfaces in Figma to developing full-stack web experiences, his workflow bridges creativity with technical precision.
                 </p>
                 <p className="text-[11px] text-white/60 leading-relaxed uppercase tracking-widest max-w-[750px] text-justify">
                    Alongside design and development, he is actively exploring artificial intelligence and machine learning, integrating intelligent features into real-world applications. His projects reflect a blend of structured engineering and visual storytelling, ranging from modern web platforms to AI-driven problem-solving systems.
                 </p>
                 <p className="text-[11px] text-white/60 leading-relaxed uppercase tracking-widest max-w-[750px] text-justify pb-8">
                    Currently balancing academics, practical experience, and continuous upskilling, he is focused on expanding his expertise across web technologies, product design, and AI — with the goal of building impactful, globally relevant digital products.
                 </p>
              </div>
           </div>
        </div>

        {/* STATUS BAR */}
        <div className="h-8 bg-white/5 border-t border-white/10 flex items-center justify-between px-5 shrink-0 text-[7px] uppercase tracking-[0.5em] text-white/15">
           <div className="flex items-center gap-8">
              <span>SYSTEM_USER_01</span>
              <span className="w-[1px] h-3 bg-white/10" />
              <span>ACCESS_GRANTED</span>
           </div>
           <div className="flex items-center gap-4">
              <span>ENCRYPTED_DOSSIER</span>
              <div className="w-2 h-2 rounded-full border border-white/20 bg-green-500/20 shadow-[0_0_8px_rgba(34,197,94,0.2)] animate-pulse" />
           </div>
        </div>

      </div>
    </div>
  );
}

function StatItem({ label, value, highlight, highlightColor = "text-white" }: { label: string, value: string, highlight?: boolean, highlightColor?: string }) {
   return (
      <div className="space-y-1.5">
         <div className="text-[8px] text-white/30 tracking-widest uppercase">{label}</div>
         <div className={`text-[10px] tracking-[0.15em] uppercase font-bold leading-tight ${highlight ? highlightColor : 'text-white/80'}`}>
            {value}
         </div>
      </div>
   );
}

function AttributeBar({ label, value }: { label: string, value: number }) {
   return (
      <div className="space-y-2">
         <div className="flex justify-between text-[8px] tracking-[0.2em] uppercase">
            <span className="text-white/40">{label}</span>
            <span className="text-white/60">{value}%</span>
         </div>
         <div className="flex gap-0.5 h-1.5">
            {[...Array(20)].map((_, i) => (
               <div 
                  key={i} 
                  className={`flex-1 transition-all duration-700 ${i < (value / 100 * 20) ? 'bg-white/70 shadow-[0_0_5px_rgba(255,255,255,0.1)]' : 'bg-white/5'}`} 
               />
            ))}
         </div>
      </div>
   );
}
