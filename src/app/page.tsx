import { Balloons } from '@/components/balloons';
import { BirthdayBanner } from '@/components/birthday-banner';
import { CakeAnimation } from '@/components/cake-animation';
import { MessageGenerator } from '@/components/message-generator';
import { NameAnimation } from '@/components/name-animation';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Balloons />
      <main className="relative z-10 flex flex-col items-center w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto">
          <header className="text-center my-8 md:my-16 flex flex-col items-center">
            <NameAnimation />
            <BirthdayBanner />
          </header>

          <section className="mt-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <CakeAnimation />
              <MessageGenerator />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
