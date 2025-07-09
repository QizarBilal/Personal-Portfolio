import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Portfolio from "@/components/Portfolio";
import ScrollIndicator from "@/components/ScrollIndicator";
import BackToTop from "@/components/BackToTop";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-black text-white min-h-screen">
          <ScrollIndicator />
          <Portfolio />
          <BackToTop />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
