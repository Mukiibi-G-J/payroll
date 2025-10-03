'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { usePayroll } from '@/hooks/usePayroll';
import { useEmployees } from '@/hooks/useEmployees';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  DollarSign,
  FileText,
  PieChart,
  Filter,
  Eye,
  Send,
  Clock,
  TrendingDown,
} from 'lucide-react';

export default function ReportsPage() {
  const router = useRouter();
  const { payrollPeriods, payrollEntries } = usePayroll();
  const { employees, getActiveEmployees } = useEmployees();
  const { timeEntries } = useTimeTracking();
  const [selectedReportType, setSelectedReportType] = useState('');
  const [dateRange, setDateRange] = useState('this_month');
  const reportCategories = [
    {
      title: 'Payroll Reports',
      description: 'Comprehensive payroll summaries and tax reports',
      icon: DollarSign,
      reports: [
        {
          name: 'Payroll Summary',
          description: 'Monthly payroll overview',
          lastGenerated: '2024-01-15',
        },
        {
          name: 'Tax Report',
          description: 'Federal and state tax withholdings',
          lastGenerated: '2024-01-15',
        },
        {
          name: 'Year-End W-2s',
          description: 'Annual wage and tax statements',
          lastGenerated: '2023-12-31',
        },
      ],
    },
    {
      title: 'Employee Reports',
      description: 'Employee analytics and workforce insights',
      icon: Users,
      reports: [
        {
          name: 'Employee Directory',
          description: 'Complete employee listing',
          lastGenerated: '2024-01-15',
        },
        {
          name: 'Turnover Analysis',
          description: 'Employee retention metrics',
          lastGenerated: '2024-01-10',
        },
        {
          name: 'Headcount Trends',
          description: 'Workforce growth analysis',
          lastGenerated: '2024-01-12',
        },
      ],
    },
    {
      title: 'Time & Attendance',
      description: 'Time tracking and attendance reports',
      icon: Calendar,
      reports: [
        {
          name: 'Timesheet Summary',
          description: 'Employee hours and attendance',
          lastGenerated: '2024-01-15',
        },
        {
          name: 'Overtime Report',
          description: 'Overtime hours and costs',
          lastGenerated: '2024-01-14',
        },
        {
          name: 'Leave Balance',
          description: 'Vacation and sick time balances',
          lastGenerated: '2024-01-15',
        },
      ],
    },
  ];

  const activeEmployees = getActiveEmployees();

  // Calculate analytics from real data
  const totalPayrollYTD = payrollEntries.reduce(
    (sum, entry) => sum + entry.grossPay,
    0
  );
  const totalNetPayYTD = payrollEntries.reduce(
    (sum, entry) => sum + entry.netPay,
    0
  );
  const avgOvertimeWeekly =
    timeEntries.reduce((sum, entry) => sum + entry.overtimeHours, 0) /
    (timeEntries.length / 5 || 1);

  // Department breakdown
  const departmentStats = employees.reduce(
    (acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { count: 0, totalSalary: 0 };
      }
      acc[emp.department].count++;
      acc[emp.department].totalSalary += emp.salary;
      return acc;
    },
    {} as Record<string, { count: number; totalSalary: number }>
  );

  const recentReports = [
    {
      id: 1,
      name: 'Payroll Summary - January 2024',
      type: 'Payroll',
      generated: '2024-01-15',
      size: '2.3 MB',
      status: 'ready',
    },
    {
      id: 2,
      name: 'Employee Directory Export',
      type: 'Employee',
      generated: '2024-01-15',
      size: '1.8 MB',
      status: 'ready',
    },
    {
      id: 3,
      name: 'Timesheet Summary - Week 2',
      type: 'Time & Attendance',
      generated: '2024-01-14',
      size: '1.2 MB',
      status: 'ready',
    },
    {
      id: 4,
      name: 'Tax Report - Q4 2023',
      type: 'Payroll',
      generated: '2024-01-10',
      size: '3.1 MB',
      status: 'ready',
    },
  ];

  const handleGenerateReport = () => {
    alert(
      `Generating ${selectedReportType || 'selected'} report for ${dateRange}\n\n(This is a simulation)`
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">
            Reports & Analytics
          </h1>
          <p className="text-bodyText">
            Generate insights and track key payroll metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button onClick={handleGenerateReport}>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-bodyText">
              Total Payroll YTD
            </p>
            <DollarSign className="w-5 h-5 text-s1" />
          </div>
          <p className="text-2xl font-bold text-mainTextColor">
            $
            {totalPayrollYTD.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="w-4 h-4 mr-1" /> 4.5% vs last quarter
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-bodyText">
              Active Employees
            </p>
            <Users className="w-5 h-5 text-s1" />
          </div>
          <p className="text-2xl font-bold text-mainTextColor">
            {activeEmployees.length}
          </p>
          <p className="text-sm text-green-600 flex items-center mt-1">
            <TrendingUp className="w-4 h-4 mr-1" /> 1.2% vs last quarter
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-bodyText">
              Avg. Payroll Cost
            </p>
            <BarChart3 className="w-5 h-5 text-s1" />
          </div>
          <p className="text-2xl font-bold text-mainTextColor">
            $
            {Math.floor(
              totalPayrollYTD / (activeEmployees.length || 1)
            ).toLocaleString()}
          </p>
          <p className="text-sm text-red-600 flex items-center mt-1">
            <TrendingDown className="w-4 h-4 mr-1" /> 0.8% vs last quarter
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-bodyText">
              Avg. Overtime/Week
            </p>
            <Clock className="w-5 h-5 text-s1" />
          </div>
          <p className="text-2xl font-bold text-mainTextColor">
            {avgOvertimeWeekly.toFixed(1)}h
          </p>
          <p className="text-sm text-green-600 flex items-center mt-1">
            <TrendingDown className="w-4 h-4 mr-1" /> 2% vs last month
          </p>
        </Card>
      </div>

      {/* Custom Report Builder */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-mainTextColor mb-4">
          Custom Report Builder
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Report Type"
            value={selectedReportType}
            onChange={e => setSelectedReportType(e.target.value)}
            options={[
              { value: '', label: 'Select report type...' },
              { value: 'payroll_summary', label: 'Payroll Summary' },
              { value: 'employee_earnings', label: 'Employee Earnings' },
              { value: 'tax_liability', label: 'Tax Liability' },
              { value: 'timesheet_summary', label: 'Timesheet Summary' },
              { value: 'overtime_report', label: 'Overtime Report' },
              { value: 'headcount', label: 'Headcount Report' },
            ]}
          />
          <Select
            label="Date Range"
            value={dateRange}
            onChange={e => setDateRange(e.target.value)}
            options={[
              { value: 'this_month', label: 'This Month' },
              { value: 'last_month', label: 'Last Month' },
              { value: 'this_quarter', label: 'This Quarter' },
              { value: 'last_quarter', label: 'Last Quarter' },
              { value: 'this_year', label: 'This Year' },
              { value: 'last_year', label: 'Last Year' },
            ]}
          />
          <Select
            label="Format"
            options={[
              { value: 'pdf', label: 'PDF' },
              { value: 'excel', label: 'Excel' },
              { value: 'csv', label: 'CSV' },
            ]}
          />
          <div className="flex items-end">
            <Button className="w-full" onClick={handleGenerateReport}>
              <FileText className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>
      </Card>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-s1/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-s1" />
                </div>
                <div>
                  <h3 className="font-semibold text-mainTextColor">
                    {category.title}
                  </h3>
                  <p className="text-sm text-bodyText">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {category.reports.map((report, reportIndex) => (
                  <div
                    key={reportIndex}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-softBg transition-colors cursor-pointer"
                    onClick={handleGenerateReport}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-mainTextColor">
                        {report.name}
                      </p>
                      <p className="text-sm text-bodyText">
                        {report.description}
                      </p>
                      <p className="text-xs text-bodyText">
                        Last generated: {report.lastGenerated}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Generate
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Department Analytics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-mainTextColor mb-4">
          Department Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(departmentStats).map(([dept, stats]) => (
            <div
              key={dept}
              className="p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-mainTextColor">{dept}</p>
                <Badge>{stats.count} employees</Badge>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-bodyText">Total Salaries:</span>
                  <span className="font-semibold text-mainTextColor">
                    ${stats.totalSalary.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-bodyText">Avg Salary:</span>
                  <span className="font-semibold text-mainTextColor">
                    $
                    {Math.floor(
                      stats.totalSalary / stats.count
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-mainTextColor">
            Recent Reports
          </h2>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        <div className="space-y-4">
          {recentReports.map(report => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-s1/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-s1" />
                </div>
                <div>
                  <h3 className="font-medium text-mainTextColor">
                    {report.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-bodyText">
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>Generated: {report.generated}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">Ready</Badge>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-mainTextColor">
            Scheduled Reports
          </h2>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Add Schedule
          </Button>
        </div>
        <div className="space-y-3">
          {[
            {
              name: 'Monthly Payroll Summary',
              schedule: 'First day of each month',
              recipients: 'hr@company.com, cfo@company.com',
            },
            {
              name: 'Weekly Timesheet Report',
              schedule: 'Every Monday at 9:00 AM',
              recipients: 'managers@company.com',
            },
            {
              name: 'Quarterly Tax Report',
              schedule: 'Last day of quarter',
              recipients: 'accounting@company.com',
            },
          ].map((schedule, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-strokeColor rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-s1" />
                <div>
                  <p className="font-medium text-mainTextColor">
                    {schedule.name}
                  </p>
                  <p className="text-sm text-bodyText">{schedule.schedule}</p>
                  <p className="text-xs text-bodyText">
                    To: {schedule.recipients}
                  </p>
                </div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
