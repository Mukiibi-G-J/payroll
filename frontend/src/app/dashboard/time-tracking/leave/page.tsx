'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/context/AuthContext';
import { useEmployees } from '@/hooks/useEmployees';
import {
  ArrowLeft,
  Calendar,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  Plane,
  Heart,
  Briefcase,
} from 'lucide-react';

interface LeaveRequest {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: string;
}

export default function LeaveManagementPage() {
  const router = useRouter();
  const { state } = useAuth();
  const { employees } = useEmployees();
  const [showForm, setShowForm] = useState(false);

  const currentEmployee = employees.find(
    emp => emp.email === state.user?.email
  );

  const { register, handleSubmit, reset } = useForm();

  // Mock leave requests
  const [leaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      type: 'vacation',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      days: 5,
      reason: 'Family vacation',
      status: 'approved',
    },
    {
      id: 2,
      type: 'sick',
      startDate: '2024-02-10',
      endDate: '2024-02-11',
      days: 2,
      reason: 'Medical appointment',
      status: 'approved',
    },
    {
      id: 3,
      type: 'vacation',
      startDate: '2024-04-01',
      endDate: '2024-04-05',
      days: 5,
      reason: 'Spring break',
      status: 'pending',
    },
  ]);

  const onSubmit = (data: any) => {
    alert(
      `Leave request submitted:\n${data.type} from ${data.startDate} to ${data.endDate}\n\n(This is a simulation)`
    );
    setShowForm(false);
    reset();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'success',
      pending: 'warning',
      rejected: 'danger',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status}
      </Badge>
    );
  };

  const getLeaveIcon = (type: string) => {
    switch (type) {
      case 'vacation':
        return <Plane className="w-5 h-5 text-blue-600" />;
      case 'sick':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'personal':
        return <Briefcase className="w-5 h-5 text-purple-600" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-600" />;
    }
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
              Leave Management
            </h1>
            <p className="text-bodyText">Request and manage time off</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Request Time Off
        </Button>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">Vacation Days</p>
              <p className="text-3xl font-bold text-mainTextColor">
                {currentEmployee?.vacationDays || 0}
              </p>
            </div>
            <Plane className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xs text-bodyText mt-2">Available</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">Sick Days</p>
              <p className="text-3xl font-bold text-mainTextColor">
                {currentEmployee?.sickDays || 0}
              </p>
            </div>
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-xs text-bodyText mt-2">Available</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">
                Used This Year
              </p>
              <p className="text-3xl font-bold text-mainTextColor">7</p>
            </div>
            <Calendar className="w-8 h-8 text-s1" />
          </div>
          <p className="text-xs text-bodyText mt-2">Total days off</p>
        </Card>
      </div>

      {/* Request Form */}
      {showForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-mainTextColor mb-4">
            New Leave Request
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Leave Type"
                {...register('type')}
                options={[
                  { value: 'vacation', label: 'Vacation' },
                  { value: 'sick', label: 'Sick Leave' },
                  { value: 'personal', label: 'Personal' },
                  { value: 'other', label: 'Other' },
                ]}
                required
              />
              <div></div>
              <Input
                label="Start Date"
                type="date"
                {...register('startDate')}
                required
              />
              <Input
                label="End Date"
                type="date"
                {...register('endDate')}
                required
              />
              <div className="md:col-span-2">
                <Input
                  label="Reason"
                  {...register('reason')}
                  placeholder="Brief description of your leave request"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Leave Requests History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-mainTextColor mb-4">
          Leave Requests
        </h3>
        <div className="space-y-3">
          {leaveRequests.map(request => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-softBg rounded-full flex items-center justify-center">
                  {getLeaveIcon(request.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-mainTextColor capitalize">
                      {request.type} Leave
                    </p>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-sm text-bodyText">
                    {new Date(request.startDate).toLocaleDateString()} -{' '}
                    {new Date(request.endDate).toLocaleDateString()} (
                    {request.days} days)
                  </p>
                  <p className="text-sm text-bodyText">{request.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {request.status === 'approved' && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {request.status === 'pending' && (
                  <Clock className="w-5 h-5 text-yellow-600" />
                )}
                {request.status === 'rejected' && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
