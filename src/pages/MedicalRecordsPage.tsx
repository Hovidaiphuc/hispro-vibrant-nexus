
import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import MedicalRecordForm from "@/components/medical-records/MedicalRecordForm";
import MedicalRecordDetail from "@/components/medical-records/MedicalRecordDetail";
import MedicalRecordSearch from "@/components/medical-records/MedicalRecordSearch";
import MedicalRecordsStats from "@/components/medical-records/MedicalRecordsStats";
import MedicalRecordsQuickActions from "@/components/medical-records/MedicalRecordsQuickActions";
import MedicalRecordsList from "@/components/medical-records/MedicalRecordsList";
import { useMedicalRecords } from "@/hooks/useMedicalRecords";
import { medicalRecords } from "@/data/medicalRecordsData";

const MedicalRecordsPage = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [records, setRecords] = useState(medicalRecords);
  const { searchFilters, setSearchFilters, handleClearFilters } = useMedicalRecords();

  const handleCreateRecord = async (data: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRecord = {
        ...data,
        id: `HS${String(records.length + 1).padStart(3, '0')}`,
        status: 'pending'
      };
      
      setRecords(prev => [newRecord, ...prev]);
      setShowCreateForm(false);
      
      toast({
        title: "Thành công",
        description: "Hồ sơ bệnh án đã được tạo thành công"
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi tạo hồ sơ",
        variant: "destructive"
      });
    }
  };

  const handleUpdateRecord = async (data: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRecords(prev => prev.map(record => 
        record.id === data.id ? { ...record, ...data } : record
      ));
      
      setShowEditForm(false);
      setSelectedRecord(null);
      
      toast({
        title: "Thành công",
        description: "Hồ sơ bệnh án đã được cập nhật thành công"
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi cập nhật hồ sơ",
        variant: "destructive"
      });
    }
  };

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const handleEditRecord = () => {
    setShowDetailModal(false);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedRecord(null);
  };

  return (
    <Layout 
      title="Hồ sơ Bệnh án" 
      subtitle="Lưu trữ và quản lý hồ sơ điện tử"
    >
      <div className="space-y-6">
        {/* Quick Actions */}
        <MedicalRecordsQuickActions onCreateRecord={() => setShowCreateForm(true)} />

        {/* Medical Records Statistics */}
        <MedicalRecordsStats />

        {/* Search and Filter */}
        <MedicalRecordSearch
          filters={searchFilters}
          onFiltersChange={setSearchFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Medical Records List */}
        <MedicalRecordsList 
          records={records}
          onViewRecord={handleViewRecord}
        />

        {/* Create Medical Record Drawer */}
        <Drawer open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DrawerContent className="max-h-[90vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="text-medical-green">Tạo hồ sơ bệnh án mới</DrawerTitle>
            </DrawerHeader>
            <div className="p-6">
              <MedicalRecordForm
                mode="create"
                onSubmit={handleCreateRecord}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          </DrawerContent>
        </Drawer>

        {/* Edit Medical Record Drawer */}
        <Drawer open={showEditForm} onOpenChange={setShowEditForm}>
          <DrawerContent className="max-h-[90vh] overflow-y-auto">
            <DrawerHeader>
              <DrawerTitle className="text-medical-blue">Chỉnh sửa hồ sơ bệnh án</DrawerTitle>
            </DrawerHeader>
            <div className="p-6">
              <MedicalRecordForm
                mode="edit"
                initialData={selectedRecord}
                onSubmit={handleUpdateRecord}
                onCancel={handleCloseEditForm}
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
