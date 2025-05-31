
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Appointment } from "@/hooks/useAppointments";
import { useAppointmentForm } from "@/hooks/useAppointmentForm";
import { PatientInfoFields } from "./PatientInfoFields";
import { DateTimeFields } from "./DateTimeFields";
import { MedicalFields } from "./MedicalFields";
import { AdditionalInfoFields } from "./AdditionalInfoFields";

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: Omit<Appointment, 'id'>) => void;
  onUpdate?: (id: number, appointment: Partial<Appointment>) => void;
  appointment?: Appointment | null;
}

export const AppointmentForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onUpdate, 
  appointment 
}: AppointmentFormProps) => {
  const { formData, handleInputChange } = useAppointmentForm(appointment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (appointment && onUpdate) {
      onUpdate(appointment.id, formData);
    } else {
      onSubmit(formData);
    }
    
    onClose();
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
            <PatientInfoFields formData={formData} onInputChange={handleInputChange} />
            <DateTimeFields formData={formData} onInputChange={handleInputChange} />
            <MedicalFields formData={formData} onInputChange={handleInputChange} />
          </div>

          <AdditionalInfoFields formData={formData} onInputChange={handleInputChange} />

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
