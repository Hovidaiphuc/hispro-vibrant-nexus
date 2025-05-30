
import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import MedicalRecordForm from "@/components/medical-records/MedicalRecordForm";
import MedicalRecordDetail from "@/components/medical-records/MedicalRecordDetail";
import MedicalRecordSearch from "@/components/medical-records/MedicalRecordSearch";
import MedicalRecordsStats from "@/components/medical-records/MedicalRecordsStats";
import MedicalRecordsQuickActions from "@/components/medical-records/MedicalRecordsQuickActions";
import MedicalRecordsList from "@/components/medical-records/MedicalRecordsList";
import { useMedicalRecords } from "@/hooks/useMedicalRecords";
import { medicalRecords } from "@/data/medicalRecordsData";

const MedicalRecordsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const { searchFilters, setSearchFilters, handleClearFilters } = useMedicalRecords();

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
          records={medicalRecords}
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
