import { usePayroll as usePayrollContext } from '@/context/PayrollContext';
import { PayrollPeriod, PayrollEntry } from '@/data/payroll';

export const usePayroll = () => {
  const {
    state,
    getPeriodById,
    getEntriesByPeriod,
    getEntriesByEmployee,
    getSummaryByPeriod,
    getPendingPeriods,
    getProcessingPeriods,
    getCompletedPeriods,
    addPeriod,
    updatePeriod,
    addEntry,
    updateEntry,
  } = usePayrollContext();

  return {
    periods: state.periods,
    entries: state.entries,
    summaries: state.summaries,
    loading: state.loading,
    error: state.error,
    getPeriodById,
    getEntriesByPeriod,
    getEntriesByEmployee,
    getSummaryByPeriod,
    getPendingPeriods,
    getProcessingPeriods,
    getCompletedPeriods,
    addPeriod,
    updatePeriod,
    addEntry,
    updateEntry,
  };
};

export const usePayrollPeriod = (id: number) => {
  const { getPeriodById } = usePayrollContext();
  return getPeriodById(id);
};

export const usePayrollEntries = (periodId: number) => {
  const { getEntriesByPeriod } = usePayrollContext();
  return getEntriesByPeriod(periodId);
};

export const useEmployeePayroll = (employeeId: number) => {
  const { getEntriesByEmployee } = usePayrollContext();
  return getEntriesByEmployee(employeeId);
};
