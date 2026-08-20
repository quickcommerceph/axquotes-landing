export type NavLink = { label: string; href: string };
export type NavGroup = { heading: string; links: NavLink[] };
export type NavSection = { label: string; href: string; groups: NavGroup[] };

export const siteNavigation: NavSection[] = [
  {
    label: 'Company',
    href: '/company',
    groups: [
      {
        heading: 'Company',
        links: [
          { label: 'Regulatory & Compliance', href: '/company/regulatory-compliance' },
          { label: 'Risk Disclosure', href: '/company/risk-disclosure' },
          { label: 'Contact Us', href: '/company/contact-us' },
        ],
      },
    ],
  },
  {
    label: 'Trading',
    href: '/trading',
    groups: [
      {
        heading: 'Account Types',
        links: [
          { label: 'Standard Account', href: '/trading/account-types/standard' },
          { label: 'Mini Account', href: '/trading/account-types/mini' },
        ],
      },
      {
        heading: 'Trading Instruments',
        links: [
          { label: 'Currencies', href: '/trading/instruments/currencies' },
          { label: 'Commodities', href: '/trading/instruments/commodities' },
          { label: 'Indices', href: '/trading/instruments/indices' },
          { label: 'Stocks', href: '/trading/instruments/stocks' },
          { label: 'Crypto', href: '/trading/instruments/crypto' },
          { label: 'Social Trading', href: '/trading/instruments/social-trading' },
        ],
      },
      {
        heading: 'Trading Platforms',
        links: [
          { label: 'MT5', href: '/trading/platforms/mt5' },
          { label: 'Web Terminal', href: '/trading/platforms/web-terminal' },
          { label: 'Xquotes App', href: '/trading/platforms/xquotes-app' },
        ],
      },
    ],
  },
  {
    label: 'Incentives',
    href: '/incentives',
    groups: [
      {
        heading: 'Incentives',
        links: [
          { label: 'Deposit Bonus', href: '/incentives/deposit-bonus' },
          { label: 'New Account Bonus', href: '/incentives/new-account-bonus' },
          { label: 'Refer a Friend', href: '/incentives/refer-a-friend' },
        ],
      },
    ],
  },
  {
    label: 'Academy',
    href: '/academy',
    groups: [
      {
        heading: 'Academy',
        links: [
          { label: 'Trading Seminars', href: '/academy/trading-seminars' },
          { label: 'News & Analysis', href: '/academy/news-analysis' },
          { label: 'Economic Calendar', href: '/academy/economic-calendar' },
          { label: 'Forex Calculator', href: '/academy/forex-calculator' },
        ],
      },
    ],
  },
];

export const footerGroups = siteNavigation.flatMap((section) => section.groups);

export type LocaleOption = { language: string; code: string; flag: string };

export const localeOptions: LocaleOption[] = [
  { language: 'English', code: 'EN', flag: '🇺🇸' },
  { language: 'Bahasa Melayu', code: 'MY', flag: '🇲🇾' },
  { language: 'Bahasa Indonesia', code: 'ID', flag: '🇮🇩' },
  { language: 'ไทย', code: 'TH', flag: '🇹🇭' },
  { language: 'Tiếng Việt', code: 'VI', flag: '🇻🇳' },
  { language: '中文', code: 'CN', flag: '🇨🇳' },
];

export type Breadcrumb = { label: string; href: string };

export type SitePage = {
  slug: string;
  title: string;
  breadcrumb: Breadcrumb[];
  /** Present on section-overview pages (e.g. /trading): their sub-navigation, grouped. */
  overviewGroups?: NavGroup[];
};

const home: Breadcrumb = { label: 'Home', href: '/' };

export const sitePages: SitePage[] = siteNavigation.flatMap((section) => {
  const sectionCrumb: Breadcrumb = { label: section.label, href: section.href };
  const overviewPage: SitePage = {
    slug: section.href,
    title: section.label,
    breadcrumb: [home, sectionCrumb],
    overviewGroups: section.groups,
  };

  const leafPages: SitePage[] = section.groups.flatMap((group) => {
    const showGroupCrumb = section.groups.length > 1;
    return group.links.map((link) => ({
      slug: link.href,
      title: link.label,
      breadcrumb: showGroupCrumb
        ? [home, sectionCrumb, { label: group.heading, href: section.href }, { label: link.label, href: link.href }]
        : [home, sectionCrumb, { label: link.label, href: link.href }],
    }));
  });

  return [overviewPage, ...leafPages];
});

export function findSitePage(slug: string): SitePage | undefined {
  return sitePages.find((page) => page.slug === slug);
}
