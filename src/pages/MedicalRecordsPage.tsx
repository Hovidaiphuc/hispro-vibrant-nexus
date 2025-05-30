
import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { FileText, Plus, Search, Filter, Calendar, User, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MedicalRecordForm from "@/components/medical-records/MedicalRecordForm";
import MedicalRecordDetail from "@/components/medical-records/MedicalRecordDetail";
import MedicalRecordSearch from "@/components/medical-records/MedicalRecordSearch";

const medicalRecords = [
  {
    id: "HS001",
    patient: "Nguyễn Văn An",
    patientId: "BN001",
    diagnosis: "Tăng huyết áp",
    doctor: "BS. Trần Thị Bình",
    department: "Tim mạch",
    date: "2025-05-28",
    status: "completed",
    type: "Khám tổng quát",
    symptoms: "Đau đầu, chóng mặt, mệt mỏi",
    treatment: "Thuốc hạ huyết áp, chế độ ăn ít muối",
    notes: "Bệnh nhân cần theo dõi huyết áp thường xuyên",
    vitals: {
      bloodPressure: "150/90",
      heartRate: "72 bpm",
      temperature: "36.5°C",
      weight: "70 kg"
    }
  },
  {
    id: "HS002",
    patient: "Lê Thị Cúc",
    patientId: "BN002",
    diagnosis: "Viêm dạ dày",
    doctor: "BS. Nguyễn Văn Dũng",
    department: "Nội khoa",
    date: "2025-05-27",
    status: "pending",
    type: "Khám chuyên khoa",
    symptoms: "Đau bụng, buồn nôn, khó tiêu",
    treatment: "Thuốc bảo vệ dạ dày, chế độ ăn nhẹ",
    vitals: {
      bloodPressure: "120/80",
      heartRate: "68 bpm",
      temperature: "36.8°C",
      weight: "55 kg"
    }
  },
  {
    id: "HS003",
    patient: "Trần Văn Em",
    patientId: "BN003",
    diagnosis: "Gãy xương tay",
    doctor: "BS. Phạm Thị Giang",
    department: "Ngoại khoa",
    date: "2025-05-26",
    status: "completed",
    type: "Khám cấp cứu",
    symptoms: "Đau tay, sưng tấy, không thể cử động",
    treatment: "Nẹp xương, thuốc giảm đau",
    notes: "Tái khám sau 2 tuần",
    vitals: {
      bloodPressure: "130/85",
      heartRate: "75 bpm",
      temperature: "36.2°C",
      weight: "68 kg"
    }
  }
];

const MedicalRecordsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    department: '',
    doctor: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    recordType: ''
  });

  const handleCreateRecord = (data: any) => {
    console.log('Creating new medical record:', data);
    setShowCreateForm(false);
  };

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const handleEditRecord = () => {
    setShowDetailModal(false);
    setShowCreateForm(true);
  };

  const handleClearFilters = () => {
    setSearchFilters({
      searchTerm: '',
      department: '',
      doctor: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      recordType: ''
    });
  };

  return (
    <Layout 
      title="Hồ sơ Bệnh án" 
      subtitle="Lưu trữ và quản lý hồ sơ điện tử"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-medical-green hover:bg-medical-green/90"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo hồ sơ mới
          </Button>
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Tìm kiếm nâng cao
          </Button>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>

        {/* Medical Records Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng hồ sơ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">15,432</div>
              <p className="text-xs text-medical-green">+234 trong tháng</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cập nhật hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-blue">67</div>
              <p className="text-xs text-medical-blue">Hồ sơ được cập nhật</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Chờ xử lý</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-orange">23</div>
              <p className="text-xs text-medical-orange">Cần xem xét</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hoàn thành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-green">15,409</div>
              <p className="text-xs text-medical-green">Đã hoàn tất</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <MedicalRecordSearch
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Medical Records List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-medical-green">Hồ sơ bệnh án gần đây</CardTitle>
            <CardDescription>Danh sách hồ sơ được cập nhật gần đây</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-medical-green-light rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-medical-green" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{record.patient}</h3>
                        <Badge variant="outline">{record.patientId}</Badge>
                        <Badge variant="outline">{record.id}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="font-medium text-medical-blue">{record.diagnosis}</span>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {record.doctor}
                        </div>
                        <span>{record.department}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {record.date}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {record.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={record.status === 'completed' ? 'default' : 'secondary'}>
                      {record.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewRecord(record)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Xem chi tiết
                    </Button>
                    <Button size="sm" className="bg-medical-green hover:bg-medical-green/90">
                      Chỉnh sửa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Medical Record Drawer */}
        <Drawer open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DrawerContent className="max-h-[90vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="text-medical-green">Tạo hồ sơ bệnh án mới</DrawerTitle>
            </DrawerHeader>
            <div className="p-6">
              <MedicalRecordForm
                onSubmit={handleCreateRecord}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>

        {/* Medical Record Detail Dialog */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chi tiết hồ sơ bệnh án</DialogTitle>
            </DialogHeader>
            {selectedRecord && (
              <MedicalRecordDetail
                record={selectedRecord}
                onEdit={handleEditRecord}
                onClose={() => setShowDetailModal(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default MedicalRecordsPage;
