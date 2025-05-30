
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Calendar, User, Stethoscope, X } from "lucide-react";

interface SearchFilters {
  searchTerm: string;
  department: string;
  doctor: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  recordType: string;
}

interface MedicalRecordSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

const MedicalRecordSearch = ({ filters, onFiltersChange, onClearFilters }: MedicalRecordSearchProps) => {
  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm theo tên bệnh nhân, mã hồ sơ, chẩn đoán..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="whitespace-nowrap">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
            {hasActiveFilters && (
              <Button variant="outline" onClick={onClearFilters}>
                <X className="w-4 h-4 mr-2" />
                Xóa bộ lọc
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Khoa/Phòng</label>
              <Select value={filters.department} onValueChange={(value) => handleFilterChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả khoa</SelectItem>
                  <SelectItem value="cardiology">Tim mạch</SelectItem>
                  <SelectItem value="internal">Nội khoa</SelectItem>
                  <SelectItem value="surgery">Ngoại khoa</SelectItem>
                  <SelectItem value="emergency">Cấp cứu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Bác sĩ</label>
              <Select value={filters.doctor} onValueChange={(value) => handleFilterChange('doctor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả bác sĩ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả bác sĩ</SelectItem>
                  <SelectItem value="dr1">BS. Trần Thị Bình</SelectItem>
                  <SelectItem value="dr2">BS. Nguyễn Văn Dũng</SelectItem>
                  <SelectItem value="dr3">BS. Phạm Thị Giang</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Trạng thái</label>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="completed">Hoàn thành</SelectItem>
                  <SelectItem value="pending">Đang xử lý</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Loại hồ sơ</label>
              <Select value={filters.recordType} onValueChange={(value) => handleFilterChange('recordType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="general">Khám tổng quát</SelectItem>
                  <SelectItem value="specialist">Khám chuyên khoa</SelectItem>
                  <SelectItem value="emergency">Khám cấp cứu</SelectItem>
                  <SelectItem value="follow">Tái khám</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Từ ngày</label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 mb-1 block">Đến ngày</label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordSearch;
