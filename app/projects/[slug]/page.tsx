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
    title: "Static Structural & Fatigue Analysis of Leaf Spring",
    tools: ["Ansys Workbench", "Static Structural", "Fatigue Tool"],
    description:
      "This project transitions from CAD to FEA using ANSYS Workbench to test physical behavior under load. The engineering data uses Structural Steel, typical for high-quality spring steel, which heavily dictates the load-bearing capacity. The geometry was broken down using a fine Tetrahedron mesh with a 0.01 mm element size. This fine mesh is critical for accurately capturing stress concentrations in curved areas. Furthermore, a fatigue analysis was conducted using the Goodman Theory to simulate millions of bending cycles and test the part's life.",
    details: [
      "Material: Structural Steel, which heavily dictates the load-bearing capacity.",
      "Meshing: A Tetrahedron mesh with an element size of 0.01 mm was used to create a fine mesh.",
      "Boundary Conditions: Fixed Support applied to the eyelets to mimic bolting to the vehicle's chassis.",
      "Load: A 700 N force applied to the bottom face, directed vertically upwards along the Y-axis.",
      "Results: The analysis calculated a Total Deformation of 0.012 mm and an Equivalent (von Mises) Stress of 6.63 MPa.",
      "Fatigue Analysis: Used Goodman Theory to test the part under cyclic loading.",
      "Life & Safety: Achieved a life of 1 x 10⁶ cycles with a safety factor ranging from 1.29 to 15, indicating an over-engineered part."
    ],
    images: ["/images/leaf_spring.png"],
    videos: ["/videos/leaf spring final.mp4"],
  },
  "plastic-oil-canister": {
    title: "Advanced Surface Modeling - Plastic Oil Canister",
    tools: ["CATIA V5", "Generative Shape Design (GSD)"],
    description:
      "This part was created using a chunk-based approach, dividing the model into the Main Body, Neck, Sticker Area, and Handles. Dividing the part into chunks ensures the model remains stable and parametric, meaning one section can be changed without collapsing the whole model. The outer limits were defined by extruding sketched large arcs, and the Symmetry tool was applied to ensure the canister was perfectly even. Handles were formed by drawing paths and utilizing the Sweep with Draft Direction to fan out the surfaces at specific angles. Finally, the separate surfaces were joined into a single quilt and converted to solid hollow plastic.",
    details: [
      "Modeling Strategy: Divided into functional chunks to make the model parametric and stable.",
      "Base Shape: Created thin surfaces by extruding large arcs and mirroring them with the Symmetry tool for an even shape.",
      "Sticker Indent: Formed by projecting a sketched rectangle, offsetting the surface inward by 2mm, and connecting them via a Sweep.",
      "Handle Integration: Drawn paths were swept with Draft Direction, and the Blend tool was used to bridge the surfaces naturally.",
      "Solid Transformation: Individual surfaces were fused, filled via Close Surface, and given wall thickness using the Shell command."
    ],
    images: ["/images/canister.png"],
    videos: ["/videos/canister final.mp4"],
  },
  "sheet-metal-component": {
    title: "Pressed Sheet Metal Component Design",
    tools: ["CATIA V5", "Advanced Surface Modeling"],
    description:
      "This project represents a classic example of Advanced Surface Modeling for manufacturing a pressed sheet metal component. The strategy relies on creating a 'Master Surface' that acts as the zero-thickness mid-plane or outer mold line before being thickened at the very end. The primary structural walls were built using specific angled extrusions and sweeps at 45° and 50° angles. Because parts are pressed from a mold, the sides utilize a Sweep with Draft Direction to allow easy removal without sticking. Clean, parametric design was maintained by using the CATIA tree's Insert Mode, allowing retroactive feature additions before final flanges were generated.",
    details: [
      "Primary Faces: Front faces built with extrusions and sweeps at specific 45° and 50° angles.",
      "Drafting: Angled sides were created using Sweep with Draft Direction to prevent sticking during the stamping process.",
      "Weld Flanges: Built with a 1.5mm offset to account for mating part thickness and ensure real-world assembly fit.",
      "Depressions & Ribs: Added drainage channels and circular dents for structural rigidity and water management.",
      "Parametric Control: Used Insert Mode to go back in time and add features cleanly before the final flanges were applied.",
      "Solidification: The joined surface was converted to a thick surface of 2mm, with mounting holes punched using the Split command."
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
      "Process Step 3: Validated optimized geometry in SpaceClaim to ensure structural integrity was retained"
    ],
    images: ["/images/optimized.png", "/images/original.png"],
    videos: [],
  },
  "transient-ladder-analysis": {
    title: "Transient Structural Analysis - Aluminum Ladder",
    tools: ["Ansys Workbench", "Transient Structural"],
    description:
      "This Transient Structural analysis evaluates the behavior of an Aluminum Alloy ladder over a specific time duration. In the Ansys Mechanical window, a Fixed Support was applied to the four legs of the ladder. The analysis settings defined a step end time of 7 seconds, utilizing specific time increments including a 0.1s initial and minimum time step, alongside a 0.2s maximum time step. To simulate dynamic loads, the simulation applied an 800 downward Z-axis tabular force sequentially across three different steps. Finally, Total Deformation and Equivalent Stress were solved and animated at both true scale and a 1000x scale.",
    details: [
      "Material and Boundary: Used Aluminum Alloy with Fixed Supports inserted on the four ladder legs.",
      "Analysis Settings: Configured with a Step End Time of 7s, minimum time step of 0.1s, and maximum time step of 0.2s.",
      "Dynamic Load 1: A Z-component tabular force of -800 was applied to the first step between 2 and 3 seconds.",
      "Dynamic Load 2: A tabular force of -800 was shifted to the second step between 3 and 4 seconds.",
      "Dynamic Load 3: The -800 force was finally applied to the third step between 4 and 5 seconds.",
      "Results Visualization: Evaluated Deformation Total and Equivalent Stress, producing animations at true and 1000x scales."
    ],
    images: ["/images/ladder.png"],
    videos: [
      "/videos/Total deformation final.mp4", 
      "/videos/Equivalent Stress Final.mp4",
      "/videos/Total Deformation 1000x final.mp4",
      "/videos/Equivalent Stress 1000x final.mp4"
    ],
  },
};

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