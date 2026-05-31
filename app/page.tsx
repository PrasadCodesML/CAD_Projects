"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  Cog,
  Cpu,
  Layers,
  Activity,
  Wrench,
  ArrowRight,
  GraduationCap,
  Award,
  Sparkles,
  MapPin,
  Menu,
  X,
  Hammer,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const projects = [
  {
    id: 1,
    slug: "leaf-spring-analysis",
    title: "Static Structural & Fatigue Analysis of Leaf Spring",
    tools: ["Ansys Workbench", "Static Structural", "Fatigue"],
    previewImage: "/images/leaf_spring.png",
    summary:
      "Validated load-bearing capacity of a commercial vehicle leaf spring with fine-mesh FEA and Goodman fatigue theory — achieved a 10⁶-cycle life and safety factor up to 15.",
    metrics: [
      { label: "Stress", value: "6.63 MPa" },
      { label: "Deformation", value: "0.012 mm" },
      { label: "Life", value: "10⁶ cycles" },
    ],
  },
  {
    id: 2,
    slug: "plastic-oil-canister",
    title: "Advanced Surface Modeling — Plastic Oil Canister",
    tools: ["CATIA V5", "Generative Shape Design"],
    previewImage: "/images/Oil Canister/Oil Canister Design Images (1).png",
    summary:
      'Designed a complex plastic oil canister using a "chunk-based" surfacing approach — parametric, manufacturable, and validated with draft analysis before shelling to a hollow solid.',
    metrics: [
      { label: "Approach", value: "Chunk-based" },
      { label: "Symmetry", value: "Mirrored" },
      { label: "Output", value: "Shelled solid" },
    ],
  },
  {
    id: 3,
    slug: "sheet-metal-component",
    title: "Pressed Sheet Metal Component Design",
    tools: ["CATIA V5", "Surfacing", "Sheet Metal"],
    previewImage: "/images/Sheet Metal/Sheet Metal Design Images (1).png",
    summary:
      "Modeled a complex pressed sheet metal part on a master surface with 45°/50° angled sweeps, draft-direction sides for stamping release, weld flanges, and a 2 mm thickening operation.",
    metrics: [
      { label: "Draft", value: "45° / 50°" },
      { label: "Flanges", value: "1.5 mm offset" },
      { label: "Thickness", value: "2 mm" },
    ],
  },
  {
    id: 4,
    slug: "topology-optimization-clamp",
    title: "Topology Optimization — C-Clamp",
    tools: ["Ansys Workbench", "Structural Optimization"],
    previewImage: "/images/optimized.png",
    summary:
      "Minimized mass of a C-Clamp under a 100 N clamping load while constraining Y-axis displacement to 0.05 mm, then validated the lightweighted geometry in SpaceClaim.",
    metrics: [
      { label: "Objective", value: "Min mass" },
      { label: "Constraint", value: "0.05 mm" },
      { label: "Load", value: "100 N" },
    ],
  },
  {
    id: 5,
    slug: "transient-ladder-analysis",
    title: "Transient Structural Analysis — Aluminum Ladder",
    tools: ["Ansys Workbench", "Transient Structural"],
    previewImage: "/images/ladder.png",
    summary:
      "Simulated three sequential 800 N climbing loads on an aluminum ladder over 7 s with adaptive time-stepping — produced animated deformation and stress fields at 1× and 1000× scale.",
    metrics: [
      { label: "Duration", value: "7 s" },
      { label: "Load", value: "−800 N (Z)" },
      { label: "Steps", value: "3 sequential" },
    ],
  },
]

const courses = [
  {
    id: 1,
    slug: "fundamentals-of-automobile-design",
    title: "Fundamentals of Automobile Design, Analysis & Manufacturing",
    tools: ["Tata Ready Engineer", "Automobile Design", "Manufacturing"],
    previewImage: "/Fundamentals of automobile.pdf",
    summary:
      "Tata Technologies Ready Engineer Program (Batch RE 2024-25). Certified Ready Engineer at 80%. Covers styling, design development, die & fixture design, CAE, and formability.",
  },
  {
    id: 2,
    slug: "advanced-automobile-design-biw-trims",
    title: "Advanced Automobile Design: BIW & Trims",
    tools: ["Tata Ready Engineer", "Body in White", "Plastics & Trims"],
    previewImage: "/BIW and Trims.pdf",
    summary:
      "Advanced certification from Tata Technologies — BIW concepts, plastic design, joining methods, manufacturing sequences, DFMEA, and CAE verification.",
  },
  {
    id: 3,
    slug: "finite-element-method-structural-analysis",
    title: "The Finite Element Method for Structural Analysis (FEM/FEA)",
    tools: ["Udemy", "FEM/FEA", "Structural Analysis"],
    previewImage: "/UdemyFEA.jpg",
    summary:
      "60-hour course by Engineer Renato C. — 1D/2D/3D elements, plane stress/strain, isoparametric formulation, and shell element analysis.",
  },
]

