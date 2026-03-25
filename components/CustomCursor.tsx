'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !cursorRef.current) return;

    const cursor = cursorRef.current;
    
    // Initial GSAP configuration (let GSAP handle origin/translation via xPercent/yPercent)
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // Core transform trackers - using quickTo for everything keeps animations unified
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'expo.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'expo.out' });
    const widthTo = gsap.quickTo(cursor, 'width', { duration: 0.35, ease: 'expo.out' });
    const heightTo = gsap.quickTo(cursor, 'height', { duration: 0.35, ease: 'expo.out' });

    let isExpanded = false;
    let currentTarget: HTMLElement | null = null;

    // Standard mouse move tracking
    const onMouseMove = (e: MouseEvent) => {
      if (!isExpanded) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Ticker handles continuous lock-on for expanding targets natively tracking `hover:scale` or movements
    const trackTarget = () => {
      if (isExpanded && currentTarget) {
        const rect = currentTarget.getBoundingClientRect();
        // Locks seamlessly continuously resolving scaling delays 
        xTo(rect.left + rect.width / 2);
        yTo(rect.top + rect.height / 2);
        widthTo(rect.width + 16);
        heightTo(rect.height + 16);
      }
    };
    gsap.ticker.add(trackTarget);

    // Expand trigger
    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor="expand"]') as HTMLElement;
      if (target && target !== currentTarget) {
        isExpanded = true;
        currentTarget = target;
      }
    };

    // Collapse trigger
    const onMouseOut = (e: MouseEvent) => {
      if (currentTarget && !currentTarget.contains(e.relatedTarget as Node)) {
        isExpanded = false;
        currentTarget = null;
        
        // Revert sizes immediately on leave
        widthTo(20);
        heightTo(20);
      }
    };

    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    // Expand ripple click effect
    const onMouseDown = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'fixed rounded-full border border-white pointer-events-none z-[9998] mix-blend-difference';
      
      ripple.style.width = '40px';
      ripple.style.height = '40px';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      // Start scaled down centered on cursor
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.opacity = '1';
      
      document.body.appendChild(ripple);
      
      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.5,
        ease: 'expo.out',
        onComplete: () => {
          ripple.remove();
        }
      });
    };

    window.addEventListener('mousedown', onMouseDown);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      gsap.ticker.remove(trackTarget);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor pointer-events-none z-[9999]"
      style={{ 
        width: 20, 
        height: 20, 
        mixBlendMode: 'difference',
        top: 0,
        left: 0
      }}
    >
      <span className="corner top-left" />
      <span className="corner top-right" />
      <span className="corner bottom-left" />
      <span className="corner bottom-right" />
    </div>
  );
}
