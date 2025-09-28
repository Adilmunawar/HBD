
"use client";

import Image from 'next/image';
import { LiquidButton } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CuteBunnyPage() {
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
          src="/cute-bunny.gif"
          alt="Cute animated bunny"
          width={380}
          height={380}
          unoptimized
        />
        <p className="mt-4 text-2xl font-bold text-foreground">
          Arry Itaa piyarra insan
        </p>
        <LiquidButton asChild variant="outline" size="lg" className="mt-8">
          <Link href="/peeking-bunny">
            dekho zara
            <ArrowRight />
          </Link>
        </LiquidButton>
      </main>
    </div>
  );
}
