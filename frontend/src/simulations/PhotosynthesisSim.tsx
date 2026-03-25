import { useState, useEffect, useRef } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function PhotosynthesisSim() {
  const [lightIntensity, setLightIntensity] = useState(50);
  const [co2Level, setCo2Level] = useState(50);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [oxygenRate, setOxygenRate] = useState(0);
  const [glucose, setGlucose] = useState(0);
  const bubbleIdRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const rate = Math.round((lightIntensity / 100) * (co2Level / 100) * 100);

  useEffect(() => {
    setOxygenRate(rate);
    setGlucose(prev => Math.min(prev + rate / 500, 100));
  }, [rate]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (rate === 0) return;

    const interval = Math.max(200, 2000 - rate * 18);
    intervalRef.current = setInterval(() => {
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        x: 30 + Math.random() * 40,
        y: 70,
        size: 4 + Math.random() * 8,
        opacity: 0.7 + Math.random() * 0.3,
      };
      setBubbles(prev => [...prev.slice(-20), newBubble]);
    }, interval);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [rate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBubbles(prev =>
        prev
          .map(b => ({ ...b, y: b.y - 1.5, opacity: b.opacity - 0.02 }))
          .filter(b => b.opacity > 0 && b.y > 0)
      );
    }, 60);
    return () => clearInterval(timer);
  }, []);

  const getLightColor = () => {
    if (lightIntensity < 30) return "#fef3c7";
    if (lightIntensity < 70) return "#fde68a";
    return "#fbbf24";
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-100 to-green-50 rounded-2xl p-6 flex flex-col gap-4 overflow-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-green-800">Photosynthesis Simulator</h3>
        <p className="text-sm text-green-600">6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Plant Scene */}
        <div className="flex-1 relative bg-white/60 rounded-xl overflow-hidden border-2 border-green-200">
          {/* Sun */}
          <div
            className="absolute top-4 right-4 rounded-full transition-all duration-500 flex items-center justify-center text-2xl"
            style={{
              width: 40 + lightIntensity * 0.4 + "px",
              height: 40 + lightIntensity * 0.4 + "px",
              backgroundColor: getLightColor(),
              boxShadow: `0 0 ${lightIntensity}px ${getLightColor()}`,
            }}
          >
            ☀️
          </div>

          {/* Light rays */}
          {lightIntensity > 20 && (
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
              {Array.from({ length: Math.floor(lightIntensity / 15) }).map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-yellow-300"
                  style={{
                    width: "1px",
                    height: "60%",
                    top: "5%",
                    right: `${15 + i * 12}%`,
                    transform: `rotate(${15 + i * 5}deg)`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          )}

          {/* CO2 molecules coming in */}
          {co2Level > 20 && Array.from({ length: Math.floor(co2Level / 25) }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs font-bold text-gray-500 animate-pulse"
              style={{
                left: `${5 + i * 15}%`,
                top: `${20 + i * 10}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              CO₂
            </div>
          ))}

          {/* Plant */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <div
              className="transition-all duration-1000"
              style={{
                fontSize: `${60 + rate * 0.3}px`,
                filter: `saturate(${0.3 + rate / 100})`,
              }}
            >
              🌿
            </div>
          </div>

          {/* Oxygen bubbles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {bubbles.map(bubble => (
              <circle
                key={bubble.id}
                cx={`${bubble.x}%`}
                cy={`${bubble.y}%`}
                r={bubble.size}
                fill="rgba(147, 197, 253, 0.7)"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="1"
                opacity={bubble.opacity}
              />
            ))}
          </svg>

          {/* O2 labels on bubbles */}
          {bubbles.filter((_, i) => i % 4 === 0).map(bubble => (
            <div
              key={`label-${bubble.id}`}
              className="absolute text-blue-600 font-bold pointer-events-none"
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                fontSize: "9px",
                transform: "translate(-50%, -50%)",
                opacity: bubble.opacity,
              }}
            >
              O₂
            </div>
          ))}

          {/* Rate indicator */}
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Rate: {rate}%
          </div>
        </div>

        {/* Controls */}
        <div className="w-52 flex flex-col gap-4">
          {/* Light slider */}
          <div className="bg-white rounded-xl p-4 border-2 border-yellow-200">
            <label className="text-sm font-bold text-yellow-700 flex items-center gap-2 mb-3">
              ☀️ Light Intensity
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={lightIntensity}
              onChange={e => setLightIntensity(Number(e.target.value))}
              className="w-full accent-yellow-400"
            />
            <div className="text-center text-yellow-600 font-bold mt-1">{lightIntensity}%</div>
          </div>

          {/* CO2 slider */}
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
            <label className="text-sm font-bold text-gray-600 flex items-center gap-2 mb-3">
              💨 CO₂ Level
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={co2Level}
              onChange={e => setCo2Level(Number(e.target.value))}
              className="w-full accent-gray-400"
            />
            <div className="text-center text-gray-600 font-bold mt-1">{co2Level}%</div>
          </div>

          {/* Readings */}
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 space-y-3">
            <h4 className="font-bold text-green-700 text-sm">📊 Readings</h4>
            <div>
              <div className="flex justify-between text-xs text-green-600 mb-1">
                <span>O₂ Output</span>
                <span>{oxygenRate}%</span>
              </div>
              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${oxygenRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-green-600 mb-1">
                <span>Glucose</span>
                <span>{Math.round(glucose)}%</span>
              </div>
              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${glucose}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick presets */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-500">Quick Presets</p>
            <button
              onClick={() => { setLightIntensity(80); setCo2Level(80); }}
              className="w-full text-xs bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 rounded-lg transition-colors"
            >
              🌞 Full Sun
            </button>
            <button
              onClick={() => { setLightIntensity(20); setCo2Level(50); }}
              className="w-full text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-2 rounded-lg transition-colors"
            >
              🌥️ Cloudy Day
            </button>
            <button
              onClick={() => { setLightIntensity(0); setCo2Level(50); }}
              className="w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 rounded-lg transition-colors"
            >
              🌙 Night (Off)
            </button>
          </div>
        </div>
      </div>

      {rate === 0 && (
        <div className="text-center text-sm text-gray-500 bg-white/60 rounded-xl p-3">
          💡 Adjust light and CO₂ levels above to start photosynthesis!
        </div>
      )}
    </div>
  );
}
