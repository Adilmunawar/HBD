"use client";

import { cn } from "@/lib/utils";

export function NameAnimation() {
  const name = "Miss Samina";

  return (
    <h1 className="text-6xl md:text-8xl font-headline text-primary drop-shadow-lg mb-4">
      {name.split("").map((letter, index) => (
        <span
          key={index}
          className={cn(
            "inline-block opacity-0 animate-bounce-in",
            letter === " " && "w-4"
          )}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}
