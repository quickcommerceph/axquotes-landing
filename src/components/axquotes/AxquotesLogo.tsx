'use client';

import { useId, useRef } from 'react';
import { motion, useInView, usePageInView, useReducedMotion } from 'motion/react';

const WORDMARK_PATH = 'M280.5 16.33C282.4 18.67 281.33 30.19 281.33 33.7C284.44 33.7 287.55 33.7 290.66 33.7C290.66 38.03 290.66 42.36 290.66 46.7C287.61 46.7 284.55 46.7 281.5 46.7C280.79 51.56 280.35 63.05 282 67.5C284.74 69.63 287.3 66.93 289.83 68C290.33 71.72 290.83 75.44 291.33 79.17C289.22 80.88 283.86 81 281.17 81C277.72 81 274.51 80.89 271.23 79.94C259.94 76.68 264.79 55.31 263.5 46.73C261.45 46.73 259.4 46.73 257.35 46.73C257.35 42.39 257.35 38.06 257.35 33.72C259.45 33.72 261.56 33.72 263.67 33.72C263.67 30.93 263.67 28.13 263.67 25.33C269.28 22.33 274.89 19.33 280.5 16.33ZM123.5 40C123.72 37.9 123.94 35.79 124.17 33.69C129.55 33.69 134.94 33.69 140.32 33.69C140.32 54.89 140.32 76.1 140.32 97.3C134.61 97.3 128.89 97.3 123.17 97.3C122.94 90.2 122.72 83.1 122.5 76C118.96 78.22 116.07 80.32 111.82 80.99C96.86 83.33 87.95 67.33 90.01 54.18C90.8 49.15 91.85 43.25 95.4 39.23C103.21 30.37 116.14 30.93 123.5 40ZM225.56 32.73C235.1 30.89 247.63 36.41 251.94 45.23C258.16 57.97 252.5 76.42 237.77 79.94C228.84 82.07 218.61 81.37 211.01 75.82C199.4 67.35 198.82 44.74 212.01 37.18C216.45 34.63 220.6 33.68 225.56 32.73ZM346.5 61.32C335.06 61.32 323.61 61.32 312.17 61.32C311.24 66 316.29 71.42 321.16 70.66C324.28 70.17 326.33 68.5 328.5 66.33C331.45 66.33 343.61 66.77 345.33 68.5C343.09 72.08 340.42 75.33 336.78 77.61C327.77 83.26 310.06 82.2 301.83 75.67C293.9 69.37 292.89 57.65 295.06 48.56C299.04 31.9 325.47 28.47 337.66 37.18C344.93 42.37 347.74 52.75 346.5 61.32ZM396 44.5C394.81 45.42 380.79 46.95 379.5 46.33C376.13 42 369.55 39.07 366.33 45.5C368.71 50.26 374.2 49.29 378.82 50.01C387.53 51.37 397.33 54.68 397.33 65.17C397.33 67.41 396.92 69.42 395.94 71.44C390.42 82.73 369.77 82.63 359.67 79.17C354.97 77.56 349.39 73.05 349.33 67.5C354.83 66.89 360.33 66.28 365.83 65.67C367 66.83 367.54 68.98 369.01 69.82C373.71 72.52 379.72 71.75 381.67 66.5C379.22 62.6 374.71 62.65 370.51 61.99C362.47 60.73 353.42 58.55 351.27 49.56C350.81 47.65 350.85 45.47 351.4 43.56C354.93 31.3 379.48 29.88 388.45 35.39C392.23 37.71 393.75 40.91 396 44.5ZM58.33 33.29C67.78 33.29 77.22 33.28 86.67 33.28C87.11 33.69 87.56 34.09 88 34.5C82.83 39.56 77.67 44.61 72.5 49.67C67.56 44.5 62.61 39.33 57.67 34.17C57.89 33.87 58.11 33.58 58.33 33.29ZM196.13 79.72C190.86 79.71 185.6 79.71 180.33 79.71C180.06 77.47 179.78 75.24 179.5 73C170.41 84.2 149.62 84.82 148.28 67.33C148.28 56.18 148.28 45.03 148.28 33.87C153.8 33.92 159.32 33.96 164.83 34C166.03 35.54 165.33 39.23 165.33 41.17C165.33 46.48 163.75 61.93 167.18 65.66C168.29 66.87 170.31 67.22 171.84 67.32C175.87 67.59 177.77 63.36 178.4 60.23C179.58 54.32 177.06 38.23 179 34.17C184.61 34.11 190.22 34.06 195.83 34C195.93 49.24 196.03 64.48 196.13 79.72ZM329 52.65C328.86 49.5 327.49 45.55 324.44 44.06C318.82 41.32 310.81 46.04 312.17 52.65C317.78 52.65 323.39 52.65 329 52.65ZM227.56 44.73C215.74 47.01 217.45 70.93 229.82 68.99C240.68 67.29 239 42.53 227.56 44.73ZM114.56 45.73C104.1 47.42 105.07 69.39 116.16 67.66C126.13 66.09 124.62 44.11 114.56 45.73Z';
const BLUE_MARK_PATH = 'M47.72 33.17C60.98 48.61 74.24 64.05 87.5 79.49C86.2 80.58 83.77 80.1 82.17 80.1C79.06 80.1 67.11 80.9 65 79.88C62.87 78.85 55.86 69.39 53.81 67.03C48.07 60.41 42.27 53.85 36.7 47.13C32.89 42.54 28.3 38.4 24.9 33.5C26.23 32.35 29.08 32.9 30.83 32.9C36.24 32.9 42.44 32.07 47.72 33.17Z';
const RED_MARK_PATH = 'M41.5 65.07C46.3 70.38 51.1 75.68 55.9 80.99C45.86 80.99 35.81 80.99 25.77 80.99C26.14 77.52 34.25 71.46 36.95 68.78C38.26 67.48 39.69 65.54 41.5 65.07Z';
const HIGHLIGHT_PATH = 'M86.67 33.28C77.22 33.28 67.78 33.29 58.33 33.29C59.39 31.99 62.79 32.62 64.5 32.62C69.94 32.62 75.39 32.62 80.83 32.62C82.49 32.62 85.62 32.03 86.67 33.28ZM148.28 33.87C148.28 45.03 148.28 56.18 148.28 67.33C146.86 66.12 147.62 61.74 147.62 59.83C147.62 53.5 147.62 47.17 147.62 40.83C147.62 38.88 146.96 35.18 148.28 33.87ZM180.33 79.71C185.6 79.71 190.86 79.71 196.13 79.72C195.14 80.71 181.14 80.72 180.33 79.71Z';

