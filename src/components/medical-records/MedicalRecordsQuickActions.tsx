
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";

interface MedicalRecordsQuickActionsProps {
  onCreateRecord: () => void;
}

const MedicalRecordsQuickActions = ({ onCreateRecord }: MedicalRecordsQuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        className="bg-medical-green hover:bg-medical-green/90"
        onClick={onCreateRecord}
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
  );
};

export default MedicalRecordsQuickActions;
