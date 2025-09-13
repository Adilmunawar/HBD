"use client";

import { animateHappyBirthdayBanner, AnimateHappyBirthdayBannerOutput } from "@/ai/flows/animate-happy-birthday-banner-with-ai";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, PartyPopper } from "lucide-react";

export function BirthdayBanner() {
  const [aiResponse, setAiResponse] = useState<AnimateHappyBirthdayBannerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnimation = async () => {
      try {
        const response = await animateHappyBirthdayBanner();
        setAiResponse(response);
      } catch (error) {
        console.error("Failed to get banner animation:", error);
        setAiResponse({ animationStyle: "Could not get an AI suggestion, but let's make it sparkle anyway!" });
      } finally {
        setIsLoading(false);
      }
    };
    getAnimation();
  }, []);

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

      <Card className="max-w-md bg-white/50 backdrop-blur-sm border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-lg">
            <PartyPopper className="text-primary" />
            AI Animation Idea
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
          ) : (
            <p className="text-sm font-body text-muted-foreground italic">"{aiResponse?.animationStyle}"</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
