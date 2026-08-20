'use client';

import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Check, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { countries, defaultCountryCode } from './countries';
import { FakeCaptcha } from './FakeCaptcha';
import SpecularButton, { specularVariants } from './SpecularButton';

type TabId = 'signup' | 'login';

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'signup', label: 'NEW ACCOUNT' },
  { id: 'login', label: 'MEMBER LOGIN' },
];

const CAPTCHA_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

function generateCaptchaCode(length = 5): string {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }
  return out;
}

type SignUpFormProps = {
  initialTab: TabId;
};

export function SignUpForm({ initialTab }: SignUpFormProps) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab);
  const router = useRouter();
  const pathname = usePathname();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const signupFirstFieldRef = useRef<HTMLSelectElement>(null);
  const loginFirstFieldRef = useRef<HTMLInputElement>(null);

  const switchTab = (id: TabId, focusFirstField = false) => {
    setActiveTab(id);
    router.replace(id === 'login' ? `${pathname}?tab=login` : pathname, { scroll: false });
    if (focusFirstField) {
      requestAnimationFrame(() => {
        (id === 'signup' ? signupFirstFieldRef : loginFirstFieldRef).current?.focus();
      });
    }
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    switchTab(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="rounded-2xl bg-ink-soft p-[clamp(1.75rem,4vw,2.75rem)] shadow-[1rem_2.4rem_5rem_rgba(0,0,0,0.34)] max-mobile:p-6 max-mobile:rounded-[0.8rem]">
      <div className="flex mb-[clamp(1.5rem,3vw,2rem)] border-b border-white/10" role="tablist" aria-label="Account access">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => { tabRefs.current[index] = element; }}
            id={`signup-tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.id}
            aria-controls={`signup-panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => switchTab(tab.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
            className="relative flex-1 border-0 bg-transparent pb-[0.9rem] text-[0.75rem] font-extrabold uppercase tracking-[0.06em] cursor-pointer [transition:color_180ms_ease] text-[#969aa5] aria-selected:text-white after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-px after:h-0.5 after:bg-coral after:scale-x-0 after:[transition:transform_220ms_var(--ease-out)] aria-selected:after:scale-x-100"
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'signup' ? (
        <NewAccountPanel key="signup" firstFieldRef={signupFirstFieldRef} onSwitchToLogin={() => switchTab('login', true)} />
      ) : (
        <MemberLoginPanel key="login" firstFieldRef={loginFirstFieldRef} onSwitchToSignup={() => switchTab('signup', true)} />
      )}
    </div>
  );
}

type SignUpFieldValues = {
  countryCode: string;
  email: string;
  phone: string;
  password: string;
  captchaInput: string;
  agreeNonUs: boolean;
};

