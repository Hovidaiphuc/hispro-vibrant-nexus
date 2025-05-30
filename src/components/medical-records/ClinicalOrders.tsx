
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Activity, Calendar, User } from "lucide-react";

interface ClinicalOrder {
  id: string;
  type: 'lab' | 'imaging' | 'procedure';
  name: string;
  orderBy: string;
  orderDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'normal' | 'urgent' | 'stat';
  notes?: string;
}

interface ClinicalOrdersProps {
  orders: ClinicalOrder[];
  onAddOrder: () => void;
}

const ClinicalOrders = ({ orders, onAddOrder }: ClinicalOrdersProps) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab': return 'Xét nghiệm';
      case 'imaging': return 'Chẩn đoán hình ảnh';
      case 'procedure': return 'Thủ thuật';
      default: return type;
    }
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
      case 'stat': return 'text-medical-red';
      case 'urgent': return 'text-medical-orange';
      case 'normal': return 'text-gray-600';
      default: return 'text-gray-600';
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
          <Button size="sm" onClick={onAddOrder} className="bg-medical-blue hover:bg-medical-blue/90">
            <Plus className="w-4 h-4 mr-1" />
            Thêm chỉ định
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
                    <h4 className="font-medium text-gray-900">{order.name}</h4>
                    <Badge variant="outline">{getTypeLabel(order.type)}</Badge>
                    <Badge variant="outline" className={getPriorityColor(order.priority)}>
                      {order.priority === 'stat' ? 'Cấp cứu' : 
                       order.priority === 'urgent' ? 'Khẩn cấp' : 'Bình thường'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {order.orderBy}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {order.orderDate}
                    </div>
                  </div>
                  {order.notes && (
                    <p className="text-sm text-gray-500 mt-1">{order.notes}</p>
                  )}
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status === 'completed' ? 'Hoàn thành' :
                   order.status === 'in-progress' ? 'Đang thực hiện' : 'Chờ thực hiện'}
                </Badge>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-gray-500 text-center py-4">Chưa có chỉ định cận lâm sàng nào</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalOrders;
