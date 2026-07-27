"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Cloud,
  FileText,
  Gauge,
  GraduationCap,
  KeyRound,
  Mail,
  Megaphone,
  MessagesSquare,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Target,
  TrendingUp,
  UsersRound,
  WalletCards,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

type PlanKey = "basic" | "professional" | "advanced";
type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  badge?: "New" | "Popular" | "Enterprise";
};
type FeatureGroup = { title: string; tag: string; features: Feature[] };
type Plan = {
  key: PlanKey;
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  groups: FeatureGroup[];
};

const featureCopy: Record<string, string> = {
  "Employee Details":
    "Manage employee profiles, departments, contact details, employment history, and organizational information.",
  "Employee Off-Boarding":
    "Handle resignations, exit interviews, clearance, and final employee records.",
  "Time Sheet": "Track employee working hours and project time efficiently.",
  "Final Settlement": "Automate employee settlement and payroll closure.",
  "Employee Documents": "Store contracts, IDs, certificates, and HR files securely.",
  "Standard Access Roles": "Assign permissions based on employee roles.",
  "General Announcement": "Share organization-wide announcements instantly.",
  "Employee Self-Service":
    "Allow employees to manage profiles, requests, and documents.",
  Policies: "Publish HR policies and employee guidelines.",
  Attendance: "Capture daily attendance and maintain clear workforce records.",
  "Leave Request": "Submit, review, and track employee leave requests.",
  Regularization: "Correct missed or inaccurate attendance records efficiently.",
  "Half Day Request": "Manage half-day attendance with clear approval tracking.",
  "Payroll Processing": "Process employee payroll accurately from one workspace.",
  "Variable Pay Items": "Manage flexible additions and deductions in each pay cycle.",
  Indemnity: "Record and manage employee indemnity information with clarity.",
  "Employee Report": "Turn employee information into organized reports.",
  "Onboarding Report": "Monitor onboarding activity and joining progress.",
  "Attendance Report": "Review attendance trends and daily workforce records.",
  "Leave Report": "Understand leave activity through consolidated reporting.",
  "Onboarding Mail": "Configure consistent email communication for onboarding.",
  "Attendance Mail": "Send timely attendance updates through configured email.",
  "Leave Mail": "Send clear notifications throughout the leave process.",
  "Payslip Email": "Deliver employee payslips through a streamlined email workflow.",
  "Leave Analytics": "View leave patterns and key insights at a glance.",
  "Announcement Feed": "Keep company updates visible in one employee feed.",
  Notifications: "Stay informed about important employee actions and updates.",
  Reminders: "Surface time-sensitive HR activities before they are missed.",
  "Upcoming Birthdays": "See upcoming birthdays and support team recognition.",
  "Check In / Check Out": "Record the start and end of the workday with ease.",
  "Chat Box": "Support quick employee conversations within the HRMS platform.",
  "HR Requests": "Centralize employee questions and HR service requests.",
  "Basic Workflow": "Build simple approval paths for repeatable HR processes.",
  "Polls & Announcements": "Share company news and gather fast employee input.",
  "Survey & Feedback": "Collect structured feedback and improve engagement.",
  "Single Sign-On (SSO)": "Give employees convenient access through single sign-on.",
  "Login using Mobile OTP": "Enable secure login through a mobile one-time password.",
  "Employee Training": "Organize learning activities that build employee skills.",
  "Performance Appraisal": "Run structured reviews with a consistent appraisal process.",
  "Company Ticket / Reimbursement":
    "Track company requests and employee reimbursements efficiently.",
  "Training Reports": "Review training participation through clear reports.",
  "Recruitment Process": "Coordinate recruitment from candidate progress to hiring.",
  "Asset Tracking": "Keep employee-assigned assets organized throughout their lifecycle.",
  "Workflow Automation": "Automate repeatable HR actions and business processes.",
  "Company Roles": "Define organization-wide roles and responsibilities.",
  "Department Roles": "Configure roles that reflect each department’s structure.",
  "Goal Insights": "Understand employee goal progress through focused insights.",
  "Performance Insights": "Turn performance activity into clear information.",
  "One-on-One Meetings": "Structure manager and employee progress conversations.",
  "Performance Improvement Plans": "Create focused plans for measurable improvement.",
  "Skills Analytics": "Understand workforce capabilities through skills intelligence.",
};

const popular = new Set([
  "Employee Details",
  "Employee Self-Service",
  "Attendance",
  "Payroll Processing",
  "Performance Appraisal",
]);
const fresh = new Set(["Chat Box", "Survey & Feedback"]);

