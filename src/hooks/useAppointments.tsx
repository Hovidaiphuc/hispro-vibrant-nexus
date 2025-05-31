
import { useState } from 'react';

export interface Appointment {
  id: number;
  patient: string;
  time: string;
  date: string;
  doctor: string;
  department: string;
  status: 'confirmed' | 'waiting' | 'cancelled' | 'completed';
  phone: string;
  notes?: string;
  reason?: string;
}

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      patient: "Nguyễn Văn An",
      time: "08:30",
      date: "2025-05-30",
      doctor: "BS. Trần Thị Bình",
      department: "Tim mạch",
      status: "confirmed",
      phone: "0123456789",
      reason: "Khám tổng quát",
      notes: "Bệnh nhân có tiền sử cao huyết áp"
    },
    {
      id: 2,
      patient: "Lê Thị Cúc",
      time: "09:00",
      date: "2025-05-30",
      doctor: "BS. Nguyễn Văn Dũng",
      department: "Nội khoa",
      status: "waiting",
      phone: "0987654321",
      reason: "Đau bụng",
      notes: ""
    },
    {
      id: 3,
      patient: "Trần Văn Em",
      time: "09:30",
      date: "2025-05-30",
      doctor: "BS. Phạm Thị Giang",
      department: "Ngoại khoa",
      status: "cancelled",
      phone: "0456789123",
      reason: "Phẫu thuật",
      notes: "Hủy do bệnh nhân không thể đến"
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: Math.max(...appointments.map(a => a.id)) + 1
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (id: number, updatedAppointment: Partial<Appointment>) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment
    ));
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const openForm = (appointment?: Appointment) => {
    setSelectedAppointment(appointment || null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedAppointment(null);
    setIsFormOpen(false);
  };

  const openStatusModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setSelectedAppointment(null);
    setIsStatusModalOpen(false);
  };

  return {
    appointments,
    isFormOpen,
    isStatusModalOpen,
    selectedAppointment,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    openForm,
    closeForm,
    openStatusModal,
    closeStatusModal
  };
};
