import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prasadkhambadkar.vercel.app"

const projectSlugs = [
  "leaf-spring-analysis",
  "plastic-oil-canister",
  "sheet-metal-component",
  "topology-optimization-clamp",
  "transient-ladder-analysis",
]

const certificateSlugs = [
  "fundamentals-of-automobile-design",
  "advanced-automobile-design-biw-trims",
  "finite-element-method-structural-analysis",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectSlugs.map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...certificateSlugs.map((slug) => ({
      url: `${SITE_URL}/certificates/${slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ]
}
