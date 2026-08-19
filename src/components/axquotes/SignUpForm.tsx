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
    <div className="signup-card">
      <div className="signup-tabs" role="tablist" aria-label="Account access">
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
    <div className="signup-panel" role="tabpanel" id="signup-panel-signup" aria-labelledby="signup-tab-signup">
      <form onSubmit={handleSubmit} noValidate={false}>
        <p className="signup-section-label">Create profile</p>

        <div className="signup-field">
          <label htmlFor="signup-location">Location <span className="signup-required" aria-hidden="true">*</span></label>
          <div className="signup-select-wrap">
            <select
              id="signup-location"
              ref={firstFieldRef}
              required
              value={values.countryCode}
              onChange={(event) => setValues((v) => ({ ...v, countryCode: event.target.value }))}
              className="signup-select"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>{country.name}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" />
          </div>
        </div>

        <div className="signup-field">
          <label htmlFor="signup-email">Email <span className="signup-required" aria-hidden="true">*</span></label>
          <input
            id="signup-email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
            className="signup-input"
            autoComplete="email"
          />
        </div>

        <div className="signup-field">
          <label htmlFor="signup-phone">Mobile <span className="signup-required" aria-hidden="true">*</span></label>
          <div className="signup-phone-field">
            <span className="signup-phone-prefix">{selectedCountry.dialCode}</span>
            <input
              id="signup-phone"
              name="phone"
              type="tel"
              required
              value={values.phone}
              onChange={(event) => setValues((v) => ({ ...v, phone: event.target.value }))}
              className="signup-input"
              autoComplete="tel-national"
            />
          </div>
        </div>

        <p className="signup-section-label">Create password</p>

        <div className="signup-field">
          <label htmlFor="signup-password">Choose password <span className="signup-required" aria-hidden="true">*</span></label>
          <div className="signup-password-field">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={5}
              maxLength={15}
              value={values.password}
              onChange={(event) => setValues((v) => ({ ...v, password: event.target.value }))}
              className="signup-input"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="signup-password-toggle"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </button>
          </div>
          <ul className="signup-checklist">
            {checklist.map((item) => (
              <li key={item.id} data-passed={item.passed}>
                <Check aria-hidden="true" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="signup-field">
          <label htmlFor="signup-captcha">Enter the code above <span className="signup-required" aria-hidden="true">*</span></label>
          <div className="signup-captcha-row">
            <FakeCaptcha code={captchaCode} onRefresh={refreshCaptcha} />
            <input
              id="signup-captcha"
              ref={captchaInputRef}
              required
              value={values.captchaInput}
              onChange={(event) => setValues((v) => ({ ...v, captchaInput: event.target.value }))}
              aria-invalid={captchaError || undefined}
              aria-describedby={captchaError ? 'signup-captcha-error' : undefined}
              className="signup-input signup-captcha-input"
              autoComplete="off"
            />
          </div>
          {captchaError && <p id="signup-captcha-error" role="alert" className="signup-error">That code doesn&rsquo;t match. Try again.</p>}
        </div>

        <div className="signup-checkbox-field">
          <input
            id="signup-non-us"
            type="checkbox"
            required
            checked={values.agreeNonUs}
            onChange={(event) => setValues((v) => ({ ...v, agreeNonUs: event.target.checked }))}
          />
          <label htmlFor="signup-non-us">I declare and confirm that I am not a citizen or resident of the US for tax purposes.</label>
        </div>

        <p className="signup-fineprint mb-8">
          By clicking Continue, you have confirmed that you have read, understood and agreed with our{' '}
          <a href="#">Terms and Conditions</a>, <a href="#">Partnership Agreement</a> and <a href="#">Privacy Policy</a>.
        </p>

        <SpecularButton type="submit" radius={999} {...specularVariants.primary}>Continue</SpecularButton>
        <span className="signup-note">No account flow is connected in this preview.</span>
        <p className="signup-status" role="status" aria-live="polite" data-visible={submitted}>
          {submitted ? 'Preview only — no account was created.' : ''}
        </p>
      </form>
      <p className="signup-footer-note">
        Already registered?{' '}
        <button type="button" className="signup-link-action" onClick={onSwitchToLogin}>Login here</button>
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
    <div className="signup-panel" role="tabpanel" id="signup-panel-login" aria-labelledby="signup-tab-login">
      <form onSubmit={handleSubmit}>
        <p className="signup-section-label">Member login</p>

        <div className="signup-field">
          <label htmlFor="login-email">Email <span className="signup-required" aria-hidden="true">*</span></label>
          <input
            id="login-email"
            name="email"
            type="email"
            ref={firstFieldRef}
            required
            value={values.email}
            onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
            className="signup-input"
            autoComplete="email"
          />
        </div>

        <div className="signup-field">
          <label htmlFor="login-password">Password <span className="signup-required" aria-hidden="true">*</span></label>
          <div className="signup-password-field">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={values.password}
              onChange={(event) => setValues((v) => ({ ...v, password: event.target.value }))}
              className="signup-input"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="signup-password-toggle"
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </button>
          </div>
          <p className="signup-forgot"><a href="#">Forgot password?</a></p>
        </div>

        <SpecularButton type="submit" radius={999} {...specularVariants.primary}>Log in</SpecularButton>
        <span className="signup-note">No login flow is connected in this preview.</span>
        <p className="signup-status" role="status" aria-live="polite" data-visible={submitted}>
          {submitted ? 'Preview only — no account session was created.' : ''}
        </p>
      </form>
      <p className="signup-footer-note">
        New here?{' '}
        <button type="button" className="signup-link-action" onClick={onSwitchToSignup}>Create an account</button>
      </p>
    </div>
  );
}
