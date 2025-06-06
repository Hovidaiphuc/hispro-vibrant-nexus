import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, Stethoscope, Pill, Edit, Download, Printer } from "lucide-react";
import ClinicalOrders from './ClinicalOrders';
import ClinicalResults from './ClinicalResults';
import PrescriptionSection from './PrescriptionSection';
import ServiceOrders from './ServiceOrders';

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
  symptoms?: string;
  treatment?: string;
  notes?: string;
  vitals?: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
  };
}

interface MedicalRecordDetailProps {
  record: MedicalRecord;
  onEdit: () => void;
  onClose: () => void;
}

const MedicalRecordDetail = ({ record, onEdit, onClose }: MedicalRecordDetailProps) => {
  // Sample data for the new components
  const sampleClinicalOrders = [
    {
      id: "CO001",
      type: "lab" as const,
      name: "Xét nghiệm máu tổng quát",
      orderBy: "BS. Trần Thị Bình",
      orderDate: "2025-05-28",
      status: "completed" as const,
      priority: "normal" as const,
      notes: "Kiểm tra tình trạng sức khỏe tổng quát"
    },
    {
      id: "CO002",
      type: "imaging" as const,
      name: "Chụp X-quang ngực",
      orderBy: "BS. Trần Thị Bình",
      orderDate: "2025-05-28",
      status: "pending" as const,
      priority: "normal" as const
    }
  ];

  const sampleClinicalResults = [
    {
      id: "CR001",
      testName: "Xét nghiệm máu tổng quát",
      type: "lab" as const,
      resultDate: "2025-05-28",
      status: "normal" as const,
      values: [
        { parameter: "Hồng cầu", value: "4.5", reference: "4.0-5.5", unit: "M/μL" },
        { parameter: "Bạch cầu", value: "7.2", reference: "4.5-11.0", unit: "K/μL" },
        { parameter: "Hemoglobin", value: "14.2", reference: "12.0-16.0", unit: "g/dL" }
      ],
      interpretation: "Các chỉ số máu trong giới hạn bình thường"
    }
  ];

  const samplePrescriptions = [
    {
      id: "PR001",
      prescribedBy: "BS. Trần Thị Bình",
      prescribedDate: "2025-05-28",
      status: "active" as const,
      medications: [
        {
          id: "M001",
          name: "Amlodipine",
          dosage: "5mg",
          frequency: "1 lần/ngày",
          duration: "30 ngày",
          quantity: "30 viên",
          instructions: "Uống sau ăn",
          route: "Đường uống",
          warnings: ["Tránh uống cùng grapefruit"]
        },
        {
          id: "M002",
          name: "Vitamin D3",
          dosage: "1000IU",
          frequency: "1 lần/ngày",
          duration: "30 ngày",
          quantity: "30 viên",
          instructions: "Uống với bữa ăn",
          route: "Đường uống"
        }
      ],
      notes: "Theo dõi huyết áp hàng tuần"
    }
  ];

  const sampleServiceOrders = [
    {
      id: "SO001",
      serviceName: "Khám tim mạch chuyên sâu",
      category: "consultation" as const,
      orderBy: "BS. Trần Thị Bình",
      orderDate: "2025-05-28",
      scheduledDate: "2025-06-05",
      status: "scheduled" as const,
      priority: "normal" as const,
      cost: "350,000",
      department: "Tim mạch",
      notes: "Tái khám sau điều trị tăng huyết áp"
    }
  ];

  const handleAddClinicalOrder = () => {
    console.log('Add clinical order');
  };

  const handleViewClinicalResult = (result: any) => {
    console.log('View clinical result:', result);
  };

  const handleAddPrescription = () => {
    console.log('Add prescription');
  };

  const handleViewPrescription = (prescription: any) => {
    console.log('View prescription:', prescription);
  };

  const handleAddServiceOrder = () => {
    console.log('Add service order');
  };

  const handleViewServiceOrder = (order: any) => {
    console.log('View service order:', order);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-medical-green-light rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-medical-green" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-medical-blue">Chi tiết hồ sơ bệnh án</h2>
            <p className="text-gray-600">Mã hồ sơ: {record.id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4 mr-1" />
            Tải xuống
          </Button>
          <Button size="sm" variant="outline">
            <Printer className="w-4 h-4 mr-1" />
            In
          </Button>
          <Button size="sm" onClick={onEdit} className="bg-medical-green hover:bg-medical-green/90">
            <Edit className="w-4 h-4 mr-1" />
            Chỉnh sửa
          </Button>
        </div>
      </div>

      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-medical-blue">
            <User className="w-5 h-5 mr-2" />
            Thông tin bệnh nhân
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Họ và tên:</span>
                <p className="font-semibold">{record.patient}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Mã bệnh nhân:</span>
                <p className="font-semibold">{record.patientId}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Ngày khám:</span>
                <p className="font-semibold">{record.date}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Loại khám:</span>
                <Badge variant="secondary">{record.type}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-medical-green">
            <Stethoscope className="w-5 h-5 mr-2" />
            Thông tin y tế
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-sm font-medium text-gray-600">Bác sĩ khám:</span>
                <p className="font-semibold text-medical-blue">{record.doctor}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Khoa/Phòng:</span>
                <p className="font-semibold">{record.department}</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Chẩn đoán:</span>
              <p className="font-semibold text-medical-green">{record.diagnosis}</p>
            </div>
            {record.symptoms && (
              <div>
                <span className="text-sm font-medium text-gray-600">Triệu chứng:</span>
                <p className="mt-1 text-gray-800">{record.symptoms}</p>
              </div>
            )}
            {record.treatment && (
              <div>
                <span className="text-sm font-medium text-gray-600">Phương pháp điều trị:</span>
                <p className="mt-1 text-gray-800">{record.treatment}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs */}
      {record.vitals && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-medical-orange">
              <Pill className="w-5 h-5 mr-2" />
              Chỉ số sinh hiệu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-medical-blue-light rounded-lg">
                <p className="text-xs text-gray-600">Huyết áp</p>
                <p className="font-bold text-medical-blue">{record.vitals.bloodPressure}</p>
              </div>
              <div className="text-center p-3 bg-medical-green-light rounded-lg">
                <p className="text-xs text-gray-600">Nhịp tim</p>
                <p className="font-bold text-medical-green">{record.vitals.heartRate}</p>
              </div>
              <div className="text-center p-3 bg-medical-orange-light rounded-lg">
                <p className="text-xs text-gray-600">Nhiệt độ</p>
                <p className="font-bold text-medical-orange">{record.vitals.temperature}</p>
              </div>
              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <p className="text-xs text-gray-600">Cân nặng</p>
                <p className="font-bold text-gray-700">{record.vitals.weight}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Clinical Orders */}
      <ClinicalOrders 
        orders={sampleClinicalOrders}
        onAddOrder={handleAddClinicalOrder}
      />

      {/* Clinical Results */}
      <ClinicalResults 
        results={sampleClinicalResults}
        onViewResult={handleViewClinicalResult}
      />

      {/* Prescriptions */}
      <PrescriptionSection 
        prescriptions={samplePrescriptions}
        onAddPrescription={handleAddPrescription}
        onViewPrescription={handleViewPrescription}
      />

      {/* Service Orders */}
      <ServiceOrders 
        orders={sampleServiceOrders}
        onAddOrder={handleAddServiceOrder}
        onViewOrder={handleViewServiceOrder}
      />

      {/* Notes */}
      {record.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-700">Ghi chú</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-800">{record.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Status */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-600">Trạng thái hồ sơ:</span>
        <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
          {record.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
        </Badge>
      </div>
    </div>
  );
};

export default MedicalRecordDetail;
