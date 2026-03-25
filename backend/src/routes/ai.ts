import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";

const router: IRouter = Router();

// Google AI configuration - read lazily to ensure dotenv is loaded
const getGoogleAIKey = () => process.env.GOOGLE_AI_API_KEY || "";
const GOOGLE_AI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// OpenRouter configuration (Fallback)
const getOpenRouterKey = () => process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "google/gemini-2.0-flash-lite-preview-02-05:free"; // more reliable free model

// Ollama configuration (Local)
const OLLAMA_ENDPOINT = "http://localhost:11434/api/chat";
const OLLAMA_MODEL = "qwen3:4b"; // User specified model (ensure this model is pulled in Ollama)

// Comprehensive lab contexts for intelligent tutoring
const labContexts: Record<string, { theory: string; procedures: string[]; objectives: string[] }> = {
  "projectile-motion": {
    theory: `
**Projectile Motion Theory:**

Projectile motion is a form of motion where an object moves in a bilaterally symmetrical, parabolic path under the influence of gravity. The path followed by a projectile is called its trajectory.

**Key Concepts:**
1. **Horizontal Motion**: Constant velocity (no acceleration)
   - vₓ = v₀ cos(θ)
   - x = v₀ cos(θ) × t

2. **Vertical Motion**: Constant acceleration due to gravity
   - vᵧ = v₀ sin(θ) - g×t
   - y = v₀ sin(θ) × t - ½g×t²

3. **Important Formulas:**
   - Range: R = (v₀² sin(2θ)) / g
   - Maximum Height: H = (v₀² sin²(θ)) / (2g)
   - Time of Flight: T = (2v₀ sin(θ)) / g
   - Optimal Angle: 45° gives maximum range (without air resistance)

4. **Independence of Motion**: Horizontal and vertical motions are independent of each other.
    `,
    procedures: [
      "Set the initial velocity using the slider (0-30 m/s)",
      "Adjust the launch angle between 0° and 90°",
      "Click 'Launch' to fire the projectile",
      "Observe the trajectory and record the maximum height and range",
      "Repeat with different angles to find the optimal launch angle",
      "Enable air resistance to see real-world effects"
    ],
    objectives: [
      "Understand the components of projectile motion",
      "Calculate the range and maximum height of a projectile",
      "Identify the angle that gives maximum range",
      "Analyze how initial velocity affects trajectory"
    ]
  },
  
  "photosynthesis": {
    theory: `
**Photosynthesis Process:**

Photosynthesis is the process by which plants convert light energy into chemical energy stored in glucose.

**Chemical Equation:**
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

**Key Concepts:**
1. **Chlorophyll**: Green pigment in chloroplasts that captures light energy
2. **Light-Dependent Reactions**: Occur in thylakoid membranes
   - Water is split (photolysis): 2H₂O → 4H⁺ + 4e⁻ + O₂
   - ATP and NADPH are produced

3. **Light-Independent Reactions** (Calvin Cycle): Occur in stroma
   - CO₂ is fixed into organic molecules
   - Glucose is synthesized

4. **Factors Affecting Rate**:
   - Light intensity
   - CO₂ concentration
   - Temperature
   - Water availability
    `,
    procedures: [
      "Place the plant sample under the light source",
      "Adjust light intensity using the slider",
      "Observe the rate of oxygen bubble production",
      "Change CO₂ concentration and record effects",
      "Plot the rate of photosynthesis vs light intensity"
    ],
    objectives: [
      "Understand the photosynthesis equation",
      "Observe how light affects photosynthesis rate",
      "Analyze the role of CO₂ concentration",
      "Measure oxygen production as indicator"
    ]
  },

  "dna-replication": {
    theory: `
**DNA Replication:**

DNA replication is the biological process of producing two identical replicas of DNA from one original DNA molecule.

**Key Concepts:**
1. **Semi-Conservative Model**: Each new DNA molecule consists of one original strand and one new strand

2. **Base Pairing Rules**:
   - Adenine (A) pairs with Thymine (T)
   - Guanine (G) pairs with Cytosine (C)

3. **Key Enzymes**:
   - **Helicase**: Unwinds the DNA double helix
   - **Primase**: Adds RNA primers
   - **DNA Polymerase**: Adds complementary nucleotides
   - **Ligase**: Joins Okazaki fragments

4. **Leading vs Lagging Strand**:
   - Leading: Continuous synthesis (5' to 3')
   - Lagging: Discontinuous synthesis (Okazaki fragments)
    `,
    procedures: [
      "Identify the double helix structure",
      "Observe helicase unwinding the DNA",
      "Watch primase add RNA primers",
      "See DNA polymerase add complementary bases",
      "Observe the leading and lagging strands",
      "Identify Okazaki fragments"
    ],
    objectives: [
      "Explain the semi-conservative model",
      "Identify enzymes involved in replication",
      "Describe the difference between leading and lagging strands",
      "Understand the role of RNA primers"
    ]
  }
};

