'use client';

import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export function Marquee({ children, className = '', speed = 'normal' }: MarqueeProps) {
  const speedMap = {
    slow: '40s',
    normal: '20s',
    fast: '10s'
  };

  return (
    <div className={`relative overflow-hidden whitespace-nowrap ${className}`}>
      <div 
        className="inline-block animate-marquee"
        style={{
          animation: `marquee ${speedMap[speed]} linear infinite`,
        }}
      >
        {children}
      </div>
      <div 
        className="inline-block animate-marquee"
        style={{
          animation: `marquee ${speedMap[speed]} linear infinite`,
          animationDelay: '10s',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Add this to your global CSS or tailwind config
export const marqueeStyles = `
  @keyframes marquee {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  .animate-marquee {
    display: inline-block;
    padding-left: 50%;
  }
`;
