import { z } from 'zod';

export const employeeFormSchema = z.object({
  // Personal Information
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format'),
  address: z.string().min(5, 'Address is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  ssn: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{4}$/, 'SSN must be in format XXX-XX-XXXX'),
  nationality: z.string().optional(),

  // Employment Details
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  employeeType: z.enum(['full_time', 'part_time', 'contract', 'intern']),
  hireDate: z.string().min(1, 'Hire date is required'),
  status: z.enum(['active', 'inactive', 'terminated']),
  manager: z.string().optional(),

  // Payroll Settings
  salary: z
    .number()
    .min(0, 'Salary must be a positive number')
    .or(z.string().transform(val => parseFloat(val))),
  payFrequency: z.enum(['weekly', 'bi-weekly', 'monthly', 'semi-monthly']),

  // Emergency Contact
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyContactRelationship: z.string().min(1, 'Relationship is required'),
  emergencyContactPhone: z
    .string()
    .min(10, 'Emergency contact phone is required'),

  // Bank Account
  bankName: z.string().min(1, 'Bank name is required'),
  accountType: z.enum(['checking', 'savings']),
  accountNumber: z.string().min(8, 'Account number must be at least 8 digits'),
  routingNumber: z.string().regex(/^\d{9}$/, 'Routing number must be 9 digits'),

  // Tax Information
  filingStatus: z.enum(['single', 'married', 'head_of_household']),
  federalAllowances: z
    .number()
    .min(0)
    .max(10)
    .or(z.string().transform(val => parseInt(val))),
  stateAllowances: z
    .number()
    .min(0)
    .max(10)
    .or(z.string().transform(val => parseInt(val))),
  additionalWithholding: z
    .number()
    .min(0)
    .or(z.string().transform(val => parseFloat(val))),
});

export type EmployeeFormData = z.infer<typeof employeeFormSchema>;
