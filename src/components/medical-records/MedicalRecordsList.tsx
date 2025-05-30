
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, User, Eye } from "lucide-react";

interface MedicalRecord {
  id: string;
  patient: string;
  patientId: string;
  diagnosis: string;
  doctor: string;
  department: string;
  date: string;
  status: string;
  type: string;
}

interface MedicalRecordsListProps {
  records: MedicalRecord[];
  onViewRecord: (record: MedicalRecord) => void;
}

const MedicalRecordsList = ({ records, onViewRecord }: MedicalRecordsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-medical-green">Hồ sơ bệnh án gần đây</CardTitle>
        <CardDescription>Danh sách hồ sơ được cập nhật gần đây</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {records.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-medical-green-light rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-medical-green" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{record.patient}</h3>
                    <Badge variant="outline">{record.patientId}</Badge>
                    <Badge variant="outline">{record.id}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="font-medium text-medical-blue">{record.diagnosis}</span>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {record.doctor}
                    </div>
                    <span>{record.department}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {record.date}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {record.type}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                  {record.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onViewRecord(record)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Xem chi tiết
                </Button>
                <Button size="sm" className="bg-medical-green hover:bg-medical-green/90">
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordsList;
