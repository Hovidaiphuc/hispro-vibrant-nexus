
import { 
  Calendar, 
  Users, 
  FileText, 
  Activity, 
  Pill, 
  DollarSign, 
  Settings, 
  User, 
  Stethoscope 
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ServiceCard } from "@/components/ServiceCard";
import { StatsOverview } from "@/components/StatsOverview";
import { QuickChart } from "@/components/QuickChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const microservicesData = [
  {
    title: "Quản lý Lịch hẹn",
    description: "Đặt lịch, quản lý thời gian, nhắc nhở tự động",
    icon: Calendar,
    color: "text-medical-green",
    bgColor: "bg-medical-green-light",
    stats: [
      { label: "Hôm nay", value: "156" },
      { label: "Tuần này", value: "892" }
    ]
  },
  {
    title: "Điều phối",
    description: "Quản lý luồng bệnh nhân, phân bổ tài nguyên",
    icon: Settings,
    color: "text-medical-orange",
    bgColor: "bg-medical-orange-light",
    stats: [
      { label: "Phòng khám", value: "12" },
      { label: "Đang chờ", value: "34" }
    ]
  },
  {
    title: "Quản lý Bệnh nhân",
    description: "Thông tin cá nhân, lịch sử khám bệnh",
    icon: Users,
    color: "text-medical-blue",
    bgColor: "bg-medical-blue-light",
    stats: [
      { label: "Tổng số", value: "2,847" },
      { label: "Mới", value: "89" }
    ]
  },
  {
    title: "Hồ sơ Bệnh án",
    description: "Lưu trữ và quản lý hồ sơ điện tử",
    icon: FileText,
    color: "text-medical-green",
    bgColor: "bg-medical-green-light",
    stats: [
      { label: "Tổng hồ sơ", value: "15,432" },
      { label: "Cập nhật", value: "234" }
    ]
  },
  {
    title: "Cận lâm sàng",
    description: "Xét nghiệm, chẩn đoán hình ảnh, theo dõi",
    icon: Activity,
    color: "text-medical-red",
    bgColor: "bg-medical-red-light",
    stats: [
      { label: "Xét nghiệm", value: "567" },
      { label: "Hoàn thành", value: "432" }
    ]
  },
  {
    title: "Đơn thuốc",
    description: "Kê đơn điện tử, quản lý kho thuốc",
    icon: Pill,
    color: "text-medical-orange",
    bgColor: "bg-medical-orange-light",
    stats: [
      { label: "Đơn thuốc", value: "1,234" },
      { label: "Tồn kho", value: "95%" }
    ]
  },
  {
    title: "Dịch vụ Y tế",
    description: "Quản lý các dịch vụ và gói khám",
    icon: Stethoscope,
    color: "text-medical-blue",
    bgColor: "bg-medical-blue-light",
    stats: [
      { label: "Dịch vụ", value: "156" },
      { label: "Đã sử dụng", value: "2,341" }
    ]
  },
  {
    title: "Tài chính - Kế toán",
    description: "Thu chi, báo cáo tài chính, công nợ",
    icon: DollarSign,
    color: "text-medical-green",
    bgColor: "bg-medical-green-light",
    stats: [
      { label: "Doanh thu", value: "₫2.4B" },
      { label: "Lợi nhuận", value: "+23%" }
    ]
  },
  {
    title: "Marketing",
    description: "Chăm sóc khách hàng, khuyến mãi, CRM",
    icon: User,
    color: "text-medical-orange",
    bgColor: "bg-medical-orange-light",
    stats: [
      { label: "Chiến dịch", value: "8" },
      { label: "Tương tác", value: "12K" }
    ]
  }
];

const Index = () => {
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
                  HisPro Dashboard
                </h1>
                <p className="text-gray-600">
                  Hệ thống quản lý bệnh viện toàn diện
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            <StatsOverview />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <QuickChart />
              
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-medical-blue">Hoạt động Gần đây</CardTitle>
                  <CardDescription>Các sự kiện quan trọng trong hệ thống</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { time: "09:30", action: "Bệnh nhân mới đăng ký", type: "success" },
                    { time: "10:15", action: "Hoàn thành xét nghiệm", type: "info" },
                    { time: "11:00", action: "Cập nhật hồ sơ bệnh án", type: "warning" },
                    { time: "11:45", action: "Thanh toán dịch vụ", type: "success" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'success' ? 'bg-medical-green' :
                        activity.type === 'info' ? 'bg-medical-blue' : 'bg-medical-orange'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-medical-blue mb-2">
                  Microservices
                </h2>
                <p className="text-gray-600">
                  Các module chức năng chính của hệ thống HisPro
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {microservicesData.map((service, index) => (
                  <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                    <ServiceCard {...service} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
