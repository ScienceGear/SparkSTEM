import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";

const router: IRouter = Router();

const subjects = [
  {
    id: "physics",
    name: "Physics",
    description: "Explore forces, motion, energy, and the fundamental laws governing the universe.",
    emoji: "⚡",
    color: "#7C3AED",
    labCount: 3,
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Discover the properties of matter, chemical reactions, and the periodic table.",
    emoji: "🧪",
    color: "#F59E0B",
    labCount: 2,
  },
  {
    id: "biology",
    name: "Biology",
    description: "Study living organisms, ecosystems, genetics, and the human body.",
    emoji: "🌱",
    color: "#10B981",
    labCount: 3,
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Master algebra, geometry, calculus, and mathematical problem-solving.",
    emoji: "📐",
    color: "#3B82F6",
    labCount: 0,
  },
];

router.get("/subjects", (_req, res) => {
  const data = Zod.GetSubjectsResponse.parse(subjects);
  res.json(data);
});

export default router;
