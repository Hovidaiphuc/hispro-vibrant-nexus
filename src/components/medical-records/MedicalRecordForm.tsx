
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UserIcon, ClipboardIcon } from "lucide-react";
import ClinicalOrders from './ClinicalOrders';
import ClinicalResults from './ClinicalResults';
import PrescriptionSection from './PrescriptionSection';
import ServiceOrders from './ServiceOrders';

interface MedicalRecordFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const MedicalRecordForm = ({ onSubmit, onCancel }: MedicalRecordFormProps) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    age: '',
    gender: '',
    phone: '',
    doctor: '',
    department: '',
    diagnosis: '',
    symptoms: '',
    treatment: '',
    examDate: '',
    recordType: '',
    notes: ''
  });

  const [clinicalOrders, setClinicalOrders] = useState<any[]>([]);
  const [clinicalResults, setClinicalResults] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [serviceOrders, setServiceOrders] = useState<any[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const completeData = {
      ...formData,
      clinicalOrders,
      clinicalResults,
      prescriptions,
      serviceOrders
    };
    onSubmit(completeData);
  };

  const handleAddClinicalOrder = () => {
    console.log('Thêm chỉ định cận lâm sàng');
    // This would open a modal or form to add clinical orders
  };

  const handleAddPrescription = () => {
    console.log('Thêm đơn thuốc');
    // This would open a modal or form to add prescriptions
  };

  const handleAddServiceOrder = () => {
    console.log('Thêm dịch vụ kỹ thuật');
    // This would open a modal or form to add service orders
  };

  const handleViewResult = (result: any) => {
    console.log('Xem chi tiết kết quả:', result);
    // This would open a modal to view result details
  };

  const handleViewPrescription = (prescription: any) => {
    console.log('Xem chi tiết đơn thuốc:', prescription);
    // This would open a modal to view prescription details
  };

  const handleViewServiceOrder = (order: any) => {
    console.log('Xem chi tiết dịch vụ:', order);
    // This would open a modal to view service order details
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-medical-blue">
            <UserIcon className="w-5 h-5 mr-2" />
            Thông tin bệnh nhân
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientId">Mã bệnh nhân</Label>
              <Input 
                id="patientId" 
                placeholder="VD: BN001" 
                value={formData.patientId}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="patientName">Họ và tên</Label>
              <Input 
                id="patientName" 
                placeholder="Nhập họ tên bệnh nhân" 
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Tuổi</Label>
              <Input 
                id="age" 
                type="number" 
                placeholder="Tuổi" 
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="gender">Giới tính</Label>
              <Select onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input 
                id="phone" 
                placeholder="Số điện thoại" 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-medical-green">
            <ClipboardIcon className="w-5 h-5 mr-2" />
            Thông tin y tế
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctor">Bác sĩ khám</Label>
              <Select onValueChange={(value) => handleInputChange('doctor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bác sĩ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr1">BS. Trần Thị Bình</SelectItem>
                  <SelectItem value="dr2">BS. Nguyễn Văn Dũng</SelectItem>
                  <SelectItem value="dr3">BS. Phạm Thị Giang</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Khoa/Phòng</Label>
              <Select onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Tim mạch</SelectItem>
                  <SelectItem value="internal">Nội khoa</SelectItem>
                  <SelectItem value="surgery">Ngoại khoa</SelectItem>
                  <SelectItem value="emergency">Cấp cứu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="diagnosis">Chẩn đoán</Label>
            <Input 
              id="diagnosis" 
              placeholder="Nhập chẩn đoán" 
              value={formData.diagnosis}
              onChange={(e) => handleInputChange('diagnosis', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="symptoms">Triệu chứng</Label>
            <Textarea 
              id="symptoms" 
              placeholder="Mô tả triệu chứng của bệnh nhân" 
              rows={3} 
              value={formData.symptoms}
              onChange={(e) => handleInputChange('symptoms', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="treatment">Phương pháp điều trị</Label>
            <Textarea 
              id="treatment" 
              placeholder="Mô tả phương pháp điều trị" 
              rows={3} 
              value={formData.treatment}
              onChange={(e) => handleInputChange('treatment', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="examDate">Ngày khám</Label>
              <Input 
                id="examDate" 
                type="date" 
                value={formData.examDate}
                onChange={(e) => handleInputChange('examDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="recordType">Loại hồ sơ</Label>
              <Select onValueChange={(value) => handleInputChange('recordType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Khám tổng quát</SelectItem>
                  <SelectItem value="specialist">Khám chuyên khoa</SelectItem>
                  <SelectItem value="emergency">Khám cấp cứu</SelectItem>
                  <SelectItem value="follow">Tái khám</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Orders */}
      <ClinicalOrders 
        orders={clinicalOrders} 
        onAddOrder={handleAddClinicalOrder} 
      />

      {/* Clinical Results */}
      <ClinicalResults 
        results={clinicalResults} 
        onViewResult={handleViewResult} 
      />

      {/* Prescriptions */}
      <PrescriptionSection 
        prescriptions={prescriptions} 
        onAddPrescription={handleAddPrescription}
        onViewPrescription={handleViewPrescription}
      />

      {/* Service Orders */}
      <ServiceOrders 
        orders={serviceOrders} 
        onAddOrder={handleAddServiceOrder}
        onViewOrder={handleViewServiceOrder}
      />

      {/* Additional Notes */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-medical-orange">Ghi chú thêm</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea 
              id="notes" 
              placeholder="Ghi chú thêm về tình trạng bệnh nhân" 
              rows={4} 
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button type="submit" className="bg-medical-green hover:bg-medical-green/90">
          Lưu hồ sơ
        </Button>
      </div>
    </form>
  );
};

export default MedicalRecordForm;
