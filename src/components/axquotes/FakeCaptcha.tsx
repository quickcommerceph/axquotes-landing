'use client';

import { useMemo } from 'react';
import { RefreshCw } from 'lucide-react';

type FakeCaptchaProps = {
  code: string | null;
  onRefresh: () => void;
};

export function FakeCaptcha({ code, onRefresh }: FakeCaptchaProps) {
  const glyphs = useMemo(() => {
    if (!code) return [];
    return code.split('').map((ch, i) => {
      const seed = ch.charCodeAt(0) + i * 13;
      return {
        ch,
        x: 16 + i * 22,
        dy: (seed % 12) - 6,
        rotate: (seed % 30) - 15,
      };
    });
  }, [code]);

  const noiseLines = useMemo(() => {
    if (!code) return [];
    const base = code.charCodeAt(0);
    return [0, 1, 2, 3].map((i) => {
      const seed = base + i * 37;
      return {
        y1: 8 + (seed % 30),
        y2: 8 + ((seed * 3) % 30),
      };
    });
  }, [code]);

  return (
    <div className="signup-captcha-visual" aria-busy={!code}>
      {code ? (
        <svg
          viewBox="0 0 140 48"
          className="signup-captcha-svg"
          role="img"
          aria-label={`Captcha code: ${code.split('').join(' ')}`}
        >
          <rect width="140" height="48" rx="8" fill="#f3f4f6" />
          {noiseLines.map((line, i) => (
            <line key={i} x1={0} y1={line.y1} x2={140} y2={line.y2} stroke="#c7c9d1" strokeWidth="1" />
          ))}
          {glyphs.map((g, i) => (
            <text
              key={i}
              x={g.x}
              y={28 + g.dy}
              transform={`rotate(${g.rotate} ${g.x} ${28 + g.dy})`}
              fontFamily="var(--font-display)"
              fontWeight={700}
              fontSize={22}
              fill="#22242e"
            >
              {g.ch}
            </text>
          ))}
        </svg>
      ) : (
        <div className="signup-captcha-skeleton" aria-hidden="true" />
      )}
      <button
        type="button"
        className="signup-captcha-refresh"
        onClick={onRefresh}
        disabled={!code}
        aria-label="Generate a new captcha code"
      >
        <RefreshCw aria-hidden="true" />
      </button>
      <p className="sr-only" role="status" aria-live="polite">{code ? 'Captcha code updated.' : ''}</p>
    </div>
  );
}
