import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";
import OpenAI from "openai";

const router: IRouter = Router();

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY || "dummy-key",
    baseURL: "https://openrouter.ai/api/v1",
});

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

router.post("/ai/ask", async (req, res) => {
  const body = Zod.AskAIBody.parse(req.body);
  const question = body.question.toLowerCase();
  const labId = (req.body as any).labId as string | undefined;

  // Lab-specific contexts
  const labContexts: Record<string, string> = {
      "projectile-motion": `
          You are an AI assistant for the "Projectile Motion" virtual lab.
          
          Key Mechanics of the Simulation:
          - Users can launch a projectile (cannonball, pumpkin, human, etc.) from a cannon.
          - Adjustable parameters: Initial Speed (0-30 m/s), Launch Angle (0-90 degrees), Mass (1-10 kg), Diameter (0.1-1.0 m), Gravity (9.8 m/s^2 by default), and Air Resistance (Drag togglable).
          - Tools available: Timer, Tape Measure, Trajectory trace.
          
          Physics Principles:
          1. Projectile motion is a combination of horizontal motion (constant velocity) and vertical motion (constant acceleration due to gravity).
          2. Horizontal distance (Range) R = (v^2 * sin(2*theta)) / g
          3. Maximum height H = (v^2 * sin^2(theta)) / (2*g)
          4. Time of flight T = (2*v * sin(theta)) / g
          5. 45 degrees gives the maximum range (in the absence of air resistance).
          6. Complementary angles (e.g., 30 and 60) give the same range.
          
          Learning Objectives:
          - Predict how varying initial conditions (angle, speed, mass) affect the projectile's path.
          - Explain why the horizontal and vertical motions are independent.
          - Use the simulation to test predictions about range and height.
          
          If the student asks about the simulation features, guide them on how to use the controls. If they ask physics questions, explain using the specific context of projectile motion.
      `
  };

  const systemContext = labId && labContexts[labId] 
      ? labContexts[labId] 
      : "You are SparkAI, a helpful STEM tutor for kids. Explain concepts simply and accurately. Keep answers concise.";

  // If OpenRouter key is configured, use AI
  if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== "dummy-key") {
      try {
        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct:free",
            messages: [
                { role: "system", content: systemContext },
                { role: "user", content: question }
            ]
        });
        
        const answer = completion.choices[0]?.message?.content || "I couldn't think of an answer right now.";
        const data = Zod.AskAIResponse.parse({
            answer,
            sources: ["SparkAI Tutor"],
            followUpQuestions: ["Can you give an example?", "Why does this happen?", "Is this related to...?"],
        });
        res.json(data);
        return;
      } catch (e) {
          console.error("OpenRouter Error:", e);
          // Fallback to static responses if AI fails
      }
  }

  let responseKey = "default";
  if (question.includes("photosynthesis") || question.includes("plant")) {
    responseKey = "photosynthesis";
  } else if (question.includes("gravity") || question.includes("fall") || question.includes("weight")) {
    responseKey = "gravity";
  } else if (question.includes("electricity") || question.includes("ohm") || question.includes("current") || question.includes("voltage")) {
    responseKey = "electricity";
  }

  const response = responses[responseKey] || responses.default;
  const data = Zod.AskAIResponse.parse({
    answer: response.answer,
    sources: ["NCERT Textbook Chapter 3", "Virtual Lab Reference Guide"],
    followUpQuestions: response.followUpQuestions,
  });

  res.json(data);
});

export default router;
