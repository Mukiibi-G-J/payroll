'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { useEmployees } from '@/hooks/useEmployees';
import {
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Users,
} from 'lucide-react';

export default function TimesheetApprovalsPage() {
  const router = useRouter();
  const { timeEntries } = useTimeTracking();
  const { employees, getEmployeeById } = useEmployees();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');

  const pendingEntries = timeEntries.filter(entry => {
    const employee = getEmployeeById(entry.employeeId);
    if (!employee) return false;

    const matchesStatus = statusFilter ? entry.status === statusFilter : true;
    const matchesSearch = searchQuery
      ? `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;

    return matchesStatus && matchesSearch;
  });

  const handleApprove = (entryId: number) => {
    alert(`Timesheet approved for entry #${entryId}\n\n(This is a simulation)`);
  };

  const handleReject = (entryId: number) => {
    alert(`Timesheet rejected for entry #${entryId}\n\n(This is a simulation)`);
  };

  const handleBulkApprove = () => {
    alert(
      `Approving ${pendingEntries.length} timesheets\n\n(This is a simulation)`
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
              Timesheet Approvals
            </h1>
            <p className="text-bodyText">
              Review and approve employee timesheets
            </p>
          </div>
        </div>
        <Button onClick={handleBulkApprove}>
          <CheckCircle className="w-4 h-4 mr-2" />
          Approve All ({pendingEntries.length})
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bodyText" />
              <Input
                placeholder="Search by employee name..."
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Select
            placeholder="Status"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
            ]}
          />
        </div>
      </Card>

      {/* Approval List */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-strokeColor">
          <h3 className="text-lg font-semibold text-mainTextColor">
            Timesheets Awaiting Approval
          </h3>
          <p className="text-sm text-bodyText">
            {pendingEntries.length} entries to review
          </p>
        </div>

        <div className="divide-y divide-strokeColor">
          {pendingEntries.length > 0 ? (
            pendingEntries.map(entry => {
              const employee = getEmployeeById(entry.employeeId);
              if (!employee) return null;

              return (
                <div
                  key={entry.id}
                  className="p-6 hover:bg-softBg transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-s1 rounded-full flex items-center justify-center text-white font-bold">
                        {employee.firstName[0]}
                        {employee.lastName[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-mainTextColor">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-sm text-bodyText">
                          {employee.department} • {employee.position}
                        </p>
                        <p className="text-sm text-bodyText">
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        entry.status === 'approved'
                          ? 'success'
                          : entry.status === 'rejected'
                            ? 'danger'
                            : 'warning'
                      }
                    >
                      {entry.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="bg-softBg p-3 rounded-lg">
                      <p className="text-xs text-bodyText">Clock In</p>
                      <p className="font-semibold text-mainTextColor">
                        {entry.clockIn}
                      </p>
                    </div>
                    <div className="bg-softBg p-3 rounded-lg">
                      <p className="text-xs text-bodyText">Clock Out</p>
                      <p className="font-semibold text-mainTextColor">
                        {entry.clockOut || '-'}
                      </p>
                    </div>
                    <div className="bg-softBg p-3 rounded-lg">
                      <p className="text-xs text-bodyText">Regular Hours</p>
                      <p className="font-semibold text-mainTextColor">
                        {entry.regularHours.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-softBg p-3 rounded-lg">
                      <p className="text-xs text-bodyText">Overtime</p>
                      <p className="font-semibold text-orange-600">
                        {entry.overtimeHours.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {entry.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(entry.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(entry.id)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center">
              <Clock className="w-16 h-16 text-bodyText opacity-50 mx-auto mb-4" />
              <p className="text-bodyText">No timesheets to review</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
