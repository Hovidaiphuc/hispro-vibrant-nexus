
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Activity, Calendar, User, Edit, Trash2, TestTube, Scan, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClinicalOrder {
  id: string;
  type: 'lab' | 'imaging' | 'procedure';
  name: string;
  orderBy: string;
  orderDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'normal' | 'urgent' | 'stat';
  notes?: string;
  department?: string;
  estimatedCost?: string;
}

interface ClinicalOrdersManagerProps {
  orders: ClinicalOrder[];
  onOrdersChange: (orders: ClinicalOrder[]) => void;
  doctorName?: string;
}

const ClinicalOrdersManager = ({ orders, onOrdersChange, doctorName }: ClinicalOrdersManagerProps) => {
  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState<ClinicalOrder | null>(null);
  const [orderForm, setOrderForm] = useState({
    type: 'lab' as const,
    name: '',
    priority: 'normal' as const,
    notes: '',
    department: '',
    estimatedCost: ''
  });

  const orderTypes = [
    { value: 'lab', label: 'Xét nghiệm', icon: TestTube, color: 'text-medical-blue' },
    { value: 'imaging', label: 'Chẩn đoán hình ảnh', icon: Scan, color: 'text-medical-green' },
    { value: 'procedure', label: 'Thủ thuật', icon: Stethoscope, color: 'text-medical-orange' }
  ];

  const commonOrders = {
    lab: [
      'Xét nghiệm máu tổng quát',
      'Xét nghiệm sinh hóa máu',
      'Xét nghiệm nước tiểu',
      'Xét nghiệm vi khuẩn',
      'Xét nghiệm hormone',
      'Xét nghiệm men gan'
    ],
    imaging: [
      'Chụp X-quang ngực',
      'Siêu âm bụng',
      'CT Scanner',
      'MRI',
      'Chụp X-quang xương khớp',
      'Siêu âm tim'
    ],
    procedure: [
      'Nội soi dạ dày',
      'Sinh thiết',
      'Đo điện tim',
      'Đo huyết áp 24h',
      'Thăm dò chức năng phổi',
      'Chọc dò tủy sống'
    ]
  };

  const resetForm = () => {
    setOrderForm({
      type: 'lab',
      name: '',
      priority: 'normal',
      notes: '',
      department: '',
      estimatedCost: ''
    });
  };

  const handleAddOrder = () => {
    if (!orderForm.name.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên chỉ định",
        variant: "destructive"
      });
      return;
    }

    const newOrder: ClinicalOrder = {
      id: `CO${Date.now()}`,
      type: orderForm.type,
      name: orderForm.name,
      orderBy: doctorName || "BS. Chưa xác định",
      orderDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      priority: orderForm.priority,
      notes: orderForm.notes,
      department: orderForm.department,
      estimatedCost: orderForm.estimatedCost
    };

    const updatedOrders = [...orders, newOrder];
    onOrdersChange(updatedOrders);
    
    toast({
      title: "Thành công",
      description: `Đã thêm chỉ định: ${orderForm.name}`
    });

    resetForm();
    setShowAddDialog(false);
  };

  const handleEditOrder = (order: ClinicalOrder) => {
    setEditingOrder(order);
    setOrderForm({
      type: order.type,
      name: order.name,
      priority: order.priority,
      notes: order.notes || '',
      department: order.department || '',
      estimatedCost: order.estimatedCost || ''
    });
    setShowAddDialog(true);
  };

  const handleUpdateOrder = () => {
    if (!editingOrder || !orderForm.name.trim()) return;

    const updatedOrders = orders.map(order => 
      order.id === editingOrder.id 
        ? {
            ...order,
            type: orderForm.type,
            name: orderForm.name,
            priority: orderForm.priority,
            notes: orderForm.notes,
            department: orderForm.department,
            estimatedCost: orderForm.estimatedCost
          }
        : order
    );

    onOrdersChange(updatedOrders);
    
    toast({
      title: "Thành công",
      description: "Đã cập nhật chỉ định"
    });

    resetForm();
    setEditingOrder(null);
    setShowAddDialog(false);
  };

  const handleDeleteOrder = (orderId: string) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    onOrdersChange(updatedOrders);
    
    toast({
      title: "Thành công",
      description: "Đã xóa chỉ định"
    });
  };

  const handleQuickAdd = (type: 'lab' | 'imaging' | 'procedure', name: string) => {
    setOrderForm({
      type,
      name,
      priority: 'normal',
      notes: '',
      department: '',
      estimatedCost: ''
    });
    setShowAddDialog(true);
  };

  const getTypeInfo = (type: string) => {
    return orderTypes.find(t => t.value === type) || orderTypes[0];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-medical-green';
      case 'in-progress': return 'bg-medical-orange';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'stat': return 'text-red-600 bg-red-50';
      case 'urgent': return 'text-orange-600 bg-orange-50';
      case 'normal': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-medical-blue">
            <Activity className="w-5 h-5 mr-2" />
            Chỉ định cận lâm sàng
          </CardTitle>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-medical-blue hover:bg-medical-blue/90">
                <Plus className="w-4 h-4 mr-1" />
                Thêm chỉ định
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingOrder ? 'Chỉnh sửa chỉ định' : 'Thêm chỉ định cận lâm sàng'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Loại chỉ định</Label>
                  <Select 
                    value={orderForm.type} 
                    onValueChange={(value: 'lab' | 'imaging' | 'procedure') => 
                      setOrderForm(prev => ({ ...prev, type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {orderTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            <type.icon className={`w-4 h-4 mr-2 ${type.color}`} />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tên chỉ định</Label>
                  <Input
                    value={orderForm.name}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nhập tên chỉ định"
                  />
                  
                  {/* Quick select buttons */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">Chọn nhanh:</p>
                    <div className="flex flex-wrap gap-1">
                      {commonOrders[orderForm.type].map((commonOrder) => (
                        <Button
                          key={commonOrder}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setOrderForm(prev => ({ ...prev, name: commonOrder }))}
                          className="text-xs"
                        >
                          {commonOrder}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Mức độ ưu tiên</Label>
                    <Select 
                      value={orderForm.priority} 
                      onValueChange={(value: 'normal' | 'urgent' | 'stat') => 
                        setOrderForm(prev => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Bình thường</SelectItem>
                        <SelectItem value="urgent">Khẩn cấp</SelectItem>
                        <SelectItem value="stat">Cấp cứu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Khoa thực hiện</Label>
                    <Input
                      value={orderForm.department}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="VD: Khoa xét nghiệm"
                    />
                  </div>
                </div>

                <div>
                  <Label>Chi phí ước tính</Label>
                  <Input
                    value={orderForm.estimatedCost}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, estimatedCost: e.target.value }))}
                    placeholder="VD: 150,000 VNĐ"
                  />
                </div>

                <div>
                  <Label>Ghi chú</Label>
                  <Textarea
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Ghi chú thêm về chỉ định..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowAddDialog(false);
                      setEditingOrder(null);
                      resetForm();
                    }}
                  >
                    Hủy
                  </Button>
                  <Button 
                    type="button" 
                    onClick={editingOrder ? handleUpdateOrder : handleAddOrder}
                    className="bg-medical-green hover:bg-medical-green/90"
                  >
                    {editingOrder ? 'Cập nhật' : 'Thêm chỉ định'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Quick Add Buttons */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Chỉ định nhanh:</p>
          <div className="grid grid-cols-3 gap-2">
            {orderTypes.map(type => (
              <div key={type.value} className="space-y-1">
                <div className="flex items-center text-sm font-medium text-gray-600">
                  <type.icon className={`w-4 h-4 mr-1 ${type.color}`} />
                  {type.label}
                </div>
                <div className="flex flex-wrap gap-1">
                  {commonOrders[type.value].slice(0, 3).map(order => (
                    <Button
                      key={order}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAdd(type.value, order)}
                      className="text-xs h-7 px-2"
                    >
                      {order}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {orders.map((order) => {
            const typeInfo = getTypeInfo(order.type);
            return (
              <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <typeInfo.icon className={`w-4 h-4 ${typeInfo.color}`} />
                      <h4 className="font-medium text-gray-900">{order.name}</h4>
                      <Badge variant="outline">{typeInfo.label}</Badge>
                      <Badge 
                        variant="outline" 
                        className={getPriorityColor(order.priority)}
                      >
                        {order.priority === 'stat' ? 'Cấp cứu' : 
                         order.priority === 'urgent' ? 'Khẩn cấp' : 'Bình thường'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-1">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {order.orderBy}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {order.orderDate}
                      </div>
                      {order.department && (
                        <span>Khoa: {order.department}</span>
                      )}
                      {order.estimatedCost && (
                        <span>Chi phí: {order.estimatedCost}</span>
                      )}
                    </div>
                    
                    {order.notes && (
                      <p className="text-sm text-gray-500 mt-1">{order.notes}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status === 'completed' ? 'Hoàn thành' :
                       order.status === 'in-progress' ? 'Đang thực hiện' : 'Chờ thực hiện'}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditOrder(order)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Chưa có chỉ định cận lâm sàng nào</p>
              <p className="text-sm">Sử dụng các nút chỉ định nhanh bên trên để thêm</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalOrdersManager;
