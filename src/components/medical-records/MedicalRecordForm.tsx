
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, UserIcon, ClipboardIcon } from "lucide-react";

interface MedicalRecordFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const MedicalRecordForm = ({ onSubmit, onCancel }: MedicalRecordFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onSubmit({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-medical-blue">
            <UserIcon className="w-5 h-5 mr-2" />
            Thông tin bệnh nhân
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patientId">Mã bệnh nhân</Label>
              <Input id="patientId" placeholder="VD: BN001" />
            </div>
            <div>
              <Label htmlFor="patientName">Họ và tên</Label>
              <Input id="patientName" placeholder="Nhập họ tên bệnh nhân" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Tuổi</Label>
              <Input id="age" type="number" placeholder="Tuổi" />
            </div>
            <div>
              <Label htmlFor="gender">Giới tính</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input id="phone" placeholder="Số điện thoại" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-medical-green">
            <ClipboardIcon className="w-5 h-5 mr-2" />
            Thông tin y tế
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctor">Bác sĩ khám</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bác sĩ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr1">BS. Trần Thị Bình</SelectItem>
                  <SelectItem value="dr2">BS. Nguyễn Văn Dũng</SelectItem>
                  <SelectItem value="dr3">BS. Phạm Thị Giang</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="department">Khoa/Phòng</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Tim mạch</SelectItem>
                  <SelectItem value="internal">Nội khoa</SelectItem>
                  <SelectItem value="surgery">Ngoại khoa</SelectItem>
                  <SelectItem value="emergency">Cấp cứu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="diagnosis">Chẩn đoán</Label>
            <Input id="diagnosis" placeholder="Nhập chẩn đoán" />
          </div>
          <div>
            <Label htmlFor="symptoms">Triệu chứng</Label>
            <Textarea id="symptoms" placeholder="Mô tả triệu chứng của bệnh nhân" rows={3} />
          </div>
          <div>
            <Label htmlFor="treatment">Phương pháp điều trị</Label>
            <Textarea id="treatment" placeholder="Mô tả phương pháp điều trị" rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="examDate">Ngày khám</Label>
              <Input id="examDate" type="date" />
            </div>
            <div>
              <Label htmlFor="recordType">Loại hồ sơ</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Khám tổng quát</SelectItem>
                  <SelectItem value="specialist">Khám chuyên khoa</SelectItem>
                  <SelectItem value="emergency">Khám cấp cứu</SelectItem>
                  <SelectItem value="follow">Tái khám</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Notes */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-medical-orange">Ghi chú thêm</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea id="notes" placeholder="Ghi chú thêm về tình trạng bệnh nhân" rows={4} />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button type="submit" className="bg-medical-green hover:bg-medical-green/90">
          Lưu hồ sơ
        </Button>
      </div>
    </form>
  );
};

export default MedicalRecordForm;
