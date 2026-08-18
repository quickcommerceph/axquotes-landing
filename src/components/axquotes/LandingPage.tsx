import Image from 'next/image';
import {
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  CircleDollarSign,
  Facebook,
  Globe2,
  GraduationCap,
  Instagram,
  LayoutGrid,
  LineChart,
  Linkedin,
  LockKeyhole,
  MousePointer2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Twitter,
  UserRound,
  Users,
  WalletCards,
  Zap,
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
import { ScrollRevealSection } from './ScrollRevealSection';
import { tickerItems } from './data';

function TrustStrip() {
  const items = [
    { value: '400k+', label: 'active traders', icon: Users },
    { value: '17k+', label: 'global markets', icon: Globe2 },
    { value: '24/5', label: 'trader support', icon: ShieldCheck },
    { value: '18', label: 'global offices', icon: BarChart3 },
  ];

  return (
    <section className="trust-strip" aria-label="Axquotes at a glance">
      <div className="site-shell trust-grid">
        {items.map(({ value, label, icon: Icon }) => (
          <div key={label}>
            <Icon aria-hidden="true" />
            <p><AnimatedStat value={value} /><span>{label}</span></p>
          </div>
        ))}
      </div>
    </section>
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
      cta: 'Register now',
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
            {benefits.map(({ icon: Icon, value, title, description, cta, tone, image }) => (
              <article className={`benefit-panel benefit-${tone}`} key={value}>
                <div className={`benefit-visual${image ? ' benefit-photo' : ''}`} data-mark={value}>
                  {image && <Image src={image.src} alt={image.alt} fill sizes={image.sizes} />}
                  <span><Icon aria-hidden="true" /></span>
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
      </div>
    </ScrollRevealSection>
  );
}

function PlatformSection() {
  const features = [
    { icon: Smartphone, title: 'Trade everywhere', description: 'Web and mobile stay in sync.' },
    { icon: LineChart, title: 'Advanced charting', description: 'Indicators, drawing tools, and flexible views.' },
    { icon: ShieldCheck, title: 'Control your risk', description: 'Stops, limits, and real-time margin visibility.' },
  ];

  return (
    <section className="section platform-section" id="platform">
      <div className="site-shell platform-layout">
        <div className="platform-copy">
          <h2>Know the market.<br /><span>Trade instantly.</span></h2>
          <p>Fast execution meets serious analysis in a platform that stays clear, even when markets do not.</p>
          <div className="platform-features">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title}><Icon aria-hidden="true" /><p><strong>{title}</strong><span>{description}</span></p></div>
            ))}
          </div>
          <a className="button button-white" href="#join">Explore the platform <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="platform-visual" aria-label="Illustration of the Axquotes app showing a live watchlist on a mobile device">
          <div className="device-frame device-phone">
            <div className="device-notch" />
            <div className="device-screen">
              <div className="device-app-bar">
                <span>Trade</span>
                <span className="device-balance-pill">0.00 USD</span>
              </div>
              <div className="device-tabs">
                <span className="active">Favorites</span>
                <span>Most traded</span>
                <span>Top movers</span>
              </div>
              <div className="device-watchlist">
                {tickerItems.map((item) => (
                  <div className="device-watchlist-row" key={item.symbol}>
                    <span className="device-watchlist-symbol">{item.symbol.slice(0, 2)}</span>
                    <span className="device-watchlist-name">{item.symbol}</span>
                    <span className="device-watchlist-price">
                      <strong>{item.price}</strong>
                      <small className={item.direction === 'up' ? 'positive' : 'negative'}>{item.change}</small>
                    </span>
                  </div>
                ))}
              </div>
              <div className="device-tabbar">
                <span><LayoutGrid aria-hidden="true" /></span>
                <span className="active"><LineChart aria-hidden="true" /></span>
                <span><Globe2 aria-hidden="true" /></span>
                <span><BarChart3 aria-hidden="true" /></span>
                <span><UserRound aria-hidden="true" /></span>
              </div>
            </div>
          </div>
          <div className="order-filled"><Check aria-hidden="true" /><div><small>ORDER FILLED</small><strong>US 500</strong><span>1.00 contract at 5,421.4</span></div></div>
        </div>
      </div>
    </section>
  );
}

