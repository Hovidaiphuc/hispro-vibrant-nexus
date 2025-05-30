
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Phone, Plus, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const appointments = [
  {
    id: 1,
    patient: "Nguyễn Văn An",
    time: "08:30",
    date: "2025-05-30",
    doctor: "BS. Trần Thị Bình",
    department: "Tim mạch",
    status: "confirmed",
    phone: "0123456789"
  },
  {
    id: 2,
    patient: "Lê Thị Cúc",
    time: "09:00",
    date: "2025-05-30",
    doctor: "BS. Nguyễn Văn Dũng",
    department: "Nội khoa",
    status: "waiting",
    phone: "0987654321"
  },
  {
    id: 3,
    patient: "Trần Văn Em",
    time: "09:30",
    date: "2025-05-30",
    doctor: "BS. Phạm Thị Giang",
    department: "Ngoại khoa",
    status: "cancelled",
    phone: "0456789123"
  }
];

const AppointmentsPage = () => {
  return (
    <Layout 
      title="Quản lý Lịch hẹn" 
      subtitle="Đặt lịch, quản lý thời gian, nhắc nhở tự động"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-blue hover:bg-medical-blue-dark">
            <Plus className="w-4 h-4 mr-2" />
            Tạo lịch hẹn mới
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc theo ngày
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">156</div>
              <p className="text-xs text-medical-green">+12% từ hôm qua</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tuần này</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">892</div>
              <p className="text-xs text-medical-green">+8% từ tuần trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đã hủy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">23</div>
              <p className="text-xs text-medical-red">-5% từ tuần trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hoàn thành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">1,234</div>
              <p className="text-xs text-medical-green">+15% từ tháng trước</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-blue">Lịch hẹn hôm nay</CardTitle>
            <CardDescription>Danh sách các cuộc hẹn trong ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-blue-light rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-medical-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {appointment.phone}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{appointment.doctor} - {appointment.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={
                      appointment.status === 'confirmed' ? 'default' :
                      appointment.status === 'waiting' ? 'secondary' : 'destructive'
                    }>
                      {appointment.status === 'confirmed' ? 'Đã xác nhận' :
                       appointment.status === 'waiting' ? 'Đang chờ' : 'Đã hủy'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AppointmentsPage;
