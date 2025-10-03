'use client';

import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { useEmployees } from '@/hooks/useEmployees';
import {
  ArrowLeft,
  User,
  Briefcase,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Users,
  Clock,
  Edit,
  Trash2,
} from 'lucide-react';

export default function EmployeeProfilePage() {
  const router = useRouter();
  const params = useParams();
  const { getEmployeeById } = useEmployees();

  const employeeId = parseInt(params.id as string);
  const employee = getEmployeeById(employeeId);

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
          <Users className="w-16 h-16 text-bodyText opacity-50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-mainTextColor mb-2">
            Employee Not Found
          </h2>
          <p className="text-bodyText mb-6">
            The employee you're looking for doesn't exist.
          </p>
          <Button onClick={() => router.push('/dashboard/employees')}>
            Back to Employee Directory
          </Button>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'success' : 'secondary'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-mainTextColor">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-bodyText">{employee.position}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              router.push(`/dashboard/employees/${employeeId}/edit`)
            }
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Employee Header Card */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-s1 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {employee.firstName[0]}
            {employee.lastName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold text-mainTextColor">
                {employee.firstName} {employee.lastName}
              </h2>
              {getStatusBadge(employee.status)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-bodyText">
                <Mail className="w-4 h-4" />
                {employee.email}
              </div>
              <div className="flex items-center gap-2 text-bodyText">
                <Phone className="w-4 h-4" />
                {employee.phone}
              </div>
              <div className="flex items-center gap-2 text-bodyText">
                <Building className="w-4 h-4" />
                {employee.department}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">
            <User className="w-4 h-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="employment">
            <Briefcase className="w-4 h-4 mr-2" />
            Employment
          </TabsTrigger>
          <TabsTrigger value="payroll">
            <DollarSign className="w-4 h-4 mr-2" />
            Payroll Settings
          </TabsTrigger>
        </TabsList>

        {/* Personal Tab */}
        <TabsContent value="personal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Email
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">{employee.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Phone
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">{employee.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Address
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">{employee.address}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Emergency Contact
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Name
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.emergencyContact.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Relationship
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.emergencyContact.relationship}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Phone
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">
                      {employee.emergencyContact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Personal Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Date of Birth
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">
                      {new Date(employee.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Social Security Number
                  </label>
                  <p className="text-mainTextColor mt-1">
                    ***-**-{employee.ssn.slice(-4)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Nationality
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.nationality || 'Not specified'}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Bank Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Bank Name
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.bankAccount.bankName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Account Number
                  </label>
                  <p className="text-mainTextColor mt-1">
                    ****{employee.bankAccount.accountNumber.slice(-4)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Routing Number
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.bankAccount.routingNumber}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Employment Tab */}
        <TabsContent value="employment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Job Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Position
                  </label>
                  <p className="text-mainTextColor mt-1">{employee.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Department
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Building className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">{employee.department}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Employee Type
                  </label>
                  <p className="text-mainTextColor mt-1 capitalize">
                    {employee.employeeType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Employment Status
                  </label>
                  <div className="mt-1">{getStatusBadge(employee.status)}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Employment Timeline
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Hire Date
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">
                      {new Date(employee.hireDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Years of Service
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">
                      {Math.floor(
                        (new Date().getTime() -
                          new Date(employee.hireDate).getTime()) /
                          (1000 * 60 * 60 * 24 * 365)
                      )}{' '}
                      years
                    </p>
                  </div>
                </div>
                {employee.terminationDate && (
                  <div>
                    <label className="text-sm font-medium text-bodyText">
                      Termination Date
                    </label>
                    <p className="text-mainTextColor mt-1">
                      {new Date(employee.terminationDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Manager & Reporting
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Reports To
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.manager || 'No manager assigned'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Employee ID
                  </label>
                  <p className="text-mainTextColor mt-1">#{employee.id}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Time Off Balance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bodyText">
                    Vacation Days
                  </span>
                  <span className="text-mainTextColor font-semibold">
                    {employee.vacationDays} days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bodyText">
                    Sick Days
                  </span>
                  <span className="text-mainTextColor font-semibold">
                    {employee.sickDays} days
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll Settings Tab */}
        <TabsContent value="payroll">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Compensation
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Annual Salary
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <DollarSign className="w-4 h-4 text-bodyText" />
                    <p className="text-2xl font-bold text-mainTextColor">
                      ${employee.salary.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Hourly Rate
                  </label>
                  <p className="text-mainTextColor mt-1">
                    ${(employee.salary / 2080).toFixed(2)}/hour
                  </p>
                  <p className="text-xs text-bodyText mt-1">
                    Based on 40 hours/week, 52 weeks/year
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Pay Frequency
                  </label>
                  <p className="text-mainTextColor mt-1 capitalize">
                    {employee.payFrequency}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Tax Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Tax Filing Status
                  </label>
                  <p className="text-mainTextColor mt-1 capitalize">
                    {employee.taxInfo.filingStatus.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Federal Allowances
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.taxInfo.federalAllowances}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    State Allowances
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.taxInfo.stateAllowances}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Additional Withholding
                  </label>
                  <p className="text-mainTextColor mt-1">
                    ${employee.taxInfo.additionalWithholding.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Deductions
              </h3>
              <div className="space-y-3">
                {employee.deductions.map((deduction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-softBg rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-mainTextColor capitalize">
                        {deduction.type.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-bodyText">
                        {deduction.frequency === 'per_paycheck'
                          ? 'Per Paycheck'
                          : 'Monthly'}
                      </p>
                    </div>
                    <p className="font-semibold text-mainTextColor">
                      ${deduction.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
                {employee.deductions.length === 0 && (
                  <p className="text-bodyText text-center py-4">
                    No deductions configured
                  </p>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-4">
                Direct Deposit
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Bank Name
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.bankAccount.bankName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Account Type
                  </label>
                  <p className="text-mainTextColor mt-1 capitalize">
                    {employee.bankAccount.accountType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Account Number
                  </label>
                  <p className="text-mainTextColor mt-1">
                    ****{employee.bankAccount.accountNumber.slice(-4)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-bodyText">
                    Routing Number
                  </label>
                  <p className="text-mainTextColor mt-1">
                    {employee.bankAccount.routingNumber}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
