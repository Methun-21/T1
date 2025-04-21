import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationContextProvider } from "@/components/NotificationToast";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Report from "./pages/Report";
import Search from "./pages/Search";
import ItemDetail from "./pages/ItemDetail";
import Chat from "./pages/Chat";
import Login from "./pages/Login"; // ✅ Import Login page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationContextProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/report" element={<Report />} />
            <Route path="/search" element={<Search />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/login" element={<Login />} /> {/* ✅ Login route added */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationContextProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
