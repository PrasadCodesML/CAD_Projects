import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projectsData, projectSlugs } from "./data"
import ProjectDetail from "./project-detail"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prasadkhambadkar.vercel.app"

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projectsData[slug]

  if (!project) {
    return {
      title: "Project not found",
      description: "The requested project could not be found.",
    }
  }

  const url = `${SITE_URL}/projects/${slug}`
  const ogImage = project.images[0]?.startsWith("/")
    ? `${SITE_URL}${project.images[0]}`
    : project.images[0]

  return {
    title: project.title,
    description: project.tagline,
    keywords: [
      ...project.tools,
      "Prasad Khambadkar",
      "Mechanical Engineering",
      "Portfolio",
      project.shortTitle,
    ],
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description: project.tagline,
      siteName: "Prasad Khambadkar Portfolio",
      images: ogImage ? [{ url: ogImage, alt: project.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projectsData[slug]

  if (!project) notFound()

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.tagline,
    url: `${SITE_URL}/projects/${slug}`,
    inLanguage: "en-US",
    keywords: project.tools.join(", "),
    author: {
      "@type": "Person",
      name: "Prasad Khambadkar",
      url: SITE_URL,
    },
    image: project.images.map((img) =>
      img.startsWith("/") ? `${SITE_URL}${img}` : img
    ),
    ...(project.youtubeId && {
      video: {
        "@type": "VideoObject",
        name: project.youtubeTitle ?? project.title,
        description: project.tagline,
        embedUrl: `https://www.youtube.com/embed/${project.youtubeId}`,
        thumbnailUrl: `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg`,
        uploadDate: "2025-01-01",
      },
    }),
  }

  return (
    <>
      <ProjectDetail slug={slug} project={project} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
    </>
  )
}
