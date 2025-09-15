
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BirthdayWishPage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('visited_home') !== 'true') {
      router.replace('/');
    }
  }, [router]);

  const cakeImage = PlaceHolderImages.find((img) => img.id === 'cake');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative min-h-screen w-full overflow-x-hidden"
    >
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        {cakeImage && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}>
              <Image
                  src={cakeImage.imageUrl}
                  alt={cakeImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint={cakeImage.imageHint}
              />
            </motion.div>
        )}
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} className="mt-8 text-4xl font-bold text-primary">
          Happy Birthday, Miss Samina!
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} className="mt-4 text-lg text-foreground text-center max-w-md">
          Wishing you a day filled with love, joy, and laughter. Thank you for everything!
        </motion.p>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}>
          <Button asChild variant="outline" className="mt-8 bg-transparent hover:bg-primary/10 border-primary text-primary hover:text-primary">
            <Link href="/">
              <Home />
              Go Home
            </Link>
          </Button>
        </motion.div>
      </main>
    </motion.div>
  );
}
