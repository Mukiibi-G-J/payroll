'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { StepProgress, type Step } from '@/components/ui/StepProgress';
import { useEmployees } from '@/hooks/useEmployees';
import {
  employeeFormSchema,
  type EmployeeFormData,
} from '@/lib/validations/employee';
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Check,
  User,
  Briefcase,
  DollarSign,
  FileText,
  ClipboardCheck,
  Upload,
  AlertCircle,
} from 'lucide-react';

const onboardingSteps: Step[] = [
  { id: 1, title: 'Personal Info', description: 'Basic details' },
  { id: 2, title: 'Employment', description: 'Job information' },
  { id: 3, title: 'Payroll Setup', description: 'Payment details' },
  { id: 4, title: 'Documents', description: 'Upload files' },
  { id: 5, title: 'Review', description: 'Confirm details' },
];

export default function EmployeeOnboardingPage() {
  const router = useRouter();
  const { addEmployee } = useEmployees();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    mode: 'onBlur',
    defaultValues: {
      employeeType: 'full_time',
      status: 'active',
      payFrequency: 'bi-weekly',
      accountType: 'checking',
      filingStatus: 'single',
      federalAllowances: 0,
      stateAllowances: 0,
      additionalWithholding: 0,
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof EmployeeFormData)[] = [];

    switch (currentStep) {
      case 0: // Personal Info
        fieldsToValidate = [
          'firstName',
          'lastName',
          'email',
          'phone',
          'address',
          'dateOfBirth',
          'ssn',
        ];
        break;
      case 1: // Employment
        fieldsToValidate = [
          'department',
          'position',
          'employeeType',
          'hireDate',
          'status',
        ];
        break;
      case 2: // Payroll
        fieldsToValidate = [
          'salary',
          'payFrequency',
          'filingStatus',
          'emergencyContactName',
          'emergencyContactRelationship',
          'emergencyContactPhone',
          'bankName',
          'accountType',
          'accountNumber',
          'routingNumber',
        ];
        break;
      case 3: // Documents (no validation needed)
        setCurrentStep(currentStep + 1);
        return;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const newEmployee = {
        id: Date.now(),
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
        vacationDays: 15,
        sickDays: 10,
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
        deductions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addEmployee(newEmployee);
      router.push('/dashboard/employees');
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to complete onboarding'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">
            Employee Onboarding
          </h1>
          <p className="text-bodyText">
            Guided process for adding new employees
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <StepProgress steps={onboardingSteps} currentStep={currentStep} />

      {submitError && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{submitError}</p>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Information */}
        {currentStep === 0 && (
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
        )}

        {/* Step 2: Employment Details */}
        {currentStep === 1 && (
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
        )}

        {/* Step 3: Payroll Setup */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-s1" />
                <h2 className="text-lg font-semibold text-mainTextColor">
                  Compensation & Tax Settings
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

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-s1" />
                <h2 className="text-lg font-semibold text-mainTextColor">
                  Emergency Contact & Bank Information
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-mainTextColor mb-4">
                    Emergency Contact
                  </h3>
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
                </div>

                <div className="border-t border-strokeColor pt-6">
                  <h3 className="font-medium text-mainTextColor mb-4">
                    Bank Account (Direct Deposit)
                  </h3>
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
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 4: Document Upload (Simulation) */}
        {currentStep === 3 && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-s1" />
              <h2 className="text-lg font-semibold text-mainTextColor">
                Document Upload
              </h2>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-strokeColor rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-bodyText opacity-50 mx-auto mb-4" />
                <h3 className="font-medium text-mainTextColor mb-2">
                  Upload Required Documents
                </h3>
                <p className="text-sm text-bodyText mb-4">
                  This is a simulation. In a real application, you would upload:
                </p>
                <ul className="text-sm text-bodyText space-y-1 max-w-md mx-auto text-left">
                  <li>• Government-issued ID (Driver's License, Passport)</li>
                  <li>• Social Security Card</li>
                  <li>• I-9 Employment Eligibility Verification</li>
                  <li>• W-4 Tax Withholding Form</li>
                  <li>• Direct Deposit Authorization</li>
                </ul>
                <Button variant="outline" className="mt-4" type="button">
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files (Simulated)
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 5: Review & Confirm */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <ClipboardCheck className="w-5 h-5 text-s1" />
                <h2 className="text-lg font-semibold text-mainTextColor">
                  Review & Confirm
                </h2>
              </div>
              <div className="space-y-6">
                {/* Personal Info Summary */}
                <div>
                  <h3 className="font-medium text-mainTextColor mb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-bodyText">Name:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        {getValues('firstName')} {getValues('lastName')}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">Email:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        {getValues('email')}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">Phone:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        {getValues('phone')}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">DOB:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        {getValues('dateOfBirth')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Employment Info Summary */}
                <div className="border-t border-strokeColor pt-6">
                  <h3 className="font-medium text-mainTextColor mb-3">
                    Employment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-bodyText">Department:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        {getValues('department')}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">Position:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        {getValues('position')}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">Type:</span>
                      <span className="text-mainTextColor ml-2 font-medium capitalize">
                        {getValues('employeeType')?.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">Hire Date:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        {getValues('hireDate')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payroll Info Summary */}
                <div className="border-t border-strokeColor pt-6">
                  <h3 className="font-medium text-mainTextColor mb-3">
                    Payroll Settings
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-bodyText">Salary:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        ${getValues('salary')?.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">Pay Frequency:</span>
                      <span className="text-mainTextColor ml-2 font-medium capitalize">
                        {getValues('payFrequency')?.replace('_', ' ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">Bank:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        {getValues('bankName')}
                      </span>
                    </div>
                    <div>
                      <span className="text-bodyText">Account:</span>
                      <span className="text-mainTextColor ml-2 font-medium">
                        ****{getValues('accountNumber')?.slice(-4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0 || isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < onboardingSteps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                'Completing Onboarding...'
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Complete Onboarding
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
