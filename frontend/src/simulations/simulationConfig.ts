export interface SimulationConfig {
  type: "iframe" | "custom";
  iframeUrl?: string;
  title: string;
  source: string;
}

export const simulationConfigs: Record<string, SimulationConfig> = {
  "projectile-motion": {
    type: "iframe",
    iframeUrl: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html",
    title: "Projectile Motion - PhET Interactive",
    source: "PhET Colorado",
  },
  "ohms-law": {
    type: "iframe",
    iframeUrl: "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html",
    title: "Ohm's Law - PhET Interactive",
    source: "PhET Colorado",
  },
  "newtons-laws": {
    type: "iframe",
    iframeUrl: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html",
    title: "Forces & Motion - PhET Interactive",
    source: "PhET Colorado",
  },
  "acid-base-titration": {
    type: "iframe",
    iframeUrl: "https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_en.html",
    title: "Acid-Base Solutions - PhET Interactive",
    source: "PhET Colorado",
  },
  "chemical-bonding": {
    type: "iframe",
    iframeUrl: "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_en.html",
    title: "Molecule Shapes - PhET Interactive",
    source: "PhET Colorado",
  },
  "photosynthesis": {
    type: "custom",
    title: "Photosynthesis Simulator",
    source: "WonderKids Custom Lab",
  },
  "dna-replication": {
    type: "custom",
    title: "DNA Replication Visualizer",
    source: "WonderKids Custom Lab",
  },
  "human-heart": {
    type: "custom",
    title: "Human Heart Explorer",
    source: "WonderKids Custom Lab",
  },
};
