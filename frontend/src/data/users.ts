export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role:
    | 'admin'
    | 'hr_manager'
    | 'payroll_admin'
    | 'business_owner'
    | 'employee';
  department?: string;
  position?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  permissions: {
    canViewEmployees: boolean;
    canEditEmployees: boolean;
    canDeleteEmployees: boolean;
    canProcessPayroll: boolean;
    canViewPayroll: boolean;
    canEditPayroll: boolean;
    canViewReports: boolean;
    canGenerateReports: boolean;
    canManageUsers: boolean;
    canViewSettings: boolean;
    canEditSettings: boolean;
  };
}

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@accupay.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    department: 'IT',
    position: 'System Administrator',
    isActive: true,
    lastLogin: '2024-01-15T08:30:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    permissions: {
      canViewEmployees: true,
      canEditEmployees: true,
      canDeleteEmployees: true,
      canProcessPayroll: true,
      canViewPayroll: true,
      canEditPayroll: true,
      canViewReports: true,
      canGenerateReports: true,
      canManageUsers: true,
      canViewSettings: true,
      canEditSettings: true,
    },
  },
  {
    id: 2,
    email: 'sarah.johnson@company.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'hr_manager',
    department: 'HR',
    position: 'HR Manager',
    isActive: true,
    lastLogin: '2024-01-15T09:15:00Z',
    createdAt: '2022-03-20T00:00:00Z',
    updatedAt: '2024-01-15T09:15:00Z',
    permissions: {
      canViewEmployees: true,
      canEditEmployees: true,
      canDeleteEmployees: false,
      canProcessPayroll: false,
      canViewPayroll: true,
      canEditPayroll: false,
      canViewReports: true,
      canGenerateReports: true,
      canManageUsers: false,
      canViewSettings: true,
      canEditSettings: false,
    },
  },
  {
    id: 3,
    email: 'lisa.garcia@company.com',
    firstName: 'Lisa',
    lastName: 'Garcia',
    role: 'payroll_admin',
    department: 'Finance',
    position: 'Finance Director',
    isActive: true,
    lastLogin: '2024-01-15T07:45:00Z',
    createdAt: '2019-05-08T00:00:00Z',
    updatedAt: '2024-01-15T07:45:00Z',
    permissions: {
      canViewEmployees: true,
      canEditEmployees: false,
      canDeleteEmployees: false,
      canProcessPayroll: true,
      canViewPayroll: true,
      canEditPayroll: true,
      canViewReports: true,
      canGenerateReports: true,
      canManageUsers: false,
      canViewSettings: true,
      canEditSettings: false,
    },
  },
  {
    id: 4,
    email: 'ceo@company.com',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'business_owner',
    department: 'Executive',
    position: 'CEO',
    isActive: true,
    lastLogin: '2024-01-14T16:20:00Z',
    createdAt: '2018-01-01T00:00:00Z',
    updatedAt: '2024-01-14T16:20:00Z',
    permissions: {
      canViewEmployees: true,
      canEditEmployees: false,
      canDeleteEmployees: false,
      canProcessPayroll: false,
      canViewPayroll: true,
      canEditPayroll: false,
      canViewReports: true,
      canGenerateReports: true,
      canManageUsers: true,
      canViewSettings: true,
      canEditSettings: true,
    },
  },
  {
    id: 5,
    email: 'john.smith@company.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    isActive: true,
    lastLogin: '2024-01-15T08:00:00Z',
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
    permissions: {
      canViewEmployees: false,
      canEditEmployees: false,
      canDeleteEmployees: false,
      canProcessPayroll: false,
      canViewPayroll: false,
      canEditPayroll: false,
      canViewReports: false,
      canGenerateReports: false,
      canManageUsers: false,
      canViewSettings: false,
      canEditSettings: false,
    },
  },
  {
    id: 6,
    email: 'mike.wilson@company.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    role: 'employee',
    department: 'Finance',
    position: 'Accountant',
    isActive: true,
    lastLogin: '2024-01-15T08:30:00Z',
    createdAt: '2023-06-10T00:00:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    permissions: {
      canViewEmployees: false,
      canEditEmployees: false,
      canDeleteEmployees: false,
      canProcessPayroll: false,
      canViewPayroll: false,
      canEditPayroll: false,
      canViewReports: false,
      canGenerateReports: false,
      canManageUsers: false,
      canViewSettings: false,
      canEditSettings: false,
    },
  },
  {
    id: 7,
    email: 'james.martinez@company.com',
    firstName: 'James',
    lastName: 'Martinez',
    role: 'hr_manager',
    department: 'Marketing',
    position: 'Marketing Director',
    isActive: true,
    lastLogin: '2024-01-15T09:00:00Z',
    createdAt: '2021-02-14T00:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    permissions: {
      canViewEmployees: true,
      canEditEmployees: true,
      canDeleteEmployees: false,
      canProcessPayroll: false,
      canViewPayroll: true,
      canEditPayroll: false,
      canViewReports: true,
      canGenerateReports: true,
      canManageUsers: false,
      canViewSettings: true,
      canEditSettings: false,
    },
  },
  {
    id: 8,
    email: 'jennifer.taylor@company.com',
    firstName: 'Jennifer',
    lastName: 'Taylor',
    role: 'employee',
    department: 'Sales',
    position: 'Sales Representative',
    isActive: true,
    lastLogin: '2024-01-15T08:15:00Z',
    createdAt: '2023-08-22T00:00:00Z',
    updatedAt: '2024-01-15T08:15:00Z',
    permissions: {
      canViewEmployees: false,
      canEditEmployees: false,
      canDeleteEmployees: false,
      canProcessPayroll: false,
      canViewPayroll: false,
      canEditPayroll: false,
      canViewReports: false,
      canGenerateReports: false,
      canManageUsers: false,
      canViewSettings: false,
      canEditSettings: false,
    },
  },
];

export const getUserById = (id: number): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

export const getUsersByRole = (role: User['role']): User[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getActiveUsers = (): User[] => {
  return mockUsers.filter(user => user.isActive);
};

export const getUsersByDepartment = (department: string): User[] => {
  return mockUsers.filter(user => user.department === department);
};

export const getUsersWithPermission = (
  permission: keyof User['permissions']
): User[] => {
  return mockUsers.filter(user => user.permissions[permission]);
};

export const getCurrentUser = (): User => {
  // In a real app, this would come from authentication context
  return mockUsers[1]; // Sarah Johnson as default
};
