
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Plus, Search, Filter, Phone, Mail, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const patients = [
  {
    id: "BN001",
    name: "Nguyễn Văn An",
    age: 45,
    gender: "Nam",
    phone: "0123456789",
    email: "an.nguyen@email.com",
    address: "123 Nguyễn Trãi, Q1, TP.HCM",
    lastVisit: "2025-05-25",
    status: "active",
    insurance: "BHYT"
  },
  {
    id: "BN002",
    name: "Trần Thị Bình",
    age: 32,
    gender: "Nữ",
    phone: "0987654321",
    email: "binh.tran@email.com",
    address: "456 Lê Lai, Q3, TP.HCM",
    lastVisit: "2025-05-28",
    status: "active",
    insurance: "Bảo hiểm tư nhân"
  },
  {
    id: "BN003",
    name: "Lê Văn Cường",
    age: 67,
    gender: "Nam",
    phone: "0456789123",
    email: "cuong.le@email.com",
    address: "789 Hai Bà Trưng, Q1, TP.HCM",
    lastVisit: "2025-05-20",
    status: "inactive",
    insurance: "BHYT"
  }
];

const PatientsPage = () => {
  return (
    <Layout 
      title="Quản lý Bệnh nhân" 
      subtitle="Thông tin cá nhân, lịch sử khám bệnh"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-blue hover:bg-medical-blue-dark">
            <Plus className="w-4 h-4 mr-2" />
            Thêm bệnh nhân mới
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm bệnh nhân
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc theo tiêu chí
          </Button>
        </div>

        {/* Patient Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng bệnh nhân</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">2,847</div>
              <p className="text-xs text-medical-green">+89 trong tháng</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Bệnh nhân mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">89</div>
              <p className="text-xs text-medical-green">+12% từ tháng trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đang điều trị</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-orange">234</div>
              <p className="text-xs text-medical-orange">Theo dõi thường xuyên</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tái khám</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">156</div>
              <p className="text-xs text-medical-green">Trong tuần tới</p>
            </CardContent>
          </Card>
        </div>

        {/* Patients List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-blue">Danh sách bệnh nhân</CardTitle>
            <CardDescription>Quản lý thông tin bệnh nhân</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-blue-light rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-medical-blue" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                        <Badge variant="outline">{patient.id}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{patient.age} tuổi • {patient.gender}</span>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {patient.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {patient.email}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{patient.address}</span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Khám cuối: {patient.lastVisit}
                        </div>
                      </div>
                      <div className="mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {patient.insurance}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                      {patient.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Xem hồ sơ
                    </Button>
                    <Button size="sm" className="bg-medical-green hover:bg-medical-green/90">
                      Đặt lịch khám
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

export default PatientsPage;
