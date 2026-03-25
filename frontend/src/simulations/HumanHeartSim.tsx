import { useState, useEffect } from "react";

const CHAMBERS = {
  ra: { label: "Right Atrium", color: "#60a5fa", x: "58%", y: "25%", desc: "Receives deoxygenated blood from the body via the vena cava. The blood appears blue/dark because it has given up its oxygen to body tissues." },
  la: { label: "Left Atrium", color: "#f87171", x: "30%", y: "25%", desc: "Receives oxygenated blood from the lungs via the pulmonary veins. The bright red color indicates oxygen-rich blood ready to be pumped to the body." },
  rv: { label: "Right Ventricle", color: "#93c5fd", x: "58%", y: "58%", desc: "Pumps deoxygenated blood to the lungs through the pulmonary artery. This is pulmonary circulation — a short loop to the lungs for oxygenation." },
  lv: { label: "Left Ventricle", color: "#fca5a5", x: "30%", y: "58%", desc: "The heart's most powerful chamber! Pumps oxygenated blood to the entire body through the aorta. Its thick walls generate the pressure needed for systemic circulation." },
};

const VESSELS = [
  { label: "Aorta", color: "#ef4444", position: "top-[10%] left-[18%]", desc: "The largest artery — carries oxygenated blood from the left ventricle to the rest of the body." },
  { label: "Pulmonary Artery", color: "#6366f1", position: "top-[10%] left-[58%]", desc: "Carries deoxygenated blood from the right ventricle to the lungs for oxygenation." },
  { label: "Vena Cava", color: "#818cf8", position: "bottom-[8%] left-[58%]", desc: "Returns deoxygenated blood from the body to the right atrium." },
  { label: "Pulmonary Veins", color: "#f87171", position: "bottom-[8%] left-[18%]", desc: "Returns oxygenated blood from the lungs to the left atrium." },
];

const VALVES = [
  { label: "Tricuspid Valve", position: "top-[46%] left-[58%]", desc: "Between right atrium and right ventricle. Prevents backflow." },
  { label: "Mitral Valve", position: "top-[46%] left-[30%]", desc: "Between left atrium and left ventricle. Also called bicuspid valve." },
  { label: "Pulmonary Valve", position: "top-[18%] left-[64%]", desc: "Between right ventricle and pulmonary artery." },
  { label: "Aortic Valve", position: "top-[18%] left-[24%]", desc: "Between left ventricle and aorta." },
];