function group(
  title: string,
  tag: string,
  plan: PlanKey,
  icon: LucideIcon,
  names: string[],
): FeatureGroup {
  return {
    title,
    tag,
    features: names.map((name) => ({
      title: name,
      description: featureCopy[name],
      icon,
      tags: [plan, tag],
      badge:
        plan === "advanced"
          ? "Enterprise"
          : popular.has(name)
            ? "Popular"
            : fresh.has(name)
              ? "New"
              : undefined,
    })),
  };
}

const plans: Plan[] = [
  {
    key: "basic",
    eyebrow: "Essential foundation",
    title: "Basic Plan Features",
    subtitle: "Essential HR tools for every organization.",
    icon: Building2,
    groups: [
      group("HR Module", "hr", "basic", UsersRound, [
        "Employee Details",
        "Employee Off-Boarding",
        "Time Sheet",
        "Final Settlement",
        "Employee Documents",
        "Standard Access Roles",
        "General Announcement",
        "Employee Self-Service",
        "Policies",
      ]),
      group("Attendance", "attendance", "basic", CheckCircle2, [
        "Attendance",
        "Leave Request",
        "Regularization",
        "Half Day Request",
      ]),
      group("Payroll", "payroll", "basic", WalletCards, [
        "Payroll Processing",
        "Variable Pay Items",
        "Indemnity",
      ]),
      group("Reports", "reports", "basic", BarChart3, [
        "Employee Report",
        "Onboarding Report",
        "Attendance Report",
        "Leave Report",
      ]),
      group("Mail Configuration", "automation", "basic", Mail, [
        "Onboarding Mail",
        "Attendance Mail",
        "Leave Mail",
        "Payslip Email",
      ]),
      group("Dashboard", "reports", "basic", Gauge, [
        "Leave Analytics",
        "Announcement Feed",
        "Notifications",
        "Reminders",
        "Upcoming Birthdays",
        "Check In / Check Out",
      ]),
    ],
  },
  {
    key: "professional",
    eyebrow: "Engage your workforce",
    title: "Professional Plan",
    subtitle: "Everything in Basic plus employee engagement and collaboration.",
    icon: Star,
    groups: [
      group("Engagement & Collaboration", "performance", "professional", GraduationCap, [
        "Chat Box",
        "HR Requests",
        "Basic Workflow",
        "Polls & Announcements",
        "Survey & Feedback",
        "Single Sign-On (SSO)",
        "Login using Mobile OTP",
        "Employee Training",
        "Performance Appraisal",
        "Company Ticket / Reimbursement",
        "Training Reports",
      ]),
    ],
  },
  {
    key: "advanced",
    eyebrow: "Built for scale",
    title: "Enterprise Features",
    subtitle: "Advanced automation and workforce intelligence.",
    icon: Rocket,
    groups: [
      group("Automation & Workforce Intelligence", "automation", "advanced", Workflow, [
        "Recruitment Process",
        "Asset Tracking",
        "Workflow Automation",
        "Company Roles",
        "Department Roles",
        "Goal Insights",
        "Performance Insights",
        "One-on-One Meetings",
        "Performance Improvement Plans",
        "Skills Analytics",
      ]),
    ],
  },
];

const filters = [
  ["all", "All"],
  ["basic", "Basic"],
  ["professional", "Pro"],
  ["advanced", "Advanced"],
  ["hr", "HR"],
  ["payroll", "Payroll"],
  ["attendance", "Attendance"],
  ["performance", "Performance"],
  ["reports", "Reports"],
  ["automation", "Automation"],
] as const;

const comparisons = [
  {
    title: "Basic",
    subtitle: "Essential HR operations",
    features: ["HR Module", "Attendance", "Payroll", "Reports", "Mail Configuration", "Dashboard"],
    cta: "Get Started",
  },
  {
    title: "Professional",
    subtitle: "Engagement and collaboration",
    features: ["Everything in Basic", "HR Requests", "Employee Training", "Performance Appraisal", "Survey & Feedback", "Single Sign-On (SSO)"],
    cta: "Upgrade",
    featured: true,
  },
  {
    title: "Advanced",
    subtitle: "Enterprise intelligence",
    features: ["Everything in Professional", "Recruitment Process", "Workflow Automation", "Goal Insights", "Performance Insights", "Skills Analytics"],
    cta: "Contact Sales",
  },
];

