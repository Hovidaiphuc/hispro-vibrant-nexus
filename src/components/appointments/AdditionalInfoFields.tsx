
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { AppointmentFormData } from "@/hooks/useAppointmentForm";

interface AdditionalInfoFieldsProps {
  formData: AppointmentFormData;
  onInputChange: (field: keyof AppointmentFormData, value: string) => void;
}

export const AdditionalInfoFields = ({ formData, onInputChange }: AdditionalInfoFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="reason" className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Lý do khám
        </Label>
        <Input
          id="reason"
          value={formData.reason}
          onChange={(e) => onInputChange('reason', e.target.value)}
          placeholder="Nhập lý do khám bệnh"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Ghi chú</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => onInputChange('notes', e.target.value)}
          placeholder="Nhập ghi chú thêm (nếu có)"
          rows={3}
        />
      </div>
    </>
  );
};