// The source stores letter contours first and counters last. Regrouping them lets
// Motion animate each visible letter without changing the supplied geometry.
const [T_PATH, Q_OUTER_PATH, O_OUTER_PATH, E_OUTER_PATH, S_PATH, X_PATH, U_PATH, E_INNER_PATH, O_INNER_PATH, Q_INNER_PATH] = WORDMARK_PATH.split(/(?=M)/);
const [X_HIGHLIGHT_PATH, ...U_HIGHLIGHT_PATHS] = HIGHLIGHT_PATH.split(/(?=M)/);
const QUOTE_LETTERS = [
  { key: 'q', path: `${Q_OUTER_PATH}${Q_INNER_PATH}` },
  { key: 'u', path: U_PATH, highlight: U_HIGHLIGHT_PATHS.join('') },
  { key: 'o', path: `${O_OUTER_PATH}${O_INNER_PATH}` },
  { key: 't', path: T_PATH },
  { key: 'e', path: `${E_OUTER_PATH}${E_INNER_PATH}` },
  { key: 's', path: S_PATH },
];

const LOOP_DURATION = 6;
const LOOP_EASE = [0.45, 0, 0.2, 1] as const;
const STATIC_TRANSITION = { duration: 0 };

type AxquotesLogoProps = {
  className?: string;
};

