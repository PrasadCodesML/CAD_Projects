"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const projects = [
  {
    id: 1,
    slug: "leaf-spring-analysis",
    title: "Static Structural Analysis of Leaf Spring",
    tools: ["Ansys Workbench", "Static Structural"],
    previewImage: "/images/leaf_spring.png",
    summary:
      "Performed a static structural analysis to validate the load-bearing capacity of a commercial vehicle leaf spring.",
  },
  {
    id: 2,
    slug: "plastic-oil-canister",
    title: "Advanced Surface Modeling - Plastic Oil Canister",
    tools: ["CATIA V5", "Generative Shape Design (GSD)"],
    previewImage: "/images/canister.png",
    summary:
      'Designed a complex plastic oil canister using a "chunk-based" surfacing approach to ensure manufacturability and draft analysis.',
  },
  {
    id: 3,
    slug: "sheet-metal-component",
    title: "Pressed Sheet Metal Component Design",
    tools: ["CATIA V5", "Surfacing", "Sheet Metal Parameters"],
    previewImage: "/images/pressed_metal.png",
    summary: "Modeled a complex pressed sheet metal part emphasizing parametric stability and surface organization.",
  },
  {
    id: 4,
    slug: "topology-optimization-clamp",
    title: "Topology Optimization - C-Clamp",
    tools: ["Ansys Workbench", "Structural Optimization"],
    previewImage: "/images/optimized.png",
    summary:
      "Conducted a topology optimization study to minimize the mass of a C-Clamp while maintaining stiffness constraints.",
  },
  {
    id: 5,
    slug: "transient-ladder-analysis",
    title: "Transient Structural Analysis - Ladder",
    tools: ["Ansys Workbench", "Transient Structural"],
    previewImage: "/images/ladder.png",
    summary:
      "Simulated dynamic stress and deformation on an aluminum ladder under time-dependent loading conditions (climbing simulation).",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">Prasad Khambadkar</h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary mb-6 font-medium">Design & Analysis</p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            Specialized in computational mechanics, advanced CAD modeling, and structural optimization. Leveraging FEA
            and parametric design to deliver robust engineering solutions across automotive, consumer products, and
            industrial applications.
          </p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-12"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="p-6 h-full flex flex-col border-border bg-card hover:border-primary/50 transition-colors">
                {/* Project Title */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 text-balance">{project.title}</h3>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
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

                {/* Media Placeholder */}
                <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden mb-4 border border-border">
                  <img
                    src={project.previewImage || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Project Summary */}
                <p className="text-foreground mb-4 leading-relaxed">{project.summary}</p>

                {/* Key Technical Steps */}
                <div className="mt-auto">
                  <Link href={`/projects/${project.slug}`}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16 md:mt-24">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">Designed by Prasad Khambadkar • {new Date().getFullYear()}</p>
            <div className="flex gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
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
