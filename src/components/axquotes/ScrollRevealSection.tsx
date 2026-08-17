'use client';

import { type ReactNode, useEffect } from 'react';
import { type AnimationSequence, stagger, useAnimate, useInView, useReducedMotion } from 'motion/react';

const easeOut = [0.16, 1, 0.3, 1] as const;

type RevealVariant = 'markets' | 'benefits';

type ScrollRevealSectionProps = {
  id: string;
  className: string;
  variant: RevealVariant;
  children: ReactNode;
};

const variantConfig: Record<RevealVariant, { panelSelector: string; itemSelector?: string }> = {
  markets: {
    panelSelector: '.section-reveal-panel',
  },
  benefits: {
    panelSelector: '.section-reveal-panel',
    itemSelector: '.benefit-panel',
  },
};

export function ScrollRevealSection({
  id,
  className,
  variant,
  children,
}: ScrollRevealSectionProps) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.28, margin: '0px 0px -12% 0px', once: true });
  const prefersReducedMotion = useReducedMotion();
  const config = variantConfig[variant];

  useEffect(() => {
    if (!isInView && !prefersReducedMotion) return;

    if (prefersReducedMotion) {
      animate(
        '.section-reveal-line-inner, .section-reveal-support, .section-reveal-panel, .benefit-panel',
        { clipPath: 'inset(0 0 0% 0)', opacity: 1, y: 0 },
        { duration: 0 },
      );
      return;
    }

    const sequence: AnimationSequence = [
      [
        '.section-reveal-line-inner',
        {
          clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'],
          opacity: [0, 1],
          y: ['24%', '0%'],
        },
        { duration: 0.68, delay: stagger(0.08), ease: easeOut },
      ],
      [
        '.section-reveal-support',
        { opacity: [0, 1], y: [16, 0] },
        { at: '-0.28', duration: 0.45, ease: easeOut },
      ],
      [
        config.panelSelector,
        {
          clipPath: ['inset(0 0 8% 0)', 'inset(0 0 0% 0)'],
          opacity: [0, 1],
          y: [22, 0],
        },
        { at: '-0.18', duration: 0.56, ease: easeOut },
      ],
    ];

    if (config.itemSelector) {
      sequence.push([
        config.itemSelector,
        { opacity: [0, 1], y: [18, 0] },
        { at: '-0.34', duration: 0.48, delay: stagger(0.08), ease: easeOut },
      ]);
    }

    const controls = animate(sequence);
    return () => controls.stop();
  }, [animate, config, isInView, prefersReducedMotion]);

  return (
    <section className={className} id={id} ref={scope}>
      {children}
    </section>
  );
}
