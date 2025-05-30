
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Plus, Search, Filter, Mail, Phone, MessageCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  {
    id: "CD001",
    name: "Khuyến mãi khám sức khỏe",
    type: "promotion",
    status: "active",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    reach: 12500,
    engagement: 1250,
    conversion: 89,
    budget: "10,000,000"
  },
  {
    id: "CD002", 
    name: "Chương trình tầm soát ung thư",
    type: "health-screening",
    status: "active",
    startDate: "2025-05-15",
    endDate: "2025-06-15",
    reach: 8900,
    engagement: 890,
    conversion: 56,
    budget: "15,000,000"
  },
  {
    id: "CD003",
    name: "Vaccine COVID-19 miễn phí",
    type: "vaccination",
    status: "completed",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    reach: 25000,
    engagement: 3500,
    conversion: 234,
    budget: "20,000,000"
  }
];

const customers = [
  {
    id: "KH001",
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    phone: "0123456789",
    source: "Facebook",
    status: "hot-lead",
    lastContact: "2025-05-30",
    value: "2,000,000"
  },
  {
    id: "KH002",
    name: "Trần Thị Bình",
    email: "binh.tran@email.com", 
    phone: "0987654321",
    source: "Google Ads",
    status: "qualified",
    lastContact: "2025-05-29",
    value: "1,500,000"
  }
];

const MarketingPage = () => {
  return (
    <Layout 
      title="Marketing" 
      subtitle="Chăm sóc khách hàng, khuyến mãi, CRM"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-orange hover:bg-medical-orange/90">
            <Plus className="w-4 h-4 mr-2" />
            Tạo chiến dịch mới
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm khách hàng
          </Button>
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Gửi email marketing
          </Button>
        </div>

        {/* Marketing Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chiến dịch đang chạy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-orange">8</div>
              <p className="text-xs text-medical-green">+2 chiến dịch mới</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tương tác tháng này</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">12K</div>
              <div className="flex items-center text-xs text-medical-green">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18% từ tháng trước
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Khách hàng tiềm năng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">456</div>
              <p className="text-xs text-medical-green">+67 leads mới</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tỷ lệ chuyển đổi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">23%</div>
              <p className="text-xs text-medical-green">Tăng 5% so với tháng trước</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle className="text-medical-orange">Chiến dịch Marketing</CardTitle>
              <CardDescription>Quản lý các chiến dịch đang chạy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge variant="outline">{campaign.id}</Badge>
                      </div>
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status === 'active' ? 'Đang chạy' : 'Hoàn thành'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Tiếp cận</p>
                        <p className="font-medium text-medical-blue">{campaign.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tương tác</p>
                        <p className="font-medium text-medical-green">{campaign.engagement.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Chuyển đổi</p>
                        <p className="font-medium text-medical-orange">{campaign.conversion}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span>Ngân sách: {parseInt(campaign.budget).toLocaleString()}đ</span>
                      <span className="mx-2">•</span>
                      <span>{campaign.startDate} - {campaign.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-medical-blue">Khách hàng tiềm năng</CardTitle>
              <CardDescription>Quản lý leads và chăm sóc khách hàng</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-medical-blue-light rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-medical-blue" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          <Badge variant="outline">{customer.id}</Badge>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {customer.phone}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span>Nguồn: {customer.source}</span>
                          <span>Giá trị: {parseInt(customer.value).toLocaleString()}đ</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        customer.status === 'hot-lead' ? 'destructive' :
                        customer.status === 'qualified' ? 'default' : 'secondary'
                      }>
                        {customer.status === 'hot-lead' ? 'Lead nóng' :
                         customer.status === 'qualified' ? 'Đã xác nhận' : 'Tiềm năng'}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Liên hệ cuối: {customer.lastContact}
                      </p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Liên hệ
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MarketingPage;
