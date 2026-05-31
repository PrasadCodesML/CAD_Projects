import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://prasadkhambadkar.vercel.app"
const SITE_NAME = "Prasad Khambadkar — Mechanical Design & Analysis Engineer"
const SITE_DESCRIPTION =
  "Portfolio of Prasad Khambadkar, a mechanical design & analysis engineer specializing in CATIA V5 advanced surface modeling, Ansys FEA (static, transient, fatigue, topology optimization), sheet metal & BIW design, and computational mechanics — with projects spanning automotive, consumer products, and industrial applications."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Prasad Khambadkar",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Prasad Khambadkar Portfolio",
  authors: [{ name: "Prasad Khambadkar", url: SITE_URL }],
  creator: "Prasad Khambadkar",
  publisher: "Prasad Khambadkar",
  generator: "Next.js",
  category: "Engineering Portfolio",
  keywords: [
    "Prasad Khambadkar",
    "Mechanical Engineer",
    "Mechanical Engineering Portfolio",
    "Design Engineer",
    "Analysis Engineer",
    "CAD Engineer",
    "FEA Engineer",
    "CATIA V5",
    "Generative Shape Design",
    "GSD",
    "Ansys",
    "Ansys Workbench",
    "Static Structural Analysis",
    "Transient Structural Analysis",
    "Fatigue Analysis",
    "Topology Optimization",
    "Sheet Metal Design",
    "Surface Modeling",
    "Body in White",
    "BIW",
    "Plastics & Trims",
    "Finite Element Method",
    "FEM",
    "Computational Mechanics",
    "Automotive Engineering",
    "Tata Technologies Ready Engineer",
    "VIT Pune",
    "Vishwakarma Institute of Technology",
    "Vishwakarma Institute of Technology, Pune",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/Profile.jpg",
        width: 826,
        height: 1062,
        alt: "Prasad Khambadkar — Mechanical Design & Analysis Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/Profile.jpg"],
    creator: "@PrasadCodesML",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
  width: "device-width",
  initialScale: 1,
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Prasad Khambadkar",
  alternateName: "PrasadCodesML",
  url: SITE_URL,
  image: `${SITE_URL}/Profile.jpg`,
  jobTitle: "Mechanical Design & Analysis Engineer",
  description: SITE_DESCRIPTION,
  email: "mailto:prasadkhambadkar@gmail.com",
  sameAs: [
    "https://github.com/PrasadCodesML",
    "https://www.linkedin.com/in/prasad-khambadkar-",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Vishwakarma Institute of Technology, Pune",
  },
  knowsAbout: [
    "Computer-Aided Design (CAD)",
    "CATIA V5",
    "Generative Shape Design",
    "Advanced Surface Modeling",
    "Sheet Metal Design",
    "Body in White (BIW)",
    "Plastics & Trims",
    "Finite Element Analysis",
    "Ansys Workbench",
    "Static Structural Analysis",
    "Transient Structural Analysis",
    "Fatigue Analysis (Goodman Theory)",
    "Topology Optimization",
    "Computational Mechanics",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Certified Ready Engineer — Fundamentals of Automobile Design, Analysis & Manufacturing",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "Tata Technologies" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Certified Ready Engineer — Advanced Automobile Design: BIW & Trims",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "Tata Technologies" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "The Finite Element Method for Structural Analysis (FEM/FEA) — 60 hours",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "Udemy" },
    },
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "en-US",
  author: { "@type": "Person", name: "Prasad Khambadkar" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  )
}
