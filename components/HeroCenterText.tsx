'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { usePortfolioStore, PageId } from '@/store/usePortfolioStore';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#";

const PAGE_CONTENT: Record<string, { title: string, subtitle: string, button?: string }> = {
  home: {
    title: "SHUISBORED",
    subtitle: "DESIGNER & DEVELOPER CRAFTING CLEAN, MODERN DIGITAL EXPERIENCES"
  },
  work: {
    title: "WORK",
    subtitle: "STUFF I HAVE BUILT/DESIGNED FOR\nCLIENTS AND MYSELF",
    button: "VIEW ALL"
  },
  about: {
    title: "ABOUT",
    subtitle: "A LITTLE BIT OF BACKGROUND AND HISTORY"
  },
  services: {
    title: "SERVICES",
    subtitle: "WHAT I BRING TO THE TABLE"
  },
  archive: {
    title: "ARCHIVE",
    subtitle: "COLLECTION OF PAST EXPLORATIONS"
  },
  awards: {
    title: "AWARDS",
    subtitle: "RECOGNITION AND FEATURES"
  },
  contact: {
    title: "CONTACT",
    subtitle: "LET'S BUILD SOMETHING TOGETHER"
  }
};

export default function HeroCenterText() {
  const activePage = usePortfolioStore((state) => state.activePage);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const prevPageRef = useRef(activePage);

  const scrambleHover = () => {
    if (!titleRef.current) return;
    // For Home, scramble to real name. For others, scramble back to the same word.
    const hoverText = activePage === 'home' ? 'SHUBHAM PATIL' : PAGE_CONTENT[activePage].title;
    scrambleElement(titleRef.current, hoverText, 0.4);
  };

  const scrambleLeave = () => {
    if (!titleRef.current) return;
    scrambleElement(titleRef.current, PAGE_CONTENT[activePage].title, 0.4);
  };

  const scrambleElement = (el: HTMLElement, targetText: string, duration: number) => {
    gsap.killTweensOf(el);
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 1,
      duration,
      ease: "power2.out", 
      onUpdate: () => {
        const progress = obj.value;
        let result = "";
        for (let i = 0; i < targetText.length; i++) {
          if (progress >= (i / targetText.length)) {
            result += targetText[i];
          } else {
             result += targetText[i] === ' ' ? ' ' : targetText[i] === '\n' ? '\n' : chars[Math.floor(Math.random() * chars.length)];
          }
        }
        el.innerText = result;
      }
    });
  };

  useEffect(() => {
    const prev = prevPageRef.current;
    if (prev === activePage) return;
    prevPageRef.current = activePage;

    const content = PAGE_CONTENT[activePage];
    if (!content) return;

    // Scramble logic
    if (titleRef.current) scrambleElement(titleRef.current, content.title, 0.6);
    if (subtitleRef.current) scrambleElement(subtitleRef.current, content.subtitle, 0.8);
    
    // Button orchestration
    if (content.button) {
      gsap.fromTo(buttonRef.current, 
         { opacity: 0, y: 15, display: 'block' }, 
         { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to(buttonRef.current, { opacity: 0, y: 15, duration: 0.3, ease: "power2.inOut", onComplete: () => {
        if (buttonRef.current) buttonRef.current.style.display = 'none';
      }});
    }
    
  }, [activePage]);

  return (
    <div ref={containerRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-full px-4 mix-blend-lighten select-none z-30 pointer-events-auto">
      
      <h1 
        data-cursor="expand" 
        className="font-display text-6xl sm:text-7xl md:text-8xl uppercase leading-[0.85] tracking-tight mb-4 mr-[-1rem] cursor-default whitespace-pre-line"
        onMouseEnter={scrambleHover}
        onMouseLeave={scrambleLeave}
      >
        <span ref={titleRef}>{PAGE_CONTENT[activePage].title}</span>
        <span className="text-5xl sm:text-6xl md:text-7xl align-top text-white/90">*</span>
      </h1>
      
      {/* Wrap subtitle and button in a strict layout footprint to prevent the H1 title from shifting during flex-centering when line breaks or buttons dynamically appear */}
      <div className="w-full flex flex-col items-center justify-start min-h-[160px]">
        <p ref={subtitleRef} className="font-mono text-[8.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-[#a3a3a3] text-center max-w-[500px] mt-2 mb-8 leading-loose uppercase whitespace-pre-line">
          {PAGE_CONTENT[activePage].subtitle}
        </p>

        <button 
          ref={buttonRef}
          data-cursor="expand" 
          style={{ display: activePage === 'work' ? 'block' : 'none', opacity: activePage === 'work' ? 1 : 0 }}
          className="relative px-8 py-3.5 font-mono text-[11px] tracking-widest text-[#a3a3a3] hover:text-white uppercase transition-colors"
        >
          <span className="absolute top-0 left-0 w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-white/50" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-white/50" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b-[1.5px] border-l-[1.5px] border-white/50" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-white/50" />
          {PAGE_CONTENT[activePage].button || 'VIEW ALL'}
        </button>
      </div>

    </div>
  );
}