const faqs = [
  ["How does attendance work?", "Employees can check in and check out while HR reviews attendance, regularization, half-day requests, and reports from the same platform."],
  ["Can employees manage leave?", "Yes. Employee Self-Service lets employees submit leave requests and follow their status."],
  ["Does payroll support variable pay?", "Yes. Variable Pay Items are included alongside Payroll Processing, Indemnity, Final Settlement, and Payslip Email."],
  ["Can workflows be customized?", "Professional includes Basic Workflow, while Enterprise Features add Workflow Automation for advanced processes."],
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <article className="hr-feature-card">
      <div className="hr-feature-card-top">
        <span className="hr-feature-icon"><Icon aria-hidden="true" /></span>
        {feature.badge && <span className="hr-feature-badge">{feature.badge}</span>}
      </div>
      <h4>{feature.title}</h4>
      <p>{feature.description}</p>
      <a href="/contact.html" aria-label={`Learn more about ${feature.title}`}>
        Learn More <ArrowRight aria-hidden="true" />
      </a>
    </article>
  );
}

export function HrmsFeaturesContent() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number][0]>("all");
  const [activePlan, setActivePlan] = useState<PlanKey>("basic");

  const visiblePlans = useMemo(() => {
    const term = query.trim().toLowerCase();
    return plans
      .map((plan) => ({
        ...plan,
        groups: plan.groups
          .map((item) => ({
            ...item,
            features: item.features.filter((feature) => {
              const matchesFilter =
                filter === "all" ||
                plan.key === filter ||
                feature.tags.includes(filter);
              const matchesSearch =
                !term ||
                `${feature.title} ${feature.description} ${item.title}`
                  .toLowerCase()
                  .includes(term);
              return matchesFilter && matchesSearch;
            }),
          }))
          .filter((item) => item.features.length),
      }))
      .filter((plan) => plan.groups.length);
  }, [filter, query]);

  const resultCount = visiblePlans.reduce(
    (sum, plan) =>
      sum + plan.groups.reduce((groupSum, item) => groupSum + item.features.length, 0),
    0,
  );

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-hr-plan]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const key = current?.target.getAttribute("data-hr-plan") as PlanKey | null;
        if (key) setActivePlan(key);
      },
      { rootMargin: "-18% 0px -65% 0px", threshold: [0, 0.2] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [filter, query]);

  const goToPlan = (key: PlanKey) => {
    setFilter("all");
    setTimeout(() => {
      document.getElementById(`hr-plan-${key}`)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <main className="hrms-page">
      <section className="hrms-hero">
        <div className="hrms-hero-grid" aria-hidden="true" />
        <div className="shell hrms-hero-layout">
          <div className="hrms-hero-copy">
            <span className="hrms-eyebrow"><span />RedSecure RS-HRMS</span>
            <h1>HRMS Features</h1>
            <p>
              Everything your organization needs to manage employees, attendance,
              payroll, onboarding, performance, workflows, and business operations
              from one platform.
            </p>
            <div className="hrms-hero-actions">
              <a className="primary-button" href="/contact.html">Request Demo <ArrowRight aria-hidden="true" /></a>
              <a className="hrms-secondary-button" href="#hr-feature-explorer">Explore Features <ChevronRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hrms-dashboard" aria-label="HR dashboard illustration">
            <div className="hrms-dashboard-top">
              <span><img src="/redsecure/brand/6.png" alt="" />RS-HRMS</span>
              <i>Live workforce</i>
            </div>
            <div className="hrms-dashboard-body">
              <aside aria-hidden="true"><b /><b /><b /><b /><b /></aside>
              <div className="hrms-dashboard-main">
                <header><span><small>Workforce overview</small><strong>Good morning, HR</strong></span><CircleUserRound aria-hidden="true" /></header>
                <div className="hrms-dashboard-metrics">
                  <div><UsersRound aria-hidden="true" /><small>Employees</small><strong>248</strong><i>+12 this month</i></div>
                  <div><CheckCircle2 aria-hidden="true" /><small>Attendance</small><strong>94%</strong><i>Today</i></div>
                </div>
                <div className="hrms-dashboard-chart">
                  <span><small>Attendance overview</small><strong>Weekly activity</strong></span>
                  <div aria-hidden="true">{[46, 65, 54, 82, 70, 91, 76].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                </div>
              </div>
            </div>
            <div className="hrms-floating-card card-one"><Check aria-hidden="true" /><span><small>Payroll</small><strong>Processing complete</strong></span></div>
            <div className="hrms-floating-card card-two"><UsersRound aria-hidden="true" /><span><small>Onboarding</small><strong>6 new employees</strong></span></div>
          </div>
        </div>
      </section>

      <section className="hrms-explorer" id="hr-feature-explorer">
        <div className="shell">
          <div className="hrms-search-panel">
            <label className="hrms-search">
              <span className="sr-only">Search Features</span>
              <Search aria-hidden="true" />
              <input type="search" placeholder="Search Features" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <div className="hrms-filter-row" aria-label="Filter features">
              {filters.map(([key, label]) => (
                <button key={key} type="button" className={filter === key ? "is-active" : ""} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
              ))}
            </div>
            <span className="hrms-result-count" aria-live="polite">{resultCount} {resultCount === 1 ? "feature" : "features"} found</span>
          </div>

          <div className="hrms-content-layout">
            <aside className="hrms-plan-nav" aria-label="Feature plan navigation">
              <span className="hrms-plan-nav-label">Feature plans</span>
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <button type="button" key={plan.key} className={activePlan === plan.key ? "is-active" : ""} onClick={() => goToPlan(plan.key)}>
                    <span><Icon aria-hidden="true" /></span>
                    <span><strong>{plan.key === "basic" ? "Basic" : plan.key === "professional" ? "Professional" : "Advanced"}</strong><small>{plan.subtitle}</small></span>
                    <ChevronRight aria-hidden="true" />
                  </button>
                );
              })}
              <div className="hrms-plan-help"><ShieldCheck aria-hidden="true" /><strong>Need help choosing?</strong><p>Our team can help you find the right plan.</p><a href="/contact.html">Talk to us</a></div>
            </aside>

            <div className="hrms-feature-sections">
              {visiblePlans.length ? visiblePlans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <section key={plan.key} id={`hr-plan-${plan.key}`} className={`hrms-plan-section plan-${plan.key}`} data-hr-plan={plan.key}>
                    <header className="hrms-plan-heading"><span><Icon aria-hidden="true" /></span><div><small>{plan.eyebrow}</small><h2>{plan.title}</h2><p>{plan.subtitle}</p></div></header>
                    {plan.groups.map((item) => (
                      <div className="hrms-feature-group" key={item.title}>
                        <div className="hrms-feature-group-heading"><h3>{item.title}</h3><span>{item.features.length} features</span></div>
                        <div className="hrms-feature-grid">{item.features.map((feature) => <FeatureCard key={feature.title} feature={feature} />)}</div>
                      </div>
                    ))}
                  </section>
                );
              }) : (
                <div className="hrms-empty-state"><Search aria-hidden="true" /><h2>No features found</h2><p>Try another search term or reset the filters.</p><button type="button" onClick={() => { setQuery(""); setFilter("all"); }}>Show all features</button></div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="hrms-comparison">
        <div className="shell">
          <div className="hrms-section-heading"><span>Compare plans</span><h2>Choose the capability your team needs</h2><p>Start with essential HR tools and expand into engagement, automation, and workforce intelligence.</p></div>
          <div className="hrms-comparison-grid">
            {comparisons.map((plan, index) => (
              <article className={`hrms-price-card ${plan.featured ? "is-featured" : ""}`} key={plan.title}>
                {plan.featured && <span className="hrms-price-popular">Popular</span>}
                <span className="hrms-price-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{plan.title}</h3><p>{plan.subtitle}</p>
                <ul>{plan.features.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                <a href="/contact.html">{plan.cta}<ArrowRight aria-hidden="true" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hrms-benefits">
        <div className="shell">
          <div className="hrms-section-heading light"><span>Why choose our HRMS</span><h2>Powerful HR technology, made approachable</h2></div>
          <div className="hrms-benefit-grid">
            {[
              ["Fast", "Move everyday HR work forward with less manual effort.", Zap],
              ["Secure", "Keep workforce information protected and access controlled.", ShieldCheck],
              ["Cloud Based", "Access your HR workspace wherever your organization operates.", Cloud],
              ["Easy to Use", "Give every employee a clear and approachable experience.", CircleUserRound],
            ].map(([title, description, BenefitIcon], index) => {
              const Icon = BenefitIcon as LucideIcon;
              return <article key={title as string}><span>0{index + 1}</span><Icon aria-hidden="true" /><h3>{title as string}</h3><p>{description as string}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="hrms-faq">
        <div className="shell hrms-faq-layout">
          <div className="hrms-section-heading"><span>Frequently asked questions</span><h2>Everything you need to know</h2><p>Learn how RS-HRMS supports everyday employee, attendance, payroll, and workflow operations.</p><a className="hrms-secondary-button" href="/contact.html">Ask a question <ArrowRight aria-hidden="true" /></a></div>
          <div className="hrms-accordion">
            {faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<i aria-hidden="true" /></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="hrms-final-cta">
        <div className="shell"><div className="hrms-final-cta-inner"><span>RedSecure RS-HRMS</span><h2>Ready to simplify HR management?</h2><p>Bring employees, attendance, payroll, performance, and workflows together in one modern platform.</p><div><a className="primary-button" href="/contact.html">Request Demo <ArrowRight aria-hidden="true" /></a><a href="/contact.html">Contact Sales</a></div></div></div>
      </section>
    </main>
  );
}
