'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const dummyImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', depth: 0.4, top: '5%', left: '5%', width: 160, height: 220, opacity: 0.85 },
  { id: 2, src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop', depth: 0.8, top: '-5%', left: '20%', width: 220, height: 300, opacity: 0.4 },
  { id: 7, src: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400&auto=format&fit=crop', depth: 1.0, top: '15%', left: '-8%', width: 140, height: 180, opacity: 0.2 },
  { id: 3, src: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=400&auto=format&fit=crop', depth: 0.5, top: '10%', right: '12%', width: 200, height: 280, opacity: 0.7 },
  { id: 8, src: 'https://images.unsplash.com/photo-1607412850932-a58f44c45ae2?q=80&w=400&auto=format&fit=crop', depth: 0.9, top: '-8%', right: '2%', width: 180, height: 240, opacity: 0.3 },
  { id: 11, src: 'https://images.unsplash.com/photo-1617387295799-a4fc8b9ea04d?q=80&w=400&auto=format&fit=crop', depth: 1.1, top: '35%', right: '-5%', width: 130, height: 180, opacity: 0.15 },
  { id: 5, src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop', depth: 0.7, bottom: '15%', left: '12%', width: 240, height: 320, opacity: 0.5 },
  { id: 9, src: 'https://images.unsplash.com/photo-1603533867307-b3ea14112002?q=80&w=400&auto=format&fit=crop', depth: 0.3, bottom: '-5%', left: '-5%', width: 180, height: 240, opacity: 0.9 },
  { id: 12, src: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400&auto=format&fit=crop', depth: 1.2, bottom: '35%', left: '2%', width: 120, height: 160, opacity: 0.1 },
  { id: 4, src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=400&auto=format&fit=crop', depth: 0.9, bottom: '25%', right: '15%', width: 160, height: 220, opacity: 0.4 },
  { id: 6, src: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?q=80&w=400&auto=format&fit=crop', depth: 0.4, bottom: '-10%', right: '20%', width: 300, height: 400, opacity: 0.8 },
  { id: 10, src: 'https://images.unsplash.com/photo-1561214078-f3247647fc5e?q=80&w=400&auto=format&fit=crop', depth: 1.1, bottom: '5%', right: '-10%', width: 220, height: 300, opacity: 0.2 },
];

export default function WorkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activePage = usePortfolioStore((state) => state.activePage);

  // High-performance Parallax CSS Depth Effect mapped directly to native mouse events
  useEffect(() => {
    if (activePage !== 'work' || !containerRef.current) return;

    const images = containerRef.current.querySelectorAll('.work-image');
    const trackers: { xTo: any; yTo: any; depth: number }[] = [];

    images.forEach((img) => {
      trackers.push({
        // Increased smoothing duration slightly to prevent overly sharp whipping
        xTo: gsap.quickTo(img, 'x', { duration: 0.8, ease: 'power3.out' }),
        yTo: gsap.quickTo(img, 'y', { duration: 0.8, ease: 'power3.out' }),
        depth: parseFloat((img as HTMLElement).dataset.depth || '0.5')
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normal offset
      const xPercent = (e.clientX / window.innerWidth) - 0.5;
      const yPercent = (e.clientY / window.innerHeight) - 0.5;

      trackers.forEach((t) => {
        t.xTo(xPercent * t.depth * 100); // Reduced total traverse distance slightly
        t.yTo(yPercent * t.depth * 70);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activePage]);

  // Entrance Stagger Animation
  useEffect(() => {
    if (activePage === 'work' && containerRef.current) {
      const images = containerRef.current.querySelectorAll('.work-image');
      gsap.fromTo(images, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: (i, el) => parseFloat(el.dataset.opacity || '1'), scale: 1, stagger: 0.04, duration: 0.6, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [activePage]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10 ${activePage === 'work' ? 'block' : 'hidden'}`}
    >
      {/* Animated Grainy Static Filter */}
      <div className="noise-bg" />

      {dummyImages.map((img) => (
        <div
          key={img.id}
          className="work-image absolute bg-neutral-900 shadow-2xl grayscale hover:grayscale-0 transition-all duration-300"
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
            backgroundImage: `url(${img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '0.5px solid rgba(255, 255, 255, 0.15)'
          }}
        />
      ))}
    </div>
  );
}
