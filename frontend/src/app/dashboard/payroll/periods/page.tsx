'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { usePayroll } from '@/hooks/usePayroll';
import {
  ArrowLeft,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from 'lucide-react';

export default function PayPeriodsPage() {
  const router = useRouter();
  const { payrollPeriods, getPayrollSummaryForPeriod } = usePayroll();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'bi-weekly',
    startDate: '',
    endDate: '',
    payDate: '',
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
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const handleCreatePeriod = () => {
    // In a real app, this would call the context/API
    alert(
      `Creating pay period: ${formData.name}\nType: ${formData.type}\n\n(This is a simulation)`
    );
    setShowCreateForm(false);
    setFormData({
      name: '',
      type: 'bi-weekly',
      startDate: '',
      endDate: '',
      payDate: '',
    });
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
              Pay Period Management
            </h1>
            <p className="text-bodyText">
              Configure and manage payroll processing schedules
            </p>
          </div>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Pay Period
        </Button>
      </div>

      {/* Create Pay Period Form */}
      {showCreateForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-mainTextColor mb-4">
            Create New Pay Period
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Period Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., February 2024 - Period 1"
              required
            />
            <Select
              label="Pay Frequency"
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              options={[
                { value: 'weekly', label: 'Weekly' },
                { value: 'bi-weekly', label: 'Bi-Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'semi-monthly', label: 'Semi-Monthly' },
              ]}
              required
            />
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={e =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
            />
            <Input
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={e =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              required
            />
            <Input
              label="Pay Date"
              type="date"
              value={formData.payDate}
              onChange={e =>
                setFormData({ ...formData, payDate: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePeriod}>
              Create Pay Period (Simulation)
            </Button>
          </div>
        </Card>
      )}

      {/* Pay Periods List */}
      <div className="grid grid-cols-1 gap-4">
        {payrollPeriods.map(period => {
          const summary = getPayrollSummaryForPeriod(period.id);
          return (
            <Card key={period.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  {getStatusIcon(period.status)}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-mainTextColor">
                        {period.name}
                      </h3>
                      {getStatusBadge(period.status)}
                    </div>
                    <p className="text-sm text-bodyText">
                      {period.startDate} - {period.endDate}
                    </p>
                    <p className="text-sm text-bodyText">
                      Pay Date: {period.payDate} • Type:{' '}
                      {period.type.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {summary && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-strokeColor">
                  <div>
                    <p className="text-xs text-bodyText">Employees</p>
                    <p className="font-semibold text-mainTextColor">
                      {summary.employeesPaid}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-bodyText">Gross Pay</p>
                    <p className="font-semibold text-mainTextColor">
                      ${summary.totalGrossPay.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-bodyText">Deductions</p>
                    <p className="font-semibold text-mainTextColor">
                      ${summary.totalDeductions.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-bodyText">Net Pay</p>
                    <p className="font-semibold text-green-600">
                      ${summary.totalNetPay.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-bodyText">Total Hours</p>
                    <p className="font-semibold text-mainTextColor">
                      {summary.totalHours.toFixed(0)} hrs
                    </p>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Pay Period Info */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">
          Pay Period Schedule Information
        </h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p>
            • <strong>Weekly:</strong> 52 pay periods per year, paid every week
          </p>
          <p>
            • <strong>Bi-Weekly:</strong> 26 pay periods per year, paid every 2
            weeks
          </p>
          <p>
            • <strong>Semi-Monthly:</strong> 24 pay periods per year, paid twice
            per month (e.g., 15th and last day)
          </p>
          <p>
            • <strong>Monthly:</strong> 12 pay periods per year, paid once per
            month
          </p>
        </div>
      </Card>
    </div>
  );
}
