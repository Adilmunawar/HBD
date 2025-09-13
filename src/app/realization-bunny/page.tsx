"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RealizationBunnyPage() {
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
          src="/realization-bunny.gif"
          alt="Bunny realizing with fireworks"
          width={380}
          height={380}
          unoptimized
        />
        <p className="mt-4 text-2xl font-bold text-foreground text-center">
          Ajj tu apka birhtday haiiii
        </p>
        <Button asChild variant="outline" className="mt-8 bg-transparent hover:bg-primary/10 border-primary text-primary hover:text-primary">
          <Link href="/birthday-wish">
            Haan hai
            <ArrowRight />
          </Link>
        </Button>
      </main>
    </div>
  );
}
