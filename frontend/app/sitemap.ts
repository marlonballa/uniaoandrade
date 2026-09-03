import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";

const siteUrl = "https://www.uniaoandrade.com.br";

const PRIORITY: Record<string, number> = {
  "/": 1,
  "/taekwondo-catanduva": 0.9,
  "/taekwondo-infantil-catanduva": 0.8,
  "/taekwondo-adulto-catanduva": 0.8,
  "/sobre": 0.6,
  "/contato": 0.5,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${siteUrl}${route.href === "/" ? "" : route.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: PRIORITY[route.href] ?? 0.5,
  }));
}