function NewAccountPanel({
  firstFieldRef,
  onSwitchToLogin,
}: {
  firstFieldRef: RefObject<HTMLSelectElement | null>;
  onSwitchToLogin: () => void;
}) {
  const [values, setValues] = useState<SignUpFieldValues>({
    countryCode: defaultCountryCode,
    email: '',
    phone: '',
    password: '',
    captchaInput: '',
    agreeNonUs: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const captchaInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const generate = () => setCaptchaCode(generateCaptchaCode());
    generate();
  }, []);

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptchaCode());
    setCaptchaError(false);
  };

  const selectedCountry = countries.find((c) => c.code === values.countryCode) ?? countries[0];

  const passwordChecks = {
    length: values.password.length >= 5 && values.password.length <= 15,
    case: /[a-z]/.test(values.password) && /[A-Z]/.test(values.password),
    alnum: /[0-9]/.test(values.password) && /[a-zA-Z]/.test(values.password),
  };
  const checklist = [
    { id: 'length', label: 'Use from 5 to 15 characters', passed: passwordChecks.length },
    { id: 'case', label: 'Use both uppercase and lowercase letters', passed: passwordChecks.case },
    { id: 'alnum', label: 'Use a combination of numbers and English letters', passed: passwordChecks.alnum },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!captchaCode || values.captchaInput.trim().toUpperCase() !== captchaCode) {
      setCaptchaError(true);
      captchaInputRef.current?.focus();
      return;
    }
    setCaptchaError(false);
    setSubmitted(true);
  };

  return (
    <div className="animate-[market-panel-enter_420ms_var(--ease-out)_both]" role="tabpanel" id="signup-panel-signup" aria-labelledby="signup-tab-signup">
      <form onSubmit={handleSubmit} noValidate={false}>
        <p className="mt-8 mb-4 text-[#8dd9f5] text-[0.65rem] font-extrabold uppercase tracking-[0.08em] first:mt-0">Create profile</p>

        <div className="flex flex-col gap-2 mb-[1.1rem]">
          <label htmlFor="signup-location" className="text-[#d8dae0] text-[0.78rem] font-extrabold tracking-[0.08em] uppercase">Location <span className="text-coral" aria-hidden="true">*</span></label>
          <div className="relative">
            <select
              id="signup-location"
              ref={firstFieldRef}
              required
              value={values.countryCode}
              onChange={(event) => setValues((v) => ({ ...v, countryCode: event.target.value }))}
              className="w-full min-h-[3.1rem] appearance-none rounded-lg border border-white/14 bg-white/4 text-white pl-4 pr-10 text-[0.88rem] transition-[border-color,background-color] duration-[180ms] hover:border-white/24 [&>option]:bg-ink-soft [&>option]:text-white"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>{country.name}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="absolute top-1/2 right-4 w-4 text-[#9296a0] -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-[1.1rem]">
          <label htmlFor="signup-email" className="text-[#d8dae0] text-[0.78rem] font-extrabold tracking-[0.08em] uppercase">Email <span className="text-coral" aria-hidden="true">*</span></label>
          <input
            id="signup-email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
            className="w-full min-h-[3.1rem] rounded-lg border border-white/14 bg-white/4 text-white pl-4 pr-4 text-[0.88rem] transition-[border-color,background-color] duration-[180ms] placeholder:text-[#6f7280] hover:border-white/24"
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-2 mb-[1.1rem]">
          <label htmlFor="signup-phone" className="text-[#d8dae0] text-[0.78rem] font-extrabold tracking-[0.08em] uppercase">Mobile <span className="text-coral" aria-hidden="true">*</span></label>
          <div className="flex">
            <span className="min-h-[3.1rem] flex items-center px-[0.85rem] border border-white/14 border-r-0 rounded-l-lg bg-white/8 text-[#d8dae0] font-extrabold text-[0.85rem] whitespace-nowrap">{selectedCountry.dialCode}</span>
            <input
              id="signup-phone"
              name="phone"
              type="tel"
              required
              value={values.phone}
              onChange={(event) => setValues((v) => ({ ...v, phone: event.target.value }))}
              className="w-full min-h-[3.1rem] rounded-r-lg border border-white/14 bg-white/4 text-white pl-4 pr-4 text-[0.88rem] transition-[border-color,background-color] duration-[180ms] placeholder:text-[#6f7280] hover:border-white/24"
              autoComplete="tel-national"
            />
          </div>
        </div>

        <p className="mt-8 mb-4 text-[#8dd9f5] text-[0.65rem] font-extrabold uppercase tracking-[0.08em] first:mt-0">Create password</p>

        <div className="flex flex-col gap-2 mb-[1.1rem]">
          <label htmlFor="signup-password" className="text-[#d8dae0] text-[0.78rem] font-extrabold tracking-[0.08em] uppercase">Choose password <span className="text-coral" aria-hidden="true">*</span></label>
          <div className="relative">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={5}
              maxLength={15}
              value={values.password}
              onChange={(event) => setValues((v) => ({ ...v, password: event.target.value }))}
              className="w-full min-h-[3.1rem] rounded-lg border border-white/14 bg-white/4 text-white pl-4 pr-12 text-[0.88rem] transition-[border-color,background-color] duration-[180ms] placeholder:text-[#6f7280] hover:border-white/24"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-[0.4rem] w-[2.4rem] h-[2.4rem] grid place-items-center border-0 rounded-full bg-transparent text-[#9296a0] -translate-y-1/2 cursor-pointer transition-colors duration-[180ms] hover:text-white hover:bg-white/8 [&>svg]:w-[1.05rem]"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </button>
          </div>
          <ul className="list-none mt-[0.6rem] mb-0 p-0 flex flex-col gap-[0.4rem]">
            {checklist.map((item) => (
              <li
                className="flex items-center gap-2 text-[#9296a0] text-[0.72rem] transition-colors duration-[180ms] data-[passed=true]:text-[#78d8b4] [&>svg]:w-[0.85rem] [&>svg]:opacity-25 [&>svg]:transition-opacity [&>svg]:duration-[180ms] data-[passed=true]:[&>svg]:opacity-100"
                key={item.id}
                data-passed={item.passed}
              >
                <Check aria-hidden="true" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 mb-[1.1rem]">
          <label htmlFor="signup-captcha" className="text-[#d8dae0] text-[0.78rem] font-extrabold tracking-[0.08em] uppercase">Enter the code above <span className="text-coral" aria-hidden="true">*</span></label>
          <div className="flex items-start gap-4 max-mobile:flex-col max-mobile:items-stretch">
            <FakeCaptcha code={captchaCode} onRefresh={refreshCaptcha} />
            <input
              id="signup-captcha"
              ref={captchaInputRef}
              required
              value={values.captchaInput}
              onChange={(event) => setValues((v) => ({ ...v, captchaInput: event.target.value }))}
              aria-invalid={captchaError || undefined}
              aria-describedby={captchaError ? 'signup-captcha-error' : undefined}
              className="flex-1 min-h-[3.1rem] rounded-lg border border-white/14 bg-white/4 text-white pl-4 pr-4 text-[0.88rem] transition-[border-color,background-color] duration-[180ms] placeholder:text-[#6f7280] hover:border-white/24 max-mobile:w-full"
              autoComplete="off"
            />
          </div>
          {captchaError && <p id="signup-captcha-error" role="alert" className="mt-[0.4rem] text-coral text-[0.7rem]">That code doesn&rsquo;t match. Try again.</p>}
        </div>

        <div className="grid grid-cols-[auto_1fr] items-start gap-3 mt-6 mb-3">
          <input
            id="signup-non-us"
            type="checkbox"
            required
            checked={values.agreeNonUs}
            onChange={(event) => setValues((v) => ({ ...v, agreeNonUs: event.target.checked }))}
            className="w-[1.2rem] h-[1.2rem] mt-[0.15rem] accent-coral-action cursor-pointer"
          />
          <label htmlFor="signup-non-us" className="text-[#d8dae0] text-[0.78rem] leading-[1.5] normal-case tracking-normal font-semibold">I declare and confirm that I am not a citizen or resident of the US for tax purposes.</label>
        </div>

        <p className="mb-8 text-[#9699a3] text-[0.68rem] leading-[1.6] [&_a]:text-[#72c7e9] [&_a]:underline [&_a]:underline-offset-[0.15em]">
          By clicking Continue, you have confirmed that you have read, understood and agreed with our{' '}
          <a href="#">Terms and Conditions</a>, <a href="#">Partnership Agreement</a> and <a href="#">Privacy Policy</a>.
        </p>

        <SpecularButton type="submit" radius={999} {...specularVariants.primary}>Continue</SpecularButton>
        <span className="block mt-[0.9rem] text-[#9699a3] text-[0.62rem]">No account flow is connected in this preview.</span>
        <p
          className="hidden mt-[0.85rem] py-3 px-4 rounded-lg bg-[#78d8b4]/12 text-[#78d8b4] text-[0.75rem] font-bold data-[visible=true]:block"
          role="status"
          aria-live="polite"
          data-visible={submitted}
        >
          {submitted ? 'Preview only — no account was created.' : ''}
        </p>
      </form>
      <p className="mt-5 text-center text-[#9699a3] text-[0.78rem]">
        Already registered?{' '}
        <button type="button" className="border-0 bg-transparent p-0 text-white font-extrabold text-[length:inherit] underline underline-offset-[0.2em] cursor-pointer" onClick={onSwitchToLogin}>Login here</button>
      </p>
    </div>
  );
}

type LoginFieldValues = {
  email: string;
  password: string;
};

function MemberLoginPanel({
  firstFieldRef,
  onSwitchToSignup,
}: {
  firstFieldRef: RefObject<HTMLInputElement | null>;
  onSwitchToSignup: () => void;
}) {
  const [values, setValues] = useState<LoginFieldValues>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="animate-[market-panel-enter_420ms_var(--ease-out)_both]" role="tabpanel" id="signup-panel-login" aria-labelledby="signup-tab-login">
      <form onSubmit={handleSubmit}>
        <p className="mt-8 mb-4 text-[#8dd9f5] text-[0.65rem] font-extrabold uppercase tracking-[0.08em] first:mt-0">Member login</p>

        <div className="flex flex-col gap-2 mb-[1.1rem]">
          <label htmlFor="login-email" className="text-[#d8dae0] text-[0.78rem] font-extrabold tracking-[0.08em] uppercase">Email <span className="text-coral" aria-hidden="true">*</span></label>
          <input
            id="login-email"
            name="email"
            type="email"
            ref={firstFieldRef}
            required
            value={values.email}
            onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
            className="w-full min-h-[3.1rem] rounded-lg border border-white/14 bg-white/4 text-white pl-4 pr-4 text-[0.88rem] transition-[border-color,background-color] duration-[180ms] placeholder:text-[#6f7280] hover:border-white/24"
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-2 mb-[1.1rem]">
          <label htmlFor="login-password" className="text-[#d8dae0] text-[0.78rem] font-extrabold tracking-[0.08em] uppercase">Password <span className="text-coral" aria-hidden="true">*</span></label>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={values.password}
              onChange={(event) => setValues((v) => ({ ...v, password: event.target.value }))}
              className="w-full min-h-[3.1rem] rounded-lg border border-white/14 bg-white/4 text-white pl-4 pr-12 text-[0.88rem] transition-[border-color,background-color] duration-[180ms] placeholder:text-[#6f7280] hover:border-white/24"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute top-1/2 right-[0.4rem] w-[2.4rem] h-[2.4rem] grid place-items-center border-0 rounded-full bg-transparent text-[#9296a0] -translate-y-1/2 cursor-pointer transition-colors duration-[180ms] hover:text-white hover:bg-white/8 [&>svg]:w-[1.05rem]"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </button>
          </div>
          <p className="mt-2 text-right [&_a]:text-[#72c7e9] [&_a]:text-[0.72rem] [&_a]:font-bold"><a href="#">Forgot password?</a></p>
        </div>

        <SpecularButton type="submit" radius={999} {...specularVariants.primary}>Log in</SpecularButton>
        <span className="block mt-[0.9rem] text-[#9699a3] text-[0.62rem]">No login flow is connected in this preview.</span>
        <p
          className="hidden mt-[0.85rem] py-3 px-4 rounded-lg bg-[#78d8b4]/12 text-[#78d8b4] text-[0.75rem] font-bold data-[visible=true]:block"
          role="status"
          aria-live="polite"
          data-visible={submitted}
        >
          {submitted ? 'Preview only — no account session was created.' : ''}
        </p>
      </form>
      <p className="mt-5 text-center text-[#9699a3] text-[0.78rem]">
        New here?{' '}
        <button type="button" className="border-0 bg-transparent p-0 text-white font-extrabold text-[length:inherit] underline underline-offset-[0.2em] cursor-pointer" onClick={onSwitchToSignup}>Create an account</button>
      </p>
    </div>
  );
}
