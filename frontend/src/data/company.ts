export interface Company {
  id: number;
  name: string;
  legalName: string;
  taxId: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  payrollSettings: {
    payFrequency: 'weekly' | 'bi-weekly' | 'monthly';
    payDay: number; // Day of week (1-7) or day of month (1-31)
    overtimeThreshold: number; // Hours per week
    overtimeMultiplier: number; // 1.5 for time and a half
    holidayPay: boolean;
    sickLeaveAccrual: number; // Hours per pay period
    vacationAccrual: number; // Hours per pay period
  };
  taxSettings: {
    federalTaxRate: number;
    stateTaxRate: number;
    socialSecurityRate: number;
    medicareRate: number;
    unemploymentRate: number;
    workersCompRate: number;
  };
  benefits: {
    healthInsurance: boolean;
    dentalInsurance: boolean;
    visionInsurance: boolean;
    retirement401k: boolean;
    lifeInsurance: boolean;
    disabilityInsurance: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  managerId?: number;
  budget?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: number;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  salaryRange: {
    min: number;
    max: number;
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mockCompany: Company = {
  id: 1,
  name: 'AccuPay Solutions Inc.',
  legalName: 'AccuPay Solutions Incorporated',
  taxId: '12-3456789',
  address: {
    street: '123 Business Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
  },
  contact: {
    phone: '(555) 123-4567',
    email: 'contact@accupay.com',
    website: 'https://accupay.com',
  },
  payrollSettings: {
    payFrequency: 'bi-weekly',
    payDay: 5, // Friday
    overtimeThreshold: 40,
    overtimeMultiplier: 1.5,
    holidayPay: true,
    sickLeaveAccrual: 4,
    vacationAccrual: 6.67,
  },
  taxSettings: {
    federalTaxRate: 0.22,
    stateTaxRate: 0.06,
    socialSecurityRate: 0.062,
    medicareRate: 0.0145,
    unemploymentRate: 0.006,
    workersCompRate: 0.012,
  },
  benefits: {
    healthInsurance: true,
    dentalInsurance: true,
    visionInsurance: true,
    retirement401k: true,
    lifeInsurance: true,
    disabilityInsurance: true,
  },
  createdAt: '2020-01-01T00:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
};

export const mockDepartments: Department[] = [
  {
    id: 1,
    name: 'Engineering',
    description: 'Software development and technical operations',
    managerId: 5,
    budget: 500000,
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    name: 'HR',
    description: 'Human resources and employee relations',
    managerId: 2,
    budget: 200000,
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 3,
    name: 'Finance',
    description: 'Financial management and accounting',
    managerId: 6,
    budget: 300000,
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 4,
    name: 'Marketing',
    description: 'Marketing and brand management',
    managerId: 7,
    budget: 250000,
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 5,
    name: 'Sales',
    description: 'Sales and customer acquisition',
    managerId: 9,
    budget: 400000,
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 6,
    name: 'Operations',
    description: 'Business operations and administration',
    managerId: 11,
    budget: 150000,
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
];

export const mockPositions: Position[] = [
  {
    id: 1,
    title: 'Senior Developer',
    department: 'Engineering',
    description:
      'Lead software development projects and mentor junior developers',
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      '5+ years of software development experience',
      'Proficiency in multiple programming languages',
      'Experience with cloud platforms',
      'Strong problem-solving skills',
    ],
    salaryRange: {
      min: 80000,
      max: 120000,
    },
    employmentType: 'full-time',
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'HR Manager',
    department: 'HR',
    description: 'Manage human resources operations and employee relations',
    requirements: [
      "Bachelor's degree in Human Resources or related field",
      '3+ years of HR experience',
      'Knowledge of employment laws and regulations',
      'Strong communication skills',
      'HR certification preferred',
    ],
    salaryRange: {
      min: 60000,
      max: 90000,
    },
    employmentType: 'full-time',
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 3,
    title: 'Accountant',
    department: 'Finance',
    description: 'Handle financial records and prepare financial reports',
    requirements: [
      "Bachelor's degree in Accounting or Finance",
      '2+ years of accounting experience',
      'CPA certification preferred',
      'Proficiency in accounting software',
      'Attention to detail',
    ],
    salaryRange: {
      min: 50000,
      max: 75000,
    },
    employmentType: 'full-time',
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 4,
    title: 'Marketing Specialist',
    department: 'Marketing',
    description: 'Develop and execute marketing campaigns',
    requirements: [
      "Bachelor's degree in Marketing or related field",
      '2+ years of marketing experience',
      'Digital marketing knowledge',
      'Creative thinking',
      'Analytical skills',
    ],
    salaryRange: {
      min: 45000,
      max: 65000,
    },
    employmentType: 'full-time',
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 5,
    title: 'Sales Representative',
    department: 'Sales',
    description: 'Generate leads and close sales deals',
    requirements: [
      "Bachelor's degree in Business or related field",
      '1+ years of sales experience',
      'Strong communication skills',
      'Goal-oriented mindset',
      'Customer service experience',
    ],
    salaryRange: {
      min: 40000,
      max: 80000,
    },
    employmentType: 'full-time',
    isActive: true,
    createdAt: '2020-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
];

export const getCompany = (): Company => {
  return mockCompany;
};

export const getDepartmentById = (id: number): Department | undefined => {
  return mockDepartments.find(dept => dept.id === id);
};

export const getDepartments = (): Department[] => {
  return mockDepartments.filter(dept => dept.isActive);
};

export const getPositionById = (id: number): Position | undefined => {
  return mockPositions.find(pos => pos.id === id);
};

export const getPositions = (): Position[] => {
  return mockPositions.filter(pos => pos.isActive);
};

export const getPositionsByDepartment = (department: string): Position[] => {
  return mockPositions.filter(
    pos => pos.department === department && pos.isActive
  );
};
