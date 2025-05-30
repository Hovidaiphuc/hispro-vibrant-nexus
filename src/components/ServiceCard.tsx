
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stats: {
    label: string;
    value: string;
  }[];
  color: string;
  bgColor: string;
}

export function ServiceCard({ title, description, icon: Icon, stats, color, bgColor }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-transparent hover:border-l-medical-blue animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <div className="text-right">
            <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-medical-blue transition-colors">
              {title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-gray-600 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-medical-blue-light transition-colors">
              <p className="text-2xl font-bold text-medical-blue">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
