import { Balloons } from '@/components/balloons';
import { BirthdayBanner } from '@/components/birthday-banner';
import { NameAnimation } from '@/components/name-animation';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Balloons />
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-8 sm:px-6 lg:px-8 min-h-screen">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-12">
          <NameAnimation />
          <BirthdayBanner />
        </div>
      </main>
    </div>
  );
}
