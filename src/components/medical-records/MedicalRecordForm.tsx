import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UserIcon, ClipboardIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ClinicalOrders from './ClinicalOrders';
import ClinicalResults from './ClinicalResults';
import PrescriptionSection from './PrescriptionSection';
import ServiceOrders from './ServiceOrders';

interface MedicalRecord {
  id?: string;
  patientId: string;
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  doctor: string;
  department: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
  examDate: string;
  recordType: string;
  notes: string;
  patient?: string;
  date?: string;
  status?: string;
  type?: string;
  vitals?: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
  };
  clinicalOrders?: any[];
  clinicalResults?: any[];
  prescriptions?: any[];
  serviceOrders?: any[];
}

interface MedicalRecordFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: MedicalRecord;
  mode?: 'create' | 'edit';
}

const MedicalRecordForm = ({ onSubmit, onCancel, initialData, mode = 'create' }: MedicalRecordFormProps) => {
  const { toast } = useToast();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load initial data when editing
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        patientId: initialData.patientId || '',
        patientName: initialData.patientName || initialData.patient || '',
        age: initialData.age || '',
        gender: initialData.gender || '',
        phone: initialData.phone || '',
        doctor: initialData.doctor || '',
        department: initialData.department || '',
        diagnosis: initialData.diagnosis || '',
        symptoms: initialData.symptoms || '',
        treatment: initialData.treatment || '',
        examDate: initialData.examDate || initialData.date || '',
        recordType: initialData.recordType || initialData.type || '',
        notes: initialData.notes || ''
      });
      
      setClinicalOrders(initialData.clinicalOrders || []);
      setClinicalResults(initialData.clinicalResults || []);
      setPrescriptions(initialData.prescriptions || []);
      setServiceOrders(initialData.serviceOrders || []);
    }
  }, [initialData, mode]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['patientName', 'doctor', 'department', 'diagnosis', 'examDate'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Thông tin thiếu",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const completeData = {
        ...formData,
        id: initialData?.id,
        clinicalOrders,
        clinicalResults,
        prescriptions,
        serviceOrders,
        status: initialData?.status || 'pending',
        patient: formData.patientName,
        date: formData.examDate,
        type: formData.recordType
      };
      
      await onSubmit(completeData);
      
      toast({
        title: mode === 'create' ? "Tạo hồ sơ thành công" : "Cập nhật hồ sơ thành công",
        description: mode === 'create' ? "Hồ sơ bệnh án đã được tạo" : "Hồ sơ bệnh án đã được cập nhật",
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu hồ sơ",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPrescription = () => {
    const newPrescription = {
      id: `PR${Date.now()}`,
      prescribedBy: formData.doctor || "BS. Chưa xác định",
      prescribedDate: new Date().toISOString().split('T')[0],
      status: "active" as const,
      medications: [
        {
          id: `M${Date.now()}`,
          name: "Thuốc mới",
          dosage: "5mg",
          frequency: "1 lần/ngày",
          duration: "7 ngày",
          quantity: "7 viên",
          instructions: "Uống sau ăn",
          route: "Đường uống"
        }
      ],
      notes: ""
    };
    setPrescriptions(prev => [...prev, newPrescription]);
    toast({
      title: "Thêm đơn thuốc",
      description: "Đã thêm đơn thuốc mới"
    });
  };

  const handleAddServiceOrder = () => {
    const newServiceOrder = {
      id: `SO${Date.now()}`,
      serviceName: "Dịch vụ mới",
      category: "consultation" as const,
      orderBy: formData.doctor || "BS. Chưa xác định",
      orderDate: new Date().toISOString().split('T')[0],
      status: "ordered" as const,
      priority: "normal" as const,
      cost: "0",
      department: formData.department || "Chưa xác định",
      notes: ""
    };
    setServiceOrders(prev => [...prev, newServiceOrder]);
    toast({
      title: "Thêm dịch vụ",
      description: "Đã thêm dịch vụ kỹ thuật mới"
    });
  };

  const handleViewResult = (result: any) => {
    toast({
      title: "Chi tiết kết quả",
      description: `Xem chi tiết: ${result.testName}`
    });
  };

  const handleViewPrescription = (prescription: any) => {
    toast({
      title: "Chi tiết đơn thuốc",
      description: `Xem chi tiết đơn thuốc: ${prescription.id}`
    });
  };

  const handleViewServiceOrder = (order: any) => {
    toast({
      title: "Chi tiết dịch vụ",
      description: `Xem chi tiết dịch vụ: ${order.serviceName}`
    });
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
              <Label htmlFor="patientName">Họ và tên *</Label>
              <Input 
                id="patientName" 
                placeholder="Nhập họ tên bệnh nhân" 
                value={formData.patientName}
                onChange={(e) => handleInputChange('patientName', e.target.value)}
                required
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
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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
              <Label htmlFor="doctor">Bác sĩ khám *</Label>
              <Select value={formData.doctor} onValueChange={(value) => handleInputChange('doctor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bác sĩ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BS. Trần Thị Bình">BS. Trần Thị Bình</SelectItem>
                  <SelectItem value="BS. Nguyễn Văn Dũng">BS. Nguyễn Văn Dũng</SelectItem>
                  <SelectItem value="BS. Phạm Thị Giang">BS. Phạm Thị Giang</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Khoa/Phòng *</Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tim mạch">Tim mạch</SelectItem>
                  <SelectItem value="Nội khoa">Nội khoa</SelectItem>
                  <SelectItem value="Ngoại khoa">Ngoại khoa</SelectItem>
                  <SelectItem value="Cấp cứu">Cấp cứu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="diagnosis">Chẩn đoán *</Label>
            <Input 
              id="diagnosis" 
              placeholder="Nhập chẩn đoán" 
              value={formData.diagnosis}
              onChange={(e) => handleInputChange('diagnosis', e.target.value)}
              required
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
              <Label htmlFor="examDate">Ngày khám *</Label>
              <Input 
                id="examDate" 
                type="date" 
                value={formData.examDate}
                onChange={(e) => handleInputChange('examDate', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="recordType">Loại hồ sơ</Label>
              <Select value={formData.recordType} onValueChange={(value) => handleInputChange('recordType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Khám tổng quát">Khám tổng quát</SelectItem>
                  <SelectItem value="Khám chuyên khoa">Khám chuyên khoa</SelectItem>
                  <SelectItem value="Khám cấp cứu">Khám cấp cứu</SelectItem>
                  <SelectItem value="Tái khám">Tái khám</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Orders - Now with enhanced functionality */}
      <ClinicalOrders 
        orders={clinicalOrders} 
        onOrdersChange={setClinicalOrders}
        doctorName={formData.doctor}
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
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy bỏ
        </Button>
        <Button 
          type="submit" 
          className="bg-medical-green hover:bg-medical-green/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang lưu..." : (mode === 'create' ? "Lưu hồ sơ" : "Cập nhật hồ sơ")}
        </Button>
      </div>
    </form>
  );
};

export default MedicalRecordForm;
