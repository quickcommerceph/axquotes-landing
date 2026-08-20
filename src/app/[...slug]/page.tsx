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
        <section className="subpage-stage">
          <div className="site-shell">
            <nav className="subpage-breadcrumb" aria-label="Breadcrumb">
              {page.breadcrumb.map((crumb, index) => {
                const isLast = index === page.breadcrumb.length - 1;
                return (
                  <span key={`crumb-${index}`}>
                    {index > 0 && <span aria-hidden="true">/</span>}
                    {isLast ? <span aria-current="page">{crumb.label}</span> : <Link href={crumb.href}>{crumb.label}</Link>}
                  </span>
                );
              })}
            </nav>
            <h1 className="subpage-heading">{page.title}</h1>
            <p className="subpage-note">Content for this page is coming soon.</p>
            {overviewGroups && (
              <div className="subpage-groups">
                {overviewGroups.map((group) => (
                  <div className="subpage-group" key={group.heading}>
                    {overviewGroups.length > 1 && <h2>{group.heading}</h2>}
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href}>{link.label}</Link>
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
