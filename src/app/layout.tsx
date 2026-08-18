import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/sora';
import './globals.css';

export const metadata: Metadata = {
  title: 'Axquotes — Markets move. Move with them.',
  description: 'Explore global markets, powerful trading tools, insights, and rewards with Axquotes.',
  openGraph: {
    title: 'Axquotes — Markets move. Move with them.',
    description: 'One clear platform for global markets, tools, insights, and rewards.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#101119',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning>
        {/*
          THESIS: Axquotes turns market complexity into forward motion; it refuses the generic broker page made of interchangeable feature cards.
          OWN-WORLD: clean white editorial fields, ink-black product stages, electric blue data, and coral actions built around real interface demonstrations.
          STORY: understand the offer, see the platform work, verify breadth and benefits, then create an account.
          FIRST VIEWPORT: compact dark navigation above an immersive market video where centered decisive copy and a visible coral action form one focused composition.
          FORM: retail-trading product studio; assigned surface structure 6, seed key 96e7a283; the user-pinned Axquotes brand and conversion brief override unrelated catalog challengers.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
