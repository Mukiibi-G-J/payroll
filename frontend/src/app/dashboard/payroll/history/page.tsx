'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { usePayroll } from '@/hooks/usePayroll';
import { useEmployees } from '@/hooks/useEmployees';
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  User,
  DollarSign,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';

export default function PayrollHistoryPage() {
  const router = useRouter();
  const { payrollPeriods, payrollEntries, getPayrollSummaryForPeriod } =
    usePayroll();
  const { getEmployeeById } = useEmployees();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [periodFilter, setSelectedPeriod] = useState('');

  const filteredEntries = payrollEntries.filter(entry => {
    const employee = getEmployeeById(entry.employeeId);
    if (!employee) return false;

    const matchesSearch = searchQuery
      ? `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus = statusFilter ? entry.status === statusFilter : true;
    const matchesPeriod = periodFilter
      ? entry.periodId.toString() === periodFilter
      : true;

    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      processed: 'success',
      processing: 'warning',
      pending: 'secondary',
      failed: 'danger',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status}
      </Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
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
              Payroll History & Audit Trail
            </h1>
            <p className="text-bodyText">
              View complete payroll transaction history
            </p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export History
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bodyText" />
              <Input
                placeholder="Search by employee name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Select
            placeholder="Pay Period"
            value={periodFilter}
            onChange={e => setSelectedPeriod(e.target.value)}
            options={[
              { value: '', label: 'All Periods' },
              ...payrollPeriods.map(p => ({
                value: p.id.toString(),
                label: p.name,
              })),
            ]}
          />
          <Select
            placeholder="Status"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: 'processed', label: 'Processed' },
              { value: 'processing', label: 'Processing' },
              { value: 'pending', label: 'Pending' },
              { value: 'failed', label: 'Failed' },
            ]}
          />
        </div>
      </Card>

      {/* History Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-strokeColor">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-mainTextColor">
              Transaction History
            </h3>
            <p className="text-sm text-bodyText">
              Showing {filteredEntries.length} of {payrollEntries.length}{' '}
              entries
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-softBg border-b border-strokeColor">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                  Pay Period
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                  Gross Pay
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                  Net Pay
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-mainTextColor">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-mainTextColor">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-strokeColor">
              {filteredEntries.length > 0 ? (
                filteredEntries.map(entry => {
                  const employee = getEmployeeById(entry.employeeId);
                  const period = payrollPeriods.find(
                    p => p.id === entry.periodId
                  );
                  if (!employee || !period) return null;

                  return (
                    <tr key={entry.id} className="hover:bg-softBg">
                      <td className="px-4 py-3 text-bodyText">
                        {new Date(
                          entry.processedDate || entry.periodStartDate
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-mainTextColor">
                            {employee.firstName} {employee.lastName}
                          </p>
                          <p className="text-xs text-bodyText">
                            {employee.department}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-bodyText">{period.name}</td>
                      <td className="px-4 py-3 text-right text-mainTextColor">
                        ${entry.grossPay.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">
                        ${entry.netPay.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {getStatusIcon(entry.status)}
                          {getStatusBadge(entry.status)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="w-12 h-12 text-bodyText opacity-50" />
                      <p className="text-bodyText">No payroll history found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Audit Log */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-mainTextColor mb-4">
          Recent Audit Log
        </h3>
        <div className="space-y-3">
          {[
            {
              timestamp: new Date().toISOString(),
              action: 'Payroll Processed',
              user: 'Sarah Johnson',
              details: `Processed payroll for ${payrollPeriods[0]?.name}`,
              type: 'success',
            },
            {
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              action: 'Pay Period Created',
              user: 'Michael Chen',
              details: 'Created new bi-weekly pay period',
              type: 'info',
            },
            {
              timestamp: new Date(Date.now() - 172800000).toISOString(),
              action: 'Approval Granted',
              user: 'Sarah Johnson',
              details: 'Approved payroll for processing',
              type: 'success',
            },
          ].map((log, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border border-strokeColor rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  log.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-mainTextColor">{log.action}</p>
                  <span className="text-xs text-bodyText">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-bodyText">{log.details}</p>
                <p className="text-xs text-bodyText mt-1">By: {log.user}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline">View Full Audit Log</Button>
        </div>
      </Card>
    </div>
  );
}
