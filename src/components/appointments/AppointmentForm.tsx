import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Phone, FileText, Stethoscope } from "lucide-react";
import { Appointment } from "@/hooks/useAppointments";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Omit<Appointment, 'id'>) => void;
  onUpdate?: (id: number, appointment: Partial<Appointment>) => void;
  appointment?: Appointment | null;
}

const departments = [
  "Tim mạch",
  "Nội khoa", 
  "Ngoại khoa",
  "Sản phụ khoa",
  "Nhi khoa",
  "Mắt",
  "Tai mũi họng",
  "Da liễu",
  "Thần kinh",
  "Ung bướu"
];

const doctors = [
  "BS. Trần Thị Bình",
  "BS. Nguyễn Văn Dũng", 
  "BS. Phạm Thị Giang",
  "BS. Lê Văn Hùng",
  "BS. Hoàng Thị Mai",
  "BS. Vũ Văn Nam",
  "BS. Đặng Thị Oanh"
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00"
];

export const AppointmentForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onUpdate, 
  appointment 
}: AppointmentFormProps) => {
  const [formData, setFormData] = useState({
    patient: '',
    phone: '',
    date: '',
    time: '',
    doctor: '',
    department: '',
    reason: '',
    notes: '',
    status: 'waiting' as Appointment['status']
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        patient: appointment.patient,
        phone: appointment.phone,
        date: appointment.date,
        time: appointment.time,
        doctor: appointment.doctor,
        department: appointment.department,
        reason: appointment.reason || '',
        notes: appointment.notes || '',
        status: appointment.status
      });
    } else {
      setFormData({
        patient: '',
        phone: '',
        date: '',
        time: '',
        doctor: '',
        department: '',
        reason: '',
        notes: '',
        status: 'waiting' as Appointment['status']
      });
    }
  }, [appointment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (appointment && onUpdate) {
      onUpdate(appointment.id, formData);
    } else {
      onSubmit(formData);
    }
    
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-medical-blue flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {appointment ? 'Chỉnh sửa lịch hẹn' : 'Tạo lịch hẹn mới'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Tên bệnh nhân *
              </Label>
              <Input
                id="patient"
                value={formData.patient}
                onChange={(e) => handleInputChange('patient', e.target.value)}
                placeholder="Nhập tên bệnh nhân"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Số điện thoại *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Ngày hẹn *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Giờ hẹn *
              </Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giờ hẹn" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Khoa *
              </Label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoa" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Bác sĩ *</Label>
              <Select value={formData.doctor} onValueChange={(value) => handleInputChange('doctor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bác sĩ" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Lý do khám
            </Label>
            <Input
              id="reason"
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              placeholder="Nhập lý do khám bệnh"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Nhập ghi chú thêm (nếu có)"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" className="bg-medical-blue hover:bg-medical-blue-dark">
              {appointment ? 'Cập nhật' : 'Tạo lịch hẹn'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
