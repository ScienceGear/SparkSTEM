import { Router, type IRouter } from "express";
import { Zod } from "../lib/api-zod";

const router: IRouter = Router();

const booksData = [
  {
    id: "mh-science-10-part1",
    title: "Science and Technology Part 1",
    subject: "Physics & Chemistry",
    grade: "10",
    author: "Maharashtra State Bureau of Textbook Production",
    pages: 164,
    status: "available" as const,
    emoji: "⚛️",
    description: "Covers Physics and Chemistry topics including Gravitation, Periodic Table, Chemical Reactions, Electricity, Heat, Light, Metallurgy, Carbon Compounds and Space Missions.",
    chapterCount: 10,
    experimentCount: 38,
    chapters: [
      {
        number: 1,
        title: "Gravitation",
        topics: ["Gravitation", "Circular motion and centripetal force", "Kepler's laws", "Newton's universal law of gravitation", "Acceleration due to gravity", "Free fall", "Escape velocity"],
        experiments: [
          {
            number: 1,
            title: "Centripetal Force Demonstration",
            objective: "To demonstrate centripetal force using a stone tied to a string and observe the effect when the string is released.",
            materials: ["A small stone", "A piece of string (1 metre)", "Open space"],
            procedure: [
              "Tie the stone securely to one end of the string.",
              "Hold the other end of the string and rotate it so the stone moves in a horizontal circle.",
              "Observe the direction of the pull on the string (towards your hand = towards centre).",
              "Now release the string suddenly and observe the direction the stone flies off.",
              "Record your observations about centripetal force direction."
            ],
            observations: "When the string is released, the stone flies off tangentially to the circle, proving the centripetal force was directed towards the centre.",
            conclusion: "For any object moving in a circle, a centripetal force acts directed towards the centre of the circle."
          },
          {
            number: 2,
            title: "Free Fall Observation",
            objective: "To observe that objects of different masses fall at the same rate under gravity (in absence of air resistance).",
            materials: ["A stone", "A feather", "A coin", "A height of at least 2 metres"],
            procedure: [
              "Hold a stone and a coin at the same height.",
              "Release both simultaneously from the same height.",
              "Observe which reaches the ground first.",
              "Repeat by dropping two stones of different masses simultaneously.",
              "Record your observations."
            ],
            observations: "Two objects of different masses dropped from the same height reach the ground at the same time. The feather falls slower due to air resistance.",
            conclusion: "Acceleration due to gravity (g = 9.8 m/s²) is the same for all objects regardless of mass, as shown by Galileo's experiment."
          },
          {
            number: 3,
            title: "Weight on Different Planets",
            objective: "To calculate weight of a person on the Moon, Mars, and Jupiter using Newton's law of gravitation.",
            materials: ["Calculator", "Data table of planetary masses and radii", "Notebook"],
            procedure: [
              "Note your weight (mass × g on Earth = mass × 9.8 N).",
              "Use formula: g = GM/R² for each planet.",
              "Calculate g for Moon (mass = 1/81 of Earth, radius = 1/3.7 of Earth).",
              "Calculate weight on Moon = mass × g_moon.",
              "Repeat for Mars (g = 3.71 m/s²) and Jupiter (g = 24.79 m/s²)."
            ],
            observations: "Weight on Moon ≈ 1/6 of Earth weight. Weight on Jupiter ≈ 2.5 times Earth weight.",
            conclusion: "Weight depends on the gravitational force of the planet. Mass remains constant but weight varies from planet to planet."
          }
        ]
      },
      {
        number: 2,
        title: "Periodic Classification of Elements",
        topics: ["Mendeleev's periodic table", "Modern periodic table", "Periods and groups", "Properties: atomic radius, ionization energy, electronegativity", "Metallic and non-metallic character"],
        experiments: [
          {
            number: 1,
            title: "Identifying Patterns in the Periodic Table",
            objective: "To identify trends in atomic radius, electronegativity and metallic character across periods and down groups.",
            materials: ["Modern periodic table chart", "Coloured pencils", "Ruler", "Graph paper"],
            procedure: [
              "Obtain or draw a periodic table with atomic radii values.",
              "Move across Period 3 (Na to Cl) and record atomic radii.",
              "Plot atomic number vs atomic radius on a graph.",
              "Identify the trend across a period.",
              "Repeat moving down Group 1 (Li, Na, K, Rb) and note the trend down a group."
            ],
            observations: "Atomic radius decreases across a period (left to right). Atomic radius increases down a group.",
            conclusion: "Properties of elements follow a periodic pattern confirming the modern periodic law."
          },
          {
            number: 2,
            title: "Predicting Properties of Unknown Elements",
            objective: "To use periodic trends to predict properties of an element given its position in the periodic table.",
            materials: ["Periodic table", "Reference data of known elements", "Notebook"],
            procedure: [
              "Choose an element at a given position (e.g. period 4, group 17).",
              "Use known trends to predict: atomic radius, electronegativity, metallic nature.",
              "Look up the actual data and compare.",
              "Calculate the percentage error in your prediction.",
              "Discuss why periodic law allows such predictions."
            ],
            observations: "Predicted properties closely match actual values for elements within the same group or period.",
            conclusion: "The periodic table is a powerful tool that allows prediction of properties based on position."
          }
        ]
      },
      {
        number: 3,
        title: "Chemical Reactions and Equations",
        topics: ["Chemical reactions vs physical changes", "Chemical equations", "Balancing equations", "Types of reactions: combination, decomposition, displacement, double displacement"],
        experiments: [
          {
            number: 1,
            title: "Identifying Physical and Chemical Changes",
            objective: "To distinguish between physical and chemical changes through observations of colour, gas, temperature and new substance formation.",
            materials: ["Evaporating dish", "Bunsen burner", "Thermometer", "Lime stone powder", "Copper sulphate solution", "Zinc dust", "Potassium chromate solution", "Barium sulphate solution", "Sodium carbonate solution", "Calcium chloride solution", "Phthalic anhydride", "Funnel", "Cotton plug"],
            procedure: [
              "Take lime stone powder in an evaporating dish. Heat strongly on a high blue flame. Observe.",
              "Add zinc dust to copper sulphate solution. Record colour and temperature change.",
              "Add potassium chromate solution to barium sulphate solution. Record precipitate formation.",
              "Add sodium carbonate solution to calcium chloride solution. Record observations.",
              "Heat phthalic anhydride under an inverted funnel with a cotton plug. Observe sublimation."
            ],
            observations: "Lime stone gives white CaO + CO₂ (gas). Zinc + CuSO₄ → colour changes from blue to colourless. Double displacement reactions form precipitates.",
            conclusion: "Chemical changes produce new substances with different properties, while physical changes only alter state."
          },
          {
            number: 2,
            title: "Law of Conservation of Mass",
            objective: "To verify that total mass is conserved in a chemical reaction (Silver nitrate + Sodium chloride).",
            materials: ["Conical flask", "Test tube", "String", "Rubber cork", "Balance", "Silver nitrate solution", "Sodium chloride solution"],
            procedure: [
              "Take sodium chloride solution in a conical flask.",
              "Pour silver nitrate solution into a smaller test tube and tie a string to it.",
              "Lower the test tube into the flask without mixing and seal with rubber cork.",
              "Weigh the entire sealed setup on a balance and record the mass.",
              "Tilt the flask to mix the two solutions. Observe white precipitate of AgCl forming.",
              "Weigh the flask again and compare."
            ],
            observations: "A white precipitate of silver chloride forms. The mass before and after the reaction is the same.",
            conclusion: "Mass is conserved during a chemical reaction — the Law of Conservation of Mass is verified."
          },
          {
            number: 3,
            title: "Combination Reactions",
            objective: "To demonstrate combination reactions using three activities: HCl + NH₃, burning Mg, and CaO + H₂O.",
            materials: ["Test tube", "Hydrochloric acid", "Ammonia solution", "Glass rod", "Magnesium ribbon", "Tongs", "Calcium oxide (slaked lime)", "Beaker"],
            procedure: [
              "Activity 1: Heat HCl in a test tube. Dip a rod in NH₃ and hold over the tube. Observe white smoke of NH₄Cl.",
              "Activity 2: Hold a Mg strip in tongs and ignite with a flame. Observe brilliant white light and white MgO powder.",
              "Activity 3: Add a few pieces of CaO to water in a beaker. Touch the beaker to feel heat generated."
            ],
            observations: "NH₃ + HCl → NH₄Cl (white smoke). 2Mg + O₂ → 2MgO (bright white). CaO + H₂O → Ca(OH)₂ + Heat.",
            conclusion: "In combination reactions, two or more reactants combine to form a single product."
          },
          {
            number: 4,
            title: "Decomposition Reactions",
            objective: "To demonstrate decomposition by heating sugar and decomposition of calcium carbonate.",
            materials: ["Evaporating dish", "Bunsen burner", "Two test tubes", "Bent tube", "Rubber cork", "Sugar", "Calcium carbonate powder", "Lime water"],
            procedure: [
              "Take sugar in an evaporating dish. Heat it with the Bunsen burner. Observe the black residue (carbon).",
              "Put calcium carbonate powder in one test tube. Connect via bent tube to lime water in second test tube.",
              "Heat the CaCO₃ strongly. Observe the lime water turning milky as CO₂ is produced."
            ],
            observations: "Sugar decomposes into carbon + water vapour on heating. CaCO₃ → CaO + CO₂; CO₂ turns lime water milky.",
            conclusion: "Decomposition reactions involve a single reactant breaking down into two or more products."
          },
          {
            number: 5,
            title: "Displacement and Double Displacement Reactions",
            objective: "To observe displacement (Zn displaces Cu from CuSO₄) and double displacement (AgNO₃ + NaCl).",
            materials: ["Test tubes", "Zinc strips", "Copper sulphate solution", "Silver nitrate solution", "Sodium chloride solution"],
            procedure: [
              "Add zinc strip to copper sulphate (blue) solution. Wait 5 minutes and observe.",
              "Note copper metal depositing on zinc and solution turning colourless.",
              "Mix silver nitrate with sodium chloride solution. Observe white precipitate immediately.",
              "Write balanced equations for both reactions.",
              "Identify which type of reaction each represents."
            ],
            observations: "Zn + CuSO₄ → ZnSO₄ + Cu. Blue colour fades and copper deposits. AgNO₃ + NaCl → AgCl (white ppt) + NaNO₃.",
            conclusion: "In displacement reactions, a more reactive element displaces a less reactive one. Double displacement exchanges ions."
          }
        ]
      },
      {
        number: 4,
        title: "Effects of Electric Current",
        topics: ["Ohm's Law", "Resistance in series and parallel", "Heating effect of current", "Magnetic effect of current", "Electric motor and generator"],
        experiments: [
          {
            number: 1,
            title: "Verification of Ohm's Law",
            objective: "To verify that current through a conductor is directly proportional to voltage across it (V = IR).",
            materials: ["Voltmeter", "Ammeter", "Rheostat", "Battery (6V)", "Nichrome wire (known resistance)", "Connecting wires", "Key"],
            procedure: [
              "Connect the nichrome wire in a circuit with an ammeter in series and voltmeter in parallel.",
              "Close the key and vary the rheostat to change the voltage.",
              "Record corresponding voltage (V) and current (I) readings for 5 different settings.",
              "Plot V on X-axis and I on Y-axis on graph paper.",
              "Calculate the slope (= 1/R) and compare with known resistance."
            ],
            observations: "V/I remains constant for all readings. The V-I graph is a straight line through the origin.",
            conclusion: "V/I = R (constant) confirms Ohm's Law. Current is directly proportional to voltage at constant temperature."
          },
          {
            number: 2,
            title: "Magnetic Effect of Electric Current",
            objective: "To demonstrate that a current-carrying conductor produces a magnetic field using a compass needle.",
            materials: ["Battery", "Switch", "Copper wire", "Compass needle", "Cardboard"],
            procedure: [
              "Pass a straight copper wire through a hole in horizontal cardboard.",
              "Place a compass needle near the wire and note its initial direction (North-South).",
              "Connect the wire to battery and switch on current.",
              "Observe the deflection of the compass needle.",
              "Reverse the current direction and note change in deflection direction."
            ],
            observations: "Compass deflects when current flows. Direction of deflection reverses when current direction reverses.",
            conclusion: "Electric current produces a magnetic field around the conductor, as shown by deflection of compass needle."
          },
          {
            number: 3,
            title: "Heating Effect of Electric Current",
            objective: "To demonstrate that electric current produces heat in a conductor (Joule's heating).",
            materials: ["Nichrome wire", "Battery", "Switch", "Ammeter", "Paper strips", "Water"],
            procedure: [
              "Connect a coil of thin nichrome wire in a circuit.",
              "Place small paper strips touching the wire.",
              "Close the circuit and pass current for 2-3 minutes.",
              "Observe if the paper strips catch fire or the wire glows.",
              "Calculate heat produced using H = I²Rt formula."
            ],
            observations: "The wire heats up significantly. Paper near the wire may scorch or burn. More current = more heat.",
            conclusion: "Heat produced H = I²Rt. This is the principle behind electric heaters, toasters and electric irons."
          }
        ]
      },
      {
        number: 5,
        title: "Heat",
        topics: ["Temperature and heat", "Specific heat capacity", "Latent heat", "Calorimetry", "Thermal expansion", "Radiation, conduction, convection"],
        experiments: [
          {
            number: 1,
            title: "Thermal Expansion of Solids",
            objective: "To demonstrate that metals expand on heating using a ball-and-ring experiment.",
            materials: ["Metal ball", "Metal ring (slightly larger than ball)", "Gas burner", "Tongs"],
            procedure: [
              "Pass the metal ball through the ring at room temperature. It should pass through easily.",
              "Heat the metal ball strongly using the gas burner for 2 minutes.",
              "Try to pass the heated ball through the ring.",
              "Wait for the ball to cool and try again.",
              "Record your observations."
            ],
            observations: "The heated ball does not fit through the ring. After cooling it passes through again.",
            conclusion: "Metals expand on heating and contract on cooling. This property is called thermal expansion."
          },
          {
            number: 2,
            title: "Calorimetry — Specific Heat of a Metal",
            objective: "To find the specific heat capacity of a metal by the method of mixtures.",
            materials: ["Calorimeter with stirrer", "Thermometer", "Metal pieces (iron/copper)", "Hot water", "Cold water", "Balance"],
            procedure: [
              "Weigh the metal pieces (mass = m₁) and heat them in boiling water (temperature T₁).",
              "Weigh cold water in calorimeter (mass = m₂) and record temperature T₂.",
              "Drop the hot metal into cold water and stir gently.",
              "Record the final equilibrium temperature T₃.",
              "Apply the formula: m₁ × S₁ × (T₁-T₃) = m₂ × S_water × (T₃-T₂) to find S₁."
            ],
            observations: "Temperature of water rises and metal cools until equilibrium is reached.",
            conclusion: "Heat lost by hot metal = Heat gained by water. This gives the specific heat capacity of the metal."
          }
        ]
      },
      {
        number: 6,
        title: "Refraction of Light",
        topics: ["Laws of refraction", "Refractive index", "Snell's law", "Critical angle", "Total internal reflection"],
        experiments: [
          {
            number: 1,
            title: "Snell's Law of Refraction",
            objective: "To verify Snell's Law by measuring angles of incidence and refraction in a glass slab.",
            materials: ["Rectangular glass slab", "Pins (4)", "White paper", "Protractor", "Ruler", "Drawing board"],
            procedure: [
              "Place the glass slab on white paper and draw its outline (ABCD).",
              "Draw a normal (perpendicular) to face AB at point O.",
              "Fix two pins P1 and P2 on the incident ray making angle i with normal.",
              "Look through the opposite face CD and fix two more pins P3, P4 aligned with P1 and P2.",
              "Remove the slab and draw the emergent ray. Measure angle of refraction r.",
              "Repeat for 5 different angles and calculate sin i / sin r each time."
            ],
            observations: "sin i / sin r = constant for all angles of incidence for the same glass slab.",
            conclusion: "Snell's Law is verified: sin i / sin r = n (refractive index), which is constant for a given medium."
          },
          {
            number: 2,
            title: "Total Internal Reflection",
            objective: "To demonstrate total internal reflection using a glass block and to find the critical angle.",
            materials: ["Semicircular glass slab", "Laser pointer or ray box", "White paper", "Protractor"],
            procedure: [
              "Place the semicircular glass slab on paper with flat side facing you.",
              "Direct a ray through the curved face towards the centre of the flat face.",
              "Gradually increase the angle of incidence.",
              "Observe when the refracted ray disappears completely — this is the critical angle.",
              "Record the critical angle and calculate refractive index using n = 1/sin(critical angle)."
            ],
            observations: "At the critical angle the refracted ray grazes the surface. Beyond it, light reflects back into the glass.",
            conclusion: "Total internal reflection occurs when light travels from a denser to rarer medium beyond the critical angle."
          }
        ]
      },
      {
        number: 7,
        title: "Lenses",
        topics: ["Convex and concave lenses", "Image formation by lenses", "Lens formula", "Power of lens", "Magnification", "Human eye defects and corrections"],
        experiments: [
          {
            number: 1,
            title: "Image Formation by a Convex Lens",
            objective: "To study the nature, position and size of images formed by a convex lens for objects at various distances.",
            materials: ["Convex lens", "Lens holder", "Screen", "Illuminated object (candle/bulb)", "Optical bench", "Ruler"],
            procedure: [
              "Set up the lens on the optical bench. Place the illuminated object at distance > 2f.",
              "Move the screen until a sharp image forms. Record object distance (u) and image distance (v).",
              "Observe the nature of image (real/virtual, erect/inverted, enlarged/diminished).",
              "Move the object progressively closer: to 2f, between f and 2f, at f, inside f.",
              "Record image nature and position for each case."
            ],
            observations: "Object at >2f → small inverted real image. At 2f → equal size image. Between f and 2f → enlarged image. At f → image at infinity. Inside f → virtual erect magnified image.",
            conclusion: "A convex lens forms different types of images depending on the object distance relative to the focal length."
          },
          {
            number: 2,
            title: "Verification of Lens Formula",
            objective: "To verify the lens formula 1/v - 1/u = 1/f using a convex lens.",
            materials: ["Convex lens (known focal length)", "Optical bench", "Object pin", "Image pin", "Ruler"],
            procedure: [
              "Fix the convex lens and place object pin at distance u = 30 cm from the lens.",
              "Find the image using a search pin on the other side to eliminate parallax.",
              "Record u and v. Calculate 1/v - 1/u.",
              "Repeat for at least 5 different object distances.",
              "Compare calculated 1/f with the known 1/f value."
            ],
            observations: "1/v - 1/u remains approximately constant and equals 1/f for all object positions.",
            conclusion: "Lens formula 1/v - 1/u = 1/f is verified. The formula holds true for a thin convex lens."
          }
        ]
      },
      {
        number: 8,
        title: "Metallurgy",
        topics: ["Occurrence of metals", "Extraction of metals", "Electrolytic refining", "Corrosion", "Alloys", "Properties of metals and non-metals"],
        experiments: [
          {
            number: 1,
            title: "Electrolytic Refining of Copper",
            objective: "To demonstrate the electrolytic refining of copper using copper electrodes in copper sulphate solution.",
            materials: ["Copper sulphate solution", "Two copper strips (electrodes)", "Battery (6V)", "Connecting wires", "Ammeter", "Beaker"],
            procedure: [
              "Fill the beaker with copper sulphate solution (blue).",
              "Connect the two copper strips to a 6V battery — anode (+) and cathode (-).",
              "Pass current for 20 minutes. Observe both electrodes.",
              "Weigh both copper strips before and after the experiment.",
              "Note the change in mass of anode vs cathode."
            ],
            observations: "Anode loses mass (dissolves). Cathode gains mass (pure copper deposits). Solution stays blue.",
            conclusion: "In electrolytic refining, impure metal at anode dissolves and pure metal deposits at cathode."
          },
          {
            number: 2,
            title: "Investigating Corrosion",
            objective: "To study conditions necessary for iron to rust and compare different protective methods.",
            materials: ["Iron nails (6)", "Test tubes", "Salt water", "Dry air (with silica gel)", "Oil", "Paint"],
            procedure: [
              "Set up 3 test tubes: nail in distilled water, nail in salt water, nail in dry air.",
              "Prepare 3 more: painted nail in water, oiled nail in water, bare nail in water.",
              "Observe all after 24 hours and 48 hours.",
              "Record the amount of rusting in each case.",
              "Determine which conditions accelerate and which prevent corrosion."
            ],
            observations: "Salt water accelerates rusting. Dry air = minimal rust. Oiled/painted nails show least corrosion.",
            conclusion: "Iron rusts in presence of oxygen AND water. Salt accelerates corrosion. Protective coatings prevent it."
          }
        ]
      },
      {
        number: 9,
        title: "Carbon Compounds",
        topics: ["Covalent bonding in carbon", "Allotropes of carbon", "Organic compounds", "Hydrocarbons", "Ethanol and Ethanoic acid", "Soap and detergents", "Saponification"],
        experiments: [
          {
            number: 1,
            title: "Properties of Ethanol and Ethanoic Acid",
            objective: "To compare and contrast the physical and chemical properties of ethanol (C₂H₅OH) and ethanoic acid (CH₃COOH).",
            materials: ["Test tubes", "Ethanol", "Ethanoic acid", "Blue and red litmus paper", "Sodium bicarbonate", "Sodium metal (small piece)", "Universal indicator"],
            procedure: [
              "Smell both substances carefully (wave vapours, don't directly sniff).",
              "Test both with red and blue litmus paper.",
              "Add sodium bicarbonate to each and observe for CO₂ bubbles.",
              "Carefully add a tiny piece of sodium metal to each and observe gas evolution.",
              "Test pH of both using universal indicator."
            ],
            observations: "Ethanol: neutral, no litmus change, reacts with Na to give H₂. Ethanoic acid: acidic, turns blue litmus red, reacts with NaHCO₃ to give CO₂.",
            conclusion: "Ethanoic acid is a weak acid; ethanol is neutral. Both are organic compounds but with very different properties."
          },
          {
            number: 2,
            title: "Saponification — Making Soap",
            objective: "To prepare soap by the saponification reaction of oil with sodium hydroxide solution.",
            materials: ["Vegetable oil (10 mL)", "Sodium hydroxide solution (20% NaOH)", "Saturated salt solution", "Beaker", "Stirrer", "Bunsen burner", "Tripod stand"],
            procedure: [
              "Heat 10 mL of vegetable oil in a beaker.",
              "Gradually add 20 mL of 20% NaOH solution while stirring continuously.",
              "Heat the mixture gently for 15-20 minutes while stirring.",
              "Pour the soapy mixture into saturated salt solution to precipitate the soap.",
              "Collect the soap, wash with cold water and test its lathering ability."
            ],
            observations: "A white solid (soap) forms and precipitates in the salt solution. The soap lathers well with water.",
            conclusion: "Saponification: Oil + NaOH → Soap (sodium salt of fatty acid) + Glycerol. This is the principle of soap making."
          },
          {
            number: 3,
            title: "Cleansing Action of Soap",
            objective: "To demonstrate the cleansing action of soap by emulsification of an oily substance.",
            materials: ["Two test tubes", "Water", "Mustard oil", "Soap solution", "Cloth with grease stain"],
            procedure: [
              "Add mustard oil to water in test tube 1 (no soap). Shake and observe.",
              "Add mustard oil to water in test tube 2 with a few drops of soap solution. Shake and observe.",
              "Observe the duration of emulsion in each case.",
              "Apply soap solution to a grease-stained cloth and wash with water.",
              "Compare cleanliness before and after."
            ],
            observations: "Oil in water separates quickly without soap. With soap, a stable emulsion forms that lasts much longer.",
            conclusion: "Soap has hydrophilic (water-loving) and hydrophobic (oil-loving) ends. It emulsifies oils enabling removal of grease."
          }
        ]
      },
      {
        number: 10,
        title: "Space Missions",
        topics: ["History of space exploration", "Rockets and satellites", "Indian space programme (ISRO)", "Types of satellites", "Applications of satellites", "Future of space exploration"],
        experiments: [
          {
            number: 1,
            title: "Balloon Rocket — Demonstrating Newton's Third Law",
            objective: "To demonstrate rocket propulsion using a balloon and understand Newton's 3rd Law in space travel.",
            materials: ["Long balloon", "String (5 metres)", "Tape", "Straw", "Two chair supports"],
            procedure: [
              "Thread a string through the straw and tie it taut between two chairs.",
              "Inflate the balloon (don't tie) and tape it to the straw.",
              "Release the balloon and observe its motion along the string.",
              "Measure the distance it travels with different inflation levels.",
              "Relate this to how rocket engines produce thrust."
            ],
            observations: "Air escaping backward propels the balloon forward along the string. More air = more thrust = greater distance.",
            conclusion: "Rockets work on Newton's 3rd Law: action (exhaust gases backward) and reaction (rocket moves forward)."
          },
          {
            number: 2,
            title: "Satellite Orbital Periods",
            objective: "To calculate orbital periods of satellites at different heights using Kepler's third law.",
            materials: ["Calculator", "Data: Earth's mass, radius", "Graph paper"],
            procedure: [
              "Use formula: T = 2π√(r³/GM) where r = Earth radius + orbital height.",
              "Calculate T for Low Earth Orbit (400 km), Medium (20,200 km, like GPS), Geostationary (35,786 km).",
              "Plot orbital height vs time period.",
              "Compare with Kepler's 3rd law: T² ∝ r³.",
              "Calculate velocity needed for each orbit using v = 2πr/T."
            ],
            observations: "LEO T ≈ 92 min. GPS T ≈ 12 hours. Geostationary T = exactly 24 hours. T² ∝ r³ verified.",
            conclusion: "Higher orbits have longer periods. Geostationary satellites orbit at exactly 35,786 km to match Earth's rotation."
          }
        ]
      }
    ]
  },
  {
    id: "mh-science-10-part2",
    title: "Science and Technology Part 2",
    subject: "Biology & Environment",
    grade: "10",
    author: "Maharashtra State Bureau of Textbook Production",
    pages: 120,
    status: "available" as const,
    emoji: "🧬",
    description: "Covers Biology and Environmental Science including Heredity, Life Processes, Environmental Management, Green Energy, Animal Classification, Microbiology, Biotechnology, Social Health and Disaster Management.",
    chapterCount: 10,
    experimentCount: 32,
    chapters: [
      {
        number: 1,
        title: "Heredity and Evolution",
        topics: ["DNA and RNA", "Transcription, Translation, Translocation", "Mutation", "Evolution", "Evidences of evolution", "Darwin's Natural Selection", "Lamarckism", "Human evolution"],
        experiments: [
          {
            number: 1,
            title: "Morphological Evidences of Evolution",
            objective: "To identify morphological similarities between different organisms as evidence of common ancestry.",
            materials: ["Pictures/photographs of different animals (cat, dog, horse, bat, whale)", "Sketch book", "Pencil"],
            procedure: [
              "Observe the external features (ear, nose, eye position, body hair) of different mammals.",
              "Draw and label the similarities in body structure.",
              "Compare forelimb bones of human, ox, bat and whale using diagrams.",
              "List similarities despite different functions.",
              "Discuss how similar structure indicates common ancestry (homologous organs)."
            ],
            observations: "All mammals have similar bone arrangement in forelimbs despite using them differently (grasping, swimming, flying, walking).",
            conclusion: "Morphological and anatomical similarities between organisms indicate they share common ancestors — evidence of evolution."
          },
          {
            number: 2,
            title: "Vestigial Organs Study",
            objective: "To identify vestigial organs in the human body and understand their evolutionary significance.",
            materials: ["Biology atlas", "Reference books", "Diagram of human body"],
            procedure: [
              "Identify and list vestigial organs in humans: appendix, wisdom teeth, coccyx (tailbone), ear muscles, body hair.",
              "Find the corresponding functional organ in related animals (e.g., appendix is functional in ruminants).",
              "Explain why these organs exist in a non-functional state.",
              "Create a comparison table: organ, functional in, vestigial in.",
              "Relate the presence of vestigial organs to Darwin's theory."
            ],
            observations: "Humans have over 90 vestigial structures. Each was functional in evolutionary ancestors but diminished over time.",
            conclusion: "Vestigial organs are remnants of structures that were functional in ancestors, providing direct evidence of evolution."
          },
          {
            number: 3,
            title: "Fossil Evidence of Evolution",
            objective: "To understand how fossils provide chronological evidence of evolutionary change.",
            materials: ["Fossil pictures/models", "Geological time scale chart", "Reference books on palaeontology"],
            procedure: [
              "Study fossil records of horse evolution (Eohippus to Equus).",
              "Arrange fossils chronologically using the geological time scale.",
              "Note changes in size, number of toes, and teeth structure over time.",
              "Find the fossil record of human evolution: Australopithecus → Homo habilis → Homo erectus → Homo sapiens.",
              "Discuss the significance of each transitional fossil."
            ],
            observations: "Fossils show gradual changes in body structure over millions of years following a logical progression.",
            conclusion: "The fossil record provides direct evidence of evolution and the gradual change of species over geological time."
          }
        ]
      },
      {
        number: 2,
        title: "Life Processes in Living Organisms Part 1",
        topics: ["Living organisms and energy", "Nutrients and energy efficiency", "Aerobic and anaerobic respiration", "Glycolysis and Krebs cycle", "Cell division — mitosis and meiosis"],
        experiments: [
          {
            number: 1,
            title: "Aerobic vs Anaerobic Respiration in Yeast",
            objective: "To demonstrate and compare aerobic and anaerobic respiration in yeast using glucose solution.",
            materials: ["Yeast powder", "Glucose solution (10%)", "Two flasks", "Lime water", "Rubber cork with delivery tube", "Hot water bath"],
            procedure: [
              "Flask A: Add yeast to glucose solution; connect delivery tube to lime water. Leave open to air (aerobic).",
              "Flask B: Same setup but seal completely with rubber cork (anaerobic).",
              "Keep both at 37°C for 1 hour.",
              "Compare the rate at which lime water turns milky (CO₂ production rate).",
              "Check Flask B for ethanol smell (anaerobic product)."
            ],
            observations: "Both flasks turn lime water milky (CO₂ produced). Flask B smells of alcohol. Flask A produces CO₂ faster.",
            conclusion: "Aerobic respiration: glucose + O₂ → CO₂ + H₂O + 38 ATP. Anaerobic: glucose → ethanol + CO₂ + 2 ATP only."
          },
          {
            number: 2,
            title: "Observing Stages of Mitosis",
            objective: "To observe and identify the four stages of mitosis in an onion root tip squash preparation.",
            materials: ["Onion root tips", "Hydrochloric acid (1N)", "Aceto-carmine stain", "Microscope slides", "Cover slips", "Bunsen burner", "Compound microscope"],
            procedure: [
              "Cut 1 cm root tips from onion roots. Fix in aceto-alcohol (1:3 ratio) for 30 minutes.",
              "Hydrolyse in 1N HCl at 60°C for 8 minutes.",
              "Stain with aceto-carmine for 10 minutes.",
              "Place on slide, squash gently with thumb and add cover slip.",
              "Observe under low then high power microscope. Identify prophase, metaphase, anaphase, telophase."
            ],
            observations: "Cells in various stages of division are visible. Chromosomes are clearly stained red in all stages.",
            conclusion: "Mitosis is continuous. In actively dividing regions (root tip), cells are caught at different phases of the cell cycle."
          }
        ]
      },
      {
        number: 3,
        title: "Life Processes in Living Organisms Part 2",
        topics: ["Photosynthesis", "Transpiration", "Pollination and fertilization", "Vegetative propagation", "Seed germination", "Auxins and growth hormones"],
        experiments: [
          {
            number: 1,
            title: "Demonstrating Photosynthesis",
            objective: "To demonstrate that chlorophyll is necessary for photosynthesis and that starch is produced during photosynthesis.",
            materials: ["Variegated plant (green + white areas)", "Iodine solution", "Ethanol", "Water bath", "Beaker", "Test tube"],
            procedure: [
              "Keep the variegated plant in bright sunlight for 4-5 hours.",
              "Pluck a leaf and draw its outline marking green and white regions.",
              "Boil the leaf in ethanol to remove chlorophyll (decolorize).",
              "Wash with water and spread flat. Apply iodine solution.",
              "Compare the coloured (blue-black) regions with the leaf diagram."
            ],
            observations: "Only the green areas (with chlorophyll) turn blue-black with iodine, indicating starch. White areas remain uncoloured.",
            conclusion: "Chlorophyll is essential for photosynthesis. Starch is produced only in regions containing chlorophyll in light."
          },
          {
            number: 2,
            title: "Measurement of Transpiration Rate",
            objective: "To measure the rate of water loss through transpiration using a potometer.",
            materials: ["Potted plant (well-watered)", "Polythene bag", "Rubber band", "Balance", "Petroleum jelly"],
            procedure: [
              "Weigh a well-watered potted plant (plant + pot + soil).",
              "Cover the soil with polythene (so only transpiration causes water loss).",
              "Place in bright sunlight for 2 hours.",
              "Weigh again and calculate water loss.",
              "Cover the leaves with petroleum jelly and repeat. Compare the results."
            ],
            observations: "Plant loses significant mass due to transpiration. Petroleum jelly (blocking stomata) drastically reduces mass loss.",
            conclusion: "Transpiration occurs mainly through stomata in leaves. It is affected by light, temperature, humidity and wind."
          },
          {
            number: 3,
            title: "Seed Germination Conditions",
            objective: "To investigate conditions necessary for seed germination (water, air, warmth).",
            materials: ["Mung bean seeds (20)", "4 beakers", "Cotton", "Water", "Oil (to exclude air)", "Refrigerator"],
            procedure: [
              "Beaker 1: Seeds on wet cotton at room temperature (all conditions present).",
              "Beaker 2: Seeds on dry cotton at room temperature (no water).",
              "Beaker 3: Seeds submerged in water covered with oil (no air).",
              "Beaker 4: Seeds on wet cotton in refrigerator (no warmth).",
              "Check and record germination after 48 and 72 hours."
            ],
            observations: "Only Beaker 1 seeds germinate well. Beakers 2, 3, 4 show no or minimal germination.",
            conclusion: "Seeds require water, air (oxygen), and appropriate temperature for germination. Absence of any one prevents it."
          }
        ]
      },
      {
        number: 4,
        title: "Environmental Management",
        topics: ["Ecosystem and its components", "Food chains and food webs", "Conservation of nature", "Pollution — air, water, soil", "Solid waste management", "Environmental laws"],
        experiments: [
          {
            number: 1,
            title: "Water Purification Methods",
            objective: "To demonstrate different methods of water purification: sedimentation, filtration, chlorination, and boiling.",
            materials: ["Muddy water (500 mL)", "Alum", "Sand and gravel filter", "Filter paper", "Chlorine tablets", "Thermometer"],
            procedure: [
              "Add a pinch of alum to muddy water, stir and allow to stand 30 min. Observe sedimentation.",
              "Pour the cleared water through a sand-gravel filter setup.",
              "Filter again through a filter paper in a funnel.",
              "Add 1/4 chlorine tablet to 1 litre of filtered water. Leave for 30 minutes.",
              "Compare turbidity, colour and clarity at each stage."
            ],
            observations: "Alum causes sedimentation of mud particles. Filtration removes suspended particles. Chlorination kills microorganisms.",
            conclusion: "Clean drinking water requires multiple stages of treatment. Each stage removes a specific type of contamination."
          },
          {
            number: 2,
            title: "Biodegradable vs Non-Biodegradable Waste",
            objective: "To observe and compare the decomposition rates of biodegradable and non-biodegradable materials.",
            materials: ["Soil in two boxes", "Fruit/vegetable peels", "Paper", "Plastic bag piece", "Glass piece", "Cotton cloth"],
            procedure: [
              "Bury equal amounts of each material in labelled sections of soil.",
              "Water both boxes equally for 30 days.",
              "On day 10, 20 and 30 — carefully dig and observe each material.",
              "Record changes in size, colour, texture and odour.",
              "Classify each material as biodegradable or non-biodegradable."
            ],
            observations: "Fruit peels, paper and cotton decompose over 30 days. Plastic and glass remain unchanged.",
            conclusion: "Biodegradable waste is broken down by microorganisms. Non-biodegradable waste persists and pollutes the environment."
          }
        ]
      },
      {
        number: 5,
        title: "Towards Green Energy",
        topics: ["Conventional energy sources and their effects", "Solar energy", "Wind energy", "Biogas", "Hydropower", "Tidal and geothermal energy", "Energy conservation"],
        experiments: [
          {
            number: 1,
            title: "Solar Cooker Model",
            objective: "To construct a simple solar cooker and measure its maximum temperature on a sunny day.",
            materials: ["Cardboard box", "Aluminium foil", "Black paint", "Glass sheet", "Thermometer", "Small food item"],
            procedure: [
              "Paint inside of box black. Line the lid with aluminium foil (reflector).",
              "Place a small closed dark container with food inside the box.",
              "Cover the top opening with a glass sheet to create greenhouse effect.",
              "Tilt the foil-lined lid to reflect sunlight into the box.",
              "Measure temperature inside the box every 10 minutes for 1 hour."
            ],
            observations: "Temperature inside can reach 100–120°C on a sunny day. Food (like chapati or water) gets cooked/heated.",
            conclusion: "Solar cookers use the greenhouse effect and solar radiation to cook food without fuel — a clean, renewable method."
          },
          {
            number: 2,
            title: "Biogas Generation Model",
            objective: "To understand the process of biogas generation from organic waste using a model biogas plant.",
            materials: ["Airtight container (2L)", "Cow dung", "Water", "Rubber tube", "Collection balloon", "Candle"],
            procedure: [
              "Mix cow dung with water (1:1) to form slurry. Pour into airtight container.",
              "Insert a rubber tube through the lid to allow gas to escape.",
              "Attach a balloon to collect gas. Keep at room temperature.",
              "After 5–7 days, observe gas in balloon.",
              "Test the gas by bringing a burning candle near it."
            ],
            observations: "After 5-7 days, balloon inflates with biogas. The gas burns with a blue flame when ignited safely.",
            conclusion: "Cow dung undergoes anaerobic digestion by bacteria to produce biogas (mainly methane + CO₂) — a clean renewable fuel."
          }
        ]
      },
      {
        number: 6,
        title: "Animal Classification",
        topics: ["Basis of classification", "Invertebrates: Porifera, Coelenterata, Annelida, Arthropoda, Mollusca, Echinodermata", "Vertebrates: Fish, Amphibia, Reptilia, Aves, Mammalia", "Binomial nomenclature"],
        experiments: [
          {
            number: 1,
            title: "Invertebrate Classification",
            objective: "To observe and classify common invertebrates based on their body features using dichotomous keys.",
            materials: ["Preserved or live specimens (earthworm, grasshopper, snail, starfish, sponge)", "Hand lens", "Classification charts", "Notebook"],
            procedure: [
              "Observe each specimen carefully with a hand lens.",
              "Note key features: body symmetry, presence of backbone, type of body cavity, exoskeleton/endoskeleton.",
              "Use a dichotomous key to classify each organism to its phylum.",
              "Draw each organism and label key identifying features.",
              "Compare arthropods (grasshopper) and annelids (earthworm) — both segmented but different."
            ],
            observations: "Earthworm: annelid, segmented, no exoskeleton. Grasshopper: arthropod, exoskeleton, jointed legs. Starfish: echinoderm, radial symmetry.",
            conclusion: "Animals are classified based on structural features. Invertebrates lack a backbone but are highly diverse in other features."
          },
          {
            number: 2,
            title: "Vertebrate Comparative Study",
            objective: "To compare characteristics of the five classes of vertebrates using specimens, models and charts.",
            materials: ["Charts and models of fish, frog, lizard, pigeon, rabbit", "Comparison table template", "Reference atlas"],
            procedure: [
              "Study each vertebrate class using models/charts: Pisces, Amphibia, Reptilia, Aves, Mammalia.",
              "For each class, note: habitat, body covering, limbs, reproduction, warm/cold-blooded.",
              "Fill in the comparison table for all 5 classes.",
              "Identify the most and least evolved vertebrate class.",
              "Discuss adaptations of each class to their habitat."
            ],
            observations: "Fish: scales, cold-blooded, external fertilization. Amphibia: moist skin, both habitats. Mammals: hair, warm-blooded, internal fertilization, breast feed young.",
            conclusion: "Vertebrates show progressive evolution from fish (simplest) to mammals (most complex). Each class shows specific adaptations."
          }
        ]
      },
      {
        number: 7,
        title: "Introduction to Microbiology",
        topics: ["Discovery of microorganisms", "Types: bacteria, fungi, algae, protozoa, viruses", "Beneficial microbes", "Harmful microbes and diseases", "Fermentation", "Antibiotics"],
        experiments: [
          {
            number: 1,
            title: "Yeast Fermentation",
            objective: "To demonstrate fermentation by yeast and detect alcohol and CO₂ produced.",
            materials: ["Yeast (5g)", "Sugar (10g)", "Warm water (100 mL)", "Conical flask", "Rubber cork", "Delivery tube", "Lime water", "Thermometer"],
            procedure: [
              "Dissolve sugar in warm water (37°C). Add yeast and mix well.",
              "Pour into conical flask. Insert rubber cork with delivery tube leading to lime water.",
              "Keep at 37°C for 30–45 minutes.",
              "Observe lime water turning milky (CO₂).",
              "Carefully smell the flask opening (ethanol odour)."
            ],
            observations: "Lime water turns milky indicating CO₂ production. Flask contents smell of ethanol after fermentation.",
            conclusion: "Yeast ferments glucose anaerobically: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. This process is used in bread-making and brewing."
          },
          {
            number: 2,
            title: "Antibiotic Sensitivity Test (Demonstration)",
            objective: "To demonstrate antibiotic sensitivity testing used to find effective antibiotics for bacterial infections.",
            materials: ["Nutrient agar plates (pre-poured)", "Antibiotic discs (penicillin, streptomycin, ampicillin)", "Bacterial culture (non-pathogenic E. coli)", "Sterile swabs", "Forceps", "Incubator at 37°C"],
            procedure: [
              "Swab the bacterial culture evenly on an agar plate.",
              "Using sterile forceps, place 3 antibiotic discs on the plate, equally spaced.",
              "Incubate the plate at 37°C for 24 hours.",
              "Measure the clear zones (zones of inhibition) around each disc.",
              "A larger clear zone = more effective antibiotic."
            ],
            observations: "Clear circular zones appear around effective antibiotic discs where bacteria could not grow.",
            conclusion: "The antibiotic sensitivity test helps determine which antibiotic works best against a specific bacterium — the basis of clinical testing."
          }
        ]
      },
      {
        number: 8,
        title: "Cell Biology and Biotechnology",
        topics: ["Cell structure and organelles", "Osmosis and diffusion", "Cell membrane properties", "DNA extraction", "PCR and genetic engineering", "Applications of biotechnology"],
        experiments: [
          {
            number: 1,
            title: "Osmosis in Plant Cells",
            objective: "To demonstrate osmosis in plant cells using potato strips in solutions of different concentrations.",
            materials: ["Potato", "3 beakers", "Salt solution (high concentration)", "Distilled water", "Sucrose solution (medium concentration)", "Ruler", "Balance"],
            procedure: [
              "Cut 9 equal potato strips (5 cm each, same mass).",
              "Place 3 strips each in: distilled water, medium salt solution, high salt solution.",
              "Leave for 2 hours at room temperature.",
              "Remove, pat dry and measure length and mass of each strip.",
              "Compare and calculate % change in mass for each condition."
            ],
            observations: "Strips in distilled water become firm and longer (turgor). Strips in salt solution become flaccid and shorter (plasmolysis).",
            conclusion: "Osmosis occurs across the semi-permeable cell membrane. Water moves from high to low water potential (from dilute to concentrated solution)."
          },
          {
            number: 2,
            title: "DNA Extraction from Onion",
            objective: "To extract and visualize DNA from onion cells using a simple home laboratory technique.",
            materials: ["Onion", "Salt (NaCl)", "Liquid detergent", "Ethanol (chilled)", "Strainer", "Test tube", "Wooden stick"],
            procedure: [
              "Chop onion finely and add 10 mL of a mixture of salt (1/4 tsp) + detergent (1 tsp) + warm water (100 mL).",
              "Blend or mash the onion in this solution for 3-4 minutes. Strain through cloth.",
              "Pour the filtered liquid into a test tube.",
              "Slowly pour chilled ethanol down the side of the tube — a distinct layer forms above.",
              "Use a wooden stick to spool out the white stringy DNA visible at the interface."
            ],
            observations: "White stringy material (DNA precipitate) is visible at the interface between the onion liquid and ethanol layers.",
            conclusion: "DNA can be extracted from cells using detergent (disrupts cell membrane) and ethanol precipitation (DNA is insoluble in ethanol)."
          }
        ]
      },
      {
        number: 9,
        title: "Social Health",
        topics: ["Dimensions of health: physical, mental, social, spiritual", "Balanced diet and nutritional diseases", "Communicable and non-communicable diseases", "Substance abuse", "Mental health", "Reproductive health"],
        experiments: [
          {
            number: 1,
            title: "Nutritional Deficiency Analysis",
            objective: "To identify nutritional deficiencies from symptoms and relate them to dietary improvements.",
            materials: ["Health survey questionnaire", "Body weight and height chart", "BMI calculator", "Nutritional value charts"],
            procedure: [
              "Measure height and weight of 5 family members. Calculate BMI = weight(kg)/height²(m).",
              "Classify BMI: <18.5 = underweight, 18.5–24.9 = normal, >25 = overweight.",
              "Record dietary intake for one day. Compare with Recommended Daily Allowance (RDA).",
              "Identify missing nutrients and associated deficiency diseases.",
              "Suggest dietary modifications to address deficiencies."
            ],
            observations: "Most students show deficiencies in iron, calcium or vitamins depending on their diet. Some are underweight or overweight.",
            conclusion: "A balanced diet with all nutrients in correct amounts is essential for good health. BMI helps assess healthy body weight."
          },
          {
            number: 2,
            title: "First Aid Practice",
            objective: "To practise basic first aid procedures: CPR, wound care and management of fractures.",
            materials: ["CPR practice dummy", "Bandages", "Antiseptic", "Splints", "First aid manual"],
            procedure: [
              "Learn and practise the DRABC procedure (Danger, Response, Airway, Breathing, Circulation).",
              "Practise chest compressions for CPR on a dummy at 100–120 compressions per minute.",
              "Demonstrate cleaning and bandaging a simulated wound.",
              "Practise immobilising a simulated fracture with splints and bandages.",
              "Role-play emergency phone calls to explain the situation."
            ],
            observations: "Correct CPR technique maintains blood circulation. Proper wound care prevents infection. Splinting prevents further injury.",
            conclusion: "First aid skills can save lives. Everyone should know basic CPR, wound care and fracture management procedures."
          }
        ]
      },
      {
        number: 10,
        title: "Disaster Management",
        topics: ["Natural disasters: earthquake, flood, cyclone, drought, landslide", "Man-made disasters", "Disaster preparedness", "Relief and rescue operations", "Role of government and NGOs", "Disaster risk reduction"],
        experiments: [
          {
            number: 1,
            title: "Earthquake-Proof Building Model",
            objective: "To construct a model building and test its resistance to simulated earthquake vibrations.",
            materials: ["Cardboard sheets", "Toothpicks", "Marshmallows or clay", "Jelly/gelatin base (to simulate ground)", "Small weights"],
            procedure: [
              "Build two model buildings: one with a rectangular base and one with diagonal bracing.",
              "Place each on a gelatin base to simulate soft ground.",
              "Shake the base side to side to simulate an earthquake (10 shakes).",
              "Compare the structural stability of both buildings.",
              "Identify which features make a structure earthquake-resistant."
            ],
            observations: "Building with diagonal bracing remains more stable than the plain rectangular building during shaking.",
            conclusion: "Diagonal bracing, deep foundations and flexible materials improve earthquake resistance. Building design is crucial for safety."
          },
          {
            number: 2,
            title: "Disaster Preparedness Plan",
            objective: "To create a community disaster preparedness plan for a natural disaster likely in your region.",
            materials: ["Local map", "Emergency contact list template", "First aid kit checklist", "72-hour emergency kit list"],
            procedure: [
              "Identify the most likely natural disaster in your region (flood, earthquake, cyclone).",
              "Create a family emergency communication plan with contact numbers.",
              "Prepare a 72-hour emergency kit checklist (water, food, medicines, documents, torch).",
              "Draw an evacuation map of your home showing 2 exit routes.",
              "Present and discuss the plan with your family."
            ],
            observations: "Most families lack a written emergency plan. Basic preparedness (water, food, documents) is often overlooked.",
            conclusion: "Prior planning and preparation significantly reduce risk during disasters. Every family should have an emergency preparedness plan."
          }
        ]
      }
    ]
  }
];

router.get("/books", (_req, res) => {
  const books = booksData.map(({ chapters: _chapters, ...rest }) => rest);
  const data = Zod.GetBooksResponse.parse(booksData);
  res.json(data);
});

router.get("/books/:id", (req, res) => {
  const book = booksData.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  return res.json(book);
});

export default router;
