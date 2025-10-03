'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { usePayroll } from '@/hooks/usePayroll';
import { useEmployees } from '@/hooks/useEmployees';
import {
  ArrowLeft,
  Calculator,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Eye,
  Save,
} from 'lucide-react';

interface PayrollCalculation {
  employeeId: number;
  employeeName: string;
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  grossPay: number;
  federalTax: number;
  stateTax: number;
  fica: number;
  medicare: number;
  deductions: number;
  netPay: number;
}

export default function ProcessPayrollPage() {
  const router = useRouter();
  const { payrollPeriods } = usePayroll();
  const { employees } = useEmployees();

  const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null);
  const [customHours, setCustomHours] = useState<
    Record<number, { regular: number; overtime: number }>
  >({});

  const selectedPeriod = payrollPeriods.find(p => p.id === selectedPeriodId);
  const activeEmployees = employees.filter(emp => emp.status === 'active');

  // Mock tax rates
  const TAX_RATES = {
    FEDERAL: 0.22, // 22%
    STATE: 0.05, // 5%
    FICA: 0.062, // 6.2%
    MEDICARE: 0.0145, // 1.45%
    OVERTIME_MULTIPLIER: 1.5,
  };

  // Calculate payroll for all employees
  const payrollCalculations = useMemo((): PayrollCalculation[] => {
    if (!selectedPeriod) return [];

    return activeEmployees.map(employee => {
      // Get hours (custom or default to 80 for bi-weekly)
      const hours = customHours[employee.id] || { regular: 80, overtime: 0 };

      // Calculate hourly rate
      const hourlyRate = employee.salary / 2080; // Annual salary / (40 hrs/week * 52 weeks)

      // Calculate pay
      const regularPay = hours.regular * hourlyRate;
      const overtimePay =
        hours.overtime * hourlyRate * TAX_RATES.OVERTIME_MULTIPLIER;
      const grossPay = regularPay + overtimePay;

      // Calculate taxes
      const federalTax = grossPay * TAX_RATES.FEDERAL;
      const stateTax = grossPay * TAX_RATES.STATE;
      const fica = grossPay * TAX_RATES.FICA;
      const medicare = grossPay * TAX_RATES.MEDICARE;

      // Calculate deductions (from employee profile)
      const deductions = employee.deductions.reduce((sum, ded) => {
        if (ded.frequency === 'per_paycheck') {
          return sum + ded.amount;
        }
        return sum;
      }, 0);

      // Calculate net pay
      const netPay =
        grossPay -
        federalTax -
        stateTax -
        fica -
        medicare -
        deductions -
        employee.taxInfo.additionalWithholding;

      return {
        employeeId: employee.id,
        employeeName: `${employee.firstName} ${employee.lastName}`,
        regularHours: hours.regular,
        overtimeHours: hours.overtime,
        regularPay,
        overtimePay,
        grossPay,
        federalTax,
        stateTax,
        fica,
        medicare,
        deductions: deductions + employee.taxInfo.additionalWithholding,
        netPay,
      };
    });
  }, [selectedPeriod, activeEmployees, customHours]);

  // Calculate totals
  const totals = useMemo(() => {
    return payrollCalculations.reduce(
      (acc, calc) => ({
        grossPay: acc.grossPay + calc.grossPay,
        federalTax: acc.federalTax + calc.federalTax,
        stateTax: acc.stateTax + calc.stateTax,
        fica: acc.fica + calc.fica,
        medicare: acc.medicare + calc.medicare,
        deductions: acc.deductions + calc.deductions,
        netPay: acc.netPay + calc.netPay,
      }),
      {
        grossPay: 0,
        federalTax: 0,
        stateTax: 0,
        fica: 0,
        medicare: 0,
        deductions: 0,
        netPay: 0,
      }
    );
  }, [payrollCalculations]);

  const handleHoursChange = (
    employeeId: number,
    type: 'regular' | 'overtime',
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    setCustomHours(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [type]: numValue,
      },
    }));
  };

  const handleProcessPayroll = () => {
    // In a real app, this would submit to API
    alert(
      `Processing payroll for ${activeEmployees.length} employees.\nTotal Net Pay: $${totals.netPay.toLocaleString()}\n\n(This is a simulation)`
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-mainTextColor">
            Process Payroll
          </h1>
          <p className="text-bodyText">
            Calculate and preview payroll for selected pay period
          </p>
        </div>
      </div>

      {/* Period Selection */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-mainTextColor mb-2">
              Select Pay Period
            </label>
            <Select
              value={selectedPeriodId?.toString() || ''}
              onChange={e => setSelectedPeriodId(parseInt(e.target.value))}
              options={[
                { value: '', label: 'Choose a pay period...' },
                ...payrollPeriods
                  .filter(
                    p => p.status === 'pending' || p.status === 'processing'
                  )
                  .map(p => ({
                    value: p.id.toString(),
                    label: `${p.name} (${p.startDate} - ${p.endDate})`,
                  })),
              ]}
            />
          </div>
          {selectedPeriod && (
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm font-medium text-bodyText">Period Type</p>
                <p className="text-mainTextColor capitalize">
                  {selectedPeriod.type.replace('_', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-bodyText">Pay Date</p>
                <p className="text-mainTextColor">{selectedPeriod.payDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-bodyText">Employees</p>
                <p className="text-mainTextColor font-semibold">
                  {activeEmployees.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {selectedPeriod && (
        <>
          {/* Payroll Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-s1" />
                <div>
                  <p className="text-xs text-bodyText">Total Gross Pay</p>
                  <p className="text-xl font-bold text-mainTextColor">
                    $
                    {totals.grossPay.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-xs text-bodyText">Total Taxes</p>
                  <p className="text-xl font-bold text-red-600">
                    $
                    {(
                      totals.federalTax +
                      totals.stateTax +
                      totals.fica +
                      totals.medicare
                    ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-xs text-bodyText">Total Deductions</p>
                  <p className="text-xl font-bold text-orange-600">
                    $
                    {totals.deductions.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-xs text-bodyText">Total Net Pay</p>
                  <p className="text-xl font-bold text-green-600">
                    $
                    {totals.netPay.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tax Breakdown */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-mainTextColor mb-4">
              Tax & Deduction Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-softBg rounded-lg">
                <p className="text-xs text-bodyText">Federal Tax (22%)</p>
                <p className="font-semibold text-mainTextColor">
                  $
                  {totals.federalTax.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 bg-softBg rounded-lg">
                <p className="text-xs text-bodyText">State Tax (5%)</p>
                <p className="font-semibold text-mainTextColor">
                  $
                  {totals.stateTax.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 bg-softBg rounded-lg">
                <p className="text-xs text-bodyText">FICA (6.2%)</p>
                <p className="font-semibold text-mainTextColor">
                  $
                  {totals.fica.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="p-3 bg-softBg rounded-lg">
                <p className="text-xs text-bodyText">Medicare (1.45%)</p>
                <p className="font-semibold text-mainTextColor">
                  $
                  {totals.medicare.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </Card>

          {/* Employee Calculations Table */}
          <Card className="p-0 overflow-hidden">
            <div className="p-6 border-b border-strokeColor">
              <h3 className="text-lg font-semibold text-mainTextColor">
                Employee Payroll Details
              </h3>
              <p className="text-sm text-bodyText">
                Review and adjust hours for each employee before processing
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-softBg border-b border-strokeColor">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                      Employee
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                      Regular Hrs
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                      OT Hrs
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                      Gross Pay
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                      Taxes
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                      Deductions
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-mainTextColor">
                      Net Pay
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-mainTextColor">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-strokeColor">
                  {payrollCalculations.map(calc => {
                    const totalTaxes =
                      calc.federalTax +
                      calc.stateTax +
                      calc.fica +
                      calc.medicare;
                    return (
                      <tr key={calc.employeeId} className="hover:bg-softBg">
                        <td className="px-4 py-3">
                          <p className="font-medium text-mainTextColor">
                            {calc.employeeName}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            type="number"
                            value={calc.regularHours}
                            onChange={e =>
                              handleHoursChange(
                                calc.employeeId,
                                'regular',
                                e.target.value
                              )
                            }
                            className="w-20 h-8 text-sm"
                            min="0"
                            max="200"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <Input
                            type="number"
                            value={calc.overtimeHours}
                            onChange={e =>
                              handleHoursChange(
                                calc.employeeId,
                                'overtime',
                                e.target.value
                              )
                            }
                            className="w-20 h-8 text-sm"
                            min="0"
                            max="40"
                          />
                        </td>
                        <td className="px-4 py-3 text-right text-mainTextColor font-medium">
                          $
                          {calc.grossPay.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-right text-red-600">
                          $
                          {totalTaxes.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-right text-orange-600">
                          $
                          {calc.deductions.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-right text-green-600 font-semibold">
                          $
                          {calc.netPay.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge variant="success">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Ready
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-softBg border-t-2 border-strokeColor">
                  <tr>
                    <td
                      className="px-4 py-4 font-bold text-mainTextColor"
                      colSpan={3}
                    >
                      TOTALS ({payrollCalculations.length} employees)
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-mainTextColor">
                      $
                      {totals.grossPay.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-red-600">
                      $
                      {(
                        totals.federalTax +
                        totals.stateTax +
                        totals.fica +
                        totals.medicare
                      ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-orange-600">
                      $
                      {totals.deductions.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-green-600">
                      $
                      {totals.netPay.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-bodyText">
              <AlertCircle className="w-4 h-4" />
              Review all calculations before processing payroll
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard/payroll')}
              >
                Cancel
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview Pay Stubs
              </Button>
              <Button onClick={handleProcessPayroll}>
                <Calculator className="w-4 h-4 mr-2" />
                Process Payroll
              </Button>
            </div>
          </div>
        </>
      )}

      {!selectedPeriod && (
        <Card className="p-12 text-center">
          <Calculator className="w-16 h-16 text-bodyText opacity-50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-mainTextColor mb-2">
            Select a Pay Period
          </h2>
          <p className="text-bodyText">
            Choose a pay period from the dropdown above to begin payroll
            processing
          </p>
        </Card>
      )}
    </div>
  );
}
