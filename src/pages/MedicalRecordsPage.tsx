
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search, Filter, Calendar, User, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const medicalRecords = [
  {
    id: "HS001",
    patient: "Nguyễn Văn An",
    patientId: "BN001",
    diagnosis: "Tăng huyết áp",
    doctor: "BS. Trần Thị Bình",
    department: "Tim mạch",
    date: "2025-05-28",
    status: "completed",
    type: "Khám tổng quát"
  },
  {
    id: "HS002",
    patient: "Lê Thị Cúc",
    patientId: "BN002",
    diagnosis: "Viêm dạ dày",
    doctor: "BS. Nguyễn Văn Dũng",
    department: "Nội khoa",
    date: "2025-05-27",
    status: "pending",
    type: "Khám chuyên khoa"
  },
  {
    id: "HS003",
    patient: "Trần Văn Em",
    patientId: "BN003",
    diagnosis: "Gãy xương tay",
    doctor: "BS. Phạm Thị Giang",
    department: "Ngoại khoa",
    date: "2025-05-26",
    status: "completed",
    type: "Khám cấp cứu"
  }
];

const MedicalRecordsPage = () => {
  return (
    <Layout 
      title="Hồ sơ Bệnh án" 
      subtitle="Lưu trữ và quản lý hồ sơ điện tử"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-green hover:bg-medical-green/90">
            <Plus className="w-4 h-4 mr-2" />
            Tạo hồ sơ mới
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm hồ sơ
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc theo loại
          </Button>
        </div>

        {/* Medical Records Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng hồ sơ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">15,432</div>
              <p className="text-xs text-medical-green">+234 trong tháng</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cập nhật hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">67</div>
              <p className="text-xs text-medical-blue">Hồ sơ được cập nhật</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chờ xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-orange">23</div>
              <p className="text-xs text-medical-orange">Cần xem xét</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hoàn thành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">15,409</div>
              <p className="text-xs text-medical-green">Đã hoàn tất</p>
            </CardContent>
          </Card>
        </div>

        {/* Medical Records List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-green">Hồ sơ bệnh án gần đây</CardTitle>
            <CardDescription>Danh sách hồ sơ được cập nhật gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-green-light rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-medical-green" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{record.patient}</h3>
                        <Badge variant="outline">{record.patientId}</Badge>
                        <Badge variant="outline">{record.id}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium text-medical-blue">{record.diagnosis}</span>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {record.doctor}
                        </div>
                        <span>{record.department}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {record.date}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {record.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                      {record.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Xem chi tiết
                    </Button>
                    <Button size="sm" className="bg-medical-green hover:bg-medical-green/90">
                      Chỉnh sửa
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

export default MedicalRecordsPage;
