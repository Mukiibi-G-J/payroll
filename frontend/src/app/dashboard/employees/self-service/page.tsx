'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { useAuth } from '@/context/AuthContext';
import { useEmployees } from '@/hooks/useEmployees';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Edit,
  Save,
  X,
  Building,
  Clock,
} from 'lucide-react';

export default function EmployeeSelfServicePage() {
  const router = useRouter();
  const { state } = useAuth();
  const { employees } = useEmployees();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    phone: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  // Find current employee based on logged-in user
  const currentEmployee = employees.find(
    emp => emp.email === state.user?.email
  );

  if (!currentEmployee) {
    return (
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <User className="w-16 h-16 text-bodyText opacity-50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-mainTextColor mb-2">
            Employee Profile Not Found
          </h2>
          <p className="text-bodyText mb-6">
            We couldn't find your employee profile. Please contact HR.
          </p>
          <Button onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const handleEditToggle = () => {
    if (!isEditing) {
      setEditedData({
        phone: currentEmployee.phone,
        address: currentEmployee.address,
        emergencyContactName: currentEmployee.emergencyContact.name,
        emergencyContactPhone: currentEmployee.emergencyContact.phone,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // In a real app, this would update the employee via context/API
    alert('Profile updated successfully! (Simulation)');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">My Profile</h1>
          <p className="text-bodyText">
            View and update your personal information
          </p>
        </div>
      </div>

      {/* Employee Header Card */}
      <Card className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-s1 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {currentEmployee.firstName[0]}
            {currentEmployee.lastName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold text-mainTextColor">
                {currentEmployee.firstName} {currentEmployee.lastName}
              </h2>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-bodyText">
                <Mail className="w-4 h-4" />
                {currentEmployee.email}
              </div>
              <div className="flex items-center gap-2 text-bodyText">
                <Building className="w-4 h-4" />
                {currentEmployee.department}
              </div>
              <div className="flex items-center gap-2 text-bodyText">
                <Calendar className="w-4 h-4" />
                Joined {new Date(currentEmployee.hireDate).toLocaleDateString()}
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
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="payroll">
            <DollarSign className="w-4 h-4 mr-2" />
            Payroll Info
          </TabsTrigger>
          <TabsTrigger value="time-off">
            <Clock className="w-4 h-4 mr-2" />
            Time Off
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="w-4 h-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-mainTextColor">
                Contact Information
              </h3>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={handleEditToggle}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-bodyText">
                  Email
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-bodyText" />
                  <p className="text-mainTextColor">{currentEmployee.email}</p>
                </div>
                <p className="text-xs text-bodyText mt-1">
                  Contact HR to change email
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-bodyText">
                  Phone
                </label>
                {isEditing ? (
                  <Input
                    value={editedData.phone}
                    onChange={e =>
                      setEditedData({ ...editedData, phone: e.target.value })
                    }
                    className="mt-1"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">
                      {currentEmployee.phone}
                    </p>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-bodyText">
                  Address
                </label>
                {isEditing ? (
                  <Input
                    value={editedData.address}
                    onChange={e =>
                      setEditedData({ ...editedData, address: e.target.value })
                    }
                    className="mt-1"
                  />
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-bodyText" />
                    <p className="text-mainTextColor">
                      {currentEmployee.address}
                    </p>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 border-t border-strokeColor pt-6">
                <h4 className="font-medium text-mainTextColor mb-4">
                  Emergency Contact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-bodyText">
                      Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedData.emergencyContactName}
                        onChange={e =>
                          setEditedData({
                            ...editedData,
                            emergencyContactName: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-mainTextColor mt-1">
                        {currentEmployee.emergencyContact.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-bodyText">
                      Phone
                    </label>
                    {isEditing ? (
                      <Input
                        value={editedData.emergencyContactPhone}
                        onChange={e =>
                          setEditedData({
                            ...editedData,
                            emergencyContactPhone: e.target.value,
                          })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-mainTextColor mt-1">
                        {currentEmployee.emergencyContact.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Payroll Info Tab (Read-Only) */}
        <TabsContent value="payroll">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-6">
              Payroll Information
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Payroll information is read-only. Contact
                HR or Payroll department for any changes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-bodyText">
                  Annual Salary
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <DollarSign className="w-4 h-4 text-bodyText" />
                  <p className="text-2xl font-bold text-mainTextColor">
                    ${currentEmployee.salary.toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-bodyText">
                  Pay Frequency
                </label>
                <p className="text-mainTextColor mt-1 capitalize">
                  {currentEmployee.payFrequency.replace('_', ' ')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-bodyText">
                  Bank Account
                </label>
                <p className="text-mainTextColor mt-1">
                  {currentEmployee.bankAccount.bankName} ****
                  {currentEmployee.bankAccount.accountNumber.slice(-4)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-bodyText">
                  Tax Filing Status
                </label>
                <p className="text-mainTextColor mt-1 capitalize">
                  {currentEmployee.taxInfo.filingStatus.replace('_', ' ')}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Time Off Tab */}
        <TabsContent value="time-off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-6">
                Time Off Balance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-mainTextColor">
                      Vacation Days
                    </p>
                    <p className="text-sm text-bodyText">Available</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {currentEmployee.vacationDays}
                  </p>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-mainTextColor">Sick Days</p>
                    <p className="text-sm text-bodyText">Available</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {currentEmployee.sickDays}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-mainTextColor mb-6">
                Request Time Off
              </h3>
              <p className="text-bodyText mb-4">
                Submit a time-off request for manager approval (simulation).
              </p>
              <div className="space-y-4">
                <Input
                  label="Start Date"
                  type="date"
                  placeholder="Select start date"
                />
                <Input
                  label="End Date"
                  type="date"
                  placeholder="Select end date"
                />
                <Input
                  label="Reason"
                  placeholder="Vacation, Medical, Personal, etc."
                />
                <Button className="w-full">Submit Request (Simulation)</Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-6">
              My Documents
            </h3>
            <p className="text-bodyText mb-6">
              View and download your employment documents (simulation).
            </p>

            <div className="space-y-3">
              {[
                {
                  name: 'W-2 Tax Form - 2024',
                  date: '2024-01-15',
                  type: 'Tax',
                },
                {
                  name: 'Employment Contract',
                  date: currentEmployee.hireDate,
                  type: 'Contract',
                },
                {
                  name: 'Benefits Enrollment',
                  date: currentEmployee.hireDate,
                  type: 'Benefits',
                },
                {
                  name: 'I-9 Verification',
                  date: currentEmployee.hireDate,
                  type: 'Compliance',
                },
              ].map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-s1" />
                    <div>
                      <p className="font-medium text-mainTextColor">
                        {doc.name}
                      </p>
                      <p className="text-sm text-bodyText">
                        {doc.type} • {new Date(doc.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Download (Simulation)
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
