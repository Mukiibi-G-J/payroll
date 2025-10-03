'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { usePayroll } from '@/hooks/usePayroll';
import { useEmployees } from '@/hooks/useEmployees';
import { useCompany } from '@/hooks/useCompany';
import {
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Send,
  Printer,
  Calendar,
  User,
  Building,
  DollarSign,
} from 'lucide-react';

export default function PayStubsPage() {
  const router = useRouter();
  const { payrollPeriods, payrollEntries } = usePayroll();
  const { getEmployeeById } = useEmployees();
  const { company } = useCompany();
  const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [showPreview, setShowPreview] = useState(false);

  const selectedPeriod = payrollPeriods.find(p => p.id === selectedPeriodId);
  const periodEntries = payrollEntries.filter(
    e => e.periodId === selectedPeriodId
  );
  const selectedEntry = payrollEntries.find(
    e => e.periodId === selectedPeriodId && e.employeeId === selectedEmployeeId
  );
  const selectedEmployee = selectedEmployeeId
    ? getEmployeeById(selectedEmployeeId)
    : null;

  const handleDownloadPayStub = () => {
    alert('Pay stub download initiated (simulation)');
  };

  const handleBulkGeneration = () => {
    alert(
      `Generating ${periodEntries.length} pay stubs for ${selectedPeriod?.name}\n\n(This is a simulation)`
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
            <h1 className="text-2xl font-bold text-mainTextColor">Pay Stubs</h1>
            <p className="text-bodyText">
              Generate and preview employee pay stubs
            </p>
          </div>
        </div>
      </div>

      {/* Selection Panel */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-mainTextColor mb-2">
              Select Pay Period
            </label>
            <Select
              value={selectedPeriodId?.toString() || ''}
              onChange={e => {
                setSelectedPeriodId(parseInt(e.target.value));
                setSelectedEmployeeId(null);
                setShowPreview(false);
              }}
              options={[
                { value: '', label: 'Choose a pay period...' },
                ...payrollPeriods
                  .filter(
                    p => p.status === 'processed' || p.status === 'processing'
                  )
                  .map(p => ({
                    value: p.id.toString(),
                    label: `${p.name} (${p.startDate} - ${p.endDate})`,
                  })),
              ]}
            />
          </div>
          {selectedPeriod && (
            <div>
              <label className="block text-sm font-medium text-mainTextColor mb-2">
                Select Employee
              </label>
              <Select
                value={selectedEmployeeId?.toString() || ''}
                onChange={e => setSelectedEmployeeId(parseInt(e.target.value))}
                options={[
                  { value: '', label: 'Choose an employee...' },
                  ...periodEntries.map(entry => {
                    const emp = getEmployeeById(entry.employeeId);
                    return {
                      value: entry.employeeId.toString(),
                      label: emp
                        ? `${emp.firstName} ${emp.lastName}`
                        : `Employee #${entry.employeeId}`,
                    };
                  }),
                ]}
              />
            </div>
          )}
        </div>

        {selectedPeriod && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              disabled={!selectedEmployeeId}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview Pay Stub
            </Button>
            <Button onClick={handleBulkGeneration}>
              <FileText className="w-4 h-4 mr-2" />
              Generate All ({periodEntries.length} stubs)
            </Button>
          </div>
        )}
      </Card>

      {/* Pay Stub Preview */}
      {showPreview && selectedEntry && selectedEmployee && selectedPeriod && (
        <Card className="p-8 bg-white max-w-4xl mx-auto shadow-lg">
          {/* Pay Stub Header */}
          <div className="border-b-2 border-s1 pb-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-s1 mb-1">
                  {company.companyName}
                </h2>
                <p className="text-sm text-bodyText">{company.address}</p>
                <p className="text-sm text-bodyText">
                  {company.city}, {company.state} {company.zipCode}
                </p>
                <p className="text-sm text-bodyText">Tax ID: {company.taxId}</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold text-mainTextColor">
                  Pay Statement
                </h3>
                <p className="text-sm text-bodyText">
                  Period: {selectedPeriod.startDate} - {selectedPeriod.endDate}
                </p>
                <p className="text-sm text-bodyText">
                  Pay Date: {selectedPeriod.payDate}
                </p>
              </div>
            </div>
          </div>

          {/* Employee Information */}
          <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-strokeColor">
            <div>
              <h4 className="font-semibold text-mainTextColor mb-2">
                Employee
              </h4>
              <p className="text-sm text-bodyText">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </p>
              <p className="text-sm text-bodyText">{selectedEmployee.email}</p>
              <p className="text-sm text-bodyText">
                {selectedEmployee.address}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-mainTextColor mb-2">
                Employment Details
              </h4>
              <p className="text-sm text-bodyText">
                ID: #{selectedEmployee.id}
              </p>
              <p className="text-sm text-bodyText">
                Department: {selectedEmployee.department}
              </p>
              <p className="text-sm text-bodyText">
                Position: {selectedEmployee.position}
              </p>
            </div>
          </div>

          {/* Earnings */}
          <div className="mb-6">
            <h4 className="font-semibold text-mainTextColor mb-3">Earnings</h4>
            <table className="w-full text-sm">
              <thead className="bg-softBg">
                <tr>
                  <th className="px-3 py-2 text-left">Description</th>
                  <th className="px-3 py-2 text-right">Hours</th>
                  <th className="px-3 py-2 text-right">Rate</th>
                  <th className="px-3 py-2 text-right">Current</th>
                  <th className="px-3 py-2 text-right">YTD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-strokeColor">
                <tr>
                  <td className="px-3 py-2">Regular Pay</td>
                  <td className="px-3 py-2 text-right">
                    {selectedEntry.hoursWorked.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${(selectedEmployee.salary / 2080).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    $
                    {(
                      selectedEntry.hoursWorked *
                      (selectedEmployee.salary / 2080)
                    ).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${selectedEntry.grossPay.toFixed(2)}
                  </td>
                </tr>
                <tr className="font-semibold bg-softBg">
                  <td className="px-3 py-2" colSpan={3}>
                    Gross Pay
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${selectedEntry.grossPay.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${selectedEntry.grossPay.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deductions */}
          <div className="mb-6">
            <h4 className="font-semibold text-mainTextColor mb-3">
              Deductions
            </h4>
            <table className="w-full text-sm">
              <thead className="bg-softBg">
                <tr>
                  <th className="px-3 py-2 text-left">Description</th>
                  <th className="px-3 py-2 text-right">Current</th>
                  <th className="px-3 py-2 text-right">YTD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-strokeColor">
                <tr>
                  <td className="px-3 py-2">Federal Income Tax</td>
                  <td className="px-3 py-2 text-right">
                    ${selectedEntry.federalTax.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${selectedEntry.federalTax.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">State Income Tax</td>
                  <td className="px-3 py-2 text-right">
                    ${selectedEntry.stateTax.toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${selectedEntry.stateTax.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Social Security (FICA)</td>
                  <td className="px-3 py-2 text-right">
                    ${(selectedEntry.grossPay * 0.062).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${(selectedEntry.grossPay * 0.062).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Medicare</td>
                  <td className="px-3 py-2 text-right">
                    ${(selectedEntry.grossPay * 0.0145).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    ${(selectedEntry.grossPay * 0.0145).toFixed(2)}
                  </td>
                </tr>
                {selectedEmployee.deductions.map((ded, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-2 capitalize">
                      {ded.type.replace('_', ' ')}
                    </td>
                    <td className="px-3 py-2 text-right">
                      ${ded.amount.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      ${ded.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="font-semibold bg-softBg">
                  <td className="px-3 py-2">Total Deductions</td>
                  <td className="px-3 py-2 text-right">
                    $
                    {(selectedEntry.grossPay - selectedEntry.netPay).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    $
                    {(selectedEntry.grossPay - selectedEntry.netPay).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Net Pay */}
          <div className="bg-s1 text-white p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Net Pay</p>
                <p className="text-3xl font-bold">
                  ${selectedEntry.netPay.toFixed(2)}
                </p>
              </div>
              <div className="text-right text-sm opacity-90">
                <p>Direct Deposit</p>
                <p>{selectedEmployee.bankAccount.bankName}</p>
                <p>
                  ****{selectedEmployee.bankAccount.accountNumber.slice(-4)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 mt-6 pt-6 border-t border-strokeColor">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close Preview
            </Button>
            <Button variant="outline" onClick={handleDownloadPayStub}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF (Simulation)
            </Button>
            <Button variant="outline">
              <Send className="w-4 h-4 mr-2" />
              Email to Employee (Simulation)
            </Button>
            <Button variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print (Simulation)
            </Button>
          </div>
        </Card>
      )}

      {!showPreview && selectedPeriod && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-mainTextColor mb-4">
            Pay Stubs for {selectedPeriod.name}
          </h3>
          <div className="space-y-2 mb-6">
            {periodEntries.map(entry => {
              const emp = getEmployeeById(entry.employeeId);
              if (!emp) return null;

              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border border-strokeColor rounded-lg hover:bg-softBg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-s1" />
                    <div>
                      <p className="font-medium text-mainTextColor">
                        {emp.firstName} {emp.lastName}
                      </p>
                      <p className="text-sm text-bodyText">
                        Net Pay: ${entry.netPay.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Ready</Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedEmployeeId(emp.id);
                        setShowPreview(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadPayStub}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-strokeColor">
            <Button variant="outline" onClick={handleBulkGeneration}>
              <Download className="w-4 h-4 mr-2" />
              Download All as ZIP (Simulation)
            </Button>
            <Button onClick={handleBulkGeneration}>
              <Send className="w-4 h-4 mr-2" />
              Email All Pay Stubs (Simulation)
            </Button>
          </div>
        </Card>
      )}

      {!selectedPeriod && (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-bodyText opacity-50 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-mainTextColor mb-2">
            Select a Pay Period
          </h2>
          <p className="text-bodyText">
            Choose a processed or processing pay period to view and generate pay
            stubs
          </p>
        </Card>
      )}
    </div>
  );
}
