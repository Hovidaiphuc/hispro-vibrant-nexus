
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, AlertTriangle, CheckCircle, Eye } from "lucide-react";

interface ClinicalResult {
  id: string;
  testName: string;
  type: 'lab' | 'imaging' | 'procedure';
  resultDate: string;
  status: 'normal' | 'abnormal' | 'critical';
  values?: { parameter: string; value: string; reference: string; unit: string }[];
  interpretation?: string;
  attachments?: string[];
}

interface ClinicalResultsProps {
  results: ClinicalResult[];
  onViewResult: (result: ClinicalResult) => void;
}

const ClinicalResults = ({ results, onViewResult }: ClinicalResultsProps) => {
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lab': return 'Xét nghiệm';
      case 'imaging': return 'Chẩn đoán hình ảnh';
      case 'procedure': return 'Thủ thuật';
      default: return type;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-4 h-4 text-medical-green" />;
      case 'abnormal': return <AlertTriangle className="w-4 h-4 text-medical-orange" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-medical-red" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-medical-green';
      case 'abnormal': return 'text-medical-orange';
      case 'critical': return 'text-medical-red';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-medical-green">
          <FileText className="w-5 h-5 mr-2" />
          Kết quả cận lâm sàng
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {results.map((result) => (
            <div key={result.id} className="p-3 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{result.testName}</h4>
                    <Badge variant="outline">{getTypeLabel(result.type)}</Badge>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(result.status)}
                      <span className={`text-sm font-medium ${getStatusColor(result.status)}`}>
                        {result.status === 'normal' ? 'Bình thường' :
                         result.status === 'abnormal' ? 'Bất thường' : 'Nguy hiểm'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {result.resultDate}
                    </div>
                    {result.attachments && result.attachments.length > 0 && (
                      <span>{result.attachments.length} file đính kèm</span>
                    )}
                  </div>
                  {result.interpretation && (
                    <p className="text-sm text-gray-700 mt-1 font-medium">{result.interpretation}</p>
                  )}
                  {result.values && result.values.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {result.values.slice(0, 2).map((value, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center justify-between">
                          <span>{value.parameter}:</span>
                          <span className="font-medium">
                            {value.value} {value.unit} (Tham chiếu: {value.reference})
                          </span>
                        </div>
                      ))}
                      {result.values.length > 2 && (
                        <p className="text-xs text-gray-500">+{result.values.length - 2} chỉ số khác</p>
                      )}
                    </div>
                  )}
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onViewResult(result)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Chi tiết
                </Button>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <p className="text-gray-500 text-center py-4">Chưa có kết quả cận lâm sàng nào</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalResults;
