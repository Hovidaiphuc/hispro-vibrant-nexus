
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, Plus, Calendar, Clock, AlertCircle } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: string;
  instructions: string;
  route: string;
  warnings?: string[];
}

interface Prescription {
  id: string;
  prescribedBy: string;
  prescribedDate: string;
  status: 'active' | 'completed' | 'discontinued';
  medications: Medication[];
  notes?: string;
}

interface PrescriptionSectionProps {
  prescriptions: Prescription[];
  onAddPrescription: () => void;
  onViewPrescription: (prescription: Prescription) => void;
}

const PrescriptionSection = ({ prescriptions, onAddPrescription, onViewPrescription }: PrescriptionSectionProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-medical-green';
      case 'completed': return 'bg-gray-500';
      case 'discontinued': return 'bg-medical-red';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Đang sử dụng';
      case 'completed': return 'Đã hoàn thành';
      case 'discontinued': return 'Đã ngừng';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-medical-orange">
            <Pill className="w-5 h-5 mr-2" />
            Đơn thuốc
          </CardTitle>
          <Button size="sm" onClick={onAddPrescription} className="bg-medical-orange hover:bg-medical-orange/90">
            <Plus className="w-4 h-4 mr-1" />
            Kê đơn thuốc
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">Đơn thuốc #{prescription.id}</h4>
                    <Badge className={getStatusColor(prescription.status)}>
                      {getStatusLabel(prescription.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>Kê bởi: {prescription.prescribedBy}</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {prescription.prescribedDate}
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onViewPrescription(prescription)}
                >
                  Chi tiết
                </Button>
              </div>
              
              <div className="space-y-2">
                <h5 className="font-medium text-gray-800">Danh sách thuốc:</h5>
                {prescription.medications.slice(0, 3).map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-medical-orange">{med.name}</span>
                        {med.warnings && med.warnings.length > 0 && (
                          <AlertCircle className="w-4 h-4 text-medical-red" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {med.dosage} - {med.frequency} - {med.duration}
                      </div>
                      <div className="text-xs text-gray-500">
                        {med.route} • {med.instructions}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{med.quantity}</span>
                  </div>
                ))}
                {prescription.medications.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{prescription.medications.length - 3} thuốc khác
                  </p>
                )}
              </div>

              {prescription.notes && (
                <div className="mt-3 p-2 bg-blue-50 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Ghi chú:</strong> {prescription.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
          {prescriptions.length === 0 && (
            <p className="text-gray-500 text-center py-4">Chưa có đơn thuốc nào</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionSection;
