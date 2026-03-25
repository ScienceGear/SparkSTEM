import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";

const router: IRouter = Router();

// Enhanced books data with PDF links and thumbnails
const booksData = [
  {
    id: "ncert-physics-11",
    title: "Physics Textbook for Class XI",
    subject: "Physics",
    grade: "11",
    author: "NCERT",
    pages: 414,
    status: "available" as const,
    emoji: "⚛️",
    thumbnail: "/books/thumbnails/physics-11.jpg",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/keph101.pdf",
    description: "Comprehensive physics textbook covering mechanics, thermodynamics, and waves",
    chapterCount: 15,
    experimentCount: 12,
    chapters: [
      { number: 1, title: "Physical World" },
      { number: 2, title: "Units and Measurements" },
      { number: 3, title: "Motion in a Straight Line" },
      { number: 4, title: "Motion in a Plane" },
      { number: 5, title: "Laws of Motion" },
      { number: 6, title: "Work, Energy and Power" },
      { number: 7, title: "System of Particles and Rotational Motion" },
      { number: 8, title: "Gravitation" },
      { number: 9, title: "Mechanical Properties of Solids" },
      { number: 10, title: "Mechanical Properties of Fluids" },
      { number: 11, title: "Thermal Properties of Matter" },
      { number: 12, title: "Thermodynamics" },
      { number: 13, title: "Kinetic Theory" },
      { number: 14, title: "Oscillations" },
      { number: 15, title: "Waves" }
    ]
  },
  {
    id: "ncert-chemistry-11",
    title: "Chemistry Textbook for Class XI",
    subject: "Chemistry",
    grade: "11",
    author: "NCERT",
    pages: 360,
    status: "available" as const,
    emoji: "🧪",
    thumbnail: "/books/thumbnails/chemistry-11.jpg",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/kech101.pdf",
    description: "Covers structure of atom, chemical bonding, states of matter, and organic chemistry basics",
    chapterCount: 14,
    experimentCount: 15,
    chapters: [
      { number: 1, title: "Some Basic Concepts of Chemistry" },
      { number: 2, title: "Structure of Atom" },
      { number: 3, title: "Classification of Elements and Periodicity" },
      { number: 4, title: "Chemical Bonding and Molecular Structure" },
      { number: 5, title: "States of Matter" },
      { number: 6, title: "Thermodynamics" },
      { number: 7, title: "Equilibrium" },
      { number: 8, title: "Redox Reactions" },
      { number: 9, title: "Hydrogen" },
      { number: 10, title: "The s-Block Elements" },
      { number: 11, title: "The p-Block Elements" },
      { number: 12, title: "Organic Chemistry - Basic Principles" },
      { number: 13, title: "Hydrocarbons" },
      { number: 14, title: "Environmental Chemistry" }
    ]
  },
  {
    id: "ncert-biology-11",
    title: "Biology Textbook for Class XI",
    subject: "Biology",
    grade: "11",
    author: "NCERT",
    pages: 368,
    status: "available" as const,
    emoji: "🧬",
    thumbnail: "/books/thumbnails/biology-11.jpg",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/kebo101.pdf",
    description: "Explores diversity of living organisms, cell structure, plant and animal physiology",
    chapterCount: 22,
    experimentCount: 18,
    chapters: [
      { number: 1, title: "The Living World" },
      { number: 2, title: "Biological Classification" },
      { number: 3, title: "Plant Kingdom" },
      { number: 4, title: "Animal Kingdom" },
      { number: 5, title: "Morphology of Flowering Plants" },
      { number: 6, title: "Anatomy of Flowering Plants" },
      { number: 7, title: "Structural Organisation in Animals" },
      { number: 8, title: "Cell: The Unit of Life" },
      { number: 9, title: "Biomolecules" },
      { number: 10, title: "Cell Cycle and Cell Division" },
      { number: 11, title: "Transport in Plants" },
      { number: 12, title: "Mineral Nutrition" },
      { number: 13, title: "Photosynthesis in Higher Plants" },
      { number: 14, title: "Respiration in Plants" },
      { number: 15, title: "Plant Growth and Development" },
      { number: 16, title: "Digestion and Absorption" },
      { number: 17, title: "Breathing and Exchange of Gases" },
      { number: 18, title: "Body Fluids and Circulation" },
      { number: 19, title: "Excretory Products and their Elimination" },
      { number: 20, title: "Locomotion and Movement" },
      { number: 21, title: "Neural Control and Coordination" },
      { number: 22, title: "Chemical Coordination and Integration" }
    ]
  },
  {
    id: "ncert-physics-12",
    title: "Physics Textbook for Class XII",
    subject: "Physics",
    grade: "12",
    author: "NCERT",
    pages: 363,
    status: "available" as const,
    emoji: "⚡",
    thumbnail: "/books/thumbnails/physics-12.jpg",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/leph101.pdf",
    description: "Advanced physics covering electrostatics, magnetism, optics, and modern physics",
    chapterCount: 15,
    experimentCount: 10,
    chapters: [
      { number: 1, title: "Electric Charges and Fields" },
      { number: 2, title: "Electrostatic Potential and Capacitance" },
      { number: 3, title: "Current Electricity" },
      { number: 4, title: "Moving Charges and Magnetism" },
      { number: 5, title: "Magnetism and Matter" },
      { number: 6, title: "Electromagnetic Induction" },
      { number: 7, title: "Alternating Current" },
      { number: 8, title: "Electromagnetic Waves" },
      { number: 9, title: "Ray Optics and Optical Instruments" },
      { number: 10, title: "Wave Optics" },
      { number: 11, title: "Dual Nature of Radiation and Matter" },
      { number: 12, title: "Atoms" },
      { number: 13, title: "Nuclei" },
      { number: 14, title: "Semiconductor Electronics" },
      { number: 15, title: "Communication Systems" }
    ]
  },
  {
    id: "ncert-chemistry-12",
    title: "Chemistry Textbook for Class XII",
    subject: "Chemistry",
    grade: "12",
    author: "NCERT",
    pages: 380,
    status: "available" as const,
    emoji: "⚗️",
    thumbnail: "/books/thumbnails/chemistry-12.jpg",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/lech101.pdf",
    description: "Advanced chemistry including electrochemistry, chemical kinetics, and coordination compounds",
    chapterCount: 16,
    experimentCount: 14,
    chapters: [
      { number: 1, title: "The Solid State" },
      { number: 2, title: "Solutions" },
      { number: 3, title: "Electrochemistry" },
      { number: 4, title: "Chemical Kinetics" },
      { number: 5, title: "Surface Chemistry" },
      { number: 6, title: "General Principles and Processes of Isolation of Elements" },
      { number: 7, title: "The p-Block Elements" },
      { number: 8, title: "The d and f Block Elements" },
      { number: 9, title: "Coordination Compounds" },
      { number: 10, title: "Haloalkanes and Haloarenes" },
      { number: 11, title: "Alcohols, Phenols and Ethers" },
      { number: 12, title: "Aldehydes, Ketones and Carboxylic Acids" },
      { number: 13, title: "Amines" },
      { number: 14, title: "Biomolecules" },
      { number: 15, title: "Polymers" },
      { number: 16, title: "Chemistry in Everyday Life" }
    ]
  },
  {
    id: "ncert-biology-12",
    title: "Biology Textbook for Class XII",
    subject: "Biology",
    grade: "12",
    author: "NCERT",
    pages: 312,
    status: "available" as const,
    emoji: "🌱",
    thumbnail: "/books/thumbnails/biology-12.jpg",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/lebo101.pdf",
    description: "Covers reproduction, genetics, evolution, ecology, and biotechnology",
    chapterCount: 16,
    experimentCount: 12,
    chapters: [
      { number: 1, title: "Reproduction in Organisms" },
      { number: 2, title: "Sexual Reproduction in Flowering Plants" },
      { number: 3, title: "Human Reproduction" },
      { number: 4, title: "Reproductive Health" },
      { number: 5, title: "Principles of Inheritance and Variation" },
      { number: 6, title: "Molecular Basis of Inheritance" },
      { number: 7, title: "Evolution" },
      { number: 8, title: "Human Health and Disease" },
      { number: 9, title: "Strategies for Enhancement in Food Production" },
      { number: 10, title: "Microbes in Human Welfare" },
      { number: 11, title: "Biotechnology: Principles and Processes" },
      { number: 12, title: "Biotechnology and its Applications" },
      { number: 13, title: "Organisms and Populations" },
      { number: 14, title: "Ecosystem" },
      { number: 15, title: "Biodiversity and Conservation" },
      { number: 16, title: "Environmental Issues" }
    ]
  },
  {
    id: "ncert-math-11",
    title: "Mathematics Textbook for Class XI",
    subject: "Mathematics",
    grade: "11",
    author: "NCERT",
    pages: 368,
    status: "available" as const,
    emoji: "📐",
    thumbnail: "/books/thumbnails/math-11.jpg",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/kemh101.pdf",
    description: "Covers sets, functions, trigonometry, calculus basics, and statistics",
    chapterCount: 16,
    experimentCount: 0,
    chapters: [
      { number: 1, title: "Sets" },
      { number: 2, title: "Relations and Functions" },
      { number: 3, title: "Trigonometric Functions" },
      { number: 4, title: "Principle of Mathematical Induction" },
      { number: 5, title: "Complex Numbers and Quadratic Equations" },
      { number: 6, title: "Linear Inequalities" },
      { number: 7, title: "Permutations and Combinations" },
      { number: 8, title: "Binomial Theorem" },
      { number: 9, title: "Sequences and Series" },
      { number: 10, title: "Straight Lines" },
      { number: 11, title: "Conic Sections" },
      { number: 12, title: "Introduction to Three Dimensional Geometry" },
      { number: 13, title: "Limits and Derivatives" },
      { number: 14, title: "Mathematical Reasoning" },
      { number: 15, title: "Statistics" },
      { number: 16, title: "Probability" }
    ]
  },
  {
    id: "ncert-math-12",
    title: "Mathematics Textbook for Class XII",
    subject: "Mathematics",
    grade: "12",
    author: "NCERT",
    pages: 414,
    status: "available" as const,
    emoji: "∫",
    thumbnail: "/books/thumbnails/math-12.jpg",
    pdfUrl: "https://ncert.nic.in/textbook/pdf/lemh101.pdf",
    description: "Advanced mathematics including calculus, vectors, and differential equations",
    chapterCount: 13,
    experimentCount: 0,
    chapters: [
      { number: 1, title: "Relations and Functions" },
      { number: 2, title: "Inverse Trigonometric Functions" },
      { number: 3, title: "Matrices" },
      { number: 4, title: "Determinants" },
      { number: 5, title: "Continuity and Differentiability" },
      { number: 6, title: "Application of Derivatives" },
      { number: 7, title: "Integrals" },
      { number: 8, title: "Application of Integrals" },
      { number: 9, title: "Differential Equations" },
      { number: 10, title: "Vector Algebra" },
      { number: 11, title: "Three Dimensional Geometry" },
      { number: 12, title: "Linear Programming" },
      { number: 13, title: "Probability" }
    ]
  }
];

router.get("/books", (req, res) => {
  const { subject, grade, status } = req.query as { subject?: string; grade?: string; status?: string };
  
  let filtered = [...booksData];
  
  if (subject) {
    filtered = filtered.filter((b) => b.subject.toLowerCase().includes(subject.toLowerCase()));
  }
  if (grade) {
    filtered = filtered.filter((b) => b.grade === grade);
  }
  if (status) {
    filtered = filtered.filter((b) => b.status === status);
  }
  
  try {
    const data = Zod.GetBooksResponse.parse(filtered);
    res.json(data);
  } catch (error) {
    console.error("Books validation error:", error);
    res.json(filtered);
  }
});

router.get("/books/:id", (req, res) => {
  const book = booksData.find((b) => b.id === req.params.id);
  
  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  
  try {
    const data = Zod.GetBookByIdResponse.parse(book);
    res.json(data);
  } catch (error) {
    console.error("Book validation error:", error);
    res.json(book);
  }
});

export default router;
