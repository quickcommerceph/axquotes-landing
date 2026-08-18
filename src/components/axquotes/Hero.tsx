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

    const controls = animate([
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

    return () => controls.stop();
  }, [animate, prefersReducedMotion]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-bg-poster.webp"
          tabIndex={-1}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-scrim" />
      </div>

      <div className="site-shell hero-layout" id="top">
        <div className="hero-copy" ref={contentRef}>
          <h1>
            <span className="hero-line"><span className="hero-line-inner">Markets move.</span></span>
            <span className="hero-line"><span className="hero-line-inner hero-line-accent">Move with them.</span></span>
          </h1>
          <p className="hero-support">Trade global markets with sharp pricing, powerful tools, and the clarity to act when it matters.</p>
          <div className="hero-actions hero-support">
            <SpecularButton href="#join" radius={999} {...specularVariants.primary}>Start trading <ArrowRight aria-hidden="true" /></SpecularButton>
            <SpecularButton href="#platform" radius={999} {...specularVariants.outline}>Explore the platform</SpecularButton>
          </div>
          <div className="hero-assurance hero-support"><ShieldCheck aria-hidden="true" /><span>17,000+ global markets in one account</span></div>
        </div>
      </div>

    </section>
  );
}
