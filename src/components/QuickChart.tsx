
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickChart() {
  const data = [
    { name: "T2", value: 65 },
    { name: "T3", value: 78 },
    { name: "T4", value: 52 },
    { name: "T5", value: 89 },
    { name: "T6", value: 94 },
    { name: "T7", value: 76 },
    { name: "CN", value: 43 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-medical-blue">Lịch hẹn Tuần này</CardTitle>
        <CardDescription>Biểu đồ số lượng lịch hẹn theo ngày</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end space-x-2 h-40">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-gradient-to-t from-medical-blue to-medical-green rounded-t-md transition-all duration-500 hover:from-medical-green hover:to-medical-blue"
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              ></div>
              <span className="text-xs text-gray-600 mt-2 font-medium">{item.name}</span>
              <span className="text-xs text-medical-blue font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
