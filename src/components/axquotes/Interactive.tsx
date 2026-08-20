'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronDown, Menu, X } from 'lucide-react';
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
    <strong className="font-heading text-[1.75rem] tracking-[-0.03em] [font-variant-numeric:tabular-nums] max-mobile:text-[1.25rem]">
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
    <div className="sticky top-0 z-[100]">
      <div
        className="h-[2.4rem] grid place-items-center pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] border-b border-white/8 bg-[#08090d] text-[#d2d4db] text-[0.63rem] leading-[1.35] tracking-[0.025em] text-center max-mobile:h-12 max-mobile:pl-[max(0.8rem,env(safe-area-inset-left))] max-mobile:pr-[max(0.8rem,env(safe-area-inset-right))] max-mobile:text-[0.58rem] max-mobile:tracking-[0.015em]"
        role="note"
        aria-label="Risk warning"
      >
        <div className="max-w-[78rem]">
          <p className="m-0">CFDs are leveraged, complex instruments. Losses can occur rapidly, and you may lose your invested capital.</p>
        </div>
      </div>
      <header className="relative z-[2] border-b border-white/10 bg-ink/95 text-white backdrop-blur-[18px]">
        <div className="site-shell h-[4.65rem] flex items-center gap-8 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] max-mobile:h-[4.1rem] max-mobile:gap-3">
          <a href="/" aria-label="Axquotes home" className="w-[9.7rem] flex-none max-mobile:w-[7.1rem]">
            <Image src="/images/axquotes-logo.svg" alt="Axquotes" width={422} height={117} className="block w-full h-auto" priority />
          </a>
          <nav
            className="flex items-center gap-[clamp(1.35rem,2.2vw,2.25rem)] max-nav:hidden"
            aria-label="Primary navigation"
            ref={desktopNavigationRef}
          >
            {navigation.map((item) => {
              const isOpen = openDropdown === item.label;
              const dropdownId = `nav-dropdown-${item.label.toLowerCase()}`;

              return (
                <div
                  key={item.href}
                  className="relative flex items-center"
                  onMouseEnter={() => {
                    if (window.matchMedia('(hover: hover)').matches) scheduleDropdown(item.label, 150);
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia('(hover: hover)').matches) scheduleDropdown(null, 180);
                  }}
                >
                  <button
                    type="button"
                    className="group inline-flex min-h-[2.75rem] items-center gap-[0.35rem] border-0 bg-transparent px-[0.1rem] text-[0.78rem] font-[750] text-[#d8dae0] cursor-pointer [transition:color_180ms_ease] hover:text-white aria-expanded:text-white"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={dropdownId}
                    onClick={() => {
                      clearDropdownTimer();
                      setOpenDropdown((current) => (current === item.label ? null : item.label));
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className="w-[0.85rem] text-[#969aa5] [transition:transform_220ms_var(--ease-out),color_180ms_ease] group-aria-expanded:rotate-180 group-aria-expanded:text-white group-hover:text-white"
                    />
                  </button>
                  <div
                    id={dropdownId}
                    className="group absolute top-[calc(100%+0.85rem)] left-0 z-[3] min-w-[14rem] rounded-2xl bg-ink p-[0.9rem_0.5rem] shadow-[0_1.5rem_3rem_rgba(0,0,0,0.4)] opacity-0 invisible pointer-events-none -translate-y-2 [transition:opacity_220ms_var(--ease-out),transform_220ms_var(--ease-out),visibility_0s_linear_220ms] data-[open=true]:opacity-100 data-[open=true]:visible data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:[transition-delay:0s] data-[groups=multi]:grid data-[groups=multi]:grid-cols-[repeat(3,minmax(11rem,1fr))] data-[groups=multi]:gap-x-4 data-[groups=multi]:gap-y-0 data-[groups=multi]:min-w-[34rem] data-[groups=multi]:p-[1.1rem_1.25rem]"
                    role="menu"
                    aria-label={`${item.label} menu`}
                    data-open={isOpen}
                    data-groups={item.groups.length > 1 ? 'multi' : undefined}
                  >
                    {item.groups.map((group) => (
                      <div key={group.heading}>
                        {item.groups.length > 1 && (
                          <span className="block mt-[0.3rem] mx-[0.9rem] mb-[0.6rem] text-[#6f7280] text-[0.62rem] font-extrabold uppercase tracking-[0.1em] group-data-[groups=multi]:ml-[0.2rem]">
                            {group.heading}
                          </span>
                        )}
                        {group.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            role="menuitem"
                            className="block my-[0.1rem] rounded-lg px-[0.9rem] py-[0.55rem] text-[0.78rem] font-[650] text-[#d8dae0] [transition:background-color_160ms_ease,color_160ms_ease] hover:bg-white/6 hover:text-white group-data-[groups=multi]:-ml-[0.2rem]"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
          <div className="flex items-center gap-[0.8rem] ml-auto max-mobile:flex-none max-mobile:gap-[0.5rem]">
            <div
              className="relative flex items-center"
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
                className="group inline-flex min-h-[2.75rem] items-center gap-[0.35rem] border-0 bg-transparent px-[0.1rem] text-[0.78rem] font-[750] text-[#d8dae0] cursor-pointer [transition:color_180ms_ease] hover:text-white aria-expanded:text-white"
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
                <ChevronDown
                  aria-hidden="true"
                  className="w-[0.85rem] text-[#969aa5] [transition:transform_220ms_var(--ease-out),color_180ms_ease] group-aria-expanded:rotate-180 group-aria-expanded:text-white group-hover:text-white"
                />
              </button>
              <div
                id="nav-dropdown-locale"
                className="absolute top-[calc(100%+0.85rem)] left-auto right-0 z-[3] min-w-[14rem] rounded-2xl bg-ink p-[0.9rem_0.5rem] shadow-[0_1.5rem_3rem_rgba(0,0,0,0.4)] opacity-0 invisible pointer-events-none -translate-y-2 [transition:opacity_220ms_var(--ease-out),transform_220ms_var(--ease-out),visibility_0s_linear_220ms] data-[open=true]:opacity-100 data-[open=true]:visible data-[open=true]:pointer-events-auto data-[open=true]:translate-y-0 data-[open=true]:[transition-delay:0s]"
                role="menu"
                aria-label="Select region and language"
                data-open={openDropdown === 'Locale'}
              >
                <div>
                  {localeOptions.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={option.code === localeCode}
                      className="flex w-full items-center justify-between gap-[0.6rem] my-[0.1rem] rounded-lg border-0 bg-transparent px-[0.9rem] py-[0.55rem] text-left text-[0.78rem] font-[650] text-[#d8dae0] cursor-pointer [transition:background-color_160ms_ease,color_160ms_ease] hover:bg-white/6 hover:text-white data-[active=true]:text-white"
                      data-active={option.code === localeCode}
                      onClick={() => {
                        setLocaleCode(option.code);
                        clearDropdownTimer();
                        setOpenDropdown(null);
                      }}
                    >
                      <span className="flex items-center gap-[0.55rem]">
                        <span aria-hidden="true">{option.flag}</span>
                        {option.language}
                      </span>
                      {option.code === localeCode && <Check aria-hidden="true" className="w-[0.85rem] h-[0.85rem] text-coral flex-none" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[0.8rem] max-nav:hidden">
              <SpecularButton href="/auth?tab=login" size="sm" radius={999} {...specularVariants.ghost}>Log in</SpecularButton>
              <SpecularButton href="/auth" size="sm" radius={999} {...specularVariants.primary}>Start Trading</SpecularButton>
            </div>
            <button
              ref={menuButtonRef}
              className="hidden max-nav:inline-flex w-[2.75rem] h-[2.75rem] items-center justify-center rounded-full border border-[#3b3d46] bg-transparent cursor-pointer aria-expanded:border-[#626671] aria-expanded:bg-ink-soft hover:border-[#626671] hover:bg-ink-soft hover:-translate-y-px [@media(hover:none)]:active:bg-ink-soft [@media(hover:none)]:active:scale-[0.96] [transition:border-color_180ms_ease,background-color_180ms_ease,transform_180ms_var(--ease-out)]"
              type="button"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="w-[1.25rem]" /> : <Menu className="w-[1.25rem]" />}
            </button>
          </div>
        </div>
      </header>
      <div
        className="fixed top-[var(--site-chrome-height)] right-0 bottom-0 left-0 z-[1] bg-[rgba(8,9,13,0.6)] backdrop-blur-[8px] opacity-0 invisible pointer-events-none [transition:opacity_260ms_ease,visibility_0s_linear_260ms] data-[open=true]:opacity-100 data-[open=true]:visible data-[open=true]:pointer-events-auto data-[open=true]:[transition-delay:0s]"
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
        className="fixed top-[var(--site-chrome-height)] right-0 bottom-0 left-0 z-[1] hidden max-nav:block invisible overflow-y-auto overscroll-contain pointer-events-none bg-ink text-white opacity-0 -translate-y-3 [transition:opacity_260ms_ease,transform_320ms_var(--ease-out),visibility_0s_linear_320ms] data-[open=true]:visible data-[open=true]:pointer-events-auto data-[open=true]:opacity-100 data-[open=true]:translate-y-0 data-[open=true]:[transition-delay:0s]"
        data-open={open}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav
          className="site-shell min-h-full flex flex-col pt-[clamp(1.4rem,5vh,3rem)] pr-[max(0rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(0rem,env(safe-area-inset-left))]"
          aria-label="Mobile navigation"
        >
          <div className="border-t border-[#30323b]">
            {navigation.map((item, index) => (
              <details className="group border-b border-[#30323b]" key={item.href}>
                <summary
                  aria-current={activeHref === item.href ? 'location' : undefined}
                  className="min-h-[4.8rem] flex items-center justify-between list-none cursor-pointer [&::-webkit-details-marker]:hidden"
                >
                  <a
                    href={item.href}
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    onClick={(event) => {
                      event.stopPropagation();
                      closeMenu();
                    }}
                    className="font-heading text-[1.15rem] font-bold tracking-[-0.025em] [transition:color_180ms_ease] hover:text-white"
                  >
                    {item.label}
                  </a>
                  <ChevronDown
                    aria-hidden="true"
                    className="w-[1.15rem] text-[#969aa5] transition-transform duration-[220ms] ease-[var(--ease-out)] group-open:rotate-180"
                  />
                </summary>
                <div className="flex flex-col pb-[1.2rem]">
                  {item.groups.map((group) => (
                    <div className="[&+&]:mt-[0.6rem]" key={group.heading}>
                      {item.groups.length > 1 && (
                        <span className="block mt-[0.5rem] text-[#6f7280] text-[0.62rem] font-extrabold uppercase tracking-[0.1em]">
                          {group.heading}
                        </span>
                      )}
                      {group.links.map((link) => (
                        <a key={link.label} href={link.href} onClick={closeMenu} className="block py-[0.6rem] text-[#aeb1ba] text-[0.95rem] font-[650]">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 mt-auto pt-[clamp(2rem,7vh,4rem)] max-mobile:grid-cols-1 max-mobile:gap-3">
            <a
              className="group inline-flex min-h-[3.35rem] items-center gap-[0.6rem] text-[0.86rem] font-extrabold [@media(hover:none)]:active:text-coral max-mobile:justify-center max-mobile:rounded-full max-mobile:border max-mobile:border-[#3b3d46]"
              href="/auth?tab=login"
              onClick={closeMenu}
            >
              Log in <ArrowRight aria-hidden="true" className="w-[1.15rem] transition-transform duration-[220ms] ease-[var(--ease-out)] group-hover:translate-x-[3px]" />
            </a>
            <SpecularButton href="/auth" onClick={closeMenu} radius={999} {...specularVariants.primary}>Start Trading</SpecularButton>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function MarketTicker() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#0d0f15] text-white" aria-label="Illustrative market prices">
      <p className="sr-only">Illustrative market prices. Pause the animation by hovering or focusing.</p>
      <div
        className="w-max flex animate-[ticker-move_36s_linear_infinite] hover:[animation-play-state:paused] focus:[animation-play-state:paused]"
        tabIndex={0}
      >
        {[0, 1].map((setIndex) => (
          <div className="min-w-[100vw] flex flex-none" key={setIndex} aria-hidden={setIndex === 1}>
            {tickerItems.map((item) => (
              <div
                className="min-w-[12rem] min-h-[4.25rem] grid grid-cols-[minmax(0,1fr)_auto] content-center grow shrink-0 basis-[12rem] gap-x-4 gap-y-[0.32rem] py-[0.85rem] px-[1.3rem] border-r border-white/9 [transition:background-color_180ms_ease] hover:bg-white/[3.5%] max-mobile:min-w-[10.5rem] max-mobile:basis-[10.5rem] max-mobile:px-4"
                key={`${setIndex}-${item.symbol}`}
              >
                <span className="text-[0.68rem] overflow-hidden text-ellipsis whitespace-nowrap text-[#aeb1ba] font-[750]">{item.symbol}</span>
                <strong className="text-[0.68rem] text-white [font-variant-numeric:tabular-nums]">{item.price}</strong>
                <small
                  className={`col-start-2 text-[0.52rem] font-extrabold [font-variant-numeric:tabular-nums] tracking-[0.01em] ${item.direction === 'up' ? 'text-green' : 'text-coral'}`}
                >
                  {item.change}
                </small>
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
    <div className="overflow-hidden rounded-2xl bg-ink text-white shadow-[1rem_2.4rem_5rem_rgba(0,0,0,0.34)]">
      <div
        className="flex overflow-x-auto pt-3 px-[1.2rem] pb-0 border-b border-white/10 bg-ink [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-mobile:justify-start"
        role="tablist"
        aria-label="Market categories"
      >
        {marketCategories.map((market, index) => (
          <button
            key={market.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`tab-${market.id}`}
            className="relative flex-1 min-w-[8rem] border-0 bg-transparent px-4 pt-4 pb-[1.15rem] text-[0.75rem] font-extrabold cursor-pointer [transition:color_180ms_ease] text-[#969aa5] aria-selected:text-white after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-0 after:h-0.5 after:bg-coral after:origin-center after:scale-x-0 after:[transition:transform_220ms_var(--ease-out)] aria-selected:after:scale-x-100 max-mobile:flex-none max-mobile:min-w-0 max-mobile:px-[1.1rem]"
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
        className="min-h-[24rem] grid grid-cols-[0.6fr_0.4fr] animate-[market-panel-enter_420ms_var(--ease-out)_both] max-nav:grid-cols-1"
        role="tabpanel"
        key={active.id}
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
      >
        <div className="relative flex flex-col items-start justify-center overflow-hidden p-[clamp(1.5rem,3vw,2.8rem)] bg-ink max-nav:min-h-[24rem] max-mobile:min-h-[20rem] [&>*]:relative [&>*]:z-[1]">
          <span className="text-[#72c7e9] text-[0.65rem] font-extrabold uppercase tracking-[0.08em]">{active.note}</span>
          <h3 className="w-full my-4 font-heading text-[clamp(1.7rem,2.6vw,2.6rem)] font-normal leading-[1.04] tracking-[-0.035em] max-mobile:text-[1.5rem]">{active.title}</h3>
          <p className="max-w-[30rem] mb-8 text-[#b5b8c1] leading-[1.7]">{active.description}</p>
          <SpecularButton href="#join" size="sm" radius={999} {...specularVariants.primary}>Explore {active.label.toLowerCase()} <ArrowRight aria-hidden="true" /></SpecularButton>
        </div>
        <div className="flex flex-col justify-center p-[clamp(1.2rem,2.5vw,2.4rem)] bg-ink-soft max-mobile:p-4">
          {active.instruments.map((instrument) => (
            <article
              key={instrument.symbol}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 min-h-[5.4rem] py-4 px-[0.3rem] border-b border-white/10 first:border-t [transition:transform_220ms_var(--ease-out),background-color_220ms_ease] hover:bg-white/[3.5%] hover:translate-x-1 max-mobile:p-[0.85rem]"
            >
              <div className="w-[2.6rem] h-[2.6rem] grid place-items-center rounded-full bg-[#f4f5f7] text-ink text-[0.72rem] font-black">{instrument.symbol.slice(0, 2)}</div>
              <div className="flex flex-col gap-[0.22rem]">
                <strong className="text-[0.84rem]">{instrument.name}</strong>
                <span className="text-[#aeb1ba] text-[0.6rem]">{instrument.symbol}</span>
              </div>
              <div className="flex flex-col gap-[0.22rem] text-right">
                <strong className="[font-variant-numeric:tabular-nums]">{instrument.price}</strong>
                <span className={instrument.direction === 'up' ? 'text-green' : 'text-coral'}>{instrument.change}</span>
              </div>
            </article>
          ))}
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
    <div
      className="fixed left-[0.8rem] right-[0.8rem] bottom-[max(0.8rem,env(safe-area-inset-bottom))] z-[90] hidden max-mobile:flex items-center justify-between gap-[0.7rem] rounded-[0.85rem] bg-ink p-[0.7rem] text-white shadow-[0.5rem_1rem_2.5rem_rgba(16,17,25,0.28)] translate-y-[calc(100%+2rem)] transition-transform duration-[320ms] ease-[var(--ease-out)] data-[visible=true]:translate-y-0"
      data-visible={visible}
    >
      <div className="flex items-center gap-[0.4rem] text-[0.64rem] font-bold">
        <Check aria-hidden="true" className="w-4 text-[#69d4ac]" />
        <span>Ready to make your move?</span>
      </div>
      <SpecularButton href="/auth" size="sm" radius={999} className="!text-[0.72rem] !px-4 !py-2" {...specularVariants.primary}>Start Trading</SpecularButton>
    </div>
  );
}

export function FooterDisclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-[#2d2f37]">
      <summary className="flex items-center justify-between py-4 text-[0.81rem] font-extrabold list-none cursor-pointer [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden="true" className="w-4 [transition:transform_180ms_ease] group-open:rotate-180" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}