export default function HumanHeartSim() {
  const [selected, setSelected] = useState<string | null>(null);
  const [heartPhase, setHeartPhase] = useState(0); // 0 = diastole, 1 = systole
  const [bpm, setBpm] = useState(72);
  const [isBeating, setIsBeating] = useState(true);
  const [activeFlow, setActiveFlow] = useState<"systemic" | "pulmonary" | null>(null);

  useEffect(() => {
    if (!isBeating) return;
    const interval = setInterval(() => {
      setHeartPhase(p => (p + 1) % 2);
    }, (60000 / bpm) / 2);
    return () => clearInterval(interval);
  }, [bpm, isBeating]);

  const selectedInfo = selected
    ? CHAMBERS[selected as keyof typeof CHAMBERS] ||
      VESSELS.find(v => v.label === selected) ||
      VALVES.find(v => v.label === selected)
    : null;

  const beatScale = isBeating ? (heartPhase === 1 ? "scale-105" : "scale-100") : "scale-100";

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-950 to-pink-900 rounded-2xl p-5 flex flex-col gap-4 text-white overflow-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-red-200">Human Heart Explorer</h3>
        <p className="text-xs text-red-400">Click any chamber, valve, or vessel to learn more</p>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Heart Diagram */}
        <div className="flex-1 relative bg-red-950/50 rounded-xl border border-red-800/50 overflow-hidden">
          {/* Heart SVG */}
          <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-200 ${beatScale}`}>
            <div className="relative w-[280px] h-[280px]">
              {/* Heart background shape */}
              <svg viewBox="0 0 280 280" className="absolute inset-0 w-full h-full opacity-20">
                <path
                  d="M140 240 C80 200, 20 160, 20 100 C20 60, 50 40, 80 40 C100 40, 120 50, 140 70 C160 50, 180 40, 200 40 C230 40, 260 60, 260 100 C260 160, 200 200, 140 240Z"
                  fill="#ef4444"
                />
              </svg>

              {/* Chambers */}
              {Object.entries(CHAMBERS).map(([key, chamber]) => (
                <button
                  key={key}
                  onClick={() => setSelected(selected === key ? null : key)}
                  className={`absolute w-24 h-20 rounded-2xl border-2 transition-all font-bold text-sm flex flex-col items-center justify-center shadow-lg hover:scale-105 ${
                    selected === key ? "border-white scale-105 shadow-white/20" : "border-white/20"
                  }`}
                  style={{
                    backgroundColor: chamber.color + "cc",
                    left: chamber.x,
                    top: chamber.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="text-xs leading-tight text-white drop-shadow text-center px-1">{chamber.label.replace(" ", "\n")}</span>
                  {key === "lv" && <span className="text-xs text-white/70">💪</span>}
                </button>
              ))}

              {/* Valves */}
              {VALVES.map(valve => (
                <button
                  key={valve.label}
                  onClick={() => setSelected(selected === valve.label ? null : valve.label)}
                  className={`absolute flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${
                    selected === valve.label ? "border-white bg-white/40 scale-110" : "border-yellow-400/70 bg-yellow-400/20"
                  } ${valve.position}`}
                  title={valve.label}
                >
                  <span className="text-yellow-300 text-xs">▼</span>
                </button>
              ))}

              {/* Vessel labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-12">
                <button
                  onClick={() => setSelected("Aorta")}
                  className="text-xs text-red-300 font-bold bg-red-900/60 px-2 py-0.5 rounded hover:bg-red-800/60"
                >
                  Aorta
                </button>
                <button
                  onClick={() => setSelected("Pulmonary Artery")}
                  className="text-xs text-indigo-300 font-bold bg-indigo-900/60 px-2 py-0.5 rounded hover:bg-indigo-800/60"
                >
                  Pul. Artery
                </button>
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-8">
                <button
                  onClick={() => setSelected("Pulmonary Veins")}
                  className="text-xs text-red-300 font-bold bg-red-900/60 px-2 py-0.5 rounded hover:bg-red-800/60"
                >
                  Pul. Veins
                </button>
                <button
                  onClick={() => setSelected("Vena Cava")}
                  className="text-xs text-indigo-300 font-bold bg-indigo-900/60 px-2 py-0.5 rounded hover:bg-indigo-800/60"
                >
                  Vena Cava
                </button>
              </div>

              {/* Septum divider */}
              <div className="absolute left-1/2 top-[20%] bottom-[15%] w-0.5 bg-red-400/30 -translate-x-1/2" />

              {/* Heartbeat indicator */}
              {isBeating && (
                <div className={`absolute top-1 right-1 w-3 h-3 rounded-full transition-colors ${
                  heartPhase === 1 ? "bg-red-400" : "bg-red-800"
                }`} />
              )}
            </div>
          </div>

          {/* Blood flow arrows */}
          {activeFlow === "systemic" && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="text-red-300 text-xs animate-bounce">→ Oxygenated blood flows to body →</div>
            </div>
          )}

          {/* BPM Display */}
          <div className="absolute bottom-3 left-3 bg-red-900/80 rounded-xl px-3 py-2 text-center">
            <div className="text-2xl font-bold text-red-200">{isBeating ? bpm : 0}</div>
            <div className="text-xs text-red-400">BPM</div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-52 flex flex-col gap-3">
          {/* Info box */}
          <div className="bg-red-900/60 rounded-xl p-4 border border-red-700/50 flex-1">
            {selectedInfo ? (
              <>
                <div className="text-xs font-bold text-red-400 mb-1">Selected</div>
                <div className="text-sm font-bold text-white mb-2">
                  {"label" in selectedInfo ? selectedInfo.label : selected}
                </div>
                {"color" in selectedInfo && (
                  <div
                    className="w-full h-2 rounded-full mb-2"
                    style={{ backgroundColor: (selectedInfo as typeof CHAMBERS["ra"]).color }}
                  />
                )}
                <p className="text-xs text-red-200 leading-relaxed">
                  {"desc" in selectedInfo ? selectedInfo.desc : ""}
                </p>
              </>
            ) : (
              <div className="text-xs text-red-300 leading-relaxed">
                <p className="font-bold text-red-200 mb-2">❤️ How to use:</p>
                <p>Click on any chamber (colored boxes), valve (▼), or vessel label to learn about it.</p>
                <p className="mt-2">Use the controls below to change heart rate.</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-red-900/40 rounded-xl p-3 border border-red-800/40">
            <p className="text-xs font-bold text-red-300 mb-2">❤️ Heart Rate Control</p>
            <input
              type="range"
              min="40"
              max="180"
              value={bpm}
              onChange={e => setBpm(Number(e.target.value))}
              className="w-full accent-red-400"
            />
            <div className="flex justify-between text-xs text-red-400 mt-1">
              <span>40 (Rest)</span>
              <span>180 (Max)</span>
            </div>
            <button
              onClick={() => setIsBeating(b => !b)}
              className={`w-full mt-2 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                isBeating ? "bg-red-700 hover:bg-red-600" : "bg-green-700 hover:bg-green-600"
              }`}
            >
              {isBeating ? "⏸ Pause" : "▶ Resume"}
            </button>
          </div>

          {/* Quick presets */}
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-red-400">Presets</p>
            {[
              { label: "😴 Sleeping", bpm: 50 },
              { label: "😌 Resting", bpm: 72 },
              { label: "🏃 Exercise", bpm: 140 },
              { label: "⚡ Peak Sport", bpm: 170 },
            ].map(p => (
              <button
                key={p.label}
                onClick={() => { setBpm(p.bpm); setIsBeating(true); }}
                className={`w-full text-xs py-1.5 rounded-lg font-bold transition-colors ${
                  bpm === p.bpm ? "bg-red-600 text-white" : "bg-red-900/60 hover:bg-red-800/60 text-red-200"
                }`}
              >
                {p.label} ({p.bpm})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Circulation flow guide */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-blue-900/40 rounded-xl p-3 border border-blue-800/40">
          <p className="font-bold text-blue-300 mb-1">🫁 Pulmonary (Right side)</p>
          <p className="text-blue-200">Body → Vena Cava → Right Atrium → Right Ventricle → Pulmonary Artery → Lungs → O₂!</p>
        </div>
        <div className="bg-red-900/40 rounded-xl p-3 border border-red-800/40">
          <p className="font-bold text-red-300 mb-1">🫀 Systemic (Left side)</p>
          <p className="text-red-200">Lungs → Pulmonary Veins → Left Atrium → Left Ventricle → Aorta → Body!</p>
        </div>
      </div>
    </div>
  );
}
