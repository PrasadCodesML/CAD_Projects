"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Loader2,
  Play,
  Youtube,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import type { ProjectData } from "./data"

function YouTubeEmbed({
  id,
  title,
}: {
  id: string
  title: string
}) {
  const [activated, setActivated] = useState(false)

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border shadow-sm">
      {!activated ? (
        <button
          type="button"
          aria-label={`Play YouTube video: ${title}`}
          onClick={() => setActivated(true)}
          className="absolute inset-0 group"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 md:w-9 md:h-9 ml-1 fill-white" />
            </div>
          </div>
          <div className="absolute bottom-3 left-4 right-4 text-left text-white">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
              <Youtube className="w-3.5 h-3.5 text-red-500" /> Watch on YouTube
            </div>
            <p className="mt-2 text-sm md:text-base font-medium text-balance line-clamp-2">
              {title}
            </p>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  )
}

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
        } else if (videoRef.current) {
          videoRef.current.pause()
        }
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [])

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.muted = true
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was prevented:", err)
          if (videoRef.current) videoRef.current.controls = true
        })
      }
    }
  }, [isInView, src])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-muted rounded-xl overflow-hidden border border-border"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
      {isInView && (
        <video
          ref={videoRef}
          key={src}
          loop
          muted
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadStart={() => setIsLoading(true)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onCanPlay={() => setIsLoading(false)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  )
}

function ImageGallery({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null)
      if (e.key === "ArrowRight")
        setActiveIndex((i) =>
          i === null ? null : (i + 1) % images.length
        )
      if (e.key === "ArrowLeft")
        setActiveIndex((i) =>
          i === null ? null : (i - 1 + images.length) % images.length
        )
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [activeIndex, images.length])

  const isSingle = images.length === 1

  return (
    <>
      <div
        className={`grid gap-4 ${
          isSingle
            ? "grid-cols-1"
            : images.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {images.map((image, index) => (
          <motion.button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group relative w-full aspect-video bg-muted rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
            aria-label={`Open image ${index + 1} of ${images.length} in fullscreen`}
          >
            <img
              src={image}
              alt={`${title} — view ${index + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3 h-3" /> Expand
            </div>
            <div className="absolute bottom-3 left-3 text-xs text-white/90 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
              {index + 1} / {images.length}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              className="absolute top-6 right-6 p-2 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-50"
              onClick={() => setActiveIndex(null)}
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveIndex(
                      (i) =>
                        i === null
                          ? null
                          : (i - 1 + images.length) % images.length
                    )
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-50"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveIndex((i) =>
                      i === null ? null : (i + 1) % images.length
                    )
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.img
              key={images[activeIndex]}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={images[activeIndex]}
              alt={`${title} — view ${activeIndex + 1}`}
              className="max-w-full max-h-[88vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-foreground bg-card border border-border px-3 py-1 rounded-full">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function ProjectDetail({
  slug,
  project,
}: {
  slug: string
  project: ProjectData
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-6 flex items-center justify-between gap-3">
        <Link href="/#work">
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </Link>
        <ThemeToggle />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="mb-10 md:mb-14">
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tools.map((tool, index) => (
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
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl text-pretty">
              {project.tagline}
            </p>

            {project.keyMetrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
                {project.keyMetrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="text-lg md:text-2xl font-bold text-foreground mt-1">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* YouTube Video Walkthrough */}
          {project.youtubeId && (
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-2 mb-5">
                <Youtube className="w-5 h-5 text-red-500" />
                <h2 className="text-2xl font-bold text-foreground">
                  Project Walkthrough
                </h2>
              </div>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                A narrated YouTube walkthrough of the modelling and engineering
                decisions behind this project.
              </p>
              <YouTubeEmbed
                id={project.youtubeId}
                title={project.youtubeTitle ?? project.title}
              />
            </div>
          )}

          {/* Overview */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Project Overview
            </h2>
            <p className="text-foreground leading-relaxed text-pretty md:text-lg">
              {project.description}
            </p>
          </div>

          {/* Image Gallery */}
          {project.images.length > 0 && (
            <div className="mb-12 md:mb-16">
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
                <span className="text-sm text-muted-foreground">
                  Click any image to expand
                </span>
              </div>
              <ImageGallery images={project.images} title={project.title} />
            </div>
          )}

          {/* Videos */}
          {project.videos.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-5">
                Simulation & Modelling Videos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.videos.map((video, index) => (
                  <VideoPlayer key={index} src={video} />
                ))}
              </div>
            </div>
          )}

          {/* Technical Details */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Technical Details
            </h2>
            <ul className="space-y-4">
              {project.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-foreground leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:p-8 rounded-xl border border-border bg-card">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                Want to see the rest of my work?
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Explore other CAD &amp; FEA projects in the portfolio.
              </p>
            </div>
            <Link href="/#work">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
