
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Phone, Plus, Search, Filter, Edit, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { AppointmentStatusModal } from "@/components/appointments/AppointmentStatusModal";
import { useAppointments } from "@/hooks/useAppointments";
import { useToast } from "@/hooks/use-toast";

const AppointmentsPage = () => {
  const { 
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
  } = useAppointments();

  const { toast } = useToast();

  const handleAddAppointment = (appointmentData: any) => {
    addAppointment(appointmentData);
    toast({
      title: "Thành công",
      description: "Đã tạo lịch hẹn mới"
    });
  };

  const handleUpdateAppointment = (id: number, appointmentData: any) => {
    updateAppointment(id, appointmentData);
    toast({
      title: "Thành công", 
      description: "Đã cập nhật lịch hẹn"
    });
  };

  const handleUpdateStatus = (id: number, status: any, notes?: string) => {
    updateAppointment(id, { status, notes });
    toast({
      title: "Thành công",
      description: "Đã cập nhật trạng thái lịch hẹn"
    });
  };

  const handleDeleteAppointment = (id: number) => {
    deleteAppointment(id);
    toast({
      title: "Thành công",
      description: "Đã xóa lịch hẹn"
    });
  };

  return (
    <Layout 
      title="Quản lý Lịch hẹn" 
      subtitle="Đặt lịch, quản lý thời gian, nhắc nhở tự động"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-medical-blue hover:bg-medical-blue-dark"
            onClick={() => openForm()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo lịch hẹn mới
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Lọc theo ngày
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">
                {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length}
              </div>
              <p className="text-xs text-medical-green">+12% từ hôm qua</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đã xác nhận</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">
                {appointments.filter(a => a.status === 'confirmed').length}
              </div>
              <p className="text-xs text-medical-green">+8% từ tuần trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Đã hủy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">
                {appointments.filter(a => a.status === 'cancelled').length}
              </div>
              <p className="text-xs text-medical-red">-5% từ tuần trước</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hoàn thành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">
                {appointments.filter(a => a.status === 'completed').length}
              </div>
              <p className="text-xs text-medical-green">+15% từ tháng trước</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-blue">Lịch hẹn</CardTitle>
            <CardDescription>Danh sách các cuộc hẹn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-blue-light rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-medical-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {appointment.phone}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{appointment.doctor} - {appointment.department}</p>
                      {appointment.reason && (
                        <p className="text-sm text-gray-500">Lý do: {appointment.reason}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={
                      appointment.status === 'confirmed' ? 'default' :
                      appointment.status === 'waiting' ? 'secondary' : 
                      appointment.status === 'completed' ? 'default' : 'destructive'
                    }>
                      {appointment.status === 'confirmed' ? 'Đã xác nhận' :
                       appointment.status === 'waiting' ? 'Đang chờ' :
                       appointment.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => openForm(appointment)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openStatusModal(appointment)}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Đổi trạng thái
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          className="text-red-600"
                        >
                          Xóa lịch hẹn
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AppointmentForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleAddAppointment}
        onUpdate={handleUpdateAppointment}
        appointment={selectedAppointment}
      />

      <AppointmentStatusModal
        isOpen={isStatusModalOpen}
        onClose={closeStatusModal}
        onUpdateStatus={handleUpdateStatus}
        appointment={selectedAppointment}
      />
    </Layout>
  );
};

export default AppointmentsPage;
