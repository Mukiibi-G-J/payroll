import { useTimeTracking as useTimeTrackingContext } from '@/context/TimeTrackingContext';
import { TimeEntry, Timesheet, LeaveRequest } from '@/data/timeEntries';

export const useTimeTracking = () => {
  const {
    state,
    getTimeEntriesByEmployee,
    getTimeEntriesByDate,
    getTimeEntriesByStatus,
    getTimesheetByEmployee,
    getPendingTimesheets,
    getLeaveRequestsByEmployee,
    getPendingLeaveRequests,
    getLeaveRequestsByStatus,
    addTimeEntry,
    updateTimeEntry,
    addTimesheet,
    updateTimesheet,
    addLeaveRequest,
    updateLeaveRequest,
  } = useTimeTrackingContext();

  return {
    timeEntries: state.timeEntries,
    timesheets: state.timesheets,
    leaveRequests: state.leaveRequests,
    loading: state.loading,
    error: state.error,
    getTimeEntriesByEmployee,
    getTimeEntriesByDate,
    getTimeEntriesByStatus,
    getTimesheetByEmployee,
    getPendingTimesheets,
    getLeaveRequestsByEmployee,
    getPendingLeaveRequests,
    getLeaveRequestsByStatus,
    addTimeEntry,
    updateTimeEntry,
    addTimesheet,
    updateTimesheet,
    addLeaveRequest,
    updateLeaveRequest,
  };
};

export const useEmployeeTimeEntries = (employeeId: number) => {
  const { getTimeEntriesByEmployee } = useTimeTrackingContext();
  return getTimeEntriesByEmployee(employeeId);
};

export const useDailyTimeEntries = (date: string) => {
  const { getTimeEntriesByDate } = useTimeTrackingContext();
  return getTimeEntriesByDate(date);
};

export const useEmployeeTimesheet = (employeeId: number, weekStart: string) => {
  const { getTimesheetByEmployee } = useTimeTrackingContext();
  return getTimesheetByEmployee(employeeId, weekStart);
};

export const useEmployeeLeaveRequests = (employeeId: number) => {
  const { getLeaveRequestsByEmployee } = useTimeTrackingContext();
  return getLeaveRequestsByEmployee(employeeId);
};
