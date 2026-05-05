'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function ContactDetailCard() {
  const isContactDetail = usePortfolioStore((state) => state.isContactDetail);
  const setIsContactDetail = usePortfolioStore((state) => state.setIsContactDetail);
  const activePage = usePortfolioStore((state) => state.activePage);
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(2);
  const [showInfo, setShowInfo] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const flickerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isContactDetail && activePage === 'contact') {
      setIsClosing(false);
      gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });
      
      // Reset state
      setShowInfo(false);
      setCurrentFrame(2);

      // Animate phone to center
      gsap.fromTo(phoneRef.current,
        { y: -150, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1.2, duration: 1.2, ease: 'power2.out' }
      );

      // Animate frames (Flip open)
      const obj = { frame: 2 };
      gsap.to(obj, {
        frame: 29,
        duration: 1.8,
        delay: 0.4,
        ease: 'power1.inOut',
        onUpdate: () => {
          const frame = Math.floor(obj.frame);
          setCurrentFrame(frame);
        },
        onComplete: () => {
          setShowInfo(true);
          // Add floating animation to the last frame
          if (phoneRef.current) {
            gsap.to(phoneRef.current, {
              y: -20,
              duration: 2.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
          // Flickering effect (Display interference)
          const startFlicker = () => {
            flickerRef.current = setInterval(() => {
              if (Math.random() > 0.9) {
                setCurrentFrame(21);
                setTimeout(() => setCurrentFrame(29), 50 + Math.random() * 100);
              }
            }, 500);
          };
          startFlicker();
        }
      });
    } else if (!isContactDetail) {
      gsap.to(containerRef.current, { opacity: 0, duration: 0.4 });
      // Kill all animations and flickering when closing
      if (flickerRef.current) clearInterval(flickerRef.current);
      if (phoneRef.current) {
        gsap.killTweensOf(phoneRef.current);
        gsap.set(phoneRef.current, { y: 0, rotation: 0 });
      }
      setShowInfo(false);
    }
    return () => {
      if (flickerRef.current) clearInterval(flickerRef.current);
    };
  }, [isContactDetail, activePage]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setShowInfo(false);
    if (flickerRef.current) clearInterval(flickerRef.current);

    // Stop floating animation
    if (phoneRef.current) {
      gsap.killTweensOf(phoneRef.current);
      gsap.to(phoneRef.current, { y: 0, duration: 0.5 });
    }

    // Animate frames (Flip closed)
    const obj = { frame: currentFrame };
    gsap.to(obj, {
      frame: 2,
      duration: 1.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        setCurrentFrame(Math.floor(obj.frame));
      },
      onComplete: () => {
        // Scale down and move to hero position
        gsap.to(phoneRef.current, {
          scale: 0.6, // Smaller to match hero scale
          y: -128,    // Move up to hero position
          opacity: 0.6,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                setIsContactDetail(false);
                setIsClosing(false);
              }
            });
          }
        });
      }
    });
  };

  if (activePage !== 'contact') return null;

  const framePath = currentFrame === 2 
    ? `/contact/frames/ezgif-frame-002-Photoroom.png` 
    : `/contact/frames/ezgif-frame-${currentFrame.toString().padStart(3, '0')}.png`;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[110] flex items-center justify-center bg-[#000] ${isContactDetail ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity: 0 }}
    >
        {/* CLOSE BUTTON REMOVED FROM TOP RIGHT AS PER REQUEST */}

        <div className="relative w-full h-full flex items-center justify-center">
            
            {/* THE PHONE ANIMATION - CENTERED AGAIN */}
            <div ref={phoneRef} className="relative w-[340px] h-[540px] flex items-center justify-center z-10">
                <img 
                    src={framePath} 
                    alt="Flip Phone" 
                    className="w-full h-full object-contain grayscale brightness-125 contrast-125 transition-all duration-300"
                />
            </div>

            {/* CONTACT INFO - HUD Wings Restored */}
            <div className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-1000 ${showInfo ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
               
               {/* LEFT WING - Personal */}
               <div className="absolute left-[8%] xl:left-[12%] top-1/2 -translate-y-1/2 space-y-12">
                  <ContactItem label="COMM_LINK" value="shubhamnileshpatil@gmail.com" link="mailto:shubhamnileshpatil@gmail.com" />
                  <ContactItem label="VISUAL_GRID" value="INSTAGRAM" link="https://www.instagram.com/shuisbored/" />
                  <ContactItem label="DATA_STREAM" value="LINKEDIN" link="https://www.linkedin.com/in/shubhamnileshpatil/" />
               </div>

               {/* RIGHT WING - Socials */}
               <div className="absolute right-[8%] xl:right-[12%] top-1/2 -translate-y-1/2 space-y-12">
                  <ContactItem label="CODE_HUB" value="GITHUB" link="https://github.com/Shucrates" />
                  <ContactItem label="DOSSIER" value="RESUME" link="/Shubham_Patil_CV.pdf" />
                  <ContactItem label="COORDINATES" value="MUMBAI, INDIA" />
               </div>

               {/* BOTTOM WING - Hang Up */}
               <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center">
                  <div className="flex flex-col items-center gap-4">
                     <div className="h-[1px] w-32 bg-white/10" />
                     <button 
                       onClick={handleClose}
                       data-cursor="expand"
                       className="group flex flex-col items-center gap-3"
                     >
                        <span className="text-[9px] tracking-[0.8em] text-white/20 uppercase group-hover:text-white/40 transition-colors">TERMINATE_SESSION</span>
                        <div className="relative px-12 py-4 border border-white/10 bg-white/5 hover:border-red-500/40 hover:bg-red-500/5 transition-all overflow-hidden">
                           <span className="relative z-10 text-[10px] tracking-[0.5em] text-white group-hover:text-red-400 transition-colors">
                               HANG UP
                           </span>
                           <div className="absolute inset-0 bg-red-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                     </button>
                  </div>
               </div>

            </div>

        </div>

        {/* SCANLINES OVERLAY - Subtle */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_2px] pointer-events-none opacity-20" />
    </div>
  );
}

function ContactItem({ label, value, link }: { label: string, value: string, link?: string }) {
   return (
      <div className="group space-y-3">
         <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 bg-white/40 rotate-45" />
            <span className="text-[9px] tracking-[0.6em] text-white/30 uppercase font-bold">{label}</span>
            <div className="h-[1px] flex-1 min-w-[40px] bg-white/10 group-hover:bg-white/30 transition-all duration-700" />
         </div>
         {link ? (
            <a 
               href={link} 
               target="_blank" 
               data-cursor="expand"
               className="block text-xl sm:text-2xl font-mono uppercase tracking-[0.1em] text-white/60 hover:text-white hover:translate-x-2 transition-all duration-500"
            >
               {value}
            </a>
         ) : (
            <span className="block text-xl sm:text-2xl font-mono uppercase tracking-[0.1em] text-white/60">
               {value}
            </span>
         )}
      </div>
   );
}
