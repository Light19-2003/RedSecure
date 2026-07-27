import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://redsecure.online";
  return [
    "",
    "/index.html",
    "/about.html",
    "/service.html",
    "/project.html",
    "/contact.html",
    "/blog.html",
    "/team.html",
    "/testimonial.html",
    "/404.html",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
