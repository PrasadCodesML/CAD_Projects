"use client"
import { use, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, FileCheck, FileSpreadsheet, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

// Updated with your actual course details
const certificatesData = {
    "fundamentals-of-automobile-design": {
        title: "Fundamentals of Automobile Design, Analysis & Manufacturing",
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
    },
    "advanced-automobile-design-biw-trims": {
        title: "Advanced Automobile Design: BIW & Trims",
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
    },
    "finite-element-method-structural-analysis": {
        title: "The Finite Element Method for Structural Analysis (FEM/FEA)",
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
    },
}

// Helper component to render PDF or Image thumbnails
function MediaPreview({ src, alt, className }: { src: string, alt: string, className?: string }) {
    if (!src) return null;
    if (src.toLowerCase().endsWith('.pdf')) {
        return (
            <iframe 
                src={`${src}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`} 
                title={alt}
                className={`w-full h-full pointer-events-none border-none ${className || ''}`}
                tabIndex={-1}
            />
        );
    }
    return <img src={src} alt={alt} className={`w-full h-full object-cover ${className || ''}`} />;
}

export default function CertificatePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const course = certificatesData[slug as keyof typeof certificatesData]
    
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    
    if (!course) {
        notFound()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") setSelectedImage(null)
    }

    return (
        <div 
            className="min-h-screen bg-background"
            onKeyDown={handleKeyDown}
            tabIndex={0} 
        >
            <div className="container mx-auto px-4 py-6">
                <Link href="/#certifications">
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Certifications
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
                        {course.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-8">
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

                    <div className="prose prose-lg max-w-none mb-12">
                        <p className="text-foreground leading-relaxed text-pretty">{course.description}</p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6 md:p-8 mb-12">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Course Contents & Topics Covered</h2>
                        <ul className="space-y-3">
                        {course.contents.map((topic, index) => (
                            <li key={index} className="text-foreground leading-relaxed pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-primary before:text-xl">
                            {topic}
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Documents</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Certificate File */}
                        {course.certificateImage && (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-foreground font-medium">
                                    <FileCheck className="w-5 h-5 text-primary" />
                                    <span>Certificate of Completion</span>
                                </div>
                                <div 
                                    className="w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden border border-border cursor-pointer group relative"
                                    onClick={() => setSelectedImage(course.certificateImage)}
                                >
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                                    <MediaPreview 
                                        src={course.certificateImage} 
                                        alt={`${course.title} Certificate`}
                                        className="group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Marksheet File */}
                        {course.marksheetImage && (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-foreground font-medium">
                                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                                    <span>Course Marksheet / Assessment</span>
                                </div>
                                <div 
                                    className="w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden border border-border cursor-pointer group relative"
                                    onClick={() => setSelectedImage(course.marksheetImage)}
                                >
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                                    <MediaPreview 
                                        src={course.marksheetImage} 
                                        alt={`${course.title} Marksheet`}
                                        className="group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        )}

                        </div>
                    </div>
                
                </motion.div>
            </div>

            {/* Full-Screen File Modal */}
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
                        className="absolute top-6 right-6 p-2 bg-muted rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-50"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close fullscreen view"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    
                    {/* Render Interactive PDF or Image in Modal */}
                    {selectedImage.toLowerCase().endsWith('.pdf') ? (
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