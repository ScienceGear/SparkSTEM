import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PlayfulButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function PlayfulButton({ 
  variant = "primary", 
  size = "md", 
  className, 
  children, 
  ...props 
}: PlayfulButtonProps) {
  return (
    <button
      className={cn(
        "font-display font-bold inline-flex items-center justify-center transition-transform",
        {
          "bg-primary text-white playful-button-shadow hover:-translate-y-0.5": variant === "primary",
          "bg-secondary text-white playful-button-secondary-shadow hover:-translate-y-0.5": variant === "secondary",
          "bg-white text-primary border-2 border-primary hover:bg-primary/5": variant === "outline",
          "px-4 py-2 text-sm rounded-xl": size === "sm",
          "px-6 py-3 text-base rounded-2xl": size === "md",
          "px-8 py-4 text-lg rounded-2xl": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function PlayfulCard({ 
  children, 
  className, 
  hover = false 
}: { 
  children: ReactNode; 
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl border-2 border-border p-6 shadow-sm",
        hover && "transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Badge({ 
  children, 
  color = "primary" 
}: { 
  children: ReactNode; 
  color?: "primary" | "secondary" | "accent" | "muted" 
}) {
  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
        {
          "bg-primary/10 text-primary": color === "primary",
          "bg-secondary/15 text-secondary-dark": color === "secondary",
          "bg-accent/10 text-accent": color === "accent",
          "bg-muted text-muted-foreground": color === "muted",
        }
      )}
    >
      {children}
    </span>
  );
}
