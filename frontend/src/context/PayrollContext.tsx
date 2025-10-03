'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  PayrollPeriod,
  PayrollEntry,
  PayrollSummary,
  mockPayrollPeriods,
  mockPayrollEntries,
  mockPayrollSummaries,
} from '@/data/payroll';

// Action types
type PayrollAction =
  | { type: 'SET_PERIODS'; payload: PayrollPeriod[] }
  | { type: 'SET_ENTRIES'; payload: PayrollEntry[] }
  | { type: 'SET_SUMMARIES'; payload: PayrollSummary[] }
  | { type: 'ADD_PERIOD'; payload: PayrollPeriod }
  | { type: 'UPDATE_PERIOD'; payload: PayrollPeriod }
  | { type: 'ADD_ENTRY'; payload: PayrollEntry }
  | { type: 'UPDATE_ENTRY'; payload: PayrollEntry }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// State interface
interface PayrollState {
  periods: PayrollPeriod[];
  entries: PayrollEntry[];
  summaries: PayrollSummary[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PayrollState = {
  periods: mockPayrollPeriods,
  entries: mockPayrollEntries,
  summaries: mockPayrollSummaries,
  loading: false,
  error: null,
};

// Reducer
const payrollReducer = (
  state: PayrollState,
  action: PayrollAction
): PayrollState => {
  switch (action.type) {
    case 'SET_PERIODS':
      return {
        ...state,
        periods: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_ENTRIES':
      return {
        ...state,
        entries: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_SUMMARIES':
      return {
        ...state,
        summaries: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_PERIOD':
      return {
        ...state,
        periods: [...state.periods, action.payload],
        loading: false,
        error: null,
      };
    case 'UPDATE_PERIOD':
      return {
        ...state,
        periods: state.periods.map(period =>
          period.id === action.payload.id ? action.payload : period
        ),
        loading: false,
        error: null,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
        loading: false,
        error: null,
      };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
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
interface PayrollContextType {
  state: PayrollState;
  dispatch: React.Dispatch<PayrollAction>;
  // Helper functions
  getPeriodById: (id: number) => PayrollPeriod | undefined;
  getEntriesByPeriod: (periodId: number) => PayrollEntry[];
  getEntriesByEmployee: (employeeId: number) => PayrollEntry[];
  getSummaryByPeriod: (periodId: number) => PayrollSummary | undefined;
  getPendingPeriods: () => PayrollPeriod[];
  getProcessingPeriods: () => PayrollPeriod[];
  getCompletedPeriods: () => PayrollPeriod[];
  addPeriod: (
    period: Omit<PayrollPeriod, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updatePeriod: (id: number, updates: Partial<PayrollPeriod>) => void;
  addEntry: (
    entry: Omit<PayrollEntry, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateEntry: (id: number, updates: Partial<PayrollEntry>) => void;
}

// Create context
const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

// Provider component
interface PayrollProviderProps {
  children: ReactNode;
}

export const PayrollProvider: React.FC<PayrollProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(payrollReducer, initialState);

  // Helper functions
  const getPeriodById = (id: number): PayrollPeriod | undefined => {
    return state.periods.find(period => period.id === id);
  };

  const getEntriesByPeriod = (periodId: number): PayrollEntry[] => {
    return state.entries.filter(entry => entry.periodId === periodId);
  };

  const getEntriesByEmployee = (employeeId: number): PayrollEntry[] => {
    return state.entries.filter(entry => entry.employeeId === employeeId);
  };

  const getSummaryByPeriod = (periodId: number): PayrollSummary | undefined => {
    return state.summaries.find(summary => summary.periodId === periodId);
  };

  const getPendingPeriods = (): PayrollPeriod[] => {
    return state.periods.filter(period => period.status === 'pending');
  };

  const getProcessingPeriods = (): PayrollPeriod[] => {
    return state.periods.filter(period => period.status === 'processing');
  };

  const getCompletedPeriods = (): PayrollPeriod[] => {
    return state.periods.filter(period => period.status === 'completed');
  };

  const addPeriod = (
    periodData: Omit<PayrollPeriod, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newPeriod: PayrollPeriod = {
      ...periodData,
      id: Math.max(...state.periods.map(p => p.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_PERIOD', payload: newPeriod });
  };

  const updatePeriod = (id: number, updates: Partial<PayrollPeriod>) => {
    const existingPeriod = getPeriodById(id);
    if (existingPeriod) {
      const updatedPeriod: PayrollPeriod = {
        ...existingPeriod,
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_PERIOD', payload: updatedPeriod });
    }
  };

  const addEntry = (
    entryData: Omit<PayrollEntry, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newEntry: PayrollEntry = {
      ...entryData,
      id: Math.max(...state.entries.map(e => e.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_ENTRY', payload: newEntry });
  };

  const updateEntry = (id: number, updates: Partial<PayrollEntry>) => {
    const existingEntry = state.entries.find(entry => entry.id === id);
    if (existingEntry) {
      const updatedEntry: PayrollEntry = {
        ...existingEntry,
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_ENTRY', payload: updatedEntry });
    }
  };

  const value: PayrollContextType = {
    state,
    dispatch,
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

  return (
    <PayrollContext.Provider value={value}>{children}</PayrollContext.Provider>
  );
};

// Custom hook
export const usePayroll = (): PayrollContextType => {
  const context = useContext(PayrollContext);
  if (context === undefined) {
    throw new Error('usePayroll must be used within a PayrollProvider');
  }
  return context;
};
