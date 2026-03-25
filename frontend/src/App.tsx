import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Import Layout & Pages
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import Labs from "@/pages/Labs";
import LabDetail from "@/pages/LabDetail";
import AITutor from "@/pages/AITutor";
import Dashboard from "@/pages/Dashboard";
import Books from "@/pages/Books";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/labs" component={Labs} />
          <Route path="/labs/:id" component={LabDetail} />
          <Route path="/ai-tutor" component={AITutor} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/books" component={Books} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      {/* Simple playful footer */}
      <footer className="bg-white border-t-2 border-border py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground font-bold">
          <p>© 2025 WonderKids STEM Platform. Made with 💜 for learning.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
