"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const confettiColors = [
  "bg-primary",
  "bg-accent",
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
];

const ConfettiPiece = ({ style, className }: { style: React.CSSProperties, className: string }) => (
  <div style={style} className={cn("absolute top-0 w-2 h-4 rounded-full", className)}></div>
);

export function Confetti({ onComplete }: { onComplete?: () => void }) {
  const [pieces, setPieces] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generatedPieces = Array.from({ length: 150 }).map((_, i) => {
      const left = Math.random() * 100;
      const animationDuration = Math.random() * (5 - 3) + 3;
      const animationDelay = Math.random() * 0.5;
      const colorClass = confettiColors[Math.floor(Math.random() * confettiColors.length)];

      return (
        <ConfettiPiece
          key={i}
          className={colorClass}
          style={{
            left: `${left}%`,
            animation: `confetti-fall ${animationDuration}s linear ${animationDelay}s forwards`,
          }}
        />
      );
    });

    setPieces(generatedPieces);

    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 5500); // duration + max delay

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">{pieces}</div>;
}
