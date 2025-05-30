
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppointmentsPage from "./pages/AppointmentsPage";
import CoordinationPage from "./pages/CoordinationPage";
import PatientsPage from "./pages/PatientsPage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import DiagnosticsPage from "./pages/DiagnosticsPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import ServicesPage from "./pages/ServicesPage";
import FinancePage from "./pages/FinancePage";
import MarketingPage from "./pages/MarketingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/coordination" element={<CoordinationPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route path="/diagnostics" element={<DiagnosticsPage />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