// Enhanced AI responses with better educational content
router.post("/ai/ask", async (req, res) => {
  try {
    const body = Zod.AskAIBody.parse(req.body);
    const question = body.question.toLowerCase();
    const labId = (req.body as any).labId as string | undefined;

    // Build context from lab data if available
    let systemContext = "You are SparkAI, an expert STEM tutor for students. Explain concepts clearly and accurately.";
    let additionalContext = "";

    if (labId && labContexts[labId]) {
      const lab = labContexts[labId];
      additionalContext = `\n\nCurrent Lab Context:\n${lab.theory}\n\nLab Procedures:\n${lab.procedures.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nLearning Objectives:\n${lab.objectives.map((o, i) => `${i + 1}. ${o}`).join('\n')}`;
      systemContext = `You are SparkAI, an expert STEM tutor helping students with the "${labId}" lab. Use the lab context to provide detailed, accurate explanations.${additionalContext}`;
    }

    // Intelligent keyword-based responses for common questions
    const responses: Record<string, { answer: string; followUpQuestions: string[] }> = {
      photosynthesis: {
        answer: `**Photosynthesis Explained:**

Photosynthesis is how plants make their own food using sunlight! Here's the simple version:

🌱 **What Plants Need:**
- Sunlight (energy)
- Water (H₂O) from roots
- Carbon dioxide (CO₂) from air

🍃 **What Plants Make:**
- Glucose (C₆H₁₂O₆) - plant food/energy
- Oxygen (O₂) - what we breathe!

**The Chemical Equation:**
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂

**How It Works:**
1. **Light Reactions**: Chlorophyll captures sunlight in the chloroplasts
2. **Calvin Cycle**: CO₂ is converted into glucose

**Why It Matters:**
- Plants produce oxygen for all living things
- Base of the food chain
- Removes CO₂ from atmosphere`,
        followUpQuestions: [
          "What is the role of chlorophyll?",
          "What factors affect the rate of photosynthesis?",
          "How do light and dark reactions differ?"
        ]
      },
      
      projectile: {
        answer: `**Projectile Motion Explained:**

When you throw a ball or shoot a cannon, the object follows a curved path called a parabola. This is projectile motion!

**Two Types of Motion Combined:**

1. **Horizontal Motion** (left-right):
   - Constant speed
   - No acceleration (ignoring air resistance)
   - Distance = velocity × time

2. **Vertical Motion** (up-down):
   - Acceleration due to gravity (g = 9.8 m/s²)
   - Speed increases as object falls
   - Height = initial velocity × time - ½g×t²

**Key Findings:**
- 45° angle gives maximum distance (range)
- Heavier and lighter objects fall at the same rate in vacuum
- The higher you throw, the longer it stays in air

**Real Examples:**
- Basketball shot
- Water fountain
- Cannon firing`,
        followUpQuestions: [
          "Why does 45° give the maximum range?",
          "How does air resistance affect projectile motion?",
          "What's the difference between range and maximum height?"
        ]
      },

      dna: {
        answer: `**DNA Replication Explained:**

DNA replication is how cells copy their genetic information before dividing. It's like making a backup of your most important files!

**The Process (Step by Step):**

1. **Helicase Unzips the DNA**
   - The double helix unwinds
   - Two strands separate

2. **Primase Adds Primers**
   - Short RNA sequences mark where to start

3. **DNA Polymerase Builds New Strands**
   - Adds complementary nucleotides
   - A pairs with T, G pairs with C

4. **Ligase Seals the Gaps**
   - Joins Okazaki fragments on lagging strand

**Semi-Conservative Replication:**
Each new DNA molecule has:
- One original (parent) strand
- One newly synthesized strand

**Why It's Important:**
- Ensures genetic information is passed to daughter cells
- Maintains genetic stability
- Allows growth and repair`,
        followUpQuestions: [
          "What's the difference between leading and lagging strands?",
          "Why are Okazaki fragments formed?",
          "What happens if DNA replication makes mistakes?"
        ]
      },

      ohm: {
        answer: `**Ohm's Law Explained:**

Ohm's Law describes the relationship between voltage, current, and resistance in electrical circuits.

**The Formula:**
V = I × R

Where:
- V = Voltage (Volts) - the "push" of electricity
- I = Current (Amperes) - the flow of electrons
- R = Resistance (Ohms) - opposition to flow

**Think of it like water in pipes:**
- Voltage = water pressure
- Current = flow rate of water
- Resistance = pipe narrowness

**Example:**
If you have a 12V battery and 4Ω resistor:
I = V/R = 12/4 = 3A

**Applications:**
- Designing circuits
- Calculating power consumption: P = V × I
- Troubleshooting electrical problems`,
        followUpQuestions: [
          "How do series and parallel circuits differ?",
          "What materials have high resistance?",
          "How is electrical power calculated?"
        ]
      }
    };

    // Determine response based on keywords
    let responseKey = "default";
    if (question.includes("photosynthesis") || question.includes("plant") || question.includes("chlorophyll")) {
      responseKey = "photosynthesis";
    } else if (question.includes("projectile") || question.includes("trajectory") || question.includes("parabola") || question.includes("cannon")) {
      responseKey = "projectile";
    } else if (question.includes("dna") || question.includes("replication") || question.includes("helicase") || question.includes("polymerase")) {
      responseKey = "dna";
    } else if (question.includes("ohm") || question.includes("voltage") || question.includes("current") || question.includes("resistance")) {
      responseKey = "ohm";
    }

    // AI Processing
    let answer = "";
    let usedAI = false;
    let aiSource = "";

    // 1. Try Google AI (Gemini) - Default
    const GOOGLE_AI_API_KEY = getGoogleAIKey();
    if (!usedAI && GOOGLE_AI_API_KEY) {
      try {
        console.log("[AI] Using Google AI (Gemini 2.5 Flash)");
        
        const prompt = `${systemContext}

Question: ${body.question}

Please provide a clear, educational answer suitable for students. Include:
1. A clear explanation
2. Relevant examples or analogies
3. Key formulas or concepts (if applicable)

Keep the answer concise but thorough (2-4 paragraphs).`;

        const response = await fetch(`${GOOGLE_AI_ENDPOINT}?key=${GOOGLE_AI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
          })
        });

        if (response.ok) {
          const result = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
          if (result.candidates && result.candidates[0]?.content?.parts?.[0]?.text) {
            answer = result.candidates[0].content.parts[0].text;
            usedAI = true;
            aiSource = "Google AI (Gemini 2.5 Flash)";
            console.log("[AI] Successfully got response from Google AI");
          }
        } else {
          console.error("[AI] Google AI request failed:", response.status, await response.text());
        }
      } catch (aiError) {
        console.error("[AI] Google AI error:", aiError);
      }
    }

    // 2. Try Local Ollama (Fallback)
    if (!usedAI) { // Check if previous model failed
        try {
        console.log(`[AI] Checking local Ollama model: ${OLLAMA_MODEL}...`);
        const response = await fetch(OLLAMA_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            model: OLLAMA_MODEL, 
            messages: [
                { role: "system", content: systemContext },
                { role: "user", content: body.question }
            ],
            stream: false 
            }),
        });

        if (response.ok) {
            const result = await response.json() as { message?: { content?: string } };
            if (result.message && result.message.content) {
            answer = result.message.content;
            usedAI = true;
            aiSource = `Local Ollama (${OLLAMA_MODEL})`;
            console.log("[AI] Successfully got response from Local Ollama");
            }
        } else {
            console.log(`[AI] Local Ollama checked but not available or model missing (Status: ${response.status})`);
        }
        } catch (ollamaError) {
        console.log("[AI] Local Ollama not reachable (skipping)");
        }
    }

    // 3. Try OpenRouter (Fallback)
    const OPENROUTER_API_KEY = getOpenRouterKey();
    if (!usedAI && OPENROUTER_API_KEY) {
      try {
        console.log(`[AI] Google AI unavailable. Falling back to OpenRouter...`);
        
        // List of free models to try in order of preference/reliability
        // Using models that are widely available on the free tier
        const fallbackModels = [
          "google/gemini-2.0-flash-exp:free",
          "huggingfaceh4/zephyr-7b-beta:free",
          "microsoft/phi-3-medium-128k-instruct:free",
          "openchat/openchat-7b:free",
          "mistralai/mistral-7b-instruct:free",
          "meta-llama/llama-3-8b-instruct:free"
        ];

        for (const model of fallbackModels) {
          try {
            console.log(`[AI] Trying OpenRouter model: ${model}`);
            const response = await fetch(OPENROUTER_ENDPOINT, {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "SparkSTEM Edu"
              },
              body: JSON.stringify({
                model: model,
                messages: [
                  { role: "system", content: systemContext },
                  { role: "user", content: body.question }
                ],
                temperature: 0.7,
                max_tokens: 1000
              })
            });

            if (response.ok) {
              const data = await response.json() as any;
              if (data.choices && data.choices[0]?.message?.content) {
                answer = data.choices[0].message.content;
                usedAI = true;
                aiSource = `OpenRouter (${model.split('/')[1].split(':')[0]})`;
                console.log("[AI] Successfully got response from OpenRouter");
                break; // Exit loop on success
              }
            } else {
              // Log failure details for debugging
              console.warn(`[AI] OpenRouter model ${model} failed:`, response.status);
              try {
                const errorText = await response.text();
                console.warn(`[AI] Error details:`, errorText.substring(0, 200));
              } catch (e) { /* ignore */ }
            }
          } catch (modelError) {
            console.warn(`[AI] OpenRouter error with ${model}:`, modelError);
          }
        }
      } catch (orError) {
        console.error("[AI] OpenRouter critical error:", orError);
      }
    }

    // 3. Keyword-based fallback
    if (!usedAI) {
      console.log("[AI] Using keyword-based fallback");
      const response = responses[responseKey] || {
        answer: `Great question! ${additionalContext ? "Based on what we're learning in this lab, " : ""}I'd be happy to help you understand this concept better. ${question.includes("how") ? "The process involves several key steps and principles." : "This is an important topic in science."}

Let me know if you'd like me to:
1. Break down a specific concept
2. Explain with an example
3. Show the relevant formulas
4. Connect it to real-world applications`,
        followUpQuestions: [
          "Can you give me a specific example?",
          "How is this used in real life?",
          "What are the key formulas involved?"
        ]
      };
      answer = response.answer;
      aiSource = "SparkAI Tutor";
    }

    // Generate smart follow-up questions based on the topic
    let followUpQuestions = responses[responseKey]?.followUpQuestions || [
      "Can you explain this with an example?",
      "How is this concept used in real life?",
      "What are the key principles involved?"
    ];

    const data = Zod.AskAIResponse.parse({
      answer: answer,
      sources: labId ? [`${labId} Lab Guide`, usedAI ? aiSource : "SparkAI Tutor"] : [usedAI ? aiSource : "SparkAI Tutor", "NCERT Textbooks"],
      followUpQuestions: followUpQuestions,
    });

    res.json(data);
  } catch (error) {
    console.error("AI endpoint error:", error);
    res.status(500).json({ error: "Failed to process question" });
  }
});

export default router;
