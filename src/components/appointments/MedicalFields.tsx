
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope } from "lucide-react";
import { departments, doctors } from "@/constants/appointmentConstants";
import { AppointmentFormData } from "@/hooks/useAppointmentForm";

interface MedicalFieldsProps {
  formData: AppointmentFormData;
  onInputChange: (field: keyof AppointmentFormData, value: string) => void;
}

export const MedicalFields = ({ formData, onInputChange }: MedicalFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="department" className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4" />
          Khoa *
        </Label>
        <Select value={formData.department} onValueChange={(value) => onInputChange('department', value)}>
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
        <Select value={formData.doctor} onValueChange={(value) => onInputChange('doctor', value)}>
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
    </>
  );
};
