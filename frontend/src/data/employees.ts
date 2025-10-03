export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'terminated';
  hireDate: string;
  salary: number;
  hourlyRate?: number;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  managerId?: number;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  personalInfo: {
    dateOfBirth: string;
    ssn: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  payrollInfo: {
    payFrequency: 'weekly' | 'bi-weekly' | 'monthly';
    taxExemptions: number;
    directDeposit: {
      bankName: string;
      accountNumber: string;
      routingNumber: string;
    };
  };
  benefits: {
    healthInsurance: boolean;
    dentalInsurance: boolean;
    visionInsurance: boolean;
    retirement401k: boolean;
    paidTimeOff: number;
    sickLeave: number;
  };
  createdAt: string;
  updatedAt: string;
}

export const mockEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '(555) 123-4567',
    department: 'Engineering',
    position: 'Senior Developer',
    status: 'active',
    hireDate: '2023-01-15',
    salary: 85000,
    employmentType: 'full-time',
    managerId: 5,
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1985-06-15',
      ssn: '123-45-6789',
      emergencyContact: {
        name: 'Jane Smith',
        relationship: 'Spouse',
        phone: '(555) 123-4568',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 2,
      directDeposit: {
        bankName: 'Chase Bank',
        accountNumber: '****1234',
        routingNumber: '021000021',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      retirement401k: true,
      paidTimeOff: 20,
      sickLeave: 10,
    },
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    phone: '(555) 234-5678',
    department: 'HR',
    position: 'HR Manager',
    status: 'active',
    hireDate: '2022-03-20',
    salary: 75000,
    employmentType: 'full-time',
    address: {
      street: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1988-09-22',
      ssn: '234-56-7890',
      emergencyContact: {
        name: 'Mike Johnson',
        relationship: 'Brother',
        phone: '(555) 234-5679',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 1,
      directDeposit: {
        bankName: 'Wells Fargo',
        accountNumber: '****5678',
        routingNumber: '121000248',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: false,
      retirement401k: true,
      paidTimeOff: 25,
      sickLeave: 12,
    },
    createdAt: '2022-03-20T00:00:00Z',
    updatedAt: '2024-01-10T14:20:00Z',
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Wilson',
    email: 'mike.wilson@company.com',
    phone: '(555) 345-6789',
    department: 'Finance',
    position: 'Accountant',
    status: 'active',
    hireDate: '2023-06-10',
    salary: 65000,
    employmentType: 'full-time',
    managerId: 6,
    address: {
      street: '789 Pine St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1990-12-03',
      ssn: '345-67-8901',
      emergencyContact: {
        name: 'Lisa Wilson',
        relationship: 'Sister',
        phone: '(555) 345-6790',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 0,
      directDeposit: {
        bankName: 'Bank of America',
        accountNumber: '****9012',
        routingNumber: '026009593',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: false,
      visionInsurance: true,
      retirement401k: false,
      paidTimeOff: 15,
      sickLeave: 8,
    },
    createdAt: '2023-06-10T00:00:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@company.com',
    phone: '(555) 456-7890',
    department: 'Marketing',
    position: 'Marketing Specialist',
    status: 'inactive',
    hireDate: '2021-09-05',
    salary: 55000,
    employmentType: 'full-time',
    managerId: 7,
    address: {
      street: '321 Elm St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94104',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1992-04-18',
      ssn: '456-78-9012',
      emergencyContact: {
        name: 'Robert Davis',
        relationship: 'Father',
        phone: '(555) 456-7891',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 1,
      directDeposit: {
        bankName: 'Citibank',
        accountNumber: '****3456',
        routingNumber: '021000089',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      retirement401k: true,
      paidTimeOff: 18,
      sickLeave: 9,
    },
    createdAt: '2021-09-05T00:00:00Z',
    updatedAt: '2023-12-01T16:45:00Z',
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@company.com',
    phone: '(555) 567-8901',
    department: 'Engineering',
    position: 'Engineering Manager',
    status: 'active',
    hireDate: '2020-11-12',
    salary: 120000,
    employmentType: 'full-time',
    address: {
      street: '654 Cedar Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1980-08-30',
      ssn: '567-89-0123',
      emergencyContact: {
        name: 'Maria Brown',
        relationship: 'Wife',
        phone: '(555) 567-8902',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 3,
      directDeposit: {
        bankName: 'Chase Bank',
        accountNumber: '****7890',
        routingNumber: '021000021',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      retirement401k: true,
      paidTimeOff: 30,
      sickLeave: 15,
    },
    createdAt: '2020-11-12T00:00:00Z',
    updatedAt: '2024-01-14T11:20:00Z',
  },
  {
    id: 6,
    firstName: 'Lisa',
    lastName: 'Garcia',
    email: 'lisa.garcia@company.com',
    phone: '(555) 678-9012',
    department: 'Finance',
    position: 'Finance Director',
    status: 'active',
    hireDate: '2019-05-08',
    salary: 95000,
    employmentType: 'full-time',
    address: {
      street: '987 Maple Dr',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94108',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1983-11-14',
      ssn: '678-90-1234',
      emergencyContact: {
        name: 'Carlos Garcia',
        relationship: 'Husband',
        phone: '(555) 678-9013',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 2,
      directDeposit: {
        bankName: 'Wells Fargo',
        accountNumber: '****2345',
        routingNumber: '121000248',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      retirement401k: true,
      paidTimeOff: 25,
      sickLeave: 12,
    },
    createdAt: '2019-05-08T00:00:00Z',
    updatedAt: '2024-01-13T13:30:00Z',
  },
  {
    id: 7,
    firstName: 'James',
    lastName: 'Martinez',
    email: 'james.martinez@company.com',
    phone: '(555) 789-0123',
    department: 'Marketing',
    position: 'Marketing Director',
    status: 'active',
    hireDate: '2021-02-14',
    salary: 88000,
    employmentType: 'full-time',
    address: {
      street: '147 Birch Ln',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94109',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1987-01-25',
      ssn: '789-01-2345',
      emergencyContact: {
        name: 'Ana Martinez',
        relationship: 'Wife',
        phone: '(555) 789-0124',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 2,
      directDeposit: {
        bankName: 'Bank of America',
        accountNumber: '****6789',
        routingNumber: '026009593',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      retirement401k: true,
      paidTimeOff: 22,
      sickLeave: 11,
    },
    createdAt: '2021-02-14T00:00:00Z',
    updatedAt: '2024-01-11T15:45:00Z',
  },
  {
    id: 8,
    firstName: 'Jennifer',
    lastName: 'Taylor',
    email: 'jennifer.taylor@company.com',
    phone: '(555) 890-1234',
    department: 'Sales',
    position: 'Sales Representative',
    status: 'active',
    hireDate: '2023-08-22',
    salary: 60000,
    hourlyRate: 28.85,
    employmentType: 'full-time',
    managerId: 9,
    address: {
      street: '258 Spruce St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94110',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1991-07-12',
      ssn: '890-12-3456',
      emergencyContact: {
        name: 'Michael Taylor',
        relationship: 'Brother',
        phone: '(555) 890-1235',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 1,
      directDeposit: {
        bankName: 'Chase Bank',
        accountNumber: '****0123',
        routingNumber: '021000021',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: false,
      visionInsurance: true,
      retirement401k: false,
      paidTimeOff: 12,
      sickLeave: 6,
    },
    createdAt: '2023-08-22T00:00:00Z',
    updatedAt: '2024-01-09T12:00:00Z',
  },
  {
    id: 9,
    firstName: 'Robert',
    lastName: 'Anderson',
    email: 'robert.anderson@company.com',
    phone: '(555) 901-2345',
    department: 'Sales',
    position: 'Sales Manager',
    status: 'active',
    hireDate: '2020-04-03',
    salary: 78000,
    employmentType: 'full-time',
    address: {
      street: '369 Willow Way',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1984-03-08',
      ssn: '901-23-4567',
      emergencyContact: {
        name: 'Susan Anderson',
        relationship: 'Wife',
        phone: '(555) 901-2346',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 2,
      directDeposit: {
        bankName: 'Wells Fargo',
        accountNumber: '****4567',
        routingNumber: '121000248',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: true,
      retirement401k: true,
      paidTimeOff: 20,
      sickLeave: 10,
    },
    createdAt: '2020-04-03T00:00:00Z',
    updatedAt: '2024-01-08T10:15:00Z',
  },
  {
    id: 10,
    firstName: 'Amanda',
    lastName: 'White',
    email: 'amanda.white@company.com',
    phone: '(555) 012-3456',
    department: 'Operations',
    position: 'Operations Coordinator',
    status: 'active',
    hireDate: '2022-07-18',
    salary: 52000,
    employmentType: 'full-time',
    managerId: 11,
    address: {
      street: '741 Poplar Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94112',
      country: 'USA',
    },
    personalInfo: {
      dateOfBirth: '1989-10-05',
      ssn: '012-34-5678',
      emergencyContact: {
        name: 'Thomas White',
        relationship: 'Father',
        phone: '(555) 012-3457',
      },
    },
    payrollInfo: {
      payFrequency: 'bi-weekly',
      taxExemptions: 0,
      directDeposit: {
        bankName: 'Citibank',
        accountNumber: '****8901',
        routingNumber: '021000089',
      },
    },
    benefits: {
      healthInsurance: true,
      dentalInsurance: true,
      visionInsurance: false,
      retirement401k: true,
      paidTimeOff: 15,
      sickLeave: 8,
    },
    createdAt: '2022-07-18T00:00:00Z',
    updatedAt: '2024-01-07T14:30:00Z',
  },
];

export const getEmployeesByDepartment = (department: string): Employee[] => {
  return mockEmployees.filter(employee => employee.department === department);
};

export const getActiveEmployees = (): Employee[] => {
  return mockEmployees.filter(employee => employee.status === 'active');
};

export const getEmployeeById = (id: number): Employee | undefined => {
  return mockEmployees.find(employee => employee.id === id);
};

export const getEmployeesByManager = (managerId: number): Employee[] => {
  return mockEmployees.filter(employee => employee.managerId === managerId);
};
