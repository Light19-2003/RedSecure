"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Rocket,
  ShieldCheck,
  X,
} from "lucide-react";
import { contact } from "./data";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.visible = "true";
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SiteHeader({
  active = "home",
  internal = false,
  legacy = false,
}: {
  active?: string;
  internal?: boolean;
  legacy?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const phone = internal ? contact.internalPhone : contact.phone;
  const phoneHref = internal ? contact.internalPhoneHref : contact.phoneHref;

  const links = legacy
    ? [
        ["Home", "/index.html", "home"],
        ["About", "/about.html", "about"],
        ["Services", "/service.html", "services"],
        ["Projects", "/project.html", "products"],
        ["Pages", "#", "pages"],
        ["Our Blog", "/blog.html", "blog"],
        ["Our Team", "/team.html", "team"],
        ["Testimonial", "/testimonial.html", "testimonial"],
        ["404 Page", "/404.html", "404"],
        ["Contact", "/contact.html", "contact"],
      ]
    : [
        ["Home", "/index.html", "home"],
        ["About", "/about.html", "about"],
        ["Services", "/service.html", "services"],
        ["Products", "/project.html", "products"],
        ["Contact", "/contact.html", "contact"],
      ];

  return (
    <>
      <div className={`utility-bar ${legacy ? "legacy-utility" : ""}`}>
        <div className="shell utility-inner">
          <div className="utility-group">
            <span>
              <MapPin aria-hidden="true" size={14} />
              {legacy ? "23 Ranking Street, New York" : contact.addressTop}
            </span>
            <a
              href={legacy ? "mailto:info@example.com" : contact.emailHref}
            >
              <Mail aria-hidden="true" size={14} />
              {legacy ? "Email@Example.com" : contact.email}
            </a>
          </div>
          {legacy && (
            <span className="utility-note">
              Note : We help you to Grow your Business
            </span>
          )}
        </div>
      </div>

      <header className={`site-header ${legacy ? "legacy-header" : ""}`}>
        <div className="shell nav-shell">
          <a
            className={`brand ${legacy ? "legacy-brand" : ""}`}
            href="/index.html"
            aria-label={legacy ? "High Tech home" : "RedSecure home"}
          >
            {legacy ? (
              <span>
                High <b>Tech</b>
              </span>
            ) : (
              <>
                <span className="brand-mark">
                  <img src="/redsecure/brand/6.png" alt="" />
                </span>
                <span className="brand-word">RedSecure</span>
              </>
            )}
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(([label, href, key]) => (
              <a
                key={href}
                href={href}
                aria-current={active === key ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-contact">
            <span>Have any questions?</span>
            <a href={phoneHref}>
              <Phone aria-hidden="true" size={16} />
              Call: {phone}
            </a>
          </div>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <div className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
          <nav className="shell" aria-label="Mobile navigation">
            {links.map(([label, href, key]) => (
              <a
                key={href}
                href={href}
                aria-current={active === key ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a className="mobile-call" href={phoneHref}>
              <Phone aria-hidden="true" size={18} />
              Call: {phone}
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

const heroSlides = [
  {
    title: "An Innovative IT Solutions Provider",
    image: "/redsecure/images/carousel-1.jpg",
  },
  {
    title: "Quality Digital Services You Really Need!",
    image: "/redsecure/images/carousel-2.jpg",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % heroSlides.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const previous = () =>
    setActive((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    );
  const next = () =>
    setActive((current) => (current + 1) % heroSlides.length);

  return (
    <section className="hero" aria-roledescription="carousel">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      {heroSlides.map((slide, index) => (
        <div
          key={slide.title}
          className={`hero-image ${active === index ? "is-active" : ""}`}
          style={{ backgroundImage: `url("${slide.image}")` }}
          aria-hidden={active !== index}
        />
      ))}

      <div className="shell hero-layout">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span />
            Security&nbsp;&nbsp;·&nbsp;&nbsp;Innovation&nbsp;&nbsp;·&nbsp;&nbsp;Reliability
          </div>
          <div className="hero-title-frame">
            {heroSlides.map((slide, index) => (
              <h1
                key={slide.title}
                className={active === index ? "is-active" : ""}
                aria-hidden={active !== index}
              >
                {slide.title}
              </h1>
            ))}
          </div>
          <p>
            CONTACT RED SECURE TODAY AND UNLOCK THE FULL POTENTIAL OF YOUR
            BUSINESS .
          </p>
          <a className="primary-button" href={contact.whatsapp}>
            Get IN Touch
            <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>

        <div className="hero-dashboard" aria-label="RedSecure products">
          <div className="dashboard-topbar">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>RedSecure</span>
            <ShieldCheck aria-hidden="true" size={17} />
          </div>
          <div className="dashboard-body">
            <div className="dashboard-sidebar">
              <span className="active" />
              <span />
              <span />
              <span />
            </div>
            <div className="dashboard-main">
              <div className="dashboard-heading">
                <div>
                  <small>Our Products</small>
                  <strong>RS-CMS</strong>
                </div>
                <span className="status-dot">Security</span>
              </div>
              <div className="metric-grid">
                <div>
                  <small>RS-HRMS</small>
                  <strong>Innovation</strong>
                  <i className="metric-line" />
                </div>
                <div>
                  <small>FixaTrack</small>
                  <strong>Reliability</strong>
                  <i className="metric-line short" />
                </div>
              </div>
              <div className="chart-card">
                <div className="chart-bars" aria-hidden="true">
                  {[36, 62, 48, 82, 68, 92, 76].map((height, index) => (
                    <i key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="floating-system-card">
                  <CheckCircle2 aria-hidden="true" />
                  <span>
                    <small>Document Management System</small>
                    <strong>Accounting Application</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shell hero-controls">
        <div className="slide-indicators" aria-label="Select slide">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={active === index}
            />
          ))}
        </div>
        <div>
          <button type="button" onClick={previous} aria-label="Previous">
            <ArrowLeft aria-hidden="true" />
            <span>Previous</span>
          </button>
          <button type="button" onClick={next} aria-label="Next">
            <span>Next</span>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function ValueStrip() {
  const values = [
    [ShieldCheck, "Security"],
    [Rocket, "Innovation"],
    [CheckCircle2, "Reliability"],
  ] as const;

  return (
    <div className="value-strip">
      <div className="shell value-grid">
        {values.map(([Icon, label], index) => (
          <div key={label} className="value-item">
            <span>0{index + 1}</span>
            <Icon aria-hidden="true" />
            <strong>{label}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Counter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const run = (time: number) => {
        const progress = Math.min((time - start) / 900, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(run);
      };
      frame = requestAnimationFrame(run);
      observer.disconnect();
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export function BackToTop() {
  return (
    <a className="back-to-top" href="#top" aria-label="Back to top">
      <ArrowUp aria-hidden="true" />
    </a>
  );
}
