import type { Metadata } from 'next';
import { SiteHeader } from '@/components/axquotes/Interactive';
import { SiteFooter } from '@/components/axquotes/LandingPage';
import { SignUpForm } from '@/components/axquotes/SignUpForm';

export const metadata: Metadata = {
  title: 'Create your account — Axquotes',
  description: 'Open an Axquotes account or log in to an existing one.',
};

type SignUpPageProps = {
  searchParams: Promise<{ tab?: string }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const initialTab = params.tab === 'login' ? 'login' : 'signup';

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section
          className="min-h-[calc(100svh-var(--site-chrome-height))] grid place-items-center py-[var(--section-space)] bg-ink text-white max-nav:py-[clamp(3rem,8vw,5rem)]"
          aria-label="Account access"
        >
          <div className="w-[min(calc(100%_-_2rem),30rem)] mx-auto">
            <SignUpForm initialTab={initialTab} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
