import type { Metadata } from 'next';
import './globals.css';
import ClickSpark from '@/components/ui/click-spark';

export const metadata: Metadata = {
  title: "Samina's Celebration Station",
  description: "A special birthday celebration for Miss Samina!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ClickSpark
          sparkColor="#9370DB"
          sparkSize={8}
          sparkRadius={25}
          sparkCount={12}
          duration={500}
        >
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