export function AxquotesLogo({ className }: AxquotesLogoProps) {
  const logoRef = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, '');
  const isInView = useInView(logoRef, { amount: 0.2, initial: true });
  const isPageVisible = usePageInView();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && isPageVisible && !prefersReducedMotion;
  const glowId = `${id}-axquotes-glow`;
  const shineId = `${id}-axquotes-shine`;
  const clipId = `${id}-axquotes-clip`;

  return (
    <motion.svg
      ref={logoRef}
      className={className}
      viewBox="0 0 422 117"
      width="422"
      height="117"
      aria-hidden="true"
      focusable="false"
      initial={false}
    >
      <defs>
        <filter id={glowId} x="-20%" y="-45%" width="140%" height="190%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.09  0 0 0 0 0.53  0 0 0 0 0.80  0 0 0 0.45 0"
            result="blueGlow"
          />
          <feMerge>
            <feMergeNode in="blueGlow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={shineId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".48" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={WORDMARK_PATH} />
          <path d={BLUE_MARK_PATH} />
          <path d={RED_MARK_PATH} />
        </clipPath>
      </defs>

      <g filter={`url(#${glowId})`} fillRule="evenodd" strokeLinejoin="round">
        <path d={X_PATH} fill="#fff" stroke="#fff" strokeWidth=".25" />
        {QUOTE_LETTERS.map((letter, index) => {
          const revealStart = 0.11 + index * 0.025;
          const revealEnd = revealStart + 0.055;

          return (
            <motion.g
              key={letter.key}
              initial={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              animate={shouldAnimate ? {
                opacity: [1, 0, 0, 1, 1],
                x: [0, 3, 8, 0, 0],
                filter: ['blur(0px)', 'blur(2px)', 'blur(3px)', 'blur(0px)', 'blur(0px)'],
              } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={shouldAnimate ? {
                duration: LOOP_DURATION,
                times: [0, 0.055, revealStart, revealEnd, 1],
                ease: LOOP_EASE,
                repeat: Infinity,
              } : STATIC_TRANSITION}
            >
              <path d={letter.path} fill="#fff" stroke="#fff" strokeWidth=".25" />
              {letter.highlight ? (
                <path d={letter.highlight} fill="#d5d6d9" stroke="#d5d6d9" strokeWidth=".25" opacity=".95" />
              ) : null}
            </motion.g>
          );
        })}
        <motion.path
          d={BLUE_MARK_PATH}
          fill="#1788cb"
          stroke="#1788cb"
          strokeWidth=".25"
          initial={{ filter: 'none' }}
          animate={shouldAnimate ? {
            filter: [
              'drop-shadow(0 0 0 rgba(23, 136, 203, 0))',
              'drop-shadow(0 0 0 rgba(23, 136, 203, 0))',
              'drop-shadow(0 0 5px rgba(23, 136, 203, 0.34))',
              'drop-shadow(0 0 0 rgba(23, 136, 203, 0))',
              'drop-shadow(0 0 0 rgba(23, 136, 203, 0))',
            ],
          } : { filter: 'none' }}
          transition={shouldAnimate ? {
            duration: LOOP_DURATION,
            times: [0, 0.28, 0.34, 0.48, 1],
            ease: LOOP_EASE,
            repeat: Infinity,
          } : STATIC_TRANSITION}
        />
        <motion.path
          d={RED_MARK_PATH}
          fill="#cb174b"
          stroke="#cb174b"
          strokeWidth=".25"
          initial={{ filter: 'none' }}
          animate={shouldAnimate ? {
            filter: [
              'drop-shadow(0 0 0 rgba(203, 23, 75, 0))',
              'drop-shadow(0 0 0 rgba(203, 23, 75, 0))',
              'drop-shadow(0 0 4px rgba(203, 23, 75, 0.3))',
              'drop-shadow(0 0 0 rgba(203, 23, 75, 0))',
              'drop-shadow(0 0 0 rgba(203, 23, 75, 0))',
            ],
          } : { filter: 'none' }}
          transition={shouldAnimate ? {
            duration: LOOP_DURATION,
            times: [0, 0.29, 0.35, 0.48, 1],
            ease: LOOP_EASE,
            repeat: Infinity,
          } : STATIC_TRANSITION}
        />
        <path d={X_HIGHLIGHT_PATH} fill="#d5d6d9" stroke="#d5d6d9" strokeWidth=".25" opacity=".95" />
        <motion.rect
          x="-16"
          y="12"
          width="54"
          height="94"
          fill={`url(#${shineId})`}
          clipPath={`url(#${clipId})`}
          initial={{ x: -180, opacity: 0, skewX: -18 }}
          animate={shouldAnimate ? {
            x: [-180, -180, 78, 450, 450],
            opacity: [0, 0, 0.42, 0, 0],
            skewX: -18,
          } : { x: -180, opacity: 0, skewX: -18 }}
          transition={shouldAnimate ? {
            duration: LOOP_DURATION,
            times: [0, 0.34, 0.46, 0.68, 1],
            ease: LOOP_EASE,
            repeat: Infinity,
          } : STATIC_TRANSITION}
        />
      </g>
    </motion.svg>
  );
}
