'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/context/AuthContext';
import { useEmployees } from '@/hooks/useEmployees';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Eye,
  Send,
  Plus,
  Edit,
} from 'lucide-react';

type ViewMode = 'weekly' | 'monthly';

export default function TimesheetsPage() {
  const router = useRouter();
  const { state } = useAuth();
  const { employees } = useEmployees();
  const { timeEntries, getWeeklySummary } = useTimeTracking();

  const currentEmployee = employees.find(
    emp => emp.email === state.user?.email
  );
  const [viewMode, setViewMode] = useState<ViewMode>('weekly');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get start of week (Sunday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
  };

  // Get week dates
  const weekStart = getWeekStart(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });

  // Get month dates
  const monthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const monthEnd = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  // Filter time entries for current period
  const currentEntries = useMemo(() => {
    if (!currentEmployee) return [];

    return timeEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      if (viewMode === 'weekly') {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        return (
          entry.employeeId === currentEmployee.id &&
          entryDate >= weekStart &&
          entryDate < weekEnd
        );
      } else {
        return (
          entry.employeeId === currentEmployee.id &&
          entryDate >= monthStart &&
          entryDate <= monthEnd
        );
      }
    });
  }, [currentEmployee, timeEntries, viewMode, weekStart, monthStart, monthEnd]);

  const totalHours = currentEntries.reduce(
    (sum, entry) => sum + entry.totalHours,
    0
  );
  const regularHours = currentEntries.reduce(
    (sum, entry) => sum + entry.regularHours,
    0
  );
  const overtimeHours = currentEntries.reduce(
    (sum, entry) => sum + entry.overtimeHours,
    0
  );

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const formatDateRange = () => {
    if (viewMode === 'weekly') {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'success',
      pending: 'warning',
      rejected: 'danger',
      draft: 'secondary',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
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
              Timesheets
            </h1>
            <p className="text-bodyText">View and manage your time entries</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {/* View Controls */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'weekly' ? 'default' : 'outline'}
              onClick={() => setViewMode('weekly')}
            >
              Weekly
            </Button>
            <Button
              variant={viewMode === 'monthly' ? 'default' : 'outline'}
              onClick={() => setViewMode('monthly')}
            >
              Monthly
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handlePrevious}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="min-w-[200px] text-center">
              <p className="font-semibold text-mainTextColor">
                {formatDateRange()}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleToday}>
              Today
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">Total Hours</p>
              <p className="text-2xl font-bold text-mainTextColor">
                {totalHours.toFixed(2)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-s1" />
          </div>
          <p className="text-xs text-bodyText mt-2">
            {viewMode === 'weekly' ? 'This week' : 'This month'}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">Regular Hours</p>
              <p className="text-2xl font-bold text-mainTextColor">
                {regularHours.toFixed(2)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-xs text-bodyText mt-2">Standard time</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">Overtime</p>
              <p className="text-2xl font-bold text-orange-600">
                {overtimeHours.toFixed(2)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <p className="text-xs text-bodyText mt-2">Extra hours</p>
        </Card>
      </div>

      {/* Weekly View */}
      {viewMode === 'weekly' && (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-softBg border-b border-strokeColor">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                    Clock In
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                    Clock Out
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                    Regular
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                    Overtime
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                    Total
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
                {weekDays.map(day => {
                  const entry = currentEntries.find(
                    e => new Date(e.date).toDateString() === day.toDateString()
                  );

                  return (
                    <tr key={day.toISOString()} className="hover:bg-softBg">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-mainTextColor">
                            {day.toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-bodyText">
                        {entry?.clockIn || '-'}
                      </td>
                      <td className="px-4 py-3 text-bodyText">
                        {entry?.clockOut || '-'}
                      </td>
                      <td className="px-4 py-3 text-right text-mainTextColor">
                        {entry ? entry.regularHours.toFixed(2) : '0.00'}
                      </td>
                      <td className="px-4 py-3 text-right text-orange-600">
                        {entry ? entry.overtimeHours.toFixed(2) : '0.00'}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-mainTextColor">
                        {entry ? entry.totalHours.toFixed(2) : '0.00'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {entry ? getStatusBadge(entry.status) : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {entry ? (
                            <>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Plus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-softBg font-semibold">
                  <td className="px-4 py-4" colSpan={3}>
                    Weekly Total
                  </td>
                  <td className="px-4 py-4 text-right">
                    {regularHours.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right text-orange-600">
                    {overtimeHours.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right text-mainTextColor">
                    {totalHours.toFixed(2)}
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Monthly View */}
      {viewMode === 'monthly' && (
        <Card className="p-6">
          <div className="space-y-4">
            {currentEntries.length > 0 ? (
              currentEntries.map(entry => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-s1" />
                    </div>
                    <div>
                      <p className="font-medium text-mainTextColor">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-bodyText">
                        {entry.clockIn} - {entry.clockOut || 'In Progress'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-bodyText">Regular</p>
                      <p className="font-semibold text-mainTextColor">
                        {entry.regularHours.toFixed(2)} hrs
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-bodyText">Overtime</p>
                      <p className="font-semibold text-orange-600">
                        {entry.overtimeHours.toFixed(2)} hrs
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-bodyText">Total</p>
                      <p className="font-semibold text-mainTextColor">
                        {entry.totalHours.toFixed(2)} hrs
                      </p>
                    </div>
                    {getStatusBadge(entry.status)}
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-bodyText opacity-50 mx-auto mb-4" />
                <p className="text-bodyText">No time entries for this month</p>
              </div>
            )}
          </div>

          {currentEntries.length > 0 && (
            <div className="mt-6 pt-6 border-t border-strokeColor">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-bodyText">Total Hours</p>
                  <p className="text-2xl font-bold text-mainTextColor">
                    {totalHours.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-bodyText">Regular Hours</p>
                  <p className="text-2xl font-bold text-mainTextColor">
                    {regularHours.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-bodyText">Overtime</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {overtimeHours.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
