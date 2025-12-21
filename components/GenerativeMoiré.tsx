'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function GenerativeMoiré() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll();
  
  // Smooth scroll for distortion
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lineCount = 60;
  const lines = Array.from({ length: lineCount });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none opacity-40 brutalist-grid"
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {lines.map((_, i) => {
          const x = (i / (lineCount - 1)) * 100;
          return (
            <MoiréLine 
              key={i} 
              index={i} 
              x={x} 
              total={lineCount} 
              windowSize={windowSize}
              progress={smoothScroll}
            />
          );
        })}
      </svg>
    </div>
  );
}

function MoiréLine({ 
  index, 
  x, 
  total, 
  windowSize,
  progress 
}: { 
  index: number; 
  x: number; 
  total: number;
  windowSize: { width: number; height: number };
  progress: any;
}) {
  // Distortion intensity based on position and scroll
  const distortion = useTransform(
    progress,
    [0, 1],
    [0, (index % 2 === 0 ? 1 : -1) * 100]
  );

  const points = 10;
  const pathData = Array.from({ length: points + 1 }).map((_, j) => {
    const yPercent = (j / points) * 100;
    const yPos = (j / points) * windowSize.height;
    
    // Calculate horizontal offset
    // We'll use a sine wave that changes with scroll
    const freq = 0.02;
    const amp = 40;
    
    return j === 0 ? `M ${x}% ${yPos}` : `L ${x}% ${yPos}`;
  }).join(' ');

  return (
    <motion.path
      d={pathData}
      stroke="var(--color-blue-primary)"
      strokeWidth="0.5"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 1 }}
      style={{
        x: distortion
      }}
    />
  );
}

