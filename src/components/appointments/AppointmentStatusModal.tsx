
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Clock, XCircle, Calendar } from "lucide-react";
import { Appointment } from "@/hooks/useAppointments";

interface AppointmentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: number, status: Appointment['status'], notes?: string) => void;
  appointment: Appointment | null;
}

const statusOptions = [
  {
    value: 'waiting' as const,
    label: 'Đang chờ',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Lịch hẹn đang chờ xác nhận'
  },
  {
    value: 'confirmed' as const,
    label: 'Đã xác nhận',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800',
    description: 'Lịch hẹn đã được xác nhận'
  },
  {
    value: 'completed' as const,
    label: 'Hoàn thành',
    icon: Calendar,
    color: 'bg-blue-100 text-blue-800',
    description: 'Đã hoàn thành khám bệnh'
  },
  {
    value: 'cancelled' as const,
    label: 'Đã hủy',
    icon: XCircle,
    color: 'bg-red-100 text-red-800',
    description: 'Lịch hẹn đã bị hủy'
  }
];

export const AppointmentStatusModal = ({ 
  isOpen, 
  onClose, 
  onUpdateStatus, 
  appointment 
}: AppointmentStatusModalProps) => {
  const [selectedStatus, setSelectedStatus] = useState<Appointment['status'] | null>(null);
  const [notes, setNotes] = useState('');

  const handleUpdateStatus = () => {
    if (appointment && selectedStatus) {
      onUpdateStatus(appointment.id, selectedStatus, notes);
      setSelectedStatus(null);
      setNotes('');
      onClose();
    }
  };

  if (!appointment) return null;

  const currentStatusOption = statusOptions.find(option => option.value === appointment.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-medical-blue">
            Chuyển trạng thái lịch hẹn
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
            <p className="text-sm text-gray-600">
              {appointment.date} lúc {appointment.time}
            </p>
            <p className="text-sm text-gray-600">{appointment.doctor} - {appointment.department}</p>
            <div className="mt-2">
              <Badge className={currentStatusOption?.color}>
                {currentStatusOption?.label}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Chọn trạng thái mới:</Label>
            <div className="grid grid-cols-1 gap-2">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedStatus === option.value;
                const isCurrent = appointment.status === option.value;
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={isCurrent}
                    onClick={() => setSelectedStatus(option.value)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border text-left transition-all
                      ${isCurrent 
                        ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed' 
                        : isSelected
                        ? 'bg-medical-blue-light border-medical-blue text-medical-blue'
                        : 'bg-white border-gray-200 hover:border-medical-blue'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                    {isCurrent && (
                      <Badge variant="secondary" className="ml-auto">Hiện tại</Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedStatus && (
            <div className="space-y-2">
              <Label htmlFor="status-notes">Ghi chú (tùy chọn)</Label>
              <Textarea
                id="status-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Nhập ghi chú về việc thay đổi trạng thái..."
                rows={3}
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button 
              onClick={handleUpdateStatus}
              disabled={!selectedStatus}
              className="bg-medical-blue hover:bg-medical-blue-dark"
            >
              Cập nhật trạng thái
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
