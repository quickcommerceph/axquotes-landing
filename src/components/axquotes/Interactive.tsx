'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import { marketCategories, tickerItems } from './data';
import { localeOptions, siteNavigation as navigation } from './navigation';
import SpecularButton, { specularVariants } from './SpecularButton';

export function AnimatedStat({ value }: { value: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(numberRef, { amount: 0.2, once: true });
  const prefersReducedMotion = useReducedMotion();
  const match = /^(\d+)(.*)$/.exec(value);
  const target = Number(match?.[1] ?? 0);
  const suffix = match?.[2] ?? '';

  useLayoutEffect(() => {
    const element = numberRef.current;
    if (!element || !isInView || prefersReducedMotion) return;

    const duration = 1600;
    const startedAt = performance.now();
    let frame = 0;

    element.textContent = `0${suffix}`;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      element.textContent = `${Math.round(target * eased)}${suffix}`;

      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isInView, prefersReducedMotion, suffix, target]);

  return (
    <strong>
      <span ref={numberRef} aria-hidden="true">{value}</span>
      <span className="sr-only">{value}</span>
    </strong>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [localeCode, setLocaleCode] = useState(localeOptions[0].code);
  const activeLocale = localeOptions.find((option) => option.code === localeCode) ?? localeOptions[0];
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);
  const desktopNavigationRef = useRef<HTMLElement>(null);
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const localeItemRef = useRef<HTMLDivElement>(null);

  const clearDropdownTimer = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
  };

  const scheduleDropdown = (label: string | null, delay: number) => {
    clearDropdownTimer();
    dropdownTimerRef.current = setTimeout(() => setOpenDropdown(label), delay);
  };

  useEffect(() => () => clearDropdownTimer(), []);

  useEffect(() => {
    if (!openDropdown) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!desktopNavigationRef.current?.contains(target) && !localeItemRef.current?.contains(target)) {
        clearDropdownTimer();
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [openDropdown]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) firstMobileLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!openDropdown) return;

    const handleDropdownEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearDropdownTimer();
        setOpenDropdown(null);
      }
    };

    document.addEventListener('keydown', handleDropdownEscape);
    return () => document.removeEventListener('keydown', handleDropdownEscape);
  }, [openDropdown]);

  useEffect(() => {
    if (!open) return;

    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = mobileNavigationRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && (document.activeElement === first || !mobileNavigationRef.current?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleMenuKeys);
    return () => document.removeEventListener('keydown', handleMenuKeys);
  }, [open]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 921px)');
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
      clearDropdownTimer();
      setOpenDropdown(null);
    };

    desktopQuery.addEventListener('change', closeAtDesktop);
    return () => desktopQuery.removeEventListener('change', closeAtDesktop);
  }, []);

  useEffect(() => {
    const sections = navigation
      .filter(({ href }) => href.startsWith('#'))
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]) setActiveHref(`#${visible[0].target.id}`);
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.1, 0.25, 0.5],
    });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="site-chrome">
      <div className="risk-bar" role="note" aria-label="Risk warning">
        <div className="risk-bar-inner">
          <p>CFDs are leveraged, complex instruments. Losses can occur rapidly, and you may lose your invested capital.</p>
        </div>
      </div>
      <header className="site-header">
        <div className="site-shell header-inner">
          <a href="/" aria-label="Axquotes home" className="brand-link">
            <Image src="/images/axquotes-logo.svg" alt="Axquotes" width={422} height={117} className="brand-logo" priority />
          </a>
          <nav className="desktop-navigation" aria-label="Primary navigation" ref={desktopNavigationRef}>
            {navigation.map((item) => {
              const isOpen = openDropdown === item.label;
              const dropdownId = `nav-dropdown-${item.label.toLowerCase()}`;

              return (
                <div
                  key={item.href}
                  className="nav-item"
                  onMouseEnter={() => {
                    if (window.matchMedia('(hover: hover)').matches) scheduleDropdown(item.label, 150);
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia('(hover: hover)').matches) scheduleDropdown(null, 180);
                  }}
                >
                  <button
                    type="button"
                    className="nav-item-trigger"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={dropdownId}
                    onClick={() => {
                      clearDropdownTimer();
                      setOpenDropdown((current) => (current === item.label ? null : item.label));
                    }}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" />
                  </button>
                  <div
                    id={dropdownId}
                    className="nav-dropdown"
                    role="menu"
                    aria-label={`${item.label} menu`}
                    data-open={isOpen}
                    data-groups={item.groups.length > 1 ? 'multi' : undefined}
                  >
                    {item.groups.map((group) => (
                      <div className="nav-dropdown-group" key={group.heading}>
                        {item.groups.length > 1 && <span className="nav-dropdown-heading">{group.heading}</span>}
                        {group.links.map((link) => (
                          <a key={link.label} href={link.href} role="menuitem">{link.label}</a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
          <div className="header-actions">
            <div
              className="nav-item locale-nav-item"
              ref={localeItemRef}
              onMouseEnter={() => {
                if (window.matchMedia('(hover: hover)').matches) scheduleDropdown('Locale', 150);
              }}
              onMouseLeave={() => {
                if (window.matchMedia('(hover: hover)').matches) scheduleDropdown(null, 180);
              }}
            >
              <button
                type="button"
                className="nav-item-trigger"
                aria-expanded={openDropdown === 'Locale'}
                aria-haspopup="true"
                aria-controls="nav-dropdown-locale"
                onClick={() => {
                  clearDropdownTimer();
                  setOpenDropdown((current) => (current === 'Locale' ? null : 'Locale'));
                }}
              >
                <span aria-hidden="true">{activeLocale.flag}</span>
                {activeLocale.code}
                <ChevronDown aria-hidden="true" />
              </button>
              <div
                id="nav-dropdown-locale"
                className="nav-dropdown"
                role="menu"
                aria-label="Select region and language"
                data-open={openDropdown === 'Locale'}
              >
                <div className="nav-dropdown-group">
                  {localeOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={option.code === localeCode}
                      className="region-option"
                      onClick={() => {
                        setLocaleCode(option.code);
                        clearDropdownTimer();
                        setOpenDropdown(null);
                      }}
                    >
                      <span className="region-option-label">
                        <span aria-hidden="true">{option.flag}</span>
                        {option.country}
                      </span>
                      {option.code === localeCode && <Check aria-hidden="true" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="header-auth-links">
              <SpecularButton href="/auth?tab=login" size="sm" radius={999} {...specularVariants.ghost}>Log in</SpecularButton>
              <SpecularButton href="/auth" size="sm" radius={999} {...specularVariants.primary}>Start Trading</SpecularButton>
            </div>
            <button
              ref={menuButtonRef}
              className="menu-button"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <div
        className="nav-scrim"
        data-open={Boolean(openDropdown)}
        aria-hidden="true"
        onClick={() => {
          clearDropdownTimer();
          setOpenDropdown(null);
        }}
      />
      <div
        ref={mobileNavigationRef}
        id="mobile-navigation"
        className="mobile-navigation"
        data-open={open}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav className="mobile-navigation-inner site-shell" aria-label="Mobile navigation">
          <div className="mobile-navigation-links">
            {navigation.map((item, index) => (
              <details className="mobile-nav-disclosure" key={item.href}>
                <summary aria-current={activeHref === item.href ? 'location' : undefined}>
                  <a
                    href={item.href}
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    onClick={(event) => {
                      event.stopPropagation();
                      closeMenu();
                    }}
                  >
                    {item.label}
                  </a>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <div>
                  {item.groups.map((group) => (
                    <div className="mobile-nav-group" key={group.heading}>
                      {item.groups.length > 1 && <span className="mobile-nav-group-heading">{group.heading}</span>}
                      {group.links.map((link) => (
                        <a key={link.label} href={link.href} onClick={closeMenu}>{link.label}</a>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <div className="mobile-locale-picker">
            <span className="mobile-locale-label"><MapPin aria-hidden="true" />Region &amp; language</span>
            <div className="mobile-locale-options">
              {localeOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  data-active={option.code === localeCode}
                  onClick={() => setLocaleCode(option.code)}
                >
                  <span aria-hidden="true">{option.flag}</span>
                  {option.country}
                  <span className="mobile-locale-code">{option.code}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mobile-navigation-actions">
            <a className="mobile-login" href="/auth?tab=login" onClick={closeMenu}>Log in <ArrowRight aria-hidden="true" /></a>
            <SpecularButton href="/auth" onClick={closeMenu} radius={999} {...specularVariants.primary}>Start Trading</SpecularButton>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function MarketTicker() {
  return (
    <section className="ticker" aria-label="Illustrative market prices">
      <p className="sr-only">Illustrative market prices. Pause the animation by hovering or focusing.</p>
      <div className="ticker-track" tabIndex={0}>
        {[0, 1].map((setIndex) => (
          <div className="ticker-set" key={setIndex} aria-hidden={setIndex === 1}>
            {tickerItems.map((item) => (
              <div className="ticker-item" key={`${setIndex}-${item.symbol}`}>
                <span>{item.symbol}</span>
                <strong>{item.price}</strong>
                <small className={item.direction === 'up' ? 'positive' : 'negative'}>{item.change}</small>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function MarketExplorer() {
  const [activeId, setActiveId] = useState(marketCategories[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = marketCategories.find((market) => market.id === activeId) ?? marketCategories[0];

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % marketCategories.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + marketCategories.length) % marketCategories.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = marketCategories.length - 1;
    else return;

    event.preventDefault();
    const nextMarket = marketCategories[nextIndex];
    setActiveId(nextMarket.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="market-explorer">
      <div className="market-tabs" role="tablist" aria-label="Market categories">
        {marketCategories.map((market, index) => (
          <button
            key={market.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`tab-${market.id}`}
            role="tab"
            type="button"
            aria-selected={active.id === market.id}
            aria-controls={`panel-${market.id}`}
            tabIndex={active.id === market.id ? 0 : -1}
            onClick={() => setActiveId(market.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {market.label}
          </button>
        ))}
      </div>
      <div
        className="market-panel"
        role="tabpanel"
        key={active.id}
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
      >
        <div className="market-panel-copy">
          <span>{active.note}</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <SpecularButton href="#join" size="sm" radius={999} {...specularVariants.primary}>Explore {active.label.toLowerCase()} <ArrowRight aria-hidden="true" /></SpecularButton>
        </div>
        <div className="instrument-list">
          {active.instruments.map((instrument) => (
            <article key={instrument.symbol}>
              <div className="instrument-symbol">{instrument.symbol.slice(0, 2)}</div>
              <div>
                <strong>{instrument.name}</strong>
                <span>{instrument.symbol}</span>
              </div>
              <div className="instrument-price">
                <strong>{instrument.price}</strong>
                <span className={instrument.direction === 'up' ? 'positive' : 'negative'}>{instrument.change}</span>
              </div>
            </article>
          ))}
          <p className="illustrative-note">Illustrative prices shown for interface demonstration.</p>
        </div>
      </div>
    </div>
  );
}

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('#hero');
    const join = document.querySelector('#join');
    if (!hero || !join) return;

    const update = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const joinTop = join.getBoundingClientRect().top;
      setVisible(heroBottom < 0 && joinTop > window.innerHeight * 0.65);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="mobile-sticky-cta" data-visible={visible}>
      <div><Check aria-hidden="true" /><span>Ready to make your move?</span></div>
      <a href="/auth">Start Trading</a>
    </div>
  );
}

export function FooterDisclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="footer-disclosure">
      <summary>{title}<ChevronDown aria-hidden="true" /></summary>
      <div>{children}</div>
    </details>
  );
}