function LearnSection() {
  return (
    <section className="section learn-section" id="learn">
      <div className="site-shell">
        <div className="section-intro split-intro">
          <div><h2>Learn the market.<br />Then make your move.</h2></div>
          <div><p>Build practical confidence with timely analysis, clear foundations, and focused platform guides.</p><a href="#">Visit the learning hub <ArrowRight aria-hidden="true" /></a></div>
        </div>
        <div className="learning-layout">
          <article className="learning-feature">
            <div className="learning-radar"><span /><span /><span /><LineChart aria-hidden="true" /></div>
            <div><span>Daily briefing · 6 min</span><h3>What is moving markets today?</h3><p>Your morning read on overnight moves, key levels, and the events ahead.</p><a href="#">Read the briefing <ArrowRight aria-hidden="true" /></a></div>
          </article>
          <div className="learning-stack">
            <article className="learning-row coral-row"><GraduationCap aria-hidden="true" /><div><span>Course · Beginner</span><h3>Start with the essentials</h3><a href="#">Begin course <ArrowRight aria-hidden="true" /></a></div></article>
            <article className="learning-row blue-row"><BookOpen aria-hidden="true" /><div><span>Masterclass · 42 min</span><h3>Read price action clearly</h3><a href="#">Watch now <ArrowRight aria-hidden="true" /></a></div></article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const groups = [
    { title: 'Markets', links: ['Forex', 'Indices', 'Shares', 'Commodities', 'Cryptocurrencies'] },
    { title: 'Platform', links: ['Web trading', 'Mobile app', 'Pricing', 'Trading hours'] },
    { title: 'Learn', links: ['Trading academy', 'Market analysis', 'News and insights', 'Glossary'] },
    { title: 'Company', links: ['About Axquotes', 'Careers', 'Contact', 'Affiliates'] },
  ];

  return (
    <footer className="site-footer" id="company">
      <div className="site-shell">
        <div className="footer-lead">
          <p>Markets move. Move with them.</p>
          <a className="button button-coral" href="/auth">Create account</a>
        </div>
        <div className="footer-navigation">
          {groups.map((group) => (
            <div className="footer-group desktop-footer-group" key={group.title}>
              <h3>{group.title}</h3>
              {group.links.map((link) => <a href="#" key={link}>{link}</a>)}
            </div>
          ))}
          <div className="mobile-footer-groups">
            {groups.map((group) => (
              <FooterDisclosure title={group.title} key={group.title}>
                {group.links.map((link) => <a href="#" key={link}>{link}</a>)}
              </FooterDisclosure>
            ))}
          </div>
        </div>
        <div className="footer-legal">
          <p>CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.</p>
          <p>The market prices and account values shown on this page are illustrative interface examples and do not represent live prices or investment performance.</p>
        </div>
        <div className="footer-bottom"><span>© 2026 Axquotes. All rights reserved.</span><div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div></div>
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

        <section className="section control-section">
          <div className="site-shell control-layout">
            <div className="control-copy">
              <h2>Confidence comes from control.</h2>
              <p>See your positions, limits, and exposure clearly, so every decision stays deliberate, from your first trade to your last.</p>
            </div>
            <div className="control-list">
              <div><Zap aria-hidden="true" /><p><strong>Move without friction</strong><span>Fast, focused execution when timing matters.</span></p></div>
              <div><LockKeyhole aria-hidden="true" /><p><strong>Know your exposure</strong><span>Stops, limits, and margin information stay close.</span></p></div>
              <div><MousePointer2 aria-hidden="true" /><p><strong>Keep the screen clear</strong><span>Useful detail without unnecessary noise.</span></p></div>
              <div><WalletCards aria-hidden="true" /><p><strong>One connected account</strong><span>Markets, positions, and insights move together.</span></p></div>
            </div>
          </div>
        </section>

        <LearnSection />

        <section className="join-section" id="join">
          <div className="site-shell join-panel">
            <div className="join-visual" aria-label="Illustration of an Axquotes member account showing a deposit balance">
              <div className="deposit-card">
                <div className="deposit-card-header"><span>Standard account</span><WalletCards aria-hidden="true" /></div>
                <div className="deposit-card-tags"><span>Real</span><span>MT5</span><span>Standard</span></div>
                <div className="deposit-card-balance"><small>Account balance</small><strong>$24,500.00</strong></div>
                <div className="deposit-card-actions">
                  <div><span><SlidersHorizontal aria-hidden="true" /></span><small>Trade</small></div>
                  <div><span className="coral"><ArrowDownToLine aria-hidden="true" /></span><small>Deposit</small></div>
                  <div><span><ArrowUpRight aria-hidden="true" /></span><small>Withdraw</small></div>
                  <div><span><ArrowLeftRight aria-hidden="true" /></span><small>Transfer</small></div>
                </div>
              </div>
            </div>
            <div className="join-copy">
              <Sparkles aria-hidden="true" />
              <h2>Ready when<br /><span>you are.</span></h2>
              <p>Open your account, find your market, and take your next step with a platform built to keep the picture clear.</p>
              <a className="button button-coral" href="/auth">Create your account <ArrowRight aria-hidden="true" /></a>
              <span className="join-note">No account flow is connected in this preview.</span>
              <div className="social-links" aria-label="Axquotes on social media">
                <a href="#" aria-label="Axquotes on X"><Twitter aria-hidden="true" /></a>
                <a href="#" aria-label="Axquotes on Instagram"><Instagram aria-hidden="true" /></a>
                <a href="#" aria-label="Axquotes on LinkedIn"><Linkedin aria-hidden="true" /></a>
                <a href="#" aria-label="Axquotes on Facebook"><Facebook aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </>
  );
}
