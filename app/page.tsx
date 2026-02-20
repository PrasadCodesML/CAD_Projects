"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Menu, Copy, Check } from "lucide-react"
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

const courses = [
  {
    id: 1,
    slug: "fundamentals-of-automobile-design",
    title: "Fundamentals of Automobile Design, Analysis & Manufacturing",
    tools: ["Tata Ready Engineer", "Automobile Design", "Manufacturing"],
    previewImage: "/Fundamentals of automobile.pdf", // Pointing to your actual PDF
    summary:
      "A comprehensive Ready Engineer program by Tata Technologies covering styling, design development, die/fixture design, CAE, and formability.",
  },
  {
    id: 2,
    slug: "advanced-automobile-design-biw-trims",
    title: "Advanced Automobile Design: BIW & Trims",
    tools: ["Tata Ready Engineer", "Body in White", "Plastics & Trims"],
    previewImage: "/BIW and Trims.pdf", // Pointing to your actual PDF
    summary:
      "Advanced certification from Tata Technologies focusing on Body-In-White (BIW) concepts, plastic design, joining methods, and manufacturing sequences.",
  },
  {
    id: 3,
    slug: "finite-element-method-structural-analysis",
    title: "The Finite Element Method for Structural Analysis (FEM/FEA)",
    tools: ["Udemy", "FEM/FEA", "Structural Analysis"],
    previewImage: "/UdemyFEA.jpg", 
    summary:
      "A 60-hour extensive course by Engineer Renato C. covering 1D/2D/3D elements, matrix mathematics, plane stress/strain, and advanced FEM formulations.",
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

// Helper component to render PDF or Image thumbnails
function MediaPreview({ src, alt }: { src: string, alt: string }) {
    if (!src) return null;
    if (src.toLowerCase().endsWith('.pdf')) {
        return (
            <iframe 
                src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
                title={alt}
                className="w-full h-full pointer-events-none border-none object-cover"
                tabIndex={-1}
            />
        );
    }
    return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

export default function Home() {
  // State to toggle between sections
  const [activeSection, setActiveSection] = useState<'projects' | 'certifications'>('projects');
  // State for the copy email button
  const [isCopied, setIsCopied] = useState(false);

  const email = "prasadkhambadkar@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl flex-1"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance">
            Prasad Khambadkar
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary mb-6 font-medium">
            Design & Analysis
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty mb-8">
            Specialized in computational mechanics, advanced CAD modeling, and structural optimization. 
            Leveraging FEA and parametric design to deliver robust engineering solutions across 
            automotive, consumer products, and industrial applications.
          </p>
          
          {/* Copy Email Button */}
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

        </motion.div>
      </section>

      {/* Large Toggle Navigation */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-12 border-b border-border pb-4">
          <button
            onClick={() => setActiveSection('projects')}
            className={`text-2xl md:text-4xl font-bold pb-2 transition-all relative ${
              activeSection === 'projects' 
                ? 'text-foreground' 
                : 'text-muted-foreground hover:text-foreground/80'
            }`}
          >
            Featured Projects
            {activeSection === 'projects' && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute -bottom-[18px] left-0 right-0 h-1 bg-primary rounded-t-full" 
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveSection('certifications')}
            className={`text-2xl md:text-4xl font-bold pb-2 transition-all relative ${
              activeSection === 'certifications' 
                ? 'text-foreground' 
                : 'text-muted-foreground hover:text-foreground/80'
            }`}
          >
            Courses & Certifications
            {activeSection === 'certifications' && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute -bottom-[18px] left-0 right-0 h-1 bg-primary rounded-t-full" 
              />
            )}
          </button>
        </div>
      </section>

      {/* Dynamic Grid Content */}
      <section className="container mx-auto px-4 py-12 md:py-16 min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          >
            {activeSection === 'projects' 
              ? projects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} initial="hidden" animate="visible">
                    <Card className="p-6 h-full flex flex-col border-border bg-card hover:border-primary/50 transition-colors">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 text-balance">{project.title}</h3>
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
                      <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden mb-4 border border-border relative">
                        <MediaPreview src={project.previewImage} alt={project.title} />
                      </div>
                      <p className="text-foreground mb-4 leading-relaxed">{project.summary}</p>
                      <div className="mt-auto">
                        <Link href={`/projects/${project.slug}`}>
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))
              : courses.map((course) => (
                  <motion.div key={course.id} variants={itemVariants} initial="hidden" animate="visible">
                    <Card className="p-6 h-full flex flex-col border-border bg-card hover:border-primary/50 transition-colors">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 text-balance">{course.title}</h3>
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
                      <div className="w-full aspect-video bg-white rounded-lg overflow-hidden mb-4 border border-border relative">
                        <MediaPreview src={course.previewImage} alt={course.title} />
                      </div>
                      <p className="text-foreground mb-4 leading-relaxed">{course.summary}</p>
                      <div className="mt-auto">
                        <Link href={`/certificates/${course.slug}`}>
                          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                ))
            }
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-8 md:mt-16">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">Designed by Prasad Khambadkar • {new Date().getFullYear()}</p>
            <div className="flex gap-6">
              <a href="http://www.linkedin.com/in/prasad-khambadkar-" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/PrasadCodesML" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:prasadkhambadkar@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}