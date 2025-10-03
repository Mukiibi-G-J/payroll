'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useEmployees } from '@/hooks/useEmployees';
import { usePayroll } from '@/hooks/usePayroll';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import {
  Users,
  Calculator,
  Clock,
  BarChart3,
  TrendingUp,
  DollarSign,
  UserCheck,
  FileText,
} from 'lucide-react';

export default function DashboardPage() {
  const { getActiveEmployees } = useEmployees();
  const { getPendingPeriods, getProcessingPeriods } = usePayroll();
  const { getPendingTimesheets } = useTimeTracking();

  const activeEmployees = getActiveEmployees();
  const pendingPeriods = getPendingPeriods();
  const processingPeriods = getProcessingPeriods();
  const pendingTimesheets = getPendingTimesheets();

  const stats = [
    {
      title: 'Total Employees',
      value: activeEmployees.length.toString(),
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'This Month Payroll',
      value: '$45,230',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Pending Approvals',
      value: pendingTimesheets.length.toString(),
      change: '-2',
      changeType: 'negative' as const,
      icon: UserCheck,
    },
    {
      title: 'Time Entries',
      value: '1,234',
      change: '+8.1%',
      changeType: 'positive' as const,
      icon: Clock,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'payroll',
      message: 'Payroll processed for 127 employees',
      time: '2 hours ago',
      icon: Calculator,
    },
    {
      id: 2,
      type: 'employee',
      message: 'New employee Sarah Johnson added',
      time: '4 hours ago',
      icon: Users,
    },
    {
      id: 3,
      type: 'report',
      message: 'Monthly payroll report generated',
      time: '1 day ago',
      icon: FileText,
    },
    {
      id: 4,
      type: 'time',
      message: 'Timesheet approved for John Smith',
      time: '2 days ago',
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-mainTextColor">Dashboard</h1>
        <p className="text-bodyText">
          Welcome back! Here's what's happening with your payroll.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-bodyText">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-mainTextColor">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-s1/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-s1" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-bodyText ml-2">
                  vs last month
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-mainTextColor">
              Recent Activity
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map(activity => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-softBg transition-colors"
                >
                  <div className="w-10 h-10 bg-s1/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-s1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-mainTextColor">
                      {activity.message}
                    </p>
                    <p className="text-xs text-bodyText">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-mainTextColor mb-6">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calculator className="w-4 h-4 mr-2" />
              Process Payroll
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Review Timesheets
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
