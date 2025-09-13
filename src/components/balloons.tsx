"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const balloonColors = [
  "text-primary",
  "text-accent",
  "text-red-400",
  "text-blue-400",
  "text-green-400",
  "text-purple-400",
];

const Balloon = ({ style, className, svgStyle }: { style: React.CSSProperties, className: string, svgStyle: React.CSSProperties }) => (
  <div style={style} className="absolute bottom-0">
    <div style={svgStyle}>
      <svg
        viewBox="0 0 100 125"
        className={cn("w-full h-auto drop-shadow-lg", className)}
        fill="currentColor"
      >
        <path d="M50,0 C10,0 0,25 0,50 C0,80 20,100 50,100 C80,100 100,80 100,50 C100,25 90,0 50,0 Z" />
        <path d="M45,98 L55,98 L50,120 Z" />
      </svg>
    </div>
  </div>
);

export function Balloons() {
  const [balloons, setBalloons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const numBalloons = isMobile ? 8 : 15;

    const generatedBalloons = Array.from({ length: numBalloons }).map((_, i) => {
      const size = Math.random() * (100 - 40) + 40;
      const left = Math.random() * 95;
      const floatUpDuration = Math.random() * (25 - 12) + 12;
      const floatUpDelay = Math.random() * 12;
      const floatDuration = Math.random() * (6 - 3) + 3;
      const colorClass = balloonColors[Math.floor(Math.random() * balloonColors.length)];

      return (
        <Balloon
          key={i}
          className={colorClass}
          style={{
            width: `${size}px`,
            left: `${left}%`,
            animation: `float-up ${floatUpDuration}s linear ${floatUpDelay}s forwards`,
          }}
          svgStyle={{
            animation: `float ${floatDuration}s ease-in-out ${floatUpDelay}s infinite`
          }}
        />
      );
    });
    setBalloons(generatedBalloons);
  }, []);
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {balloons}
    </div>
  );
}
