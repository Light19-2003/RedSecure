import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  AboutPage,
  ContactPage,
  HomePage,
  Legacy404Page,
  LegacyBlogPage,
  LegacyTeamPage,
  LegacyTestimonialPage,
  ProductsPage,
  ServicesPage,
} from "../site-components";

const pageTitles: Record<string, string> = {
  "index.html": "RedSecure — IT Solutions",
  "about.html": "About Us — RedSecure",
  "service.html": "Services — RedSecure",
  "project.html": "Products — RedSecure",
  "contact.html": "Contact Us — RedSecure",
  "blog.html": "Our Blog — HighTech",
  "team.html": "Our Team — HighTech",
  "testimonial.html": "Testimonial — HighTech",
  "404.html": "404 Error — HighTech",
};

export function generateStaticParams() {
  return Object.keys(pageTitles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: pageTitles[slug] ?? "RedSecure — IT Solutions",
  };
}

export default async function LegacyRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  switch (slug) {
    case "index.html":
      return <HomePage />;
    case "about.html":
      return <AboutPage />;
    case "service.html":
      return <ServicesPage />;
    case "project.html":
      return <ProductsPage />;
    case "contact.html":
      return <ContactPage />;
    case "blog.html":
      return <LegacyBlogPage />;
    case "team.html":
      return <LegacyTeamPage />;
    case "testimonial.html":
      return <LegacyTestimonialPage />;
    case "404.html":
      return <Legacy404Page />;
    default:
      notFound();
  }
}
