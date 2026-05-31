"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, FileCheck, FileSpreadsheet, X, Maximize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import type { CertificateData } from "./data"

function MediaPreview({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  if (!src) return null
  if (src.toLowerCase().endsWith(".pdf")) {
    return (
      <iframe
        src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
        title={alt}
        className={`w-full h-full pointer-events-none border-none ${className || ""}`}
        tabIndex={-1}
      />
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full h-full object-cover ${className || ""}`}
    />
  )
}

export default function CertificateDetail({
  course,
}: {
  course: CertificateData
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedImage) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [selectedImage])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-6 flex items-center justify-between gap-3">
        <Link href="/#work">
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Certifications
          </Button>
        </Link>
        <ThemeToggle />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap gap-2 mb-5">
            {course.tools.map((tool, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
              >
                {tool}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 text-balance tracking-tight">
            {course.title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl text-pretty mb-10">
            {course.tagline}
          </p>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-foreground leading-relaxed text-pretty md:text-lg">
              {course.description}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Course Contents & Topics Covered
            </h2>
            <ul className="space-y-3">
              {course.contents.map((topic, index) => (
                <li
                  key={index}
                  className="text-foreground leading-relaxed pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-primary before:text-xl"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Documents</h2>
              <span className="text-sm text-muted-foreground">
                Click any document to expand
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {course.certificateImage && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <FileCheck className="w-5 h-5 text-primary" />
                    <span>Certificate of Completion</span>
                  </div>
                  <button
                    type="button"
                    className="w-full aspect-[4/3] bg-muted rounded-xl overflow-hidden border border-border cursor-pointer group relative hover:border-primary/50 transition-colors"
                    onClick={() => setSelectedImage(course.certificateImage)}
                    aria-label={`Open ${course.title} certificate fullscreen`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 bg-background/85 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3" /> Expand
                    </div>
                    <MediaPreview
                      src={course.certificateImage}
                      alt={`${course.title} Certificate`}
                      className="group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </button>
                </div>
              )}

              {course.marksheetImage && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                    <span>Course Marksheet / Assessment</span>
                  </div>
                  <button
                    type="button"
                    className="w-full aspect-[4/3] bg-muted rounded-xl overflow-hidden border border-border cursor-pointer group relative hover:border-primary/50 transition-colors"
                    onClick={() => setSelectedImage(course.marksheetImage)}
                    aria-label={`Open ${course.title} marksheet fullscreen`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 bg-background/85 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3 h-3" /> Expand
                    </div>
                    <MediaPreview
                      src={course.marksheetImage}
                      alt={`${course.title} Marksheet`}
                      className="group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:p-8 rounded-xl border border-border bg-card">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                Explore more
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                See projects and other certifications in the portfolio.
              </p>
            </div>
            <Link href="/#work">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all work
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 p-2 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-50"
              onClick={() => setSelectedImage(null)}
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>

            {selectedImage.toLowerCase().endsWith(".pdf") ? (
              <motion.iframe
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                src={selectedImage}
                className="w-[90vw] h-[90vh] max-w-5xl rounded-lg shadow-2xl border border-border bg-white"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                src={selectedImage}
                alt="Fullscreen Document"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-border bg-white"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
