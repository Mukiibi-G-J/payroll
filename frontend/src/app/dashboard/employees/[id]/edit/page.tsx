'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useEmployees } from '@/hooks/useEmployees';
import {
  employeeFormSchema,
  type EmployeeFormData,
} from '@/lib/validations/employee';
import {
  ArrowLeft,
  Save,
  User,
  Briefcase,
  DollarSign,
  Users as UsersIcon,
  Building,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const { getEmployeeById, updateEmployee } = useEmployees();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const employeeId = parseInt(params.id as string);
  const employee = getEmployeeById(employeeId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
  });

  // Load employee data into form
  useEffect(() => {
    if (employee) {
      reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        address: employee.address,
        dateOfBirth: employee.dateOfBirth,
        ssn: employee.ssn,
        nationality: employee.nationality,
        department: employee.department,
        position: employee.position,
        employeeType: employee.employeeType,
        hireDate: employee.hireDate,
        status: employee.status,
        manager: employee.manager,
        salary: employee.salary,
        payFrequency: employee.payFrequency,
        emergencyContactName: employee.emergencyContact.name,
        emergencyContactRelationship: employee.emergencyContact.relationship,
        emergencyContactPhone: employee.emergencyContact.phone,
        bankName: employee.bankAccount.bankName,
        accountType: employee.bankAccount.accountType,
        accountNumber: employee.bankAccount.accountNumber,
        routingNumber: employee.bankAccount.routingNumber,
        filingStatus: employee.taxInfo.filingStatus,
        federalAllowances: employee.taxInfo.federalAllowances,
        stateAllowances: employee.taxInfo.stateAllowances,
        additionalWithholding: employee.taxInfo.additionalWithholding,
      });
      setIsLoading(false);
    }
  }, [employee, reset]);

  if (!employee) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <Card className="p-12 text-center">
          <UsersIcon className="w-16 h-16 text-bodyText opacity-50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-mainTextColor mb-2">
            Employee Not Found
          </h2>
          <p className="text-bodyText mb-6">
            The employee you're trying to edit doesn't exist.
          </p>
          <Button onClick={() => router.push('/dashboard/employees')}>
            Back to Employee Directory
          </Button>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-s1" />
      </div>
    );
  }

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Transform form data to employee object
      const updatedEmployee = {
        ...employee,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        ssn: data.ssn,
        nationality: data.nationality || 'United States',
        department: data.department,
        position: data.position,
        employeeType: data.employeeType,
        hireDate: data.hireDate,
        status: data.status,
        manager: data.manager,
        salary:
          typeof data.salary === 'string'
            ? parseFloat(data.salary)
            : data.salary,
        payFrequency: data.payFrequency,
        emergencyContact: {
          name: data.emergencyContactName,
          relationship: data.emergencyContactRelationship,
          phone: data.emergencyContactPhone,
        },
        bankAccount: {
          bankName: data.bankName,
          accountType: data.accountType,
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
        },
        taxInfo: {
          filingStatus: data.filingStatus,
          federalAllowances:
            typeof data.federalAllowances === 'string'
              ? parseInt(data.federalAllowances)
              : data.federalAllowances,
          stateAllowances:
            typeof data.stateAllowances === 'string'
              ? parseInt(data.stateAllowances)
              : data.stateAllowances,
          additionalWithholding:
            typeof data.additionalWithholding === 'string'
              ? parseFloat(data.additionalWithholding)
              : data.additionalWithholding,
        },
        updatedAt: new Date().toISOString(),
      };

      updateEmployee(employeeId, updatedEmployee);

      // Redirect to employee profile
      router.push(`/dashboard/employees/${employeeId}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to update employee'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">
            Edit Employee: {employee.firstName} {employee.lastName}
          </h1>
          <p className="text-bodyText">Update employee information</p>
        </div>
      </div>

      {submitError && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{submitError}</p>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-s1" />
            <h2 className="text-lg font-semibold text-mainTextColor">
              Personal Information
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              {...register('firstName')}
              error={errors.firstName?.message}
              required
            />
            <Input
              label="Last Name"
              {...register('lastName')}
              error={errors.lastName?.message}
              required
            />
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              required
            />
            <Input
              label="Phone"
              {...register('phone')}
              error={errors.phone?.message}
              placeholder="(555) 123-4567"
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Address"
                {...register('address')}
                error={errors.address?.message}
                placeholder="123 Main St, City, State 12345"
                required
              />
            </div>
            <Input
              label="Date of Birth"
              type="date"
              {...register('dateOfBirth')}
              error={errors.dateOfBirth?.message}
              required
            />
            <Input
              label="Social Security Number"
              {...register('ssn')}
              error={errors.ssn?.message}
              placeholder="XXX-XX-XXXX"
              required
            />
            <Input
              label="Nationality"
              {...register('nationality')}
              error={errors.nationality?.message}
              placeholder="United States"
            />
          </div>
        </Card>

        {/* Employment Details */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-s1" />
            <h2 className="text-lg font-semibold text-mainTextColor">
              Employment Details
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Department"
              {...register('department')}
              error={errors.department?.message}
              placeholder="Engineering, HR, Finance, etc."
              required
            />
            <Input
              label="Position"
              {...register('position')}
              error={errors.position?.message}
              placeholder="Software Engineer, HR Manager, etc."
              required
            />
            <Select
              label="Employee Type"
              {...register('employeeType')}
              error={errors.employeeType?.message}
              options={[
                { value: 'full_time', label: 'Full Time' },
                { value: 'part_time', label: 'Part Time' },
                { value: 'contract', label: 'Contract' },
                { value: 'intern', label: 'Intern' },
              ]}
              required
            />
            <Input
              label="Hire Date"
              type="date"
              {...register('hireDate')}
              error={errors.hireDate?.message}
              required
            />
            <Select
              label="Employment Status"
              {...register('status')}
              error={errors.status?.message}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'terminated', label: 'Terminated' },
              ]}
              required
            />
            <Input
              label="Manager"
              {...register('manager')}
              error={errors.manager?.message}
              placeholder="Manager name (optional)"
            />
          </div>
        </Card>

        {/* Payroll Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-s1" />
            <h2 className="text-lg font-semibold text-mainTextColor">
              Payroll Settings
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Annual Salary"
              type="number"
              {...register('salary')}
              error={errors.salary?.message}
              placeholder="50000"
              required
            />
            <Select
              label="Pay Frequency"
              {...register('payFrequency')}
              error={errors.payFrequency?.message}
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'bi-weekly', label: 'Bi-Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'semi-monthly', label: 'Semi-Monthly' },
              ]}
              required
            />
            <Select
              label="Tax Filing Status"
              {...register('filingStatus')}
              error={errors.filingStatus?.message}
              options={[
                { value: 'single', label: 'Single' },
                { value: 'married', label: 'Married' },
                { value: 'head_of_household', label: 'Head of Household' },
              ]}
              required
            />
            <Input
              label="Federal Allowances"
              type="number"
              {...register('federalAllowances')}
              error={errors.federalAllowances?.message}
              placeholder="0"
            />
            <Input
              label="State Allowances"
              type="number"
              {...register('stateAllowances')}
              error={errors.stateAllowances?.message}
              placeholder="0"
            />
            <Input
              label="Additional Withholding"
              type="number"
              {...register('additionalWithholding')}
              error={errors.additionalWithholding?.message}
              placeholder="0"
            />
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <UsersIcon className="w-5 h-5 text-s1" />
            <h2 className="text-lg font-semibold text-mainTextColor">
              Emergency Contact
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Name"
              {...register('emergencyContactName')}
              error={errors.emergencyContactName?.message}
              required
            />
            <Input
              label="Relationship"
              {...register('emergencyContactRelationship')}
              error={errors.emergencyContactRelationship?.message}
              placeholder="Spouse, Parent, Sibling, etc."
              required
            />
            <Input
              label="Contact Phone"
              {...register('emergencyContactPhone')}
              error={errors.emergencyContactPhone?.message}
              placeholder="(555) 123-4567"
              required
            />
          </div>
        </Card>

        {/* Bank Account */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building className="w-5 h-5 text-s1" />
            <h2 className="text-lg font-semibold text-mainTextColor">
              Bank Account (Direct Deposit)
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Bank Name"
              {...register('bankName')}
              error={errors.bankName?.message}
              placeholder="Chase, Bank of America, etc."
              required
            />
            <Select
              label="Account Type"
              {...register('accountType')}
              error={errors.accountType?.message}
              options={[
                { value: 'checking', label: 'Checking' },
                { value: 'savings', label: 'Savings' },
              ]}
              required
            />
            <Input
              label="Account Number"
              {...register('accountNumber')}
              error={errors.accountNumber?.message}
              placeholder="12345678"
              required
            />
            <Input
              label="Routing Number"
              {...register('routingNumber')}
              error={errors.routingNumber?.message}
              placeholder="123456789"
              required
            />
          </div>
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
