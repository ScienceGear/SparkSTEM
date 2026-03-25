import { Link, useLocation } from "wouter";
import { Beaker, BrainCircuit, BookOpen, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/labs", label: "Virtual Labs", icon: Beaker },
    { href: "/ai-tutor", label: "AI Tutor", icon: BrainCircuit },
    { href: "/books", label: "Library", icon: BookOpen },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/30">
              <Beaker className="w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground tracking-tight">
              Wonder<span className="text-primary">Kids</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-2xl border border-border/50">
              {navItems.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200",
                      isActive
                        ? "bg-white text-primary shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "")} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button className="font-bold text-muted-foreground hover:text-primary transition-colors">
                Log In
              </button>
              <Link 
                href="/labs"
                className="bg-secondary text-white font-bold px-6 py-2.5 rounded-xl playful-button-secondary-shadow hover:-translate-y-0.5 transition-transform"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-white absolute w-full px-4 py-4 flex flex-col gap-4 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-lg",
                location === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-border my-2" />
          <button className="w-full font-bold text-muted-foreground py-3">Log In</button>
          <Link
            href="/labs"
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-secondary text-white font-bold px-6 py-3 rounded-xl playful-button-secondary-shadow"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
