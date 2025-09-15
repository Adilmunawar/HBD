
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ThinkingHarderBunnyPage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('visited_home') !== 'true') {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        <div className="relative">
          <Image
            src="/thinking-harder-bunny.gif"
            alt="Bunny thinking hard"
            width={380}
            height={380}
            unoptimized
          />
          <div className="absolute top-1/4 left-3/4">
            <p className="animate-sleepy-zzz text-2xl font-bold text-foreground opacity-0">Z</p>
            <p className="animate-sleepy-zzz animation-delay-500 text-xl font-bold text-foreground opacity-0">z</p>
            <p className="animate-sleepy-zzz animation-delay-1000 text-lg font-bold text-foreground opacity-0">z</p>
          </div>
        </div>
        <p className="mt-4 text-2xl font-bold text-foreground text-center">
          Ammm yadd karne dain zara mujheee
        </p>
        <Button asChild variant="outline" className="mt-8 bg-transparent hover:bg-primary/10 border-primary text-primary hover:text-primary">
          <Link href="/realization-bunny">
            Haan karro karro
            <ArrowRight />
          </Link>
        </Button>
      </main>
    </div>
  );
}
