'use client';

export default function GoldenRatioGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" aria-hidden="true">
      <svg className="w-full h-full" aria-hidden="true">
        <defs>
          <pattern
            id="golden-grid"
            width="100"
            height="161.8"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="0"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="161.8"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="0.5"
            />
            <line
              x1="61.8"
              y1="0"
              x2="61.8"
              y2="161.8"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#golden-grid)" />
      </svg>
    </div>
  );
}

