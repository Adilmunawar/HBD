"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    sessionStorage.setItem('visited_home', 'true');
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        <Image
          src="/cute-cat.gif"
          alt="Cute animated cat"
          width={278}
          height={295}
          unoptimized
        />
        <p className="mt-4 text-2xl font-bold text-foreground">
          ye konn hai?
        </p>
        <Button asChild variant="outline" className="mt-8 bg-transparent hover:bg-primary/10 border-primary text-primary hover:text-primary">
          <Link href="/cute-bunny">
            Chalo, dekhein kya hai!
            <ArrowRight />
          </Link>
        </Button>
      </main>
    </div>
  );
}
