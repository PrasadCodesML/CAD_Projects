"use client"
import { use, useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

const projectsData = {
  "leaf-spring-analysis": {
    title: "Static Structural Analysis of Leaf Spring",
    tools: ["Ansys Workbench", "Static Structural"],
    description:
      "This project involved performing a comprehensive static structural analysis to validate the load-bearing capacity of a commercial vehicle leaf spring. Using Ansys Workbench, I analyzed the deformation, stress distribution, and safety factors under realistic loading conditions. The study also included a fatigue life assessment using the Goodman Theory to ensure long-term reliability under cyclic loading. The fine tetrahedral mesh with 0.01 mm element size ensured high accuracy in the simulation results.",
    details: [
      "Material: Structural Steel (High-quality steel for load capacity)",
      "Meshing: Fine tetrahedron mesh with 0.01 mm element size (Quality check performed)",
      "Boundary Conditions: Fixed Support at the eye; 700N Force applied vertically along the Y-axis",
      "Max Total Deformation: 0.012 mm",
      "Max Equivalent Stress: 6.638 MPa",
      "Safety Factor: Minimum 1.29 (Safe design)",
      "Fatigue Life: 1 x 10⁶ Cycles using Goodman Theory",
    ],
    images: ["/images/leaf_spring.png"],
    videos: ["/videos/leaf spring final.mp4"],
  },
  "plastic-oil-canister": {
    title: "Advanced Surface Modeling - Plastic Oil Canister",
    tools: ["CATIA V5", "Generative Shape Design (GSD)"],
    description:
      'This project showcased advanced surfacing techniques in CATIA V5 using a "chunk-based" approach to design a complex plastic oil canister. The design was organized into logical Geometrical Sets for better parametric control. Multi-section surfaces, swept surfaces with draft directions, and blend surfaces were used to create smooth transitions between different sections. The handle integration required careful surface continuity management. A sticker recess feature was added using offset surfaces and tangent sweeps. The final surface model was validated by converting it to a solid with a 2mm shell thickness to verify manufacturability.',
    details: [
      "Structure: Organized into Geometrical Sets (Main Body, Neck, Handle, Final Shape)",
      "Surfacing: Used Multi-section surfaces, Sweeps with Draft direction, and Blend surfaces for handle integration",
      "Detailing: Created a sticker recess using offset surfaces and tangent sweeps",
      "Finishing: Applied variable radius edge fillets for aesthetics and smooth flow",
      'Final: Converted surface to solid using "Close Surface" and "Shell" (2mm thickness)',
    ],
    images: ["/images/canister.png"],

    videos: ["/videos/canister final.mp4"],
  },
  "sheet-metal-component": {
    title: "Pressed Sheet Metal Component Design",
    tools: ["CATIA V5", "Surfacing", "Sheet Metal Parameters"],
    description:
      "This project focused on modeling a complex pressed sheet metal component with emphasis on parametric stability and proper surface organization. The design workflow followed an ordered Geometrical Set structure to maintain design intent and allow for easy modifications. Sweep with Draft direction features were extensively used to simulate realistic stamping constraints with a 6-degree draft angle. The component includes functional features such as weld flanges for assembly, drainage channels for fluid management, and stiffening depressions (beads) to increase rigidity without adding material. The entire model was built with full parametric constraints, enabling automatic updates when dimensions change. Final validation was performed by thickening the surface to 2mm to verify solid generation and manufacturability.",
    details: [
      "Workflow: Used ordered Geometrical Sets (Front Face, Sides, Weld Flange, Depressions)",
      "Technique: Extensively used Sweep with Draft direction (6 degrees) to simulate stamping constraints",
      "Features: Modeled weld flanges, drainage channels, and stiffening depressions (beads)",
      "Parametric Design: Built with full constraints allowing for automatic updates when dimensions change",
      "Validation: Final surface thickened to 2mm to verify solid generation",
    ],
    images: ["/images/pressed_metal.png"],
    videos: ["/videos/catia extra final.mp4"],
  },
  "topology-optimization-clamp": {
    title: "Topology Optimization - C-Clamp",
    tools: ["Ansys Workbench", "Structural Optimization"],
    description:
      "This project demonstrated the application of topology optimization to minimize the mass of a C-Clamp while maintaining structural performance. The optimization objective was to minimize mass with a constraint limiting Y-axis displacement to a maximum of 0.05mm at the clamping points under a 100N clamping force. The process began with a baseline static structural analysis to understand the initial stress and deformation behavior. The Topology Density Tracker was then applied to visualize areas of high and low material usage, identifying regions where material could be safely removed. The optimized geometry was exported to SpaceClaim for validation and cleanup to ensure the design retained structural integrity and could be manufactured. This study showcased how computational optimization can lead to lighter, more efficient designs without compromising functionality.",
    details: [
      "Objective: Minimize Mass",
      "Constraint: Limit Y-axis displacement to max 0.05mm at clamping points",
      "Load Case: 100N clamping force applied",
      "Process Step 1: Performed initial Static Structural baseline analysis",
      "Process Step 2: Applied Topology Density Tracker to visualize material removal",
      "Process Step 3: Validated optimized geometry in SpaceClaim to ensure structural integrity was retained",
    ],
    images: ["/images/optimized.png", "/images/original.png"],
    videos: [],
  },
  "transient-ladder-analysis": {
    title: "Transient Structural Analysis - Ladder",
    tools: ["Ansys Workbench", "Transient Structural"],
    description:
      "This project involved a transient structural analysis of an aluminum ladder to simulate dynamic stress and deformation under realistic climbing conditions. Unlike static analysis, transient analysis captures time-dependent behavior, making it ideal for simulating dynamic loading scenarios. Time-dependent forces of 800N were applied sequentially to different ladder steps at specific time intervals (1s, 2s, 3s) to mimic a person climbing the ladder. The analysis was set to run for 7 seconds with a minimum time step of 0.1s to capture peak transient effects accurately. Results included animations of total deformation and Von-Mises stress over time, allowing identification of maximum deflection points and stress concentrations during the climbing motion. This analysis ensures the ladder can safely handle dynamic loading conditions encountered in real-world use.",
    details: [
      "Material: Aluminum Alloy",
      "Loading: Time-dependent forces (800N) applied sequentially to steps at specific time intervals (1s, 2s, 3s) to mimic climbing",
      "Settings: Analysis time set to 7 seconds with 0.1s minimum time steps to capture peak transient effects",
      "Results: Analyzed Total Deformation and Von-Mises Stress over time to identify maximum deflection points during the climb",
    ],
    images: ["/images/ladder.png"],
    videos: [
      "/videos/Total deformation final.mp4", 
      "/videos/Equivalent Stress Final.mp4",
      "/videos/Total Deformation 1000x final.mp4",
      "/videos/Equivalent Stress 1000x final.mp4"
    ],
  },
}

// Optimized Video Player Component
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Intersection Observer to only load the video when it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true); // Triggers rendering of the <video> tag
        } else if (videoRef.current) {
          // Pause video if it scrolls out of view to save resources
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the video container is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Handle Autoplay safely once it's in view
  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was prevented:", err);
          if (videoRef.current) videoRef.current.controls = true;
        });
      }
    }
  }, [isInView, src]);

  return (
    <div ref={containerRef} className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden border border-border">
      
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {/* Only mount the video element if it has scrolled into view */}
      {isInView && (
        <video
          ref={videoRef}
          key={src}
          loop
          muted
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
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
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project = projectsData[slug as keyof typeof projectsData]
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
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

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-foreground leading-relaxed text-pretty">{project.description}</p>
          </div>

          {/* Images Section */}
          {project.images.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="w-full aspect-video bg-muted rounded-lg overflow-hidden border border-border">
                    <img src={image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {project.videos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.videos.map((video, index) => (
                  <VideoPlayer key={index} src={video} />
                ))}
              </div>
            </div>
          )}

          {/* Technical Details Section */}
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Technical Details</h2>
            <ul className="space-y-3">
              {project.details.map((detail, index) => (
                <li key={index} className="text-foreground leading-relaxed pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-primary before:text-xl">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}