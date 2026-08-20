import Image from 'next/image';
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CircleDollarSign,
  Facebook,
  Globe2,
  GraduationCap,
  Instagram,
  Landmark,
  LayoutGrid,
  LineChart,
  Linkedin,
  LockKeyhole,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Twitter,
  UserRound,
  Users,
  WalletCards,
  Youtube,
} from 'lucide-react';
import {
  AnimatedStat,
  FooterDisclosure,
  MarketExplorer,
  MarketTicker,
  MobileStickyCta,
  SiteHeader,
} from './Interactive';
import { Hero } from './Hero';
import { footerGroups } from './navigation';
import { ScrollRevealSection } from './ScrollRevealSection';
import SpecularButton from './SpecularButton';
import { tickerItems } from './data';

function TrustStrip() {
  const items = [
    { value: '400k+', label: 'active traders', icon: Users },
    { value: '17k+', label: 'global markets', icon: Globe2 },
    { value: '24/5', label: 'trader support', icon: ShieldCheck },
    { value: '18', label: 'global offices', icon: BarChart3 },
  ];

  return (
    <section className="trust-strip" id="stats">
      <div className="site-shell trust-grid" aria-label="Axquotes at a glance">
        {items.map(({ value, label, icon: Icon }) => (
          <div className="trust-item" key={label}>
            <Icon aria-hidden="true" />
            <p><AnimatedStat value={value} /><span>{label}</span></p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeesSection() {
  const fees = [
    { value: '$1', title: 'Commission on stocks.', description: 'Unlimited trades. No management fees, ever.' },
    { value: '0%', title: 'Commission on ETFs.', description: 'Build a diversified portfolio with leading ETFs and zero broker fees.' },
    { value: 'From 0.3%', title: 'Trade more crypto, pay less.', description: 'Starting at 0.3% for high-volume traders and capped at 1% for everyone.' },
  ];

  return (
    <ScrollRevealSection className="section fees-section" id="fees" variant="fees">
      <div className="site-shell">
        <div className="fees-intro">
          <h2>
            <span className="section-reveal-line"><span className="section-reveal-line-inner">No hidden fees.</span></span>
            <span className="section-reveal-line"><span className="section-reveal-line-inner section-heading-accent">Just better investing.</span></span>
          </h2>
        </div>
        <div className="fees-grid section-reveal-panel">
          {fees.map(({ value, title, description }) => (
            <div className="fee-card" key={title}>
              <span className="fee-card-value">{value}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <p className="fees-note">For the complete fee schedule in plain numbers, see the <a href="#">fees page</a>.</p>
      </div>
    </ScrollRevealSection>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      icon: CircleDollarSign,
      value: 'Cashback',
      title: 'More activity. More back.',
      description: 'Earn monthly cash rebates based on your trading activity.',
      cta: 'Read more',
      tone: 'green',
      image: {
        src: '/images/cashback-reward.webp',
        alt: 'A man at a desk holding up cash in front of a laptop',
        sizes: '(max-width: 680px) calc(100vw - 2rem), (max-width: 920px) 45vw, 55vw',
      },
    },
    {
      icon: Users,
      value: 'Referral rewards',
      title: 'Trading is better with company.',
      description: 'Invite a friend and you can both earn a trading reward.',
      cta: 'Read more',
      tone: 'blue',
      image: {
        src: '/images/referral-collaboration.webp',
        alt: 'Two colleagues collaborating over a laptop',
        sizes: '(max-width: 680px) calc(100vw - 2rem), (max-width: 920px) 35vw, 15vw',
      },
    },
    {
      icon: BarChart3,
      value: 'Volume rebates',
      title: 'Scale up. Pay less.',
      description: 'Unlock lower effective costs as your monthly volume grows.',
      cta: 'Read more',
      tone: 'coral',
      image: {
        src: '/images/volume-market-data.webp',
        alt: 'Market data and candlestick charts displayed on trading monitors',
        sizes: '(max-width: 680px) calc(100vw - 2rem), (max-width: 920px) 35vw, 15vw',
      },
    },
  ];

  return (
    <ScrollRevealSection className="section benefits-section" id="benefits" variant="benefits">
      <div className="site-shell">
        <div className="benefits-intro">
          <h2>
            <span className="section-reveal-line"><span className="section-reveal-line-inner">Built to reward</span></span>
            <span className="section-reveal-line"><span className="section-reveal-line-inner section-heading-accent">your progress.</span></span>
          </h2>
          <p className="section-reveal-support">Strong tools matter. So do benefits that keep pace as you become a more active trader.</p>
        </div>
        <div className="benefits-stage section-reveal-panel">
          <div className="benefits-grid">
            {benefits.map(({ value, title, description, cta, tone, image }) => (
              <article className={`benefit-panel benefit-${tone}`} key={value}>
                <div className={`benefit-visual${image ? ' benefit-photo' : ''}`} data-mark={value}>
                  {image && <Image src={image.src} alt={image.alt} fill sizes={image.sizes} />}
                </div>
                <div className="benefit-copy">
                  <span>{value}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <a className="benefit-cta" href="#join">{cta} <ArrowRight aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="benefits-register section-reveal-panel">
          <SpecularButton href="/auth" radius={999} tint="#d62d47" tintOpacity={0.15} baseColor="#d62d47" lineColor="#ffffff" textColor="#ffffff">Register now <ArrowRight aria-hidden="true" /></SpecularButton>
        </div>
      </div>
    </ScrollRevealSection>
  );
}

type PlatformCandle = { open: number; close: number; high: number; low: number };

type PlatformDevice = {
  variant: 'left' | 'center' | 'right';
  instrument: (typeof tickerItems)[number];
  candles: PlatformCandle[];
  sell: string;
  buy: string;
};

function PlatformDeviceMock({ instrument, candles, sell, buy }: Pick<PlatformDevice, 'instrument' | 'candles' | 'sell' | 'buy'>) {
  return (
    <div className="device-screen">
      <div className="device-app-bar">
        <span>Trade</span>
        <span className="device-balance-pill">0.00 USD</span>
      </div>
      <div className="device-tabs">
        <span>1D</span>
        <span className="active">1W</span>
        <span>1M</span>
        <span>1Y</span>
      </div>
      <div className="device-chart">
        <div className="device-chart-header">
          <div>
            <span className="device-chart-symbol">{instrument.symbol}</span>
            <strong>{instrument.price}</strong>
          </div>
          <span className={instrument.direction === 'up' ? 'positive' : 'negative'}>{instrument.change}</span>
        </div>
        <svg className="device-chart-plot" viewBox="0 0 140 100" preserveAspectRatio="none" aria-hidden="true">
          {candles.map(({ open, close, high, low }, index) => {
            const up = close >= open;
            const cx = index * 10 + 5;
            const bodyTop = 100 - Math.max(open, close);
            const bodyHeight = Math.max(Math.abs(close - open), 2);
            return (
              <g key={`candle-${index}`} className={up ? 'candle-up' : 'candle-down'}>
                <line x1={cx} x2={cx} y1={100 - high} y2={100 - low} />
                <rect x={cx - 3} y={bodyTop} width={6} height={bodyHeight} />
              </g>
            );
          })}
        </svg>
        <div className="device-chart-actions">
          <button type="button" className="device-chart-sell"><span>Sell</span><strong>{sell}</strong></button>
          <button type="button" className="device-chart-buy"><span>Buy</span><strong>{buy}</strong></button>
        </div>
      </div>
      <div className="device-tabbar">
        <span><LayoutGrid aria-hidden="true" /></span>
        <span className="active"><LineChart aria-hidden="true" /></span>
        <span><Globe2 aria-hidden="true" /></span>
        <span><BarChart3 aria-hidden="true" /></span>
        <span><UserRound aria-hidden="true" /></span>
      </div>
    </div>
  );
}

function PlatformSection() {
  const features = [
    { icon: Smartphone, title: 'Trade everywhere', description: 'Web and mobile stay in sync.' },
    { icon: LineChart, title: 'Advanced charting', description: 'Indicators, drawing tools, and flexible views.' },
    { icon: ShieldCheck, title: 'Control your risk', description: 'Stops, limits, and real-time margin visibility.' },
  ];

  const devices: PlatformDevice[] = [
    {
      variant: 'left',
      instrument: tickerItems[1],
      sell: '64,279.8',
      buy: '64,283.8',
      candles: [
        { open: 35, close: 55, high: 60, low: 28 },
        { open: 55, close: 38, high: 58, low: 32 },
        { open: 38, close: 62, high: 66, low: 34 },
        { open: 62, close: 45, high: 65, low: 40 },
        { open: 45, close: 70, high: 74, low: 42 },
        { open: 70, close: 50, high: 72, low: 46 },
        { open: 50, close: 75, high: 78, low: 47 },
        { open: 75, close: 58, high: 77, low: 54 },
        { open: 58, close: 40, high: 60, low: 35 },
        { open: 40, close: 65, high: 68, low: 36 },
        { open: 65, close: 48, high: 67, low: 44 },
        { open: 48, close: 72, high: 75, low: 45 },
        { open: 72, close: 55, high: 74, low: 50 },
        { open: 55, close: 68, high: 70, low: 48 },
      ],
    },
    {
      variant: 'center',
      instrument: tickerItems[0],
      sell: '5,420.9',
      buy: '5,421.9',
      candles: [
        { open: 38, close: 50, high: 54, low: 34 },
        { open: 50, close: 42, high: 53, low: 38 },
        { open: 42, close: 58, high: 61, low: 40 },
        { open: 58, close: 48, high: 60, low: 44 },
        { open: 48, close: 64, high: 67, low: 45 },
        { open: 64, close: 55, high: 66, low: 50 },
        { open: 55, close: 70, high: 73, low: 52 },
        { open: 70, close: 60, high: 72, low: 56 },
        { open: 60, close: 74, high: 76, low: 58 },
        { open: 74, close: 63, high: 75, low: 60 },
        { open: 63, close: 48, high: 65, low: 44 },
        { open: 48, close: 58, high: 60, low: 43 },
        { open: 58, close: 45, high: 60, low: 40 },
        { open: 45, close: 52, high: 55, low: 38 },
      ],
    },
    {
      variant: 'right',
      instrument: tickerItems[2],
      sell: '1.0841',
      buy: '1.0843',
      candles: [
        { open: 55, close: 40, high: 58, low: 35 },
        { open: 40, close: 58, high: 60, low: 36 },
        { open: 58, close: 45, high: 60, low: 40 },
        { open: 45, close: 62, high: 64, low: 42 },
        { open: 62, close: 48, high: 64, low: 44 },
        { open: 48, close: 65, high: 67, low: 45 },
        { open: 65, close: 50, high: 66, low: 46 },
        { open: 50, close: 35, high: 52, low: 30 },
        { open: 35, close: 55, high: 58, low: 32 },
        { open: 55, close: 42, high: 57, low: 38 },
        { open: 42, close: 60, high: 62, low: 39 },
        { open: 60, close: 46, high: 61, low: 42 },
        { open: 46, close: 58, high: 59, low: 40 },
        { open: 58, close: 44, high: 60, low: 38 },
      ],
    },
  ];

  return (
    <ScrollRevealSection className="section platform-section" id="platform" variant="platform">
      <div className="site-shell platform-layout">
        <div className="platform-copy">
          <h2>
            <span className="section-reveal-line"><span className="section-reveal-line-inner">Know the market.</span></span>
            <span className="section-reveal-line"><span className="section-reveal-line-inner section-heading-accent">Trade instantly.</span></span>
          </h2>
          <p className="section-reveal-support">Fast execution meets serious analysis in a platform that stays clear, even when markets do not.</p>
          <div className="platform-panel section-reveal-panel">
            <div className="platform-features">
              {features.map(({ icon: Icon, title, description }) => (
                <div className="platform-feature" key={title}><Icon aria-hidden="true" /><p><strong>{title}</strong><span>{description}</span></p></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="platform-visual" aria-label="Illustration of the Axquotes app showing live trading charts for three different markets, each with buy and sell actions">
        <div className="device-cluster">
          {devices.map((device) => (
            <div className={`device-slot device-slot-${device.variant}`} key={device.variant}>
              <div className={`device-frame device-phone device-phone-${device.variant}`}>
                <div className="device-notch" />
                <PlatformDeviceMock instrument={device.instrument} candles={device.candles} sell={device.sell} buy={device.buy} />
              </div>
            </div>
          ))}
          <div className="device-glow" aria-hidden="true" />
          <SpecularButton href="#join" radius={999} tint="#d62d47" tintOpacity={1} baseColor="#d62d47" lineColor="#ffffff" textColor="#ffffff" className="platform-cta">Explore the platform <ArrowRight aria-hidden="true" /></SpecularButton>
        </div>
      </div>
    </ScrollRevealSection>
  );
}

type AccountDevice = {
  variant: 'left' | 'center' | 'right';
  plan: 'Standard' | 'Pro' | 'VIP';
  balance: string;
  change: string;
  equity: string;
  margin: string;
  free: string;
};

const accountPlans: AccountDevice['plan'][] = ['Standard', 'Pro', 'VIP'];

function AccountDeviceMock({ plan, balance, change, equity, margin, free }: Omit<AccountDevice, 'variant'>) {
  return (
    <div className="device-screen">
      <div className="device-app-bar">
        <span>Account</span>
        <WalletCards aria-hidden="true" className="device-app-icon" />
      </div>
      <div className="device-tabs">
        {accountPlans.map((tab) => (
          <span key={tab} className={tab === plan ? 'active' : undefined}>{tab}</span>
        ))}
      </div>
      <div className="device-account">
        <div className="device-chart-header device-account-header">
          <div>
            <span className="device-chart-symbol">Account balance</span>
            <strong>{balance}</strong>
          </div>
          <span className="positive">{change}</span>
        </div>
        <div className="device-account-metrics">
          <div><span>Equity</span><strong>{equity}</strong></div>
          <div><span>Margin</span><strong className="positive">{margin}</strong></div>
          <div><span>Free</span><strong>{free}</strong></div>
        </div>
        <div className="device-account-actions">
          <div><span><SlidersHorizontal aria-hidden="true" /></span><small>Trade</small></div>
          <div><span className="coral"><ArrowDownToLine aria-hidden="true" /></span><small>Deposit</small></div>
          <div><span><ArrowUpRight aria-hidden="true" /></span><small>Withdraw</small></div>
          <div><span><ArrowLeftRight aria-hidden="true" /></span><small>Transfer</small></div>
        </div>
      </div>
      <div className="device-tabbar">
        <span><LayoutGrid aria-hidden="true" /></span>
        <span><LineChart aria-hidden="true" /></span>
        <span><Globe2 aria-hidden="true" /></span>
        <span><BarChart3 aria-hidden="true" /></span>
        <span className="active"><UserRound aria-hidden="true" /></span>
      </div>
    </div>
  );
}

function JoinSection() {
  const accountDevices: AccountDevice[] = [
    { variant: 'left', plan: 'Pro', balance: '$58,240.00', change: '+1.8%', equity: '$58,912', margin: '512%', free: '$57,120' },
    { variant: 'center', plan: 'Standard', balance: '$24,500.00', change: '+2.4%', equity: '$24,712', margin: '482%', free: '$23,940' },
    { variant: 'right', plan: 'VIP', balance: '$146,380.00', change: '+3.1%', equity: '$147,225', margin: '624%', free: '$144,860' },
  ];

  return (
    <ScrollRevealSection className="section join-section" id="join" variant="join">
      <div className="site-shell join-layout">
        <div className="join-copy">
          <h2>
            <span className="section-reveal-line"><span className="section-reveal-line-inner"><span className="section-heading-accent">Ready</span> when</span></span>
            <span className="section-reveal-line"><span className="section-reveal-line-inner">you are.</span></span>
          </h2>
          <p className="section-reveal-support">Open your account, find your market, and take your next step with a platform built to keep the picture clear.</p>
        </div>
      </div>
      <div className="join-visual" aria-label="Illustration of the Axquotes app showing Standard, Pro, and VIP account balances and quick actions across three mobile devices">
        <div className="device-cluster">
          {accountDevices.map((device) => (
            <div className={`device-slot device-slot-${device.variant}`} key={device.variant}>
              <div className={`device-frame device-phone device-phone-${device.variant}`}>
                <div className="device-notch" />
                <AccountDeviceMock plan={device.plan} balance={device.balance} change={device.change} equity={device.equity} margin={device.margin} free={device.free} />
              </div>
            </div>
          ))}
          <div className="device-glow" aria-hidden="true" />
          <SpecularButton href="/auth" radius={999} tint="#d62d47" tintOpacity={1} baseColor="#d62d47" lineColor="#ffffff" textColor="#ffffff" className="join-cta">Yes, I&apos;m Ready! <ArrowRight aria-hidden="true" /></SpecularButton>
        </div>
      </div>
    </ScrollRevealSection>
  );
}

function TrustSection() {
  const trustCards = [
    {
      icon: Landmark,
      title: 'Regulated entities.',
      description: 'Wherever you sign up, we answer to local regulators. No exceptions.',
      tags: ['FCA', 'CySEC', 'ASIC'],
    },
    {
      icon: LockKeyhole,
      title: 'Your money, held separately',
      description: 'Segregated accounts at some of the world’s largest banks. Not a cent sits on our balance sheet.',
      tags: ['Barclays', 'Deutsche', 'BNY Mellon'],
    },
    {
      icon: ShieldCheck,
      title: 'Investor protection.',
      description: 'Our clients are protected up to £85,000, and in some cases up to $1,000,000.',
      tags: ['FSCS', 'ICF', 'Lloyd’s of London'],
    },
  ];

  return (
    <ScrollRevealSection className="section trust-section" id="trust" variant="trust">
      <div className="site-shell">
        <h2 className="trust-heading">
          <span className="section-reveal-line"><span className="section-reveal-line-inner">Trusted by 40M+ users. <span className="section-heading-accent">Obviously.</span></span></span>
        </h2>
        <div className="trust-cards section-reveal-panel">
          {trustCards.map(({ icon: Icon, title, description, tags }) => (
            <div className="trust-card" key={title}>
              <span className="trust-card-icon"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="trust-card-tags">
                {tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}

function LearnSection() {
  return (
    <ScrollRevealSection className="section learn-section" id="learn" variant="learn">
      <div className="site-shell">
        <div className="section-intro split-intro">
          <div>
            <h2>
              <span className="section-reveal-line"><span className="section-reveal-line-inner">Learn the market.</span></span>
              <span className="section-reveal-line"><span className="section-reveal-line-inner">Then make <span className="section-heading-accent">your move.</span></span></span>
            </h2>
          </div>
          <div><p className="section-reveal-support">Build practical confidence with timely analysis, clear foundations, and focused platform guides.</p><a href="#" className="learn-hub-link">Visit the learning hub <ArrowRight aria-hidden="true" /></a></div>
        </div>
        <div className="learning-layout section-reveal-panel">
          <article className="learning-feature">
            <Image
              src="/images/market-briefing.webp"
              alt="Stock market trend line and volume chart"
              fill
              sizes="(max-width: 1120px) 100vw, 60vw"
            />
            <div><span>Daily briefing · 6 min</span><h3>What is moving markets today?</h3><p>Your morning read on overnight moves, key levels, and the events ahead.</p><a href="#">Read the briefing <ArrowRight aria-hidden="true" /></a></div>
          </article>
          <div className="learning-stack">
            <article className="learning-row coral-row"><GraduationCap aria-hidden="true" /><div><span>Course · Beginner</span><h3>Start with the essentials</h3><a href="#">Begin course <ArrowRight aria-hidden="true" /></a></div></article>
            <article className="learning-row blue-row"><BookOpen aria-hidden="true" /><div><span>Masterclass · 42 min</span><h3>Read price action clearly</h3><a href="#">Watch now <ArrowRight aria-hidden="true" /></a></div></article>
          </div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}

const footerSocialLinks = [
  { label: 'X', Icon: Twitter },
  { label: 'Instagram', Icon: Instagram },
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'Facebook', Icon: Facebook },
  { label: 'YouTube', Icon: Youtube },
];

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.7 12.6c0-2.1 1.7-3.2 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2-1.4 2.5-.4 6.2 1.1 8.3.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4-.1-.1-2.2-.9-2.3-3.2Z" />
      <path d="M14.4 6.1c.6-.7 1-1.7.9-2.7-.9.1-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6.9.1 1.9-.5 2.5-1.2Z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M5 3.6c0-.6.7-1 1.2-.7l13 8.4c.5.3.5 1 0 1.4l-13 8.4c-.5.3-1.2 0-1.2-.7V3.6Z" />
    </svg>
  );
}

export function SiteFooter() {
  const groups = footerGroups;

  return (
    <footer className="site-footer" id="company">
      <div className="site-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <p>A market intelligence platform giving 400k+ active traders access to 17,000+ global markets.</p>
            <div className="footer-social">
              <span>Find us on</span>
              <div className="footer-social-icons">
                {footerSocialLinks.map(({ label, Icon }) => (
                  <a href="#" key={label} aria-label={`Axquotes on ${label}`}><Icon aria-hidden="true" /></a>
                ))}
              </div>
            </div>
            <div className="footer-app-badges">
              <a href="#" className="footer-app-badge">
                <AppleGlyph />
                <span><small>Download on the</small>App Store</span>
              </a>
              <a href="#" className="footer-app-badge">
                <PlayGlyph />
                <span><small>GET IT ON</small>Google Play</span>
              </a>
            </div>
          </div>
          <div className="footer-link-grid desktop-footer-group">
            {groups.map((group) => (
              <div className="footer-group" key={group.heading}>
                <h3>{group.heading}</h3>
                {group.links.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
              </div>
            ))}
          </div>
          <div className="mobile-footer-groups">
            {groups.map((group) => (
              <FooterDisclosure title={group.heading} key={group.heading}>
                {group.links.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
              </FooterDisclosure>
            ))}
          </div>
        </div>
        <div className="footer-legal">
          <p>CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.</p>
          <p>The market prices and account values shown on this page are illustrative interface examples and do not represent live prices or investment performance.</p>
        </div>
        <div className="footer-bottom text-center"><span>© 2026 Axquotes. All rights reserved.</span></div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <div className="markets-stage">
          <MarketTicker />
          <TrustStrip />
          <FeesSection />

          <ScrollRevealSection className="section markets-section" id="markets" variant="markets">
            <div className="site-shell">
              <div className="market-intro">
                <h2>
                  <span className="section-reveal-line"><span className="section-reveal-line-inner">Global markets.</span></span>
                  <span className="section-reveal-line"><span className="section-reveal-line-inner section-heading-accent">Your move.</span></span>
                </h2>
                <p className="section-reveal-support">Trade forex, indices, shares, commodities, and crypto — thousands of instruments across the world&rsquo;s biggest markets, all from one account.</p>
              </div>
              <div className="section-reveal-panel">
                <MarketExplorer />
              </div>
            </div>
          </ScrollRevealSection>
        </div>

        <BenefitsSection />
        <PlatformSection />

        <TrustSection />

        <LearnSection />

        <JoinSection />
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </>
  );
}
