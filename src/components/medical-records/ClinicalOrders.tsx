
import React from 'react';
import ClinicalOrdersManager from './ClinicalOrdersManager';

interface ClinicalOrder {
  id: string;
  type: 'lab' | 'imaging' | 'procedure';
  name: string;
  orderBy: string;
  orderDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'normal' | 'urgent' | 'stat';
  notes?: string;
  department?: string;
  estimatedCost?: string;
}

interface ClinicalOrdersProps {
  orders: ClinicalOrder[];
  onAddOrder?: () => void;
  onOrdersChange?: (orders: ClinicalOrder[]) => void;
  doctorName?: string;
}

const ClinicalOrders = ({ orders, onAddOrder, onOrdersChange, doctorName }: ClinicalOrdersProps) => {
  // If onOrdersChange is provided, use the new manager
  if (onOrdersChange) {
    return (
      <ClinicalOrdersManager 
        orders={orders}
        onOrdersChange={onOrdersChange}
        doctorName={doctorName}
      />
    );
  }

  // Fallback to simple display (for backward compatibility)
  return (
    <ClinicalOrdersManager 
      orders={orders}
      onOrdersChange={() => {}}
      doctorName={doctorName}
    />
  );
};

export default ClinicalOrders;
