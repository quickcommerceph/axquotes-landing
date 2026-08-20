'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { stagger, useAnimate, useInView, useReducedMotion } from 'motion/react';
import SpecularButton, { specularVariants } from './SpecularButton';

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [contentRef, animate] = useAnimate();
  const heroIsVisible = useInView(heroRef, { amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const [pageIsVisible, setPageIsVisible] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible',
  );
  const playRequested = !prefersReducedMotion;

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPageIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!playRequested || !heroIsVisible || !pageIsVisible) {
      video.pause();
      if (prefersReducedMotion) video.currentTime = 0;
      return;
    }

    void video.play().catch(() => video.pause());
  }, [heroIsVisible, pageIsVisible, playRequested, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      animate('.hero-line-inner', { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 }, { duration: 0 });
      animate('.hero-support', { opacity: 1, y: 0 }, { duration: 0 });
      return;
    }

    let controls: ReturnType<typeof animate> | undefined;
    const timeout = setTimeout(() => {
      controls = animate([
        [
          '.hero-line-inner',
          {
            clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
            opacity: [0, 1],
            y: ['24%', '0%'],
          },
          { duration: 0.68, delay: stagger(0.09), ease: easeOut },
        ],
        [
          '.hero-support',
          { opacity: [0, 1], y: [16, 0] },
          { at: '-0.28', duration: 0.45, delay: stagger(0.07), ease: easeOut },
        ],
      ]);
    }, 300);

    return () => {
      clearTimeout(timeout);
      controls?.stop();
    };
  }, [animate, prefersReducedMotion]);

  return (
    <section
      className="relative isolate min-h-[max(40rem,calc(100svh-var(--site-chrome-height)))] grid place-items-center overflow-hidden py-[clamp(4.5rem,9vw,7rem)] px-0 bg-[#08090d] text-white max-mobile:min-h-[max(36rem,calc(100svh-var(--site-chrome-height)))] max-mobile:pt-16 max-mobile:pb-[4.5rem]"
      id="hero"
      ref={heroRef}
    >
      <div className="absolute inset-0 w-full h-full z-[-2] bg-[#08090d]" aria-hidden="true">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-bg-poster.webp"
          tabIndex={-1}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(8,9,13,0.42)_0%,rgba(8,9,13,0.66)_58%,rgba(8,9,13,0.84)_100%),linear-gradient(180deg,rgba(8,9,13,0.28),rgba(8,9,13,0.58))]" />
      </div>

      <div className="site-shell flex justify-center" id="top">
        <div className="w-[min(100%,48rem)] text-center" ref={contentRef}>
          <h1 className="max-w-[11ch] mx-auto mt-0 mb-[1.7rem] font-heading text-[clamp(3.625rem,7vw,5.925rem)] font-[750] leading-[0.96] tracking-[-0.04em] max-mobile:text-[clamp(2.625rem,10vw,3.625rem)]">
            <span className="block overflow-hidden"><span className="hero-line-inner block">Markets move.</span></span>
            <span className="block overflow-hidden"><span className="hero-line-inner block text-coral">Move with them.</span></span>
          </h1>
          <p className="hero-support max-w-[40rem] mx-auto mt-0 mb-8 text-[#e3e5ea] text-[clamp(1.0625rem,1.4vw,1.2625rem)] leading-[1.7] max-mobile:text-[1.0125rem]">
            Trade global markets with sharp pricing, powerful tools, and the clarity to act when it matters.
          </p>
          <div className="hero-support flex flex-wrap justify-center gap-3 max-mobile:flex-col max-mobile:items-stretch">
            <SpecularButton href="#join" radius={999} {...specularVariants.primary}>Start Trading <ArrowRight aria-hidden="true" /></SpecularButton>
            <SpecularButton href="#platform" radius={999} {...specularVariants.outline}>Explore the platform</SpecularButton>
          </div>
          <div className="hero-support flex items-center justify-center gap-[0.6rem] mt-6 text-[#e3e5ea] text-[0.8125rem] font-bold">
            <ShieldCheck aria-hidden="true" className="w-[1.05rem] text-green" /><span>17,000+ global markets in one account</span>
          </div>
        </div>
      </div>

    </section>
  );
}
