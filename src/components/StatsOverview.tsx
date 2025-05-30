
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText, DollarSign } from "lucide-react";

const stats = [
  {
    title: "Tổng Bệnh nhân",
    value: "2,847",
    change: "+12%",
    icon: Users,
    color: "text-medical-blue",
    bgColor: "bg-medical-blue-light"
  },
  {
    title: "Lịch hẹn Hôm nay",
    value: "156",
    change: "+8%",
    icon: Calendar,
    color: "text-medical-green",
    bgColor: "bg-medical-green-light"
  },
  {
    title: "Hồ sơ Mới",
    value: "89",
    change: "+15%",
    icon: FileText,
    color: "text-medical-orange",
    bgColor: "bg-medical-orange-light"
  },
  {
    title: "Doanh thu Tháng",
    value: "₫2.4B",
    change: "+23%",
    icon: DollarSign,
    color: "text-medical-green",
    bgColor: "bg-medical-green-light"
  }
];

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 ${stat.bgColor} rounded-full flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-medical-green font-medium mt-1">
              {stat.change} từ tháng trước
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
