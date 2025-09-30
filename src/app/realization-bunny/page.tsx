
"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { FoodOrderDialog } from '@/components/ui/food-order-dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

  const handleProceedToPayment = (total: number) => {
    sessionStorage.setItem('paymentAmount', total.toString());
    router.push('/payment');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
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
        <Button
          variant="outline"
          size="lg"
          className="mt-8"
          onClick={() => setIsDialogOpen(true)}
        >
          Hann Hai
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <FoodOrderDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onProceed={handleProceedToPayment}
        />
      </main>
    </div>
  );
}
