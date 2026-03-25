import { useState } from "react";
import { useGetBooks } from "@/lib/api-client";
import { Badge } from "@/components/PlayfulUI";
import {
  Book, ChevronDown, ChevronRight, FlaskConical,
  Layers, Target, Wrench, ClipboardList, CheckCircle2, BookOpen, Microscope
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Experiment {
  number: number;
  title: string;
  objective: string;
  materials: string[];
  procedure: string[];
  observations?: string;
  conclusion?: string;
}

interface Chapter {
  number: number;
  title: string;
  topics: string[];
  experiments: Experiment[];
}

interface BookDetail {
  id: string;
  title: string;
  subject: string;
  grade: string;
  author: string;
  pages: number;
  emoji: string;
  description: string;
  chapterCount: number;
  experimentCount: number;
  chapters: Chapter[];
}

const BOOK_THEMES: Record<string, { bg: string; border: string; badge: string; icon: string; accent: string }> = {
  "mh-science-10-part1": {
    bg: "from-blue-950 to-indigo-900",
    border: "border-blue-700/50",
    badge: "bg-blue-500",
    icon: "⚛️",
    accent: "text-blue-300",
  },
  "mh-science-10-part2": {
    bg: "from-emerald-950 to-green-900",
    border: "border-emerald-700/50",
    badge: "bg-emerald-500",
    icon: "🧬",
    accent: "text-emerald-300",
  },
};

function ExperimentCard({ exp, chapterNum, bookId }: { exp: Experiment; chapterNum: number; bookId: string }) {
  const [open, setOpen] = useState(false);
  const theme = BOOK_THEMES[bookId] || BOOK_THEMES["mh-science-10-part1"];

  return (
    <div className="border border-border/60 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex flex-col items-center justify-center font-bold text-xs leading-tight">
          <span className="text-xs opacity-60">Ch.{chapterNum}</span>
          <span className="text-sm font-bold">E{exp.number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-foreground text-sm">Experiment {exp.number}:</span>
            <span className="font-bold text-foreground text-sm">{exp.title}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{exp.objective}</p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">{exp.materials.length} materials</span>
          {open
            ? <ChevronDown className="w-4 h-4 text-primary" />
            : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 p-5 space-y-5 bg-gradient-to-br from-white to-muted/20">
              {/* Objective */}
              <div className="flex gap-3">
                <Target className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Objective</p>
                  <p className="text-sm text-foreground leading-relaxed">{exp.objective}</p>
                </div>
              </div>

              {/* Materials */}
              <div className="flex gap-3">
                <Wrench className="w-5 h-5 text-secondary-dark flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-secondary-dark uppercase tracking-wider mb-2">Materials Required</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.materials.map((m, i) => (
                      <span key={i} className="text-xs bg-secondary/10 text-secondary-dark border border-secondary/20 px-2 py-1 rounded-lg font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Procedure */}
              <div className="flex gap-3">
                <ClipboardList className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Procedure</p>
                  <ol className="space-y-2">
                    {exp.procedure.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-foreground leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Observations & Conclusion */}
              {exp.observations && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">🔭 Observations</p>
                    <p className="text-sm text-amber-800 leading-relaxed">{exp.observations}</p>
                  </div>
                  {exp.conclusion && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">✅ Conclusion</p>
                      <p className="text-sm text-emerald-800 leading-relaxed">{exp.conclusion}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChapterSection({ chapter, bookId, isExpanded, onToggle }: {
  chapter: Chapter;
  bookId: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-2 border-border rounded-3xl overflow-hidden bg-white">
      {/* Chapter Header */}
      <button
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/20 transition-colors"
        onClick={onToggle}
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md shadow-primary/20">
          {chapter.number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-foreground text-base">Chapter {chapter.number}:</span>
            <span className="font-display font-bold text-foreground text-base">{chapter.title}</span>
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1"><FlaskConical className="w-3 h-3" /> {chapter.experiments.length} Experiment{chapter.experiments.length > 1 ? "s" : ""}</span>
            <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {chapter.topics.length} Topics</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          {isExpanded
            ? <ChevronDown className="w-5 h-5 text-primary" />
            : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="border-t-2 border-border/50">
              {/* Topics */}
              <div className="px-5 py-4 bg-muted/30 border-b border-border/30">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Topics Covered</p>
                <div className="flex flex-wrap gap-2">
                  {chapter.topics.map((topic, i) => (
                    <span key={i} className="text-xs bg-white border border-border/70 text-foreground px-2.5 py-1 rounded-full font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experiments */}
              <div className="p-5 space-y-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <Microscope className="w-4 h-4" /> Practical Experiments
                </p>
                {chapter.experiments.map(exp => (
                  <ExperimentCard key={exp.number} exp={exp} chapterNum={chapter.number} bookId={bookId} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BookPanel({ book }: { book: BookDetail }) {
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());
  const [bookOpen, setBookOpen] = useState(false);
  const theme = BOOK_THEMES[book.id] || BOOK_THEMES["mh-science-10-part1"];

  const toggleChapter = (num: number) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const expandAll = () => setExpandedChapters(new Set(book.chapters.map(c => c.number)));
  const collapseAll = () => setExpandedChapters(new Set());

  return (
    <div className={`rounded-3xl border-2 overflow-hidden shadow-xl ${bookOpen ? "border-primary/40" : "border-border"}`}>
      {/* Book Header Card */}
      <div className={`bg-gradient-to-br ${theme.bg} text-white p-6 sm:p-8`}>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="text-6xl">{book.emoji}</div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 border border-white/30">Grade {book.grade}</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 border border-white/30">{book.subject}</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 border border-white/30">Maharashtra SSC Board</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-2">10th {book.title}</h2>
            <p className="text-white/70 text-sm mb-4">{book.author}</p>
            <p className="text-white/80 text-sm leading-relaxed mb-5">{book.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Chapters", value: book.chapterCount, icon: BookOpen },
                { label: "Experiments", value: book.experimentCount, icon: FlaskConical },
                { label: "Pages", value: book.pages, icon: Book },
              ].map(s => (
                <div key={s.label} className="bg-white/10 rounded-2xl p-3 text-center border border-white/20">
                  <s.icon className="w-5 h-5 mx-auto mb-1 text-white/70" />
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/60 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setBookOpen(o => !o)}
          className="mt-6 w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
        >
          {bookOpen ? (
            <><ChevronDown className="w-5 h-5" /> Hide All Chapters & Experiments</>
          ) : (
            <><BookOpen className="w-5 h-5" /> Browse All {book.chapterCount} Chapters & {book.experimentCount} Experiments</>
          )}
        </button>
      </div>

      {/* Chapters */}
      <AnimatePresence>
        {bookOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 sm:p-6 bg-muted/20 border-t-2 border-border space-y-4">
              {/* Expand/Collapse controls */}
              <div className="flex items-center justify-between">
                <p className="font-bold text-foreground">All Chapters</p>
                <div className="flex gap-2">
                  <button onClick={expandAll} className="text-xs text-primary font-bold hover:underline">Expand All</button>
                  <span className="text-muted-foreground">·</span>
                  <button onClick={collapseAll} className="text-xs text-muted-foreground font-bold hover:underline">Collapse All</button>
                </div>
              </div>

              {/* Chapter List */}
              <div className="space-y-3">
                {book.chapters.map(chapter => (
                  <ChapterSection
                    key={chapter.number}
                    chapter={chapter}
                    bookId={book.id}
                    isExpanded={expandedChapters.has(chapter.number)}
                    onToggle={() => toggleChapter(chapter.number)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Books() {
  const { data: booksApi, isLoading } = useGetBooks();

  const fullBooks: BookDetail[] = [
    {
      id: "mh-science-10-part1",
      title: "Science and Technology Part 1",
      subject: "Physics & Chemistry",
      grade: "10",
      author: "Maharashtra State Bureau of Textbook Production",
      pages: 164,
      emoji: "⚛️",
      description: "Covers Physics and Chemistry topics including Gravitation, Periodic Table, Chemical Reactions, Electricity, Heat, Light, Metallurgy, Carbon Compounds and Space Missions.",
      chapterCount: 10,
      experimentCount: 38,
      chapters: [
        {
          number: 1, title: "Gravitation",
          topics: ["Gravitation", "Circular motion and centripetal force", "Kepler's laws", "Newton's universal law of gravitation", "Acceleration due to gravity", "Free fall", "Escape velocity"],
          experiments: [
            { number: 1, title: "Centripetal Force Demonstration", objective: "To demonstrate centripetal force using a stone tied to a string and observe the effect when the string is released.", materials: ["A small stone", "String (1 metre)", "Open space"], procedure: ["Tie the stone to one end of the string.", "Rotate it in a horizontal circle while holding the other end.", "Release the string and observe the direction the stone flies.", "Note that the stone flies off tangentially to the circle."], observations: "When the string is released, the stone flies off tangentially, proving the centripetal force was directed towards the centre.", conclusion: "For any object moving in a circle, a centripetal force acts directed towards the centre of the circle." },
            { number: 2, title: "Free Fall Observation", objective: "To observe that objects of different masses fall at the same rate under gravity.", materials: ["Two stones of different masses", "A height of at least 2 metres"], procedure: ["Hold two stones of different mass at the same height.", "Release both simultaneously.", "Observe which reaches the ground first.", "Repeat with a coin and a heavy book."], observations: "Both objects of different masses reach the ground at the same time when dropped from the same height.", conclusion: "Acceleration due to gravity (g = 9.8 m/s²) is the same for all objects regardless of mass." },
            { number: 3, title: "Weight on Different Planets", objective: "To calculate weight of a person on the Moon, Mars, and Jupiter using Newton's law of gravitation.", materials: ["Calculator", "Data table of planetary masses and radii", "Notebook"], procedure: ["Note your weight on Earth.", "Use g = GM/R² for each planet.", "Calculate g for Moon (mass 1/81, radius 1/3.7 of Earth).", "Calculate weight on Moon = mass × g_moon.", "Repeat for Mars (g = 3.71) and Jupiter (g = 24.79 m/s²)."], observations: "Weight on Moon ≈ 1/6 of Earth weight. Weight on Jupiter ≈ 2.5× Earth weight.", conclusion: "Weight depends on the gravitational acceleration of the planet. Mass remains constant but weight varies." }
          ]
        },
        {
          number: 2, title: "Periodic Classification of Elements",
          topics: ["Mendeleev's periodic table", "Modern periodic table", "Periods and groups", "Atomic radius, ionization energy, electronegativity", "Metallic and non-metallic character"],
          experiments: [
            { number: 1, title: "Trends in the Periodic Table", objective: "To identify trends in atomic radius and electronegativity across periods and down groups.", materials: ["Modern periodic table chart", "Coloured pencils", "Graph paper"], procedure: ["Record atomic radii of Period 3 elements (Na to Cl).", "Plot atomic number vs atomic radius.", "Repeat for Group 1 elements (Li, Na, K, Rb).", "Identify the trend across a period and down a group."], observations: "Atomic radius decreases across a period and increases down a group.", conclusion: "Properties of elements follow a periodic pattern confirming the modern periodic law." },
            { number: 2, title: "Predicting Properties from Periodic Position", objective: "To use periodic trends to predict properties of an element based on its position.", materials: ["Periodic table", "Reference data", "Notebook"], procedure: ["Choose an element at a given position (e.g. Period 4, Group 17).", "Predict: atomic radius, electronegativity, metallic nature.", "Look up actual data and compare.", "Calculate percentage error.", "Discuss why the periodic table allows such predictions."], observations: "Predicted properties closely match actual values.", conclusion: "The periodic table allows prediction of element properties based on position." }
          ]
        },
        {
          number: 3, title: "Chemical Reactions and Equations",
          topics: ["Chemical reactions vs physical changes", "Chemical equations", "Balancing equations", "Combination, decomposition, displacement, double displacement reactions"],
          experiments: [
            { number: 1, title: "Identifying Physical and Chemical Changes", objective: "To distinguish between physical and chemical changes through colour, gas, temperature and new substance formation.", materials: ["Evaporating dish", "Bunsen burner", "Thermometer", "Limestone powder", "Copper sulphate solution", "Zinc dust", "Potassium chromate", "Barium sulphate solution", "Sodium carbonate", "Calcium chloride", "Phthalic anhydride", "Funnel", "Cotton plug"], procedure: ["Heat limestone powder strongly. Observe.", "Add zinc dust to copper sulphate solution. Record colour and temperature change.", "Add potassium chromate to barium sulphate solution. Record precipitate.", "Mix sodium carbonate with calcium chloride. Observe.", "Heat phthalic anhydride under an inverted funnel. Observe sublimation."], observations: "Limestone gives CaO + CO₂. Zinc displaces copper. CuSO₄ turns colourless. Precipitates form in double displacement.", conclusion: "Chemical changes produce new substances with different properties unlike reversible physical changes." },
            { number: 2, title: "Law of Conservation of Mass", objective: "To verify that total mass is conserved in a chemical reaction (AgNO₃ + NaCl).", materials: ["Conical flask", "Test tube", "String", "Rubber cork", "Balance", "Silver nitrate solution", "Sodium chloride solution"], procedure: ["Put NaCl solution in flask. Put AgNO₃ in test tube, lower into flask without mixing.", "Seal with rubber cork. Weigh the sealed setup.", "Tilt to mix the solutions. Observe white AgCl precipitate.", "Weigh the flask again."], observations: "White AgCl precipitate forms. Mass before and after reaction is exactly the same.", conclusion: "Mass is conserved during a chemical reaction — Law of Conservation of Mass is verified." },
            { number: 3, title: "Combination Reactions", objective: "To demonstrate combination reactions: HCl + NH₃, burning Mg, and CaO + H₂O.", materials: ["Test tube", "HCl", "Ammonia solution", "Glass rod", "Magnesium ribbon", "Tongs", "Calcium oxide", "Beaker"], procedure: ["Heat HCl, dip a rod in NH₃ and hold over tube. Observe white smoke.", "Ignite a Mg strip in tongs. Observe brilliant white light and MgO powder.", "Add CaO pieces to water. Feel the heat generated."], observations: "NH₃ + HCl → NH₄Cl (white smoke). 2Mg + O₂ → 2MgO. CaO + H₂O → Ca(OH)₂ + Heat.", conclusion: "In combination reactions, two or more reactants combine to form a single product." },
            { number: 4, title: "Decomposition Reactions", objective: "To demonstrate decomposition by heating sugar and decomposition of CaCO₃.", materials: ["Evaporating dish", "Bunsen burner", "Two test tubes", "Bent tube", "Rubber cork", "Sugar", "Calcium carbonate", "Lime water"], procedure: ["Heat sugar in an evaporating dish. Observe black carbon residue.", "Heat CaCO₃ in a test tube. Collect gas in lime water via bent tube.", "Observe lime water turning milky."], observations: "Sugar decomposes into carbon + water vapour. CaCO₃ → CaO + CO₂; CO₂ turns lime water milky.", conclusion: "Decomposition reactions involve a single reactant breaking down into two or more products." },
            { number: 5, title: "Displacement and Double Displacement Reactions", objective: "To observe Zn displacing Cu from CuSO₄ and AgNO₃ reacting with NaCl.", materials: ["Test tubes", "Zinc strips", "Copper sulphate solution", "Silver nitrate solution", "Sodium chloride solution"], procedure: ["Add zinc strip to CuSO₄ (blue) solution. Wait 5 minutes.", "Observe copper depositing on zinc; solution turns colourless.", "Mix AgNO₃ with NaCl solution. Observe white precipitate.", "Write balanced equations for both reactions."], observations: "Zn + CuSO₄ → ZnSO₄ + Cu. Blue colour fades. AgNO₃ + NaCl → AgCl (white ppt) + NaNO₃.", conclusion: "More reactive metals displace less reactive ones. Double displacement reactions exchange ions to form precipitates." }
          ]
        },
        {
          number: 4, title: "Effects of Electric Current",
          topics: ["Ohm's Law", "Resistance in series and parallel", "Heating effect of current", "Magnetic effect of current", "Electric motor and generator"],
          experiments: [
            { number: 1, title: "Verification of Ohm's Law", objective: "To verify that current through a conductor is directly proportional to voltage across it (V = IR).", materials: ["Voltmeter", "Ammeter", "Rheostat", "Battery (6V)", "Nichrome wire", "Connecting wires", "Key"], procedure: ["Connect nichrome wire in circuit with ammeter in series, voltmeter in parallel.", "Vary rheostat and record V and I for 5 settings.", "Plot V on X-axis and I on Y-axis.", "Calculate slope (= 1/R)."], observations: "V/I remains constant for all readings. V-I graph is a straight line through the origin.", conclusion: "V/I = R (constant). Ohm's Law is verified: current is directly proportional to voltage at constant temperature." },
            { number: 2, title: "Magnetic Effect of Electric Current", objective: "To demonstrate that a current-carrying conductor produces a magnetic field.", materials: ["Battery", "Switch", "Copper wire", "Compass needle", "Cardboard"], procedure: ["Pass copper wire through a hole in horizontal cardboard.", "Place compass near wire. Note its initial direction.", "Switch on current. Observe deflection.", "Reverse current and observe direction change."], observations: "Compass deflects when current flows. Deflection reverses when current direction reverses.", conclusion: "Electric current produces a magnetic field around the conductor (demonstrated by compass deflection)." },
            { number: 3, title: "Heating Effect of Electric Current", objective: "To demonstrate that electric current produces heat (Joule's heating effect).", materials: ["Nichrome wire coil", "Battery", "Switch", "Ammeter", "Paper strips"], procedure: ["Connect a coil of thin nichrome wire in a circuit.", "Place small paper strips touching the wire.", "Close circuit and observe after 2-3 minutes.", "Compare with thicker vs thinner wire."], observations: "Wire heats up significantly. Paper near wire may scorch. More current = more heat.", conclusion: "Heat produced H = I²Rt. This is the principle behind electric heaters, toasters and electric irons." }
          ]
        },
        {
          number: 5, title: "Heat",
          topics: ["Temperature and heat", "Specific heat capacity", "Latent heat", "Calorimetry", "Thermal expansion", "Radiation, conduction, convection"],
          experiments: [
            { number: 1, title: "Thermal Expansion of Solids", objective: "To demonstrate that metals expand on heating using a ball-and-ring experiment.", materials: ["Metal ball", "Metal ring (slightly larger than ball)", "Gas burner", "Tongs"], procedure: ["Pass the ball through the ring at room temperature.", "Heat the ball strongly for 2 minutes.", "Try to pass the heated ball through the ring.", "Let it cool and try again."], observations: "Heated ball does not fit through the ring. After cooling it passes through again.", conclusion: "Metals expand on heating and contract on cooling — this is thermal expansion." },
            { number: 2, title: "Specific Heat Capacity by Method of Mixtures", objective: "To find the specific heat capacity of a metal by the method of mixtures.", materials: ["Calorimeter with stirrer", "Thermometer", "Metal pieces", "Hot water", "Cold water", "Balance"], procedure: ["Heat metal pieces to known temperature T₁.", "Add to cold water (mass m₂) at temperature T₂.", "Stir and record equilibrium temperature T₃.", "Apply: m₁S₁(T₁-T₃) = m₂S_water(T₃-T₂)."], observations: "Temperature of water rises and metal cools until thermal equilibrium is reached.", conclusion: "Heat lost by metal = Heat gained by water. This gives the specific heat capacity of the metal." }
          ]
        },
        {
          number: 6, title: "Refraction of Light",
          topics: ["Laws of refraction", "Refractive index", "Snell's law", "Critical angle", "Total internal reflection"],
          experiments: [
            { number: 1, title: "Verification of Snell's Law", objective: "To verify Snell's Law using a rectangular glass slab and measure refractive index.", materials: ["Rectangular glass slab", "4 pins", "White paper", "Protractor", "Ruler", "Drawing board"], procedure: ["Place slab on paper and trace its outline.", "Fix pins for incident ray at angle i.", "View from opposite side and fix pins P3, P4 aligned with P1, P2.", "Remove slab and measure angle of refraction r.", "Calculate sin i / sin r for 5 angles."], observations: "sin i / sin r = constant for all angles of incidence.", conclusion: "Snell's Law verified: sin i / sin r = n (refractive index) is constant for a given medium." },
            { number: 2, title: "Total Internal Reflection", objective: "To demonstrate total internal reflection and find the critical angle.", materials: ["Semicircular glass slab", "Laser pointer or ray box", "White paper", "Protractor"], procedure: ["Direct a ray through the curved face towards the flat face.", "Gradually increase the angle of incidence.", "Observe when refracted ray disappears (critical angle).", "Calculate refractive index: n = 1/sin(critical angle)."], observations: "At critical angle the refracted ray grazes the surface. Beyond it, light is totally internally reflected.", conclusion: "Total internal reflection occurs when light travels from denser to rarer medium beyond the critical angle." }
          ]
        },
        {
          number: 7, title: "Lenses",
          topics: ["Convex and concave lenses", "Image formation by lenses", "Lens formula", "Power of lens", "Magnification", "Human eye defects and corrections"],
          experiments: [
            { number: 1, title: "Image Formation by a Convex Lens", objective: "To study nature, position and size of images formed by a convex lens at different object distances.", materials: ["Convex lens", "Lens holder", "Screen", "Candle or bulb", "Optical bench", "Ruler"], procedure: ["Place illuminated object at u > 2f.", "Move screen until sharp image forms. Record u and v.", "Note nature of image (real/virtual, erect/inverted, size).", "Move object to 2f, between f and 2f, at f, inside f.", "Record image nature for each position."], observations: "At >2f: small inverted real image. At 2f: equal size. Between f and 2f: enlarged. At f: image at infinity. Inside f: virtual erect enlarged.", conclusion: "A convex lens forms different types of images depending on object distance relative to focal length." },
            { number: 2, title: "Verification of Lens Formula", objective: "To verify the lens formula 1/v - 1/u = 1/f using a convex lens.", materials: ["Convex lens", "Optical bench", "Object pin", "Image pin", "Ruler"], procedure: ["Place object at u = 30 cm.", "Find image using search pin (no parallax).", "Record u and v. Calculate 1/v - 1/u.", "Repeat for at least 5 object distances.", "Compare calculated 1/f with known value."], observations: "1/v - 1/u remains approximately constant and equals 1/f for all positions.", conclusion: "Lens formula 1/v - 1/u = 1/f is verified for all object positions." }
          ]
        },
        {
          number: 8, title: "Metallurgy",
          topics: ["Occurrence of metals", "Extraction of metals", "Electrolytic refining", "Corrosion", "Alloys", "Properties of metals and non-metals"],
          experiments: [
            { number: 1, title: "Electrolytic Refining of Copper", objective: "To demonstrate electrolytic refining of copper using copper electrodes in CuSO₄ solution.", materials: ["Copper sulphate solution", "Two copper strips", "Battery (6V)", "Connecting wires", "Ammeter", "Beaker"], procedure: ["Fill beaker with copper sulphate solution.", "Connect copper strips to battery as anode (+) and cathode (-).", "Pass current for 20 minutes.", "Weigh both strips before and after.", "Note change in mass of anode vs cathode."], observations: "Anode loses mass (dissolves). Cathode gains mass (pure copper deposits). Solution stays blue.", conclusion: "In electrolytic refining, impure metal at anode dissolves and pure metal deposits at cathode." },
            { number: 2, title: "Investigating Corrosion", objective: "To study conditions necessary for iron to rust and compare different protective methods.", materials: ["Iron nails (6)", "Test tubes", "Salt water", "Silica gel (for dry air)", "Oil", "Paint"], procedure: ["Set up 3 test tubes: nail in distilled water, salt water, dry air.", "Set up 3 more: painted, oiled, bare nail in water.", "Observe after 24 and 48 hours.", "Record amount of rusting in each case."], observations: "Salt water accelerates rusting. Dry air = minimal rust. Oiled/painted nails show least corrosion.", conclusion: "Iron rusts in presence of both oxygen AND water. Salt accelerates corrosion. Protective coatings prevent it." }
          ]
        },
        {
          number: 9, title: "Carbon Compounds",
          topics: ["Covalent bonding in carbon", "Allotropes of carbon", "Hydrocarbons", "Ethanol and Ethanoic acid", "Soap and detergents", "Saponification"],
          experiments: [
            { number: 1, title: "Properties of Ethanol and Ethanoic Acid", objective: "To compare physical and chemical properties of ethanol (C₂H₅OH) and ethanoic acid (CH₃COOH).", materials: ["Test tubes", "Ethanol", "Ethanoic acid", "Litmus paper", "Sodium bicarbonate", "Universal indicator"], procedure: ["Smell both substances carefully.", "Test both with red and blue litmus paper.", "Add sodium bicarbonate to each. Observe for CO₂ bubbles.", "Test pH using universal indicator."], observations: "Ethanol: neutral, no litmus change. Ethanoic acid: acidic, turns blue litmus red, reacts with NaHCO₃ to give CO₂.", conclusion: "Ethanoic acid is a weak acid; ethanol is neutral. Both are organic but have very different properties." },
            { number: 2, title: "Saponification — Making Soap", objective: "To prepare soap by saponification reaction of oil with sodium hydroxide.", materials: ["Vegetable oil (10 mL)", "20% NaOH solution", "Saturated salt solution", "Beaker", "Stirrer", "Bunsen burner"], procedure: ["Heat 10 mL vegetable oil in a beaker.", "Gradually add 20 mL of 20% NaOH while stirring.", "Heat gently for 15-20 minutes, stirring continuously.", "Pour into saturated salt solution to precipitate soap.", "Collect soap, wash and test its lathering ability."], observations: "White solid (soap) forms and precipitates in salt solution. It lathers well with water.", conclusion: "Saponification: Oil + NaOH → Soap (sodium salt of fatty acid) + Glycerol. Principle of soap making." },
            { number: 3, title: "Cleansing Action of Soap", objective: "To demonstrate emulsification of oil by soap and explain cleansing action.", materials: ["Two test tubes", "Water", "Mustard oil", "Soap solution"], procedure: ["Add mustard oil to water without soap. Shake and observe.", "Add mustard oil to water with soap solution. Shake and observe.", "Compare stability of emulsion in each test tube."], observations: "Oil in water separates quickly without soap. With soap, a stable emulsion forms.", conclusion: "Soap has hydrophilic and hydrophobic ends. It emulsifies oils enabling removal of grease from surfaces." }
          ]
        },
        {
          number: 10, title: "Space Missions",
          topics: ["History of space exploration", "Rockets and satellites", "Indian space programme (ISRO)", "Types of satellites", "Applications of satellites", "Future of space exploration"],
          experiments: [
            { number: 1, title: "Balloon Rocket — Newton's Third Law", objective: "To demonstrate rocket propulsion using a balloon and understand Newton's 3rd Law.", materials: ["Long balloon", "String (5 metres)", "Tape", "Straw", "Two chair supports"], procedure: ["Thread string through straw and tie taut between two chairs.", "Inflate balloon, tape to straw, release.", "Measure the distance it travels.", "Repeat with different inflation levels.", "Relate to rocket engine thrust."], observations: "Air escaping backward propels balloon forward. More air = more thrust = greater distance.", conclusion: "Rockets work on Newton's 3rd Law: action (exhaust backward) and reaction (rocket moves forward)." },
            { number: 2, title: "Calculating Satellite Orbital Periods", objective: "To calculate orbital periods of satellites at different heights using Kepler's third law.", materials: ["Calculator", "Data: Earth's mass and radius", "Graph paper"], procedure: ["Use T = 2π√(r³/GM) for different orbital heights.", "Calculate T for LEO (400 km), GPS orbit (20,200 km), Geostationary (35,786 km).", "Plot orbital height vs time period.", "Verify T² ∝ r³ (Kepler's 3rd law)."], observations: "LEO T ≈ 92 min. GPS T ≈ 12 hours. Geostationary T = exactly 24 hours.", conclusion: "Higher orbits have longer periods. Geostationary satellites orbit at 35,786 km to match Earth's rotation." }
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
      emoji: "🧬",
      description: "Covers Biology and Environmental Science including Heredity & Evolution, Life Processes, Environmental Management, Green Energy, Animal Classification, Microbiology, Biotechnology, Social Health and Disaster Management.",
      chapterCount: 10,
      experimentCount: 32,
      chapters: [
        {
          number: 1, title: "Heredity and Evolution",
          topics: ["DNA and RNA", "Transcription, Translation, Translocation", "Mutation", "Evolution", "Evidences: morphological, anatomical, fossil", "Darwin's Natural Selection", "Lamarckism", "Human evolution"],
          experiments: [
            { number: 1, title: "Morphological Evidences of Evolution", objective: "To identify morphological similarities between different organisms as evidence of common ancestry.", materials: ["Pictures of different mammals (cat, dog, horse, bat, whale)", "Sketch book", "Pencil"], procedure: ["Observe external features of different mammals.", "Draw similarities in body structure.", "Compare forelimb bones of human, ox, bat and whale.", "List similarities despite different functions.", "Discuss how similar structure indicates common ancestry."], observations: "All mammals have similar bone arrangement in forelimbs despite using them differently.", conclusion: "Morphological and anatomical similarities indicate organisms share common ancestors — evidence of evolution." },
            { number: 2, title: "Vestigial Organs Study", objective: "To identify vestigial organs in the human body and understand their evolutionary significance.", materials: ["Biology atlas", "Reference books", "Diagram of human body"], procedure: ["Identify vestigial organs in humans: appendix, wisdom teeth, coccyx, ear muscles, body hair.", "Find corresponding functional organs in related animals.", "Create a comparison table.", "Relate vestigial organs to Darwin's theory."], observations: "Humans have over 90 vestigial structures, each functional in evolutionary ancestors.", conclusion: "Vestigial organs are remnants of structures functional in ancestors, providing direct evidence of evolution." },
            { number: 3, title: "Fossil Evidence of Evolution", objective: "To understand how fossils provide chronological evidence of evolutionary change.", materials: ["Fossil pictures/models", "Geological time scale chart", "Reference books on palaeontology"], procedure: ["Study fossil records of horse evolution (Eohippus to Equus).", "Arrange fossils chronologically using geological time scale.", "Note changes in size, toes, teeth structure over time.", "Study human evolution: Australopithecus → Homo habilis → Homo erectus → Homo sapiens."], observations: "Fossils show gradual changes in body structure over millions of years.", conclusion: "The fossil record provides direct evidence of evolution and gradual change of species over geological time." }
          ]
        },
        {
          number: 2, title: "Life Processes in Living Organisms Part 1",
          topics: ["Living organisms and energy", "Aerobic and anaerobic respiration", "Glycolysis", "Krebs cycle", "Electron transfer chain", "Cell division — mitosis and meiosis"],
          experiments: [
            { number: 1, title: "Aerobic vs Anaerobic Respiration in Yeast", objective: "To demonstrate and compare aerobic and anaerobic respiration in yeast.", materials: ["Yeast (5g)", "Glucose solution (10%)", "Two flasks", "Lime water", "Rubber cork", "Delivery tube"], procedure: ["Flask A: Yeast in glucose, open to air (aerobic). Connect to lime water.", "Flask B: Same but sealed (anaerobic).", "Keep at 37°C for 1 hour.", "Compare lime water milkiness and ethanol smell."], observations: "Both produce CO₂. Flask B (anaerobic) smells of ethanol. Flask A produces CO₂ faster.", conclusion: "Aerobic: glucose + O₂ → CO₂ + H₂O + 38 ATP. Anaerobic: glucose → ethanol + CO₂ + 2 ATP only." },
            { number: 2, title: "Observing Stages of Mitosis", objective: "To observe and identify the four stages of mitosis in an onion root tip squash.", materials: ["Onion root tips", "1N HCl", "Aceto-carmine stain", "Microscope slides", "Cover slips", "Bunsen burner", "Compound microscope"], procedure: ["Cut 1 cm root tips. Fix in aceto-alcohol (1:3) for 30 minutes.", "Hydrolyse in 1N HCl at 60°C for 8 minutes.", "Stain with aceto-carmine for 10 minutes.", "Squash on slide. Observe under microscope.", "Identify prophase, metaphase, anaphase, telophase."], observations: "Cells in various stages of division visible. Chromosomes clearly stained red.", conclusion: "Mitosis is continuous. In actively dividing regions, cells are caught at different phases of the cell cycle." }
          ]
        },
        {
          number: 3, title: "Life Processes in Living Organisms Part 2",
          topics: ["Photosynthesis", "Transpiration", "Pollination and fertilization", "Vegetative propagation", "Seed germination", "Auxins and growth hormones"],
          experiments: [
            { number: 1, title: "Demonstrating Photosynthesis", objective: "To demonstrate that chlorophyll is necessary for photosynthesis and starch is the product.", materials: ["Variegated plant", "Iodine solution", "Ethanol", "Water bath", "Beaker", "Test tube"], procedure: ["Keep variegated plant in sunlight 4-5 hours.", "Pluck leaf, draw outline marking green and white areas.", "Boil in ethanol to remove chlorophyll.", "Wash and apply iodine solution.", "Compare coloured regions with leaf drawing."], observations: "Only green areas turn blue-black with iodine. White areas (no chlorophyll) remain unchanged.", conclusion: "Chlorophyll is essential for photosynthesis. Starch is produced only in regions containing chlorophyll in light." },
            { number: 2, title: "Measuring Transpiration Rate", objective: "To measure the rate of water loss through transpiration in a plant.", materials: ["Potted plant", "Polythene bag", "Balance", "Petroleum jelly"], procedure: ["Weigh potted plant. Cover soil with polythene.", "Place in sunlight for 2 hours. Weigh again.", "Calculate water loss.", "Coat leaves with petroleum jelly and repeat.", "Compare water loss between normal and treated leaves."], observations: "Plant loses significant mass due to transpiration. Petroleum jelly reduces mass loss drastically.", conclusion: "Transpiration occurs mainly through stomata in leaves and is affected by light, temperature and humidity." },
            { number: 3, title: "Conditions Required for Seed Germination", objective: "To investigate the conditions necessary for seed germination (water, air, warmth).", materials: ["Mung bean seeds (20)", "4 beakers", "Cotton", "Water", "Oil", "Refrigerator"], procedure: ["Beaker 1: Wet cotton, room temperature (all conditions).", "Beaker 2: Dry cotton, room temperature (no water).", "Beaker 3: Seeds submerged in water covered with oil (no air).", "Beaker 4: Wet cotton in refrigerator (no warmth).", "Check germination after 48 and 72 hours."], observations: "Only Beaker 1 seeds germinate well. Others show no or minimal germination.", conclusion: "Seeds require water, air (oxygen), and appropriate temperature for germination. Absence of any one prevents it." }
          ]
        },
        {
          number: 4, title: "Environmental Management",
          topics: ["Ecosystem and components", "Food chains and webs", "Conservation of nature", "Air, water, soil pollution", "Solid waste management", "Environmental laws"],
          experiments: [
            { number: 1, title: "Water Purification Methods", objective: "To demonstrate stages of water purification: sedimentation, filtration, and chlorination.", materials: ["Muddy water (500 mL)", "Alum", "Sand and gravel filter", "Filter paper", "Chlorine tablets", "Thermometer"], procedure: ["Add alum to muddy water, stir and allow 30 minutes to sediment.", "Pour cleared water through sand-gravel filter.", "Filter again through filter paper.", "Add chlorine tablet to filtered water for 30 minutes.", "Compare clarity at each stage."], observations: "Alum causes sedimentation. Filtration removes suspended particles. Chlorination kills microorganisms.", conclusion: "Clean water requires multiple treatment stages. Each removes a specific type of contamination." },
            { number: 2, title: "Biodegradable vs Non-Biodegradable Waste", objective: "To observe and compare decomposition rates of biodegradable and non-biodegradable materials.", materials: ["Soil in two boxes", "Fruit/vegetable peels", "Paper", "Plastic bag piece", "Glass piece", "Cotton cloth"], procedure: ["Bury equal amounts of each material in labelled soil sections.", "Water both boxes equally for 30 days.", "Check on day 10, 20 and 30 — dig and observe each material.", "Record changes in size, colour, texture and odour.", "Classify each as biodegradable or non-biodegradable."], observations: "Fruit peels, paper and cotton decompose over 30 days. Plastic and glass remain unchanged.", conclusion: "Biodegradable waste decomposes naturally. Non-biodegradable waste persists and pollutes the environment." }
          ]
        },
        {
          number: 5, title: "Towards Green Energy",
          topics: ["Conventional energy sources and effects", "Solar energy", "Wind energy", "Biogas", "Hydropower", "Tidal energy", "Energy conservation"],
          experiments: [
            { number: 1, title: "Solar Cooker Model", objective: "To construct a simple solar cooker and measure its maximum temperature.", materials: ["Cardboard box", "Aluminium foil", "Black paint", "Glass sheet", "Thermometer", "Small food item"], procedure: ["Paint inside of box black. Line lid with aluminium foil.", "Place dark container with food inside.", "Cover opening with glass sheet.", "Tilt foil-lid to reflect sunlight into box.", "Measure temperature every 10 minutes for 1 hour."], observations: "Temperature inside can reach 100-120°C. Food gets cooked/heated.", conclusion: "Solar cookers use greenhouse effect and solar radiation to cook food without fuel — a clean, renewable method." },
            { number: 2, title: "Biogas Generation Model", objective: "To understand biogas generation from organic waste using a model plant.", materials: ["Airtight container (2L)", "Cow dung", "Water", "Rubber tube", "Collection balloon", "Candle"], procedure: ["Mix cow dung with water (1:1). Pour into airtight container.", "Insert rubber tube through lid to collect gas in balloon.", "Keep at room temperature for 5-7 days.", "Test gas in balloon with a burning candle."], observations: "After 5-7 days, balloon inflates with biogas. Gas burns with a blue flame.", conclusion: "Cow dung undergoes anaerobic digestion to produce biogas (mainly methane) — a clean renewable fuel." }
          ]
        },
        {
          number: 6, title: "Animal Classification",
          topics: ["Basis of classification", "Invertebrates: Porifera, Coelenterata, Annelida, Arthropoda, Mollusca, Echinodermata", "Vertebrates: Fish, Amphibia, Reptilia, Aves, Mammalia", "Binomial nomenclature"],
          experiments: [
            { number: 1, title: "Invertebrate Classification", objective: "To observe and classify common invertebrates based on body features using dichotomous keys.", materials: ["Preserved or live specimens (earthworm, grasshopper, snail, starfish, sponge)", "Hand lens", "Classification charts", "Notebook"], procedure: ["Observe each specimen with a hand lens.", "Note key features: symmetry, backbone, exoskeleton.", "Use dichotomous key to classify each organism.", "Draw and label key identifying features.", "Compare arthropods (grasshopper) and annelids (earthworm)."], observations: "Earthworm: annelid, segmented, no exoskeleton. Grasshopper: arthropod, exoskeleton, jointed legs.", conclusion: "Animals are classified based on structural features. Invertebrates lack a backbone but are highly diverse." },
            { number: 2, title: "Vertebrate Comparative Study", objective: "To compare characteristics of five vertebrate classes using models and charts.", materials: ["Charts and models of fish, frog, lizard, pigeon, rabbit", "Comparison table template", "Reference atlas"], procedure: ["Study each vertebrate class using models/charts.", "For each note: habitat, body covering, limbs, reproduction, warm/cold-blooded.", "Fill in comparison table for all 5 classes.", "Identify most and least evolved class.", "Discuss adaptations of each class to their habitat."], observations: "Fish: scales, cold-blooded. Amphibia: moist skin, both habitats. Mammals: hair, warm-blooded, breast feed young.", conclusion: "Vertebrates show progressive evolution from fish (simplest) to mammals (most complex), each with specific adaptations." }
          ]
        },
        {
          number: 7, title: "Introduction to Microbiology",
          topics: ["Discovery of microorganisms", "Types: bacteria, fungi, algae, protozoa, viruses", "Beneficial microbes", "Harmful microbes and diseases", "Fermentation", "Antibiotics"],
          experiments: [
            { number: 1, title: "Yeast Fermentation", objective: "To demonstrate fermentation by yeast and detect alcohol and CO₂ produced.", materials: ["Yeast (5g)", "Sugar (10g)", "Warm water (100 mL)", "Conical flask", "Rubber cork", "Delivery tube", "Lime water"], procedure: ["Dissolve sugar in warm water (37°C). Add yeast.", "Connect delivery tube to lime water. Keep at 37°C for 45 minutes.", "Observe lime water turning milky (CO₂).", "Smell the flask for ethanol."], observations: "Lime water turns milky indicating CO₂. Flask smells of ethanol after fermentation.", conclusion: "Yeast ferments glucose: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. Used in bread-making and brewing." },
            { number: 2, title: "Antibiotic Sensitivity Test", objective: "To demonstrate antibiotic sensitivity testing to find effective antibiotics for bacteria.", materials: ["Nutrient agar plates", "Antibiotic discs (penicillin, streptomycin, ampicillin)", "Bacterial culture", "Sterile swabs", "Forceps", "Incubator at 37°C"], procedure: ["Swab bacterial culture on agar plate.", "Place 3 antibiotic discs equally spaced.", "Incubate at 37°C for 24 hours.", "Measure clear zones (zones of inhibition) around each disc."], observations: "Clear circular zones appear around effective antibiotic discs where bacteria could not grow.", conclusion: "The antibiotic sensitivity test determines which antibiotic works best against a specific bacterium — basis of clinical testing." }
          ]
        },
        {
          number: 8, title: "Cell Biology and Biotechnology",
          topics: ["Cell structure and organelles", "Osmosis and diffusion", "Semi-permeable membrane", "DNA extraction", "PCR and genetic engineering", "Applications of biotechnology"],
          experiments: [
            { number: 1, title: "Osmosis in Plant Cells", objective: "To demonstrate osmosis in plant cells using potato strips in solutions of different concentrations.", materials: ["Potato", "3 beakers", "Salt solution (concentrated)", "Distilled water", "Medium sucrose solution", "Ruler", "Balance"], procedure: ["Cut 9 equal potato strips (5 cm each, same mass).", "Place 3 strips each in distilled water, medium and high salt solution.", "Leave for 2 hours.", "Remove, pat dry and measure length and mass.", "Calculate % change in mass for each condition."], observations: "Strips in distilled water become firm and longer (turgor). Strips in salt become flaccid and shorter (plasmolysis).", conclusion: "Water moves by osmosis from high to low water potential (from dilute to concentrated solution) through the cell membrane." },
            { number: 2, title: "DNA Extraction from Onion", objective: "To extract and visualize DNA from onion cells using a simple laboratory technique.", materials: ["Onion", "Salt (NaCl)", "Liquid detergent", "Chilled ethanol", "Strainer", "Test tube", "Wooden stick"], procedure: ["Chop onion and mix with salt + detergent + warm water.", "Blend and strain through cloth.", "Pour filtered liquid into test tube.", "Slowly pour chilled ethanol down the side.", "Spool out white stringy DNA at the interface."], observations: "White stringy material (DNA precipitate) visible at the interface between onion liquid and ethanol.", conclusion: "DNA is extracted using detergent (disrupts cell membrane) and precipitated by ethanol (DNA insoluble in ethanol)." }
          ]
        },
        {
          number: 9, title: "Social Health",
          topics: ["Dimensions of health: physical, mental, social, spiritual", "Balanced diet and nutritional diseases", "Communicable and non-communicable diseases", "Substance abuse", "Mental health", "Reproductive health"],
          experiments: [
            { number: 1, title: "Nutritional Analysis and BMI Calculation", objective: "To identify nutritional deficiencies and assess body weight using BMI calculations.", materials: ["Health survey questionnaire", "Height and weight measurements", "BMI formula", "Nutritional value charts"], procedure: ["Measure height and weight. Calculate BMI = weight(kg)/height²(m).", "Classify: <18.5 = underweight, 18.5-24.9 = normal, >25 = overweight.", "Record dietary intake for one day. Compare with RDA.", "Identify missing nutrients and deficiency diseases.", "Suggest dietary modifications."], observations: "Most students show deficiencies in iron, calcium or vitamins depending on their diet.", conclusion: "A balanced diet with all nutrients in correct amounts is essential for good health. BMI helps assess healthy body weight." },
            { number: 2, title: "First Aid Practice", objective: "To practise basic first aid procedures: CPR, wound care and management of fractures.", materials: ["CPR practice dummy", "Bandages", "Antiseptic", "Splints", "First aid manual"], procedure: ["Learn DRABC procedure (Danger, Response, Airway, Breathing, Circulation).", "Practise chest compressions at 100-120 per minute.", "Demonstrate cleaning and bandaging a simulated wound.", "Practise immobilising a simulated fracture with splints.", "Role-play emergency phone calls."], observations: "Correct CPR maintains blood circulation. Proper wound care prevents infection. Splinting prevents further injury.", conclusion: "First aid skills can save lives. Everyone should know CPR, wound care and fracture management." }
          ]
        },
        {
          number: 10, title: "Disaster Management",
          topics: ["Natural disasters: earthquake, flood, cyclone, drought, landslide", "Man-made disasters", "Disaster preparedness", "Relief and rescue operations", "Role of government and NGOs", "Disaster risk reduction"],
          experiments: [
            { number: 1, title: "Earthquake-Proof Building Model", objective: "To construct and test model buildings for resistance to simulated earthquake vibrations.", materials: ["Cardboard sheets", "Toothpicks", "Marshmallows or clay", "Jelly base (simulate ground)", "Small weights"], procedure: ["Build two model buildings: plain rectangular and one with diagonal bracing.", "Place each on a gelatin base to simulate soft ground.", "Shake the base 10 times to simulate an earthquake.", "Compare structural stability of both buildings.", "Identify earthquake-resistant design features."], observations: "Building with diagonal bracing remains more stable than the plain rectangular building during shaking.", conclusion: "Diagonal bracing, deep foundations and flexible materials improve earthquake resistance. Building design is crucial." },
            { number: 2, title: "Family Disaster Preparedness Plan", objective: "To create a community disaster preparedness plan for a likely natural disaster in your region.", materials: ["Local map", "Emergency contact list template", "First aid kit checklist", "72-hour emergency kit list"], procedure: ["Identify the most likely natural disaster in your region.", "Create a family emergency communication plan.", "Prepare a 72-hour emergency kit checklist (water, food, medicines, torch, documents).", "Draw an evacuation map of your home with 2 exit routes.", "Present and discuss the plan with your family."], observations: "Most families lack a written emergency plan. Basic preparedness is often overlooked.", conclusion: "Prior planning significantly reduces risk during disasters. Every family should have an emergency preparedness plan." }
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">📚 Textbook Library</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Maharashtra State Board 10th Grade Science — all chapters and experiments, organized and interactive.
          Click any chapter to expand it, then any experiment to see full details.
        </p>
        {/* Quick stats */}
        <div className="flex flex-wrap gap-4 mt-5">
          {[
            { label: "Books", value: "2", color: "bg-primary/10 text-primary" },
            { label: "Chapters", value: "20", color: "bg-secondary/15 text-secondary-dark" },
            { label: "Experiments", value: "70+", color: "bg-accent/10 text-accent" },
            { label: "Topics", value: "100+", color: "bg-muted text-muted-foreground" },
          ].map(s => (
            <div key={s.label} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${s.color}`}>
              <span className="text-xl font-bold">{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Book Panels */}
      <div className="space-y-8">
        {fullBooks.map(book => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BookPanel book={book} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