const skills = [
  {
    icon: Layers,
    name: "CATIA V5",
    description:
      "Advanced surface modeling with Generative Shape Design, sheet metal parametric workflows, and BIW concepts.",
    level: "Advanced",
  },
  {
    icon: Activity,
    name: "Ansys Workbench",
    description:
      "Static structural, transient, fatigue (Goodman theory), and topology optimization studies with mesh refinement.",
    level: "Advanced",
  },
  {
    icon: Cog,
    name: "Finite Element Method",
    description:
      "1D / 2D / 3D elements, plane stress & strain, isoparametric formulation, shell elements, and matrix mathematics.",
    level: "Proficient",
  },
  {
    icon: Hammer,
    name: "Design for Manufacturing",
    description:
      "Die & fixture design, formability analysis, sheet metal joining, GD&T, and DFMEA for automotive components.",
    level: "Proficient",
  },
  {
    icon: Cpu,
    name: "SpaceClaim",
    description:
      "Geometry repair, post-optimization clean-up, defeaturing, and prep of CAD for downstream FEA workflows.",
    level: "Proficient",
  },
  {
    icon: Wrench,
    name: "Engineering Workflow",
    description:
      "Translating concepts into parametric CAD, validating via FEA, and iterating from results back into design.",
    level: "Core strength",
  },
]

const stats = [
  { value: "5+", label: "Engineering projects" },
  { value: "3", label: "Industry certifications" },
  { value: "60+", label: "FEA course hours" },
  { value: "2", label: "Tata Ready Engineer programs" },
]

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

