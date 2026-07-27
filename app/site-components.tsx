import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Quote,
  Search,
  Share2,
  Twitter,
} from "lucide-react";
import {
  aboutParagraphs,
  contact,
  homeProducts,
  legacyBlogs,
  legacyContact,
  legacyStats,
  legacyText,
  products,
  services,
  socialLinks,
} from "./data";
import {
  BackToTop,
  Counter,
  HeroCarousel,
  Reveal,
  SiteHeader,
  ValueStrip,
} from "./interactive";
import { HrmsFeaturesContent } from "./hrms-features";

export function PageHero({
  title,
  active,
  legacy = false,
}: {
  title: string;
  active: string;
  legacy?: boolean;
}) {
  return (
    <>
      <SiteHeader active={active} internal legacy={legacy} />
      <section className={`page-hero ${legacy ? "legacy-page-hero" : ""}`}>
        <div className="page-hero-grid" aria-hidden="true" />
        <div className="shell">
          <Reveal>
            <div className="page-hero-kicker">
              <span />
              {legacy ? "High Tech" : "RedSecure"}
            </div>
            <h1>{title}</h1>
            {legacy && (
              <nav className="breadcrumbs" aria-label="Breadcrumb">
                <a href="/index.html">Home</a>
                <ChevronRight aria-hidden="true" />
                <a href="#">Pages</a>
                <ChevronRight aria-hidden="true" />
                <span>{title === "Our Blog" ? "Blog" : title}</span>
              </nav>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <span>{eyebrow}</span>
      {title && <h2>{title}</h2>}
    </div>
  );
}

export function ServiceGrid({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`section services-section ${standalone ? "standalone" : ""}`}>
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Our Services"
            title="Bespoke services for you"
            align="center"
          />
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(index % 4) * 70}>
                <article className="service-card">
                  <div className="service-card-top">
                    <span className="service-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="service-icon">
                      <Icon aria-hidden="true" />
                    </span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-image" aria-hidden="true">
                    <img src={service.image} alt="" loading="lazy" />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HomeProductGrid() {
  return (
    <section className="section products-showcase">
      <div className="product-glow" aria-hidden="true" />
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow="Our Products" align="center" />
        </Reveal>
        <div className="home-products-grid">
          {homeProducts.map((product, index) => {
            const Icon = product.icon;
            return (
              <Reveal
                key={product.title}
                className={index === 0 ? "product-featured" : ""}
                delay={(index % 3) * 80}
              >
                <a
                  className="home-product-card"
                  href={
                    product.title === "RS-HRMS"
                      ? "/hrms-features.html"
                      : "/project.html"
                  }
                >
                  <img src={product.image} alt={product.title} loading="lazy" />
                  <span className="product-overlay" />
                  <span className="product-card-content">
                    <span className="product-card-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <strong>{product.title}</strong>
                    <ArrowRight aria-hidden="true" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductsList() {
  return (
    <main className="products-page">
      <section className="section">
        <div className="shell product-list">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Reveal key={product.title}>
                <article className="product-row">
                  <div className="product-visual">
                    <img
                      src={product.image}
                      alt={
                        product.title === "FixaTrack" ||
                        product.title === "Accounting Application" ||
                        product.title === "Document Management System"
                          ? "European EducationAll Group Logo"
                          : ""
                      }
                      loading="lazy"
                    />
                    <span className="product-visual-shade" />
                    <span className="product-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="product-floating-panel" aria-hidden="true">
                      <span>
                        <Icon />
                      </span>
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                  <div className="product-copy">
                    <span className="product-copy-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    {product.title === "RS-HRMS" && (
                      <a className="product-details-link" href="/hrms-features.html">
                        View HRMS Features
                        <ArrowRight aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export function AboutContent() {
  return (
    <main>
      <section className="section about-section">
        <div className="shell about-layout">
          <Reveal className="about-visual-wrap">
            <div className="about-visual">
              <img
                src="/redsecure/images/about-1.jpg"
                alt=""
                loading="eager"
              />
              <span className="about-image-overlay" />
              <div className="about-interface-card">
                <div className="interface-card-top">
                  <img src="/redsecure/brand/6.png" alt="" />
                  <span>RedSecure</span>
                </div>
                <div className="interface-line interface-line-long" />
                <div className="interface-line" />
                <div className="interface-metrics">
                  <span>
                    <Check aria-hidden="true" />
                    Security
                  </span>
                  <span>
                    <Check aria-hidden="true" />
                    Innovation
                  </span>
                  <span>
                    <Check aria-hidden="true" />
                    Reliability
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="about-copy">
            <SectionHeading eyebrow="About Us" />
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export function ContactSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section
      className={`section contact-section ${standalone ? "standalone" : ""}`}
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Get In Touch"
            title="Contact for any query"
            align="center"
          />
        </Reveal>
        <div className="contact-cards">
          <Reveal>
            <a className="contact-card" href={contact.mapHref} target="_blank">
              <span>
                <MapPin aria-hidden="true" />
              </span>
              <div>
                <h3>Address</h3>
                <p>{contact.address}</p>
              </div>
            </a>
          </Reveal>
          <Reveal delay={80}>
            <a
              className="contact-card"
              href={contact.internalPhoneHref}
              target="_blank"
            >
              <span>
                <Phone aria-hidden="true" />
              </span>
              <div>
                <h3>Call Us</h3>
                <p>{contact.phone}</p>
              </div>
            </a>
          </Reveal>
          <Reveal delay={160}>
            <a
              className="contact-card"
              href="mailto:info@example.com"
              target="_blank"
            >
              <span>
                <Mail aria-hidden="true" />
              </span>
              <div>
                <h3>Email Us</h3>
                <p>{contact.email}</p>
              </div>
            </a>
          </Reveal>
        </div>
        <div className="contact-panel">
          <Reveal className="map-wrap">
            <iframe
              title="Red Secure W.L.L. location"
              src={contact.mapEmbed}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
          <Reveal className="form-wrap" delay={120}>
            <form className="contact-form">
              <label>
                <span className="sr-only">Your Name</span>
                <input type="text" placeholder="Your Name" />
              </label>
              <label>
                <span className="sr-only">Your Email</span>
                <input type="email" placeholder="Your Email" />
              </label>
              <label>
                <span className="sr-only">Project</span>
                <input type="text" placeholder="Project" />
              </label>
              <label>
                <span className="sr-only">Message</span>
                <textarea rows={6} cols={10} placeholder="Message" />
              </label>
              <button type="button">
                Send Message
                <ArrowRight aria-hidden="true" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "Facebook") return <Facebook aria-hidden="true" />;
  if (label === "Instagram") return <Instagram aria-hidden="true" />;
  if (label === "LinkedIn") return <Linkedin aria-hidden="true" />;
  return <Twitter aria-hidden="true" />;
}

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-grid-lines" aria-hidden="true" />
        <div className="shell footer-main">
          <div className="footer-brand-column">
            <a className="footer-brand" href="/index.html">
              <img src="/redsecure/brand/RedSecureLogoWhite.png" alt="" />
            </a>
            <p>
              Empowering businesses through technology, innovation, and secure
              solutions for a smarter future.
            </p>
            <div className="footer-socials">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  aria-label={link.label}
                >
                  <SocialIcon label={link.label} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-links">
            <h2>Short Link</h2>
            <a href="/about.html">About us</a>
            <a href="/contact.html">Contact us</a>
            <a href="/service.html">Our Services</a>
            <a href="/project.html">Our Products</a>
          </div>
          <div className="footer-contact">
            <h2>Contact Us</h2>
            <a href={contact.mapHref} target="_blank">
              <MapPin aria-hidden="true" />
              {contact.address}
            </a>
            <a href={contact.phoneHref}>
              <Phone aria-hidden="true" />
              {contact.phone}
            </a>
            <a href={contact.emailHref}>
              <Mail aria-hidden="true" />
              {contact.email}
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>Redsecure , All rights reserved.</span>
          <span>
            Designed By{" "}
            <a href="/index.html">
              RedSecure
            </a>
          </span>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}

export function LegacyStats() {
  return (
    <section className="legacy-stats">
      <div className="shell legacy-stats-grid">
        {legacyStats.map((stat) => (
          <div key={stat.label}>
            <strong>
              <Counter value={stat.value} />
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function LegacyFooter() {
  return (
    <>
      <footer className="site-footer legacy-footer">
        <div className="shell footer-main legacy-footer-main">
          <div className="footer-brand-column">
            <a className="legacy-footer-brand" href="/index.html">
              High <b>Tech</b>
            </a>
            <p>{legacyText.description}</p>
          </div>
          <div className="footer-links">
            <h2>Short Link</h2>
            <a href="/about.html">About us</a>
            <a href="/contact.html">Contact us</a>
            <a href="/service.html">Our Services</a>
            <a href="/project.html">Our Projects</a>
            <a href="/blog.html">Latest Blog</a>
          </div>
          <div className="footer-links">
            <h2>Help Link</h2>
            <a href="#">Terms Of use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Helps</a>
            <a href="#">FQAs</a>
            <a href="/contact.html">Contact</a>
          </div>
          <div className="footer-contact">
            <h2>Contact Us</h2>
            <a href="#">
              <MapPin aria-hidden="true" />
              {legacyContact.address}
            </a>
            <a href="tel:+1234567890">
              <Phone aria-hidden="true" />
              {legacyContact.footerPhone}
            </a>
            <a href="mailto:info@example.com">
              <Mail aria-hidden="true" />
              {legacyContact.footerEmail}
            </a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>Your Site Name , All right reserved.</span>
          <span>
            Designed By{" "}
            <a href="/index.html">
              RedSecure
            </a>
          </span>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}

export function LegacyBlogPage() {
  return (
    <>
      <PageHero title="Our Blog" active="blog" legacy />
      <LegacyStats />
      <main className="section legacy-content">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Our Blog"
              title="Latest Blog & News"
              align="center"
            />
          </Reveal>
          <div className="legacy-blog-grid">
            {legacyBlogs.map((blog, index) => (
              <Reveal key={blog.category} delay={index * 80}>
                <article className="legacy-blog-card">
                  <div className="legacy-blog-image">
                    <img src={blog.image} alt="" loading="lazy" />
                    <span>{blog.category}</span>
                  </div>
                  <div className="legacy-blog-body">
                    <a href="">
                      Read More <ArrowRight aria-hidden="true" />
                    </a>
                    <div className="legacy-blog-meta">
                      <span>By Daniel Martin</span>
                      <span>
                        <CalendarDays aria-hidden="true" />
                        {blog.date}
                      </span>
                    </div>
                    <p>{legacyText.blogExcerpt}</p>
                    <div className="legacy-blog-stats">
                      <span>
                        <Share2 aria-hidden="true" /> 5324 Share
                      </span>
                      <span>
                        <MessageSquare aria-hidden="true" /> 5 Comments
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <LegacyFooter />
    </>
  );
}

export function LegacyTeamPage() {
  return (
    <>
      <PageHero title="Our Team" active="team" legacy />
      <LegacyStats />
      <main className="section legacy-content">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Our Team"
              title="Meet our expert Team"
              align="center"
            />
          </Reveal>
          <div className="legacy-team-grid">
            {[1, 2, 3, 4].map((member, index) => (
              <Reveal key={member} delay={index * 70}>
                <article className="legacy-team-card">
                  <img
                    src={`/redsecure/images/team-${member}.jpg`}
                    alt=""
                    loading="lazy"
                  />
                  <div>
                    <h2>Full Name</h2>
                    <p>Designation</p>
                    <span className="team-social-row">
                      <a href="#" aria-label="Facebook">
                        <Facebook aria-hidden="true" />
                      </a>
                      <a href="#" aria-label="Twitter">
                        <Twitter aria-hidden="true" />
                      </a>
                      <a href="#" aria-label="Instagram">
                        <Instagram aria-hidden="true" />
                      </a>
                      <a href="#" aria-label="LinkedIn">
                        <Linkedin aria-hidden="true" />
                      </a>
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <LegacyFooter />
    </>
  );
}

export function LegacyTestimonialPage() {
  return (
    <>
      <PageHero title="Testimonial" active="testimonial" legacy />
      <LegacyStats />
      <main className="section legacy-content">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Our Testimonial"
              title="Our Client Saying!"
              align="center"
            />
          </Reveal>
          <div className="legacy-testimonial-grid">
            {[1, 2, 3, 4].map((testimonial, index) => (
              <Reveal key={testimonial} delay={index * 70}>
                <article className="legacy-testimonial-card">
                  <Quote aria-hidden="true" className="quote-icon" />
                  <div className="testimonial-person">
                    <img
                      src={`/redsecure/images/testimonial-${testimonial}.jpg`}
                      alt=""
                      loading="lazy"
                    />
                    <span>
                      <strong>Client Name</strong>
                      <small>Profession</small>
                    </span>
                  </div>
                  <p>{legacyText.testimonial}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <LegacyFooter />
    </>
  );
}

export function Legacy404Page() {
  return (
    <>
      <PageHero title="404 Error" active="404" legacy />
      <LegacyStats />
      <main className="legacy-error-page">
        <div className="shell">
          <Reveal>
            <Search aria-hidden="true" />
            <strong>404</strong>
            <h2>Page Not Found</h2>
            <p>
              We’re sorry, the page you have looked for does not exist in our
              website! Maybe go to our home page or try to use a search?
            </p>
            <a className="primary-button" href="/index.html">
              Go Back To Home
              <ArrowRight aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </main>
      <LegacyFooter />
    </>
  );
}

export function HomePage() {
  return (
    <>
      <div id="top" />
      <SiteHeader active="home" />
      <main>
        <HeroCarousel />
        <ValueStrip />
        <ServiceGrid />
        <HomeProductGrid />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <div id="top" />
      <PageHero title="About Us" active="about" />
      <AboutContent />
      <SiteFooter />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <div id="top" />
      <PageHero title="Services" active="services" />
      <main>
        <ServiceGrid standalone />
      </main>
      <SiteFooter />
    </>
  );
}

export function ProductsPage() {
  return (
    <>
      <div id="top" />
      <PageHero title="Products" active="products" />
      <ProductsList />
      <SiteFooter />
    </>
  );
}

export function HrmsFeaturesPage() {
  return (
    <>
      <div id="top" />
      <SiteHeader active="products" internal />
      <HrmsFeaturesContent />
      <SiteFooter />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <div id="top" />
      <PageHero title="Contact Us" active="contact" />
      <main>
        <ContactSection standalone />
      </main>
      <SiteFooter />
    </>
  );
}
