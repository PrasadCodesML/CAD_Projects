import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { certificatesData, certificateSlugs } from "./data"
import CertificateDetail from "./certificate-detail"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prasadkhambadkar.vercel.app"

export function generateStaticParams() {
  return certificateSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = certificatesData[slug]

  if (!course) {
    return {
      title: "Certificate not found",
      description: "The requested certificate could not be found.",
    }
  }

  const url = `${SITE_URL}/certificates/${slug}`

  return {
    title: course.title,
    description: course.tagline,
    keywords: [
      ...course.tools,
      "Prasad Khambadkar",
      "Certification",
      course.issuer,
      course.shortTitle,
    ],
    alternates: { canonical: `/certificates/${slug}` },
    openGraph: {
      type: "article",
      url,
      title: course.title,
      description: course.tagline,
      siteName: "Prasad Khambadkar Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.tagline,
    },
  }
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = certificatesData[slug]

  if (!course) notFound()

  const credentialJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: course.title,
    description: course.tagline,
    credentialCategory: "Certification",
    url: `${SITE_URL}/certificates/${slug}`,
    recognizedBy: {
      "@type": "Organization",
      name: course.issuer,
    },
    about: course.contents,
  }

  return (
    <>
      <CertificateDetail course={course} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialJsonLd) }}
      />
    </>
  )
}
