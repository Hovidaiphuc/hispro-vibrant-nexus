
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { timeSlots } from "@/constants/appointmentConstants";
import { AppointmentFormData } from "@/hooks/useAppointmentForm";

interface DateTimeFieldsProps {
  formData: AppointmentFormData;
  onInputChange: (field: keyof AppointmentFormData, value: string) => void;
}

export const DateTimeFields = ({ formData, onInputChange }: DateTimeFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="date" className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Ngày hẹn *
        </Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => onInputChange('date', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Giờ hẹn *
        </Label>
        <Select value={formData.time} onValueChange={(value) => onInputChange('time', value)}>
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
    </>
  );
};
