'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Employee, mockEmployees } from '@/data/employees';

// Action types
type EmployeeAction =
  | { type: 'SET_EMPLOYEES'; payload: Employee[] }
  | { type: 'ADD_EMPLOYEE'; payload: Employee }
  | { type: 'UPDATE_EMPLOYEE'; payload: Employee }
  | { type: 'DELETE_EMPLOYEE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// State interface
interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: EmployeeState = {
  employees: mockEmployees,
  loading: false,
  error: null,
};

// Reducer
const employeeReducer = (
  state: EmployeeState,
  action: EmployeeAction
): EmployeeState => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return {
        ...state,
        employees: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload],
        loading: false,
        error: null,
      };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        ),
        loading: false,
        error: null,
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(emp => emp.id !== action.payload),
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
interface EmployeeContextType {
  state: EmployeeState;
  dispatch: React.Dispatch<EmployeeAction>;
  // Helper functions
  getEmployeeById: (id: number) => Employee | undefined;
  getEmployeesByDepartment: (department: string) => Employee[];
  getActiveEmployees: () => Employee[];
  addEmployee: (
    employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => void;
  updateEmployee: (id: number, updates: Partial<Employee>) => void;
  deleteEmployee: (id: number) => void;
}

// Create context
const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

// Provider component
interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(employeeReducer, initialState);

  // Helper functions
  const getEmployeeById = (id: number): Employee | undefined => {
    return state.employees.find(emp => emp.id === id);
  };

  const getEmployeesByDepartment = (department: string): Employee[] => {
    return state.employees.filter(emp => emp.department === department);
  };

  const getActiveEmployees = (): Employee[] => {
    return state.employees.filter(emp => emp.status === 'active');
  };

  const addEmployee = (
    employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: Math.max(...state.employees.map(emp => emp.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });
  };

  const updateEmployee = (id: number, updates: Partial<Employee>) => {
    const existingEmployee = getEmployeeById(id);
    if (existingEmployee) {
      const updatedEmployee: Employee = {
        ...existingEmployee,
        ...updates,
        id,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: 'UPDATE_EMPLOYEE', payload: updatedEmployee });
    }
  };

  const deleteEmployee = (id: number) => {
    dispatch({ type: 'DELETE_EMPLOYEE', payload: id });
  };

  const value: EmployeeContextType = {
    state,
    dispatch,
    getEmployeeById,
    getEmployeesByDepartment,
    getActiveEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook
export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
