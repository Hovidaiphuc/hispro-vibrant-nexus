
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Plus, Search, Filter, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const diagnosticTests = [
  {
    id: "XN001",
    patient: "Nguyễn Văn An",
    patientId: "BN001",
    testType: "Xét nghiệm máu",
    orderBy: "BS. Trần Thị Bình",
    scheduledDate: "2025-05-30",
    scheduledTime: "08:30",
    status: "scheduled",
    priority: "normal",
    results: null
  },
  {
    id: "XN002",
    patient: "Lê Thị Cúc",
    patientId: "BN002",
    testType: "Chụp X-quang",
    orderBy: "BS. Nguyễn Văn Dũng",
    scheduledDate: "2025-05-30",
    scheduledTime: "09:00",
    status: "in-progress",
    priority: "high",
    results: null
  },
  {
    id: "XN003",
    patient: "Trần Văn Em",
    patientId: "BN003",
    testType: "Siêu âm",
    orderBy: "BS. Phạm Thị Giang",
    scheduledDate: "2025-05-29",
    scheduledTime: "14:30",
    status: "completed",
    priority: "normal",
    results: "Bình thường"
  }
];

const DiagnosticsPage = () => {
  return (
    <Layout 
      title="Cận lâm sàng" 
      subtitle="Xét nghiệm, chẩn đoán hình ảnh, theo dõi"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-red hover:bg-medical-red/90">
            <Plus className="w-4 h-4 mr-2" />
            Yêu cầu xét nghiệm
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm kết quả
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc theo loại
          </Button>
        </div>

        {/* Diagnostics Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Xét nghiệm hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">567</div>
              <p className="text-xs text-medical-green">+45 từ hôm qua</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đã hoàn thành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">432</div>
              <p className="text-xs text-medical-green">76% hoàn thành</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đang xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-orange">89</div>
              <p className="text-xs text-medical-orange">Chờ kết quả</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ưu tiên cao</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">12</div>
              <p className="text-xs text-medical-red">Cần xử lý ngay</p>
            </CardContent>
          </Card>
        </div>

        {/* Diagnostic Tests List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-red">Danh sách xét nghiệm</CardTitle>
            <CardDescription>Quản lý các yêu cầu xét nghiệm và kết quả</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {diagnosticTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-red-light rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6 text-medical-red" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{test.patient}</h3>
                        <Badge variant="outline">{test.patientId}</Badge>
                        <Badge variant="outline">{test.id}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium text-medical-red">{test.testType}</span>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {test.orderBy}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {test.scheduledDate}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {test.scheduledTime}
                        </div>
                        {test.results && (
                          <span className="text-medical-green font-medium">
                            Kết quả: {test.results}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={
                      test.priority === 'high' ? 'destructive' : 'secondary'
                    }>
                      {test.priority === 'high' ? 'Ưu tiên cao' : 'Bình thường'}
                    </Badge>
                    <Badge variant={
                      test.status === 'completed' ? 'default' :
                      test.status === 'in-progress' ? 'secondary' : 'outline'
                    }>
                      {test.status === 'completed' ? 'Hoàn thành' :
                       test.status === 'in-progress' ? 'Đang thực hiện' : 'Đã lên lịch'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Chi tiết
                    </Button>
                    {test.status === 'completed' && (
                      <Button size="sm" className="bg-medical-green hover:bg-medical-green/90">
                        Xem kết quả
                      </Button>
                    )}
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

export default DiagnosticsPage;
