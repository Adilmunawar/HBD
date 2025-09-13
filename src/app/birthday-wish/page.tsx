import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BirthdayWishPage() {
  const cakeImage = PlaceHolderImages.find((img) => img.id === 'cake');

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        {cakeImage && (
            <Image
                src={cakeImage.imageUrl}
                alt={cakeImage.description}
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                data-ai-hint={cakeImage.imageHint}
            />
        )}
        <h1 className="mt-8 text-4xl font-bold text-primary">
          Happy Birthday, Miss Samina!
        </h1>
        <p className="mt-4 text-lg text-foreground text-center max-w-md">
          Wishing you a day filled with love, joy, and laughter. Thank you for everything!
        </p>
        <Button asChild variant="outline" className="mt-8 bg-transparent hover:bg-primary/10 border-primary text-primary hover:text-primary">
          <Link href="/">
            <Home />
            Go Home
          </Link>
        </Button>
      </main>
    </div>
  );
}
