
"use client";

import Image from 'next/image';
import { LiquidButton } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ThinkingBunnyPage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('visited_home') !== 'true') {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        <Image
          src="/thinking-bunny.gif"
          alt="Bunny and chick thinking"
          width={380}
          height={380}
          unoptimized
        />
        <p className="mt-4 text-2xl font-bold text-foreground text-center">
          Hamm kuch bhool tu nahi rahy? Aj tu 1st October haaii
        </p>
        <LiquidButton asChild variant="outline" size="lg" className="mt-8">
          <Link href="/thinking-harder-bunny">
            Yes, Maybe
            <ArrowRight />
          </Link>
        </LiquidButton>
      </main>
    </div>
  );
}
