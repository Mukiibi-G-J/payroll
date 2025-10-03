'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useEmployees } from '@/hooks/useEmployees';
import {
  ArrowLeft,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
} from 'lucide-react';

export default function BulkOperationsPage() {
  const router = useRouter();
  const { employees } = useEmployees();
  const [importPreview, setImportPreview] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleExportCSV = () => {
    // Generate CSV content
    const headers = [
      'ID',
      'First Name',
      'Last Name',
      'Email',
      'Phone',
      'Department',
      'Position',
      'Salary',
      'Status',
      'Hire Date',
    ];

    const csvContent = [
      headers.join(','),
      ...employees.map(emp =>
        [
          emp.id,
          emp.firstName,
          emp.lastName,
          emp.email,
          emp.phone,
          emp.department,
          emp.position,
          emp.salary,
          emp.status,
          emp.hireDate,
        ].join(',')
      ),
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleImportSimulation = () => {
    // Simulate import preview
    const mockImportData = [
      {
        id: 'NEW',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        status: 'valid',
      },
      {
        id: 'NEW',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@company.com',
        status: 'valid',
      },
      {
        id: 'NEW',
        firstName: 'Invalid',
        lastName: '',
        email: 'invalid-email',
        status: 'error',
        errors: ['Last name is required', 'Invalid email format'],
      },
    ];

    setImportPreview(mockImportData);
    setShowPreview(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
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
            Bulk Operations
          </h1>
          <p className="text-bodyText">
            Import, export, and manage employees in bulk
          </p>
        </div>
      </div>

      {/* Export Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Download className="w-5 h-5 text-s1" />
          <h2 className="text-lg font-semibold text-mainTextColor">
            Export Employees
          </h2>
        </div>
        <p className="text-bodyText mb-6">
          Download employee data in CSV format for use in spreadsheets or other
          systems.
        </p>
        <div className="flex items-center gap-4">
          <Button onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export All Employees ({employees.length})
          </Button>
          <div className="text-sm text-bodyText">
            Includes all active and inactive employees
          </div>
        </div>
      </Card>

      {/* Import Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Upload className="w-5 h-5 text-s1" />
          <h2 className="text-lg font-semibold text-mainTextColor">
            Import Employees
          </h2>
        </div>
        <p className="text-bodyText mb-6">
          Upload a CSV file to import multiple employees at once. The system
          will validate the data before importing.
        </p>

        <div className="border-2 border-dashed border-strokeColor rounded-lg p-8 text-center mb-6">
          <FileSpreadsheet className="w-12 h-12 text-bodyText opacity-50 mx-auto mb-4" />
          <h3 className="font-medium text-mainTextColor mb-2">
            Upload CSV File
          </h3>
          <p className="text-sm text-bodyText mb-4">
            Drag and drop your file here, or click to browse
          </p>
          <Button
            variant="outline"
            type="button"
            onClick={handleImportSimulation}
          >
            <Upload className="w-4 h-4 mr-2" />
            Select File (Simulation)
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            CSV Format Requirements
          </h4>
          <p className="text-sm text-blue-700 mb-2">
            Your CSV file should include the following columns:
          </p>
          <div className="text-xs text-blue-600 font-mono bg-blue-100 p-2 rounded">
            firstName, lastName, email, phone, department, position, salary,
            hireDate, status
          </div>
        </div>
      </Card>

      {/* Import Preview */}
      {showPreview && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileSpreadsheet className="w-5 h-5 text-s1" />
            <h2 className="text-lg font-semibold text-mainTextColor">
              Import Preview
            </h2>
          </div>
          <p className="text-bodyText mb-4">
            Review the data before importing. Fix any errors highlighted below.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-softBg border-b border-strokeColor">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-mainTextColor">
                    Issues
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-strokeColor">
                {importPreview.map((row, index) => (
                  <tr key={index} className="hover:bg-softBg">
                    <td className="px-4 py-3">{getStatusIcon(row.status)}</td>
                    <td className="px-4 py-3 text-mainTextColor">
                      {row.firstName} {row.lastName}
                    </td>
                    <td className="px-4 py-3 text-bodyText">{row.email}</td>
                    <td className="px-4 py-3">
                      {row.errors ? (
                        <div className="text-sm text-red-600">
                          {row.errors.join(', ')}
                        </div>
                      ) : (
                        <Badge variant="success">Ready to import</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-strokeColor">
            <div className="text-sm text-bodyText">
              {importPreview.filter(r => r.status === 'valid').length} valid,{' '}
              {importPreview.filter(r => r.status === 'error').length} errors
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Cancel
              </Button>
              <Button disabled={importPreview.some(r => r.status === 'error')}>
                Import Valid Employees (Simulation)
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Bulk Update Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-s1" />
          <h2 className="text-lg font-semibold text-mainTextColor">
            Bulk Status Update
          </h2>
        </div>
        <p className="text-bodyText mb-6">
          Update the status of multiple employees at once (simulation).
        </p>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            Mark Selected as Active (Simulation)
          </Button>
          <Button variant="outline">
            Mark Selected as Inactive (Simulation)
          </Button>
        </div>
      </Card>
    </div>
  );
}
