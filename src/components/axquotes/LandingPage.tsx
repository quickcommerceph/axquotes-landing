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
    <section className="border-b border-white/10 bg-transparent text-white" id="stats">
      <div className="site-shell grid grid-cols-4 max-nav:grid-cols-2" aria-label="Axquotes at a glance">
        {items.map(({ value, label, icon: Icon }) => (
          <div
            className="min-h-[6.8rem] flex items-center justify-center gap-4 max-mobile:min-h-[5.4rem] max-mobile:p-[0.8rem] max-mobile:justify-start max-nav:[&:nth-child(-n+2)]:border-b max-nav:[&:nth-child(-n+2)]:border-white/10"
            key={label}
          >
            <Icon aria-hidden="true" className="w-[1.35rem] text-blue [stroke-width:1.7] max-mobile:w-[1.25rem]" />
            <p className="flex flex-col m-0">
              <AnimatedStat value={value} />
              <span className="text-[#aeb1ba] text-[0.62rem] font-bold">{label}</span>
            </p>
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
    <ScrollRevealSection
      className="section fees-section bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--green)_13%,transparent),transparent_30rem)] border-b border-white/8"
      id="fees"
      variant="fees"
    >
      <div className="site-shell">
        <div className="max-w-[44rem] mx-auto mt-0 mb-[clamp(2.5rem,5vw,3.5rem)] text-center">
          <h2 className="m-0 font-heading text-[clamp(2.4rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.035em] max-mobile:text-[clamp(2.1rem,10vw,2.8rem)]">
            <span className="section-reveal-line"><span className="section-reveal-line-inner">No hidden fees.</span></span>
            <span className="section-reveal-line"><span className="section-reveal-line-inner section-heading-accent">Just better investing.</span></span>
          </h2>
        </div>
        <div className="section-reveal-panel grid grid-cols-3 gap-5 max-nav:grid-cols-1">
          {fees.map(({ value, title, description }) => (
            <div
              className="fee-card relative overflow-hidden p-[clamp(1.75rem,2.6vw,2.25rem)] border border-white/12 rounded-2xl bg-[linear-gradient(160deg,rgba(17,150,107,0.14),rgba(8,9,13,0)_60%)] bg-ink max-mobile:p-6"
              key={title}
            >
              <span className="block mb-[1.6rem] font-heading text-[clamp(2.2rem,4vw,2.75rem)] font-extrabold tracking-[-0.03em] text-green max-mobile:mb-[1.1rem]">{value}</span>
              <h3 className="mt-0 mb-2 font-heading text-[1.05rem] font-normal tracking-[-0.01em] text-white">{title}</h3>
              <p className="m-0 text-[#aeb1ba] text-[0.88rem] leading-[1.65]">{description}</p>
            </div>
          ))}
        </div>
        <p className="fees-note mt-[clamp(2rem,4vw,2.5rem)] mx-auto mb-0 max-w-[40rem] text-[#9699a3] text-[0.78rem] text-center">
          For the complete fee schedule in plain numbers, see the <a href="#" className="text-white font-bold underline underline-offset-[0.2em]">fees page</a>.
        </p>
      </div>
    </ScrollRevealSection>
  );
}

const benefitToneStyles = {
  green: { visual: 'bg-[#0f3128] text-[#66d8ad]', copySpan: 'text-[#78d8b4]', cta: 'text-[#78d8b4]', photoPosition: 'object-[50%_42%]' },
  blue: { visual: 'bg-[#102a36] text-[#67c9ee]', copySpan: 'text-[#8dd9f5]', cta: 'text-[#67c9ee]', photoPosition: 'object-[52%_42%]' },
  coral: { visual: 'bg-[#32191e] text-[#ff7a8d]', copySpan: 'text-[#ff8a9a]', cta: 'text-[#ff8a9a]', photoPosition: 'object-[64%_50%]' },
} as const;

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
    <ScrollRevealSection
      className="section benefits-section overflow-hidden border-t border-white/9 bg-[radial-gradient(circle_at_50%_4%,color-mix(in_srgb,var(--blue)_14%,transparent),transparent_34rem)] bg-[#08090d] text-white"
      id="benefits"
      variant="benefits"
    >
      <div className="site-shell">
        <div className="max-w-[50rem] mx-auto mt-0 mb-[clamp(2rem,4vw,3rem)] text-center">
          <h2 className="m-0 font-heading text-[clamp(2.4rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.035em] max-mobile:text-[clamp(2.1rem,10vw,2.8rem)]">
            <span className="section-reveal-line"><span className="section-reveal-line-inner">Built to reward</span></span>
            <span className="section-reveal-line"><span className="section-reveal-line-inner section-heading-accent">your progress.</span></span>
          </h2>
          <p className="section-reveal-support max-w-[40rem] mx-auto mt-[1.7rem] mb-0 text-[#b8bbc4] text-[clamp(1.0625rem,1.4vw,1.2625rem)] leading-[1.7] max-mobile:text-[1.0125rem]">
            Strong tools matter. So do benefits that keep pace as you become a more active trader.
          </p>
        </div>
        <div className="section-reveal-panel overflow-hidden rounded-2xl bg-[#2f3139] shadow-[1rem_2.4rem_5rem_rgba(0,0,0,0.34)] max-mobile:rounded-[0.8rem]">
          <div className="grid grid-cols-3 gap-px max-nav:grid-cols-1">
            {benefits.map(({ value, title, description, cta, tone, image }) => {
              const toneStyle = benefitToneStyles[tone as keyof typeof benefitToneStyles];
              return (
                <article
                  className="benefit-panel group/panel min-w-0 overflow-hidden grid grid-rows-[15rem_1fr] bg-[#0b0d12] text-white max-nav:[grid-template:minmax(17rem,auto)/minmax(0,0.9fr)_minmax(0,1.1fr)] max-mobile:[grid-template:minmax(12.5rem,auto)_auto/1fr]"
                  key={value}
                >
                  <div
                    className={`benefit-visual relative min-w-0 grid place-items-center overflow-hidden isolate after:content-[''] after:absolute after:inset-[1.35rem] after:border after:border-current after:rounded-[0.8rem] ${image ? 'after:z-[2] after:opacity-[0.28]' : 'after:-z-[1] after:opacity-[0.055]'} ${toneStyle.visual}`}
                    data-mark={value}
                  >
                    {image && (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes={image.sizes}
                        className={`relative z-0 object-cover [filter:saturate(0.62)_contrast(1.08)_brightness(0.74)] scale-[1.02] [transition:filter_420ms_ease,transform_520ms_var(--ease-out)] group-hover/panel:[filter:saturate(0.78)_contrast(1.08)_brightness(0.82)] group-hover/panel:scale-[1.055] ${toneStyle.photoPosition}`}
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-[clamp(1.75rem,3vw,2.75rem)] max-mobile:min-h-[13.5rem] max-mobile:p-7">
                    <span className={`text-[0.64rem] font-extrabold uppercase tracking-[0.08em] ${toneStyle.copySpan}`}>{value}</span>
                    <h3 className="max-w-[16ch] mt-[0.85rem] mb-[0.8rem] font-heading text-[clamp(1.7rem,2.6vw,2.6rem)] font-normal leading-[1.04] tracking-[-0.035em] max-mobile:text-[1.5rem]">{title}</h3>
                    <p className="max-w-[35rem] m-0 text-[#b8bbc4] text-base leading-[1.7]">{description}</p>
                    <a href="#join" className={`group/cta inline-flex items-center gap-2 mt-4 text-[0.78rem] font-extrabold ${toneStyle.cta}`}>
                      {cta} <ArrowRight aria-hidden="true" className="w-[0.9rem] transition-transform duration-[220ms] ease-[var(--ease-out)] group-hover/cta:translate-x-[3px]" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="section-reveal-panel flex justify-center mt-[clamp(2rem,4vw,2.75rem)]">
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

const deviceTabActive = 'relative text-ink after:content-[\'\'] after:absolute after:left-0 after:right-0 after:-bottom-4 after:h-0.5 after:bg-coral';

const deviceSlotVariantStyles = {
  left: 'z-[2] mr-[-3.25rem] max-mobile:hidden',
  center: 'z-[3]',
  right: 'z-[2] ml-[-3.25rem] max-mobile:hidden',
} as const;

const devicePhoneVariantStyles = {
  left: 'w-[14.5rem] h-[25rem] [transform-origin:bottom_right] [transform:perspective(1200px)_rotateY(30deg)_rotateZ(-3deg)] max-mobile:w-[min(15.5rem,calc(100vw-4rem))] max-mobile:h-[26rem] max-mobile:transform-none',
  center: 'w-[19rem] h-[32rem] [transform:perspective(1200px)_rotateY(0deg)] max-mobile:w-[min(15.5rem,calc(100vw-4rem))] max-mobile:h-[26rem] max-mobile:transform-none',
  right: 'w-[14.5rem] h-[25rem] [transform-origin:bottom_left] [transform:perspective(1200px)_rotateY(-30deg)_rotateZ(3deg)] max-mobile:w-[min(15.5rem,calc(100vw-4rem))] max-mobile:h-[26rem] max-mobile:transform-none',
} as const;

const deviceCtaClassName = 'absolute! inset-0 z-10 m-auto w-fit h-fit shadow-[0_18px_45px_rgba(0,0,0,0.55),0_4px_14px_rgba(0,0,0,0.35)] bg-[linear-gradient(145deg,var(--coral),#000)]! max-mobile:whitespace-nowrap max-mobile:px-5 max-mobile:py-[0.7rem] max-mobile:text-[0.88rem] max-mobile:[&_span]:gap-[0.45rem] max-mobile:[&_svg]:w-[0.9rem] max-mobile:[&_svg]:h-[0.9rem]';

function PlatformDeviceMock({ instrument, candles, sell, buy }: Pick<PlatformDevice, 'instrument' | 'candles' | 'sell' | 'buy'>) {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col rounded-[1.35rem] bg-mist text-ink">
      <div className="flex items-center justify-between pt-[2.2rem] px-[1.1rem] pb-[0.7rem] max-mobile:pt-[1.8rem]">
        <span className="font-heading text-[1.1rem] font-bold">Trade</span>
        <span className="py-[0.35rem] px-3 rounded-full bg-paper border border-line text-muted text-[0.6rem] font-extrabold">0.00 USD</span>
      </div>
      <div className="flex gap-4 pt-[0.9rem] px-[1.1rem] pb-4 border-b border-line text-muted text-[0.64rem] font-extrabold">
        <span>1D</span>
        <span className={deviceTabActive}>1W</span>
        <span>1M</span>
        <span>1Y</span>
      </div>
      <div className="flex-1 min-h-0 flex flex-col gap-[0.6rem] pt-[0.9rem] px-[1.1rem] pb-[1.1rem] max-mobile:pt-[0.7rem] max-mobile:px-[0.9rem] max-mobile:pb-[0.9rem] max-mobile:gap-[0.4rem]">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-[0.2rem]">
            <span className="text-muted text-[0.6rem] font-extrabold uppercase tracking-[0.04em]">{instrument.symbol}</span>
            <strong className="font-heading text-base [font-variant-numeric:tabular-nums] max-mobile:text-[0.88rem]">{instrument.price}</strong>
          </div>
          <span className={`text-[0.68rem] font-extrabold [font-variant-numeric:tabular-nums] ${instrument.direction === 'up' ? 'text-green' : 'text-coral-dark'}`}>{instrument.change}</span>
        </div>
        <svg className="flex-1 min-h-0 w-full [&_line]:[stroke-width:1.4]" viewBox="0 0 140 100" preserveAspectRatio="none" aria-hidden="true">
          {candles.map(({ open, close, high, low }, index) => {
            const up = close >= open;
            const cx = index * 10 + 5;
            const bodyTop = 100 - Math.max(open, close);
            const bodyHeight = Math.max(Math.abs(close - open), 2);
            const colorClass = up ? 'stroke-green fill-green' : 'stroke-coral-dark fill-coral-dark';
            return (
              <g key={`candle-${index}`}>
                <line x1={cx} x2={cx} y1={100 - high} y2={100 - low} className={colorClass} />
                <rect x={cx - 3} y={bodyTop} width={6} height={bodyHeight} className={colorClass} />
              </g>
            );
          })}
        </svg>
        <div className="grid grid-cols-2 gap-[0.6rem]">
          <button type="button" className="flex flex-col items-start gap-[0.2rem] p-[0.6rem_0.8rem] border-none rounded-[0.6rem] text-white font-[inherit] bg-coral-dark max-mobile:p-[0.5rem_0.6rem]">
            <span className="text-[0.56rem] font-extrabold uppercase tracking-[0.04em] opacity-85">Sell</span>
            <strong className="text-[0.78rem] [font-variant-numeric:tabular-nums]">{sell}</strong>
          </button>
          <button type="button" className="flex flex-col items-start gap-[0.2rem] p-[0.6rem_0.8rem] border-none rounded-[0.6rem] text-white font-[inherit] bg-green max-mobile:p-[0.5rem_0.6rem]">
            <span className="text-[0.56rem] font-extrabold uppercase tracking-[0.04em] opacity-85">Buy</span>
            <strong className="text-[0.78rem] [font-variant-numeric:tabular-nums]">{buy}</strong>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-around pt-[0.9rem] px-[1.1rem] pb-[max(0.9rem,env(safe-area-inset-bottom))] border-t border-line bg-paper">
        <span className="flex text-[#b7b9c1]"><LayoutGrid aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
        <span className="flex text-coral"><LineChart aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
        <span className="flex text-[#b7b9c1]"><Globe2 aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
        <span className="flex text-[#b7b9c1]"><BarChart3 aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
        <span className="flex text-[#b7b9c1]"><UserRound aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
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
    <ScrollRevealSection
      className="section platform-section relative overflow-hidden pb-[clamp(25rem,27vw,27rem)] bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--blue)_14%,transparent),transparent_32rem)] bg-ink text-white max-nav:pb-96 max-mobile:pb-[25rem]"
      id="platform"
      variant="platform"
    >
      <div className="site-shell flex flex-col items-center text-center">
        <div className="max-w-[40rem] mx-auto">
          <h2 className="mb-6 font-heading text-[clamp(2.4rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.035em] max-mobile:text-[clamp(2.1rem,10vw,2.8rem)]">
            <span className="section-reveal-line"><span className="section-reveal-line-inner">Know the market.</span></span>
            <span className="section-reveal-line"><span className="section-reveal-line-inner section-heading-accent">Trade instantly.</span></span>
          </h2>
          <p className="section-reveal-support max-w-[33rem] mx-auto text-[#aeb1bb] text-[clamp(1.0625rem,1.4vw,1.2625rem)] leading-[1.75]">
            Fast execution meets serious analysis in a platform that stays clear, even when markets do not.
          </p>
          <div className="section-reveal-panel flex flex-col items-center">
            <div className="grid grid-cols-3 gap-x-14 gap-y-6 w-full max-w-[42rem] my-6 py-4 max-mobile:grid-cols-1 max-mobile:gap-y-5">
              {features.map(({ icon: Icon, title, description }) => (
                <div className="platform-feature flex flex-col items-center gap-[0.3rem] text-center p-0" key={title}>
                  <Icon aria-hidden="true" className="w-[1.1rem] text-[#59c2ec]" />
                  <p className="flex flex-col items-center gap-[0.15rem] m-0">
                    <strong className="text-base">{title}</strong>
                    <span className="text-[#9296a0] text-[0.85rem]">{description}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 z-[1] flex justify-center"
        aria-label="Illustration of the Axquotes app showing live trading charts for three different markets, each with buy and sell actions"
      >
        <div className="relative flex items-end justify-center translate-y-[25%] max-nav:translate-y-[25%] max-nav:scale-[0.85] max-mobile:translate-y-[20%] max-mobile:scale-100">
          {devices.map((device) => (
            <div className={`device-slot relative ${deviceSlotVariantStyles[device.variant]}`} key={device.variant}>
              <div className={`relative z-[1] p-[0.85rem] rounded-[1.9rem] bg-[#0c0d13] shadow-[1rem_2.4rem_5rem_rgba(0,0,0,0.34),inset_0_0_0_1px_rgba(255,255,255,0.06)] ${devicePhoneVariantStyles[device.variant]}`}>
                <div className="absolute top-[0.85rem] left-1/2 z-[2] w-24 h-[1.4rem] rounded-full bg-[#0c0d13] -translate-x-1/2 max-mobile:w-[4.6rem]" />
                <PlatformDeviceMock instrument={device.instrument} candles={device.candles} sell={device.sell} buy={device.buy} />
              </div>
            </div>
          ))}
          <div className="device-glow absolute inset-0 z-[4] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.28)_45%,transparent_72%)]" aria-hidden="true" />
          <SpecularButton href="#join" radius={999} tint="#d62d47" tintOpacity={1} baseColor="#d62d47" lineColor="#ffffff" textColor="#ffffff" className={`platform-cta ${deviceCtaClassName}`}>
            Explore the platform <ArrowRight aria-hidden="true" />
          </SpecularButton>
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
    <div className="relative w-full h-full overflow-hidden flex flex-col rounded-[1.35rem] bg-mist text-ink">
      <div className="flex items-center justify-between pt-[2.2rem] px-[1.1rem] pb-[0.7rem] max-mobile:pt-[1.8rem]">
        <span className="font-heading text-[1.1rem] font-bold">Account</span>
        <WalletCards aria-hidden="true" className="w-[1.15rem] text-blue" />
      </div>
      <div className="flex gap-4 pt-[0.9rem] px-[1.1rem] pb-4 border-b border-line text-muted text-[0.64rem] font-extrabold">
        {accountPlans.map((tab) => (
          <span key={tab} className={tab === plan ? deviceTabActive : undefined}>{tab}</span>
        ))}
      </div>
      <div className="flex-1 min-h-0 flex flex-col gap-[0.9rem] pt-[0.9rem] px-[1.1rem] pb-[1.1rem] max-mobile:pt-[0.7rem] max-mobile:px-[0.9rem] max-mobile:pb-[0.9rem] max-mobile:gap-[0.7rem]">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-[0.2rem]">
            <span className="text-muted text-[0.6rem] font-extrabold uppercase tracking-[0.04em]">Account balance</span>
            <strong className="font-heading text-[1.55rem] [font-variant-numeric:tabular-nums] max-mobile:text-[1.3rem]">{balance}</strong>
          </div>
          <span className="text-[0.68rem] font-extrabold [font-variant-numeric:tabular-nums] text-green">{change}</span>
        </div>
        <div className="flex-1 min-h-0 grid grid-cols-3 items-center gap-[0.5rem] py-4 border-y border-line max-mobile:py-[0.7rem] max-mobile:gap-[0.35rem]">
          <div className="flex flex-col gap-[0.3rem]">
            <span className="text-muted text-[0.54rem] font-extrabold uppercase tracking-[0.03em] max-mobile:text-[0.5rem]">Equity</span>
            <strong className="font-heading text-[0.84rem] [font-variant-numeric:tabular-nums] max-mobile:text-[0.76rem]">{equity}</strong>
          </div>
          <div className="flex flex-col gap-[0.3rem] pl-[0.6rem] border-l border-line">
            <span className="text-muted text-[0.54rem] font-extrabold uppercase tracking-[0.03em] max-mobile:text-[0.5rem]">Margin</span>
            <strong className="font-heading text-[0.84rem] [font-variant-numeric:tabular-nums] max-mobile:text-[0.76rem] text-green">{margin}</strong>
          </div>
          <div className="flex flex-col gap-[0.3rem] pl-[0.6rem] border-l border-line">
            <span className="text-muted text-[0.54rem] font-extrabold uppercase tracking-[0.03em] max-mobile:text-[0.5rem]">Free</span>
            <strong className="font-heading text-[0.84rem] [font-variant-numeric:tabular-nums] max-mobile:text-[0.76rem]">{free}</strong>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[0.4rem]">
          <div className="flex flex-col items-center gap-[0.45rem]">
            <span className="w-[2.4rem] h-[2.4rem] grid place-items-center rounded-full bg-paper border border-line text-ink max-mobile:w-[2.15rem] max-mobile:h-[2.15rem]"><SlidersHorizontal aria-hidden="true" className="w-4 h-4" /></span>
            <small className="text-muted text-[0.56rem] font-bold">Trade</small>
          </div>
          <div className="flex flex-col items-center gap-[0.45rem]">
            <span className="w-[2.4rem] h-[2.4rem] grid place-items-center rounded-full bg-coral-action border border-coral-action text-white shadow-[0_0.6rem_1.4rem_rgba(185,35,58,0.22)] max-mobile:w-[2.15rem] max-mobile:h-[2.15rem]"><ArrowDownToLine aria-hidden="true" className="w-4 h-4" /></span>
            <small className="text-muted text-[0.56rem] font-bold">Deposit</small>
          </div>
          <div className="flex flex-col items-center gap-[0.45rem]">
            <span className="w-[2.4rem] h-[2.4rem] grid place-items-center rounded-full bg-paper border border-line text-ink max-mobile:w-[2.15rem] max-mobile:h-[2.15rem]"><ArrowUpRight aria-hidden="true" className="w-4 h-4" /></span>
            <small className="text-muted text-[0.56rem] font-bold">Withdraw</small>
          </div>
          <div className="flex flex-col items-center gap-[0.45rem]">
            <span className="w-[2.4rem] h-[2.4rem] grid place-items-center rounded-full bg-paper border border-line text-ink max-mobile:w-[2.15rem] max-mobile:h-[2.15rem]"><ArrowLeftRight aria-hidden="true" className="w-4 h-4" /></span>
            <small className="text-muted text-[0.56rem] font-bold">Transfer</small>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-around pt-[0.9rem] px-[1.1rem] pb-[max(0.9rem,env(safe-area-inset-bottom))] border-t border-line bg-paper">
        <span className="flex text-[#b7b9c1]"><LayoutGrid aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
        <span className="flex text-[#b7b9c1]"><LineChart aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
        <span className="flex text-[#b7b9c1]"><Globe2 aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
        <span className="flex text-[#b7b9c1]"><BarChart3 aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
        <span className="flex text-coral"><UserRound aria-hidden="true" className="w-[1.05rem] h-[1.05rem]" /></span>
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
    <ScrollRevealSection
      className="section join-section relative overflow-hidden pb-[clamp(25rem,27vw,27rem)] border-t border-white/9 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--coral)_14%,transparent),transparent_32rem)] bg-[#08090d] text-white max-nav:pb-96 max-mobile:pb-[25rem]"
      id="join"
      variant="join"
    >
      <div className="site-shell flex flex-col items-center text-center">
        <div className="max-w-[40rem] mx-auto">
          <h2 className="mb-6 font-heading text-[clamp(2.4rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.035em] max-mobile:text-[clamp(2.1rem,10vw,2.8rem)]">
            <span className="section-reveal-line"><span className="section-reveal-line-inner"><span className="section-heading-accent">Ready</span> when</span></span>
            <span className="section-reveal-line"><span className="section-reveal-line-inner">you are.</span></span>
          </h2>
          <p className="section-reveal-support max-w-[33rem] mx-auto text-[#aeb1bb] text-[clamp(1.0625rem,1.4vw,1.2625rem)] leading-[1.75]">Open your account, find your market, and take your next step with a platform built to keep the picture clear.</p>
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 z-[1] flex justify-center"
        aria-label="Illustration of the Axquotes app showing Standard, Pro, and VIP account balances and quick actions across three mobile devices"
      >
        <div className="relative flex items-end justify-center translate-y-[25%] max-nav:translate-y-[25%] max-nav:scale-[0.85] max-mobile:translate-y-[20%] max-mobile:scale-100">
          {accountDevices.map((device) => (
            <div className={`device-slot relative ${deviceSlotVariantStyles[device.variant]}`} key={device.variant}>
              <div className={`relative z-[1] p-[0.85rem] rounded-[1.9rem] bg-[#0c0d13] shadow-[1rem_2.4rem_5rem_rgba(0,0,0,0.34),inset_0_0_0_1px_rgba(255,255,255,0.06)] ${devicePhoneVariantStyles[device.variant]}`}>
                <div className="absolute top-[0.85rem] left-1/2 z-[2] w-24 h-[1.4rem] rounded-full bg-[#0c0d13] -translate-x-1/2 max-mobile:w-[4.6rem]" />
                <AccountDeviceMock plan={device.plan} balance={device.balance} change={device.change} equity={device.equity} margin={device.margin} free={device.free} />
              </div>
            </div>
          ))}
          <div className="device-glow absolute inset-0 z-[4] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.28)_45%,transparent_72%)]" aria-hidden="true" />
          <SpecularButton href="/auth" radius={999} tint="#d62d47" tintOpacity={1} baseColor="#d62d47" lineColor="#ffffff" textColor="#ffffff" className={`join-cta ${deviceCtaClassName}`}>
            Yes, I&apos;m Ready! <ArrowRight aria-hidden="true" />
          </SpecularButton>
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
    <ScrollRevealSection
      className="section trust-section border-t border-white/9 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--green)_12%,transparent),transparent_34rem)] bg-[#08090d] text-white"
      id="trust"
      variant="trust"
    >
      <div className="site-shell">
        <h2 className="max-w-[40rem] mx-auto mb-[clamp(2.5rem,5vw,3.5rem)] text-center font-heading text-[clamp(2.4rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.035em] max-mobile:text-[clamp(2.1rem,10vw,2.8rem)]">
          <span className="section-reveal-line"><span className="section-reveal-line-inner">Trusted by 40M+ users. <span className="section-heading-accent">Obviously.</span></span></span>
        </h2>
        <div className="section-reveal-panel grid grid-cols-3 gap-5 max-nav:grid-cols-1">
          {trustCards.map(({ icon: Icon, title, description, tags }) => (
            <div
              className="trust-card relative overflow-hidden p-[clamp(1.75rem,2.6vw,2.25rem)] border border-white/12 rounded-2xl bg-[linear-gradient(160deg,rgba(17,150,107,0.14),rgba(8,9,13,0)_60%)] bg-ink max-mobile:p-6"
              key={title}
            >
              <span className="grid place-items-center w-12 h-12 mb-[1.4rem] rounded-[0.85rem] bg-[#0f3128] text-[#66d8ad]">
                <Icon aria-hidden="true" className="w-[1.4rem] h-[1.4rem] [stroke-width:1.7]" />
              </span>
              <h3 className="max-w-[20ch] mt-0 mb-[0.6rem] font-heading text-[1.2rem] font-normal tracking-[-0.01em] text-white">{title}</h3>
              <p className="m-0 mb-[1.6rem] text-[#aeb1ba] text-[0.91rem] leading-[1.65]">{description}</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span className="py-[0.4rem] px-[0.85rem] border border-white/16 rounded-full bg-white/6 text-[#d5d7dd] text-[0.78rem] font-semibold" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollRevealSection>
  );
}

const learningRowToneStyles = {
  coral: { bg: 'bg-[linear-gradient(160deg,rgba(255,69,95,0.16),rgba(8,9,13,0)_60%)]', accent: 'text-[#ff8a9a]' },
  blue: { bg: 'bg-[linear-gradient(160deg,rgba(19,143,196,0.16),rgba(8,9,13,0)_60%)]', accent: 'text-[#67c9ee]' },
} as const;

function LearnSection() {
  const learningRows = [
    { icon: GraduationCap, label: 'Course · Beginner', title: 'Start with the essentials', cta: 'Begin course', tone: 'coral' },
    { icon: BookOpen, label: 'Masterclass · 42 min', title: 'Read price action clearly', cta: 'Watch now', tone: 'blue' },
  ] as const;

  return (
    <ScrollRevealSection
      className="section learn-section border-t border-white/9 bg-[radial-gradient(circle_at_85%_8%,color-mix(in_srgb,var(--blue)_13%,transparent),transparent_34rem)] bg-[#08090d] text-white"
      id="learn"
      variant="learn"
    >
      <div className="site-shell">
        <div className="mb-[clamp(2rem,4vw,3rem)] grid grid-cols-[1.1fr_0.9fr] items-end gap-16 max-mobile:grid-cols-1 max-mobile:gap-[1.4rem]">
          <div>
            <h2 className="mb-0 font-heading text-[clamp(2.4rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.035em]">
              <span className="section-reveal-line"><span className="section-reveal-line-inner">Learn the market.</span></span>
              <span className="section-reveal-line"><span className="section-reveal-line-inner">Then make <span className="section-heading-accent">your move.</span></span></span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-[1.2rem]">
            <p className="section-reveal-support max-w-[38rem] mb-0 text-[#b8bbc4] text-[clamp(1.0625rem,1.4vw,1.2625rem)] leading-[1.75]">Build practical confidence with timely analysis, clear foundations, and focused platform guides.</p>
            <a href="#" className="learn-hub-link inline-flex items-center gap-2 text-[0.78rem] font-extrabold">Visit the learning hub <ArrowRight aria-hidden="true" className="w-[0.95rem]" /></a>
          </div>
        </div>
        <div className="section-reveal-panel grid grid-cols-[1.15fr_0.85fr] gap-4 max-nav:grid-cols-1">
          <article className="relative isolate overflow-hidden min-h-[26rem] border border-white/12 rounded-2xl bg-ink text-white before:content-[''] before:absolute before:inset-0 before:z-[1] before:bg-[linear-gradient(180deg,rgba(8,9,13,0.15),rgba(8,9,13,0.82))] max-mobile:min-h-96">
            <Image
              src="/images/market-briefing.webp"
              alt="Stock market trend line and volume chart"
              fill
              sizes="(max-width: 1120px) 100vw, 60vw"
              className="relative z-0 object-cover object-center [filter:saturate(0.62)_contrast(1.08)_brightness(0.74)]"
            />
            <div className="relative z-[2] flex flex-col items-start justify-end p-[1.75rem_2.5rem] max-mobile:p-[1.25rem_1.8rem]">
              <span className="text-[#a9acb6] text-[0.62rem]">Daily briefing · 6 min</span>
              <h3 className="my-4 font-heading text-[2rem] leading-[1.08] max-mobile:text-[1.5rem]">What is moving markets today?</h3>
              <p className="text-[#aeb1ba] text-[0.82rem] leading-[1.65]">Your morning read on overnight moves, key levels, and the events ahead.</p>
              <a href="#" className="inline-flex items-center gap-2 text-[0.78rem] font-extrabold">Read the briefing <ArrowRight aria-hidden="true" className="w-[0.95rem]" /></a>
            </div>
          </article>
          <div className="grid grid-rows-2 gap-4">
            {learningRows.map(({ icon: Icon, label, title, cta, tone }) => {
              const toneStyle = learningRowToneStyles[tone];
              return (
                <article
                  className={`learning-row grid grid-cols-[auto_1fr] items-center gap-6 min-h-48 p-[1.5rem_2rem] border border-white/12 rounded-2xl text-white ${toneStyle.bg} bg-ink max-mobile:min-h-[10.5rem] max-mobile:grid-cols-1 max-mobile:gap-4 max-mobile:p-[1.25rem_1.5rem]`}
                  key={title}
                >
                  <Icon aria-hidden="true" className={`w-16 h-16 [stroke-width:1.2] ${toneStyle.accent} max-mobile:w-[2.8rem] max-mobile:h-[2.8rem]`} />
                  <div>
                    <span className="text-[#a9acb6] text-[0.62rem]">{label}</span>
                    <h3 className="mt-[0.7rem] mb-[1.2rem] font-heading text-2xl">{title}</h3>
                    <a href="#" className={`inline-flex items-center gap-2 text-[0.78rem] font-extrabold ${toneStyle.accent}`}>{cta} <ArrowRight aria-hidden="true" className="w-[0.95rem]" /></a>
                  </div>
                </article>
              );
            })}
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

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M16.7 12.6c0-2.1 1.7-3.2 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2-1.4 2.5-.4 6.2 1.1 8.3.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.4-.1-.1-2.2-.9-2.3-3.2Z" />
      <path d="M14.4 6.1c.6-.7 1-1.7.9-2.7-.9.1-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6.9.1 1.9-.5 2.5-1.2Z" />
    </svg>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M5 3.6c0-.6.7-1 1.2-.7l13 8.4c.5.3.5 1 0 1.4l-13 8.4c-.5.3-1.2 0-1.2-.7V3.6Z" />
    </svg>
  );
}

export function SiteFooter() {
  const groups = footerGroups;

  return (
    <footer className="pt-20 pb-8 border-t border-white/8 bg-[#0b0c11] text-white" id="company">
      <div className="site-shell">
        <div className="grid grid-cols-[minmax(16rem,0.85fr)_2fr] gap-16 pb-14 max-mobile:grid-cols-1 max-mobile:gap-10 max-mobile:pb-8">
          <div>
            <p className="m-0 max-w-[24rem] text-[#b8bbc4] text-[0.88rem] leading-[1.7]">A market intelligence platform giving 400k+ active traders access to 17,000+ global markets.</p>
            <div className="mt-[1.8rem]">
              <span className="block mb-[0.8rem] text-white text-[0.74rem] font-extrabold">Find us on</span>
              <div className="flex gap-[0.6rem]">
                {footerSocialLinks.map(({ label, Icon }) => (
                  <a
                    href="#"
                    key={label}
                    aria-label={`Axquotes on ${label}`}
                    className="grid place-items-center w-[2.4rem] h-[2.4rem] rounded-full bg-white text-ink transition-[transform,background] duration-[220ms] ease-[var(--ease-out)] hover:bg-[#d6d8dd] hover:-translate-y-[2px] [&>svg]:w-[1.05rem] [&>svg]:h-[1.05rem]"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="flex gap-[0.7rem] mt-[1.8rem]">
              <a href="#" className="flex items-center gap-2 py-2 px-[0.9rem] border border-white/16 rounded-[0.6rem] text-white transition-[border-color,background] duration-[180ms] hover:border-white hover:bg-white/6">
                <AppleGlyph className="w-[1.4rem] h-[1.4rem] shrink-0" />
                <span className="flex flex-col text-[0.78rem] font-bold leading-[1.25]"><small className="text-[0.58rem] font-medium text-[#9699a3] uppercase tracking-[0.04em]">Download on the</small>App Store</span>
              </a>
              <a href="#" className="flex items-center gap-2 py-2 px-[0.9rem] border border-white/16 rounded-[0.6rem] text-white transition-[border-color,background] duration-[180ms] hover:border-white hover:bg-white/6">
                <PlayGlyph className="w-[1.4rem] h-[1.4rem] shrink-0" />
                <span className="flex flex-col text-[0.78rem] font-bold leading-[1.25]"><small className="text-[0.58rem] font-medium text-[#9699a3] uppercase tracking-[0.04em]">GET IT ON</small>Google Play</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-10 max-mobile:hidden">
            {groups.map((group) => (
              <div key={group.heading}>
                <h3 className="mb-4 text-[#6f7280] text-[0.68rem] font-extrabold uppercase tracking-[0.1em]">{group.heading}</h3>
                {group.links.map((link) => <a href={link.href} key={link.label} className="block my-[0.55rem] text-[#9699a3] text-[0.74rem] hover:text-white">{link.label}</a>)}
              </div>
            ))}
          </div>
          <div className="hidden max-mobile:block">
            {groups.map((group) => (
              <FooterDisclosure title={group.heading} key={group.heading}>
                {group.links.map((link) => <a href={link.href} key={link.label} className="block py-[0.45rem] text-[#9699a3] text-[0.76rem]">{link.label}</a>)}
              </FooterDisclosure>
            ))}
          </div>
        </div>
        <div className="py-[1.7rem] border-y border-[#2d2f37] text-center">
          <p className="max-w-[70rem] mx-auto text-[#9699a3] text-[0.64rem] leading-[1.75]">CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.</p>
          <p className="max-w-[70rem] mx-auto mb-0 text-[#9699a3] text-[0.64rem] leading-[1.75]">The market prices and account values shown on this page are illustrative interface examples and do not represent live prices or investment performance.</p>
        </div>
        <div className="pt-[1.8rem] text-[#777b85] text-[0.68rem] text-center"><span>© 2026 Axquotes. All rights reserved.</span></div>
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
        <div className="relative isolate overflow-hidden bg-[#08090d] text-white">
          <MarketTicker />
          <TrustStrip />
          <FeesSection />

          <ScrollRevealSection
            className="section bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--blue)_13%,transparent),transparent_32rem)]"
            id="markets"
            variant="markets"
          >
            <div className="site-shell">
              <div className="max-w-[48rem] mx-auto mt-0 mb-[clamp(3rem,6vw,5rem)] text-center">
                <h2 className="m-0 font-heading text-[clamp(2.4rem,4.6vw,3.6rem)] font-normal leading-[1.05] tracking-[-0.035em] max-mobile:text-[clamp(2.1rem,10vw,2.8rem)]">
                  <span className="section-reveal-line"><span className="section-reveal-line-inner">Global markets.</span></span>
                  <span className="section-reveal-line"><span className="section-reveal-line-inner section-heading-accent">Your move.</span></span>
                </h2>
                <p className="section-reveal-support max-w-[40rem] mx-auto mt-[1.7rem] mb-0 text-[#e3e5ea] text-[clamp(1.0625rem,1.4vw,1.2625rem)] leading-[1.7] max-mobile:text-[1.0125rem]">
                  Trade forex, indices, shares, commodities, and crypto — thousands of instruments across the world&rsquo;s biggest markets, all from one account.
                </p>
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
