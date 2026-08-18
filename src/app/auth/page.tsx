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
        <section className="signup-stage" aria-label="Account access">
          <div className="signup-shell">
            <SignUpForm initialTab={initialTab} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
