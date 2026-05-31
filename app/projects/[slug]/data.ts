export type ProjectData = {
  title: string
  shortTitle: string
  tagline: string
  tools: string[]
  description: string
  details: string[]
  keyMetrics?: { label: string; value: string }[]
  images: string[]
  videos: string[]
  youtubeId?: string
  youtubeTitle?: string
}

export const projectsData: Record<string, ProjectData> = {
  "leaf-spring-analysis": {
    title: "Static Structural & Fatigue Analysis of Leaf Spring",
    shortTitle: "Leaf Spring Analysis",
    tagline:
      "FEA of a commercial vehicle leaf spring with Goodman fatigue theory — 10⁶-cycle life, safety factor up to 15.",
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
      "Life & Safety: Achieved a life of 1 × 10⁶ cycles with a safety factor ranging from 1.29 to 15, indicating an over-engineered part.",
    ],
    keyMetrics: [
      { label: "Equivalent Stress", value: "6.63 MPa" },
      { label: "Total Deformation", value: "0.012 mm" },
      { label: "Fatigue Life", value: "10⁶ cycles" },
      { label: "Safety Factor", value: "1.29 – 15" },
    ],
    images: ["/images/leaf_spring.png"],
    videos: ["/videos/leaf spring final.mp4"],
  },
  "plastic-oil-canister": {
    title: "Advanced Surface Modeling — Plastic Oil Canister",
    shortTitle: "Plastic Oil Canister",
    tagline:
      "Chunk-based surfacing of a plastic oil canister in CATIA V5 — parametric, mirrored, manufacturable, shelled to solid.",
    tools: ["CATIA V5", "Generative Shape Design (GSD)"],
    description:
      "This part was created using a chunk-based approach, dividing the model into the Main Body, Neck, Sticker Area, and Handles. Dividing the part into chunks ensures the model remains stable and parametric, meaning one section can be changed without collapsing the whole model. The outer limits were defined by extruding sketched large arcs, and the Symmetry tool was applied to ensure the canister was perfectly even. Handles were formed by drawing paths and utilizing the Sweep with Draft Direction to fan out the surfaces at specific angles. Finally, the separate surfaces were joined into a single quilt and converted to solid hollow plastic.",
    details: [
      "Modeling Strategy: Divided into functional chunks to make the model parametric and stable.",
      "Base Shape: Created thin surfaces by extruding large arcs and mirroring them with the Symmetry tool for an even shape.",
      "Sticker Indent: Formed by projecting a sketched rectangle, offsetting the surface inward by 2 mm, and connecting them via a Sweep.",
      "Handle Integration: Drawn paths were swept with Draft Direction, and the Blend tool was used to bridge the surfaces naturally.",
      "Solid Transformation: Individual surfaces were fused, filled via Close Surface, and given wall thickness using the Shell command.",
    ],
    keyMetrics: [
      { label: "Approach", value: "Chunk-based" },
      { label: "Indent Offset", value: "2 mm" },
      { label: "Symmetry", value: "Mirrored" },
      { label: "Output", value: "Shelled solid" },
    ],
    images: [
      "/images/Oil Canister/Oil Canister Design Images (1).png",
      "/images/Oil Canister/Oil Canister Design Images (2).png",
      "/images/Oil Canister/Oil Canister Design Images (3).png",
      "/images/Oil Canister/Oil Canister Design Images (4).png",
    ],
    videos: [],
    youtubeId: "UX6kIUfDqD4",
    youtubeTitle: "Plastic Oil Canister — Walkthrough by Prasad Khambadkar",
  },
  "sheet-metal-component": {
    title: "Pressed Sheet Metal Component Design",
    shortTitle: "Pressed Sheet Metal Component",
    tagline:
      "Master-surface-based pressed sheet metal part in CATIA V5 — 45°/50° sweeps, draft-direction sides, 2 mm thickening.",
    tools: ["CATIA V5", "Advanced Surface Modeling"],
    description:
      "This project represents a classic example of Advanced Surface Modeling for manufacturing a pressed sheet metal component. The strategy relies on creating a 'Master Surface' that acts as the zero-thickness mid-plane or outer mold line before being thickened at the very end. The primary structural walls were built using specific angled extrusions and sweeps at 45° and 50° angles. Because parts are pressed from a mold, the sides utilize a Sweep with Draft Direction to allow easy removal without sticking. Clean, parametric design was maintained by using the CATIA tree's Insert Mode, allowing retroactive feature additions before final flanges were generated.",
    details: [
      "Primary Faces: Front faces built with extrusions and sweeps at specific 45° and 50° angles.",
      "Drafting: Angled sides were created using Sweep with Draft Direction to prevent sticking during the stamping process.",
      "Weld Flanges: Built with a 1.5 mm offset to account for mating part thickness and ensure real-world assembly fit.",
      "Depressions & Ribs: Added drainage channels and circular dents for structural rigidity and water management.",
      "Parametric Control: Used Insert Mode to go back in time and add features cleanly before the final flanges were applied.",
      "Solidification: The joined surface was converted to a thick surface of 2 mm, with mounting holes punched using the Split command.",
    ],
    keyMetrics: [
      { label: "Sweep Angles", value: "45° / 50°" },
      { label: "Flange Offset", value: "1.5 mm" },
      { label: "Wall Thickness", value: "2 mm" },
      { label: "Strategy", value: "Master surface" },
    ],
    images: [
      "/images/Sheet Metal/Sheet Metal Design Images (1).png",
      "/images/Sheet Metal/Sheet Metal Design Images (2).png",
      "/images/Sheet Metal/Sheet Metal Design Images (3).png",
      "/images/Sheet Metal/Sheet Metal Design Images (4).png",
    ],
    videos: [],
    youtubeId: "9xw1rKbWkBI",
    youtubeTitle: "Pressed Sheet Metal Component — Walkthrough by Prasad Khambadkar",
  },
  "topology-optimization-clamp": {
    title: "Topology Optimization — C-Clamp",
    shortTitle: "Topology Optimization (C-Clamp)",
    tagline:
      "Mass minimization of a C-Clamp under 100 N clamping load with a 0.05 mm displacement constraint, validated in SpaceClaim.",
    tools: ["Ansys Workbench", "Structural Optimization"],
    description:
      "This project demonstrated the application of topology optimization to minimize the mass of a C-Clamp while maintaining structural performance. The optimization objective was to minimize mass with a constraint limiting Y-axis displacement to a maximum of 0.05 mm at the clamping points under a 100 N clamping force. The process began with a baseline static structural analysis to understand the initial stress and deformation behavior. The Topology Density Tracker was then applied to visualize areas of high and low material usage, identifying regions where material could be safely removed. The optimized geometry was exported to SpaceClaim for validation and cleanup to ensure the design retained structural integrity and could be manufactured. This study showcased how computational optimization can lead to lighter, more efficient designs without compromising functionality.",
    details: [
      "Objective: Minimize Mass",
      "Constraint: Limit Y-axis displacement to max 0.05 mm at clamping points",
      "Load Case: 100 N clamping force applied",
      "Process Step 1: Performed initial Static Structural baseline analysis",
      "Process Step 2: Applied Topology Density Tracker to visualize material removal",
      "Process Step 3: Validated optimized geometry in SpaceClaim to ensure structural integrity was retained",
    ],
    keyMetrics: [
      { label: "Objective", value: "Min mass" },
      { label: "Displacement", value: "≤ 0.05 mm" },
      { label: "Load", value: "100 N" },
      { label: "Validation", value: "SpaceClaim" },
    ],
    images: ["/images/optimized.png", "/images/original.png"],
    videos: [],
  },
  "transient-ladder-analysis": {
    title: "Transient Structural Analysis — Aluminum Ladder",
    shortTitle: "Transient Ladder Analysis",
    tagline:
      "7-second transient simulation of an aluminum ladder under three sequential 800 N loads, animated at 1× and 1000× scale.",
    tools: ["Ansys Workbench", "Transient Structural"],
    description:
      "This Transient Structural analysis evaluates the behavior of an Aluminum Alloy ladder over a specific time duration. In the Ansys Mechanical window, a Fixed Support was applied to the four legs of the ladder. The analysis settings defined a step end time of 7 seconds, utilizing specific time increments including a 0.1s initial and minimum time step, alongside a 0.2s maximum time step. To simulate dynamic loads, the simulation applied an 800 downward Z-axis tabular force sequentially across three different steps. Finally, Total Deformation and Equivalent Stress were solved and animated at both true scale and a 1000x scale.",
    details: [
      "Material and Boundary: Used Aluminum Alloy with Fixed Supports inserted on the four ladder legs.",
      "Analysis Settings: Configured with a Step End Time of 7 s, minimum time step of 0.1 s, and maximum time step of 0.2 s.",
      "Dynamic Load 1: A Z-component tabular force of −800 was applied to the first step between 2 and 3 seconds.",
      "Dynamic Load 2: A tabular force of −800 was shifted to the second step between 3 and 4 seconds.",
      "Dynamic Load 3: The −800 force was finally applied to the third step between 4 and 5 seconds.",
      "Results Visualization: Evaluated Deformation Total and Equivalent Stress, producing animations at true and 1000× scales.",
    ],
    keyMetrics: [
      { label: "Duration", value: "7 s" },
      { label: "Load", value: "−800 N (Z)" },
      { label: "Time Steps", value: "0.1 – 0.2 s" },
      { label: "Load Steps", value: "3 sequential" },
    ],
    images: ["/images/ladder.png"],
    videos: [
      "/videos/Total deformation final.mp4",
      "/videos/Equivalent Stress Final.mp4",
      "/videos/Total Deformation 1000x final.mp4",
      "/videos/Equivalent Stress 1000x final.mp4",
    ],
  },
}

export const projectSlugs = Object.keys(projectsData)
