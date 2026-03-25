import { useGetProgress } from "@/lib/api-client";
import { PlayfulCard } from "@/components/PlayfulUI";
import { Trophy, Flame, Star, Activity, Hexagon } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: progress, isLoading } = useGetProgress();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-32 bg-white rounded-3xl border-2 border-border" />
          <div className="grid grid-cols-3 gap-6">
             <div className="h-40 bg-white rounded-3xl border-2 border-border" />
             <div className="h-40 bg-white rounded-3xl border-2 border-border" />
             <div className="h-40 bg-white rounded-3xl border-2 border-border" />
          </div>
        </div>
      </div>
    );
  }

  // Fallback data if backend is empty
  const data = progress || {
    totalLabs: 10,
    completedLabs: 4,
    streakDays: 3,
    totalPoints: 450,
    badges: [
      { id: "1", name: "First Steps", emoji: "🌱", earnedAt: "2 days ago" },
      { id: "2", name: "Mad Scientist", emoji: "🧪", earnedAt: "Yesterday" }
    ],
    recentActivity: [
      { id: "a1", type: "lab", description: "Completed Gravity Lab", timestamp: "2 hours ago", points: 50 },
      { id: "a2", type: "ai", description: "Asked RoboTutor about Atoms", timestamp: "Yesterday", points: 10 }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Banner */}
      <div className="bg-primary rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden text-white shadow-xl shadow-primary/20">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-inner border-4 border-white/20">
            🧑‍🔬
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">Welcome back, Scientist!</h1>
            <p className="text-white/80 text-lg font-medium">You're making great progress. Keep it up!</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <PlayfulCard className="bg-blue-50 border-blue-200 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-3xl font-display font-bold text-blue-900 mb-1">{data.completedLabs}/{data.totalLabs}</div>
              <div className="text-sm font-bold text-blue-600/80 uppercase tracking-wider">Labs Done</div>
            </PlayfulCard>

            <PlayfulCard className="bg-orange-50 border-orange-200 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center mb-3">
                <Flame className="w-6 h-6" />
              </div>
              <div className="text-3xl font-display font-bold text-orange-900 mb-1">{data.streakDays} Days</div>
              <div className="text-sm font-bold text-orange-600/80 uppercase tracking-wider">Current Streak</div>
            </PlayfulCard>

            <PlayfulCard className="bg-green-50 border-green-200 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-green-100 text-green-500 rounded-xl flex items-center justify-center mb-3">
                <Star className="w-6 h-6" />
              </div>
              <div className="text-3xl font-display font-bold text-green-900 mb-1">{data.totalPoints}</div>
              <div className="text-sm font-bold text-green-600/80 uppercase tracking-wider">Total Points</div>
            </PlayfulCard>
          </div>

          {/* Activity Feed */}
          <PlayfulCard>
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" /> Recent Activity
            </h2>
            <div className="space-y-6">
              {data.recentActivity.map((activity, i) => (
                <div key={activity.id} className="flex gap-4 items-start">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${
                    activity.type === 'lab' ? 'bg-primary text-white' : 'bg-secondary text-white'
                  }`}>
                    {activity.type === 'lab' ? <Hexagon className="w-5 h-5 fill-current" /> : <Star className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 bg-muted/30 p-4 rounded-2xl border border-border/50">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-foreground">{activity.description}</p>
                      <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">+{activity.points} XP</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </PlayfulCard>
        </div>

        {/* Right Column: Badges */}
        <div>
          <PlayfulCard className="h-full bg-gradient-to-b from-white to-accent/5">
            <h2 className="text-2xl font-display font-bold mb-6 text-center">Your Badges</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.badges.map((badge, i) => (
                <motion.div 
                  key={badge.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border-2 border-border p-4 rounded-2xl text-center flex flex-col items-center hover:border-accent hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="text-4xl mb-2 drop-shadow-md">{badge.emoji}</div>
                  <p className="font-bold text-sm leading-tight mb-1">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.earnedAt}</p>
                </motion.div>
              ))}
              
              {/* Empty placeholder slots */}
              {Array.from({ length: Math.max(0, 4 - data.badges.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="border-2 border-dashed border-border p-4 rounded-2xl text-center flex flex-col items-center justify-center opacity-50">
                  <div className="w-10 h-10 rounded-full bg-muted mb-2" />
                  <p className="text-xs font-bold text-muted-foreground">Locked</p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 font-bold text-primary hover:text-primary-dark transition-colors">
              View all possible badges &rarr;
            </button>
          </PlayfulCard>
        </div>
      </div>
    </div>
  );
}
