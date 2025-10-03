'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  TimeEntry,
  Timesheet,
  LeaveRequest,
  mockTimeEntries,
  mockTimesheets,
  mockLeaveRequests,
} from '@/data/timeEntries';

// Action types
type TimeTrackingAction =
  | { type: 'SET_TIME_ENTRIES'; payload: TimeEntry[] }
  | { type: 'SET_TIMESHEETS'; payload: Timesheet[] }
  | { type: 'SET_LEAVE_REQUESTS'; payload: LeaveRequest[] }
  | { type: 'ADD_TIME_ENTRY'; payload: TimeEntry }
  | { type: 'UPDATE_TIME_ENTRY'; payload: TimeEntry }
  | { type: 'ADD_TIMESHEET'; payload: Timesheet }
  | { type: 'UPDATE_TIMESHEET'; payload: Timesheet }
  | { type: 'ADD_LEAVE_REQUEST'; payload: LeaveRequest }
  | { type: 'UPDATE_LEAVE_REQUEST'; payload: LeaveRequest }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// State interface
interface TimeTrackingState {
  timeEntries: TimeEntry[];
  timesheets: Timesheet[];
  leaveRequests: LeaveRequest[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TimeTrackingState = {
  timeEntries: mockTimeEntries,
  timesheets: mockTimesheets,
  leaveRequests: mockLeaveRequests,
  loading: false,
  error: null,
};

// Reducer
const timeTrackingReducer = (
  state: TimeTrackingState,
  action: TimeTrackingAction
): TimeTrackingState => {
  switch (action.type) {
    case 'SET_TIME_ENTRIES':
      return {
        ...state,
        timeEntries: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_TIMESHEETS':
      return {
        ...state,
        timesheets: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_LEAVE_REQUESTS':
      return {
        ...state,
        leaveRequests: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_TIME_ENTRY':
      return {
        ...state,
        timeEntries: [...state.timeEntries, action.payload],
        loading: false,
        error: null,
      };
    case 'UPDATE_TIME_ENTRY':
      return {
        ...state,
        timeEntries: state.timeEntries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
        ),
        loading: false,
        error: null,
      };
    case 'ADD_TIMESHEET':
      return {
        ...state,
        timesheets: [...state.timesheets, action.payload],
        loading: false,
        error: null,
      };
    case 'UPDATE_TIMESHEET':
      return {
        ...state,
        timesheets: state.timesheets.map(sheet =>
          sheet.id === action.payload.id ? action.payload : sheet
        ),
        loading: false,
        error: null,
      };
    case 'ADD_LEAVE_REQUEST':
      return {
        ...state,
        leaveRequests: [...state.leaveRequests, action.payload],
        loading: false,
        error: null,
      };
    case 'UPDATE_LEAVE_REQUEST':
      return {
        ...state,
        leaveRequests: state.leaveRequests.map(request =>
          request.id === action.payload.id ? action.payload : request
        ),
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Context interface
interface TimeTrackingContextType {
  state: TimeTrackingState;
  dispatch: React.Dispatch<TimeTrackingAction>;
  // Helper functions
  getTimeEntriesByEmployee: (employeeId: number) => TimeEntry[];
  getTimeEntriesByDate: (date: string) => TimeEntry[];
  getTimeEntriesByStatus: (status: TimeEntry['status']) => TimeEntry[];
  getTimesheetByEmployee: (
    employeeId: number,
    weekStart: string
  ) => Timesheet | undefined;
  getPendingTimesheets: () => Timesheet[];
  getLeaveRequestsByEmployee: (employeeId: number) => LeaveRequest[];
  getPendingLeaveRequests: () => LeaveRequest[];
  getLeaveRequestsByStatus: (status: LeaveRequest['status']) => LeaveRequest[];
  addTimeEntry: (
    entry: Omit<TimeEntry, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateTimeEntry: (id: number, updates: Partial<TimeEntry>) => void;
  addTimesheet: (
    timesheet: Omit<Timesheet, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateTimesheet: (id: number, updates: Partial<Timesheet>) => void;
  addLeaveRequest: (
    request: Omit<LeaveRequest, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateLeaveRequest: (id: number, updates: Partial<LeaveRequest>) => void;
}

// Create context
const TimeTrackingContext = createContext<TimeTrackingContextType | undefined>(
  undefined
);

// Provider component
interface TimeTrackingProviderProps {
  children: ReactNode;
}

export const TimeTrackingProvider: React.FC<TimeTrackingProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(timeTrackingReducer, initialState);

  // Helper functions
  const getTimeEntriesByEmployee = (employeeId: number): TimeEntry[] => {
    return state.timeEntries.filter(entry => entry.employeeId === employeeId);
  };

  const getTimeEntriesByDate = (date: string): TimeEntry[] => {
    return state.timeEntries.filter(entry => entry.date === date);
  };

  const getTimeEntriesByStatus = (status: TimeEntry['status']): TimeEntry[] => {
    return state.timeEntries.filter(entry => entry.status === status);
  };

  const getTimesheetByEmployee = (
    employeeId: number,
    weekStart: string
  ): Timesheet | undefined => {
    return state.timesheets.find(
      sheet => sheet.employeeId === employeeId && sheet.weekStart === weekStart
    );
  };

  const getPendingTimesheets = (): Timesheet[] => {
    return state.timesheets.filter(sheet => sheet.status === 'submitted');
  };

  const getLeaveRequestsByEmployee = (employeeId: number): LeaveRequest[] => {
    return state.leaveRequests.filter(
      request => request.employeeId === employeeId
    );
  };

  const getPendingLeaveRequests = (): LeaveRequest[] => {
    return state.leaveRequests.filter(request => request.status === 'pending');
  };

  const getLeaveRequestsByStatus = (
    status: LeaveRequest['status']
  ): LeaveRequest[] => {
    return state.leaveRequests.filter(request => request.status === status);
  };

  const addTimeEntry = (
    entryData: Omit<TimeEntry, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newEntry: TimeEntry = {
      ...entryData,
      id: Math.max(...state.timeEntries.map(e => e.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TIME_ENTRY', payload: newEntry });
  };

  const updateTimeEntry = (id: number, updates: Partial<TimeEntry>) => {
    const existingEntry = state.timeEntries.find(entry => entry.id === id);
    if (existingEntry) {
      const updatedEntry: TimeEntry = {
        ...existingEntry,
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_TIME_ENTRY', payload: updatedEntry });
    }
  };

  const addTimesheet = (
    timesheetData: Omit<Timesheet, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newTimesheet: Timesheet = {
      ...timesheetData,
      id: Math.max(...state.timesheets.map(t => t.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TIMESHEET', payload: newTimesheet });
  };

  const updateTimesheet = (id: number, updates: Partial<Timesheet>) => {
    const existingTimesheet = state.timesheets.find(sheet => sheet.id === id);
    if (existingTimesheet) {
      const updatedTimesheet: Timesheet = {
        ...existingTimesheet,
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_TIMESHEET', payload: updatedTimesheet });
    }
  };

  const addLeaveRequest = (
    requestData: Omit<LeaveRequest, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newRequest: LeaveRequest = {
      ...requestData,
      id: Math.max(...state.leaveRequests.map(r => r.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_LEAVE_REQUEST', payload: newRequest });
  };

  const updateLeaveRequest = (id: number, updates: Partial<LeaveRequest>) => {
    const existingRequest = state.leaveRequests.find(
      request => request.id === id
    );
    if (existingRequest) {
      const updatedRequest: LeaveRequest = {
        ...existingRequest,
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_LEAVE_REQUEST', payload: updatedRequest });
    }
  };

  const value: TimeTrackingContextType = {
    state,
    dispatch,
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

  return (
    <TimeTrackingContext.Provider value={value}>
      {children}
    </TimeTrackingContext.Provider>
  );
};

// Custom hook
export const useTimeTracking = (): TimeTrackingContextType => {
  const context = useContext(TimeTrackingContext);
  if (context === undefined) {
    throw new Error(
      'useTimeTracking must be used within a TimeTrackingProvider'
    );
  }
  return context;
};
