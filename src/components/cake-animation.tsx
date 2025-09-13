"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cake, Sparkles } from "lucide-react";
import { Confetti } from "@/components/confetti";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const Candle = ({ lit, ...props }: { lit: boolean; [key: string]: any }) => (
  <div {...props} className="flex flex-col items-center">
    {lit && (
      <div className="w-5 h-5 -mb-1">
        <svg viewBox="0 0 24 24" className="w-full h-full text-accent animate-candle-flicker origin-bottom" fill="currentColor">
          <path d="M12,2c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4S14.21,2,12,2z M12,7c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S12.55,7,12,7z"/>
          <path d="M12,10c-3.31,0-6,2.69-6,6s2.69,6,6,6s6-2.69,6-6S15.31,10,12,10z M12,20c-2.21,0-4-1.79-4-4s1.79-4,4-4s4,1.79,4,4 S14.21,20,12,20z"/>
        </svg>
      </div>
    )}
    <div className="w-2 h-8 bg-white rounded-t-full" />
  </div>
);

export function CakeAnimation() {
  const [areCandlesLit, setAreCandlesLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const cakeImage = PlaceHolderImages.find(img => img.id === 'cake')!;

  const handleBlowOut = () => {
    if (!areCandlesLit) return;
    setAreCandlesLit(false);
    setShowConfetti(true);
  };
  
  return (
    <Card className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm border-2">
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Cake className="text-primary" />
          A Sweet Surprise!
        </CardTitle>
      </CardHeader>
      <CardContent className="relative w-full aspect-[3/2] max-w-sm">
        <Image
          src={cakeImage.imageUrl}
          alt={cakeImage.description}
          data-ai-hint={cakeImage.imageHint}
          width={600}
          height={400}
          className="object-cover rounded-lg"
        />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 flex gap-4">
          <Candle lit={areCandlesLit} />
          <Candle lit={areCandlesLit} style={{transform: 'translateY(-10px)'}} />
          <Candle lit={areCandlesLit} />
        </div>
      </CardContent>
      <CardFooter>
        {areCandlesLit ? (
          <Button onClick={handleBlowOut} size="lg">
            Blow out the candles!
          </Button>
        ) : (
          <p className="font-headline text-lg text-primary flex items-center gap-2 h-11 px-8">
            <Sparkles className="w-5 h-5" />
            Wish Made!
            <Sparkles className="w-5 h-5" />
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
