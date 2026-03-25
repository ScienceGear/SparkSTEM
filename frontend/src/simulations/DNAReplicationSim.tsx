import { useState, useEffect } from "react";

const BASE_PAIRS: Array<[string, string, string]> = [
  ["A", "T", "#ef4444"],
  ["T", "A", "#f97316"],
  ["G", "C", "#10b981"],
  ["C", "G", "#3b82f6"],
  ["A", "T", "#ef4444"],
  ["G", "C", "#10b981"],
  ["T", "A", "#f97316"],
  ["C", "G", "#3b82f6"],
  ["A", "T", "#ef4444"],
  ["T", "A", "#f97316"],
];

const COMPLEMENT: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
const BASE_NAMES: Record<string, string> = {
  A: "Adenine", T: "Thymine", G: "Guanine", C: "Cytosine",
};

const STEPS = [
  { label: "Original DNA", desc: "The double helix DNA molecule before replication begins." },
  { label: "Helicase Unwinds", desc: "🔬 Helicase enzyme breaks hydrogen bonds, unwinding the double helix into two strands." },
  { label: "Strands Separate", desc: "The two parent strands are now separated, each serving as a template." },
  { label: "Primers Added", desc: "🧬 Primase adds RNA primers (shown in gold) to start the new strand synthesis." },
  { label: "DNA Polymerase", desc: "⚗️ DNA Polymerase reads each template and adds complementary nucleotides (A↔T, G↔C)." },
  { label: "New Strands Form", desc: "Two identical DNA molecules are now complete — semi-conservative replication!" },
];

