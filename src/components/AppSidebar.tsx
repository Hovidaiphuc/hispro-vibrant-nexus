
import {
  Calendar,
  Users,
  FileText,
  Activity,
  Pill,
  DollarSign,
  Settings,
  User,
  BarChart3,
  Stethoscope
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const microservices = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
    color: "text-medical-blue"
  },
  {
    title: "Quản lý Lịch hẹn",
    url: "/appointments",
    icon: Calendar,
    color: "text-medical-green"
  },
  {
    title: "Điều phối",
    url: "/coordination",
    icon: Settings,
    color: "text-medical-orange"
  },
  {
    title: "Quản lý Bệnh nhân",
    url: "/patients",
    icon: Users,
    color: "text-medical-blue"
  },
  {
    title: "Hồ sơ Bệnh án",
    url: "/medical-records",
    icon: FileText,
    color: "text-medical-green"
  },
  {
    title: "Cận lâm sàng",
    url: "/diagnostics",
    icon: Activity,
    color: "text-medical-red"
  },
  {
    title: "Đơn thuốc",
    url: "/prescriptions",
    icon: Pill,
    color: "text-medical-orange"
  },
  {
    title: "Dịch vụ Y tế",
    url: "/services",
    icon: Stethoscope,
    color: "text-medical-blue"
  },
  {
    title: "Tài chính - Kế toán",
    url: "/finance",
    icon: DollarSign,
    color: "text-medical-green"
  },
  {
    title: "Marketing",
    url: "/marketing",
    icon: User,
    color: "text-medical-orange"
  }
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-medical-blue/20">
      <SidebarHeader className="border-b border-medical-blue/20 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-medical-blue to-medical-green rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-medical-blue">HisPro</h2>
            <p className="text-sm text-gray-600">Hospital Management</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-medical-blue font-semibold mb-4">
            Microservices
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {microservices.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="w-full p-3 rounded-lg hover:bg-medical-blue-light transition-all duration-200 group"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-gray-700 group-hover:text-medical-blue font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-medical-blue/20 p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-medical-blue-light">
          <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-medical-blue">Bác sĩ Admin</p>
            <p className="text-xs text-gray-600">admin@hispro.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
