import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";

const router: IRouter = Router();

router.get("/progress", (_req, res) => {
  const data = Zod.GetProgressResponse.parse({
    totalLabs: 8,
    completedLabs: 3,
    streakDays: 7,
    totalPoints: 1250,
    badges: [
      { id: "first-lab", name: "First Experiment", emoji: "🔬", earnedAt: "2026-03-01" },
      { id: "week-streak", name: "7-Day Streak", emoji: "🔥", earnedAt: "2026-03-10" },
      { id: "ai-expert", name: "AI Explorer", emoji: "🤖", earnedAt: "2026-03-15" },
      { id: "physics-fan", name: "Physics Fan", emoji: "⚡", earnedAt: "2026-03-20" },
    ],
    recentActivity: [
      { id: "1", type: "lab_complete", description: "Completed Ohm's Law Verification", timestamp: "2026-03-24T10:30:00Z", points: 150 },
      { id: "2", type: "ai_question", description: "Asked AI about photosynthesis", timestamp: "2026-03-23T14:15:00Z", points: 10 },
      { id: "3", type: "lab_complete", description: "Completed Projectile Motion", timestamp: "2026-03-22T09:00:00Z", points: 200 },
      { id: "4", type: "badge_earned", description: "Earned '7-Day Streak' badge", timestamp: "2026-03-21T00:00:00Z", points: 100 },
      { id: "5", type: "lab_start", description: "Started DNA Replication lab", timestamp: "2026-03-20T16:45:00Z", points: 25 },
    ],
  });
  res.json(data);
});

export default router;
