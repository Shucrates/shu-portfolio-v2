'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const PROJECTS = [
  { 
    id: '01', name: 'SU-DESIGN9.IN', type: 'WEBSITE', video: '/work/sudesign-vhs.mp4', image: '/work/sudesign9/sudesign9-hero.png', preview: 'CH_01 / ARCH_INT',
    details: { 
      overview: "A comprehensive website design and development project for Su Design 9, a premier interior design firm based in Mumbai. We developed a sleek, modern website architecture that prioritizes high-quality imagery, clear typography, and an intuitive user journey. The platform organizes diverse service offerings logically while ensuring their highly visual portfolio remains the focal point, bridging the gap between architectural concepts and final construction.",
      services: ['UI/UX Design', 'Web Development'],
      tech: ['VISUAL_PORTFOLIO', 'STRUCTURED_SERVICES', 'RESPONSIVE_ARCH', 'LEAD_GENERATION'],
      client: 'Su Design 9',
      year: '2026',
      link: 'https://su-design9.in',
      stills: [
        '/work/sudesign9/sudesign9-hero.png',
        '/work/sudesign9/sudesign9-stills-1.png',
        '/work/sudesign9/sudesign9-stills-2.png',
        '/work/sudesign9/sudesign9-stills-3.png'
      ]
    }
  },
  { 
    id: '02', name: 'II-MSC', type: 'PLATFORM', video: '/work/iiimsc-vhs.mp4', image: '/work/iimsc/ii-msc-hero.png', preview: 'CH_02 / UIUX_SYS',
    details: { 
      overview: "II-MSC approached us with a foundational challenge: they had an existing digital presence, but it was limited to a simple, single-page website that no longer reflected the scale of their operations. As a growing staffing company, they needed a platform capable of handling more complex interactions and diverse user journeys.",
      services: ['Website Design'],
      tech: ['ROLE_BASED_UI', 'DYNAMIC_INFRA', 'STAFFING_ENGINE', 'SCALABLE_UX'],
      client: 'II-MSC',
      year: '2025',
      link: 'https://www.ii-msc.com',
      stills: [
        '/work/iimsc/ii-msc-hero.png',
        '/work/iimsc/ii-msc-overview.png',
        '/work/iimsc/ii-msc-grid-left.png',
        '/work/iimsc/ii-msc-grid-right.png',
        '/work/iimsc/ii-msc-final.png'
      ]
    }
  },
  { 
    id: '03', name: 'PREPBOOK', type: 'PRODUCT', video: '/work/prepbook-vhs.mp4', image: '/work/prepbook/prepbook product mockup mobile.png', preview: 'CH_03 / PROD_DSGN',
    details: { 
      overview: "PrepbookEdu is a platform focused on helping students prepare for competitive exams like UPSC through structured content, tools, and resources. The goal of this project was to redesign an outdated website into a modern, user-friendly, and scalable platform that improves usability, engagement, and brand perception.", 
      services: ['UI/UX Design', 'Interaction Design'], 
      tech: ['USER_RESEARCH', 'IA_RESTRUCTURE', 'CARD_LAYOUTS', 'MOBILE_FIRST'],
      client: 'PrepbookEdu', 
      year: '2024', 
      link: '#', 
      stills: [
        '/work/prepbook/prepbook case 1.png',
        '/work/prepbook/prepbook case 2.png',
        '/work/prepbook/prepbook case 3.png',
        '/work/prepbook/prepbook product mockup mobile.png'
      ],
      caseStudy: [
        { title: "Problem Statement", content: "The existing website had several issues: Outdated UI that didn’t reflect a modern EdTech brand; Poor navigation structure, making it hard for users to find relevant resources; Lack of visual hierarchy and clarity in content presentation; No strong conversion flow (sign-ups, app downloads, course exploration). This resulted in reduced user engagement and a weak first impression for new users." },
        { title: "Goals", content: "Create a clean, modern, and professional interface; Improve navigation and content discoverability; Design a strong landing experience that clearly communicates value; Increase conversions (sign-ups, app installs, engagement); Ensure scalability for future Prepbook products." },
        { title: "Design Process", content: "1. Research & Analysis: Analyzed existing website pain points, reviewed competitor EdTech platforms, and identified key user needs: clarity, speed, and trust. 2. Information Architecture: Restructured navigation into clear sections: Home, Courses, Resources, About, Download App. 3. Wireframing: Created low-fidelity wireframes focusing on clear hierarchy, logical content flow, and CTA placement. 4. UI Design: Designed a modern, minimal interface using clean typography, soft color palette, and card-based layouts." },
        { title: "Challenges & Solutions", content: "Challenges included balancing information-heavy content with clean design and making the platform look credible for a diverse audience. Solutions involved using visual hierarchy to prioritize important content, introducing whitespace to reduce clutter, and designing intuitive layouts to guide users naturally." },
        { title: "Outcome & Learnings", content: "Outcome: Improved usability and navigation clarity, stronger brand identity, and better user flow for conversions. Key Learnings: Simplicity is critical in EdTech platforms; Navigation can make or break user experience; Clear CTAs significantly impact engagement; Designing for real users requires balancing aesthetics with functionality." }
      ]
    }
  },
  { 
    id: '04', name: 'TRCT.IN', type: 'WEB EXP', video: '/work/trct-vhs.mp4', image: '/work/trct/trct-hero.png', preview: 'CH_04 / WEB_EXP',
    details: { 
      overview: "We designed a high energy digital experience for a community driven run club, translating its bold identity into a visually striking and highly engaging website. The goal was to capture the club’s culture that feels fast paced, inclusive, and slightly rebellious while ensuring clarity across event discovery, community engagement, and onboarding.",
      services: ['UI/UX Design'],
      tech: ['REACT_V2', 'VITE_ENGINE', 'GSAP_MOTION', 'TAILWIND_CORE'],
      client: 'Thane Run Club Tribe',
      year: '2026',
      link: 'https://trct-in.vercel.app/',
      stills: [
        '/work/trct/trct-overview.png',
        '/work/trct/trct-grid-left.png',
        '/work/trct/trct-grid-right.png',
        '/work/trct/trct-final.png'
      ]
    }
  },
  { 
    id: '05', name: 'SEAGUARD', type: 'APP DEV', video: '/work/seaguard-vhs.mp4', image: '/work/seaguard/seaguard-hero.png', preview: 'CH_05 / VHS_FEED',
    details: { 
      overview: "We built SeaGuard as a mobile-first assistant to support fishermen with real-time safety, navigation, and operational insights in challenging marine environments. The focus was on simplifying complex data such as Potential Fishing Zones, weather updates, and boundary alerts into a clear, intuitive interface that enables quick decision-making without added cognitive load.",
      services: ['App Development'],
      tech: ['REACT_NATIVE', 'GPS_NAV', 'SOS_INT', 'LOCALIZATION'],
      client: 'Software',
      year: '2025',
      link: 'https://github.com/vinaypokharkar/SeaGuard',
      stills: [
        '/work/seaguard/seaguard-hero.png',
        '/work/seaguard/seagaurd-grid-left.png',
        '/work/seaguard/seagaurd-grid-right.png'
      ]
    }
  },
  { 
    id: '06', name: 'MISSING POSTER', type: 'GRAPHIC', video: null, image: '/work/shubham missing poster 2.png', preview: 'CH_06 / ART_PSTR',
    details: { overview: 'Digital art exploration.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
  { 
    id: '07', name: 'WHIPLASH BLACK', type: 'GRAPHIC', video: null, image: '/work/whiplash poster black 2.png', preview: 'CH_07 / ART_PSTR',
    details: { overview: 'Minimalist poster design.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
  { 
    id: '08', name: 'KANYE X LOTR', type: 'GRAPHIC', video: null, image: '/work/KANYE WEST X LOTR POSTER 2.png', preview: 'CH_08 / ART_PSTR',
    details: { overview: 'Pop culture mashup design.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2023', link: '#', stills: [] }
  },
  { 
    id: '09', name: 'BYTECAMP UTOPIA', type: 'GRAPHIC', video: null, image: '/work/bytecamp theme poster utopia 3.png', preview: 'CH_09 / ART_PSTR',
    details: { overview: 'Event branding module.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
  { 
    id: '10', name: 'VIVID TO VOID', type: 'GRAPHIC', video: null, image: '/work/vivid to void poster.png', preview: 'CH_10 / ART_PSTR',
    details: { overview: 'Abstract visual exploration.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
  { 
    id: '11', name: 'ART VS ARTIST', type: 'GRAPHIC', video: null, image: '/work/art vs artist poster 4.png', preview: 'CH_11 / ART_PSTR',
    details: { overview: 'Art vs Artist exploration.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
  { 
    id: '12', name: 'CONTROL IS ILLUSION', type: 'GRAPHIC', video: null, image: '/work/control is an illusion poster mrrobot shuisbored.png', preview: 'CH_12 / ART_PSTR',
    details: { overview: 'Mr. Robot inspired poster.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
  { 
    id: '13', name: 'EUPHORIA', type: 'GRAPHIC', video: null, image: '/work/euphoria poster 1.png', preview: 'CH_13 / ART_PSTR',
    details: { overview: 'Euphoria series aesthetic study.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
  { 
    id: '14', name: 'JOJI CAMERA', type: 'GRAPHIC', video: null, image: '/work/joji camera poster 5.png', preview: 'CH_14 / ART_PSTR',
    details: { overview: 'Joji inspired visual design.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
  { 
    id: '15', name: 'SIDHATEK', type: 'GRAPHIC', video: null, image: '/work/sidhatek poster shuisbored.png', preview: 'CH_15 / ART_PSTR',
    details: { overview: 'Cultural heritage poster design.', services: ['Graphic Design'], client: 'SELF_INITIATED', year: '2024', link: '#', stills: [] }
  },
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
                <div className="space-y-8">
                   <div className="space-y-4">
                      <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] flex items-center gap-3">
                         <span className="w-8 h-[1px] bg-white/10" />
                         PROJECT_OVERVIEW
                      </div>
                      <p className="font-mono text-sm text-white/80 leading-loose">
                         {currentProject.details?.overview}
                      </p>
                   </div>
                   <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      <div className="space-y-2">
                         <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">CLIENT</span>
                         <div className="font-mono text-[10px] text-white/80 uppercase tracking-widest">{currentProject.details?.client}</div>
                      </div>
                      <div className="space-y-2">
                         <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">SERVICES</span>
                         <div className="font-mono text-[10px] text-white/80 uppercase tracking-widest">
                            {currentProject.details?.services.join(' / ')}
                         </div>
                      </div>
                      <div className="space-y-2">
                         <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">YEAR</span>
                         <div className="font-mono text-[10px] text-white/80 uppercase tracking-widest">{currentProject.details?.year}</div>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col p-8 border border-white/5 bg-white/[0.01] h-full relative group">
                   {/* HUD CORNER ACCENTS */}
                   <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20" />
                   <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20" />

                   <div className="space-y-10">
                      <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] flex items-center gap-3">
                         <span className="w-8 h-[1px] bg-white/10" />
                         SYSTEM_HUD // TECH_SPECS
                      </div>
                      
                      <div className="space-y-6">
                         {currentProject.details?.tech ? (
                            currentProject.details.tech.map((t, i) => (
                               <HUDBar key={t} label={t} value={10 - i} />
                            ))
                         ) : (
                            <>
                               <HUDBar label="PERFORMANCE" value={9} />
                               <HUDBar label="AESTHETICS" value={8} />
                               <HUDBar label="SCALABILITY" value={9} />
                            </>
                         )}
                      </div>

                      <div className="pt-8 border-t border-white/5 space-y-4">
                         <div className="flex justify-between font-mono text-[8px] text-white/20 uppercase tracking-widest">
                            <span>RECOVERY_MODE: ACTIVE</span>
                            <span>BITRATE: 48000 HZ</span>
                         </div>
                         <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
                            <div className="absolute inset-0 bg-green-500/40 w-1/3 animate-[scan_2s_linear_infinite]" />
                         </div>
                      </div>
                   </div>
                   
                   {currentProject.details?.link && currentProject.details?.link !== '#' && (
                      <a 
                       href={currentProject.details.link}
                       target="_blank"
                       rel="noopener noreferrer"
                       data-cursor="expand"
                       className="inline-flex items-center gap-4 font-mono text-[10px] tracking-[0.4em] uppercase text-white hover:text-green-500 transition-colors mt-12 relative z-10"
                      >
                         [ DEPLOYMENT_LINK ] <span className="text-lg">→</span>
                      </a>
                   )}
                </div>
             </div>

              {/* ADDITIONAL CASE STUDY SECTIONS (If available) */}
              {currentProject.details?.caseStudy && (
                <div className="w-full max-w-4xl mx-auto mb-32 text-left grid grid-cols-1 md:grid-cols-2 gap-16">
                  {currentProject.details.caseStudy.map((section: any, idx: number) => (
                    <div key={idx} className="space-y-6">
                      <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-white/10" />
                        {section.title.replace(/ /g, '_').toUpperCase()}
                      </div>
                      <p className="font-mono text-xs text-white/70 leading-loose text-justify whitespace-pre-wrap">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* PROJECT STILLS GALLERY */}
              {currentProject.details?.stills && currentProject.details.stills.length > 0 && (
                <div className="flex flex-col gap-12 mb-40">
                   <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.6em] flex items-center justify-center gap-6">
                      <span className="w-24 h-[1px] bg-white/10" />
                      VISUAL_ASSET_GALLERY
                      <span className="w-24 h-[1px] bg-white/10" />
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {currentProject.details.stills.map((still, idx) => (
                         <div 
                            key={idx}
                            data-cursor="expand"
                            className={`group relative overflow-hidden border border-white/10 bg-zinc-900 w-full h-auto ${idx === 0 ? 'md:col-span-2' : ''}`}
                         >
                            <img 
                               src={still} 
                               alt={`${currentProject.name} Still ${idx + 1}`}
                               className="w-full h-auto object-cover transition-transform duration-1000 grayscale hover:grayscale-0 contrast-125 hover:contrast-100"
                            />
                            <div className="absolute top-4 left-4 font-mono text-[8px] text-white/40 tracking-widest uppercase bg-black/60 px-2 py-1">
                               MODULE_STILL_0{idx + 1}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
              )}

              {/* GRAPHIC POSTER LARGE DISPLAY */}
              {currentProject.type === 'GRAPHIC' && currentProject.image && (
                <div className="flex flex-col items-center gap-16 mb-40">
                   <div className="font-mono text-[10px] text-white/30 uppercase tracking-[0.6em] flex items-center justify-center gap-6">
                      <span className="w-24 h-[1px] bg-white/10" />
                      ART_ASSET_EXHIBITION
                      <span className="w-24 h-[1px] bg-white/10" />
                   </div>
                   <PosterCard src={currentProject.image} name={currentProject.name} />
                </div>
              )}
           </div>

          {/* PROJECT SURFING */}
          <div className="absolute top-[250px] inset-x-0 px-4 md:px-20 flex justify-between pointer-events-none z-[60]">
             <button 
                onClick={prevProject}
                data-cursor="expand"
                className={`${isDetailView ? 'pointer-events-auto' : 'pointer-events-none'} group flex items-center gap-3 py-2 px-4 border border-white/10 bg-black/50 backdrop-blur-md hover:border-white/40 transition-all`}
             >
                <span className="text-xl transition-transform group-hover:-translate-x-1">←</span>
                <span className="font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase group-hover:text-white transition-colors">[ PREV_MODULE ]</span>
             </button>
             <button 
                onClick={nextProject}
                data-cursor="expand"
                className={`${isDetailView ? 'pointer-events-auto' : 'pointer-events-none'} group flex items-center gap-3 py-2 px-4 border border-white/10 bg-black/50 backdrop-blur-md hover:border-white/40 transition-all`}
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
function HUDBar({ label, value }: { label: string, value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-mono text-[9px] tracking-[0.2em] uppercase">
        <span className="text-white/40">{label}</span>
        <span className="text-white/60">{value * 10}%</span>
      </div>
      <div className="flex gap-1 h-2">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`flex-1 transition-all duration-500 ${i < value ? 'bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'bg-white/5'}`} 
          />
        ))}
      </div>
    </div>
  );
}

function PosterCard({ src, name }: { src: string, name: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const rotateX = (y / height - 0.5) * -20; 
    const rotateY = (x / width - 0.5) * 20; 
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        left: x - 150,
        top: y - 150,
        opacity: 0.6,
        duration: 0.2
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)'
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.5
      });
    }
  };

  return (
    <div 
      className="relative perspective-1000 w-fit mx-auto"
      style={{ perspective: '1000px' }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-zinc-950 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden group transition-shadow duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img 
          src={src} 
          alt={name} 
          className="max-w-[600px] w-full h-auto pointer-events-none block" 
        />
        
        {/* GLOW EFFECT */}
        <div 
          ref={glowRef}
          className="absolute w-[300px] h-[300px] bg-white/20 blur-[80px] rounded-full pointer-events-none opacity-0 mix-blend-soft-light"
        />

        {/* OVERLAY CONTENT */}
        <div className="absolute inset-0 border-[15px] border-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
        
        <div className="absolute top-6 left-6 font-mono text-[8px] text-white/30 tracking-[0.4em] uppercase pointer-events-none">
          ARCHIVE_RECORD // 0{name.length}
        </div>
        
        <div className="absolute bottom-6 right-6 font-mono text-[8px] text-white/30 tracking-[0.4em] uppercase text-right pointer-events-none">
          {name}<br/>
          EXHIBIT_A
        </div>
      </div>
    </div>
  );
}
