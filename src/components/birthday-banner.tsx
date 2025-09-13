"use client";

import { animateHappyBirthdayBanner, AnimateHappyBirthdayBannerOutput } from "@/ai/flows/animate-happy-birthday-banner-with-ai";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, PartyPopper } from "lucide-react";

export function BirthdayBanner() {
  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      <div className="relative group">
        <h2 className="text-4xl md:text-5xl font-headline text-secondary-foreground drop-shadow-md">
          Happy Birthday!
        </h2>
        <Sparkles className="absolute -top-4 -left-8 w-8 h-8 text-accent animate-sparkle" style={{animationDelay: '0s'}} />
        <Sparkles className="absolute -bottom-4 -right-8 w-8 h-8 text-accent animate-sparkle" style={{animationDelay: '0.5s'}} />
        <Sparkles className="absolute top-0 -right-12 w-6 h-6 text-primary animate-sparkle" style={{animationDelay: '1s'}} />
      </div>
    </div>
  );
}
