import { useState } from "react";
import { Link } from "wouter";
import { useGetLabs } from "@/lib/api-client";
import { PlayfulCard, Badge } from "@/components/PlayfulUI";
import { Search, Clock, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { simulationConfigs } from "@/simulations/simulationConfig";

export default function Labs() {
  const [subject, setSubject] = useState<string>("");
  const [search, setSearch] = useState("");

  const { data: labs, isLoading, error } = useGetLabs(
    subject ? { subject } : undefined
  );

  // Debug logging
  console.log('[Labs] API Response:', { labs, isLoading, error });

  const subjects = ["All", "Physics", "Chemistry", "Biology", "Math"];

  // Defensive check: ensure labs is an array
  const labsArray = Array.isArray(labs) ? labs : [];
  
  const filteredLabs = labsArray.filter(lab => 
    lab.title.toLowerCase().includes(search.toLowerCase()) ||
    lab.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Virtual Labs 🧪</h1>
          <p className="text-muted-foreground text-lg">Pick an experiment and start discovering.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search labs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto no-scrollbar gap-3 mb-10 pb-2">
        {subjects.map(sub => (
          <button
            key={sub}
            onClick={() => setSubject(sub === "All" ? "" : sub)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold transition-all ${
              (subject === sub || (sub === "All" && !subject))
                ? "bg-primary text-white shadow-md"
                : "bg-white text-muted-foreground border-2 border-border hover:border-primary/50"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="animate-pulse bg-white rounded-3xl h-80 border-2 border-border/50"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-border border-dashed">
          <p className="text-xl font-bold text-destructive">Oops! Could not load labs.</p>
          <p className="text-muted-foreground mt-2">Our servers might be taking a nap.</p>
          <details className="mt-4 text-left max-w-2xl mx-auto">
            <summary className="cursor-pointer text-sm font-semibold text-gray-600 mb-2">
              🔍 Debug Info (click to expand)
            </summary>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
            <div className="mt-4 text-sm space-y-2 text-gray-700">
              <p><strong>Troubleshooting Steps:</strong></p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>Is the backend running? Check: <code className="bg-gray-200 px-2 py-1 rounded">http://localhost:3000/api/healthz</code></li>
                <li>Check browser console (F12) for network errors</li>
                <li>Verify VITE_API_URL in frontend/.env</li>
                <li>Make sure both frontend and backend are started</li>
              </ol>
            </div>
          </details>
        </div>
      ) : filteredLabs?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-border border-dashed">
          <div className="text-6xl mb-4">🕵️‍♂️</div>
          <p className="text-2xl font-bold text-foreground">No labs found!</p>
          <p className="text-muted-foreground mt-2">Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLabs?.map((lab, i) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/labs/${lab.id}`}>
                <PlayfulCard hover className="h-full flex flex-col cursor-pointer border-b-4 border-r-4 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                      {lab.thumbnailEmoji}
                    </div>
                    <Badge color={
                      lab.difficulty === "beginner" ? "secondary" :
                      lab.difficulty === "intermediate" ? "primary" : "accent"
                    }>
                      {lab.difficulty}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold font-display mb-2">{lab.title}</h3>
                  <p className="text-muted-foreground flex-grow text-sm mb-6 line-clamp-2">
                    {lab.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {lab.duration} min
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      {lab.subject}
                    </div>
                    {simulationConfigs[lab.id] && (
                      <div className="ml-auto text-emerald-500 text-xs font-bold">
                        ▶ Interactive
                      </div>
                    )}
                  </div>
                </PlayfulCard>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