export default function DNAReplicationSim() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const [selectedBase, setSelectedBase] = useState<string | null>(null);

  useEffect(() => {
    if (!auto) return;
    if (step >= STEPS.length - 1) { setAuto(false); return; }
    const t = setTimeout(() => setStep(s => s + 1), 1800);
    return () => clearTimeout(t);
  }, [auto, step]);

  const getStrand1Opacity = () => step >= 2 ? 1 : step === 1 ? 0.8 : 1;
  const getStrand2Opacity = () => step >= 2 ? 1 : step === 1 ? 0.8 : 1;
  const showSplit = step >= 2;
  const showNew = step >= 4;
  const showComplete = step >= 5;

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-purple-950 rounded-2xl p-5 flex flex-col gap-4 text-white overflow-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-purple-200">DNA Replication Visualizer</h3>
        <p className="text-xs text-purple-400">Semi-Conservative Model</p>
      </div>

      {/* Step Indicator */}
      <div className="flex gap-1 justify-center">
        {STEPS.map((s, i) => (
          <button
            key={i}
            onClick={() => { setStep(i); setAuto(false); }}
            className={`h-2 rounded-full transition-all ${
              i === step ? "w-8 bg-purple-400" : i < step ? "w-4 bg-purple-600" : "w-4 bg-purple-900"
            }`}
          />
        ))}
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* DNA Visualization */}
        <div className="flex-1 relative bg-indigo-900/50 rounded-xl border border-purple-700/50 overflow-hidden flex items-center justify-center">
          <div className="relative flex flex-col items-center gap-0">
            {/* Helicase enzyme indicator */}
            {step >= 1 && step < 5 && (
              <div className="absolute -top-2 text-center z-10">
                <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                  🔬 Helicase
                </div>
              </div>
            )}

            {BASE_PAIRS.map((pair, i) => {
              const [base1, base2, color] = pair;
              const newBase1 = COMPLEMENT[base2];
              const newBase2 = COMPLEMENT[base1];
              const splitAmount = showSplit ? Math.min((i + 1) * 5, 40) : 0;
              const isPrimered = i < 3 && step >= 3;

              return (
                <div key={i} className="flex items-center gap-1 my-0.5" style={{ transform: `scaleX(${1 - step * 0.01})` }}>
                  {/* New strand 2 (left side new) */}
                  {showNew && (
                    <div
                      className="flex items-center gap-1"
                      style={{ opacity: showComplete ? 1 : 0.7, transform: `translateX(-${splitAmount * 0.3}px)` }}
                    >
                      <div
                        className="w-8 h-6 rounded flex items-center justify-center text-xs font-bold cursor-pointer border-2 border-white/20"
                        style={{
                          backgroundColor: color,
                          opacity: 0.7,
                          transform: `translateX(-${splitAmount}px)`,
                        }}
                        onClick={() => setSelectedBase(newBase2)}
                      >
                        {newBase2}
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-50" />
                    </div>
                  )}

                  {/* Original strand 1 */}
                  <div
                    className="flex items-center gap-1"
                    style={{ transform: showSplit ? `translateX(-${splitAmount}px)` : "none", opacity: getStrand1Opacity() }}
                  >
                    <div
                      className="w-8 h-6 rounded flex items-center justify-center text-xs font-bold cursor-pointer border-2 border-white/30 hover:border-white transition-colors"
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedBase(base1)}
                    >
                      {base1}
                    </div>
                  </div>

                  {/* Bond connector */}
                  <div
                    className="h-0.5 transition-all duration-500"
                    style={{
                      width: showSplit ? `${Math.max(4, 20 - splitAmount)}px` : "20px",
                      backgroundColor: isPrimered ? "#fbbf24" : "#a855f7",
                      opacity: showSplit ? Math.max(0.1, 1 - splitAmount / 40) : 1,
                    }}
                  />

                  {/* Original strand 2 */}
                  <div
                    className="flex items-center gap-1"
                    style={{ transform: showSplit ? `translateX(${splitAmount}px)` : "none", opacity: getStrand2Opacity() }}
                  >
                    <div
                      className="w-8 h-6 rounded flex items-center justify-center text-xs font-bold cursor-pointer border-2 border-white/30 hover:border-white transition-colors"
                      style={{ backgroundColor: color, opacity: 0.8 }}
                      onClick={() => setSelectedBase(base2)}
                    >
                      {base2}
                    </div>
                  </div>

                  {/* New strand 1 (right side new) */}
                  {showNew && (
                    <div style={{ transform: `translateX(${splitAmount * 0.3}px)` }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-50 mr-1" />
                      <div
                        className="w-8 h-6 rounded flex items-center justify-center text-xs font-bold cursor-pointer border-2 border-emerald-400/50"
                        style={{
                          backgroundColor: color,
                          opacity: showComplete ? 1 : 0.7,
                          transform: `translateX(${splitAmount}px)`,
                        }}
                        onClick={() => setSelectedBase(newBase1)}
                      >
                        {newBase1}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex flex-col gap-1">
            {[["#ef4444", "A·T pair"], ["#10b981", "G·C pair"]].map(([c, l]) => (
              <div key={l} className="flex items-center gap-1.5 text-xs text-white/60">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: c }} />
                {l}
              </div>
            ))}
            {showNew && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                <div className="w-3 h-3 rounded border-2 border-emerald-400 bg-transparent" />
                New strand
              </div>
            )}
          </div>

          {showComplete && (
            <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              ✓ Complete!
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="w-48 flex flex-col gap-3">
          {/* Current Step Info */}
          <div className="bg-purple-900/60 rounded-xl p-4 border border-purple-700/50">
            <div className="text-xs font-bold text-purple-400 mb-1">Step {step + 1}/{STEPS.length}</div>
            <div className="text-sm font-bold text-white mb-2">{STEPS[step].label}</div>
            <p className="text-xs text-purple-200 leading-relaxed">{STEPS[step].desc}</p>
          </div>

          {/* Selected base info */}
          {selectedBase && (
            <div className="bg-indigo-900/60 rounded-xl p-4 border border-indigo-700/50">
              <div className="text-xs font-bold text-indigo-400 mb-1">Base Info</div>
              <div className="text-lg font-bold text-white">{selectedBase}</div>
              <div className="text-sm text-indigo-200">{BASE_NAMES[selectedBase]}</div>
              <div className="text-xs text-indigo-300 mt-1">Pairs with: {COMPLEMENT[selectedBase]}</div>
              <button onClick={() => setSelectedBase(null)} className="text-xs text-indigo-400 mt-2 underline">close</button>
            </div>
          )}

          {/* Key Facts */}
          <div className="bg-purple-900/40 rounded-xl p-3 border border-purple-700/30">
            <p className="text-xs font-bold text-purple-300 mb-2">🧬 Key Rules</p>
            <div className="space-y-1 text-xs text-purple-200">
              <div className="flex items-center gap-1"><span className="text-red-400">A</span> always pairs with <span className="text-orange-400">T</span></div>
              <div className="flex items-center gap-1"><span className="text-green-400">G</span> always pairs with <span className="text-blue-400">C</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { setStep(0); setAuto(false); }}
          className="px-3 py-2 bg-purple-800 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-colors"
        >
          ↩ Reset
        </button>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-2 bg-purple-800 hover:bg-purple-700 disabled:opacity-30 text-white text-sm font-bold rounded-xl transition-colors"
        >
          ← Prev
        </button>
        <button
          onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
          disabled={step === STEPS.length - 1}
          className="px-3 py-2 bg-purple-800 hover:bg-purple-700 disabled:opacity-30 text-white text-sm font-bold rounded-xl transition-colors"
        >
          Next →
        </button>
        <button
          onClick={() => { setStep(0); setAuto(true); }}
          disabled={auto}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
        >
          {auto ? "▶ Playing..." : "▶ Auto Play"}
        </button>
        <span className="text-xs text-purple-400 ml-auto">💡 Click any base to learn more</span>
      </div>
    </div>
  );
}
