
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Plus, Calendar, Clock, DollarSign, User } from "lucide-react";

interface ServiceOrder {
  id: string;
  serviceName: string;
  category: 'examination' | 'treatment' | 'procedure' | 'consultation';
  orderBy: string;
  orderDate: string;
  scheduledDate?: string;
  status: 'ordered' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'normal' | 'urgent';
  cost: string;
  department: string;
  notes?: string;
}

interface ServiceOrdersProps {
  orders: ServiceOrder[];
  onAddOrder: () => void;
  onViewOrder: (order: ServiceOrder) => void;
}

const ServiceOrders = ({ orders, onAddOrder, onViewOrder }: ServiceOrdersProps) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'examination': return 'Khám bệnh';
      case 'treatment': return 'Điều trị';
      case 'procedure': return 'Thủ thuật';
      case 'consultation': return 'Tư vấn';
      default: return category;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-medical-green';
      case 'in-progress': return 'bg-medical-blue';
      case 'scheduled': return 'bg-medical-orange';
      case 'ordered': return 'bg-gray-500';
      case 'cancelled': return 'bg-medical-red';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ordered': return 'Đã chỉ định';
      case 'scheduled': return 'Đã lên lịch';
      case 'in-progress': return 'Đang thực hiện';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'urgent' ? 'text-medical-red' : 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-medical-blue">
            <Stethoscope className="w-5 h-5 mr-2" />
            Chỉ định dịch vụ kỹ thuật
          </CardTitle>
          <Button size="sm" onClick={onAddOrder} className="bg-medical-blue hover:bg-medical-blue/90">
            <Plus className="w-4 h-4 mr-1" />
            Chỉ định dịch vụ
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{order.serviceName}</h4>
                    <Badge variant="outline">{getCategoryLabel(order.category)}</Badge>
                    <Badge variant="outline" className={getPriorityColor(order.priority)}>
                      {order.priority === 'urgent' ? 'Khẩn cấp' : 'Bình thường'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {order.orderBy}
                    </div>
                    <span>{order.department}</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {order.orderDate}
                    </div>
                  </div>
                  {order.scheduledDate && (
                    <div className="flex items-center space-x-2 text-sm text-medical-blue mt-1">
                      <Clock className="w-4 h-4" />
                      <span>Lịch hẹn: {order.scheduledDate}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-4 text-sm mt-1">
                    <div className="flex items-center text-medical-green">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-medium">{order.cost}đ</span>
                    </div>
                  </div>
                  {order.notes && (
                    <p className="text-sm text-gray-500 mt-1">{order.notes}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onViewOrder(order)}
                  >
                    Chi tiết
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-gray-500 text-center py-4">Chưa có chỉ định dịch vụ kỹ thuật nào</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceOrders;
