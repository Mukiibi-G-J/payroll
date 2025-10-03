// Dashboard Types
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  pendingPayroll: number;
  completedPayroll: number;
  totalPayrollAmount: number;
  averagePayrollTime: number;
}

export interface DashboardWidget {
  id: string;
  type: 'stat' | 'chart' | 'table' | 'list';
  title: string;
  data: any;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
}

// Employee Types
export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'terminated';
  salary: number;
  hourlyRate?: number;
  employmentType: 'full-time' | 'part-time' | 'contractor';
  manager?: string;
  directReports?: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  benefits: {
    healthInsurance: boolean;
    dentalInsurance: boolean;
    visionInsurance: boolean;
    retirement401k: boolean;
    lifeInsurance: boolean;
  };
  taxInfo: {
    ssn: string;
    filingStatus: 'single' | 'married' | 'head-of-household';
    exemptions: number;
    additionalWithholding: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Payroll Types
export interface PayrollPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  payDate: string;
  status: 'draft' | 'processing' | 'completed' | 'cancelled';
  employeeCount: number;
  totalGrossPay: number;
  totalNetPay: number;
  totalTaxes: number;
  totalDeductions: number;
}

export interface PayrollEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  grossPay: number;
  taxes: {
    federal: number;
    state: number;
    local: number;
    socialSecurity: number;
    medicare: number;
  };
  deductions: {
    healthInsurance: number;
    dentalInsurance: number;
    visionInsurance: number;
    retirement401k: number;
    lifeInsurance: number;
    other: number;
  };
  netPay: number;
  hoursWorked: number;
  overtimeHours: number;
  overtimePay: number;
  bonuses: number;
  commissions: number;
}

// Time Tracking Types
export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut?: string;
  breakStart?: string;
  breakEnd?: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  status: 'in-progress' | 'completed' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  notes?: string;
}

export interface Timesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  weekStartDate: string;
  weekEndDate: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submittedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  entries: TimeEntry[];
}

// Report Types
export interface Report {
  id: string;
  name: string;
  type: 'payroll' | 'employee' | 'tax' | 'time' | 'custom';
  description: string;
  parameters: Record<string, any>;
  generatedAt: string;
  generatedBy: string;
  fileUrl?: string;
  status: 'generating' | 'completed' | 'failed';
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'hr_manager' | 'payroll_admin' | 'employee';
  permissions: string[];
  lastLogin: string;
  isActive: boolean;
  avatar?: string;
}

// Company Types
export interface Company {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  taxId: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  settings: {
    payFrequency: 'weekly' | 'bi-weekly' | 'monthly';
    timeZone: string;
    currency: string;
    dateFormat: string;
    timeFormat: '12' | '24';
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface FormState {
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  errors: Record<string, string>;
}

// Filter Types
export interface FilterOptions {
  search?: string;
  status?: string;
  department?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}


