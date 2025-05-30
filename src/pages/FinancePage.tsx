
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus, Search, Filter, TrendingUp, TrendingDown, Receipt } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "GD001",
    type: "income",
    patient: "Nguyễn Văn An",
    patientId: "BN001", 
    service: "Khám tổng quát",
    amount: "200,000",
    date: "2025-05-30",
    status: "completed",
    paymentMethod: "Tiền mặt"
  },
  {
    id: "GD002",
    type: "income",
    patient: "Lê Thị Cúc",
    patientId: "BN002",
    service: "Xét nghiệm máu",
    amount: "150,000",
    date: "2025-05-30",
    status: "pending",
    paymentMethod: "Thẻ tín dụng"
  },
  {
    id: "GD003",
    type: "expense",
    description: "Mua thiết bị y tế",
    amount: "50,000,000",
    date: "2025-05-29",
    status: "completed",
    category: "Thiết bị"
  }
];

const FinancePage = () => {
  return (
    <Layout 
      title="Tài chính - Kế toán" 
      subtitle="Thu chi, báo cáo tài chính, công nợ"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-medical-green hover:bg-medical-green/90">
            <Plus className="w-4 h-4 mr-2" />
            Ghi nhận giao dịch
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm giao dịch
          </Button>
          <Button variant="outline">
            <Receipt className="w-4 h-4 mr-2" />
            Báo cáo tài chính
          </Button>
        </div>

        {/* Financial Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Doanh thu tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">₫2.4B</div>
              <div className="flex items-center text-xs text-medical-green">
                <TrendingUp className="w-3 h-3 mr-1" />
                +23% từ tháng trước
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chi phí tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">₫1.8B</div>
              <div className="flex items-center text-xs text-medical-red">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% từ tháng trước
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Lợi nhuận</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">₫600M</div>
              <div className="flex items-center text-xs text-medical-green">
                <TrendingUp className="w-3 h-3 mr-1" />
                +35% từ tháng trước
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Công nợ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-orange">₫125M</div>
              <div className="flex items-center text-xs text-medical-green">
                <TrendingDown className="w-3 h-3 mr-1" />
                -8% từ tháng trước
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-green">Giao dịch gần đây</CardTitle>
            <CardDescription>Danh sách các giao dịch thu chi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-medical-green-light' : 'bg-medical-red-light'
                    }`}>
                      <DollarSign className={`w-6 h-6 ${
                        transaction.type === 'income' ? 'text-medical-green' : 'text-medical-red'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {transaction.patient || transaction.description}
                        </h3>
                        <Badge variant="outline">{transaction.id}</Badge>
                        {transaction.patientId && (
                          <Badge variant="outline">{transaction.patientId}</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{transaction.service || transaction.category}</span>
                        <span>{transaction.date}</span>
                        {transaction.paymentMethod && (
                          <Badge variant="secondary">{transaction.paymentMethod}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        transaction.type === 'income' ? 'text-medical-green' : 'text-medical-red'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount}đ
                      </div>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                      </Badge>
                    </div>
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

export default FinancePage;
