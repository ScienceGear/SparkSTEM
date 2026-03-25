import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";

const router: IRouter = Router();

const labs = [
  {
    id: "projectile-motion",
    title: "Projectile Motion",
    description: "Explore how objects move through the air under gravity. Understand the relationship between horizontal and vertical motion.",
    subject: "Physics",
    grade: "9",
    difficulty: "intermediate" as const,
    duration: 45,
    thumbnailEmoji: "🚀",
    completedByCount: 1243,
    tags: ["motion", "gravity", "vectors"],
    theory: "Projectile motion is a form of motion where an object moves in a bilaterally symmetrical, parabolic path. The path followed by a projectile is called its trajectory. A projectile is any object thrown into space (empty or not) by the exertion of a force.",
    procedure: [
      "Set the initial velocity using the slider",
      "Adjust the launch angle between 0° and 90°",
      "Click 'Launch' to fire the projectile",
      "Observe the trajectory and record the maximum height and range",
      "Repeat with different angles to find the optimal launch angle",
    ],
    materials: ["Simulation software", "Graph paper", "Calculator", "Ruler"],
    objectives: [
      "Understand the components of projectile motion",
      "Calculate the range and maximum height of a projectile",
      "Identify the angle that gives maximum range",
      "Analyze how initial velocity affects trajectory",
    ],
  },
  {
    id: "ohms-law",
    title: "Ohm's Law Verification",
    description: "Verify Ohm's Law by measuring current and voltage in a simple circuit and understanding their relationship.",
    subject: "Physics",
    grade: "10",
    difficulty: "beginner" as const,
    duration: 30,
    thumbnailEmoji: "⚡",
    completedByCount: 2156,
    tags: ["electricity", "circuits", "ohm"],
    theory: "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points, provided temperature remains constant. V = IR where V is voltage, I is current, and R is resistance.",
    procedure: [
      "Connect the resistor in the circuit",
      "Set the voltage source to 2V",
      "Record the current shown on the ammeter",
      "Increase voltage in steps of 2V up to 12V",
      "Plot V vs I graph and calculate resistance",
    ],
    materials: ["Battery", "Resistors", "Ammeter", "Voltmeter", "Connecting wires"],
    objectives: [
      "Verify Ohm's Law experimentally",
      "Plot V-I characteristics",
      "Calculate resistance from the graph",
      "Understand the concept of resistance",
    ],
  },
  {
    id: "photosynthesis",
    title: "Photosynthesis Process",
    description: "Observe and understand the process of photosynthesis in plants, including the role of light, water, and carbon dioxide.",
    subject: "Biology",
    grade: "8",
    difficulty: "beginner" as const,
    duration: 40,
    thumbnailEmoji: "🌱",
    completedByCount: 1879,
    tags: ["plants", "energy", "chlorophyll"],
    theory: "Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organism's activities. 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
    procedure: [
      "Place the plant sample under the light source",
      "Adjust light intensity using the slider",
      "Observe the rate of oxygen bubble production",
      "Change CO₂ concentration and record effects",
      "Plot the rate of photosynthesis vs light intensity",
    ],
    materials: ["Aquatic plant (elodea)", "Beaker", "Light source", "Sodium bicarbonate solution"],
    objectives: [
      "Understand the photosynthesis equation",
      "Observe how light affects photosynthesis rate",
      "Analyze the role of CO₂ concentration",
      "Measure oxygen production as indicator",
    ],
  },
  {
    id: "acid-base-titration",
    title: "Acid-Base Titration",
    description: "Perform a titration to determine the concentration of an unknown acid using a standard base solution.",
    subject: "Chemistry",
    grade: "11",
    difficulty: "advanced" as const,
    duration: 60,
    thumbnailEmoji: "🧪",
    completedByCount: 987,
    tags: ["acids", "bases", "neutralization"],
    theory: "Titration is a common laboratory method of quantitative chemical analysis to determine the concentration of an identified analyte. The endpoint and equivalence point correspond to the point where the moles of acid equal the moles of base added.",
    procedure: [
      "Fill burette with NaOH solution",
      "Pipette 25 mL of HCl into a conical flask",
      "Add 2-3 drops of phenolphthalein indicator",
      "Slowly add NaOH until the solution turns pale pink",
      "Record the volume of NaOH used",
      "Calculate concentration using n₁v₁ = n₂v₂",
    ],
    materials: ["Burette", "Pipette", "Conical flask", "NaOH solution", "HCl solution", "Phenolphthalein indicator"],
    objectives: [
      "Master burette technique",
      "Identify the equivalence point",
      "Calculate unknown concentration",
      "Understand acid-base neutralization",
    ],
  },
  {
    id: "newtons-laws",
    title: "Newton's Laws of Motion",
    description: "Explore all three of Newton's Laws through interactive demonstrations with virtual objects and forces.",
    subject: "Physics",
    grade: "9",
    difficulty: "beginner" as const,
    duration: 35,
    thumbnailEmoji: "🎯",
    completedByCount: 3204,
    tags: ["force", "motion", "inertia"],
    theory: "Newton's three laws of motion describe the relationship between a body and the forces acting upon it. 1st Law: An object remains at rest or in uniform motion unless acted upon by a force. 2nd Law: F = ma. 3rd Law: For every action, there is an equal and opposite reaction.",
    procedure: [
      "Observe the stationary ball and note its behavior",
      "Apply force to see the ball accelerate (2nd Law)",
      "Double the mass and observe the changed acceleration",
      "Set up the collision experiment for 3rd Law",
      "Record observations for each law",
    ],
    materials: ["Virtual force simulator", "Graph paper", "Calculator"],
    objectives: [
      "State Newton's three laws of motion",
      "Apply F = ma to solve problems",
      "Demonstrate inertia",
      "Identify action-reaction pairs",
    ],
  },
  {
    id: "dna-replication",
    title: "DNA Replication",
    description: "Visualize and understand the semi-conservative model of DNA replication including the role of enzymes.",
    subject: "Biology",
    grade: "12",
    difficulty: "advanced" as const,
    duration: 50,
    thumbnailEmoji: "🧬",
    completedByCount: 756,
    tags: ["genetics", "cells", "enzymes"],
    theory: "DNA replication is the biological process of producing two identical replicas of DNA from one original DNA molecule. The process occurs in all living organisms and is the basis for biological inheritance. DNA is made up of four bases: Adenine, Thymine, Guanine, and Cytosine.",
    procedure: [
      "Identify the double helix structure",
      "Observe helicase unwinding the DNA",
      "Watch primase add RNA primers",
      "See DNA polymerase add complementary bases",
      "Observe the leading and lagging strands",
      "Identify Okazaki fragments",
    ],
    materials: ["3D DNA model", "Animation viewer", "Lab notebook"],
    objectives: [
      "Explain the semi-conservative model",
      "Identify enzymes involved in replication",
      "Describe the difference between leading and lagging strands",
      "Understand the role of RNA primers",
    ],
  },
  {
    id: "chemical-bonding",
    title: "Chemical Bonding",
    description: "Explore ionic, covalent, and metallic bonds through interactive 3D molecular models.",
    subject: "Chemistry",
    grade: "10",
    difficulty: "intermediate" as const,
    duration: 45,
    thumbnailEmoji: "⚗️",
    completedByCount: 1432,
    tags: ["bonds", "molecules", "electrons"],
    theory: "Chemical bonding is the lasting attraction between atoms that enables the formation of chemical compounds. Ionic bonds form between metals and non-metals through electron transfer. Covalent bonds form between non-metals through electron sharing. Metallic bonds hold metals together through delocalized electrons.",
    procedure: [
      "Select NaCl to observe ionic bonding",
      "Watch the electron transfer from Na to Cl",
      "Switch to H₂O to see covalent bonding",
      "Adjust electronegativity to understand polarity",
      "Explore metallic structure of copper",
    ],
    materials: ["Molecular modeling kit (virtual)", "Periodic table", "Calculator"],
    objectives: [
      "Distinguish between types of chemical bonds",
      "Predict bond type from electronegativity",
      "Draw Lewis structures",
      "Explain bond polarity",
    ],
  },
  {
    id: "human-heart",
    title: "Human Heart Anatomy",
    description: "Explore the chambers, valves, and blood flow pathways of the human heart through an interactive 3D model.",
    subject: "Biology",
    grade: "10",
    difficulty: "intermediate" as const,
    duration: 40,
    thumbnailEmoji: "❤️",
    completedByCount: 2089,
    tags: ["anatomy", "circulation", "organs"],
    theory: "The human heart is a muscular organ that pumps blood through the circulatory system. It has four chambers: the left and right atria (upper chambers) and the left and right ventricles (lower chambers). The heart follows a rhythmic cycle called the cardiac cycle.",
    procedure: [
      "Identify the four chambers of the heart",
      "Trace the path of deoxygenated blood",
      "Follow oxygenated blood from lungs to body",
      "Click on each valve to understand its function",
      "Observe the cardiac cycle animation",
    ],
    materials: ["3D heart model viewer", "Anatomy diagram", "Lab manual"],
    objectives: [
      "Label the chambers and major vessels",
      "Explain pulmonary and systemic circulation",
      "Describe the function of heart valves",
      "Understand the cardiac cycle",
    ],
  },
];

router.get("/labs", (req, res) => {
  const { subject, grade } = req.query as { subject?: string; grade?: string };
  let filtered = [...labs];
  if (subject) {
    filtered = filtered.filter((l) => l.subject.toLowerCase() === subject.toLowerCase());
  }
  if (grade) {
    filtered = filtered.filter((l) => l.grade === grade);
  }
  const data = Zod.GetLabsResponse.parse(filtered.map(({ theory, procedure, materials, objectives, ...lab }) => lab));
  res.json(data);
});

router.get("/labs/:id", (req, res) => {
  const lab = labs.find((l) => l.id === req.params.id);
  if (!lab) {
    res.status(404).json({ error: "Lab not found" });
    return;
  }
  const data = Zod.GetLabByIdResponse.parse(lab);
  res.json(data);
});

export default router;
