
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone } from "lucide-react";
import { AppointmentFormData } from "@/hooks/useAppointmentForm";

interface PatientInfoFieldsProps {
  formData: AppointmentFormData;
  onInputChange: (field: keyof AppointmentFormData, value: string) => void;
}

export const PatientInfoFields = ({ formData, onInputChange }: PatientInfoFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="patient" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Tên bệnh nhân *
        </Label>
        <Input
          id="patient"
          value={formData.patient}
          onChange={(e) => onInputChange('patient', e.target.value)}
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
          onChange={(e) => onInputChange('phone', e.target.value)}
          placeholder="Nhập số điện thoại"
          required
        />
      </div>
    </>
  );
};
