import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import AdminAccessButton from "./components/AdminAccessButton";
import AdminIndex from "./pages/admin/AdminIndex";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDailyDeal from "./pages/admin/AdminDailyDeal";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminLayout from "./components/admin/AdminLayout";
import { AdminProvider } from "./contexts/AdminContext";
import { AuthProvider } from "./contexts/AuthContext";
import { initializeFirebaseData } from "./utils/firebaseInit";

// Configuração do React Query com retry e staleTime
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    // Inicializa dados do Firebase se necessário
    initializeFirebaseData().then(success => {
      if (success) {
        console.log("Estrutura de dados Firebase inicializada com sucesso");
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sobre" element={<AboutPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminIndex />} />
                <Route path="/admin/*" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="daily-deal" element={<AdminDailyDeal />} />
                  <Route path="banners" element={<AdminBanners />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <AdminAccessButton />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </TooltipProvider>
        </AdminProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;