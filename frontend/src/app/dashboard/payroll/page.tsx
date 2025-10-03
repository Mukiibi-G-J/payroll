'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePayroll } from '@/hooks/usePayroll';
import { useEmployees } from '@/hooks/useEmployees';
import {
  Calculator,
  DollarSign,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText,
  Plus,
  Settings,
  Eye,
  Play,
} from 'lucide-react';

export default function PayrollPage() {
  const router = useRouter();
  const { periods, entries, getSummaryByPeriod } = usePayroll();
  const { getActiveEmployees } = useEmployees();

  const activeEmployees = getActiveEmployees();

  // Get current and upcoming periods
  const currentPeriod =
    periods?.find(p => p.status === 'processing') || periods?.[0];
  const upcomingPeriods =
    periods?.filter(p => p.status === 'pending').slice(0, 2) || [];
  const recentPeriods =
    periods?.filter(p => p.status === 'processed').slice(0, 3) || [];

  // Calculate summary for current period
  const currentSummary = currentPeriod
    ? getSummaryByPeriod(currentPeriod.id)
    : null;

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
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">Payroll</h1>
          <p className="text-bodyText">
            Manage payroll processing and employee payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/payroll/periods')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Manage Periods
          </Button>
          <Button onClick={() => router.push('/dashboard/payroll/process')}>
            <Calculator className="w-4 h-4 mr-2" />
            Process Payroll
          </Button>
        </div>
      </div>

      {/* Payroll Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">
                Active Employees
              </p>
              <p className="text-2xl font-bold text-mainTextColor">
                {activeEmployees.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-s1" />
            </div>
          </div>
          <p className="text-xs text-bodyText mt-2">
            Eligible for current payroll
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">
                Gross Pay (Current)
              </p>
              <p className="text-2xl font-bold text-mainTextColor">
                ${currentSummary?.totalGrossPay.toLocaleString() || '0'}
              </p>
            </div>
            <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-s1" />
            </div>
          </div>
          <p className="text-xs text-bodyText mt-2">
            {currentPeriod?.name || 'No active period'}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">Net Pay</p>
              <p className="text-2xl font-bold text-mainTextColor">
                ${currentSummary?.totalNetPay.toLocaleString() || '0'}
              </p>
            </div>
            <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-s1" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" />
            After deductions & taxes
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">
                Total Deductions
              </p>
              <p className="text-2xl font-bold text-mainTextColor">
                ${currentSummary?.totalDeductions.toLocaleString() || '0'}
              </p>
            </div>
            <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-s1" />
            </div>
          </div>
          <p className="text-xs text-bodyText mt-2">Taxes & withholdings</p>
        </Card>
      </div>

      {/* Current Pay Period */}
      {currentPeriod && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-mainTextColor">
                Current Pay Period: {currentPeriod.name}
              </h2>
              <p className="text-sm text-bodyText">
                {currentPeriod.startDate} - {currentPeriod.endDate}
              </p>
            </div>
            {getStatusBadge(currentPeriod.status)}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-sm font-medium text-bodyText">Pay Date</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-bodyText" />
                <p className="text-mainTextColor font-semibold">
                  {currentPeriod.payDate}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-bodyText">Employees</p>
              <p className="text-mainTextColor font-semibold mt-1">
                {currentSummary?.employeesPaid || 0}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-bodyText">Total Hours</p>
              <p className="text-mainTextColor font-semibold mt-1">
                {currentSummary?.totalHours?.toFixed(2) || '0.00'} hrs
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-bodyText">Avg Pay</p>
              <p className="text-mainTextColor font-semibold mt-1">
                $
                {(
                  (currentSummary?.totalNetPay || 0) /
                  (currentSummary?.employeesPaid || 1)
                ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Play className="w-4 h-4 mr-2" />
              Process Payroll
            </Button>
          </div>
        </Card>
      )}

      {/* Upcoming Pay Periods */}
      {upcomingPeriods.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-mainTextColor">
              Upcoming Pay Periods
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/dashboard/payroll/periods')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingPeriods.map(period => (
              <div
                key={period.id}
                className="flex items-center justify-between p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
              >
                <div>
                  <p className="font-medium text-mainTextColor">
                    {period.name} ({period.type})
                  </p>
                  <p className="text-sm text-bodyText">
                    {period.startDate} - {period.endDate} • Pay Date:{' '}
                    {period.payDate}
                  </p>
                </div>
                {getStatusBadge(period.status)}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recent Payroll History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-mainTextColor">
            Recent Payroll History
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/dashboard/payroll/history')}
          >
            View All History
          </Button>
        </div>
        <div className="space-y-3">
          {recentPeriods.length > 0 ? (
            recentPeriods.map(period => {
              const summary = getPayrollSummaryForPeriod(period.id);
              return (
                <div
                  key={period.id}
                  className="border border-strokeColor rounded-lg p-4 hover:bg-softBg transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(period.status)}
                      <div>
                        <h3 className="font-medium text-mainTextColor">
                          {period.name}
                        </h3>
                        <p className="text-sm text-bodyText">
                          {period.startDate} - {period.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(period.status)}
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-bodyText">Employees</p>
                      <p className="font-medium text-mainTextColor">
                        {summary?.employeesPaid || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-bodyText">Gross Pay</p>
                      <p className="font-medium text-mainTextColor">
                        ${summary?.totalGrossPay.toLocaleString() || '0'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-bodyText">Net Pay</p>
                      <p className="font-medium text-mainTextColor">
                        ${summary?.totalNetPay.toLocaleString() || '0'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-bodyText">Deductions</p>
                      <p className="font-medium text-mainTextColor">
                        ${summary?.totalDeductions.toLocaleString() || '0'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-bodyText py-8">
              No payroll history available
            </p>
          )}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-mainTextColor mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => router.push('/dashboard/payroll/periods')}
          >
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-s1 mt-0.5" />
              <div className="text-left">
                <p className="font-medium text-mainTextColor">
                  Manage Pay Periods
                </p>
                <p className="text-xs text-bodyText">
                  Create and configure pay periods
                </p>
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => router.push('/dashboard/payroll/process')}
          >
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-s1 mt-0.5" />
              <div className="text-left">
                <p className="font-medium text-mainTextColor">
                  Process Payroll
                </p>
                <p className="text-xs text-bodyText">
                  Calculate and review payroll
                </p>
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="justify-start h-auto py-4"
            onClick={() => router.push('/dashboard/reports')}
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-s1 mt-0.5" />
              <div className="text-left">
                <p className="font-medium text-mainTextColor">
                  Payroll Reports
                </p>
                <p className="text-xs text-bodyText">
                  View summaries and analytics
                </p>
              </div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
}
