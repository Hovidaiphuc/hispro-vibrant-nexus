
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Plus, Search, Filter, DollarSign, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: "DV001",
    name: "Khám tổng quát",
    category: "Khám bệnh",
    price: "200,000",
    duration: "30 phút",
    department: "Nội khoa",
    usage: 234,
    status: "active"
  },
  {
    id: "DV002",
    name: "Siêu âm tim",
    category: "Chẩn đoán hình ảnh",
    price: "350,000",
    duration: "45 phút", 
    department: "Tim mạch",
    usage: 89,
    status: "active"
  },
  {
    id: "DV003",
    name: "Xét nghiệm máu tổng quát",
    category: "Xét nghiệm",
    price: "150,000",
    duration: "15 phút",
    department: "Xét nghiệm",
    usage: 456,
    status: "active"
  },
  {
    id: "DV004",
    name: "Phẫu thuật nội soi",
    category: "Phẫu thuật",
    price: "5,000,000",
    duration: "120 phút",
    department: "Ngoại khoa",
    usage: 23,
    status: "active"
  }
];

const ServicesPage = () => {
  return (
    <Layout 
      title="Dịch vụ Y tế" 
      subtitle="Quản lý các dịch vụ và gói khám"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-blue hover:bg-medical-blue-dark">
            <Plus className="w-4 h-4 mr-2" />
            Thêm dịch vụ mới
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm dịch vụ
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc theo danh mục
          </Button>
        </div>

        {/* Services Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng dịch vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">156</div>
              <p className="text-xs text-medical-green">+12 dịch vụ mới</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đã sử dụng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">2,341</div>
              <p className="text-xs text-medical-green">Lượt sử dụng tháng này</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Doanh thu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">₫1.8B</div>
              <p className="text-xs text-medical-green">Từ dịch vụ tháng này</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Phổ biến nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">XN máu</div>
              <p className="text-xs text-medical-blue">456 lượt sử dụng</p>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-blue">Danh sách dịch vụ</CardTitle>
            <CardDescription>Quản lý các dịch vụ y tế và gói khám</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-blue-light rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-medical-blue" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <Badge variant="outline">{service.id}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <Badge variant="secondary">{service.category}</Badge>
                        <span>{service.department}</span>
                        <span>⏱ {service.duration}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          <span className="font-medium text-medical-green">{service.price}đ</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{service.usage} lượt sử dụng</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1 text-medical-green" />
                          <span className="text-medical-green">Phổ biến</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                      {service.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Chỉnh sửa
                    </Button>
                    <Button size="sm" className="bg-medical-blue hover:bg-medical-blue-dark">
                      Xem chi tiết
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

export default ServicesPage;
