export interface PayrollPeriod {
  id: number;
  startDate: string;
  endDate: string;
  payDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  employeeCount: number;
  grossPay: number;
  netPay: number;
  totalTaxes: number;
  totalDeductions: number;
  totalBenefits: number;
  overtimeHours: number;
  overtimePay: number;
  regularHours: number;
  regularPay: number;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollEntry {
  id: number;
  employeeId: number;
  periodId: number;
  employeeName: string;
  department: string;
  position: string;
  payType: 'salary' | 'hourly';
  regularHours: number;
  overtimeHours: number;
  regularRate: number;
  overtimeRate: number;
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  otherDeductions: number;
  benefits: number;
  netPay: number;
  status: 'pending' | 'approved' | 'paid' | 'cancelled';
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayrollSummary {
  periodId: number;
  totalEmployees: number;
  totalGrossPay: number;
  totalNetPay: number;
  totalTaxes: number;
  totalDeductions: number;
  averagePay: number;
  medianPay: number;
  highestPay: number;
  lowestPay: number;
}

export const mockPayrollPeriods: PayrollPeriod[] = [
  {
    id: 1,
    startDate: '2024-01-01',
    endDate: '2024-01-15',
    payDate: '2024-01-19',
    status: 'completed',
    employeeCount: 127,
    grossPay: 45230.0,
    netPay: 38945.5,
    totalTaxes: 4123.25,
    totalDeductions: 2161.25,
    totalBenefits: 0,
    overtimeHours: 24.5,
    overtimePay: 1225.0,
    regularHours: 2032.0,
    regularPay: 44005.0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-19T09:00:00Z',
  },
  {
    id: 2,
    startDate: '2024-01-16',
    endDate: '2024-01-31',
    payDate: '2024-02-02',
    status: 'processing',
    employeeCount: 127,
    grossPay: 47850.0,
    netPay: 40123.75,
    totalTaxes: 4456.5,
    totalDeductions: 3269.75,
    totalBenefits: 0,
    overtimeHours: 31.2,
    overtimePay: 1560.0,
    regularHours: 2032.0,
    regularPay: 46290.0,
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-31T14:30:00Z',
  },
  {
    id: 3,
    startDate: '2024-02-01',
    endDate: '2024-02-15',
    payDate: '2024-02-16',
    status: 'pending',
    employeeCount: 130,
    grossPay: 49200.0,
    netPay: 41456.0,
    totalTaxes: 4678.0,
    totalDeductions: 3066.0,
    totalBenefits: 0,
    overtimeHours: 28.0,
    overtimePay: 1400.0,
    regularHours: 2080.0,
    regularPay: 47800.0,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T08:00:00Z',
  },
];

export const mockPayrollEntries: PayrollEntry[] = [
  {
    id: 1,
    employeeId: 1,
    periodId: 1,
    employeeName: 'John Smith',
    department: 'Engineering',
    position: 'Senior Developer',
    payType: 'salary',
    regularHours: 80,
    overtimeHours: 0,
    regularRate: 42.5,
    overtimeRate: 63.75,
    grossPay: 3400.0,
    federalTax: 340.0,
    stateTax: 170.0,
    socialSecurity: 210.8,
    medicare: 49.3,
    otherDeductions: 150.0,
    benefits: 0,
    netPay: 2479.9,
    status: 'paid',
    processedAt: '2024-01-19T09:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-19T09:00:00Z',
  },
  {
    id: 2,
    employeeId: 2,
    periodId: 1,
    employeeName: 'Sarah Johnson',
    department: 'HR',
    position: 'HR Manager',
    payType: 'salary',
    regularHours: 80,
    overtimeHours: 0,
    regularRate: 36.06,
    overtimeRate: 54.09,
    grossPay: 2884.62,
    federalTax: 288.46,
    stateTax: 144.23,
    socialSecurity: 178.85,
    medicare: 41.83,
    otherDeductions: 100.0,
    benefits: 0,
    netPay: 2131.25,
    status: 'paid',
    processedAt: '2024-01-19T09:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-19T09:00:00Z',
  },
  {
    id: 3,
    employeeId: 3,
    periodId: 1,
    employeeName: 'Mike Wilson',
    department: 'Finance',
    position: 'Accountant',
    payType: 'salary',
    regularHours: 80,
    overtimeHours: 0,
    regularRate: 31.25,
    overtimeRate: 46.88,
    grossPay: 2500.0,
    federalTax: 250.0,
    stateTax: 125.0,
    socialSecurity: 155.0,
    medicare: 36.25,
    otherDeductions: 75.0,
    benefits: 0,
    netPay: 1858.75,
    status: 'paid',
    processedAt: '2024-01-19T09:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-19T09:00:00Z',
  },
  {
    id: 4,
    employeeId: 8,
    periodId: 1,
    employeeName: 'Jennifer Taylor',
    department: 'Sales',
    position: 'Sales Representative',
    payType: 'hourly',
    regularHours: 80,
    overtimeHours: 5,
    regularRate: 28.85,
    overtimeRate: 43.28,
    grossPay: 2457.25,
    federalTax: 245.73,
    stateTax: 122.86,
    socialSecurity: 152.35,
    medicare: 35.63,
    otherDeductions: 50.0,
    benefits: 0,
    netPay: 1950.68,
    status: 'paid',
    processedAt: '2024-01-19T09:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-19T09:00:00Z',
  },
];

export const mockPayrollSummaries: PayrollSummary[] = [
  {
    periodId: 1,
    totalEmployees: 127,
    totalGrossPay: 45230.0,
    totalNetPay: 38945.5,
    totalTaxes: 4123.25,
    totalDeductions: 2161.25,
    averagePay: 356.14,
    medianPay: 320.0,
    highestPay: 850.0,
    lowestPay: 120.0,
  },
  {
    periodId: 2,
    totalEmployees: 127,
    totalGrossPay: 47850.0,
    totalNetPay: 40123.75,
    totalTaxes: 4456.5,
    totalDeductions: 3269.75,
    averagePay: 376.77,
    medianPay: 340.0,
    highestPay: 900.0,
    lowestPay: 125.0,
  },
  {
    periodId: 3,
    totalEmployees: 130,
    totalGrossPay: 49200.0,
    totalNetPay: 41456.0,
    totalTaxes: 4678.0,
    totalDeductions: 3066.0,
    averagePay: 378.46,
    medianPay: 345.0,
    highestPay: 950.0,
    lowestPay: 130.0,
  },
];

export const getPayrollPeriodById = (id: number): PayrollPeriod | undefined => {
  return mockPayrollPeriods.find(period => period.id === id);
};

export const getPayrollEntriesByPeriod = (periodId: number): PayrollEntry[] => {
  return mockPayrollEntries.filter(entry => entry.periodId === periodId);
};

export const getPayrollSummaryByPeriod = (
  periodId: number
): PayrollSummary | undefined => {
  return mockPayrollSummaries.find(summary => summary.periodId === periodId);
};

export const getPayrollEntriesByEmployee = (
  employeeId: number
): PayrollEntry[] => {
  return mockPayrollEntries.filter(entry => entry.employeeId === employeeId);
};

export const getPendingPayrollPeriods = (): PayrollPeriod[] => {
  return mockPayrollPeriods.filter(period => period.status === 'pending');
};

export const getProcessingPayrollPeriods = (): PayrollPeriod[] => {
  return mockPayrollPeriods.filter(period => period.status === 'processing');
};

export const getCompletedPayrollPeriods = (): PayrollPeriod[] => {
  return mockPayrollPeriods.filter(period => period.status === 'completed');
};
