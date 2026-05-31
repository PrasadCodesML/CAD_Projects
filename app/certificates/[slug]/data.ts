export type CertificateData = {
  title: string
  shortTitle: string
  tagline: string
  tools: string[]
  description: string
  contents: string[]
  certificateImage: string | null
  marksheetImage: string | null
  issuer: string
}

export const certificatesData: Record<string, CertificateData> = {
  "fundamentals-of-automobile-design": {
    title: "Fundamentals of Automobile Design, Analysis & Manufacturing",
    shortTitle: "Fundamentals of Automobile Design",
    tagline:
      "Tata Technologies Ready Engineer Program — Certified Ready Engineer at 80%. Styling, design, die & fixture, CAE, formability.",
    tools: ["Tata Ready Engineer", "Automobile Design", "Manufacturing"],
    description:
      "This program, completed under the Tata Technologies CSR Ready Engineer Program (Batch RE 2024-25), provided a foundational understanding of end-to-end automobile design. I successfully achieved the 'Certified Ready Engineer' status with an 80% score. The curriculum covered various stages of vehicle development, moving from early styling concepts to final formability assessments.",
    contents: [
      "Styling & Initial Concept",
      "Design & Development",
      "Die & Fixture Design",
      "Computer-Aided Engineering (CAE)",
      "Formability Analysis",
    ],
    certificateImage: "/Fundamentals of automobile.pdf",
    marksheetImage: "/mark-1-funda.png",
    issuer: "Tata Technologies",
  },
  "advanced-automobile-design-biw-trims": {
    title: "Advanced Automobile Design: BIW & Trims",
    shortTitle: "Advanced Automobile Design (BIW & Trims)",
    tagline:
      "Advanced Tata Technologies certification — BIW, plastics & trims, joining, DFMEA, CAE design verification.",
    tools: ["Tata Ready Engineer", "Body in White", "Plastics & Trims"],
    description:
      "This advanced program by Tata Technologies focused specifically on Body in White (BIW) structures alongside automotive plastics and trims. I earned the 'Certified Ready Engineer' designation. The course covered requirement specifications, material grade selection, advanced CAE design verification, and modern manufacturing processes.",
    contents: [
      "Requirement Specification & Product Lifecycle Management",
      "Identification of Commodities & Design Concept Considerations",
      "Materials, Grades, and GD&T for Body in White (BIW)",
      "Sheet Metal Joining, Assembly Sequence, and Manufacturing Processes",
      "Trim Materials, Design of Plastics, and Future Trends",
      "Design Failure Mode Effect Analysis (DFMEA) & Test Validation Assessment",
      "Design Verification CAE, Gateway Analysis, and Case Studies",
    ],
    certificateImage: "/BIW and Trims.pdf",
    marksheetImage: "/mark-2-BIWandTrims.png",
    issuer: "Tata Technologies",
  },
  "finite-element-method-structural-analysis": {
    title: "The Finite Element Method for Structural Analysis (FEM/FEA)",
    shortTitle: "FEM/FEA for Structural Analysis",
    tagline:
      "60-hour Udemy course by Engineer Renato C. — elasticity, 1D/2D/3D elements, isoparametric formulation, shell elements.",
    tools: ["Udemy", "FEM/FEA", "Structural Analysis"],
    description:
      "A comprehensive 60-hour certification course completed on Udemy, instructed by Engineer Renato C. This intensive program detailed the core mathematical and theoretical formulations of the Finite Element Method before moving to applied structural analysis.",
    contents: [
      "Introduction to FEM and Equations of Elasticity",
      "Linear Elastic Spring Elements and Bar Elements",
      "Truss Structures and Beam Elements",
      "Matrix Mathematics and Solution Techniques for Linear Algebraic Equations",
      "Plane Stress and Plane Strain Formulations",
      "Isoparametric Formulation",
      "General Three-Dimensional Stress Elements",
      "Shell Element Analysis",
    ],
    certificateImage: "/UdemyFEA.jpg",
    marksheetImage: null,
    issuer: "Udemy",
  },
}

export const certificateSlugs = Object.keys(certificatesData)
