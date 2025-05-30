
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, MapPin, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const departments = [
  { name: "Khoa Tim mạch", patients: 12, capacity: 20, status: "normal" },
  { name: "Khoa Nội khoa", patients: 18, capacity: 20, status: "busy" },
  { name: "Khoa Ngoại khoa", patients: 15, capacity: 25, status: "normal" },
  { name: "Khoa Sản", patients: 8, capacity: 15, status: "low" },
];

const waitingQueue = [
  { id: 1, patient: "Nguyễn Văn A", department: "Tim mạch", waitTime: "15 phút", priority: "high" },
  { id: 2, patient: "Trần Thị B", department: "Nội khoa", waitTime: "30 phút", priority: "normal" },
  { id: 3, patient: "Lê Văn C", department: "Ngoại khoa", waitTime: "45 phút", priority: "low" },
];

const CoordinationPage = () => {
  return (
    <Layout 
      title="Điều phối" 
      subtitle="Quản lý luồng bệnh nhân, phân bổ tài nguyên"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-orange hover:bg-medical-orange/90">
            <Settings className="w-4 h-4 mr-2" />
            Điều chỉnh lịch trình
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Quản lý hàng đợi
          </Button>
          <Button variant="outline">
            <MapPin className="w-4 h-4 mr-2" />
            Sơ đồ phòng ban
          </Button>
        </div>

        {/* Department Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{dept.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-medical-blue">{dept.patients}/{dept.capacity}</div>
                    <p className="text-xs text-gray-500">Bệnh nhân/Sức chứa</p>
                  </div>
                  <Badge variant={
                    dept.status === 'busy' ? 'destructive' :
                    dept.status === 'normal' ? 'default' : 'secondary'
                  }>
                    {dept.status === 'busy' ? 'Bận' :
                     dept.status === 'normal' ? 'Bình thường' : 'Ít'}
                  </Badge>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      dept.status === 'busy' ? 'bg-medical-red' :
                      dept.status === 'normal' ? 'bg-medical-green' : 'bg-medical-orange'
                    }`}
                    style={{ width: `${(dept.patients / dept.capacity) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Waiting Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="text-medical-orange">Hàng đợi hiện tại</CardTitle>
              <CardDescription>Bệnh nhân đang chờ khám</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {waitingQueue.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        item.priority === 'high' ? 'bg-medical-red' :
                        item.priority === 'normal' ? 'bg-medical-orange' : 'bg-medical-green'
                      }`}></div>
                      <div>
                        <p className="font-medium">{item.patient}</p>
                        <p className="text-sm text-gray-600">{item.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.waitTime}
                      </div>
                      <Badge size="sm" variant={
                        item.priority === 'high' ? 'destructive' :
                        item.priority === 'normal' ? 'default' : 'secondary'
                      }>
                        {item.priority === 'high' ? 'Ưu tiên cao' :
                         item.priority === 'normal' ? 'Bình thường' : 'Ưu tiên thấp'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resource Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-medical-blue">Quản lý tài nguyên</CardTitle>
              <CardDescription>Trạng thái thiết bị và nhân sự</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-medical-green" />
                    <div>
                      <p className="font-medium">Máy X-quang</p>
                      <p className="text-sm text-gray-600">Phòng 101</p>
                    </div>
                  </div>
                  <Badge variant="default">Hoạt động</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-medical-orange" />
                    <div>
                      <p className="font-medium">Máy CT Scan</p>
                      <p className="text-sm text-gray-600">Phòng 203</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Bảo trì</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-medical-green" />
                    <div>
                      <p className="font-medium">Phòng mổ 1</p>
                      <p className="text-sm text-gray-600">Tầng 3</p>
                    </div>
                  </div>
                  <Badge variant="default">Sẵn sàng</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CoordinationPage;
