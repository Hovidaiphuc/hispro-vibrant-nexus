
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Plus, Search, Filter, Calendar, User, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const prescriptions = [
  {
    id: "DT001",
    patient: "Nguyễn Văn An",
    patientId: "BN001",
    doctor: "BS. Trần Thị Bình",
    date: "2025-05-28",
    medications: [
      { name: "Thuốc hạ huyết áp", dosage: "1 viên/ngày", quantity: "30 viên" },
      { name: "Vitamin D3", dosage: "2 viên/ngày", quantity: "60 viên" }
    ],
    status: "dispensed",
    totalCost: "450,000"
  },
  {
    id: "DT002",
    patient: "Lê Thị Cúc",
    patientId: "BN002",
    doctor: "BS. Nguyễn Văn Dũng",
    date: "2025-05-27",
    medications: [
      { name: "Thuốc dạ dày", dosage: "1 viên/bữa", quantity: "90 viên" },
      { name: "Men tiêu hóa", dosage: "2 gói/ngày", quantity: "30 gói" }
    ],
    status: "pending",
    totalCost: "320,000"
  }
];

const PrescriptionsPage = () => {
  return (
    <Layout 
      title="Đơn thuốc" 
      subtitle="Kê đơn điện tử, quản lý kho thuốc"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-orange hover:bg-medical-orange/90">
            <Plus className="w-4 h-4 mr-2" />
            Kê đơn thuốc mới
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm đơn thuốc
          </Button>
          <Button variant="outline">
            <Package className="w-4 h-4 mr-2" />
            Quản lý kho
          </Button>
        </div>

        {/* Prescription Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đơn thuốc hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-orange">1,234</div>
              <p className="text-xs text-medical-green">+87 từ hôm qua</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đã phát thuốc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">987</div>
              <p className="text-xs text-medical-green">80% hoàn thành</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chờ phát thuốc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-orange">247</div>
              <p className="text-xs text-medical-orange">Cần xử lý</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tồn kho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">95%</div>
              <p className="text-xs text-medical-green">Đủ cung ứng</p>
            </CardContent>
          </Card>
        </div>

        {/* Prescriptions List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-orange">Đơn thuốc gần đây</CardTitle>
            <CardDescription>Danh sách đơn thuốc được kê gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-medical-orange-light rounded-full flex items-center justify-center">
                        <Pill className="w-6 h-6 text-medical-orange" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{prescription.patient}</h3>
                          <Badge variant="outline">{prescription.patientId}</Badge>
                          <Badge variant="outline">{prescription.id}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {prescription.doctor}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {prescription.date}
                          </div>
                          <span className="font-medium text-medical-green">
                            Tổng: {prescription.totalCost}đ
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={prescription.status === 'dispensed' ? 'default' : 'secondary'}>
                        {prescription.status === 'dispensed' ? 'Đã phát thuốc' : 'Chờ phát thuốc'}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                  
                  <div className="ml-16 space-y-2">
                    <h4 className="font-medium text-gray-800">Danh sách thuốc:</h4>
                    {prescription.medications.map((med, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium text-medical-orange">{med.name}</span>
                          <span className="text-sm text-gray-600 ml-2">- {med.dosage}</span>
                        </div>
                        <span className="text-sm text-gray-600">{med.quantity}</span>
                      </div>
                    ))}
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

export default PrescriptionsPage;
