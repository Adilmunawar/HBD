
"use client";

import Image from 'next/image';
import { LiquidButton } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GigglingBunnyPage() {
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
          src="/giggling-bunny.gif"
          alt="Giggling bunny"
          width={380}
          height={380}
          unoptimized
        />
        <p className="mt-4 text-2xl font-bold text-foreground">
          haann mujhe pata tha ap hi hongay
        </p>
        <LiquidButton asChild variant="outline" size="lg" className="mt-8">
          <Link href="/thinking-bunny">
            Next
            <ArrowRight />
          </Link>
        </LiquidButton>
      </main>
    </div>
  );
}
