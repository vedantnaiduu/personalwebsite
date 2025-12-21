'use client';

import { useEffect, useRef } from 'react';

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Hexagonal grid pattern
    const drawHexGrid = () => {
      const hexSize = 40;
      const hexWidth = hexSize * 2;
      const hexHeight = hexSize * Math.sqrt(3);

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 0.5;

      for (let y = 0; y < canvas.height + hexHeight; y += hexHeight * 0.75) {
        for (let x = 0; x < canvas.width + hexWidth; x += hexWidth * 0.75) {
          const offsetX = (y % (hexHeight * 1.5) === 0) ? 0 : hexWidth * 0.375;
          
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + offsetX + hexSize * Math.cos(angle);
            const hy = y + hexHeight / 2 + hexSize * Math.sin(angle);
            if (i === 0) {
              ctx.moveTo(hx, hy);
            } else {
              ctx.lineTo(hx, hy);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    // Diagonal line pattern
    const drawDiagonalLines = () => {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.05)';
      ctx.lineWidth = 1;
      const spacing = 100;

      for (let i = -canvas.height; i < canvas.width + canvas.height; i += spacing) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();
      }
    };

    // Concentric circles with golden ratio
    const drawGoldenCircles = () => {
      const centerX = canvas.width * 0.618; // Golden ratio position
      const centerY = canvas.height * 0.618;
      const baseRadius = 50;
      const phi = 1.618;

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 1;

      for (let i = 0; i < 8; i++) {
        const radius = baseRadius * Math.pow(phi, i);
        if (radius > Math.max(canvas.width, canvas.height)) break;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawHexGrid();
      drawDiagonalLines();
      drawGoldenCircles();
    };

    animate();
    const interval = setInterval(animate, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(interval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.05 }}
      aria-hidden="true"
    />
  );
}

