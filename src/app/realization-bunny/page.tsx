
"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { FoodOrderDialog } from '@/components/ui/food-order-dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RealizationBunnyPage() {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('visited_home') !== 'true') {
      router.replace('/');
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    setShowConfetti(true); // Auto-trigger confetti
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={400}
          recycle={true}
          gravity={0.05}
          wind={0.02}
          colors={['#FFC0CB', '#FF69B4', '#FFD700', '#ADD8E6', '#9370DB', '#F472B6']}
        />
      )}
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Image
            src="/realization-bunny.gif"
            alt="Bunny realizing with fireworks"
            width={380}
            height={380}
            unoptimized
          />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-4 text-2xl font-bold text-foreground text-center">
          Ajj tu apka birhtday haiiii
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
          <Button
            variant="outline"
            className="mt-8 bg-transparent hover:bg-primary/10 border-primary text-primary hover:text-primary"
            onClick={() => setIsDialogOpen(true)}
          >
            Hann Hai
            <ArrowRight />
          </Button>
        </motion.div>
        <FoodOrderDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onProceed={() => router.push('/payment')}
        />
      </main>
    </motion.div>
  );
}
