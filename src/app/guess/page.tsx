import Image from 'next/image';

export default function GuessPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        <Image
          src="/excited-bunny.gif"
          alt="Excited bunny celebrating"
          width={380}
          height={380}
          unoptimized
        />
        <p className="mt-4 text-2xl font-bold text-foreground">
          Ye to miss Samina hain
        </p>
      </main>
    </div>
  );
}
