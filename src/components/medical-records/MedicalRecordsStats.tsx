
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MedicalRecordsStats = () => {
  return (
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
  );
};

export default MedicalRecordsStats;
