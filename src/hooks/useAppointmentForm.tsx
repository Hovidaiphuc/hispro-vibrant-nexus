
import { useState, useEffect } from 'react';
import { Appointment } from "@/hooks/useAppointments";

export interface AppointmentFormData {
  patient: string;
  phone: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  reason: string;
  notes: string;
  status: Appointment['status'];
}

export const useAppointmentForm = (appointment?: Appointment | null) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
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

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    handleInputChange
  };
};
