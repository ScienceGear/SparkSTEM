import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Sparkles, Gamepad2, Brain, FlaskConical } from "lucide-react";
import { PlayfulButton, PlayfulCard } from "@/components/PlayfulUI";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
        <img 
          src={`${import.meta.env.BASE_URL}images/decorative-blob.png`} 
          alt="" 
          className="absolute top-20 right-20 w-48 opacity-50 animate-bounce -z-10" 
          style={{ animationDuration: '6s' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-6 text-sm font-bold text-primary">
                <Sparkles className="w-4 h-4 text-secondary" />
                Rated #1 STEM Platform for Kids
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6">
                The best place to learn <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Science</span> for kids
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 font-medium">
                Explore virtual labs, chat with our AI tutor, and discover the magic of STEM through play and experimentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/labs">
                  <PlayfulButton size="lg" className="w-full sm:w-auto gap-2">
                    Start Learning <ArrowRight className="w-5 h-5" />
                  </PlayfulButton>
                </Link>
                <Link href="/ai-tutor">
                  <PlayfulButton variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                    Meet AI Tutor
                  </PlayfulButton>
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-muted flex items-center justify-center font-bold text-sm overflow-hidden">
                      {/* Unsplash stock image for avatar placeholders with comment */}
                      {/* student avatar smiling child face */}
                      <img src={`https://images.unsplash.com/photo-1503454537195-1dc534baa3fc?w=100&h=100&fit=crop&crop=faces&auto=format&q=80&sig=${i}`} alt="Student" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-muted-foreground">
                  Joined by <span className="text-primary">10,000+</span> rural students
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-all duration-500">
                <img 
                  src={`${import.meta.env.BASE_URL}images/hero-illustration.png`}
                  alt="Kids doing science experiment" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Floating feature card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-border flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-white">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="font-bold text-foreground">Earn Badges</div>
                  <div className="text-sm text-muted-foreground">Learn & grow!</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Our interactive features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make learning science as fun as playing your favorite game.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PlayfulCard hover className="text-center p-8 bg-gradient-to-b from-white to-purple-50/50">
              <div className="w-20 h-20 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
                <FlaskConical className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Virtual Labs</h3>
              <p className="text-muted-foreground">Conduct safe, exciting experiments right from your device. No physical materials needed!</p>
            </PlayfulCard>

            <PlayfulCard hover className="text-center p-8 bg-gradient-to-b from-white to-yellow-50/50">
              <div className="w-20 h-20 mx-auto bg-secondary/10 text-secondary-dark rounded-2xl flex items-center justify-center mb-6 transform -rotate-3">
                <Brain className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Tutor</h3>
              <p className="text-muted-foreground">Stuck on a tricky concept? Chat with our friendly AI robot tutor anytime, anywhere.</p>
            </PlayfulCard>

            <PlayfulCard hover className="text-center p-8 bg-gradient-to-b from-white to-pink-50/50">
              <div className="w-20 h-20 mx-auto bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 transform rotate-3">
                <Gamepad2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Learn with Games</h3>
              <p className="text-muted-foreground">Earn points, collect rare badges, and compete with friends while mastering STEM subjects.</p>
            </PlayfulCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-4xl mx-auto px-4 relative text-center text-white">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ready to become a scientist?
          </h2>
          <p className="text-xl mb-10 text-white/80">
            Join thousands of kids discovering the wonders of physics, chemistry, and biology today!
          </p>
          <Link href="/labs">
            <PlayfulButton variant="secondary" size="lg" className="text-xl">
              Create Free Account
            </PlayfulButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
