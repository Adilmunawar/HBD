import Image from 'next/image';

export default function SurprisePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        <h1 className="text-4xl font-bold text-foreground">What's the next surprise?</h1>
      </main>
    </div>
  );
}