function MediaPreview({ src, alt }: { src: string; alt: string }) {
  if (!src) return null
  if (src.toLowerCase().endsWith(".pdf")) {
    return (
      <iframe
        src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
        title={alt}
        className="w-full h-full pointer-events-none border-none object-cover"
        tabIndex={-1}
      />
    )
  }
  return <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<"projects" | "certifications">("projects")
  const [isCopied, setIsCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const email = "prasadkhambadkar@gmail.com"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy email", err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Top Nav */}
      <header
        className={`sticky top-0 z-40 w-full transition-all ${
          scrolled
            ? "bg-background/85 backdrop-blur-md border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 h-16 flex items-center justify-between">
          <a
            href="#top"
            className="font-bold text-base md:text-lg text-foreground tracking-tight"
          >
            Prasad Khambadkar
            <span className="hidden sm:inline text-muted-foreground font-normal">
              {" "}
              · Design & Analysis
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/prasad-khambadkar-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden sm:inline-flex p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/PrasadCodesML"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden sm:inline-flex p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <ThemeToggle />
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="#contact">Get in touch</a>
            </Button>
            <button
              aria-label="Toggle navigation"
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileNavOpen((v) => !v)}
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-md overflow-hidden"
            >
              <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="text-foreground hover:text-primary transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <span id="top" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_20%_10%,oklch(0.55_0.15_250/0.10),transparent_60%),radial-gradient(40%_40%_at_85%_0%,oklch(0.55_0.15_250/0.08),transparent_60%)]"
        />
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-24 lg:py-28 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-border bg-card text-xs md:text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary/60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Open to graduate / internship roles in mechanical design & CAE
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance tracking-tight">
              Prasad Khambadkar
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-primary mb-6 font-medium">
              Mechanical Design & Analysis Engineer
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty mb-8">
              I build parametric CAD models in CATIA V5 and validate them with FEA in
              Ansys Workbench — static, transient, fatigue, and topology optimization.
              Focused on translating clean engineering intent into manufacturable,
              simulation-backed designs across automotive, consumer products, and
              industrial applications.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href="#work">
                  View Work <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
              <Button
                onClick={handleCopyEmail}
                variant="outline"
                size="lg"
                className="gap-2 font-medium"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">Email copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Email
                  </>
                )}
              </Button>
              <a
                href="https://www.linkedin.com/in/prasad-khambadkar-"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Based in India · Vishwakarma Institute of Technology, Pune</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative flex-shrink-0"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full bg-primary/15 blur-xl"
              />
              <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-card shadow-xl ring-1 ring-border">
                <img
                  src="/Profile.jpg"
                  alt="Prasad Khambadkar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-card border border-border rounded-full px-3 py-1.5 text-xs font-medium shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                CATIA · Ansys
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 pb-12 md:pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-y border-border py-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {s.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-20 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          <div>
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              About
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              CAD-first thinking, simulation-backed decisions.
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a mechanical engineering student at <strong className="text-foreground">Vishwakarma Institute of Technology, Pune</strong>{" "}
              with a strong focus on the design-to-simulation loop. My work
              starts with clean, parametric CAD — usually in CATIA V5 — and ends
              with validated FEA results in Ansys Workbench that I can defend
              with numbers, not just renders.
            </p>
            <p>
              I&apos;ve completed two <strong className="text-foreground">Tata Technologies Ready Engineer</strong> programs covering
              automobile design, BIW, plastics & trims, die/fixture design, and
              formability — alongside a 60-hour FEM/FEA certification covering
              everything from elasticity equations to shell elements.
            </p>
            <p>
              The projects below are hands-on — chunk-based surfacing of a
              plastic canister, a pressed sheet metal component built off a
              master surface, fatigue analysis on a leaf spring with Goodman
              theory, topology optimization of a C-clamp, and a transient
              study on a climbing ladder.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-20 scroll-mt-20">
        <div className="mb-10 md:mb-14">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Skills & Tools
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            The stack I design and analyze with.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="p-6 h-full border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-secondary text-foreground/70 border-border text-xs"
                    >
                      {skill.level}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Work toggle (projects / certifications) */}
      <section id="work" className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 pt-8 md:pt-12 scroll-mt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-6 md:mb-8">
          <div>
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Work
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Projects & certifications.
            </h2>
          </div>
          <div className="inline-flex p-1 rounded-full border border-border bg-card">
            <button
              onClick={() => setActiveSection("projects")}
              className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "projects"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveSection("certifications")}
              className={`px-4 md:px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSection === "certifications"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Certifications
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 pb-12 md:pb-16 min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          >
            {activeSection === "projects"
              ? projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="p-0 h-full flex flex-col border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden group">
                      <div className="w-full aspect-[16/10] bg-muted overflow-hidden border-b border-border relative">
                        <div className="absolute inset-0 group-hover:scale-[1.03] transition-transform duration-500">
                          <MediaPreview
                            src={project.previewImage}
                            alt={project.title}
                          />
                        </div>
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          {project.tools.slice(0, 2).map((tool, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-background/85 backdrop-blur-sm text-foreground border-border text-xs"
                            >
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 text-balance">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-5 leading-relaxed text-sm md:text-base">
                          {project.summary}
                        </p>

                        {project.metrics && (
                          <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-border">
                            {project.metrics.map((m) => (
                              <div key={m.label}>
                                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                                  {m.label}
                                </div>
                                <div className="text-sm md:text-base font-semibold text-foreground mt-0.5">
                                  {m.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto">
                          <Link href={`/projects/${project.slug}`} className="block">
                            <Button
                              variant="secondary"
                              className="w-full justify-between bg-secondary text-foreground border border-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary group/btn transition-colors"
                            >
                              View Case Study
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              : courses.map((course) => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Card className="p-0 h-full flex flex-col border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden group">
                      <div className="w-full aspect-[16/10] bg-white overflow-hidden border-b border-border relative">
                        <MediaPreview
                          src={course.previewImage}
                          alt={course.title}
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-2 mb-4">
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
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 text-balance">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground mb-5 leading-relaxed text-sm md:text-base">
                          {course.summary}
                        </p>
                        <div className="mt-auto">
                          <Link href={`/certificates/${course.slug}`} className="block">
                            <Button
                              variant="secondary"
                              className="w-full justify-between bg-secondary text-foreground border border-transparent hover:bg-primary hover:text-primary-foreground hover:border-primary group/btn transition-colors"
                            >
                              View Certificate
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Education */}
      <section
        id="education"
        className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-20 scroll-mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          <div>
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Education
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Where I&apos;m studying & training.
            </h2>
          </div>
          <div className="md:col-span-2 space-y-4">
            <Card className="p-6 border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">
                    Vishwakarma Institute of Technology, Pune
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Mechanical Engineering (Undergraduate)
                  </p>
                  <p className="text-sm text-foreground mt-3 leading-relaxed">
                    Coursework spanning solid mechanics, machine design,
                    thermodynamics, and manufacturing — paired with project work
                    in CAD, FEA, and design optimization.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground">
                    Tata Technologies — Ready Engineer Program
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Certified Ready Engineer · Batch RE 2024-25
                  </p>
                  <p className="text-sm text-foreground mt-3 leading-relaxed">
                    Two completed programs: fundamentals of automobile design,
                    analysis & manufacturing, and an advanced track focused on
                    Body in White (BIW), plastics, and trims.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-16 md:py-24 scroll-mt-20"
      >
        <Card className="relative overflow-hidden border-border bg-card p-8 md:p-14 text-center">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 [background:radial-gradient(60%_60%_at_50%_0%,oklch(0.55_0.15_250/0.12),transparent_70%)]"
          />
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Contact
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight text-balance">
            Let&apos;s build something that holds up under load.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
            Looking for a design engineer who can take a brief from sketch to
            simulation-validated CAD? I&apos;m open to graduate roles,
            internships, and collaboration on mechanical design / CAE work.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href={`mailto:${email}`}>
                <Mail className="w-4 h-4" />
                Email me
              </a>
            </Button>
            <Button
              onClick={handleCopyEmail}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {email}
                </>
              )}
            </Button>
            <Button asChild variant="ghost" size="lg" className="gap-2">
              <a
                href="https://www.linkedin.com/in/prasad-khambadkar-"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16 py-8 md:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Designed & built by Prasad Khambadkar · {new Date().getFullYear()}
            </p>
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/in/prasad-khambadkar-"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/PrasadCodesML"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Email Prasad"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
