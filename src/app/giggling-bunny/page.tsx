"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TypingText } from '@/components/ui/typing-text';

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
        <TypingText
          text="haann mujhe pata tha ap hi hongay"
          className="mt-4 text-2xl font-bold text-foreground"
        />
        <Button asChild variant="outline" className="mt-8 bg-transparent hover:bg-primary/10 border-primary text-primary hover:text-primary">
          <Link href="/thinking-bunny">
            Next
            <ArrowRight />
          </Link>
        </Button>
      </main>
    </div>
  );
}
