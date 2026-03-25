import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";

const router: IRouter = Router();

const responses: Record<string, { answer: string; followUpQuestions: string[] }> = {
  default: {
    answer: "Great question! This is a fundamental concept in science. Let me break it down for you in simple terms. Science helps us understand the world around us through observation, experimentation, and analysis. Every experiment you perform in our virtual lab builds on these principles.",
    followUpQuestions: [
      "Can you give me an example?",
      "How is this used in real life?",
      "What are the key formulas?",
    ],
  },
  photosynthesis: {
    answer: "Photosynthesis is the process by which plants convert sunlight, water (H₂O), and carbon dioxide (CO₂) into glucose (sugar) and oxygen. The equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process happens in the chloroplasts of plant cells, which contain the green pigment chlorophyll that absorbs light energy.",
    followUpQuestions: [
      "What is the role of chlorophyll?",
      "What factors affect the rate of photosynthesis?",
      "How is photosynthesis different from cellular respiration?",
    ],
  },
  gravity: {
    answer: "Gravity is a fundamental force of attraction between objects with mass. On Earth, the acceleration due to gravity is approximately 9.8 m/s² (often rounded to 10 m/s²). This means that a freely falling object will increase its speed by 9.8 m/s every second. Newton's Law of Universal Gravitation states: F = Gm₁m₂/r², where G is the gravitational constant, m₁ and m₂ are the masses, and r is the distance between them.",
    followUpQuestions: [
      "Why do heavier objects fall at the same rate as lighter ones?",
      "What is the difference between mass and weight?",
      "How does gravity work in space?",
    ],
  },
  electricity: {
    answer: "Electricity is the flow of electric charge through a conductor. The relationship between voltage (V), current (I), and resistance (R) is given by Ohm's Law: V = IR. Voltage is measured in Volts (V), current in Amperes (A), and resistance in Ohms (Ω). Electric power is calculated as P = VI = I²R = V²/R.",
    followUpQuestions: [
      "What is the difference between AC and DC current?",
      "How do series and parallel circuits differ?",
      "What causes electrical resistance?",
    ],
  },
};

router.post("/ai/ask", (req, res) => {
  const body = Zod.AskAIBody.parse(req.body);
  const question = body.question.toLowerCase();

  let responseKey = "default";
  if (question.includes("photosynthesis") || question.includes("plant")) {
    responseKey = "photosynthesis";
  } else if (question.includes("gravity") || question.includes("fall") || question.includes("weight")) {
    responseKey = "gravity";
  } else if (question.includes("electricity") || question.includes("ohm") || question.includes("current") || question.includes("voltage")) {
    responseKey = "electricity";
  }

  const response = responses[responseKey];
  const data = Zod.AskAIResponse.parse({
    answer: response.answer,
    sources: ["NCERT Textbook Chapter 3", "Virtual Lab Reference Guide"],
    followUpQuestions: response.followUpQuestions,
  });

  res.json(data);
});

export default router;
