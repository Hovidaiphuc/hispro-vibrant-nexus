
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-medical-blue-light">
        <AppSidebar />
        <main className="flex-1">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-medical-blue/20 p-4">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-medical-blue-light transition-colors" />
              <div>
                <h1 className="text-2xl font-bold text-medical-blue">
                  {title}
                </h1>
                <p className="text-gray-600">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
