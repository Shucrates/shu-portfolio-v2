'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const POSTERS = [
  '/work/shubham missing poster 2.png',
  '/work/whiplash poster black 2.png',
  '/work/KANYE WEST X LOTR POSTER 2.png',
  '/work/art vs artist poster 4.png',
  '/work/bytecamp theme poster utopia 3.png',
  '/work/euphoria poster 1.png',
  '/work/sidhatek poster shuisbored.png',
  '/work/control is an illusion poster mrrobot shuisbored.png',
  '/work/vivid to void poster.png',
  '/work/joji camera poster 5.png'
];

const LAYOUT_SLOTS = [
  { id: 1, depth: 0.4, top: '5%', left: '5%', width: 160, height: 220, opacity: 0.85 },
  { id: 2, depth: 0.8, top: '-5%', left: '20%', width: 220, height: 300, opacity: 0.4 },
  { id: 3, depth: 1.0, top: '15%', left: '-8%', width: 140, height: 180, opacity: 0.2 },
  { id: 4, depth: 0.5, top: '10%', right: '12%', width: 200, height: 280, opacity: 0.7 },
  { id: 5, depth: 0.9, top: '-8%', right: '2%', width: 180, height: 240, opacity: 0.3 },
  { id: 6, depth: 0.7, bottom: '15%', left: '12%', width: 240, height: 320, opacity: 0.5 },
  { id: 7, depth: 0.3, bottom: '-5%', left: '-5%', width: 280, height: 280, opacity: 0.9 },
  { id: 8, depth: 0.9, bottom: '25%', right: '15%', width: 160, height: 220, opacity: 0.4 },
  { id: 9, depth: 0.4, bottom: '-10%', right: '20%', width: 300, height: 400, opacity: 0.8 },
  { id: 10, depth: 1.1, bottom: '5%', right: '-10%', width: 220, height: 300, opacity: 0.2 },
];

export default function WorkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activePage = usePortfolioStore((state) => state.activePage);
  const [randomizedImages, setRandomizedImages] = useState<any[]>([]);

  // Shuffle images through exactly the same layout slots every time 'work' opens
  useEffect(() => {
    if (activePage === 'work') {
      const shuffled = [...POSTERS].sort(() => Math.random() - 0.5);
      const mapped = LAYOUT_SLOTS.map((slot, index) => ({
        ...slot,
        src: shuffled[index] || shuffled[0], 
      }));
      setRandomizedImages(mapped);
    } else {
      // Clear out local state when leaving so it guarantees fresh pop-in next time
      setRandomizedImages([]);
    }
  }, [activePage]);

  // High-performance Parallax GSAP tracker 
  useEffect(() => {
    if (activePage !== 'work' || !containerRef.current || randomizedImages.length === 0) return;

    const domImages = containerRef.current.querySelectorAll('.work-image');
    const trackers: { xTo: any; yTo: any; rotX: any; rotY: any; depth: number }[] = [];

    domImages.forEach((img) => {
      trackers.push({
        xTo: gsap.quickTo(img, 'x', { duration: 0.8, ease: 'power3.out' }),
        yTo: gsap.quickTo(img, 'y', { duration: 0.8, ease: 'power3.out' }),
        rotX: gsap.quickTo(img, 'rotateX', { duration: 0.8, ease: 'power3.out' }),
        rotY: gsap.quickTo(img, 'rotateY', { duration: 0.8, ease: 'power3.out' }),
        depth: parseFloat((img as HTMLElement).dataset.depth || '0.5')
      });
    });

    const setParallax = (clientX: number, clientY: number) => {
      const xPercent = (clientX / window.innerWidth) - 0.5;
      const yPercent = (clientY / window.innerHeight) - 0.5;

      trackers.forEach((t) => {
        t.xTo(xPercent * t.depth * 120); 
        t.yTo(yPercent * t.depth * 80);
        t.rotX(-yPercent * t.depth * 20); // 3D tilt up and down
        t.rotY(xPercent * t.depth * 20);  // 3D tilt left and right
      });
    };

    // Grab current global mouse position instantly on mount so the depth effect configures immediately
    const initialPos = usePortfolioStore.getState().mousePosition;
    if (initialPos.x && initialPos.y) setParallax(initialPos.x, initialPos.y);

    const handleMouseMove = (e: MouseEvent) => setParallax(e.clientX, e.clientY);

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activePage, randomizedImages]);

  // Entrance Stagger Animation
  useEffect(() => {
    if (activePage === 'work' && containerRef.current && randomizedImages.length > 0) {
      const domImages = containerRef.current.querySelectorAll('.work-image');
      
      // Specifically target ONLY opacity and scale to avoid murdering the `quickTo` transform engine!
      gsap.killTweensOf(domImages, "opacity,scale"); 
      
      gsap.fromTo(domImages, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: (i, el) => parseFloat(el.dataset.opacity || '1'), scale: 1, stagger: 0.04, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [activePage, randomizedImages]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 ${activePage === 'work' ? 'block' : 'hidden'}`}
      style={{ perspective: '1000px', perspectiveOrigin: 'center center', transformStyle: 'preserve-3d' }}
    >
      {randomizedImages.map((img) => (
        <div
          key={img.id}
          data-cursor="expand"
          // CRITICAL FIX: transition-all destroyed GSAP's physical hardware transforms. Only transition filter/opacity!
          className="work-image absolute pointer-events-auto bg-neutral-900 shadow-2xl grayscale hover:grayscale-0 transition-[filter,z-index] duration-700 hover:z-20 cursor-pointer"
          data-depth={img.depth}
          data-opacity={img.opacity}
          style={{
            top: img.top,
            bottom: img.bottom,
            left: img.left,
            right: img.right,
            width: `${img.width}px`,
            height: `${img.height}px`,
            opacity: img.opacity,
            backgroundImage: `url("${encodeURI(img.src)}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '0.5px solid rgba(255, 255, 255, 0.15)'
          }}
        />
      ))}
    </div>
  );
}
