'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useEmployees } from '@/hooks/useEmployees';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import {
  Clock,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Users,
  ClipboardList,
  LogIn,
  LogOut,
  Timer,
} from 'lucide-react';

export default function TimeTrackingPage() {
  const router = useRouter();
  const { state } = useAuth();
  const { employees } = useEmployees();
  const { timeEntries, getClockedInEmployees, getWeeklySummary } =
    useTimeTracking();
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<{
    clockIn: Date;
    elapsed: number;
  } | null>(null);

  const currentEmployee = employees.find(
    emp => emp.email === state.user?.email
  );
  const clockedInEmployees = getClockedInEmployees();
  const weeklySummary = currentEmployee
    ? getWeeklySummary(currentEmployee.id)
    : null;

  const handleClockIn = () => {
    const now = new Date();
    setCurrentEntry({ clockIn: now, elapsed: 0 });
    setIsClockedIn(true);

    // Start timer
    const interval = setInterval(() => {
      setCurrentEntry(prev => {
        if (!prev) return null;
        return {
          ...prev,
          elapsed: Math.floor((Date.now() - prev.clockIn.getTime()) / 1000),
        };
      });
    }, 1000);

    // Store interval ID for cleanup
    (window as any).clockInterval = interval;
  };

  const handleClockOut = () => {
    if ((window as any).clockInterval) {
      clearInterval((window as any).clockInterval);
    }
    alert(
      `Clocked out! Total time: ${formatDuration(currentEntry?.elapsed || 0)}\n\n(This is a simulation)`
    );
    setIsClockedIn(false);
    setCurrentEntry(null);
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">
            Time & Attendance
          </h1>
          <p className="text-bodyText">
            Track time, manage timesheets, and approve attendance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/time-tracking/timesheets')}
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Timesheets
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/time-tracking/leave')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Leave Requests
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">
                Hours This Week
              </p>
              <p className="text-2xl font-bold text-mainTextColor">
                {weeklySummary?.totalHours.toFixed(1) || '0.0'} hrs
              </p>
            </div>
            <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-s1" />
            </div>
          </div>
          <p className="text-xs text-bodyText mt-2">
            Regular: {weeklySummary?.regularHours.toFixed(1) || '0.0'} | OT:{' '}
            {weeklySummary?.overtimeHours.toFixed(1) || '0.0'}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">Clocked In</p>
              <p className="text-2xl font-bold text-mainTextColor">
                {clockedInEmployees.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-s1" />
            </div>
          </div>
          <p className="text-xs text-bodyText mt-2">
            {employees.filter(e => e.status === 'active').length} total active
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">PTO Balance</p>
              <p className="text-2xl font-bold text-mainTextColor">
                {currentEmployee?.vacationDays || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-s1" />
            </div>
          </div>
          <p className="text-xs text-bodyText mt-2">
            {currentEmployee?.sickDays || 0} sick days available
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-bodyText">Status</p>
              <p className="text-lg font-bold text-mainTextColor">
                {isClockedIn ? 'Clocked In' : 'Clocked Out'}
              </p>
            </div>
            <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
              <Timer className="w-6 h-6 text-s1" />
            </div>
          </div>
          <p className="text-xs text-bodyText mt-2">
            {isClockedIn ? 'Currently working' : 'Not working'}
          </p>
        </Card>
      </div>

      {/* Time Clock */}
      <Card className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-mainTextColor mb-2">
              {new Date().toLocaleTimeString()}
            </h2>
            <p className="text-bodyText">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {isClockedIn && currentEntry ? (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <p className="text-green-900 font-semibold">
                    You're Clocked In
                  </p>
                </div>
                <p className="text-sm text-green-700">
                  Since {currentEntry.clockIn.toLocaleTimeString()}
                </p>
              </div>

              <div className="bg-softBg rounded-lg p-8">
                <p className="text-sm font-medium text-bodyText mb-2">
                  Time Worked Today
                </p>
                <p className="text-5xl font-bold text-s1 font-mono">
                  {formatDuration(currentEntry.elapsed)}
                </p>
              </div>

              <Button onClick={handleClockOut} size="lg" className="w-full">
                <LogOut className="w-5 h-5 mr-2" />
                Clock Out
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-softBg rounded-lg p-8">
                <p className="text-sm font-medium text-bodyText mb-2">
                  Ready to Start Your Day?
                </p>
                <p className="text-lg text-mainTextColor">
                  Click below to clock in
                </p>
              </div>

              <Button onClick={handleClockIn} size="lg" className="w-full">
                <LogIn className="w-5 h-5 mr-2" />
                Clock In
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-mainTextColor mb-4">
            Your Recent Time Entries
          </h3>
          <div className="space-y-3">
            {timeEntries
              .filter(entry => entry.employeeId === currentEmployee?.id)
              .slice(0, 5)
              .map(entry => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 border border-strokeColor rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-s1" />
                    <div>
                      <p className="font-medium text-mainTextColor">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-bodyText">
                        {entry.clockIn} - {entry.clockOut || 'In Progress'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-mainTextColor">
                      {entry.totalHours.toFixed(2)} hrs
                    </p>
                    <Badge
                      variant={
                        entry.status === 'approved' ? 'success' : 'secondary'
                      }
                    >
                      {entry.status}
                    </Badge>
                  </div>
                </div>
              ))}
            {timeEntries.filter(
              entry => entry.employeeId === currentEmployee?.id
            ).length === 0 && (
              <p className="text-center text-bodyText py-8">
                No time entries yet
              </p>
            )}
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push('/dashboard/time-tracking/timesheets')}
            >
              View All Timesheets
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-mainTextColor mb-4">
            Currently Clocked In
          </h3>
          <div className="space-y-3">
            {clockedInEmployees.slice(0, 5).map(entry => {
              const emp = employees.find(e => e.id === entry.employeeId);
              if (!emp) return null;

              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3 border border-strokeColor rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-s1 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {emp.firstName[0]}
                      {emp.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-mainTextColor">
                        {emp.firstName} {emp.lastName}
                      </p>
                      <p className="text-sm text-bodyText">{emp.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-bodyText">Clocked in</p>
                    <p className="font-semibold text-mainTextColor">
                      {entry.clockIn}
                    </p>
                  </div>
                </div>
              );
            })}
            {clockedInEmployees.length === 0 && (
              <p className="text-center text-bodyText py-8">
                No employees currently clocked in
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
