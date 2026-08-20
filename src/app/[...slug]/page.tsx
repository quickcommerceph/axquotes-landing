import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/axquotes/Interactive';
import { SiteFooter } from '@/components/axquotes/LandingPage';
import { findSitePage, sitePages } from '@/components/axquotes/navigation';

type SubPageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.slug.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: SubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findSitePage(`/${slug.join('/')}`);
  if (!page) return {};

  return {
    title: `${page.title} — Axquotes`,
    description: `${page.title} at Axquotes.`,
  };
}

export default async function SubPage({ params }: SubPageProps) {
  const { slug } = await params;
  const page = findSitePage(`/${slug.join('/')}`);
  if (!page) notFound();

  const overviewGroups = page.overviewGroups;

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="min-h-[calc(100svh-var(--site-chrome-height))] py-[var(--section-space-standard)]">
          <div className="site-shell">
            <nav className="flex flex-wrap items-center gap-[0.4rem] mb-6 text-muted text-[0.78rem] font-[650]" aria-label="Breadcrumb">
              {page.breadcrumb.map((crumb, index) => {
                const isLast = index === page.breadcrumb.length - 1;
                return (
                  <span key={`crumb-${index}`}>
                    {index > 0 && <span aria-hidden="true" className="text-line">/</span>}
                    {isLast ? (
                      <span aria-current="page" className="text-ink">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.href} className="hover:text-ink">{crumb.label}</Link>
                    )}
                  </span>
                );
              })}
            </nav>
            <h1 className="max-w-[24ch] mb-4 font-heading text-[clamp(2.4rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.035em]">{page.title}</h1>
            <p className="max-w-[42rem] text-muted text-[clamp(1.0625rem,1.4vw,1.2625rem)] leading-[1.7]">Content for this page is coming soon.</p>
            {overviewGroups && (
              <div className="grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-x-8 gap-y-10 mt-[clamp(2.5rem,5vw,4rem)] pt-[clamp(2.5rem,5vw,4rem)] border-t border-line">
                {overviewGroups.map((group) => (
                  <div key={group.heading}>
                    {overviewGroups.length > 1 && (
                      <h2 className="mb-4 text-muted text-[0.68rem] font-extrabold uppercase tracking-[0.1em]">{group.heading}</h2>
                    )}
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} className="block my-[0.55rem] text-[0.92rem] font-[650] hover:text-coral-action">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
