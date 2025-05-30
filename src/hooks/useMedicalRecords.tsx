
import { useState } from 'react';

export const useMedicalRecords = () => {
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: '',
    department: 'all',
    doctor: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: '',
    recordType: 'all'
  });

  const handleClearFilters = () => {
    setSearchFilters({
      searchTerm: '',
      department: 'all',
      doctor: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: '',
      recordType: 'all'
    });
  };

  return {
    searchFilters,
    setSearchFilters,
    handleClearFilters
  };
};
