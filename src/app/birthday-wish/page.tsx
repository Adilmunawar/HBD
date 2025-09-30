
"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BirthdayWishPage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('visited_home') !== 'true') {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image
        src="/birthday-background.gif"
        alt="Happy Birthday background"
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  );
}
